## `if`/`then`/`else`

These keywords allow to implement conditional validation. Their values should be valid JSON Schemas (object or boolean).

If `if` keyword is absent, the validation succeds.

If the data is valid against the sub-schema in `if` keyword, then the validation result is equal to the result of data validation against the sub-schema in `then` keyword (if `then` is absent, the validation succeeds).

If the data is invalid against the sub-schema in `if` keyword, then the validation result is equal to the result of data validation against the sub-schema in `else` keyword (if `else` is absent, the validation succeeds).


__Examples__

1.  _schema_:

    ```json
    {
        "if": { "properties": { "power": { "minimum": 9000 } } },
        "then": { "required": [ "disbelief" ] },
        "else": { "required": [ "confidence" ] }
    }
    ```

    _valid_:

    - `{ "power": 10000, "disbelief": true }`
    - `{ "power": 1000, "confidence": true }`
    - any non-object

    _invalid_:

    - `{ "power": 10000 }` (`disbelief` is required)
    - `{ "power": 10000, "confidence": true }` (`disbelief` is required)
    - `{ "power": 1000 }` (`confidence` is required)


2.  _schema_:

    ```json
    {
        "type": "integer",
        "minimum": 1,
        "maximum": 1000,
        "if": { "minimum": 100 },
        "then": { "multipleOf": 100 },
        "else": {
            "if": { "minimum": 10 },
            "then": { "multipleOf": 10 }
        }
    }
    ```

    _valid_: `1`, `5`, `10`, `20`, `50`, `100`, `200`, `500`, `1000`

    _invalid_:

    - `-1`, `0` (<1)
    - `2000` (>1000)
    - `11`, `57`, `123` (any number with more than one non-zero digit)
    - non-integers
