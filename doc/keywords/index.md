# JSON Schema validation keywords


In a simple way, JSON Schema is an object with validation keywords.

The keywords and their values define what rules the data should satisfy to be valid.

## Validation Keywords for Any Instance Type
- [type](#type)
- [enum](#enum)
- [const](#const)

## Validation Keywords for Numeric Instances (number and integer)
- [multipleOf](#multipleOf)
- [minimum](#minimum)
- [exclusiveMinimum](#exclusiveMinimum)
- [maximum](#maximum)
- [exclusiveMaximum](#exclusiveMaximum)

## Validation Keywords for Strings
- [maxLength](#maxLength)
- [minLength](#minLength)
- [pattern](#pattern)
- [format](#format)
- [formatMinimum](#formatMinimum)
- [formatExclusiveMinimum](#formatExclusiveMinimum)
- [formatMaximum](#formatMaximum)
- [formatExclusiveMaximum](#formatExclusiveMaximum)

## Validation Keywords for Arrays
- [items](#items)
- [additionalItems](#additionalItems)
- [maxItems](#maxItems)
- [minItems](#minItems)
- [uniqueItems](#uniqueItems)
- [contains](#contains)

## Validation Keywords for Objects
- [maxProperties](#maxProperties)
- [minProperties](#minProperties)
- [required](#required)
- [patternRequired](#patternRequired)
- [properties](#properties)
- [patternProperties](#patternProperties)
- [additionalProperties](#additionalProperties)
- [dependencies](#dependencies)
- [propertyNames](#propertyNames)

## Keywords for Applying Subschemas Conditionally
- [if](#if)
- [then](#then)
- [else](#else)

## Keywords for Applying Subschemas With Boolean Logic
- [allOf](#allOf)
- [anyOf](#anyOf)
- [oneOf](#oneOf)
- [not](#not)

