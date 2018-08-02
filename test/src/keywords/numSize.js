const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【minimum、exclusiveMinimum、maximum、exclusiveMaximum】的测试', function () {
  it('{"minimum": 3} 测试： valid: [3, 4, 5], invalid: [1, 2]', function () {
    const valid = [3, 4, 5], invalid = [1, 2];
    const corrector = new correctorSchema({minimum: 3}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"minimum": 3, "exclusiveMinimum": true} 测试： valid: [4, 5], invalid: [1, 2, 3]', function () {
    const valid = [4, 5], invalid = [1, 2, 3];
    const corrector = new correctorSchema({minimum: 3, exclusiveMinimum: true}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"exclusiveMinimum": 3} 测试： valid: [4, 5], invalid: [1, 2, 3]', function () {
    const valid = [4, 5], invalid = [1, 2, 3];
    const corrector = new correctorSchema({exclusiveMinimum: 3}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"maximum": 3} 测试： valid: [1, 2, 3], invalid: [4, 5, 6]', function () {
    const valid = [1, 2, 3], invalid = [4, 5, 6];
    const corrector = new correctorSchema({maximum: 3}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"maximum": 3, "exclusiveMaximum": true} 测试： valid: [1, 2], invalid: [3, 4, 5, 6]', function () {
    const valid = [1, 2], invalid = [3, 4, 5, 6];
    const corrector = new correctorSchema({maximum: 3, exclusiveMaximum: true}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"exclusiveMaximum": 3} 测试： valid: [1, 2], invalid: [3, 4, 5, 6]', function () {
    const valid = [1, 2], invalid = [3, 4, 5, 6];
    const corrector = new correctorSchema({exclusiveMaximum: 3}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});
