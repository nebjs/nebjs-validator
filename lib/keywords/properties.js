let doProps, doPatternProps, lastPropertiesStackItem, lastPatternPropertiesStackItem;
const {schemaProperties} = require('../common');
/**
 * additionalProperties关键字处理程序，当为false时，不允许添加额外多余项，当为{}时检测额外项
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const additionalPropertiesDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {state} = schemaStackItem, {data} = dataStackItem;
  let haveProps, havePatternProps, addProps, addLen;
  switch (state) {
    case 0:
      haveProps = lastPropertiesStackItem && lastPropertiesStackItem.upStackItem === schemaStackItem.upStackItem;
      havePatternProps = lastPatternPropertiesStackItem && lastPatternPropertiesStackItem.upStackItem === schemaStackItem.upStackItem;
      addProps = [];
      if (haveProps || havePatternProps) {
        for (const name in data) {
          if (data.hasOwnProperty(name)) {
            if (!((doProps && doProps[name]) || (doPatternProps && doPatternProps[name]))) {
              addProps.push(name);
            }
          }
        }
      }
      addLen = addProps.length;
      if (addLen > 0) {
        const {schema} = schemaStackItem;
        if (typeof schema === 'boolean') {
          if (!schema) {
            schemaStackItem.errors.push(schemaStackItem);
            schemaStackItem.state = -1;
          } else {
            schemaStackItem.state = -1;
          }
        } else {
          for (let i = addLen - 1; i >= 0; --i) {
            const propName = addProps[i];
            schemaProperties({schemasStack, dataStack, schemaFrom: schemaStackItem.schema, upStackItem: schemaStackItem, data: data[propName], dataFrom: data, dataName: propName});
          }
          schemaStackItem.state++;
        }
      } else {
        schemaStackItem.state = -1;
      }
      break;
    case 1:
      schemaStackItem.state = -1;
      break;
  }
};
/**
 * patternProperties关键字处理程序：data对象的子属性验证...
 * 举例：{"patternProperties":{"^fo.*$":{"type":"string"},"^ba.*$":{"type":"number"}}}
 * 符合：data: [{}, {"foo": "a"}, {"foo": "a", "bar": 1}]
 * 不符合: data: [{"foo": 1}, {"foo": "a", "bar": "b"}]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const patternPropertiesDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {state, schema} = schemaStackItem;
  let doIt;
  switch (state) {
    case 0:
      doIt = false;
      doPatternProps = {};
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (schema && typeof schema === 'object' && !Array.isArray(schema)) {
          for (const propName in schema) {
            if (schema.hasOwnProperty(propName)) {
              const reg = new RegExp(propName);
              for (const dataName in data) {
                if (data.hasOwnProperty(dataName) && reg.test(dataName)) {
                  if (schemaProperties({schemasStack, dataStack, schemaFrom: schema[propName], upStackItem: schemaStackItem, data: data[dataName], dataFrom: data, dataName})) {
                    doIt = true;
                    doPatternProps[dataName] = true;
                  }
                }
              }
            }
          }
        }
      }
      if (!doIt) {
        schemaStackItem.state = -1;
        doPatternProps = null;
      } else {
        schemaStackItem.state++;
      }
      lastPatternPropertiesStackItem = schemaStackItem;
      break;
    case 1:
      schemaStackItem.state = -1;
      break;
  }
};
const patternPropertiesValid = function (val) {
  for (const name in val) {
    if (val.hasOwnProperty(name)) {
      try {
        new RegExp(name);
      } catch (e) {
        return false;
      }
    }
  }
  return true;
};
/**
 * properties关键字处理程序：data对象的子属性验证...
 * 举例：{"properties":{"foo":{"type":"string"},"bar":{"type":"number","minimum":2}}}
 * 符合：data: [{}, {"foo": "a"}, {"foo": "a", "bar": 2}]
 * 不符合: data: [{"foo": 1}, {"foo": "a", "bar": 1}]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const propertiesDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {state, schema} = schemaStackItem;
  let doIt;
  switch (state) {
    case 0:
      doIt = false;
      doProps = {};
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (schema && typeof schema === 'object' && !Array.isArray(schema)) {
          for (const propName in schema) {
            if (schema.hasOwnProperty(propName) && data.hasOwnProperty(propName)) {
              if (schemaProperties({schemasStack, dataStack, schemaFrom: schema[propName], upStackItem: schemaStackItem, data: data[propName], dataFrom: data, dataName: propName})) {
                doIt = true;
                doProps[propName] = true;
              }
            }
          }
        }
      }
      if (!doIt) {
        schemaStackItem.state = -1;
        doProps = null;
      } else {
        schemaStackItem.state++;
      }
      lastPropertiesStackItem = schemaStackItem;
      break;
    case 1:
      schemaStackItem.state = -1;
      break;
  }
};
const properties = [
  {name: 'additionalProperties', schema: {valid: {types: ['boolean', 'object']}}, data: {valid: additionalPropertiesDataValid}},
  {name: 'patternProperties', schema: {valid: {types: ['object'], value: patternPropertiesValid}}, data: {valid: patternPropertiesDataValid}},
  {name: 'properties', schema: {valid: {types: ['object']}}, data: {valid: propertiesDataValid}}
];
module.exports = properties;
