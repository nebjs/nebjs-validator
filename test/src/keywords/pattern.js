const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【pattern】的测试', function () {
  it('{"pattern": "^[abc]+$"} 测试： valid: ["a", "abc"], invalid: ["d", "abd", "def", "123", ""]', function () {
    const valid = ['a', 'abc'], invalid = ['d', 'abd', 'def', '123', ''];
    const corrector = new correctorSchema({pattern: '^[abc]+$'}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"pattern": ["^[abc]+$", "^[0-9]+$"]]} 测试： valid: ["a", "abc", "123"], invalid: ["d", "abd", "def", ""]', function () {
    const valid = ['a', 'abc', '123'], invalid = ['d', 'abd', 'def', ''];
    const corrector = new correctorSchema({pattern: ['^[abc]+$', '^[0-9]+$']}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});
