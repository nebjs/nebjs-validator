const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【maxLength、minLength】的测试', function () {
  it('{"maxLength": 5} 测试： valid: ["abc", "abcd", "abcde"], invalid: ["abcdef"]', function () {
    const valid = ['abc', 'abcd', 'abcde'], invalid = ['abcdef'];
    const corrector = new correctorSchema({maxLength: 5}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"minLength": 3} 测试： valid: ["abc", "abcd", "abcde"], invalid: ["ab", "a"]', function () {
    const valid = ['abc', 'abcd', 'abcde'], invalid = ['ab', 'a'];
    const corrector = new correctorSchema({minLength: 3}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"minLength": 3, "maxLength": 5} 测试： valid: ["abc", "abcd", "abcde"], invalid: ["ab", "a", "abcdef"]', function () {
    const valid = ['abc', 'abcd', 'abcde'], invalid = ['ab', 'a', 'abcdef'];
    const corrector = new correctorSchema({minLength: 3, maxLength: 5}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});
