const memberSer = require('../../../apis/member.js');
const app = getApp();

var orderId = ''

Page({
  data: {
    coverPicUrl: '',
    headImgUrl: '',
    headPics: [],
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      current: 0
    }
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '课程详情'
    })
    if (!options.scene) {
      wx.switchTab({
        url: 'pages/course/course_index/course_index'
      });
      return;
    }
    orderId = options.scene
  },

  onReady: function () {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    memberSer.courseOrderShareInfo(orderId).then(res => {
      wx.setStorageSync('uscene', res.userId);
      this.setData({
        headImgUrl: res.headImgUrl,
        coverPicUrl: res.coverPicUrl,
        headPics: res.headPics
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  }
})