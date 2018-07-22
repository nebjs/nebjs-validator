const nebUtil = require('nebjs-util');
const objPick = nebUtil.object.pick;
// const objCopy = nebUtil.object.copy;
const arrCopy = nebUtil.array.copy;
/**
 * 输出错误
 * @param option 输出配置
 */
const writeOutErrors = function (option = {}) {
  const validator = this, {errorItems} = validator;
  const {simple = true} = option;
  let out;
  if (simple) {
    out = arrCopy([], errorItems, {
      multi: true, filter: function (array, stackItems, stackItem/*, index*/) {
        const obj = {};
        return {value: objPick(obj, stackItem, {pick: ['keyword', 'message', 'params']})};
      }
    })
  }
  // 开始处理错误...
  return out;
};
module.exports = {writeOutErrors};
