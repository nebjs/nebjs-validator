## `multipleOf`

The value of the keyword should be a number. The data to be valid should be a multiple of the keyword value (i.e. the result of division of the data on the value should be integer).


__Examples__

1.  _schema_: `{ "multipleOf": 5 }`

    _valid_: `5`, `10`, any non-number (`"abc"`, `[]`, `{}`, `null`, `true`)

    _invalid_: `1`, `4`


2.  _schema_: `{ "multipleOf": 2.5 }`

    _valid_: `2.5`, `5`, `7.5`, any non-number (`"abc"`, `[]`, `{}`, `null`, `true`)

    _invalid_: `1`, `4`
