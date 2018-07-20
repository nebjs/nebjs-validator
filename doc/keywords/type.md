## `type`

`type` keyword requires that the data is of certain type (or some of types). Its value can be a string (the allowed type) or an array of strings (multiple allowed types).

Type can be: `number`, `integer`, `string`, `boolean`, `array`, `object` or `null`.


__Examples__

1.  _schema_: `{ "type": "number" }`

    _valid_: `1`, `1.5`

    _invalid_: `"abc"`, `"1"`, `[]`, `{}`, `null`, `true`


2.  _schema_: `{ "type": "integer" }`

    _valid_: `1`, `2`

    _invalid_: `"abc"`, `"1"`, `1.5`, `[]`, `{}`, `null`, `true`


3.  _schema_: `{ "type": ["number", "string"] }`

    _valid_: `1`, `1.5`, `"abc"`, `"1"`

    _invalid_: `[]`, `{}`, `null`, `true`


All examples above are JSON Schemas that only require data to be of certain type to be valid.

Most other keywords apply only to a particular type of data. If the data is of different type, the keyword will not apply and the data will be considered valid.
