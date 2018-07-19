const nebUtil = require('nebjs-util');
const trimString = nebUtil.string.trim;
const objCopy = nebUtil.object.copy;
/**
 * 注册的需要遍历处理的关键字..
 */
const regKeys = [];
/**
 * 注册的所有关键字
 * name: {
 *  option: {
 *   ..
 *  },
 *  index: 0
 * }
 */
const regKeywords = {};
/**
 * 注册关键字
 * @param keywords
 * [{
 *  name: '', 注册关键字名称
 *  schema: {
 *    array: false, 为数组，当不是数组时，自动转换
 *    valid: {// 用于模型验证,
 *      types: ['', ..], 注册关键字支持的类型
 *      value: function(val){}, 关键字值验证器，this指向当前validator实例
 *    }
 *  },
 *  data: {
 *    valid: function(schemasStack, dataStack){}, 关键字验证器，this指向当前validator实例
 *  },
 *  ext: {}, 用户扩展信息
 * },..]
 * @return {Number} 成功注册的关键字数量
 */
const registerKeywords = function (keywords) {
  if (!(keywords && Array.isArray(keywords) && keywords.length > 0)) throw new TypeError('keywords must be a non-empty array');
  let num = 0;
  for (const keyword of keywords) {
    if (!(keyword && keyword.constructor === Object)) throw new TypeError('keyword must be a object');
    const regKey = objCopy({schema: {array: false, valid: {types: [], value: null}}, data: {valid: null}, ext: {}}, keyword, {deep: true});
    let {name, schema, data, ext} = regKey;
    if (!(name && typeof name === 'string' && (name = trimString(name)).length > 0)) throw new TypeError('keyword\'s name must be a non-empty string');
    regKey.name = name;
    let mapVal = regKeywords[name];
    if (mapVal) throw new TypeError('keyword ' + name + ' have already registered');
    if (schema.constructor !== Object) throw new TypeError('keyword ' + name + ' \'s schema must be a object');
    if (data.constructor !== Object) throw new TypeError('keyword ' + name + ' \'s data must be a object');
    const {array, valid: valid} = schema;
    if (array !== true && array !== false) throw new TypeError('keyword ' + name + ' \'s schema.array must be a boolean');
    if (valid) {
      if (valid.constructor !== Object) throw new TypeError('keyword ' + name + '\'s schema.valid must be a object');
      const {types, value} = valid;
      if (!(types && Array.isArray(types))) throw new TypeError('keyword ' + name + '\'s schema.valid.types must be a array');
      if (value && typeof value !== 'function') throw new TypeError('keyword ' + name + '\'s schema.valid.value must be a function');
    }
    const {valid: dataValid} = data;
    if (dataValid && typeof dataValid !== 'function') throw new TypeError('keyword ' + name + '\'s dataValid must be a function');
    if (!(ext && ext.constructor === Object)) throw new TypeError('keyword ' + name + '\'s ext must be a object');
    mapVal = regKeywords[name] = {option: regKey};
    mapVal.index = regKeys.length;
    regKeys.push(regKey);
    num++;
  }
  return num;
};
/**
 * 获取注册关键字的信息
 * @param keywordName 关键字名称
 * @param attrName 属性名称
 * @return {Object|null} 格式：{option: {}, index: }
 */
const getRegisterKeywordsInfo = function (keywordName, attrName) {
  const info = regKeywords[keywordName] || null;
  return info && attrName ? info[attrName] || null : info;
};
module.exports = {registerKeywords, getRegisterKeywordsInfo, regKeys, regKeywords};
