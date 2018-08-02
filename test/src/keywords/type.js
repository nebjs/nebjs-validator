const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【type】的测试', function () {
  it('{type: "null"} 测试： valid: [null], invalid: ["abc", 1, [], {}, true]', function () {
    const valid = [null], invalid = ['abc', 1, [], {}, true];
    const corrector = new correctorSchema({type: 'null'}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{type: "boolean"} 测试： valid: [true, false], invalid: ["abc", 1, [], {}]', function () {
    const valid = [true, false], invalid = ['abc', 1, [], {}];
    const corrector = new correctorSchema({type: 'boolean'}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{type: "number"} 测试： valid: [1, 1.5], invalid: ["abc", "1", [], {}, null, true]', function () {
    const valid = [1, 1.5], invalid = ['abc', '1', [], {}, null, true];
    const corrector = new correctorSchema({type: 'number'}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{type: "object"} 测试： valid: [{}, new Date(), new Error(), /^a$/], invalid: ["abc", "1", 1.5, [], null, true, Date, RegExp]', function () {
    const valid = [{}, new Date(), new Error(), /^a$/], invalid = ['abc', '1', 1.5, [], null, true, Date, RegExp];
    const corrector = new correctorSchema({type: 'object'}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{type: "array"} 测试： valid: [[], [1, 2]], invalid: ["abc", "1", 1.5, {}, null, true]', function () {
    const valid = [[], [1, 2]], invalid = ['abc', '1', 1.5, {}, null, true];
    const corrector = new correctorSchema({type: 'array'}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{type: "integer"} 测试： valid: [1, 2], invalid: ["abc", "1", 1.5, [], {}, null, true]', function () {
    const valid = [1, 2], invalid = ['abc', '1', 1.5, [], {}, null, true];
    const corrector = new correctorSchema({type: 'integer'}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{type: ["number", "string"]} 测试： valid: [1, 1.5, "abc", "1"], invalid: [[], {}, null, true]', function () {
    const valid = [1, 1.5, 'abc', '1'], invalid = [[], {}, null, true];
    const corrector = new correctorSchema({type: ['number', 'string']}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});
