const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【format】的测试', function () {
  it('{"format": "ipv4"} 测试： valid: ["192.168.0.1", 1, [], {}, null, true], invalid: ["abc"]', function () {
    const valid = ['192.168.0.1', 1, [], {}, null, true], invalid = ['abc'];
    const corrector = new correctorSchema({format: 'ipv4'}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"format": "datetime", "formatMinimum": "2018-07-18 21:00:00"} 测试： valid: ["2018-07-18 21:00:00"], invalid: ["abc"]', function () {
    const valid = ['2018-07-18 21:00:00', 1, [], {}, null, true], invalid = ['abc'];
    const corrector = new correctorSchema({format: 'datetime', "formatMinimum": '2018-07-18 21:00:00'}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"format": "time", "formatMinimum": "21:00:00"} 测试： valid: ["21:00:00"], invalid: ["abc", "21:00:01"]', function () {
    const valid = ['21:00:00', 1, [], {}, null, true], invalid = ['abc', '20:59:59'];
    const corrector = new correctorSchema({format: 'time', "formatMinimum": '21:00:00'}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"format": "email"} 测试： valid: ["abc@nebjs.com"], invalid: ["abc", "21:00:01"]', function () {
    const valid = ['abc@nebjs.com', 1, [], {}, null, true], invalid = ['abc', '20:59:59'];
    const corrector = new correctorSchema({format: 'email'}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});
