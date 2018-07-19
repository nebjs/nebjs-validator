const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【minimum、exclusiveMinimum】的测试', function () {
  it('{"minimum": 3} 测试： valid: [3, 4, 5], invalid: [1, 2]', function () {
    const valid = [3, 4, 5], invalid = [1, 2];
    const validator = new ValidatorSchema({minimum: 3}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"minimum": 3, "exclusiveMinimum": true} 测试： valid: [4, 5], invalid: [1, 2, 3]', function () {
    const valid = [4, 5], invalid = [1, 2, 3];
    const validator = new ValidatorSchema({minimum: 3, exclusiveMinimum: true}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"exclusiveMinimum": 3} 测试： valid: [4, 5], invalid: [1, 2, 3]', function () {
    const valid = [4, 5], invalid = [1, 2, 3];
    const validator = new ValidatorSchema({exclusiveMinimum: 3}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});
