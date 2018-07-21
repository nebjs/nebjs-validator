let isExclusiveMinimum, lastExclusiveMinimumStackItem;
/**
 * minimum关键字处理程序：data值的是否大于等于schema（exclusiveMaximum时不能等于）
 * 举例：minimum: 3
 * 符合：data: [3, 4, 5]
 * 不符合: [1, 2]
 * @param stack 栈
 */
const minimumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (typeof data === 'number') {
    let ok = false;
    if (isExclusiveMinimum && lastExclusiveMinimumStackItem.parent === stackItem.parent) {
      // 大于模式
      ok = data > schema;
    } else {
      // 大于等于模式
      ok = data >= schema;
    }
    if (!ok) {
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
 * @param stack 栈
 */
const exclusiveMinimumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  const tp = typeof schema;
  if (tp === 'number') {
    if (typeof data === 'number') {
      if (data <= schema) {
        stackItem.errorItems.push(stackItem);
      }
    }
  } else {
    isExclusiveMinimum = schema;
    lastExclusiveMinimumStackItem = stackItem;
  }
  stackItem.state = -1;
};
const minimum = [
  {name: 'minimum', schema: {valid: {types: ['number']}}, data: {valid: minimumDataValid}},
  {name: 'exclusiveMinimum', schema: {valid: {types: ['number', 'boolean']}}, data: {valid: exclusiveMinimumDataValid}}
];
module.exports = minimum;
