<img width="160px" src="https://raw.githubusercontent.com/nebjs/nebjs-util-web/master/images/logo.png">

# nebjs-corrector: A Javascript Common Development Library

A Javascript Common Development Library For NebJS/Web/NodeJS, 
For a complete explanation, go to github :[nebjs-corrector](https://github.com/nebjs/nebjs-corrector)

[![npm](https://img.shields.io/npm/v/nebjs-corrector.svg)](https://www.npmjs.com/package/nebjs-corrector)
[![npm downloads](https://img.shields.io/npm/dm/nebjs-corrector.svg)](https://www.npmjs.com/package/nebjs-corrector)
[![GitHub release](https://img.shields.io/github/release/nebjs/nebjs-corrector.svg)](https://github.com/nebjs/nebjs-corrector)
[![GitHub commits](https://img.shields.io/github/commits-since/nebjs/nebjs-corrector/v1.0.8.svg)](https://github.com/nebjs/nebjs-corrector)
[![npm license](https://img.shields.io/npm/l/nebjs-corrector.svg)](/LICENSE)
<!--
[![GitHub tag](https://img.shields.io/github/tag/nebjs/nebjs-corrector.svg)](https://github.com/nebjs/nebjs-corrector)
[![GitHub package](https://img.shields.io/github/package-json/v/nebjs/nebjs-corrector.svg)](https://github.com/nebjs/nebjs-corrector)
-->

## Install

```
npm install nebjs-corrector
```

## Getting started
```javascript
// Import the model class object
const {Schema: correctorSchema} = require('nebjs-corrector');
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
// Configuration when creating a model corrector
const options = {};
// Create a corrector for the corresponding model
const corrector = new correctorSchema(schema, options);
// Call validation methods to verify the validity of the object
const valid = corrector.validate([1, 'a']);
// Output verification results
console.log(valid);
// Validation fails and errorItems can be returned through the erros object
if (!valid) console.log(corrector.errorItems);
```

## Keywords Introduction
### JSON Schema validation keywords

In a simple way, JSON Schema is an object with validation keywords.

The keywords and their values define what rules the data should satisfy to be valid.
[Keywords](/doc/keywords/index.md)

## Contents && Document

