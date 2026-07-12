---
sidebar_position: 4
title: Billing
---

# Billing Module

Multi-turn draft bills with GST computation. The most complex module — 8 tools, 2 models, and a full state machine lifecycle.

## Tools

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `start_bill` | Create a new draft bill | `customer_id` |
| `add_to_bill` | Add an inventory item to a draft | `bill_id`, `inventory_id`, `quantity` |
| `remove_from_bill` | Remove a line item from a draft | `bill_id`, `item_id` |
| `update_bill_item` | Change quantity on a line item | `bill_id`, `item_id`, `new_quantity` |
| `get_bill` | Get details of a single bill | `bill_id` |
| `get_bills` | List bills with optional filters | `customer_id`, `status`, `start_date`, `end_date` |
| `cancel_bill` | Cancel a draft bill | `bill_id` |
| `finalize_bill` | Finalize a draft — decrements stock | `bill_id`, `payment_mode`, `payment_ref` |

## Data Model

```python
class Bill(SQLModel, table=True):
    id: int
    chat_id: str
    customer_id: int | None
    status: str               # draft | finalized | cancelled
    payment_mode: str | None
    payment_ref: str | None
    idempotency_key: str | None
    created_at: datetime
    updated_at: datetime

class BillItem(SQLModel, table=True):
    id: int
    chat_id: str
    bill_id: int
    inventory_id: int
    line_index: int
    quantity: int
```

No monetary fields on `BillItem` — GST and totals are computed at display time from the inventory item's current `sell_price` and `gst_slab`.

## Lifecycle

### State Machine



```mermaid
stateDiagram-v2
    [*] --> Draft: start_bill()
    Draft --> Draft: add_to_bill()
    Draft --> Draft: remove_from_bill()
    Draft --> Draft: update_bill_item()
    Draft --> Finalized: finalize_bill()
    Finalized --> [*]
    Draft --> Cancelled: cancel_bill()
    Cancelled --> [*]
```

### Multi-Turn Flow

Bills are built incrementally across several messages — the LLM adds, removes, and updates items before finalizing:

```mermaid
sequenceDiagram
    participant User as 👤 Shop Owner
    participant LLM as Agent / LLM
    participant DB as SQLite

    User->>LLM: "Start a bill for Ramesh"
    LLM->>DB: start_bill(customer_id=1)
    DB-->>LLM: Bill(id=42, status="draft")
    LLM-->>User: ✅ Bill #42 started

    User->>LLM: "Add 5kg Atta"
    LLM->>DB: find_inventory("Atta")
    DB-->>LLM: Atta, qty=50, price=3200
    LLM->>DB: add_to_bill(bill_id=42, inv_id=1, qty=5)
    DB-->>LLM: BillItem(id=1, qty=5)
    LLM-->>User: Added 5 kg Atta (₹160)

    User->>LLM: "Also 2L Oil"
    LLM->>DB: add_to_bill(bill_id=42, inv_id=2, qty=2)
    DB-->>LLM: BillItem(id=2, qty=2)
    LLM-->>User: Added 2 L Oil (₹340)

    User->>LLM: "Finalize, UPI payment"
    LLM->>DB: finalize_bill(bill_id=42, payment_mode="UPI")
    Note over LLM,DB: Checks stock, decrements inventory
    Note over LLM,DB: Computes GST, builds summary
    DB-->>LLM: Bill(id=42, status="finalized", grand_total=50000)
    LLM-->>User: ✅ Bill finalized! GST breakup shown...
```

## Business Logic

### Stock Deferred Until Finalize

Stock is **not** decremented when items are added to a draft. This allows the owner to change quantities, remove items, or cancel the bill without restoring stock.

```mermaid
sequenceDiagram
    participant U as User
    participant A as Agent
    participant D as DB

    U->>A: Add 5kg Atta
    A->>D: add_to_bill(bill_id=42, inv_id=1, qty=5)
    Note over D: INSERT bill_item<br/>NO stock change
    D-->>A: BillItem created

    U->>A: Add 2L Oil
    A->>D: add_to_bill(bill_id=42, inv_id=2, qty=2)
    Note over D: INSERT bill_item<br/>NO stock change

    U->>A: Finalize UPI
    A->>D: finalize_bill(bill_id=42, payment_mode="UPI")
    Note over D: Atomic UPDATE inventory<br/>WHERE quantity >= qty
    Note over D: UPDATE bill SET status=finalized
    D-->>A: Bill finalized
```

If stock drops below the drafted quantity between "add" and "finalize" (e.g. another sale sold the last unit), the atomic guard catches it:

```python
for item in items:
    result = session.execute(
        sa_update(Inventory)
        .where(Inventory.id == item.inventory_id)
        .where(Inventory.quantity >= item.quantity)
        .values(quantity=Inventory.quantity - item.quantity)
    )
    if result.rowcount == 0:
        raise ValueError(f"Insufficient stock for {item_name}")
```

The error is caught by `ErrorExposureMiddleware` and returned to the LLM as a tool error.

### Idempotent Finalize

Uses `idempotency_key` (typically Telegram `message_id`) to prevent double-billing on retries:

```python
if idempotency_key:
    existing = session.exec(
        select(Bill).where(
            Bill.idempotency_key == idempotency_key,
            Bill.chat_id == chat_id,
            Bill.status == "finalized",
        )
    ).first()
    if existing:
        return existing  # silent replay
```

The database enforces this with a unique constraint on `(chat_id, idempotency_key)`, preventing double-billing even if `finalize_bill` is called twice with the same key.

### Atomic Oversell Guard

```python
result = session.execute(
    sa_update(Inventory)
    .where(Inventory.id == item.inventory_id)
    .where(Inventory.quantity >= item.quantity)    # atomic guard
    .values(quantity=Inventory.quantity - item.quantity)
)
if result.rowcount == 0:
    raise ValueError(f"Insufficient stock for {item_name}")
```

The `WHERE quantity >= item.quantity` makes the check-and-decrement atomic — no race condition between reading and writing.

### Cancel Restores Nothing

Since stock is decremented only on finalize, cancelling a draft bill is a simple status change:

```python
def cancel_bill(session, bill_id):
    bill.status = "cancelled"
    # No stock to restore — it was never deducted
```

This is safe, fast, and avoids the complexity of "restore" logic.

### GST Computation at Display Time

```mermaid
flowchart LR
    A[get_bill_display] --> B[For each BillItem]
    B --> C[Lookup Inventory by inventory_id]
    C --> D[sell_price * quantity = inclusive_total]
    D --> E[split_gst inclusive_total, gst_slab]
    E --> F[Compute CGST, SGST, taxable]
    F --> G[Sum into subtotal, cgst_total, sgst_total]
    G --> H[grand_total = subtotal + cgst + sgst]
```

## Guardrails

| Situation | Behavior |
|-----------|----------|
| Add qty > stock | `ValueError`: `"Insufficient stock for {name}"` |
| Finalize with insufficient stock | `ValueError`: atomic check fails |
| Double-finalize (same key) | Returns cached bill silently |
| Double-finalize (different key) | `ValueError`: "already finalized" |
| Cancel finalized bill | `ValueError`: "Cannot cancel a finalized bill" |
| Below-cost sale | `ValueError`: "must be >= cost price" |

## Test Coverage

**16 test cases** — create bill, add item with GST, oversell blocked, remove item, update qty, finalize decrements stock, oversell guard, idempotent finalize, double-finalize blocked, cancel bill, cancel finalized blocked, and 1 agent integration test.
