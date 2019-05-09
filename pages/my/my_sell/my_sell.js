
const memberSer = require('../../../apis/member.js');
const sysSer = require('../../../apis/sys.js');
const app = getApp();
Page({
  data: {
    level1Num: '',
    level2Num: '',
    members: [],
    currentPage: 1,
    isEnd: false,
    ruleUrl: ''
  },

  onLoad: function (options) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: '分销中心'
    })
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    sysSer.awardRule().then(res => {
      this.setData({
        ruleUrl: res.ruleUrl
      });
      wx.hideLoading();
      this.loadMemberExpands();
    }).catch(err => {
      wx.hideLoading();
    });
  },

  loadMemberExpands(cb) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    memberSer.myExpandMembers(1, 20).then(res => {
      const members = res.list;
      const isEnd = res.isEnd;
      const level1Num = res.level1Num;
      const level2Num = res.level2Num;
      this.setData({
        level1Num: level1Num,
        level2Num: level2Num,
        members: members,
        currentPage: 2,
        isEnd: isEnd
      });
      wx.hideLoading();
      typeof cb === "function" && cb();
    }).catch(err => {
      wx.hideLoading();
      typeof cb === "function" && cb();
    })
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.loadMemberExpands(function () {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    });
  }

})
