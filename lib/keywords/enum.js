const nebUtil = require('nebjs-util');
const equal = nebUtil.common.equal;
/**
 * enum关键字处理程序：data值的是否在指定的schemas中
 * 举例：enum: [ 2, "foo", {"foo": "bar" }, [1, 2, 3] ]
 * 符合：data: 2, "foo", {"foo": "bar"}, [1, 2, 3]
 * 不符合: 1, "bar", {"foo": "baz"}, [1, 2, 3, 4], any value not in the array
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const dataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schema} = schemaStackItem;
  let valid = false;
  for (const sch of schema) {
    if (equal(sch, data)) {
      valid = true;
      break;
    }
  }
  if (!valid) {
    schemaStackItem.errors.push(schemaStackItem);
  }
  schemaStackItem.state = -1;
};
const enums = [
  {name: 'enum', schema: {}, data: {valid: dataValid}}
];
module.exports = enums;
