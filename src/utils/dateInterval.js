/**
 * 获取近一周的时间
 */
export const getLastWeek = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;//0-11表示1-12月
  let day = now.getDate();
  let dateObj = {};
  dateObj.now = year + '-' + ( month < 10 ? '0'+ month : month) + '-' + (day < 10 ? '0' + day : day);
  if(day - 7 <= 0){   //如果在当月7日之前
      let lastMonthDay = new Date(year, (parseInt(month) - 1), 0).getDate();    //1周前所在月的总天数
      if(month - 1 <= 0){ //如果在当年的1月份
          dateObj.last = (year - 1) + '-' + 12 + '-' + (31 - (7 - day));
      }else{
          dateObj.last = year + '-' + (month - 1) + '-' + (lastMonthDay - (7 - day));
      }
  }else{
      dateObj.last = year + '-' + (month < 10 ? '0'+ month : month)  + '-' + ((day -6) < 10 ? '0' + (day -6) : (day -6));
  }
  return dateObj;
}

/**
 * 获取近几个月的时间
 * @param date 当前时间
 * @param month 月数
 */
export const getPreMonthDay = (date, monthNum) => {
  let dateArr = date.split('-')
  let year = dateArr[0] //获取当前日期的年份
  let month = dateArr[1] //获取当前日期的月份
  let day = dateArr[2] //获取当前日期的日
  let days = new Date(year, month, 0)
  days = days.getDate() //获取当前日期中月的天数
  let year2 = year
  let month2 = parseInt(month) - monthNum
  if (month2 <= 0) {
    year2 =
      parseInt(year2) -
      parseInt(month2 / 12 == 0 ? 1 : Math.abs(parseInt(month2 / 12)) + 1)
    month2 = 12 - (Math.abs(month2) % 12)
  }
  let day2 = day
  let days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  let t2 = year2 + '-' + month2 + '-' + day2;
  let dateObj = {
    now: date,
    last: t2
  }
  return dateObj
}
