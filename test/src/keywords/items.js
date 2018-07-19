const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【items、additionalItems】的测试', function () {
  it('{"items": {type: "string"}} 测试： valid: [["abc", "abc"], ["", "aa"]], invalid: [["a", 1], [1, 2]]', function () {
    const valid = [['abc', 'abc'], ['', 'aa']], invalid = [['a', 1], [1, 2]];
    const validator = new ValidatorSchema({items: {type: 'string'}}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"items": [{type: "string"}], additionalItems: true} 测试： valid: [["abc", "abc"], ["", "aa", "a", 1], ["a", 1]], invalid: [[1, 2], [1, "a"]]]', function () {
    const valid = [['abc', 'abc'], ['', 'aa'], ['a', 1]], invalid = [[1, 2], [1, 'a']];
    const validator = new ValidatorSchema({items: [{type: 'string'}], additionalItems: true}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"items": [{type: "string"}], additionalItems: false} 测试： valid: [["abc"], [""]], invalid: [["a", 1], [1, 2], [1, "a"]]]', function () {
    const valid = [['abc'], ['']], invalid = [['a', 1], [1, 2], [1, 'a']];
    const validator = new ValidatorSchema({items: [{type: 'string'}], additionalItems: false}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"items": [{type: "string"}, {type: "string"}, {type: "number"}]} 测试： valid: [["abc", "abc", 123]], invalid: [["a", 1], [1, 2], [1, "a"]]]', function () {
    const valid = [['abc', 'abc', 123]], invalid = [['a', 1], [1, 2], [1, 'a']];
    const validator = new ValidatorSchema({items: [{type: 'string'}, {type: 'string'}, {type: 'number'}]}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"items": [{type: "string"}], additionalItems: {type: "number"}} 测试： valid: [["abc", 123, 123]], invalid: [["a", "b", 1], [1, 2], [1, "a"]]]', function () {
    const valid = [['abc', 123, 123]], invalid = [['a', 'b', 1], [1, 2], [1, 'a']];
    const validator = new ValidatorSchema({items: [{type: 'string'}], additionalItems: {type: 'number'}}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});
