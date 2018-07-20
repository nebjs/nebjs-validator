## `contains`

The value of the keyword is a JSON Schema. The array is valid if it contains at least one item that is valid according to this schema.

__Example__

_schema_: `{ "contains": { "type": "integer" } }`

_valid_: `[1]`, `[1, "foo"]`, any array with at least one integer, any non-array

_invalid_: `[]`, `["foo", "bar"]`, any array without integers


The schema from the example above is equivalent to:

```json
{
    "not": {
        "type": "array",
        "items": {
            "not": { "type": "integer" }
        }
    }
}
```
