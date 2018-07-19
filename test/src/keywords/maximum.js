const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【maximum、exclusiveMaximum】的测试', function () {
  it('{"maximum": 3} 测试： valid: [1, 2, 3], invalid: [4, 5, 6]', function () {
    const valid = [1, 2, 3], invalid = [4, 5, 6];
    const validator = new ValidatorSchema({maximum: 3}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"maximum": 3, "exclusiveMaximum": true} 测试： valid: [1, 2], invalid: [3, 4, 5, 6]', function () {
    const valid = [1, 2], invalid = [3, 4, 5, 6];
    const validator = new ValidatorSchema({maximum: 3, exclusiveMaximum: true}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"exclusiveMaximum": 3} 测试： valid: [1, 2], invalid: [3, 4, 5, 6]', function () {
    const valid = [1, 2], invalid = [3, 4, 5, 6];
    const validator = new ValidatorSchema({exclusiveMaximum: 3}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});
