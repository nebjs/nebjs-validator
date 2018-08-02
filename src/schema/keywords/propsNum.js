const maxPropertiesMessage = 'data{{dataPath}} should not have more than {{params.maxProperties}} property';
/**
 * maxProperties关键字处理程序：data对象属性数量最大值
 * 举例：maxProperties: 2
 * 符合：data: [{}, {"a": 1}, {"a": 1, "b": 2}]
 * 不符合: data: [{"a": 1, "b": 2, "c": 3}]
 */
const maxPropertiesDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    let len = 0, err = false;
    for (const n in data) {
      if (data.hasOwnProperty(n)) {
        len++;
        if (len > schema) {
          err = true;
          break;
        }
      }
    }
    if (err) {
      stackItem.params = {maxProperties: schema};
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const minPropertiesMessage = 'data{{dataPath}} should not have less than {{params.minProperties}} property';
/**
 * minProperties关键字处理程序：data字符串长度最大值
 * 举例：minProperties: 2
 * 符合：data: [{"a": 1, "b": 2}, {"a": 1, "b": 2, "c": 3}]
 * 不符合: data: [{}, {"a": 1}]
 */
const minPropertiesDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    let len = 0;
    for (const n in data) {
      if (data.hasOwnProperty(n)) {
        len++;
      }
    }
    if (len < schema) {
      stackItem.params = {minProperties: schema};
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const valid = function (val) {
  return val >= 0 && val % 1 === 0;
};
const strLength = [
  {name: 'maxProperties', schema: {valid: {types: ['number'], value: valid}}, data: {valid: maxPropertiesDataValid}, ext: {message: maxPropertiesMessage}},
  {name: 'minProperties', schema: {valid: {types: ['number'], value: valid}}, data: {valid: minPropertiesDataValid}, ext: {message: minPropertiesMessage}}
];
module.exports = strLength;
