## `propertyNames`

The value of this keyword is a JSON Schema.

For data object to be valid each property name in this object should be valid according to this schema.


__Example__

_schema_:

```json
{
    "propertyNames": { "format": "email" }
}
```

_valid_: `{"foo@bar.com": "any", "bar@bar.com": "any"}`, any non-object

_invalid_: `{"foo": "any value"}`
