let isExclusiveMinimum, lastExclusiveMinimumStackItem;
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
      const {dataPath} = stackItem, comparison = exclusive ? '>=' : '>', minimum = schema;
      stackItem.params = {comparison, minimum, exclusive};
      stackItem.message = 'data' + dataPath + ' should be ' + comparison + ' ' + minimum;
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
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
        const {dataPath} = stackItem, comparison = '<', exclusiveMinimum = schema;
        stackItem.params = {comparison, exclusiveMinimum, exclusive: true};
        stackItem.message = 'data' + dataPath + ' should be ' + comparison + ' ' + exclusiveMinimum;
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
      const {dataPath} = stackItem, comparison = exclusive ? '<=' : '<', maximum = schema;
      stackItem.params = {comparison, maximum, exclusive};
      stackItem.message = 'data' + dataPath + ' should be ' + comparison + ' ' + maximum;
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
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
        const {dataPath} = stackItem, comparison = '>', exclusiveMaximum = schema;
        stackItem.params = {comparison, exclusiveMaximum, exclusive: true};
        stackItem.message = 'data' + dataPath + ' should be ' + comparison + ' ' + exclusiveMaximum;
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
  {name: 'minimum', schema: {valid: {types: ['number']}}, data: {valid: minimumDataValid}},
  {name: 'exclusiveMinimum', schema: {valid: {types: ['number', 'boolean']}}, data: {valid: exclusiveMinimumDataValid}},
  {name: 'maximum', schema: {valid: {types: ['number']}}, data: {valid: maximumDataValid}},
  {name: 'exclusiveMaximum', schema: {valid: {types: ['number', 'boolean']}}, data: {valid: exclusiveMaximumDataValid}}
];
module.exports = numSize;
