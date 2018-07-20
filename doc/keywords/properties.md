## `properties`

The value of the keyword should be a map with keys equal to data object properties. Each value in the map should be a JSON Schema. For data object to be valid the corresponding values in data object properties should be valid according to these schemas.

__Please note__: `properties` keyword does not require that the properties mentioned in it are present in the object (see examples).

__Example__

_schema_:
```json
{
    "properties": {
        "foo": { "type": "string" },
        "bar": {
            "type": "number",
            "minimum": 2
        }
    }
}
```

_valid_: `{}`, `{"foo": "a"}`, `{"foo": "a", "bar": 2}`, any non-object

_invalid_: `{"foo": 1}`, `{"foo": "a", "bar": 1}`



## `patternProperties`

The value of this keyword should be a map where keys should be regular expressions and the values should be JSON Schemas. For data object to be valid the values in data object properties that match regular expression(s) should be valid according to the corresponding schema(s).

When the value in data object property matches multiple regular expressions it should be valid according to all the schemas for all matched regular expressions.

__Please note__: `patternProperties` keyword does not require that properties matching patterns are present in the object (see examples).


__Example__

_schema_:
```json
{
    "patternProperties": {
        "^fo.*$": { "type": "string" },
        "^ba.*$": { "type": "number" }
    }
}
```

_valid_: `{}`, `{"foo": "a"}`, `{"foo": "a", "bar": 1}`, any non-object

_invalid_: `{"foo": 1}`, `{"foo": "a", "bar": "b"}`



## `additionalProperties`

The value of the keyword should be either a boolean or a JSON Schema.

If the value is `true` the keyword is ignored.

If the value is `false` the data object to be valid should not have "additional properties" (i.e. properties other than those used in "properties" keyword and those that match patterns in "patternProperties" keyword).

If the value is a schema for the data object to be valid the values in all "additional properties" should be valid according to this schema.


__Examples__

1.  _schema_:
    ```json
    {
        "properties": {
            "foo": { "type": "number" }
        },
        "patternProperties": {
            "^.*r$": { "type": "number" }
        },
        "additionalProperties": false
    }
    ```

    _valid_: `{}`, `{"foo": 1}`, `{"foo": 1, "bar": 2}`, any non-object

    _invalid_: `{"a": 3}`, `{"foo": 1, "baz": 3}`

2. _schema_:
    ```json
    {
        "properties": {
            "foo": { "type": "number" }
        },
        "patternProperties": {
            "^.*r$": { "type": "number" }
        },
        "additionalProperties": { "type": "string" }
    }
    ```

    _valid_: `{}`, `{"a": "b"}`, `{"foo": 1}`, `{"foo": 1, "bar": 2}`, `{"foo": 1, "bar": 2, "a": "b"}`, any non-object

    _invalid_: `{"a": 3}`, `{"foo": 1, "baz": 3}`

3. _schema_:
    ```json
    {
        "properties": {
            "foo": { "type": "number" }
        },
        "additionalProperties": false,
        "anyOf": [
            {
                "properties": {
                    "bar": { "type": "number" }
                }
            },
            {
                "properties": {
                    "baz": { "type": "number" }
                }
            }
        ]
    }
    ```
    _valid_: `{}`, `{"foo": 1}`, any non-object

    _invalid_: `{"bar": 2}`, `{"baz": 3}`, `{"foo": 1, "bar": 2}`, etc.
