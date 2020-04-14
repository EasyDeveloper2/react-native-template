/**
 * 格式化时间
 * @param Date date是日期对象
 * @return 'yyyy-MM-dd hh:mm:ss' 
 */ 
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  
  const formatDate = (year, month, day) => {
    return [year, month, day].map(formatNumber).join("-")
  }
  /**
   * 生成n位字符串数字
   * @param Int n表示字符串位数
   * @return  
   */
  const random = (n) => {
    let str = "0123456789"
    let result = ''
    for (let i = 0; i < n; i++) {
      let s = parseInt(Math.random() * 100) / 10
      result += str.substr(s, 1)
    }
    return result
  }
  /**
   * 防止重复点击事件
   * @param  Function func 要执行的函数
   * @param  Component that  组件对象
   */
  const shake= (func,that) =>{
    console.log(func)
    if(!that.shakeTime){
      func()
      that.shakeTime = setTimeout(()=>{
        clearTimeout(that.shakeTime)
        that.shakeTime = null
      },1000)
    }
  }
  
   /**
   * 进行连接中的参数数据
   * @param  String path 要执行的函数
   * @param  Component that  组件对象
   * @return
   */
  const parseQuerys= (path)=>{
    if(typeof(path)=='string'){
    }
    let components = path.split("?")
    let queryString = ''
    if (components.length == 2) {
      queryString = components[1]
    }
    let list = queryString.split("&")
    let querys = {}
    for (let i in list) {
      let result = list[i].split("=")
      if (result.length == 2) {
        let key = result[0]
        let value = result[1]
        querys[key] = value
      }
    }
    return querys
  }

  /** 
   * 获取App页面对应的sceneKey的值
   * @param String  path App页面格式化
   * @example goodsDetail?prodCode=1345
   * @return goodsDetail
   */
  const getSceneKeyByPath = (path)=>{
      let components =path.split("?")
      console.log(path,path.split,components)
      return components.length ? components[0]:''
  }


  //倒计时；
  const countdownTime1 = function (timeStamp, that) {
    let interval = null, totalSecond = timeStamp - Date.parse(new Date()) / 1000;
    interval = setInterval(function () {
      // 秒数  
      let second = totalSecond;
  
      // 小时位  
      let hr = Math.floor(second / 3600);
      let hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
  
      // 分钟位  
      let min = Math.floor((second - hr * 3600) / 60);
      let minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
  
      // 秒位  
      let sec = second - hr * 3600 - min * 60;
      let secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      that.setData({
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond <= 0) {
        clearInterval(interval);
        wx.showToast({
          title: '活动已结束',
          icon: 'none',
          duration: 1000,
          mask: true,
        })
        that.setData({
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(that), 1000);
    that.setData({ interval: interval });
  }
  
  //倒计时2；
  const countdownTime2 = function (timeStamp, that) {
    let totalSecond = timeStamp - Date.parse(new Date()) / 1000;
    let interval = setInterval(function () {
      // 秒数  
      let second = totalSecond;
      // // 天数位  
      let day = Math.floor(second / 3600 / 24);
      let dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;
      // 小时位  
      let hr = Math.floor((second - day * 3600 * 24) / (60 * 60));
      let hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
  
      // 分钟位  
      // let min = Math.floor((second - hr * 3600) / 60);
      let min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      let minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
  
      // 秒位  
      // let sec = second - hrNew * 3600 - min * 60;
      let sec = Math.floor(second - day * 3600 * 24 - hr * 3600 - min * 60);
      let secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
  
      that.setState({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond <= 0) {
        clearInterval(interval);
 
        that.setState({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(that), 1000);
    that.setState({ interval: interval });
  }

  /**
   * 将价格格式化为两位有效数字
   * @param  String|Int price 价格
   * @return String
   */
  const priceToFormat = (price)=>{
     return parseFloat(price).toFixed(2)
  }

  /**
   * 计算折扣
   * @param  String|Int price 价格
   * @return String
   */
  const calcDiscount=(currentPrice,retailPrice)=>{
    let num = parseInt(currentPrice / retailPrice*10)
    let floatNum = Math.round(currentPrice / retailPrice*100)*0.1
    let discountTag = 0
    if(num==floatNum){
      discountTag = num
    }else{
      discountTag = (floatNum).toFixed(1)
    }
    return discountTag + '折'
}

  
  
  
  
  export {
    /**格式化日期*/
    formatTime,
    /**生成随机数字*/
    formatDate,
    /**生成随机数字*/
    random,
    /**防止重复点击*/
    shake, 
    /**解析路径中的参数*/
    parseQuerys,
    /**从路径中解析页面对应的sceneKey值*/
    getSceneKeyByPath,
    /**将价格标准化*/
    priceToFormat,
    /**计算折扣*/
    calcDiscount
  }

  export default {
        /**格式化日期*/
        formatTime,
        /**生成随机数字*/
        formatDate,
        /**生成随机数字*/
        random,
        /**防止重复点击*/
        shake, 
        /**解析路径中的参数*/
        parseQuerys,
        /**从路径中解析页面对应的sceneKey值*/
        getSceneKeyByPath,
        /**将价格标准化*/
        priceToFormat,
        /**计算折扣*/
        calcDiscount
  }
  