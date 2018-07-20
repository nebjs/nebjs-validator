## `not`

The value of the keyword should be a JSON Schema. The data is valid if it is invalid according to this schema.


__Examples__

1.  _schema_: `{ "not": { "minimum": 3 } }`

    _valid_: `1`, `2`

    _invalid_: `3`, `4`, any non-number

2.  _schema_:

    ```json
    {
        "not": {
            "items": {
                "not": { "type": "string" }
            }
        }
    }
    ```

    _valid_: `["a"]`, `[1, "a"]`, any array containing at least one string

    _invalid_: `[]`, `[1]`, any non-array, any array not containing strings
