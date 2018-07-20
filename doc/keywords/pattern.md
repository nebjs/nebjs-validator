## `pattern`

The value of the keyword should be a string. The data to be valid should match the regular expression defined by the keyword value.

Uses `new RegExp(value)` to create the regular expression that will be used to test data.


__Example__

_schema_: `{ "pattern": "[abc]+" }`

_valid_: `"a"`, `"abcd"`, `"cde"`, any non-string (`1`, `[]`, `{}`, `null`, `true`)

_invalid_: `"def"`, `""`
