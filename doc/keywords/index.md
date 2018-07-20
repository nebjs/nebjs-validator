# JSON Schema validation keywords


In a simple way, JSON Schema is an object with validation keywords.

The keywords and their values define what rules the data should satisfy to be valid.

## Validation Keywords for Any Instance Type
- [type](type.md)
- [enum](enum.md)
- [const](const.md)

## Validation Keywords for Numeric Instances (number and integer)
- [multipleOf](multipleOf.md)
- [minimum / exclusiveMinimum / maximum / exclusiveMaximum](numSize.md)

## Validation Keywords for Strings
- [maxLength / minLength](strLen.md)
- [pattern](pattern.md)
- [format](format.md)
- [formatMinimum / formatExclusiveMinimum / formatMaximum / formatExclusiveMaximum](formatSize.md)

## Validation Keywords for Arrays
- [items / additionalItems](items.md)
- [maxItems / minItems](itemsSize.md)
- [uniqueItems](uniqueItems.md)
- [contains](contains.md)

## Validation Keywords for Objects
- [maxProperties / minProperties](propertiesSize.md)
- [required](required.md)
- [patternRequired](patternRequired.md)
- [properties / patternProperties / additionalProperties](properties.md)
- [dependencies](dependencies.md)
- [propertyNames](propertyNames.md)

## Keywords for Applying Subschemas Conditionally
- [if / then / else](if.md)

## Keywords for Applying Subschemas With Boolean Logic
- [allOf / anyOf / oneOf](aOf.md)
- [not](not.md)
