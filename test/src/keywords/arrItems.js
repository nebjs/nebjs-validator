const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【maxItems、minItems】的测试', function () {
  it('{"maxItems": 3} 测试： valid: [[], [1], [1, 2, 3]], invalid: [[1, 2, 3, 4]]', function () {
    const valid = [[], [1], [1, 2, 3]], invalid = [[1, 2, 3, 4]];
    const validator = new ValidatorSchema({maxItems: 3}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"minItems": 3} 测试： valid: [[1, 2, 3, 4], [1, 2, 3]], invalid: [[], [1]]', function () {
    const valid = [[1, 2, 3, 4], [1, 2, 3]], invalid = [[], [1]];
    const validator = new ValidatorSchema({minItems: 3}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"minItems": 3, "maxItems": 3} 测试： valid: [[1, 2, 3]], invalid: [[], [1], [1, 2, 3, 4]]', function () {
    const valid = [[1, 2, 3]], invalid = [[], [1], [1, 2, 3, 4]];
    const validator = new ValidatorSchema({minItems: 3, maxItems: 3}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});
