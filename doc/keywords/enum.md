## `enum`

The value of the keyword should be an array of unique items of any types. The data is valid if it is deeply equal to one of items in the array.


__Example__

_schema_: `{ "enum": [ 2, "foo", {"foo": "bar" }, [1, 2, 3] ] }`

_valid_: `2`, `"foo"`, `{"foo": "bar"}`, `[1, 2, 3]`

_invalid_: `1`, `"bar"`, `{"foo": "baz"}`, `[1, 2, 3, 4]`, any value not in the array

