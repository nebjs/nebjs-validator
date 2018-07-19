const {schemaProperties} = require('../common');
/**
 * propertyNames关键字处理程序：data对象的子属性名称的验证...
 * 举例：{"propertyNames":{"foo":{"type":"string"},"bar":{"type":"number","minimum":2}}}
 * 符合：data: [{}, {"foo": "a"}, {"foo": "a", "bar": 2}]
 * 不符合: data: [{"foo": 1}, {"foo": "a", "bar": 1}]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const dataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {state, schema} = schemaStackItem;
  let doIt;
  switch (state) {
    case 0:
      doIt = false;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (schema && typeof schema === 'object' && !Array.isArray(schema)) {
          for (const dataName in data) {
            if (data.hasOwnProperty(dataName)) {
              if (schemaProperties({schemasStack, dataStack, schemaFrom: schema, upStackItem: schemaStackItem, data: dataName, dataFrom: data})) {
                doIt = true;
              }
            }
          }
        }
      }
      if (!doIt) {
        schemaStackItem.state = -1;
      } else {
        schemaStackItem.state++;
      }
      break;
    case 1:
      schemaStackItem.state = -1;
      break;
  }
};
const propertyNames = [
  {name: 'propertyNames', schema: {valid: {types: ['object']}}, data: {valid: dataValid}}];
module.exports = propertyNames;
