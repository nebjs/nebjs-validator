## `formatMaximum` / `formatMinimum` and `formatExclusiveMaximum` / `formatExclusiveMinimum` (proposed)

The value of keyword `formatMaximum` (`formatMinimum`) should be a string. This value is the maximum (minimum) allowed value for the data to be valid as determined by `format` keyword.

Defines comparison rules for formats `"date"`, `"time"`, `"datetime"` and `"date-time"`.

The value of keyword `formatExclusiveMaximum` (`formatExclusiveMinimum`) should be a boolean value. These keyword cannot be used without `formatMaximum` (`formatMinimum`). If this keyword value is equal to `true`, the data to be valid should not be equal to the value in `formatMaximum` (`formatMinimum`) keyword.


__Example__

_schema_:

```json
{
    "format": "date",
    "formatMaximum": "2016-02-06",
    "formatExclusiveMaximum": true
}
```

_valid_: `"2015-12-31"`, `"2016-02-05"`, any non-string

_invalid_: `"2016-02-06"`, `"2016-02-07"`, `"abc"`
