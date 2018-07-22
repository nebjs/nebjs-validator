/**
 * multipleOf关键字处理程序：data值的是否是schema的倍数
 * 举例：multipleOf: 1.5
 * 符合：data: [1.5, 3, 6]
 * 不符合: [1, 2, 3, 4]
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (typeof data === 'number') {
    if (data % schema !== 0) {
      const {dataPath} = stackItem;
      stackItem.params = {multipleOf: schema};
      stackItem.message = 'data' + dataPath + ' should be multiple of ' + schema;
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const multipleOf = [{
  name: 'multipleOf', schema: {
    valid: {
      types: ['number'], value(val) {
        return val > 0;
      }
    }
  }, data: {valid: dataValid}
}];
module.exports = multipleOf;
