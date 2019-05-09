
const memberSer = require('../../../apis/member.js');
const sysSer = require('../../../apis/sys.js');
const app = getApp();
Page({
  data: {
    member: {},
    servicePhoneNo: '',
    aboutusUrl: '',
    isMember: false
  },

  onLoad: function (options) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: '我的'
    })
    this.loadMemberInfo();
  },

  loadMemberInfo(cb) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    sysSer.systemInfo().then(sysInfo => {
      this.setData({
        servicePhoneNo: sysInfo.servicePhone,
        aboutusUrl: sysInfo.aboutUsContent
      });
      return memberSer.userInfo();
    }).then(member => {
      this.setData({
        member: member
      });
      wx.hideLoading();
      typeof cb === "function" && cb();
    }).catch(err => {
      wx.hideLoading();
      typeof cb === "function" && cb();
    })
  },

  makePhoneCall(e) {
    const servicePhoneNo = this.data.servicePhoneNo;
    if (!!servicePhoneNo) {
      wx.makePhoneCall({
        phoneNumber: servicePhoneNo
      });
    }
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.loadMemberInfo(function () {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    });
  }

})
