const sysSer = require('../../../apis/sys.js');
const app = getApp();
Page({
  data: {
    aboutus: ''
  },

  onLoad: function (options) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: '关于我们'
    })
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    sysSer.systemInfo().then(sysInfo => {
      this.setData({
        aboutus: sysInfo.aboutUsContent
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    })
  }
})
