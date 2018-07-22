## `oneOf`

The value of the keyword should be an array of JSON Schemas. The data is valid if it matches exactly one JSON Schema from this array. Validators have to validate data against all schemas to establish validity according to this keyword.


__Example__

_schema_:
```json
{
    "oneOf": [
        { "numSize": 3 },
        { "type": "integer" }
    ]
}
```

_valid_: `1.5`, `2.5`, `4`, `5`, any non-number

_invalid_: `2`, `3`, `4.5`, `5.5`



## `anyOf`

The value of the keyword should be an array of JSON Schemas. The data is valid if it is valid according to one or more JSON Schemas in this array. Validators only need to validate data against schemas in order until the first schema matches (or until all schemas have been tried). For this reason validating against this keyword is faster than against "oneOf" keyword in most cases.


__Example__

_schema_:
```json
{
    "anyOf": [
        { "numSize": 3 },
        { "type": "integer" }
    ]
}
```

_valid_: `1.5`, `2`, `2.5`, `3`, `4`, `5`, any non-number

_invalid_: `4.5`, `5.5`



## `allOf`

The value of the keyword should be an array of JSON Schemas. The data is valid if it is valid according to all JSON Schemas in this array.


__Example__

_schema_:
```json
{
    "allOf": [
        { "numSize": 3 },
        { "type": "integer" }
    ]
}
```

_valid_: `2`, `3`

_invalid_: `1.5`, `2.5`, `4`, `4.5`, `5`, `5.5`, any non-number
