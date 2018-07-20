## `maxProperties` / `minProperties`

The value of the keywords should be a number. The data object to be valid should have not more (less) properties than the keyword value.


__Example__

_schema_: `{ "maxProperties": 2 }`

_valid_: `{}`, `{"a": 1}`, `{"a": "1", "b": 2}`, any non-object

_invalid_: `{"a": 1, "b": 2, "c": 3}`
