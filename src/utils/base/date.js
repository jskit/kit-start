/**
 * 时间工具类
 * @param {*}
 */

/**
 * 补充十位
 *
 * @export
 * @param {number} n
 * @returns string
 */
export function formatNum(n) {
  return n * 1 < 10 ? `0${n}` : n;
}
/**
 * 剩余时间格式化
 *
 * @export
 * @param {number} times //传入毫秒
 * @param {string} [format='H:F:S'] // 大写自动补全十位
 * @returns string
 */
export function formatCountDown(times, format = 'H:F:S') {
  if (!times) return '';
  let time = parseInt(times * 0.001, 10);
  const seconds = time % 60;
  time = parseInt(time / 60, 10);
  const minutes = time % 60;
  time = parseInt(time / 60, 10);
  const hours = parseInt(time % 24, 10);
  const days = parseInt(time / 24, 10);

  return format.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, function(a) {
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
    }
  });
}

/**
 * 剩余时间格式化（此方法和formatCountDown 重复,应该废弃）
 *
 * @export
 * @param {number} times // 传入毫秒
 * @param {boolean} flag // 补全十位
 * @returns Object
 */
export function formatCountDownObj(times, flag) {
  if (times) return {};
  let time = parseInt(times * 0.001, 10);
  let seconds = time % 60;
  time = parseInt(time / 60, 10);
  let minutes = time % 60;
  time = parseInt(time / 60, 10);
  let hours = parseInt(time % 24, 10);
  let days = parseInt(time / 24, 10);
  if (flag) {
    days = formatNum(days);
    hours = formatNum(hours);
    minutes = formatNum(minutes);
    seconds = formatNum(seconds);
  }
  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

/**
 * 计算剩余时间（此方法和formatCountDown 重复,应该废弃）
 *
 * @export
 * @param {number} currTime // 毫秒
 * @param {number} endTime // 毫秒
 * @returns Object
 */
export function computeTime(currTime, endTime) {
  if (!currTime || !currTime) return {};
  let surplus = endTime - currTime;
  if (surplus < 0) {
    console.warn('结束时间不能小与当前时间');
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      millisecond: 0,
    };
  }
  // 计算出相差天数
  let days = Math.floor(surplus / (24 * 3600 * 1000));

  // 计算出小时数
  let leave1 = surplus % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000));
  // 计算相差分钟数
  let leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000));
  // 计算相差秒数
  let leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);
  // 计算相差毫秒
  let leave4 = leave3 % 1000; // 计算分钟数后剩余的毫秒数
  // let seconds=Math.round(leave3/1000)
  // console.log(Math.floor(leave4/100))
  let millisecond = Math.floor(leave4 / 100);
  // console.log(hours,minutes,seconds)
  return {
    days: formatNum(days),
    hours: formatNum(hours),
    minutes: formatNum(minutes),
    seconds: formatNum(seconds),
    millisecond: millisecond,
  };
}

/**
 * 格式化时间戳
 * 第一参数可传时间对象或时间戳，第二参数返回格式
 * @export
 * @param {*} date
 * @param {string} [format='Y年M月D日']
 * @returns
 */
export function formatDate(date, format = 'Y年M月D日') {
  if (date === '' || date == null) return '';
  if (!date) return '';
  switch (typeof date) {
    case 'string':
      date = new Date(date.replace(/-/g, '/'));
      break;
    case 'number': {
      let str = date + '';
      if (str.length === 10) {
        date = date * 1000;
      }
      date = new Date(date);
      break;
    }
    default:
    // do nothing...
  }
  if (!(date instanceof Date)) return;

  return format.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, function(a) {
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
    }
  });
}

/**
 * 获取当前时间戳
 * 时间转10位时间戳
 * @export
 * @param {*} date
 * @returns
 */
export function timeStamp(date) {
  if (date) {
    if (typeof date === 'object') {
      return Date.parse(date) / 1000;
    } else {
      return Date.parse(new Date(date)) / 1000;
    }
  } else {
    return Date.parse(new Date()) / 1000;
  }
}

/**
 * 获取周
 *
 * @export
 * @param {*} value
 * @param {number} [type=1]
 * @returns
 */
export function getWeek(value, type = 1) {
  if (value) return '';
  const tempDate = new Date(value);
  let tempArray = ['日', '一', '二', '三', '四', '五', '六'];
  if (type === 1) {
    tempArray = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  }
  return tempArray[tempDate.getDay()];
}

// 当天0点时间
export function getTimesmorning(date) {
  if (!date) return '';
  return new Date(date).setHours(0, 0, 0, 0);
}

// 当天24点时间
export function getTimesnight(date) {
  if (!date) return '';
  return new Date(date).setHours(24, 0, 0, 0);
}

// 近7天时间
// export function getWeekFromNow(date) {

// }
