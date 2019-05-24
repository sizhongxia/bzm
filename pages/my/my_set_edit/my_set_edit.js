
const memberSer = require('../../../apis/member.js')
Page({
  data: {
    member: {
      realName: '',
      phoneNo: '',
      provinceName: '',
      cityName: '',
      phoneNo: ''
    },
    region: []
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
        member.provinceName = res.provinceName;
        member.cityName = res.cityName;
        member.countyName = res.countyName;
        var region = this.data.region;
        if (member.provinceName && member.cityName && member.countyName) {
          region = [member.provinceName, member.cityName, member.countyName]
        }
        this.setData({
          member: member,
          region: region
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

  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },

  toSubmitForm() {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var member = this.data.member;
    member.provinceName = this.data.region[0]
    member.cityName = this.data.region[1]
    member.countyName = this.data.region[2]
    if (!member.countyName) {
      wx.showToast({
        title: '请选择一个区域',
        icon: 'none'
      });
      return;
    }
    memberSer.updateAuthenticationInfo(member).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '更新成功'
      });
      setTimeout(() => {
        wx.navigateBack({});
      }, 1000)
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