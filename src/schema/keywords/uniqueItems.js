const nebUtil = require('nebjs-util');
const uniqueItem = nebUtil.array.uniqueItem;
const message = 'data{{dataPath}} should not have duplicate item';
/**
 * uniqueItems关键字处理程序：data数组无重复元素
 * 举例：uniqueItems: true
 * 符合：data: [[], [1, 2, 3], [1, "a"]]
 * 不符合: data: [[1, 1, 2], [1, {"a": "b", "b": "c"}, {"b": "c", "a": "b"}]
 */
const uniqueItemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (Array.isArray(data) && schema) {
    if (!uniqueItem(data)) {
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const strLength = [
  {name: 'uniqueItems', schema: {valid: {types: ['boolean']}}, data: {valid: uniqueItemsDataValid}, ext: {message}}
];
module.exports = strLength;
