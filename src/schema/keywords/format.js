const formats = (() => {
  ////////////////////////////////////////////////////////////////////////////////// date-time
  const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
  const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d:\d\d)?$/i;
  const DATE_TIME_SEPARATOR = /t|\s/i;

  // date: http://tools.ietf.org/html/rfc3339#section-5.6
  // const FAST_DATE = /^\d\d\d\d-[0-1]\d-[0-3]\d$/;
  // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
  // const FAST_TIME = /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i;
  // const FAST_DATE_TIME = /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i;
  // https://tools.ietf.org/html/rfc3339#appendix-C
  const isLeapYear = year => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  };
  // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
  const date = str => {
    const matches = str.match(DATE);
    if (!matches) return false;
    const year = +matches[1], month = +matches[2], day = +matches[3];
    return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
  };
  const time = (str, full) => {
    const matches = str.match(TIME);
    if (!matches) return false;
    const hour = matches[1], minute = matches[2], second = matches[3], timeZone = matches[5];
    return ((hour <= 23 && minute <= 59 && second <= 59) || (hour === 23 && minute === 59 && second === 60)) && (!full || timeZone);
  };
  // http://tools.ietf.org/html/rfc3339#section-5.6
  const date_time = str => {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], true);
  };
  const datetime = str => {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], false);
  };

  ////////////////////////////////////////////////////////////////////////////////// uri
  const URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
  // const FAST_URI = /^(?:[a-z][a-z0-9+-.]*:)(?:\/?\/)?[^\s]*$/i;
  // const FAST_URI_REF = /^(?:(?:[a-z][a-z0-9+-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i;
  const URI_REF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  // uri-template: https://tools.ietf.org/html/rfc6570
  const URI_TEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
  const NOT_URI_FRAGMENT = /\/|:/;
  // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
  const uri = str => {
    return NOT_URI_FRAGMENT.test(str) && URI.test(str);
  };
  const HOSTNAME = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*$/i;
  const hostname = str => {
    // https://tools.ietf.org/html/rfc1034#section-3.5
    // https://tools.ietf.org/html/rfc1123#section-2
    return str.length <= 255 && HOSTNAME.test(str);
  };
  // For the source: https://gist.github.com/dperini/729294
  // For test cases: https://mathiasbynens.be/demo/url-regex
  // Delete current URL in favour of the commented out URL rule when this issue is fixed https://github.com/eslint/eslint/issues/7983.
  // var URL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
  const URL = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i;

  // email (sources from jsen corrector):
  // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
  // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
  // const FAST_EMAIL = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
  const EMAIL = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  ////////////////////////////////////////////////////////////////////////////////// ip
  // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
  const ipv4 = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
  // optimized http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
  const ipv6 = /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i;

  ////////////////////////////////////////////////////////////////////////////////// regxp
  const Z_ANCHOR = /[^\\]\\Z/;
  const regex = str => {
    if (Z_ANCHOR.test(str)) return false;
    try {
      new RegExp(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  ////////////////////////////////////////////////////////////////////////////////// uuid
  // uuid: http://tools.ietf.org/html/rfc4122
  const UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

  ////////////////////////////////////////////////////////////////////////////////// JSON
  // JSON-pointer: https://tools.ietf.org/html/rfc6901
  const JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
  // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
  const JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
  // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
  const RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;

  return {
    date, time, 'date-time': date_time, datetime,
    uri: uri, 'uri-reference': URI_REF, 'uri-template': URI_TEMPLATE, url: URL, hostname, email: EMAIL,
    ipv4, ipv6,
    regex,
    uuid: UUID,
    'json-pointer': JSON_POINTER, 'json-pointer-uri-fragment': JSON_POINTER_URI_FRAGMENT, 'relative-json-pointer': RELATIVE_JSON_POINTER,
    'phone': /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  };
})();
const formatsNumber = (() => {
  const date = str => {
    return new Date(str).getTime();
  };
  const time = str => {
    return date('1970-1-1 ' + str);
  };
  return {date, datetime: date, 'date-time': date, time};
})();
let lastFormat, isFormatExclusiveMaximum, lastFormatExclusiveMaximumStackItem, isFormatExclusiveMinimum, lastFormatExclusiveMinimumStackItem;
const formatMinimumMessage = 'data{{dataPath}} should be {{params.comparison}} {{params.formatMinimum}}';
/**
 * formatMinimum关键字处理程序：data值的是否大于等于schema（formatExclusiveMaximum时不能等于）
 * 举例：formatMinimum: 3
 * 符合：data: [3, 4, 5]
 * 不符合: [1, 2]
 */
const formatMinimumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (typeof data === 'string' && lastFormat) {
    const fnf = formatsNumber[lastFormat];
    if (fnf && typeof fnf === 'function') {
      const exclusive = isFormatExclusiveMinimum && lastFormatExclusiveMinimumStackItem.parent === stackItem.parent;
      if (!(exclusive ? fnf(data) > fnf(schema) : fnf(data) >= fnf(schema))) {
        stackItem.params = {comparison: exclusive ? '>=' : '>', formatMinimum: schema, exclusive};
        stackItem.errorItems.push(stackItem);
      }
    }
  }
  stackItem.state = -1;
};
const formatExclusiveMinimumMessage = 'data{{dataPath}} should be {{params.comparison}} {{params.formatExclusiveMinimum}}';
/**
 * formatExclusiveMinimum关键字处理程序：data值的是否大于schema
 * 举例：formatExclusiveMinimum: 3
 * 符合：data: [4, 5]
 * 不符合: [1, 2, 3]
 */
const formatExclusiveMinimumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  const tp = typeof schema;
  if (tp === 'string') {
    if (typeof data === 'string' && lastFormat) {
      const fnf = formatsNumber[lastFormat];
      if (fnf && typeof fnf === 'function') {
        if (fnf(data) <= fnf(schema)) {
          stackItem.params = {comparison: '<', formatExclusiveMinimum: schema, exclusive: true};
          stackItem.errorItems.push(stackItem);
        }
      }
    }
  } else {
    isFormatExclusiveMinimum = schema;
    lastFormatExclusiveMinimumStackItem = stackItem;
  }
  stackItem.state = -1;
};
const formatMaximumMessage = 'data{{dataPath}} should be {{params.comparison}} {{params.formatMaximum}}';
/**
 * formatMaximum关键字处理程序：data值的是否小于等于schema（formatExclusiveMaximum时不能等于）
 * 举例：formatMaximum: 3
 * 符合：data: [1, 2, 3]
 * 不符合: [4, 5, 6]
 */
const formatMaximumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (lastFormat && typeof data === 'string') {
    const fnf = formatsNumber[lastFormat];
    if (fnf && typeof fnf === 'function') {
      const exclusive = isFormatExclusiveMaximum && lastFormatExclusiveMaximumStackItem.parent === stackItem.parent;
      if (!(exclusive ? fnf(data) < fnf(schema) : fnf(data) <= fnf(schema))) {
        stackItem.params = {comparison: exclusive ? '<=' : '<', formatMaximum: schema, exclusive};
        stackItem.errorItems.push(stackItem);
      }
    }
  }
  stackItem.state = -1;
};
const formatExclusiveMaximumMessage = 'data{{dataPath}} should be {{params.comparison}} {{params.formatExclusiveMaximum}}';
/**
 * formatExclusiveMaximum关键字处理程序：data值的是否小于schema
 * 举例：formatExclusiveMaximum: 3
 * 符合：data: [1, 2]
 * 不符合: [3, 4, 5, 6]
 */
const formatExclusiveMaximumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  const tp = typeof schema;
  if (tp === 'number') {
    if (lastFormat && typeof data === 'string') {
      const fnf = formatsNumber[lastFormat];
      if (fnf && typeof fnf === 'function') {
        if (fnf(data) >= fnf(schema)) {
          stackItem.params = {comparison: '>', formatExclusiveMaximum: schema, exclusive: true};
          stackItem.errorItems.push(stackItem);
        }
      }
    }
  } else {
    isFormatExclusiveMaximum = schema;
    lastFormatExclusiveMaximumStackItem = stackItem;
  }
  stackItem.state = -1;
};
const formatMessage = 'data{{dataPath}} should match format {{params.format}}';
/**
 * format关键字处理程序：data字符串格式验证...
 * 举例：format: ['phone']
 * 符合：data: 13511111111
 * 不符合: data: 1 123 44456
 */
const formatDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (typeof data === 'string') {
    const fmt = formats[schema];
    if (fmt) {
      let ok = true;
      if (fmt.constructor === RegExp) {
        ok = fmt.test(data);
      } else if (typeof fmt === 'function') {
        ok = fmt(data);
      }
      if (!ok) {
        stackItem.params = {format: schema};
        stackItem.errorItems.push(stackItem);
        lastFormat = null;
      } else {
        lastFormat = schema;
      }
    }
  }
  stackItem.state = -1;
};
const properties = [
  {name: 'formatMinimum', schema: {valid: {types: ['string']}}, data: {valid: formatMinimumDataValid}, ext: {message: formatMinimumMessage}},
  {name: 'formatExclusiveMinimum', schema: {valid: {types: ['string', 'boolean']}}, data: {valid: formatExclusiveMinimumDataValid}, ext: {message: formatExclusiveMinimumMessage}},
  {name: 'formatMaximum', schema: {valid: {types: ['string'],}}, data: {valid: formatMaximumDataValid}, ext: {message: formatMaximumMessage}},
  {name: 'formatExclusiveMaximum', schema: {valid: {types: ['string', 'boolean']}}, data: {valid: formatExclusiveMaximumDataValid}, ext: {message: formatExclusiveMaximumMessage}},
  {name: 'format', schema: {valid: {types: ['string']}}, data: {valid: formatDataValid}, ext: {formats, message: formatMessage}}
];
module.exports = properties;
