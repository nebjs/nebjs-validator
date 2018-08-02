const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【multipleOf】的测试', function () {
  it('{"multipleOf": 1} 测试： valid: [1, 5, 7], invalid: [1.1, 2.2, 5.7]', function () {
    const valid = [1, 5, 7], invalid = [1.1, 2.2, 5.7];
    const corrector = new correctorSchema({multipleOf: 1}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"multipleOf": 2.5} 测试： valid: [5, 10, 15], invalid: [1, 8, 12]', function () {
    const valid = [5, 10, 15], invalid = [1, 8, 12];
    const corrector = new correctorSchema({multipleOf: 2.5}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});
