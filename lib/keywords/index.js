const types = require('./type');
const enums = require('./enum');
const consts = require('./const');
const multipleOf = require('./multipleOf');
const minimum = require('./minimum');
const maximum = require('./maximum');
const strLength = require('./strLength');
const pattern = require('./pattern');
const formats = require('./format');
const items = require('./items');
const arrItems = require('./arrItems');
const uniqueItems = require('./uniqueItems');
const contains = require('./contains');
const required = require('./required');
const patternRequired = require('./patternRequired');
const objProps = require('./objProps');
const properties = require('./properties');
const dependencies = require('./dependencies');
const propertyNames = require('./propertyNames');
const ifs = require('./if');
const oneOf = require('./oneOf');
const anyOf = require('./anyOf');
const allOf = require('./allOf');
const not = require('./not');
const keys = [
  ...types,
  ...enums,
  ...consts,
  ...multipleOf,
  ...minimum,
  ...maximum,
  ...strLength,
  ...pattern,
  ...formats,
  ...items,
  ...arrItems,
  ...uniqueItems,
  ...contains,
  ...objProps,
  ...required,
  ...patternRequired,
  ...properties,
  ...dependencies,
  ...propertyNames,
  ...ifs,
  ...oneOf,
  ...anyOf,
  ...allOf,
  ...not
];
module.exports = keys;
