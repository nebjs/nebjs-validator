let isExclusiveMinimum, lastExclusiveMinimumStackItem;
const minimumMessage = 'data{{dataPath}} should be {{params.comparison}} {{params.minimum}}';
/**
 * minimum关键字处理程序：data值的是否大于等于schema（exclusiveMaximum时不能等于）
 * 举例：minimum: 3
 * 符合：data: [3, 4, 5]
 * 不符合: [1, 2]
 */
const minimumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (typeof data === 'number') {
    const exclusive = isExclusiveMinimum && lastExclusiveMinimumStackItem.parent === stackItem.parent;
    if (!(exclusive ? data > schema : data >= schema)) {
      stackItem.params = {comparison: exclusive ? '>=' : '>', minimum: schema, exclusive};
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const exclusiveMinimumMessage = 'data{{dataPath}} should be {{params.comparison}} {{params.exclusiveMinimum}}';
/**
 * exclusiveMinimum关键字处理程序：data值的是否大于schema
 * 举例：exclusiveMinimum: 3
 * 符合：data: [4, 5]
 * 不符合: [1, 2, 3]
 */
const exclusiveMinimumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  const tp = typeof schema;
  if (tp === 'number') {
    if (typeof data === 'number') {
      if (data <= schema) {
        stackItem.params = {comparison: '<', exclusiveMinimum: schema, exclusive: true};
        stackItem.errorItems.push(stackItem);
      }
    }
  } else {
    isExclusiveMinimum = schema;
    lastExclusiveMinimumStackItem = stackItem;
  }
  stackItem.state = -1;
};
let isExclusiveMaximum, lastExclusiveMaximumStackItem;
const maximumMessage = 'data{{dataPath}} should be {{params.comparison}} {{params.maximum}}';
/**
 * maximum关键字处理程序：data值的是否小于等于schema（exclusiveMaximum时不能等于）
 * 举例：maximum: 3
 * 符合：data: [1, 2, 3]
 * 不符合: [4, 5, 6]
 */
const maximumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (typeof data === 'number') {
    const exclusive = isExclusiveMaximum && lastExclusiveMaximumStackItem.parent === stackItem.parent;
    if (!(exclusive ? data < schema : data <= schema)) {
      stackItem.params = {comparison: exclusive ? '<=' : '<', maximum: schema, exclusive};
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const exclusiveMaximumMessage = 'data{{dataPath}} should be {{params.comparison}} {{params.exclusiveMaximum}}';
/**
 * exclusiveMaximum关键字处理程序：data值的是否小于schema
 * 举例：exclusiveMaximum: 3
 * 符合：data: [1, 2]
 * 不符合: [3, 4, 5, 6]
 */
const exclusiveMaximumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  const tp = typeof schema;
  if (tp === 'number') {
    if (typeof data === 'number') {
      if (data >= schema) {
        stackItem.params = {comparison: '>', exclusiveMaximum: schema, exclusive: true};
        stackItem.errorItems.push(stackItem);
      }
    }
  } else {
    isExclusiveMaximum = schema;
    lastExclusiveMaximumStackItem = stackItem;
  }
  stackItem.state = -1;
};
const numSize = [
  {name: 'minimum', schema: {valid: {types: ['number']}}, data: {valid: minimumDataValid}, ext: {message: minimumMessage}},
  {name: 'exclusiveMinimum', schema: {valid: {types: ['number', 'boolean']}}, data: {valid: exclusiveMinimumDataValid}, ext: {message: exclusiveMinimumMessage}},
  {name: 'maximum', schema: {valid: {types: ['number']}}, data: {valid: maximumDataValid}, ext: {message: maximumMessage}},
  {name: 'exclusiveMaximum', schema: {valid: {types: ['number', 'boolean']}}, data: {valid: exclusiveMaximumDataValid}, ext: {message: exclusiveMaximumMessage}}
];
module.exports = numSize;
