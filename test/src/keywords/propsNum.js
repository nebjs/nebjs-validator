const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【maxProperties、minProperties】的测试', function () {
  it('{"maxProperties": 2} 测试： valid: [{}, {"a": 1}, {"a": 1, "b": 2}], invalid: [{"a": 1, "b": 2, "c": 3}]', function () {
    const valid = [{}, {"a": 1}, {"a": 1, "b": 2}], invalid = [{"a": 1, "b": 2, "c": 3}];
    const validator = new ValidatorSchema({maxProperties: 2}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"minProperties": 2} 测试： valid: ["abc", "abcd", "abcde"], invalid: [{}, {"a": 1}]', function () {
    const valid = [{"a": 1, "b": 2}, {"a": 1, "b": 2, "c": 3}], invalid = [{}, {"a": 1}];
    const validator = new ValidatorSchema({minProperties: 2}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"minProperties": 2, "maxProperties": 2} 测试： valid: [{"a": 1, "b": 2}], invalid: [{}, {"a": 1}, {"a": 1, "b": 2, "c": 3}]', function () {
    const valid = [{"a": 1, "b": 2}], invalid = [{}, {"a": 1}, {"a": 1, "b": 2, "c": 3}];
    const validator = new ValidatorSchema({minProperties: 2, maxProperties: 2}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});
