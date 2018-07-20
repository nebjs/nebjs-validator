## `maxItems` / `minItems`

The value of the keywords should be a number. The data array to be valid should not have more (less) items than the keyword value.


__Example__

_schema_: `{ "maxItems": 3 }`

_valid_: `[]`, `[1]`, `["1", 2, "3"]`, any non-array (`"abc"`, `1`, `{}`, `null`, `true`)

_invalid_: `[1, 2, 3, 4]`
