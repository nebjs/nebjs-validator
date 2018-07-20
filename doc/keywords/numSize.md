## `maximum` / `minimum` and `exclusiveMaximum` / `exclusiveMinimum`

The value of keyword `maximum` (`minimum`) should be a number. This value is the maximum (minimum) allowed value for the data to be valid.

Draft-04: The value of keyword `exclusiveMaximum` (`exclusiveMinimum`) should be a boolean value. These keyword cannot be used without `maximum` (`minimum`). If this keyword value is equal to `true`, the data should not be equal to the value in `maximum` (`minimum`) keyword to be valid.

Draft-06/07: The value of keyword `exclusiveMaximum` (`exclusiveMinimum`) should be a number. This value is the exclusive maximum (minimum) allowed value for the data to be valid (the data equal to this keyword value is invalid).

Supports both draft-04 and draft-06/07 syntaxes.


__Examples__

1.  _schema_: `{ "maximum": 5 }`

    _valid_: `4`, `5`, any non-number (`"abc"`, `[]`, `{}`, `null`, `true`)

    _invalid_: `6`, `7`


2.  _schema_: `{ "minimum": 5 }`

    _valid_: `5`, `6`, any non-number (`"abc"`, `[]`, `{}`, `null`, `true`)

    _invalid_: `4`, `4.5`


3.  _schema_:
        draft-04: `{ "minimum": 5, "exclusiveMinimum": true }`
        draft-06/07: `{ "exclusiveMinimum": 5 }`

    _valid_: `6`, `7`, any non-number (`"abc"`, `[]`, `{}`, `null`, `true`)

    _invalid_: `4.5`, `5`
