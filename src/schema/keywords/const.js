const nebUtil = require('nebjs-util');
const equal = nebUtil.common.equal;
const message = 'data{{dataPath}} should be equal to const';
/**
 * const关键字处理程序：data值的是否等于schema
 * 举例：const: [1, 2, 3]
 * 符合：data: [1, 2, 3]
 * 不符合: [1, 2, 3, 4]
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {schema, data} = stackItem;
  if (!equal(schema, data)) {
    stackItem.params = {const: schema};
    stackItem.errorItems.push(stackItem);
  }
  stackItem.state = -1;
};
const consts = [
  {name: 'const', schema: {}, data: {valid: dataValid}, ext: {message}}
];
module.exports = consts;
