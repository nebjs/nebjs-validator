## `patternRequired` (proposed)

The value of this keyword should be an array of strings, each string being a regular expression. For data object to be valid each regular expression in this array should match at least one property name in the data object.

If the array contains multiple regular expressions, more than one expression can match the same property name.

__Examples__

1.  _schema_: `{ "patternRequired": [ "f.*o" ] }`

    _valid_: `{ "foo": 1 }`, `{ "-fo-": 1 }`, `{ "foo": 1, "bar": 2 }`, any non-object

    _invalid_: `{}`, `{ "bar": 2 }`, `{ "Foo": 1 }`,

2.  _schema_: `{ "patternRequired": [ "f.*o", "b.*r" ] }`

    _valid_: `{ "foo": 1, "bar": 2 }`, `{ "foobar": 3 }`, any non-object

    _invalid_: `{}`, `{ "foo": 1 }`, `{ "bar": 2 }`
