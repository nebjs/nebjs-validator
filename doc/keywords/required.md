## `required`

The value of the keyword should be an array of unique strings. The data object to be valid should contain all properties with names equal to the elements in the keyword value.


__Example__

_schema_: `{ "required": ["a", "b"] }`

_valid_: `{"a": 1, "b": 2}`, `{"a": 1, "b": 2, "c": 3}`, any non-object

_invalid_: `{}`, `{"a": 1}`, `{"c": 3, "d":4}`
