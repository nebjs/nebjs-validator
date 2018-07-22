const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【maxLength、minLength】的测试', function () {
  it('{"maxLength": 5} 测试： valid: ["abc", "abcd", "abcde"], invalid: ["abcdef"]', function () {
    const valid = ['abc', 'abcd', 'abcde'], invalid = ['abcdef'];
    const validator = new ValidatorSchema({maxLength: 5}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"minLength": 3} 测试： valid: ["abc", "abcd", "abcde"], invalid: ["ab", "a"]', function () {
    const valid = ['abc', 'abcd', 'abcde'], invalid = ['ab', 'a'];
    const validator = new ValidatorSchema({minLength: 3}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"minLength": 3, "maxLength": 5} 测试： valid: ["abc", "abcd", "abcde"], invalid: ["ab", "a", "abcdef"]', function () {
    const valid = ['abc', 'abcd', 'abcde'], invalid = ['ab', 'a', 'abcdef'];
    const validator = new ValidatorSchema({minLength: 3, maxLength: 5}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});
