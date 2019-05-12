
const memberSer = require('../../../apis/member.js')
Page({
  data: {
    member: {
      userNo: ''
    }
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '设置关联用户'
    });
  },

  inputUserNo(e) {
    const member = this.data.member;
    member.userNo = e.detail.value;
    this.setData({
      member: member
    });
  },

  toSubmitForm() {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    memberSer.updateUserOriginInfo(this.data.member).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '更新成功'
      });
      setTimeout(() => {
        wx.navigateBack({});
      }, 1000)
    }).catch(err => {
      wx.hideLoading();
      if (err && err.message) {
        wx.showToast({
          title: err.message,
          icon: 'none'
        });
      }
    });
  }
})