const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【enum】的测试', function () {
  it('{"enum": [ 2, "foo", {"foo": "bar" }, [1, 2, 3] ]} 测试： valid: [2, "foo", {"foo": "bar"}, [1, 2, 3]], invalid: [1, "bar", {"foo": "baz"}, [1, 2, 3, 4]]', function () {
    const valid = [2, 'foo', {'foo': 'bar'}, [1, 2, 3]], invalid = [1, "bar", {"foo": "baz"}, [1, 2, 3, 4]];
    const validator = new ValidatorSchema({enum: [ 2, 'foo', {'foo': 'bar' }, [1, 2, 3] ]}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});
