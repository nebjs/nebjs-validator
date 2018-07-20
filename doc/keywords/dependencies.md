## `dependencies`

The value of the keyword is a map with keys equal to data object properties. Each value in the map should be either an array of unique property names ("property dependency") or a JSON Schema ("schema dependency").

For property dependency, if the data object contains a property that is a key in the keyword value, then to be valid the data object should also contain all properties from the array of properties.

For schema dependency, if the data object contains a property that is a key in the keyword value, then to be valid the data object itself (NOT the property value) should be valid according to the schema.


__Examples__

1.  _schema (property dependency)_:
    ```json
    {
        "dependencies": {
            "foo": ["bar", "baz"]
        }
    }
    ```

    _valid_: `{"foo": 1, "bar": 2, "baz": 3}`, `{}`, `{"a": 1}`, any non-object

    _invalid_: `{"foo": 1}`, `{"foo": 1, "bar": 2}`, `{"foo": 1, "baz": 3}`


2.  _schema (schema dependency)_:
    ```json
    {
        "dependencies": {
            "foo": {
                "properties": {
                    "bar": { "type": "number" }
                }
            }
        }
    }
    ```

    _valid_: `{}`, `{"foo": 1}`, `{"foo": 1, "bar": 2}`, `{"a": 1}`, any non-object

    _invalid_: `{"foo": 1, "bar": "a"}`
