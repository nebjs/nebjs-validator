## `uniqueItems`

The value of the keyword should be a boolean. If the keyword value is `true`, the data array to be valid should have unique items.


__Example__

_schema_: `{ "uniqueItems": true }`

_valid_: `[]`, `[1]`, `["1", 2, "3"]`, any non-array (`"abc"`, `1`, `{}`, `null`, `true`)

_invalid_: `[1, 2, 1]`,  `[{ "a": 1, "b": 2 }, { "b": 2, "a": 1 }]`
