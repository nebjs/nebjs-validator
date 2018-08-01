const types = require('./type');
const enums = require('./enum');
const constant = require('./const');
const multipleOf = require('./multipleOf');
const numSize = require('./numSize');
const strLen = require('./strLen');
const pattern = require('./pattern');
const formats = require('./format');
const items = require('./items');
const arrItems = require('./arrItems');
const uniqueItems = require('./uniqueItems');
const contains = require('./contains');
const required = require('./required');
const patternRequired = require('./patternRequired');
const propsNum = require('./propsNum');
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
  ...constant,
  ...multipleOf,
  ...numSize,
  ...strLen,
  ...pattern,
  ...formats,
  ...items,
  ...arrItems,
  ...uniqueItems,
  ...contains,
  ...propsNum,
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
