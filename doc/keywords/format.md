## `format`

The value of the keyword should be a string. The data to be valid should match the format with this name.

Defines these formats: date, date-time, uri, email, hostname, ipv4, ipv6, regex.


__Example__

_schema_: `{ "format": "ipv4" }`

_valid_: `"192.168.0.1"`, any non-string (`1`, `[]`, `{}`, `null`, `true`)

_invalid_: `"abc"`
