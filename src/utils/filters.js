// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils';

function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
}

export function host(url) {
  const hostUrl = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const parts = hostUrl.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    // ~ 是按位取反 ~~ 取反两次，就是去掉小数部分
    // 因为位运算的操作值要求是整数，其结果也是整数，所以经过位运算的都会自动变成整数
    // 出了 ~~n 外，n<<0 n>>0 n|0 都可以取整
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  } else {
    return pluralize(~~(between / 86400), ' day');
  }
}

// http://jsben.ch/SNFWT
export function formatNum(n) {
  if (n < 10) return '0' + n;
  return n;
  // return n > 10 ? n : ('0' + n)
}
/**
 * formatCountDown(times, 'D天H:F:S')
 *
 * @param {any} times
 * @param {string} [format='H:F:S']
 * @returns
 */
export function formatCountDown(times, format = 'H:F:S') {
  let time = parseInt(times * 0.001, 10);

  const seconds = time % 60;
  time = parseInt(time / 60, 10);
  const minutes = time % 60;
  time = parseInt(time / 60, 10);
  const hours = parseInt(time % 24, 10);
  const days = parseInt(time / 24, 10);

  return format.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, a => {
    switch (a) {
      case 'd':
        return days;
      case 'D':
        return formatNum(days);
      case 'h':
        return hours;
      case 'H':
        return formatNum(hours);
      case 'f':
        return minutes;
      case 'F':
        return formatNum(minutes);
      case 's':
        return seconds;
      case 'S':
        return formatNum(seconds);
      default: // do nothing...
    }
  });
}

export function formatDate(date, format = 'Y年M月D日') {
  if (date && typeof date === 'number') {
    date = new Date(date);
  } else {
    return '无';
  }
  return format.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, a => {
    switch (a) {
      case 'y':
        return (date.getFullYear() + '').slice(2);
      case 'Y':
        return date.getFullYear();
      case 'm':
        return date.getMonth() + 1;
      case 'M':
        return formatNum(date.getMonth() + 1);
      case 'd':
        return date.getDate();
      case 'D':
        return formatNum(date.getDate());
      case 'h':
        return date.getHours();
      case 'H':
        return formatNum(date.getHours());
      case 'f':
        return date.getMinutes();
      case 'F':
        return formatNum(date.getMinutes());
      case 's':
        return date.getSeconds();
      case 'S':
        return formatNum(date.getSeconds());
      default: // do nothing...
    }
  });
}

// 数字 格式化
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      );
    }
  }
  return num.toString();
}

export function toThousandslsFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

export function formatDel(value, pre = '') {
  // 返回处理后的值
  if (!value) return null;
  return `${pre}${Number(value * 0.01).toFixed(2)}`;
}
