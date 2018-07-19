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
 *    merge: true, 合并处理关键字相应的模型值（数组），当为false时，多个模型值将被分成多次处理,
 *    only: false, 只有一个，无论它是什么值，都被转换为[???],
 *    valid: {// 用于模型验证,
 *      maxItems: 0, 最大元素个数，0代表无穷
 *      types: ['', ..], 注册关键字支持的类型
 *      equal: [], 关键值中的有值包含
 *      not: [], 关键值中的各值不得包含
 *      value: function(schemasStack, val, i){}, 局部关键字值验证器，this指向当前validator实例
 *      values: function(schemasStack){}, 关键字值验证器，this指向当前validator实例
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
    const regKey = objCopy({
      schema: {merge: true, only: false, valid: {maxItems: 0, types: [], equal: [], not: [], valueValid: null, valuesValid: null}},
      data: {valid: null}, ext: {}
    }, keyword, {deep: true});
    let {name, schema, data, ext} = regKey;
    if (!(name && typeof name === 'string' && (name = trimString(name)).length > 0)) throw new TypeError('keyword\'s name must be a non-empty string');
    regKey.name = name;
    let mapVal = regKeywords[name];
    if (mapVal) throw new TypeError('keyword ' + name + ' have already registered');
    if (schema.constructor !== Object) throw new TypeError('keyword ' + name + ' \'s schema must be a object');
    if (data.constructor !== Object) throw new TypeError('keyword ' + name + ' \'s data must be a object');
    const {merge: mergeSchema, only: schemaOnly, valid: schemaValid} = schema;
    if (mergeSchema !== true && mergeSchema !== false) throw new TypeError('keyword ' + name + ' \'s schema.merge must be a boolean');
    if (schemaOnly !== true && schemaOnly !== false) throw new TypeError('keyword ' + name + ' \'s schema.only must be a boolean');
    if (schemaValid) {
      if (schemaValid.constructor !== Object) throw new TypeError('keyword ' + name + '\'s schema.valid must be a object');
      const {maxItems, types, equal, not, value, values} = schemaValid;
      if (!(typeof maxItems === 'number' && maxItems >= 0 && maxItems % 1 === 0)) throw new TypeError('keyword ' + name + '\'s schema.valid.maxItems must be a non-negative integer');
      if (!(types && Array.isArray(types))) throw new TypeError('keyword ' + name + '\'s schema.valid.types must be a array');
      if (!(equal && Array.isArray(equal))) throw new TypeError('keyword ' + name + '\'s schema.valid.equal must be a array');
      if (!(not && Array.isArray(not))) throw new TypeError('keyword ' + name + '\'s schema.valid.not must be a array');
      if (value && typeof value !== 'function') throw new TypeError('keyword ' + name + '\'s schema.valid.value must be a function');
      if (values && typeof values !== 'function') throw new TypeError('keyword ' + name + '\'s schema.valid.values must be a function');
    }
    const {valid: dataValid} = data;
    if (dataValid && typeof dataValid !== 'function') throw new TypeError('keyword ' + name + '\'s dataValid must be a function');
    if (!(ext && ext.constructor === Object)) throw new TypeError('keyword ' + name + '\'s ext must be a object');
    mapVal = regKeywords[name] = {option: regKey};
    regKeys.push(regKey);
    mapVal.index = regKeys.length;
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
