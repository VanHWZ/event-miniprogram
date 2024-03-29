const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${[year, month, day].map(formatNumber).join('-')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const getDaysBetween = (formerDate, latterDate) => {
  // 计算第几天，后减前
  var msecondOfOneDay = 1000 * 60 * 60 * 24;
  var nTime = latterDate - formerDate;
  var days = Math.floor(nTime / msecondOfOneDay);
  // console.log(days);
  return days;
}

const getDays = (time, type) => {
  //计算所有type的days
  var days, prefix, date_type_prefix;
  var today = new Date();
  if (type == 0) {
    prefix = "已经";
    date_type_prefix = "起始日";
    days = getDaysBetween(time, today);
  } else if (type == 1) {
    prefix = "还有";
    date_type_prefix = "目标日";
    var currentYear = today.getFullYear();
    if (today.getMonth() > time.getMonth() || 
        (today.getMonth() == time && today.getDate() > time.getDate()))
      time.setFullYear(currentYear + 1);
    else
      time.setFullYear(currentYear);
    days = getDaysBetween(today, time) + 1;
  } else if (type == 2) {
    prefix = "还有";
    date_type_prefix = "目标日";
    days = getDaysBetween(today, time) + 1;
  }
  return {
    time: time, 
    days: days, 
    prefix: prefix, 
    date_type_prefix: date_type_prefix
  };
}

module.exports = {
  formatTime,
  formatDate,
  getDaysBetween,
  getDays
}
