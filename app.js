var util = require('./utils/util.js')
var authSer = require('./apis/auth.js')
App({
  onLaunch: function () {
    util.login().then(res => {
      return authSer.login(res, '', '')
    }).then(res => {
      wx.setStorageSync('token', res);
    }).catch(err => {
      console.error(err)
    })
  },
  globalData: {
  }
})