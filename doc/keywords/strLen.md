## `maxLength` / `minLength`

The value of the keywords should be a number. The data to be valid should have length satisfying this rule. Unicode pairs are counted as a single character.


__Examples__

1.  _schema_: `{ "maxLength": 5 }`

    _valid_: `"abc"`, `"abcde"`, any non-string (`1`, `[]`, `{}`, `null`, `true`)

    _invalid_: `"abcdef"`


2.  _schema_: `{ "minLength": 2 }`

    _valid_: `"ab"`, `"😀😀"`, any non-string (`1`, `[]`, `{}`, `null`, `true`)

    _invalid_: `"a"`, `"😀"`
