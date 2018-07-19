const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【pattern】的测试', function () {
  it('{"pattern": "^[abc]+$"} 测试： valid: ["a", "abc"], invalid: ["d", "abd", "def", "123", ""]', function () {
    const valid = ['a', 'abc'], invalid = ['d', 'abd', 'def', '123', ''];
    const validator = new ValidatorSchema({pattern: '^[abc]+$'}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"pattern": ["^[abc]+$", "^[0-9]+$"]]} 测试： valid: ["a", "abc", "123"], invalid: ["d", "abd", "def", ""]', function () {
    const valid = ['a', 'abc', '123'], invalid = ['d', 'abd', 'def', ''];
    const validator = new ValidatorSchema({pattern: ['^[abc]+$', '^[0-9]+$']}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});
