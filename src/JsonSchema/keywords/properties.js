let doProps, doPatternProps, lastPropertiesStackItem, lastPatternPropertiesStackItem;
const {schemaProperties} = require('../../core/common');
/**
 * additionalProperties关键字处理程序，当为false时，不允许添加额外多余项，当为{}时检测额外项
 */
const additionalPropertiesDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, state} = stackItem;
  let haveProps, havePatternProps, addProps, addLen;
  switch (state) {
    case 0:
      haveProps = lastPropertiesStackItem && lastPropertiesStackItem.parent === stackItem.parent;
      havePatternProps = lastPatternPropertiesStackItem && lastPatternPropertiesStackItem.parent === stackItem.parent;
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
        const {schema} = stackItem;
        if (typeof schema === 'boolean') {
          if (!schema) {
            const {dataPath} = stackItem;
            stackItem.params = {};
            stackItem.message = 'data' + dataPath + ' data should NOT have additional properties';
            stackItem.errorItems.push(stackItem);
          }
          stackItem.state = -1;
        } else {
          for (let i = addLen - 1; i >= 0; --i) {
            const propName = addProps[i];
            schemaProperties(this.context, {stack, schemaFrom: stackItem.schema, parent: stackItem, data: data[propName], dataFrom: data, dataName: propName});
          }
          stackItem.state++;
        }
      } else {
        stackItem.state = -1;
      }
      break;
    case 1:
      stackItem.state = -1;
      break;
  }
};
/**
 * patternProperties关键字处理程序：data对象的子属性验证...
 * 举例：{"patternProperties":{"^fo.*$":{"type":"string"},"^ba.*$":{"type":"number"}}}
 * 符合：data: [{}, {"foo": "a"}, {"foo": "a", "bar": 1}]
 * 不符合: data: [{"foo": 1}, {"foo": "a", "bar": "b"}]
 */
const patternPropertiesDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, state, schema} = stackItem;
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
                  if (schemaProperties(this.context, {stack, schemaFrom: schema[propName], parent: stackItem, data: data[dataName], dataFrom: data, dataName})) {
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
        stackItem.state = -1;
        doPatternProps = null;
      } else {
        stackItem.state++;
      }
      lastPatternPropertiesStackItem = stackItem;
      break;
    case 1:
      stackItem.state = -1;
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
 */
const propertiesDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, state, schema} = stackItem;
  let doIt;
  switch (state) {
    case 0:
      doIt = false;
      doProps = {};
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (schema && typeof schema === 'object' && !Array.isArray(schema)) {
          for (const propName in schema) {
            if (schema.hasOwnProperty(propName) && data.hasOwnProperty(propName)) {
              if (schemaProperties(this.context, {stack, schemaFrom: schema[propName], parent: stackItem, data: data[propName], dataFrom: data, dataName: propName})) {
                doIt = true;
                doProps[propName] = true;
              }
            }
          }
        }
      }
      if (!doIt) {
        stackItem.state = -1;
        doProps = null;
      } else {
        stackItem.state++;
      }
      lastPropertiesStackItem = stackItem;
      break;
    case 1:
      stackItem.state = -1;
      break;
  }
};
const properties = [
  {name: 'additionalProperties', schema: {valid: {types: ['boolean', 'object']}}, data: {valid: additionalPropertiesDataValid}},
  {name: 'patternProperties', schema: {valid: {types: ['object'], value: patternPropertiesValid}}, data: {valid: patternPropertiesDataValid}},
  {name: 'properties', schema: {valid: {types: ['object']}}, data: {valid: propertiesDataValid}}
];
module.exports = properties;
