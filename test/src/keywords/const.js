const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【const】的测试', function () {
  it('{"const": [1, 2, 3]} 测试： valid: [[1, 2, 3]], invalid: [1, "bar", {"foo": "baz"}, [1, 2, 3, 4]]', function () {
    const valid = [[1, 2, 3]], invalid = [1, "bar", {"foo": "baz"}, [1, 2, 3, 4]];
    const validator = new ValidatorSchema({const: [1, 2, 3]}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});
