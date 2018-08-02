(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/base/Schema.js":
/*!****************************!*\
  !*** ./lib/base/Schema.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { validate } = __webpack_require__(/*! ./common */ "./lib/base/common.js");
const keys = __webpack_require__(/*! ./keys */ "./lib/base/keys.js");
const keywords = __webpack_require__(/*! ../keywords/index */ "./lib/keywords/index.js");
const { writeOutErrors } = __webpack_require__(/*! ../error/index */ "./lib/error/index.js");

/**
 * 验证器类
 */
class Schema {
  /**
   * 构造一个某个模型、某种配置的验证器对象
   * @param schemas {Object|Array} 验证模型
   * @param options {Object} 验证配置
   */
  constructor(schemas, options) {
    this.schemas = schemas;
    this.data = null;
    this.errorItems = [];
    this.options = Object.assign({}, options);
  }

  /**
   * 验证数据
   * @param data 需要验证的数据对象
   * @return {Boolean} 验证成功与否
   * 注：每次验证完成后，要得到错误信息，必须在再次调用此方法前访问errors属性对象
   */
  validate(data) {
    return validate.call(this, data);
  }

  /**
   * 输出错误
   * @param option 输出配置
   */
  writeOutErrors(option) {
    return writeOutErrors.call(this, option);
  }
}

/**
 * 验证器类上附加的静态方法和属性对象
 */
Object.assign(Schema, keys);
/**
 * 注册内置的各关键字
 */
Schema.registerKeywords(keywords);
module.exports = Schema;

/***/ }),

/***/ "./lib/base/common.js":
/*!****************************!*\
  !*** ./lib/base/common.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const keys = __webpack_require__(/*! ./keys */ "./lib/base/keys.js");

/**
 * 遍历属性中的所有KEY并转入栈中，待进一步处理..
 * @param props {Object}
 * {
 *  stack: {}, 栈
 *  parent: {}, 指向上级有关栈元素
 *  schemaFrom: {}, 模型
 *  errorItems: [], 错误
 *  data: {}, 数据
 *  dataFrom: {}, 数据来源
 *  dataName: '', 数据来源属性名称
 *  dataIndex: '', 数据来源索引值
 * }
 *
 // 栈结构: keyword, schema, schemaFrom, schemaPath, parent, children, errorItems, state, dataIndex
 // 数据栈结构: dataName, data, dataFrom, dataPath
 */
const schemaProperties = function (props) {
  const { stack, parent = null, dataFrom = null, dataName, dataIndex } = props;
  let { schemaFrom, data } = props,
      doIt = false;
  if (schemaFrom) {
    const isArr = Array.isArray(schemaFrom) && schemaFrom.length > 0,
          isObj = schemaFrom.constructor === Object;
    if (isArr || isObj) {
      let schemaPath, dataPath, upSchemaPath, upDataPath;
      if (parent) {
        upSchemaPath = parent.schemaPath;
        upDataPath = parent.dataPath;
      } else {
        upSchemaPath = '';
        upDataPath = '';
      }
      if (data !== undefined) {
        schemaPath = upSchemaPath + (dataName !== undefined ? '/' + dataName : dataIndex !== undefined ? '/' + dataIndex : '');
        dataPath = upDataPath + (dataName !== undefined ? '.' + dataName : dataIndex !== undefined ? '[' + dataIndex + ']' : '');
      } else {
        schemaPath = upSchemaPath;
        dataPath = upDataPath;
        data = parent.data;
      }
      const schemaLen = stack.length;
      if (isObj) schemaFrom = [schemaFrom];
      const schLen = schemaFrom.length;
      for (let i = 0; i < schLen; ++i) {
        const schFrom = schemaFrom[i];
        if (schFrom && schFrom.constructor === Object) {
          for (const key of keys.regKeys) {
            const keyword = key.name;
            let rawSchema = schFrom[keyword];
            if (rawSchema !== undefined) {
              const { array } = keys.regKeywords[keyword].option.schema;
              const schema = array && !Array.isArray(rawSchema) ? [rawSchema] : rawSchema;
              const stkItem = {
                keyword, schema, rawSchema, schemaFrom: schFrom, schemaPath, parent, children: [], errorItems: [], state: 0,
                data, dataFrom, dataName, dataIndex, dataPath
              };
              if (isArr) stkItem.schemaFromIndex = i;
              if (parent) parent.children.push(stkItem);
              stack.push(stkItem);
            }
          }
        }
      }
      if (stack.length > schemaLen) {
        doIt = true;
      }
    }
  }
  return doIt;
};
const Z_ANCHOR = /[^\\]\\Z/;
/**
 * 用于类型判断的缓存
 * @type {*}
 */
const validTypesCache = {
  null: function (data) {
    return data === null;
  },
  boolean: 'boolean',
  object: function (data) {
    return data && typeof data === 'object' && !Array.isArray(data);
  },
  regexp: function (data) {
    if (typeof data === 'string') {
      if (Z_ANCHOR.test(data)) return false;
      try {
        new RegExp(data);
        return true;
      } catch (e) {
        return false;
      }
    } else {
      return data.constructor === RegExp;
    }
  },
  array: function (data) {
    return data && Array.isArray(data);
  },
  number: "number",
  integer: function (data) {
    return typeof data === 'number' && data % 1 === 0;
  },
  string: "string"
};
/**
 * 数据符合类型判断
 * @param types 类型
 * @param data 数据
 * @return {boolean}
 */
const validTypes = function (types, data) {
  let valid = false;
  for (const tp of types) {
    const type = validTypesCache[tp];
    if (type) {
      if (typeof type === 'string') {
        valid = typeof data === type;
      } else if (typeof type === 'function') {
        valid = type(data);
      }
      if (valid) break;
    }
  }
  return valid;
};
/**
 * 验证模型
 * @param stackItem {Object}, 要验证的栈片，不传时默认为栈的栈顶
 */
const validateSchema = function (stackItem) {
  const { keyword, schema, schemaPath } = stackItem,
        { schema: optSchema } = keys.regKeywords[keyword].option,
        { valid } = optSchema;
  if (valid) {
    const { array } = optSchema,
          { types, value } = valid;
    if (types.length > 0) {
      let isValid = false;
      if (array) {
        const len = schema.length;
        for (let i = 0; i < len; ++i) {
          isValid = validTypes(types, schema[i]);
        }
      } else isValid = validTypes(types, schema);
      if (!isValid) throw new TypeError('scheme error, keyword\'s values invalid at "' + schemaPath + keyword + '" by types');
    }
    if (value && !value(schema)) throw new TypeError('scheme error, keyword\'s value invalid at "' + schemaPath + '/' + keyword + '" by value');
  }
};
/**
 * 验证数据对象
 * @param data {Object|Array}
 * @return {Boolean}
 */
const validate = function (data) {
  this.data = data;
  const errorItems = this.errorItems = [],
        stack = [],
        schemas = this.schemas;
  schemaProperties({ stack, schemaFrom: schemas, data, dataFrom: null });
  while (stack.length > 0) {
    const stackItem = stack[stack.length - 1],
          { keyword } = stackItem,
          option = keys.regKeywords[keyword].option;
    let { state } = stackItem,
        pop = false;
    if (!(state < 0)) {
      const { data } = option,
            { valid: dataValid } = data;
      if (state === 0) validateSchema(stackItem);
      if (dataValid) {
        dataValid(stack);
        state = stackItem.state;
        if (state < 0) pop = true;
      } else pop = true;
    } else pop = true;
    if (pop) {
      const { parent, errorItems: stackErrorItems } = stackItem;
      if (state === -1 && stackErrorItems.length > 0) {
        const to = parent ? parent.errorItems : errorItems;
        for (const errorItem of stackErrorItems) {
          to.push(errorItem);
        }
      }
      stack.pop();
    }
  }
  if (errorItems.length > 0) {
    for (const stackItem of errorItems) {
      const { keyword } = stackItem,
            option = keys.regKeywords[keyword].option,
            { data } = option,
            { error } = data;
      if (error) error(stackItem, option);
    }
    return false;
  }
  return true;
};
module.exports = { validate, schemaProperties };

/***/ }),

/***/ "./lib/base/keys.js":
/*!**************************!*\
  !*** ./lib/base/keys.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const nebUtil = __webpack_require__(/*! nebjs-util */ "./node_modules/nebjs-util/build/dev/nebjs-util.js");
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
 *      value: function(val){}, 关键字值验证器
 *    }
 *  },
 *  data: {
 *    valid: function(stack){}, 关键字验证器
 *    error: function(stack){}, 关键字错误处理器
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
    const regKey = objCopy({ schema: { array: false, valid: { types: [], value: null } }, data: { valid: null, error: null }, ext: {} }, keyword, { deep: true });
    let { name, schema, data, ext } = regKey;
    if (!(name && typeof name === 'string' && (name = trimString(name)).length > 0)) throw new TypeError('keyword\'s name must be a non-empty string');
    regKey.name = name;
    let mapVal = regKeywords[name];
    if (mapVal) throw new TypeError('keyword ' + name + ' have already registered');
    if (schema.constructor !== Object) throw new TypeError('keyword ' + name + ' \'s schema must be a object');
    if (data.constructor !== Object) throw new TypeError('keyword ' + name + ' \'s data must be a object');
    const { array, valid } = schema;
    if (array !== true && array !== false) throw new TypeError('keyword ' + name + ' \'s schema.array must be a boolean');
    if (valid) {
      if (valid.constructor !== Object) throw new TypeError('keyword ' + name + '\'s schema.valid must be a object');
      const { types, value } = valid;
      if (!(types && Array.isArray(types))) throw new TypeError('keyword ' + name + '\'s schema.valid.types must be a array');
      if (value && typeof value !== 'function') throw new TypeError('keyword ' + name + '\'s schema.valid.value must be a function');
    }
    const { valid: dataValid, error: dataError } = data;
    if (dataValid && typeof dataValid !== 'function') throw new TypeError('keyword ' + name + '\'s data.valid must be a function');
    if (dataError && typeof dataError !== 'function') throw new TypeError('keyword ' + name + '\'s data.error must be a function');
    if (!(ext && ext.constructor === Object)) throw new TypeError('keyword ' + name + '\'s ext must be a object');
    mapVal = regKeywords[name] = { option: regKey };
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
module.exports = { registerKeywords, getRegisterKeywordsInfo, regKeys, regKeywords };

/***/ }),

/***/ "./lib/error/index.js":
/*!****************************!*\
  !*** ./lib/error/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const nebUtil = __webpack_require__(/*! nebjs-util */ "./node_modules/nebjs-util/build/dev/nebjs-util.js");
const objPick = nebUtil.object.pick;
// const objCopy = nebUtil.object.copy;
const arrCopy = nebUtil.array.copy;
/**
 * 输出错误
 * @param option 输出配置
 */
const writeOutErrors = function (option = {}) {
  const corrector = this,
        { errorItems } = corrector;
  const { simple = true } = option;
  let out;
  if (simple) {
    out = arrCopy([], errorItems, {
      multi: true, filter: function (array, stackItems, stackItem /*, index*/) {
        const obj = {};
        return { value: objPick(obj, stackItem, { pick: ['keyword', 'message', 'params'] }) };
      }
    });
  }
  // 开始处理错误...
  return out;
};
module.exports = { writeOutErrors };

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Schema = __webpack_require__(/*! ./base/Schema */ "./lib/base/Schema.js");
const schema = { Schema };
module.exports = schema;

/***/ }),

/***/ "./lib/keywords/allOf.js":
/*!*******************************!*\
  !*** ./lib/keywords/allOf.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { schemaProperties } = __webpack_require__(/*! ../base/common */ "./lib/base/common.js");
/**
 * allOf关键字处理程序：data对象的多个组合验证结果全部成功，则成功（所有组合都会执行）...
 * 举例：allOf: [{"maximum": 3}, {"type": "integer"}]
 * 符合：data: [2, 3]
 * 不符合：data: [1.5, 2.5, 4, 4.5, 5, 5.5, any non-number]
 */
const dataValid = function (stack) {
  // 方案一：全部检测完再判断
  const stackItem = stack[stack.length - 1],
        { state, runSchemaIndex, schema } = stackItem;
  switch (state) {
    case 0:
      if (schema.length === 0) {
        stackItem.state = -1;
      } else {
        stackItem.runSchemaIndex = 0;
        stackItem.runSchemaErrors = [];
        stackItem.state++;
      }
      break;
    case 1:
      schemaProperties({ stack, schemaFrom: schema[runSchemaIndex], parent: stackItem });
      stackItem.runSchemaIndex++;
      stackItem.state++;
      break;
    case 2:
      stackItem.runSchemaErrors.push(stackItem.errorItems);
      stackItem.errorItems = [];
      if (runSchemaIndex < schema.length) {
        stackItem.state--;
      } else {
        let haveErr = false;
        const schemaErrors = stackItem.runSchemaErrors;
        for (const errorItems of schemaErrors) {
          if (errorItems.length > 0) {
            haveErr = true;
            break;
          }
        }
        if (haveErr) {
          const { dataPath } = stackItem;
          stackItem.message = 'data' + dataPath + ' should match all schema in allOf';
          stackItem.errorItems.push(stackItem);
          stackItem.state = -1;
        } else {
          stackItem.state = -2; // 置状态小于0，代表已经完成所有的过程，等于-1时处理错误信息，等于-2不处理错误信息
        }
      }
      break;
  }
  // 方案二：检测到错误即结束
  /*const stackItem = stack[stack.length - 1];
  const {state, runSchemaIndex, schema} = stackItem;
  switch (state) {
    case 0:
      if (schema.length === 0) {
        stackItem.state = -1;
      } else {
        stackItem.runSchemaIndex = 0;
        stackItem.state++;
      }
      break;
    case 1:
      schemaProperties(this.context, {stack, schemaFrom: schema[runSchemaIndex], parent: stackItem});
      stackItem.runSchemaIndex++;
      stackItem.state++;
      break;
    case 2:
      if (stackItem.errorItems.length > 0) {
        stackItem.message = 'data' + dataPath + ' should match all schema in allOf';
        stackItem.errorItems.push(stackItem);
        stackItem.errorItems.push(stackItem);
        stackItem.state = -1;
      } else if (runSchemaIndex === schema.length) {
        stackItem.state = -1;
      } else {
        stackItem.state--;
      }
      break;
  }*/
};
const properties = [{ name: 'allOf', schema: { array: true, valid: { types: ['object'] } }, data: { valid: dataValid } }];
module.exports = properties;

/***/ }),

/***/ "./lib/keywords/anyOf.js":
/*!*******************************!*\
  !*** ./lib/keywords/anyOf.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { schemaProperties } = __webpack_require__(/*! ../base/common */ "./lib/base/common.js");
/**
 * anyOf关键字处理程序：data对象的多个组合验证结果中有一个成功，则成功（先检测到一个成功，则后续不再执行）...
 * 举例：anyOf: [{"maximum": 3}, {"type": "integer"}]
 * 符合：data: [1.5, 2, 2.5, 3, 4, 5, any non-number]
 * 不符合：data: [4.5, 5.5]
 */
const dataValid = function (stack) {
  // 检测到任何错误即结束
  const stackItem = stack[stack.length - 1],
        { state, runSchemaIndex, schema } = stackItem;
  switch (state) {
    case 0:
      if (schema.length === 0) {
        stackItem.state = -1;
      } else {
        stackItem.runSchemaIndex = 0;
        stackItem.state++;
      }
      break;
    case 1:
      schemaProperties({ stack, schemaFrom: schema[runSchemaIndex], parent: stackItem });
      stackItem.runSchemaIndex++;
      stackItem.state++;
      break;
    case 2:
      if (stackItem.errorItems.length === 0) {
        stackItem.state = -1;
      } else if (runSchemaIndex === schema.length) {
        const { dataPath } = stackItem;
        stackItem.message = 'data' + dataPath + ' should match some schema in anyOf';
        stackItem.errorItems.push(stackItem);
        stackItem.state = -1;
      } else {
        stackItem.errorItems = [];
        stackItem.state--;
      }
      break;
  }
};
const properties = [{ name: 'anyOf', schema: { array: true, valid: { types: ['object'] } }, data: { valid: dataValid } }];
module.exports = properties;

/***/ }),

/***/ "./lib/keywords/arrItems.js":
/*!**********************************!*\
  !*** ./lib/keywords/arrItems.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * maxItems关键字处理程序：data数组元素个数最大值
 * 举例：maxItems: 3
 * 符合：data: [[], [1], [1, 2, 3]]
 * 不符合: data: [[1, 2, 3, 4]]
 */
const maxItemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { schema, data } = stackItem;
  if (Array.isArray(data) && data.length > schema) {
    const { dataPath } = stackItem,
          maxItems = schema;
    stackItem.params = { maxItems };
    stackItem.message = 'data' + dataPath + ' should not have less than ' + maxItems + ' item';
    stackItem.errorItems.push(stackItem);
  }
  stackItem.state = -1;
};
/**
 * minItems关键字处理程序：data数组元素个数最大值
 * 举例：minItems: 3
 * 符合：data: [[1, 2, 3, 4], [1, 2, 3]]
 * 不符合: data: [[], [1]]
 */
const minItemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { schema, data } = stackItem;
  if (Array.isArray(data) && data.length < schema) {
    const { dataPath } = stackItem,
          minItems = schema;
    stackItem.params = { minItems };
    stackItem.message = 'data' + dataPath + ' should not have less than ' + minItems + ' item';
    stackItem.errorItems.push(stackItem);
  }
  stackItem.state = -1;
};
/**
 * 关键字对应模型值验证程序
 * @param val
 * @returns {boolean}
 */
const schemaValueValid = function (val) {
  return val >= 0 && val % 1 === 0;
};
const strLength = [{ name: 'maxItems', schema: { valid: { types: ['number'], value: schemaValueValid } }, data: { valid: maxItemsDataValid } }, { name: 'minItems', schema: { valid: { types: ['number'], value: schemaValueValid } }, data: { valid: minItemsDataValid } }];
module.exports = strLength;

/***/ }),

/***/ "./lib/keywords/const.js":
/*!*******************************!*\
  !*** ./lib/keywords/const.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const nebUtil = __webpack_require__(/*! nebjs-util */ "./node_modules/nebjs-util/build/dev/nebjs-util.js");
const equal = nebUtil.common.equal;
/**
 * const关键字处理程序：data值的是否等于schema
 * 举例：const: [1, 2, 3]
 * 符合：data: [1, 2, 3]
 * 不符合: [1, 2, 3, 4]
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { schema, data } = stackItem;
  if (!equal(schema, data)) {
    const { dataPath } = stackItem;
    stackItem.params = { const: schema };
    stackItem.message = 'data' + dataPath + ' should be equal to const';
    stackItem.errorItems.push(stackItem);
  }
  stackItem.state = -1;
};
const consts = [{ name: 'const', schema: {}, data: { valid: dataValid } }];
module.exports = consts;

/***/ }),

/***/ "./lib/keywords/contains.js":
/*!**********************************!*\
  !*** ./lib/keywords/contains.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { schemaProperties } = __webpack_require__(/*! ../base/common */ "./lib/base/common.js");
/**
 * contains关键字处理程序：data数组中的任一元素值是否符合规则
 * 举例：contains: { "type": "integer" }
 * 符合：data: [[1], [1, "foo"]]
 * 不符合: [[], ["foo", "bar"]]
 */
const dataValid = function (stack) {
  // 方案一：全部检测完再判断
  /*const stackItem = stack[stack.length - 1], {data, state, runDataIndex, schema} = stackItem;
  switch (state) {
    case 0:
      if (Array.isArray(data)) {
        if (data.length === 0) {
          const {dataPath} = stackItem;
          stackItem.params = {};
          stackItem.message = 'data' + dataPath + ' should contain a valid item';
          stackItem.errorItems.push(stackItem);
          stackItem.state = -1;
        } else {
          stackItem.runDataIndex = 0;
          stackItem.runSchemaErrors = [];
          stackItem.state++;
        }
      } else {
        stackItem.state = -1;
      }
      break;
    case 1:
      schemaProperties(this.context, {stack, schemaFrom: schema, parent: stackItem, data: data[runDataIndex], dataFrom: data, dataName: runDataIndex});
      stackItem.runDataIndex++;
      stackItem.state++;
      break;
    case 2:
      stackItem.runSchemaErrors.push(stackItem.errorItems);
      stackItem.errorItems = [];
      if (runDataIndex < data.length) {
        stackItem.state--;
      } else {
        let haveOk = false;
        const schemaErrors = stackItem.runSchemaErrors;
        for (const errorItems of schemaErrors) {
          if (errorItems.length === 0) {
            haveOk = true;
            break;
          }
        }
        if (!haveOk) {
          const {dataPath} = stackItem;
          stackItem.params = {};
          stackItem.message = 'data' + dataPath + ' should contain a valid item';
          stackItem.errorItems.push(stackItem);
          stackItem.state = -1;
        } else {
          stackItem.state = -2;// 置状态小于0，代表已经完成所有的过程，等于-1时处理错误信息，等于-2不处理错误信息
        }
      }
      break;
  }*/
  // 检测到任何满足条件即结束
  const stackItem = stack[stack.length - 1],
        { data, state, runDataIndex, schema } = stackItem;
  switch (state) {
    case 0:
      if (Array.isArray(data)) {
        if (data.length === 0) {
          const { dataPath } = stackItem;
          stackItem.params = {};
          stackItem.message = 'data' + dataPath + ' should contain a valid item';
          stackItem.errorItems.push(stackItem);
          stackItem.state = -1;
        } else {
          stackItem.runDataIndex = 0;
          stackItem.state++;
        }
      } else {
        stackItem.state = -1;
      }
      break;
    case 1:
      schemaProperties({ stack, schemaFrom: schema, parent: stackItem, data: data[runDataIndex], dataFrom: data, dataName: runDataIndex });
      stackItem.runDataIndex++;
      stackItem.state++;
      break;
    case 2:
      if (stackItem.errorItems.length === 0) {
        stackItem.state = -1;
      } else if (runDataIndex === data.length) {
        const { dataPath } = stackItem;
        stackItem.params = {};
        stackItem.message = 'data' + dataPath + ' should contain a valid item';
        stackItem.errorItems.push(stackItem);
        stackItem.state = -1;
      } else {
        stackItem.errorItems = [];
        stackItem.state--;
      }
      break;
  }
};
const contains = [{ name: 'contains', schema: { valid: { types: ['object'] } }, data: { valid: dataValid } }];
module.exports = contains;

/***/ }),

/***/ "./lib/keywords/dependencies.js":
/*!**************************************!*\
  !*** ./lib/keywords/dependencies.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { schemaProperties } = __webpack_require__(/*! ../base/common */ "./lib/base/common.js");
/**
 * dependencies关键字处理程序：data对象的子属性验证...
 * 举例：{"dependencies": {"foo": ["bar", "baz"]}}
 * 符合：data: [{"foo": 1, "bar": 2, "baz": 3}, {}, {"a": 1}]
 * 不符合: data: [{"foo": 1}, {"foo": 1, "bar": 2}, {"foo": 1, "baz": 3}]
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, state, schema } = stackItem;
  let doIt;
  switch (state) {
    case 0:
      doIt = false;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (schema) {
          for (const propName in schema) {
            if (schema.hasOwnProperty(propName) && data.hasOwnProperty(propName)) {
              const propSchema = schema[propName];
              if (Array.isArray(propSchema)) {
                const dependCount = propSchema.length;
                if (dependCount > 0) {
                  let name,
                      hasError = false;
                  for (name of propSchema) {
                    if (name && typeof name === 'string' && !data.hasOwnProperty(name)) {
                      hasError = true;
                      break;
                    }
                  }
                  if (hasError) {
                    const { dataPath } = stackItem;
                    stackItem.params = { propName, missingProperty: name, dependCount, depend: propSchema, depends: propSchema };
                    stackItem.message = 'data' + dataPath + ' should be equal to constant';
                    stackItem.errorItems.push(stackItem);
                  }
                }
              } else if (typeof schema === 'object') {
                if (schemaProperties({ stack, schemaFrom: propSchema, parent: stackItem })) doIt = true;
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
      stackItem.state = -1;
      break;
  }
};
const dependencies = [{ name: 'dependencies', schema: { valid: { types: ['object'] } }, data: { valid: dataValid } }];
module.exports = dependencies;

/***/ }),

/***/ "./lib/keywords/enum.js":
/*!******************************!*\
  !*** ./lib/keywords/enum.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const nebUtil = __webpack_require__(/*! nebjs-util */ "./node_modules/nebjs-util/build/dev/nebjs-util.js");
const equal = nebUtil.common.equal;
/**
 * enum关键字处理程序：data值的是否在指定的schemas中
 * 举例：enum: [ 2, "foo", {"foo": "bar" }, [1, 2, 3] ]
 * 符合：data: 2, "foo", {"foo": "bar"}, [1, 2, 3]
 * 不符合: 1, "bar", {"foo": "baz"}, [1, 2, 3, 4], any value not in the array
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  let valid = false;
  for (const sch of schema) {
    if (equal(sch, data)) {
      valid = true;
      break;
    }
  }
  if (!valid) {
    const { dataPath } = stackItem;
    stackItem.params = { enum: schema };
    stackItem.message = 'data' + dataPath + ' should be equal to one of the enum values';
    stackItem.errorItems.push(stackItem);
  }
  stackItem.state = -1;
};
const enums = [{ name: 'enum', schema: {}, data: { valid: dataValid } }];
module.exports = enums;

/***/ }),

/***/ "./lib/keywords/format.js":
/*!********************************!*\
  !*** ./lib/keywords/format.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

const formats = (() => {
  ////////////////////////////////////////////////////////////////////////////////// date-time
  const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
  const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d:\d\d)?$/i;
  const DATE_TIME_SEPARATOR = /t|\s/i;

  // date: http://tools.ietf.org/html/rfc3339#section-5.6
  // const FAST_DATE = /^\d\d\d\d-[0-1]\d-[0-3]\d$/;
  // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
  // const FAST_TIME = /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i;
  // const FAST_DATE_TIME = /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i;
  // https://tools.ietf.org/html/rfc3339#appendix-C
  const isLeapYear = year => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  };
  // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
  const date = str => {
    const matches = str.match(DATE);
    if (!matches) return false;
    const year = +matches[1],
          month = +matches[2],
          day = +matches[3];
    return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
  };
  const time = (str, full) => {
    const matches = str.match(TIME);
    if (!matches) return false;
    const hour = matches[1],
          minute = matches[2],
          second = matches[3],
          timeZone = matches[5];
    return (hour <= 23 && minute <= 59 && second <= 59 || hour === 23 && minute === 59 && second === 60) && (!full || timeZone);
  };
  // http://tools.ietf.org/html/rfc3339#section-5.6
  const date_time = str => {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], true);
  };
  const datetime = str => {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], false);
  };

  ////////////////////////////////////////////////////////////////////////////////// uri
  const URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
  // const FAST_URI = /^(?:[a-z][a-z0-9+-.]*:)(?:\/?\/)?[^\s]*$/i;
  // const FAST_URI_REF = /^(?:(?:[a-z][a-z0-9+-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i;
  const URI_REF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  // uri-template: https://tools.ietf.org/html/rfc6570
  const URI_TEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
  const NOT_URI_FRAGMENT = /\/|:/;
  // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
  const uri = str => {
    return NOT_URI_FRAGMENT.test(str) && URI.test(str);
  };
  const HOSTNAME = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*$/i;
  const hostname = str => {
    // https://tools.ietf.org/html/rfc1034#section-3.5
    // https://tools.ietf.org/html/rfc1123#section-2
    return str.length <= 255 && HOSTNAME.test(str);
  };
  // For the source: https://gist.github.com/dperini/729294
  // For test cases: https://mathiasbynens.be/demo/url-regex
  // Delete current URL in favour of the commented out URL rule when this issue is fixed https://github.com/eslint/eslint/issues/7983.
  // var URL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
  const URL = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i;

  // email (sources from jsen corrector):
  // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
  // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
  // const FAST_EMAIL = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
  const EMAIL = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  ////////////////////////////////////////////////////////////////////////////////// ip
  // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
  const ipv4 = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
  // optimized http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
  const ipv6 = /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i;

  ////////////////////////////////////////////////////////////////////////////////// regxp
  const Z_ANCHOR = /[^\\]\\Z/;
  const regex = str => {
    if (Z_ANCHOR.test(str)) return false;
    try {
      new RegExp(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  ////////////////////////////////////////////////////////////////////////////////// uuid
  // uuid: http://tools.ietf.org/html/rfc4122
  const UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

  ////////////////////////////////////////////////////////////////////////////////// JSON
  // JSON-pointer: https://tools.ietf.org/html/rfc6901
  const JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
  // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
  const JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
  // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
  const RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;

  return {
    date, time, 'date-time': date_time, datetime,
    uri: uri, 'uri-reference': URI_REF, 'uri-template': URI_TEMPLATE, url: URL, hostname, email: EMAIL,
    ipv4, ipv6,
    regex,
    uuid: UUID,
    'json-pointer': JSON_POINTER, 'json-pointer-uri-fragment': JSON_POINTER_URI_FRAGMENT, 'relative-json-pointer': RELATIVE_JSON_POINTER,
    'phone': /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  };
})();
const formatsNumber = (() => {
  const date = str => {
    return new Date(str).getTime();
  };
  const time = str => {
    return date('1970-1-1 ' + str);
  };
  return { date, datetime: date, 'date-time': date, time };
})();
let lastFormat, isFormatExclusiveMaximum, lastFormatExclusiveMaximumStackItem, isFormatExclusiveMinimum, lastFormatExclusiveMinimumStackItem;
/**
 * formatMinimum关键字处理程序：data值的是否大于等于schema（formatExclusiveMaximum时不能等于）
 * 举例：formatMinimum: 3
 * 符合：data: [3, 4, 5]
 * 不符合: [1, 2]
 */
const formatMinimumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (typeof data === 'string' && lastFormat) {
    const fnf = formatsNumber[lastFormat];
    if (fnf && typeof fnf === 'function') {
      const exclusive = isFormatExclusiveMinimum && lastFormatExclusiveMinimumStackItem.parent === stackItem.parent;
      if (!(exclusive ? fnf(data) > fnf(schema) : fnf(data) >= fnf(schema))) {
        const { dataPath } = stackItem,
              comparison = exclusive ? '>=' : '>',
              formatMinimum = schema;
        stackItem.params = { comparison, formatMinimum, exclusive };
        stackItem.message = 'data' + dataPath + ' should be ' + comparison + ' ' + formatMinimum;
        stackItem.errorItems.push(stackItem);
      }
    }
  }
  stackItem.state = -1;
};
/**
 * formatExclusiveMinimum关键字处理程序：data值的是否大于schema
 * 举例：formatExclusiveMinimum: 3
 * 符合：data: [4, 5]
 * 不符合: [1, 2, 3]
 */
const formatExclusiveMinimumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  const tp = typeof schema;
  if (tp === 'string') {
    if (typeof data === 'string' && lastFormat) {
      const fnf = formatsNumber[lastFormat];
      if (fnf && typeof fnf === 'function') {
        if (fnf(data) <= fnf(schema)) {
          const { dataPath } = stackItem,
                comparison = '<',
                formatExclusiveMinimum = schema;
          stackItem.params = { comparison, formatExclusiveMinimum, exclusive: true };
          stackItem.message = 'data' + dataPath + ' should be ' + comparison + ' ' + formatExclusiveMinimum;
          stackItem.errorItems.push(stackItem);
        }
      }
    }
  } else {
    isFormatExclusiveMinimum = schema;
    lastFormatExclusiveMinimumStackItem = stackItem;
  }
  stackItem.state = -1;
};
/**
 * formatMaximum关键字处理程序：data值的是否小于等于schema（formatExclusiveMaximum时不能等于）
 * 举例：formatMaximum: 3
 * 符合：data: [1, 2, 3]
 * 不符合: [4, 5, 6]
 */
const formatMaximumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (lastFormat && typeof data === 'string') {
    const fnf = formatsNumber[lastFormat];
    if (fnf && typeof fnf === 'function') {
      const exclusive = isFormatExclusiveMaximum && lastFormatExclusiveMaximumStackItem.parent === stackItem.parent;
      if (!(exclusive ? fnf(data) < fnf(schema) : fnf(data) <= fnf(schema))) {
        const { dataPath } = stackItem,
              comparison = exclusive ? '<=' : '<',
              formatMaximum = schema;
        stackItem.params = { comparison, formatMaximum, exclusive };
        stackItem.message = 'data' + dataPath + ' should be ' + comparison + ' ' + formatMaximum;
        stackItem.errorItems.push(stackItem);
      }
    }
  }
  stackItem.state = -1;
};
/**
 * formatExclusiveMaximum关键字处理程序：data值的是否小于schema
 * 举例：formatExclusiveMaximum: 3
 * 符合：data: [1, 2]
 * 不符合: [3, 4, 5, 6]
 */
const formatExclusiveMaximumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  const tp = typeof schema;
  if (tp === 'number') {
    if (lastFormat && typeof data === 'string') {
      const fnf = formatsNumber[lastFormat];
      if (fnf && typeof fnf === 'function') {
        if (fnf(data) >= fnf(schema)) {
          const { dataPath } = stackItem,
                comparison = '>',
                formatExclusiveMaximum = schema;
          stackItem.params = { comparison, formatExclusiveMaximum, exclusive: true };
          stackItem.message = 'data' + dataPath + ' should be ' + comparison + ' ' + formatExclusiveMaximum;
          stackItem.errorItems.push(stackItem);
        }
      }
    }
  } else {
    isFormatExclusiveMaximum = schema;
    lastFormatExclusiveMaximumStackItem = stackItem;
  }
  stackItem.state = -1;
};
/**
 * format关键字处理程序：data字符串格式验证...
 * 举例：format: ['phone']
 * 符合：data: 13511111111
 * 不符合: data: 1 123 44456
 */
const formatDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (typeof data === 'string') {
    const fmt = formats[schema];
    if (fmt) {
      let ok = true;
      if (fmt.constructor === RegExp) {
        ok = fmt.test(data);
      } else if (typeof fmt === 'function') {
        ok = fmt(data);
      }
      if (!ok) {
        const { dataPath } = stackItem;
        stackItem.params = { format: schema };
        stackItem.message = 'data' + dataPath + ' should match format ' + schema.toString();
        stackItem.errorItems.push(stackItem);
        lastFormat = null;
      } else {
        lastFormat = schema;
      }
    }
  }
  stackItem.state = -1;
};
const properties = [{ name: 'formatMinimum', schema: { valid: { types: ['string'] } }, data: { valid: formatMinimumDataValid } }, { name: 'formatExclusiveMinimum', schema: { valid: { types: ['string', 'boolean'] } }, data: { valid: formatExclusiveMinimumDataValid } }, { name: 'formatMaximum', schema: { valid: { types: ['string'] } }, data: { valid: formatMaximumDataValid } }, { name: 'formatExclusiveMaximum', schema: { valid: { types: ['string', 'boolean'] } }, data: { valid: formatExclusiveMaximumDataValid } }, { name: 'format', schema: { valid: { types: ['string'] } }, data: { valid: formatDataValid }, ext: { formats } }];
module.exports = properties;

/***/ }),

/***/ "./lib/keywords/if.js":
/*!****************************!*\
  !*** ./lib/keywords/if.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

let lastIfstackItem, isErrors;
const { schemaProperties } = __webpack_require__(/*! ../base/common */ "./lib/base/common.js");
/**
 * else关键字处理程序：data对象的条件验证...
 * 举例：if: {}, then: {}, else: {}
 */
const elseDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { state } = stackItem;
  switch (state) {
    case 0:
      if (lastIfstackItem && lastIfstackItem.parent === stackItem.parent && isErrors) {
        schemaProperties({ stack, schemaFrom: stackItem.schema, parent: stackItem });
        stackItem.state++;
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
 * then关键字处理程序：data对象的条件验证...
 * 举例：if: {}, then: {}, else: {}
 */
const thenDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { state } = stackItem;
  switch (state) {
    case 0:
      if (lastIfstackItem && lastIfstackItem.parent === stackItem.parent && !isErrors) {
        schemaProperties({ stack, schemaFrom: stackItem.schema, parent: stackItem });
        stackItem.state++;
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
 * if关键字处理程序：data对象的条件验证...
 * 举例：if: {}, then: {}, else: {}
 */
const ifDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { state } = stackItem;
  switch (state) {
    case 0:
      schemaProperties({ stack, schemaFrom: stackItem.schema, parent: stackItem });
      stackItem.state++;
      break;
    case 1:
      lastIfstackItem = stackItem;
      isErrors = stackItem.errorItems.length > 0;
      stackItem.state = -2;
      break;
  }
};
const properties = [{ name: 'else', schema: { only: true, valid: { types: ['object'] } }, data: { valid: elseDataValid } }, { name: 'then', schema: { only: true, valid: { types: ['object'] } }, data: { valid: thenDataValid } }, { name: 'if', schema: { only: true, valid: { types: ['object'] } }, data: { valid: ifDataValid } }];
module.exports = properties;

/***/ }),

/***/ "./lib/keywords/index.js":
/*!*******************************!*\
  !*** ./lib/keywords/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const types = __webpack_require__(/*! ./type */ "./lib/keywords/type.js");
const enums = __webpack_require__(/*! ./enum */ "./lib/keywords/enum.js");
const constant = __webpack_require__(/*! ./const */ "./lib/keywords/const.js");
const multipleOf = __webpack_require__(/*! ./multipleOf */ "./lib/keywords/multipleOf.js");
const numSize = __webpack_require__(/*! ./numSize */ "./lib/keywords/numSize.js");
const strLen = __webpack_require__(/*! ./strLen */ "./lib/keywords/strLen.js");
const pattern = __webpack_require__(/*! ./pattern */ "./lib/keywords/pattern.js");
const formats = __webpack_require__(/*! ./format */ "./lib/keywords/format.js");
const items = __webpack_require__(/*! ./items */ "./lib/keywords/items.js");
const arrItems = __webpack_require__(/*! ./arrItems */ "./lib/keywords/arrItems.js");
const uniqueItems = __webpack_require__(/*! ./uniqueItems */ "./lib/keywords/uniqueItems.js");
const contains = __webpack_require__(/*! ./contains */ "./lib/keywords/contains.js");
const required = __webpack_require__(/*! ./required */ "./lib/keywords/required.js");
const patternRequired = __webpack_require__(/*! ./patternRequired */ "./lib/keywords/patternRequired.js");
const propsNum = __webpack_require__(/*! ./propsNum */ "./lib/keywords/propsNum.js");
const properties = __webpack_require__(/*! ./properties */ "./lib/keywords/properties.js");
const dependencies = __webpack_require__(/*! ./dependencies */ "./lib/keywords/dependencies.js");
const propertyNames = __webpack_require__(/*! ./propertyNames */ "./lib/keywords/propertyNames.js");
const ifs = __webpack_require__(/*! ./if */ "./lib/keywords/if.js");
const oneOf = __webpack_require__(/*! ./oneOf */ "./lib/keywords/oneOf.js");
const anyOf = __webpack_require__(/*! ./anyOf */ "./lib/keywords/anyOf.js");
const allOf = __webpack_require__(/*! ./allOf */ "./lib/keywords/allOf.js");
const not = __webpack_require__(/*! ./not */ "./lib/keywords/not.js");
const keys = [...types, ...enums, ...constant, ...multipleOf, ...numSize, ...strLen, ...pattern, ...formats, ...items, ...arrItems, ...uniqueItems, ...contains, ...propsNum, ...required, ...patternRequired, ...properties, ...dependencies, ...propertyNames, ...ifs, ...oneOf, ...anyOf, ...allOf, ...not];
module.exports = keys;

/***/ }),

/***/ "./lib/keywords/items.js":
/*!*******************************!*\
  !*** ./lib/keywords/items.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

let dataLen, itemsLen, additionalLen, sepLen, lastItemsStackItem;
const { schemaProperties } = __webpack_require__(/*! ../base/common */ "./lib/base/common.js");
/**
 * additionalItems关键字处理程序，当为false时，不允许添加额外多余项，当为{}时检测额外项
 */
const additionalItemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1];
  const { state } = stackItem;
  switch (state) {
    case 0:
      if (lastItemsStackItem && lastItemsStackItem.parent === stackItem.parent && additionalLen > 0) {
        const { data, schema } = stackItem;
        if (typeof schema === 'boolean') {
          if (!schema) {
            // 不允许继续了..
            const { dataPath } = stackItem,
                  maxItems = itemsLen;
            stackItem.params = { maxItems };
            stackItem.message = 'data' + dataPath + ' should not have more than ' + maxItems + ' item';
            stackItem.errorItems.push(stackItem);
            stackItem.state = -1;
          } else {
            stackItem.state = -1;
          }
        } else {
          for (let i = dataLen - 1; i >= sepLen; --i) {
            schemaProperties({ stack, schemaFrom: stackItem.schema, parent: stackItem, data: data[i], dataFrom: data, dataIndex: i });
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
 * items关键字处理程序：data数组中的元素值是否符合规则
 * 举例：items: 3
 * 符合：data: [3, 4, 5]
 * 不符合: [1, 2]
 */
const itemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { state, data } = stackItem;
  switch (state) {
    case 0:
      dataLen = Array.isArray(data) ? data.length : 0;
      if (dataLen > 0) {
        // 当items是对象时，一定用同一个模式验证
        const useSameItem = !Array.isArray(stackItem.rawSchema);
        if (useSameItem) {
          lastItemsStackItem = null;
          for (let i = dataLen - 1; i >= 0; --i) {
            schemaProperties({ stack, schemaFrom: stackItem.schema[0], parent: stackItem, data: data[i], dataFrom: data, dataIndex: i });
          }
        } else {
          const { schema } = stackItem;
          itemsLen = schema.length;
          const minLen = Math.min(dataLen, itemsLen);
          additionalLen = dataLen - minLen;
          sepLen = dataLen - additionalLen;
          for (let i = sepLen - 1; i >= 0; --i) {
            schemaProperties({ stack, schemaFrom: stackItem.schema[i], parent: stackItem, data: data[i], dataFrom: data, dataIndex: i });
          }
          lastItemsStackItem = stackItem;
        }
        stackItem.state++;
      } else {
        lastItemsStackItem = null;
        stackItem.state = -1;
      }
      break;
    case 1:
      stackItem.state = -1;
      break;
  }
};
const items = [{ name: 'additionalItems', schema: { valid: { types: ['boolean', 'object'] } }, data: { valid: additionalItemsDataValid } }, { name: 'items', schema: { array: true, valid: { types: ['object'] } }, data: { valid: itemsDataValid } }];
module.exports = items;

/***/ }),

/***/ "./lib/keywords/multipleOf.js":
/*!************************************!*\
  !*** ./lib/keywords/multipleOf.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * multipleOf关键字处理程序：data值的是否是schema的倍数
 * 举例：multipleOf: 1.5
 * 符合：data: [1.5, 3, 6]
 * 不符合: [1, 2, 3, 4]
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (typeof data === 'number') {
    if (data % schema !== 0) {
      const { dataPath } = stackItem;
      stackItem.params = { multipleOf: schema };
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
  }, data: { valid: dataValid }
}];
module.exports = multipleOf;

/***/ }),

/***/ "./lib/keywords/not.js":
/*!*****************************!*\
  !*** ./lib/keywords/not.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { schemaProperties } = __webpack_require__(/*! ../base/common */ "./lib/base/common.js");
/**
 * not关键字处理程序：data对象的验证结果反转...
 * 举例：not: xxx
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { state } = stackItem;
  switch (state) {
    case 0:
      schemaProperties({ stack, schemaFrom: stackItem.schema, parent: stackItem });
      stackItem.state++;
      break;
    case 1:
      if (stackItem.errorItems.length > 0) {
        stackItem.state = -2;
      } else {
        const { dataPath } = stackItem;
        stackItem.message = 'data' + dataPath + ' should not be valid';
        stackItem.errorItems.push(stackItem);
        stackItem.state = -1;
      }
      break;
  }
};
const properties = [{ name: 'not', schema: { array: true, valid: { types: ['object'] } }, data: { valid: dataValid } }];
module.exports = properties;

/***/ }),

/***/ "./lib/keywords/numSize.js":
/*!*********************************!*\
  !*** ./lib/keywords/numSize.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

let isExclusiveMinimum, lastExclusiveMinimumStackItem;
/**
 * minimum关键字处理程序：data值的是否大于等于schema（exclusiveMaximum时不能等于）
 * 举例：minimum: 3
 * 符合：data: [3, 4, 5]
 * 不符合: [1, 2]
 */
const minimumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (typeof data === 'number') {
    const exclusive = isExclusiveMinimum && lastExclusiveMinimumStackItem.parent === stackItem.parent;
    if (!(exclusive ? data > schema : data >= schema)) {
      const { dataPath } = stackItem,
            comparison = exclusive ? '>=' : '>',
            minimum = schema;
      stackItem.params = { comparison, minimum, exclusive };
      stackItem.message = 'data' + dataPath + ' should be ' + comparison + ' ' + minimum;
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
/**
 * exclusiveMinimum关键字处理程序：data值的是否大于schema
 * 举例：exclusiveMinimum: 3
 * 符合：data: [4, 5]
 * 不符合: [1, 2, 3]
 */
const exclusiveMinimumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  const tp = typeof schema;
  if (tp === 'number') {
    if (typeof data === 'number') {
      if (data <= schema) {
        const { dataPath } = stackItem,
              comparison = '<',
              exclusiveMinimum = schema;
        stackItem.params = { comparison, exclusiveMinimum, exclusive: true };
        stackItem.message = 'data' + dataPath + ' should be ' + comparison + ' ' + exclusiveMinimum;
        stackItem.errorItems.push(stackItem);
      }
    }
  } else {
    isExclusiveMinimum = schema;
    lastExclusiveMinimumStackItem = stackItem;
  }
  stackItem.state = -1;
};
let isExclusiveMaximum, lastExclusiveMaximumStackItem;
/**
 * maximum关键字处理程序：data值的是否小于等于schema（exclusiveMaximum时不能等于）
 * 举例：maximum: 3
 * 符合：data: [1, 2, 3]
 * 不符合: [4, 5, 6]
 */
const maximumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (typeof data === 'number') {
    const exclusive = isExclusiveMaximum && lastExclusiveMaximumStackItem.parent === stackItem.parent;
    if (!(exclusive ? data < schema : data <= schema)) {
      const { dataPath } = stackItem,
            comparison = exclusive ? '<=' : '<',
            maximum = schema;
      stackItem.params = { comparison, maximum, exclusive };
      stackItem.message = 'data' + dataPath + ' should be ' + comparison + ' ' + maximum;
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
/**
 * exclusiveMaximum关键字处理程序：data值的是否小于schema
 * 举例：exclusiveMaximum: 3
 * 符合：data: [1, 2]
 * 不符合: [3, 4, 5, 6]
 */
const exclusiveMaximumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  const tp = typeof schema;
  if (tp === 'number') {
    if (typeof data === 'number') {
      if (data >= schema) {
        const { dataPath } = stackItem,
              comparison = '>',
              exclusiveMaximum = schema;
        stackItem.params = { comparison, exclusiveMaximum, exclusive: true };
        stackItem.message = 'data' + dataPath + ' should be ' + comparison + ' ' + exclusiveMaximum;
        stackItem.errorItems.push(stackItem);
      }
    }
  } else {
    isExclusiveMaximum = schema;
    lastExclusiveMaximumStackItem = stackItem;
  }
  stackItem.state = -1;
};
const numSize = [{ name: 'minimum', schema: { valid: { types: ['number'] } }, data: { valid: minimumDataValid } }, { name: 'exclusiveMinimum', schema: { valid: { types: ['number', 'boolean'] } }, data: { valid: exclusiveMinimumDataValid } }, { name: 'maximum', schema: { valid: { types: ['number'] } }, data: { valid: maximumDataValid } }, { name: 'exclusiveMaximum', schema: { valid: { types: ['number', 'boolean'] } }, data: { valid: exclusiveMaximumDataValid } }];
module.exports = numSize;

/***/ }),

/***/ "./lib/keywords/oneOf.js":
/*!*******************************!*\
  !*** ./lib/keywords/oneOf.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { schemaProperties } = __webpack_require__(/*! ../base/common */ "./lib/base/common.js");
/**
 * oneOf关键字处理程序：data对象的多个组合验证结果中有一个成功，则成功（所有组合都会执行）...
 * 举例：oneOf: [{"maximum": 3}, {"type": "integer"}]
 * 符合：data: 1.5, 2.5, 4, 5, any non-number
 * 不符合：data: 2, 3, 4.5, 5.5
 */
const dataValid = function (stack) {
  // 全部检测完再判断
  const stackItem = stack[stack.length - 1],
        { state, runSchemaIndex, schema } = stackItem;
  switch (state) {
    case 0:
      if (schema.length === 0) {
        stackItem.state = -1;
      } else {
        stackItem.runSchemaIndex = 0;
        stackItem.runSchemaErrors = [];
        stackItem.state++;
      }
      break;
    case 1:
      schemaProperties({ stack, schemaFrom: schema[runSchemaIndex], parent: stackItem });
      stackItem.runSchemaIndex++;
      stackItem.state++;
      break;
    case 2:
      stackItem.runSchemaErrors.push(stackItem.errorItems);
      stackItem.errorItems = [];
      if (runSchemaIndex < schema.length) {
        stackItem.state--;
      } else {
        let haveOk = false;
        const schemaErrors = stackItem.runSchemaErrors;
        for (const errorItems of schemaErrors) {
          if (errorItems.length === 0) {
            haveOk = true;
            break;
          }
        }
        if (!haveOk) {
          const { dataPath } = stackItem;
          stackItem.message = 'data' + dataPath + ' should match some schema in oneOf';
          stackItem.errorItems.push(stackItem);
          stackItem.state = -1;
        } else {
          stackItem.state = -2; // 置状态小于0，代表已经完成所有的过程，等于-1时处理错误信息，等于-2不处理错误信息
        }
      }
      break;
  }
};
const properties = [{ name: 'oneOf', schema: { array: true, valid: { types: ['object'] } }, data: { valid: dataValid } }];
module.exports = properties;

/***/ }),

/***/ "./lib/keywords/pattern.js":
/*!*********************************!*\
  !*** ./lib/keywords/pattern.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * pattern关键字处理程序：data字符串值的格式满足pattern对应的正则表达式
 * 举例：pattern: ['^[abc]+$']
 * 符合：data: "a", "abc", "cde"
 * 不符合: data: "d", "abd", "def", "123", ""
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (typeof data === 'string') {
    let valid = false;
    for (const val of schema) {
      const pattern = typeof val === 'string' ? new RegExp(val) : val;
      if (pattern) {
        valid = pattern.test(data);
        if (valid) break;
      }
    }
    if (!valid) {
      const { dataPath } = stackItem;
      stackItem.params = { pattern: schema };
      stackItem.message = 'data' + dataPath + ' should be match to one of the pattern';
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const pattern = [{ name: 'pattern', schema: { array: true, valid: { types: ['regexp'] } }, data: { valid: dataValid } }];
module.exports = pattern;

/***/ }),

/***/ "./lib/keywords/patternRequired.js":
/*!*****************************************!*\
  !*** ./lib/keywords/patternRequired.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * patternRequired关键字处理程序：data中是否有满足正则条件名称的相应属性...
 * 举例：patternRequired: ["f.*o", "b.*r"]
 * 符合：data: [{ "foo": 1, "bar": 2 }, { "foobar": 3 }]
 * 不符合: data: [{}, { "foo": 1 }, { "bar": 2 }]
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const val of schema) {
      const pattern = typeof val === 'string' ? new RegExp(val) : val;
      if (pattern) {
        let hasOk = false;
        for (const name in data) {
          if (data.hasOwnProperty(name) && pattern.test(name)) {
            hasOk = true;
            break;
          }
        }
        if (!hasOk) {
          const { dataPath } = stackItem;
          stackItem.params = { pattern: schema };
          stackItem.message = 'data' + dataPath + ' should have property match to one of the pattern';
          stackItem.errorItems.push(stackItem);
          break;
        }
      }
    }
  }
  stackItem.state = -1;
};
const patternRequired = [{ name: 'patternRequired', schema: { array: true, valid: { types: ['string'] } }, data: { valid: dataValid } }];
module.exports = patternRequired;

/***/ }),

/***/ "./lib/keywords/properties.js":
/*!************************************!*\
  !*** ./lib/keywords/properties.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

let doProps, doPatternProps, lastPropertiesStackItem, lastPatternPropertiesStackItem;
const { schemaProperties } = __webpack_require__(/*! ../base/common */ "./lib/base/common.js");
/**
 * additionalProperties关键字处理程序，当为false时，不允许添加额外多余项，当为{}时检测额外项
 */
const additionalPropertiesDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, state } = stackItem;
  let haveProps, havePatternProps, addProps, addLen;
  switch (state) {
    case 0:
      haveProps = lastPropertiesStackItem && lastPropertiesStackItem.parent === stackItem.parent;
      havePatternProps = lastPatternPropertiesStackItem && lastPatternPropertiesStackItem.parent === stackItem.parent;
      addProps = [];
      if (haveProps || havePatternProps) {
        for (const name in data) {
          if (data.hasOwnProperty(name)) {
            if (!(doProps && doProps[name] || doPatternProps && doPatternProps[name])) {
              addProps.push(name);
            }
          }
        }
      }
      addLen = addProps.length;
      if (addLen > 0) {
        const { schema } = stackItem;
        if (typeof schema === 'boolean') {
          if (!schema) {
            const { dataPath } = stackItem;
            stackItem.params = {};
            stackItem.message = 'data' + dataPath + ' should not have additional property';
            stackItem.errorItems.push(stackItem);
          }
          stackItem.state = -1;
        } else {
          for (let i = addLen - 1; i >= 0; --i) {
            const propName = addProps[i];
            schemaProperties({ stack, schemaFrom: stackItem.schema, parent: stackItem, data: data[propName], dataFrom: data, dataName: propName });
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
  const stackItem = stack[stack.length - 1],
        { data, state, schema } = stackItem;
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
                  if (schemaProperties({ stack, schemaFrom: schema[propName], parent: stackItem, data: data[dataName], dataFrom: data, dataName })) {
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
  const stackItem = stack[stack.length - 1],
        { data, state, schema } = stackItem;
  let doIt;
  switch (state) {
    case 0:
      doIt = false;
      doProps = {};
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (schema && typeof schema === 'object' && !Array.isArray(schema)) {
          for (const propName in schema) {
            if (schema.hasOwnProperty(propName) && data.hasOwnProperty(propName)) {
              if (schemaProperties({ stack, schemaFrom: schema[propName], parent: stackItem, data: data[propName], dataFrom: data, dataName: propName })) {
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
const properties = [{ name: 'additionalProperties', schema: { valid: { types: ['boolean', 'object'] } }, data: { valid: additionalPropertiesDataValid } }, { name: 'patternProperties', schema: { valid: { types: ['object'], value: patternPropertiesValid } }, data: { valid: patternPropertiesDataValid } }, { name: 'properties', schema: { valid: { types: ['object'] } }, data: { valid: propertiesDataValid } }];
module.exports = properties;

/***/ }),

/***/ "./lib/keywords/propertyNames.js":
/*!***************************************!*\
  !*** ./lib/keywords/propertyNames.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { schemaProperties } = __webpack_require__(/*! ../base/common */ "./lib/base/common.js");
/**
 * propertyNames关键字处理程序：data对象的子属性名称的验证...
 * 举例：{"propertyNames":{"foo":{"type":"string"},"bar":{"type":"number","minimum":2}}}
 * 符合：data: [{}, {"foo": "a"}, {"foo": "a", "bar": 2}]
 * 不符合: data: [{"foo": 1}, {"foo": "a", "bar": 1}]
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, state, schema } = stackItem;
  let doIt;
  switch (state) {
    case 0:
      doIt = false;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (schema && typeof schema === 'object' && !Array.isArray(schema)) {
          for (const dataName in data) {
            if (data.hasOwnProperty(dataName)) {
              if (schemaProperties({ stack, schemaFrom: schema, parent: stackItem, data: dataName, dataFrom: data })) {
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
        const { dataPath } = stackItem;
        stackItem.params = {};
        stackItem.message = 'data' + dataPath + ' property name should all valid';
        stackItem.errorItems = [stackItem];
      }
      stackItem.state = -1;
      break;
  }
};
const propertyNames = [{ name: 'propertyNames', schema: { valid: { types: ['object'] } }, data: { valid: dataValid } }];
module.exports = propertyNames;

/***/ }),

/***/ "./lib/keywords/propsNum.js":
/*!**********************************!*\
  !*** ./lib/keywords/propsNum.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * maxProperties关键字处理程序：data对象属性数量最大值
 * 举例：maxProperties: 2
 * 符合：data: [{}, {"a": 1}, {"a": 1, "b": 2}]
 * 不符合: data: [{"a": 1, "b": 2, "c": 3}]
 */
const maxPropertiesDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    let len = 0,
        err = false;
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
      const { dataPath } = stackItem,
            maxProperties = schema;
      stackItem.params = { maxProperties };
      stackItem.message = 'data' + dataPath + ' should not have less than ' + maxProperties + ' property';
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
/**
 * minProperties关键字处理程序：data字符串长度最大值
 * 举例：minProperties: 2
 * 符合：data: [{"a": 1, "b": 2}, {"a": 1, "b": 2, "c": 3}]
 * 不符合: data: [{}, {"a": 1}]
 */
const minPropertiesDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    let len = 0;
    for (const n in data) {
      if (data.hasOwnProperty(n)) {
        len++;
      }
    }
    if (len < schema) {
      const { dataPath } = stackItem,
            minProperties = schema;
      stackItem.params = { minProperties };
      stackItem.message = 'data' + dataPath + ' should not have more than ' + minProperties + ' property';
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const valid = function (val) {
  return val >= 0 && val % 1 === 0;
};
const strLength = [{ name: 'maxProperties', schema: { valid: { types: ['number'], value: valid } }, data: { valid: maxPropertiesDataValid } }, { name: 'minProperties', schema: { valid: { types: ['number'], value: valid } }, data: { valid: minPropertiesDataValid } }];
module.exports = strLength;

/***/ }),

/***/ "./lib/keywords/required.js":
/*!**********************************!*\
  !*** ./lib/keywords/required.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * required关键字处理程序：data中是否有相应的属性...
 * 举例：required: ["a", "b"]
 * 符合：data: [{"a": 1, "b": 2}, {"a": 1, "b": 2, "c": 3}]
 * 不符合: data: [{}, {"a": 1}, {"c": 3, "d":4}]
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const val of schema) {
      if (!data.hasOwnProperty(val)) {
        const { dataPath } = stackItem;
        stackItem.params = { required: schema };
        stackItem.message = 'data' + dataPath + ' should have required property ' + schema.toString();
        stackItem.errorItems.push(stackItem);
        break;
      }
    }
  }
  stackItem.state = -1;
};
const required = [{ name: 'required', schema: { array: true, valid: { types: ['string'] } }, data: { valid: dataValid } }];
module.exports = required;

/***/ }),

/***/ "./lib/keywords/strLen.js":
/*!********************************!*\
  !*** ./lib/keywords/strLen.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * maxLength关键字处理程序：data字符串长度最大值
 * 举例：maxLength: 5
 * 符合：data: ["abc", "abcd", "abcde"]
 * 不符合: data: ["abcdef"]
 */
const maxLengthDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (typeof data === 'string') {
    if (data.length > schema) {
      const { dataPath } = stackItem,
            maxLength = schema;
      stackItem.params = { maxLength };
      stackItem.message = 'data' + dataPath + ' NOT be longer than ' + maxLength + ' character';
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
/**
 * minLength关键字处理程序：data字符串长度最大值
 * 举例：minLength: 3
 * 符合：data: ["abc", "abcd", "abcde"]
 * 不符合: data: ["ab", "a"]
 */
const minLengthDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (typeof data === 'string') {
    if (data.length < schema) {
      const { dataPath } = stackItem,
            minLength = schema;
      stackItem.params = { minLength };
      stackItem.message = 'data' + dataPath + ' NOT be shorter than ' + minLength + ' character';
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const valid = function (val) {
  return val >= 0 && val % 1 === 0;
};
const strLen = [{ name: 'maxLength', schema: { valid: { types: ['number'], value: valid } }, data: { valid: maxLengthDataValid } }, { name: 'minLength', schema: { valid: { types: ['number'], value: valid } }, data: { valid: minLengthDataValid } }];
module.exports = strLen;

/***/ }),

/***/ "./lib/keywords/type.js":
/*!******************************!*\
  !*** ./lib/keywords/type.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const types = {
  null: function (data) {
    return data === null;
  },
  boolean: 'boolean',
  object: function (data) {
    return data && typeof data === 'object' && !Array.isArray(data);
  },
  array: function (data) {
    return data && Array.isArray(data);
  },
  number: "number",
  integer: function (data) {
    return typeof data === 'number' && data % 1 === 0;
  },
  string: "string"
};
/**
 * type关键字处理程序：data值的类型是否在指定的schemas中
 * 举例：type: ['string', 'number']
 * 符合：data: 1, 100, 'a', 'abc'
 * 不符合: data: {}, null
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  let valid = false;
  for (const val of schema) {
    const type = types[val];
    if (type) {
      if (typeof type === 'string') {
        valid = typeof data === type;
      } else if (typeof type === 'function') {
        valid = type(data);
      }
      if (valid) break;
    }
  }
  if (!valid) {
    const { dataPath } = stackItem;
    stackItem.params = { type: schema };
    stackItem.message = 'data' + dataPath + ' should be ' + schema.toString();
    stackItem.errorItems.push(stackItem);
  }
  stackItem.state = -1;
};
const type = [{ name: 'type', schema: { array: true, valid: { types: ['string'] } }, data: { valid: dataValid }, ext: { types } }];
module.exports = type;

/***/ }),

/***/ "./lib/keywords/uniqueItems.js":
/*!*************************************!*\
  !*** ./lib/keywords/uniqueItems.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const nebUtil = __webpack_require__(/*! nebjs-util */ "./node_modules/nebjs-util/build/dev/nebjs-util.js");
const uniqueItem = nebUtil.array.uniqueItem;
/**
 * uniqueItems关键字处理程序：data数组无重复元素
 * 举例：uniqueItems: true
 * 符合：data: [[], [1, 2, 3], [1, "a"]]
 * 不符合: data: [[1, 1, 2], [1, {"a": "b", "b": "c"}, {"b": "c", "a": "b"}]
 */
const uniqueItemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1],
        { data, schema } = stackItem;
  if (Array.isArray(data) && schema) {
    if (!uniqueItem(data)) {
      const { dataPath } = stackItem;
      stackItem.params = {};
      stackItem.message = 'data' + dataPath + ' should not have duplicate item';
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const strLength = [{ name: 'uniqueItems', schema: { valid: { types: ['boolean'] } }, data: { valid: uniqueItemsDataValid } }];
module.exports = strLength;

/***/ }),

/***/ "./node_modules/nebjs-util/build/dev/nebjs-util.js":
/*!*********************************************************!*\
  !*** ./node_modules/nebjs-util/build/dev/nebjs-util.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else { var i, a; }
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/array/index.js":
/*!****************************!*\
  !*** ./lib/array/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { clone, equal } = __webpack_require__(/*! ../common/index */ "./lib/common/index.js");
/**
 * 查找值相等的元素的索引位置
 * @param array {Array} 在数组中查找
 * @param element {*} 查找等值元素
 * @param option
 * {
 *  equalValue: true 执行严格的值相等判断，会深度作值对比
 * }
 * @returns {number} 查找到的索引值，-1代表未找到
 */
const findItem = function (array, element, option = {}) {
  if (!Array.isArray(array)) throw new TypeError('array must be a array');
  if (option && option.constructor !== Object) throw new TypeError('option must be a object');
  const { equalValue = true } = option;
  if (equalValue) {
    return array.findIndex(elem => {
      return equal(elem, element);
    });
  } else {
    return array.findIndex(elem => {
      return elem === element;
    });
  }
};
/**
 * 判断数组没有重复元素
 * @param array
 * @param option
 * {
 *  equalValue: true 执行严格的值相等判断，会深度作值对比
 * }
 * @returns {boolean}
 */
const uniqueItem = function (array, option = {}) {
  if (!Array.isArray(array)) throw new TypeError('array must be a array');
  if (option && option.constructor !== Object) throw new TypeError('option must be a object');
  const { equalValue = true } = option,
        arrLen = array.length;
  if (equalValue) {
    for (let i = 0; i < arrLen - 1; i++) {
      for (let j = i + 1; j < arrLen; j++) {
        if (equal(array[i], array[j])) {
          return false;
        }
      }
    }
  } else {
    for (let i = 0; i < arrLen - 1; i++) {
      for (let j = i + 1; j < arrLen; j++) {
        if (array[i] === array[j]) {
          return false;
        }
      }
    }
  }
  return true;
};
/**
 * 拷贝
 * @param array {Array} 目标
 * @param element {*|Array} 源对象
 * @param option {Object} 配置
 * deep {Boolean} 深拷贝，默认false
 * 深拷贝的层级数接近无限，注意：当采用deep进行深拷贝时，深拷贝对象中不得出现互相循环引用，否则将陷于无穷向下拷贝直到资源耗尽
 * index {Number} 非负整数，指定插入的位置，未指定时在最后，为0时为首
 * uniqueValue {Boolean} 唯一性限制，默认为false，当为true时，已经存在的元素不会被拷贝（深度值相等）
 * multi {Boolean} 批量复制，默认为false，当为true时，element为要导入的多个元素组成的数组
 * unique {Boolean} 唯一性限制，默认为false，当为true时，已经存在的元素不会被拷贝
 * filter {Function} 过滤器：Function(array, elements, element, index)，过滤掉不合条件的元素（优先级低于deep配置），过滤器的this指向当前源element
 *    返回值是false或其他非真对象时代表过滤掉相应元素
 *    返回值是true时代表直接插入相应元素
 *    返回值是{value: ???}时代表插入value对应的值，此方式可用于作特殊处理，比如实现复杂深度拷贝副本再插入等操作
 * @return []
 */
const copy = function (array, element, option = {}) {
  if (!Array.isArray(array)) throw new TypeError('array must be a array');
  if (!option || option.constructor !== Object) throw new TypeError('option must be a object');
  const { index, multi, unique = false, uniqueValue = false, filter, deep = false } = option;
  let es;
  if (index !== undefined && (typeof index !== 'number' || index < 0 || index % 1 !== 0)) throw new TypeError('option\'s index must be a non-negative integer');
  if (multi) {
    if (!Array.isArray(element)) throw new TypeError('when option\'s multi is true, then elem must be a array');
    es = element;
  } else {
    es = [element];
  }
  if (unique !== true && unique !== false) throw new TypeError('option\'s unique must be a boolean');
  if (uniqueValue !== true && uniqueValue !== false) throw new TypeError('option\'s uniqueValue must be a boolean');
  if (filter && typeof filter !== 'function') throw new TypeError('option\'s filter must be a function');
  if (deep !== true && deep !== false) throw new TypeError('option\'s deep must be a boolean');
  const len = es.length;
  if (len > 0) {
    let hasSame;
    if (uniqueValue) {
      hasSame = arg => {
        return array.findIndex(elem => {
          return equal(elem, arg);
        }) !== -1;
      };
    } else if (unique) {
      hasSame = arg => {
        return array.findIndex(elem => {
          return elem === arg;
        }) !== -1;
      };
    }
    for (let i = 0; i < len; ++i) {
      const e = es[i];
      if (hasSame && hasSame(e)) continue;
      let val;
      if (filter) {
        const back = filter.call(e, array, es, e, i);
        if (!back) continue;
        if (back.constructor === Object) {
          val = back.value;
        } else {
          val = e;
        }
      } else {
        val = e;
      }
      if (deep) val = clone(val);
      // 压入
      if (index !== undefined) {
        array.splice(index + i, 0, val);
      } else {
        array.push(val);
      }
    }
  }
  return array;
};
const util = {
  copy, findItem, uniqueItem
};
module.exports = util;

/***/ }),

/***/ "./lib/common/index.js":
/*!*****************************!*\
  !*** ./lib/common/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 对比两个对象是否相等
 * @param x
 * @param y
 * @returns {Boolean}
 */
const equal = function (x, y) {
  if (arguments.length < 2) throw new TypeError('this method need two argument');
  // 创建一个栈，并在栈顶放入默认的要处理的所有参数（压栈）
  const stack = [{ x, y }];
  while (stack.length > 0) {
    const { x, y } = stack.pop(),
          tpx = typeof x,
          tpy = typeof y;
    if (isNaN(x) && isNaN(y) && tpx === 'number' && tpy === 'number') return true; // 都是NaN时
    if (x === y) return true; // 值相等或引用相等
    if (tpx !== tpy || x.constructor !== y.constructor) return false; // 基础或引用类型不同
    if (x instanceof Date && y instanceof Date || x instanceof RegExp && y instanceof RegExp) return x.toString() === y.toString();
    if (!(x instanceof Object && y instanceof Object)) return false;
    if (Array.isArray(x)) {
      if (x.length !== y.length) return false;
      for (const p in y) {
        stack.push({ x: x[p], y: y[p] });
      }
    } else {
      if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) return false;
      for (const p in y) {
        const h = y.hasOwnProperty(p);
        if (h !== x.hasOwnProperty(p)) return false;
        if (h) {
          stack.push({ x: x[p], y: y[p] });
        }
      }
      for (const p in x) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) return false;
      }
    }
  }
  return true;
};
/**
 * 深拷贝对象属性值
 * @param to 目标对象或数组
 * @param from 拷贝源对象或数组
 * @param fromName 目标属性名或数组下标
 * @param toName 拷贝源对象属性名或数组下标
 * @param mergeObject 合并对象属性模式
 * @param mergeArray 合并数组模式
 */
const deepAssign = function (to, from, fromName, toName = fromName, mergeObject, mergeArray) {
  // 创建一个栈，并在栈顶放入默认的要处理的所有参数（压栈）
  const stack = [{ to, from, fromName, toName }];
  while (stack.length > 0) {
    // 当前操作栈（参数），从栈顶取出的参数
    const arg = stack.pop(),
          { to, from, fromName, toName } = arg,
          fromElem = from[fromName];
    let toElem = to[toName];
    if (fromElem !== toElem) {
      if (!(fromElem && typeof fromElem === 'object')) {
        to[toName] = fromElem;
      } else if (Array.isArray(fromElem)) {
        const len = fromElem.length;
        if (!mergeArray || !Array.isArray(toElem)) toElem = to[toName] = [];
        const toLen = toElem.length;
        for (let i = len - 1; i >= 0; --i) {
          stack.push({ to: toElem, from: fromElem, fromName: i, toName: i + toLen });
        }
      } else {
        if (!mergeObject || !(toElem && typeof toElem === 'object' && !Array.isArray(toElem))) toElem = to[toName] = {};
        for (const name in fromElem) {
          if (fromElem.hasOwnProperty(name)) stack.push({ to: toElem, from: fromElem, fromName: name, toName: name });
        }
      }
    }
  }
};
/**
 * 克隆/深拷贝对象
 * @param src
 * @returns {*} 被拷贝数据的副本
 */
const clone = function (src) {
  if (src && !(src instanceof Date) && !(src instanceof Error) && !(src instanceof RegExp)) {
    const tp = typeof src;
    if (tp === 'string') {
      src = src.slice();
    } else if (tp !== 'function' && tp !== 'boolean' && tp !== 'number' && tp !== 'symbol') {
      let to;
      if (Array.isArray(src)) {
        to = [];
      } else if (src.constructor === Object) {
        to = {};
      } else {
        to = new src.constructor();
      }
      for (const key in src) {
        if (src.hasOwnProperty(key)) {
          deepAssign(to, src, key, key);
        }
      }
      src = to;
    }
  }
  return src;
};
const common = { deepAssign, clone, equal };
module.exports = common;

/***/ }),

/***/ "./lib/date/index.js":
/*!***************************!*\
  !*** ./lib/date/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

const replaceReg = /(yyyy|yy|MM?|dd?|HH?|ss?|mm?)/g,
      stringToDateRegs = {
  "yyyy": [{ num: 4, reg: /yyyy/ }, { num: 2, reg: /yy/ }],
  "MM": [{ num: 2, reg: /MM/ }, { num: 1, reg: /M/ }],
  "dd": [{ num: 2, reg: /dd/ }, { num: 1, reg: /d/ }],
  "HH": [{ num: 2, reg: /HH/ }, { num: 1, reg: /H/ }],
  "mm": [{ num: 2, reg: /mm/ }, { num: 1, reg: /m/ }],
  "ss": [{ num: 2, reg: /ss/ }, { num: 1, reg: /s/ }]
},
      hrReg = /-/g;
/**
 * 从日期/时间获取格式化字符串
 * @param date {Date}
 * @param format {String} 格式化format "yyyy-MM-dd HH:mm:ss"
 * @returns {String}
 */
const toFormatString = function (date, format) {
  if (!date) return "";
  format = format || "yyyy-MM-dd HH:mm:ss";
  date = new Date(date);
  if (!(date instanceof Date)) return "";
  const dict = {
    "yyyy": date.getFullYear(),
    "yy": (date.getFullYear() + "").substr(2),
    "M": date.getMonth() + 1,
    "d": date.getDate(),
    "H": date.getHours(),
    "m": date.getMinutes(),
    "s": date.getSeconds(),
    "MM": ("" + (date.getMonth() + 101)).substr(1),
    "dd": ("" + (date.getDate() + 100)).substr(1),
    "HH": ("" + (date.getHours() + 100)).substr(1),
    "mm": ("" + (date.getMinutes() + 100)).substr(1),
    "ss": ("" + (date.getSeconds() + 100)).substr(1)
  };
  return format.replace(replaceReg, function () {
    return dict[arguments[0]];
  });
};
/**
 * 从格式化字符串获取日期/时间
 * @param dateStr {String} 日期/时间字符串
 * @param format {String} 格式化format  默认"yyyy-MM-dd HH:mm:ss"
 * @returns {*}
 */
const fromFormatString = function (dateStr, format) {
  if (format) {
    if (dateStr.length < format.length) {
      return null;
    }
    const date = { "yyyy": 0, "MM": 0, "dd": 0, "HH": 0, "mm": 0, "ss": 0 };
    let attr, testRegs, index, i, testLen, num;
    for (attr in stringToDateRegs) {
      testRegs = stringToDateRegs[attr];
      for (i = 0, testLen = testRegs.length; i < testLen; ++i) {
        if ((index = format.search(testRegs[i].reg)) !== -1) {
          num = testRegs[i].num;
          date[attr] = dateStr.substr(index, num);
          if (date[attr]) {
            date[attr] = parseInt(date[attr]);
            break;
          }
        }
      }
    }
    return new Date(date.yyyy, date.MM - 1, date.dd, date.HH, date.mm, date.ss, 0);
  }
  if (dateStr) {
    if (typeof dateStr === "string") {
      dateStr = dateStr.replace(hrReg, "/");
    }
    return new Date(dateStr);
  }
  return new Date();
};
const util = { toFormatString, fromFormatString };
module.exports = util;

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const common = __webpack_require__(/*! ./common/index */ "./lib/common/index.js");
const object = __webpack_require__(/*! ./object/index */ "./lib/object/index.js");
const string = __webpack_require__(/*! ./string/index */ "./lib/string/index.js");
const array = __webpack_require__(/*! ./array/index */ "./lib/array/index.js");
const date = __webpack_require__(/*! ./date/index */ "./lib/date/index.js");
const util = { common, object, string, array, date };
module.exports = util;

/***/ }),

/***/ "./lib/object/index.js":
/*!*****************************!*\
  !*** ./lib/object/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { deepAssign } = __webpack_require__(/*! ../common/index */ "./lib/common/index.js");
/**
 * 清空对象
 * @param obj
 */
const clear = function (obj) {
  if (!obj || obj.constructor !== Object) throw new TypeError('obj must be a object');
  obj = Object(obj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      delete obj[key];
    }
  }
  return obj;
};
/**
 * 深拷贝一个对象至另一个对象，可指定只拷贝满足条件的属性，可为属性指定别名
 * @param to {Object} 目标
 * @param from {Object} 源对象
 * @param option {Object} 配置
 * deep {Boolean} 深拷贝，默认false
 * 深拷贝的层级数接近无限，注意：当采用deep进行深拷贝时，深拷贝对象中不得出现互相循环引用，否则将陷于无穷向下拷贝直到资源耗尽
 * omit {String|Array|Function} 要删除的属性，不会再触发后面的过滤器
 * filter {Function} 过滤器：Function(key, src, target)，过滤掉不合条件的属性（优先级最低），过滤器的this指向源对象src
 *    返回值为false的被过滤掉..
 *    当返回值是非false时，不过滤数据，且返回值是非空字符串时，返回值作为【目标对象属性名称】（更名拷贝）
 * mergeObject {Boolean} 合并对象 默认真
 * mergeArray {Boolean} 合并数组 默认真
 * @return {*}
 */
const copy = function (to, from, option = {}) {
  if (!to || to.constructor !== Object) throw new TypeError('to must be a object');
  if (!from || from.constructor !== Object) throw new TypeError('from must be a object');
  if (!option || option.constructor !== Object) throw new TypeError('option must be a object');
  let { omit, deep = false, filter, mergeObject = true, mergeArray = true } = option;
  if (omit) {
    if (typeof omit === 'string') {
      omit = [omit];
    }
    if (omit.length === 0) omit = null;
  }
  if (filter && typeof filter !== 'function') throw new TypeError('option\'s filter must be a function');
  if (omit || filter) {
    for (const key in from) {
      if (from.hasOwnProperty(key)) {
        if (!omit || omit.indexOf(key) === -1) {
          if (filter) {
            let name = null;
            const back = filter.call(from, key, from, to);
            if (back !== false) {
              name = back && typeof back === 'string' ? back : key;
              if (deep) {
                deepAssign(to, from, key, name, mergeObject, mergeArray);
              } else {
                to[name] = from[key];
              }
            }
          } else {
            if (deep) {
              deepAssign(to, from, key, key, mergeObject, mergeArray);
            } else {
              to[key] = from[key];
            }
          }
        }
      }
    }
  } else if (to !== from) {
    if (deep) {
      for (const key in from) {
        if (from.hasOwnProperty(key)) {
          deepAssign(to, from, key, key, mergeObject, mergeArray);
        }
      }
    } else {
      for (const key in from) {
        if (from.hasOwnProperty(key)) {
          to[key] = from[key];
        }
      }
    }
  }
  return to;
};
/**
 * 深选择拷贝一个对象至另一个对象，必须指定要拷贝的属性，可指定拷贝条件，可为属性指定别名
 * @param to {Object} 目标
 * @param from {Object} 源对象
 * @param option {Object} 配置
 * deep {Boolean} 深拷贝，默认false
 * 深拷贝的层级数接近无限，注意：当采用deep进行深拷贝时，深拷贝对象中不得出现互相循环引用，否则将陷于无穷向下拷贝直到资源耗尽
 * pick {String|Object|Array} 要拷贝的属性，其他属性不会触发后续的过滤器
 *    当为Object时：{srcAttrName: 'toAttrName', ...}  【源对象属性名称】对应的值作为【目标对象属性名称】（更名拷贝）
 * filter {Function} 过滤器：{Function(key, src, target)}，过滤掉不合条件的属性（优先级最低），过滤器的this指向源对象src
 *    返回值为false的被过滤掉..
 *    当返回值是非false时，不过滤数据，且返回值是非空字符串时，返回值作为【目标对象属性名称】（更名拷贝）
 * mergeObject {Boolean} 合并对象 默认真
 * mergeArray {Boolean} 合并数组 默认真
 * @return {*}
 */
const pick = function (to, from, option = {}) {
  if (!to || to.constructor !== Object) throw new TypeError('to must be a object');
  if (!from || from.constructor !== Object) throw new TypeError('from must be a object');
  if (!option || option.constructor !== Object) throw new TypeError('option must be a object');
  let { pick, deep = false, filter, mergeObject = true, mergeArray = true } = option;
  if (to === from) {
    return to;
  }
  if (pick) {
    if (typeof pick === 'string') {
      pick = [pick];
    }
    if (pick.length === 0) pick = null;
  }
  if (!pick) return to;
  if (filter && typeof filter !== 'function') throw new TypeError('option\'s filter must be a function');
  for (const key of pick) {
    if (from.hasOwnProperty(key)) {
      if (filter) {
        let name = null;
        const back = filter.call(from, key, from, to);
        if (back !== false) {
          name = back && typeof back === 'string' ? back : key;
          if (deep) {
            deepAssign(to, from, key, name, mergeObject, mergeArray);
          } else {
            to[name] = from[key];
          }
        }
      } else {
        if (deep) {
          deepAssign(to, from, key, key, mergeObject, mergeArray);
        } else {
          to[key] = from[key];
        }
      }
    }
  }
  return to;
};
const util = {
  clear, copy, pick
};
module.exports = util;

/***/ }),

/***/ "./lib/string/index.js":
/*!*****************************!*\
  !*** ./lib/string/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

const reg = (() => {
  // 空白符
  const whiteChar = '[\\x20\\t\\r\\n\\f]',

  // 空白字符串
  white = whiteChar + '+',

  // 空白区
  whitespace = '(?:' + white + ')*',

  // 去左右空白区
  trim = '(^' + whitespace + ')|(' + whitespace + '$)',

  // 左空白区
  trimLeft = '(^' + whitespace + ')',

  // 右空白区
  trimRight = '(' + whitespace + '$)',

  // 用于替换转义字符(双字节编码)(普通转义)(换行转义)
  escapeReplace = '\\\\(?:([0-9a-fA-F]{1,6}(?:\\r\\n|[\\x20\\n\\r\\t\\f])?)|([^\\n\\r\\f0-9a-fA-F])|((?:\\n|\\r\\n|\\r|\\f)))';
  return {
    // 去左右空白区
    trim: new RegExp(trim, 'g'),
    // 去左空白区
    trimLeft: new RegExp(trimLeft, 'g'),
    // 去右空白区
    trimRight: new RegExp(trimRight, 'g'),
    // 用于替换转义字符
    escape: new RegExp('' + escapeReplace, 'g')
  };
})();
/**
 * 替换转义方法
 * @param matchStr 匹配的字符串
 * @param escapeUnicode (双字节编码)(普通转义)(换行转义)
 * @param escapeChar 匹配起始位置
 * @param escapeNewline 字符串本身
 * @returns {*}
 */
const escapeReplaceFun = function (matchStr, escapeUnicode, escapeChar, escapeNewline) {
  if (escapeNewline) return '';
  if (escapeChar) return escapeChar;
  const code = parseInt(escapeUnicode, 16);
  let sub = code - 0x10000;
  return sub < 0 ? /* 65536*/String.fromCharCode(code) : String.fromCharCode(sub >> 10 | 0xD800, sub & 0x3FF | 0xDC00);
};
const util = {
  /**
   * 截取字符串两端空白符
   * @param str
   * @returns {*}
   */
  trim(str) {
    if (typeof str !== 'string') return new TypeError('str must be a string');
    return str.replace(reg.trim, '');
  },
  /**
   * 截取字符串左端空白符
   * @param str
   * @returns {*}
   */
  trimLeft(str) {
    if (typeof str !== 'string') return new TypeError('str must be a string');
    return str.replace(reg.trimLeft, '');
  },
  /**
   * 截取字符串右端空白符
   * @param str
   * @returns {*}
   */
  trimRight(str) {
    if (typeof str !== 'string') return new TypeError('str must be a string');
    return str.replace(reg.trimRight, '');
  },
  /**
   * 对字符串中的转义字符进行转义
   * @param str
   * @returns {*}
   */
  escape(str) {
    if (typeof str !== 'string') return new TypeError('code must be a string');
    return str.length > 0 ? str.replace(reg.escape, escapeReplaceFun) : str;
  }
};
module.exports = util;

/***/ })

/******/ });
});

/***/ })

/******/ });
});
