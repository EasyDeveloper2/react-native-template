
/**
 * Created by xujie on 2018/2/16.
 */


export default  {
    testPhone(value) {
      return /^1\d{10}$/.test(value)
    },
    testUsername(value) {
      return /^[a-zA-Z0-9_-]{4,16}$/.test(value)
    },
  
    testPassword(value) {
      return /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,15}/.test(value)
    },
  
    testEmail(value) {
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)
    },
    testMoney(value){
      return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)
    },
    testEmptyByToast(value, msg) {
      if (value == '') {
        wx.showToast({
          title: msg,
        })
        return false
      }
      return true
    },
    // 公司税号
    testTaxAvailable (num){
      return /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(num)
    },
    // 运单号
    testExpress(num){
      return /^[0-9a-zA-Z]{5,30}$/.test(num)
    },
    // 身份证号
    testIDCard(num){
      return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(num) || /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/.test(num)
    },
    // 测试真实姓名
    testRealName(name){
      return /^[\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$/.test(name)
    }
  }