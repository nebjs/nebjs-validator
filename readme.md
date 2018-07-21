<img width="160px" src="https://raw.githubusercontent.com/nebjs/nebjs-util-web/master/images/logo.png">

# nebjs-validator: A Javascript Common Development Library

A Javascript Common Development Library For NebJS/Web/NodeJS, 
For a complete explanation, go to github :[nebjs-validator](https://github.com/nebjs/nebjs-validator)

[![npm](https://img.shields.io/npm/v/nebjs-validator.svg)](https://www.npmjs.com/package/nebjs-validator)
[![npm downloads](https://img.shields.io/npm/dm/nebjs-validator.svg)](https://www.npmjs.com/package/nebjs-validator)
[![GitHub release](https://img.shields.io/github/release/nebjs/nebjs-validator.svg)](https://github.com/nebjs/nebjs-validator)
[![GitHub commits](https://img.shields.io/github/commits-since/nebjs/nebjs-validator/v1.0.8.svg)](https://github.com/nebjs/nebjs-validator)
[![npm license](https://img.shields.io/npm/l/nebjs-validator.svg)](/LICENSE)
<!--
[![GitHub tag](https://img.shields.io/github/tag/nebjs/nebjs-validator.svg)](https://github.com/nebjs/nebjs-validator)
[![GitHub package](https://img.shields.io/github/package-json/v/nebjs/nebjs-validator.svg)](https://github.com/nebjs/nebjs-validator)
-->

## Install

```
npm install nebjs-validator
```

## Getting started
```javascript
// Import the model class object
const {Schema: ValidatorSchema} = require('nebjs-validator');
// Validation model (JSON SCHEMA)
const schema = {
  type: 'object',
  properties: {
    account: {
      if: {
        not: {format: 'phone'}
      },
      then: {format: 'email'},
      else: {format: 'phone'}
    }
  }
};
// Configuration when creating a model validator
const options = {};
// Create a validator for the corresponding model
const validator = new ValidatorSchema(schema, options);
// Call validation methods to verify the validity of the object
const valid = validator.validate([1, 'a']);
// Output verification results
console.log(valid);
// Validation fails and errorItems can be returned through the erros object
if (!valid) console.log(validator.errorItems);
```

## Keywords Introduction
### JSON Schema validation keywords

In a simple way, JSON Schema is an object with validation keywords.

The keywords and their values define what rules the data should satisfy to be valid.
[Keywords](/doc/keywords/index.md)

## Contents && Document

