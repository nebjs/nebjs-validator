const {schemaProperties} = require('../base/common');
/**
 * propertyNames关键字处理程序：data对象的子属性名称的验证...
 * 举例：{"propertyNames":{"foo":{"type":"string"},"bar":{"type":"number","minimum":2}}}
 * 符合：data: [{}, {"foo": "a"}, {"foo": "a", "bar": 2}]
 * 不符合: data: [{"foo": 1}, {"foo": "a", "bar": 1}]
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, state, schema} = stackItem;
  let doIt;
  switch (state) {
    case 0:
      doIt = false;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (schema && typeof schema === 'object' && !Array.isArray(schema)) {
          for (const dataName in data) {
            if (data.hasOwnProperty(dataName)) {
              if (schemaProperties({stack, schemaFrom: schema, parent: stackItem, data: dataName, dataFrom: data})) {
                doIt = true;
              }
            }
          }
        }
      }
      if (!doIt) {
        stackItem.state = -1;
      } else {
        stackItem.state++;
      }
      break;
    case 1:
      if (stackItem.errorItems.length > 0) {
        const {dataPath} = stackItem;
        stackItem.params = {};
        stackItem.message = 'data' + dataPath + ' property name should all valid';
        stackItem.errorItems = [stackItem];
      }
      stackItem.state = -1;
      break;
  }
};
const propertyNames = [
  {name: 'propertyNames', schema: {valid: {types: ['object']}}, data: {valid: dataValid}}];
module.exports = propertyNames;
