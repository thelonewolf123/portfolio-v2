---
sidebar_position: 2
title: Preferences
---

# Preferences Module

Per-chat key-value settings that store the shop's configuration. Preferences survive conversation resets and are **injected into every model call** via middleware.

## Tools

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `set_preference` | Set a key-value preference | `key`, `value` |
| `get_preferences` | Get all preferences for current chat | (none) |

## Data Model

```python
class Preference(SQLModel, table=True):
    __tablename__ = "preferences"

    id: int
    chat_id: str
    key: str        # max 64 chars
    value: str      # max 256 chars
```

Unique constraint: `(chat_id, key)` — each key can appear once per chat.

## Typical Preferences

| Key | Example Value | Used By |
|-----|---------------|---------|
| `shop_name` | "My Kirana Store" | Invoices, greeting |
| `gstin` | "33ABCDE1234F1Z5" | Invoices |
| `default_payment_mode` | "UPI" | Billing |
| `default_brand` | "Aashirvaad" | Inventory (default brand for new items) |

## Business Logic

### Upsert Pattern

```python
def set_preference(session, key, value, chat_id):
    existing = session.exec(
        select(Preference).where(
            Preference.key == key, Preference.chat_id == chat_id
        )
    ).first()
    if existing:
        existing.value = value     # update
    else:
        pref = Preference(key=key, value=value, chat_id=chat_id)  # insert
    session.commit()
```

No delete operation exists — preferences persist until overwritten.

### Middleware Injection

Preferences are **not fetched by the LLM via tools** during normal operation. Instead, `PreferencesMiddleware` reads them from the DB and injects into the system prompt before every model call:

```
<current_preferences>
  default_payment_mode = UPI
  gstin = 33ABCDE1234F1Z5
  shop_name = My Kirana Store
</current_preferences>
```

This means:
- The LLM always knows the shop name, GSTIN, and defaults
- It never needs to call `get_preferences()` during a conversation
- After `set_preference`, the next model call reflects the new value

## Repository Layer

| Method | Purpose |
|--------|---------|
| `set_preference` | Upsert a key-value pair |
| `get_preference` | Get single value by key |
| `get_all_preferences` | Get all prefs as a `dict[str, str]` |

## Test Coverage

**12 test cases** — repo CRUD, middleware formatting (empty/single/multiple), 5 agent integration tests including multi-preference sets and model-readback verification.
