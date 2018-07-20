## `items`

The value of the keyword should be an object or an array of objects.

If the keyword value is an object, then for the data array to be valid each item of the array should be valid according to the schema in this value. In this case the "additionalItems" keyword is ignored.

If the keyword value is an array, then items with indices less than the number of items in the keyword should be valid according to the schemas with the same indices. Whether additional items are valid will depend on "additionalItems" keyword.


__Examples__

1.  _schema_: `{ "items": { "type": "integer" } }`

    _valid_: `[1,2,3]`, `[]`, any non-array (`1`, `"abc"`, `{}`, `null`, `true`)

    _invalid_: `[1,"abc"]`


2.  _schema_:
    ```json
    {
        "items": [
            { "type": "integer" },
            { "type": "string" }
        ]
    }
    ```

    _valid_: `[1]`, `[1, "abc"]`, `[1, "abc", 2]`, `[]`, any non-array (`1`, `"abc"`, `{}`, `null`, `true`)

    _invalid_: `["abc", 1]`, `["abc"]`



## `additionalItems`

The value of the keyword should be a boolean or an object.

If "items" keyword is not present or it is an object, "additionalItems" keyword is ignored regardless of its value.

If "items" keyword is an array and data array has not more items than the length of "items" keyword value, "additionalItems" keyword is also ignored.

If the length of data array is bigger than the length of "items" keyword value than the result of the validation depends on the value of "additionalItems" keyword:

- `false`: data is invalid
- `true`: data is valid
- an object: data is valid if all additional items (i.e. items with indices greater or equal than "items" keyword value length) are valid according to the schema in "additionalItems" keyword.


__Examples__

1.  _schema_: `{ "additionalItems": { "type": "integer" } }`

    any data is valid against such schema - "additionalItems" is ignored.


2.  _schema_:
    ```json
    {
        "items": { "type": "integer" },
        "additionalItems": { "type": "string" }
    }
    ```

    _valid_: `[]`, `[1, 2]`, any non-array ("additionalItems" is ignored)

    _invalid_: `[1, "abc"]`, (any array with some items other than integers)


3.  _schema_:
    ```json
    {
        "items": [
            { "type": "integer" },
            { "type": "integer" }
        ],
        "additionalItems": true
    }
    ```

    _valid_: `[]`, `[1, 2]`, `[1, 2, 3]`, `[1, 2, "abc"]`, any non-array

    _invalid_: `["abc"]`, `[1, "abc", 3]`


4.  _schema_:
    ```json
    {
        "items": [
            { "type": "integer" },
            { "type": "integer" }
        ],
        "additionalItems": { "type": "string" }
    }
    ```

    _valid_: `[]`, `[1, 2]`, `[1, 2, "abc"]`, any non-array

    _invalid_: `["abc"]`, `[1, 2, 3]`
