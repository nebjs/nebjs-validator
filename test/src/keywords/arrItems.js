const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【maxItems、minItems】的测试', function () {
  it('{"maxItems": 3} 测试： valid: [[], [1], [1, 2, 3]], invalid: [[1, 2, 3, 4]]', function () {
    const valid = [[], [1], [1, 2, 3]], invalid = [[1, 2, 3, 4]];
    const corrector = new correctorSchema({maxItems: 3}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"minItems": 3} 测试： valid: [[1, 2, 3, 4], [1, 2, 3]], invalid: [[], [1]]', function () {
    const valid = [[1, 2, 3, 4], [1, 2, 3]], invalid = [[], [1]];
    const corrector = new correctorSchema({minItems: 3}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"minItems": 3, "maxItems": 3} 测试： valid: [[1, 2, 3]], invalid: [[], [1], [1, 2, 3, 4]]', function () {
    const valid = [[1, 2, 3]], invalid = [[], [1], [1, 2, 3, 4]];
    const corrector = new correctorSchema({minItems: 3, maxItems: 3}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});
