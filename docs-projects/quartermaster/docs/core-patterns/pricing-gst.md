---
sidebar_position: 8
title: Pricing & GST
---

# Pricing & GST

## The Paise Convention

**All prices are stored as integers in paise** (₹1 = 100 paise). This avoids float rounding errors — a well-known problem in financial software.

| User Says | Stored As | Display Formula |
|-----------|-----------|-----------------|
| "₹14" | `1400` | `1400 / 100 = 14.00` |
| "₹99.50" | `9950` | `9950 / 100 = 99.50` |
| "₹250" | `25000` | `25000 / 100 = 250.00` |

The system prompt tells the LLM to convert:

```
Prices are stored in paise (₹1 = 100 paise) — convert user amounts to paise when storing.
Prices quoted by sellers include GST — the stored sell_price is GST-inclusive (MRP).
```

## GST-Inclusive Pricing

In India, retail prices (MRP) include GST. The `sell_price` field stores the GST-inclusive price. When displaying a bill, the system:

1. **Derives the taxable value** from the inclusive price
2. **Splits the tax** into CGST (Central) and SGST (State) at half the slab rate each

### The `split_gst` Algorithm

```python
def split_gst(inclusive_paise: int, gst_slab: int) -> tuple[int, int]:
    if gst_slab == 0:
        return (0, 0)
    taxable = round(inclusive_paise * 100 / (100 + gst_slab))
    total_tax = inclusive_paise - taxable
    cgst = round(total_tax / 2)
    sgst = total_tax - cgst
    return (cgst, sgst)
```

### Examples

| Sell Price | GST Slab | Taxable | CGST | SGST | Total Tax | Grand Total |
|-----------|----------|---------|------|------|-----------|-------------|
| ₹100 (10000 paise) | 0% | 10000 | 0 | 0 | 0 | 10000 |
| ₹100 (10000 paise) | 5% | 9524 | 238 | 238 | 476 | 10000 |
| ₹100 (10000 paise) | 12% | 8929 | 536 | 535 | 1071 | 10000 |
| ₹100 (10000 paise) | 18% | 8475 | 762 | 763 | 1525 | 10000 |
| ₹37 (3700 paise) | 5% | 3524 | 88 | 88 | 176 | 3700 |

Note: `cgst` and `sgst` may differ by 1 paise due to rounding (total tax is always correct).

## Per-Item GST Computation

GST is computed **per line item**, not per bill. Each inventory item has its own `gst_slab`:

```python
class Inventory(SQLModel, table=True):
    gst_slab: int = 0           # 0, 5, 12, 18, 28
    sell_price: int             # GST-inclusive MRP in paise
    hsn_code: str | None        # Harmonized System code (8 chars)
```

For a bill with multiple items at different slabs:

```python
for item in bill_items:
    inv = session.get(Inventory, item.inventory_id)
    line_total = inv.sell_price * item.quantity
    cgst, sgst = split_gst(line_total, inv.gst_slab)
    subtotal += line_total - (cgst + sgst)
    cgst_total += cgst
    sgst_total += sgst
    grand_total = subtotal + cgst_total + sgst_total
```

## HSN Code Auto-Lookup

When adding a new product, the `discover_product_info` tool uses the LLM (via a prompt) to suggest the correct HSN code and GST slab. This is the only place the model's "knowledge" is trusted — for product classification, not pricing.

## Invoice Display

The bill display shows the full GST breakup:

```
Bill #42 — Finalized
  Subtotal:        ₹952.38
  CGST (2.5%):     ₹23.81
  SGST (2.5%):     ₹23.81
  ─────────────────────
  Grand Total:   ₹1,000.00
  ─────────────────────
  Payment: UPI (ref: 12345)
```

This is rendered by `billing/formatter.py` using the `BillDisplay` dataclass.

## Guardrails

```python
if sell_price < cost_price:
    raise ValueError(
        f"Sell price (₹{sell_price/100:.2f}) must be >= "
        f"cost price (₹{cost_price/100:.2f})"
    )
```

The system prevents below-cost sales. The LLM sees this error and can explain it to the user.
