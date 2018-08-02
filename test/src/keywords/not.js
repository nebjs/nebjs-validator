const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【not】的测试', function () {
  it('{"not": {"items": {"not":{"type":"string"}}}} 测试： valid: [["a"], [1, "a"]], invalid: [[], [1]]', function () {
    const valid = [['a'], [1, 'a']], invalid = [[], [1]];
    const corrector = new correctorSchema({'not': {'items': {'not': {'type':'string'}}}}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"not": {"minimum": 3}} 测试： valid: [1, 2], invalid: [3, 4]', function () {
    const valid = [1, 2], invalid = [3, 4];
    const corrector = new correctorSchema({'not': {'minimum': 3}}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});
