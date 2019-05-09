
const memberSer = require('../../../apis/member.js')
Page({
  data: {
    member: {
      realName: '',
      phoneNo: ''
    }
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '完善资料'
    });
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    memberSer.getAuthenticationInfo().then(res => {
      wx.hideLoading();
      if (res.isMember) {
        const member = this.data.member;
        member.realName = res.userName;
        member.phoneNo = res.phoneNo;
        this.setData({
          member: member
        });
      }
    }).catch(err => {
      wx.hideLoading();
    });
  },

  inputRealName(e) {
    const member = this.data.member;
    member.realName = e.detail.value;
    this.setData({
      member: member
    });
  },

  inputPhoneNo(e) {
    const member = this.data.member;
    member.phoneNo = e.detail.value;
    this.setData({
      member: member
    });
  },

  toSubmitForm() {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    memberSer.updateAuthenticationInfo(this.data.member).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '更新成功'
      });
    }).catch(err => {
      wx.hideLoading();
      if(err && err.message) {
        wx.showToast({
          title: err.message,
          icon: 'none'
        });
      }
    });
  }
})