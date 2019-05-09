const memberSer = require('../../../apis/member.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    member: {},
    headPics: [],
    courseQrUrl: '',
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      current: 0
    }

  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '课程分享'
    })
  },

  onReady: function() {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    memberSer.userInfo().then(member => {
      this.setData({
        member: member
      });
      return memberSer.userShareInfo();
    }).then(res => {
      if (res.orders && res.orders.length > 0) {
        this.setData({
          orders: res.orders
        });
        memberSer.courseShareInfo(res.orders[0].courseId).then(res => {
          this.setData({
            headPics: res.headPics,
            courseQrUrl: res.courseQrUrl
          });
        })
      }
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  },

  prevImg: function() {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current > 0 ? current - 1 : swiper.imgUrls.length - 1;
    this.setData({
      swiper: swiper,
    })
  },

  nextImg: function() {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current < (swiper.imgUrls.length - 1) ? current + 1 : 0;
    this.setData({
      swiper: swiper,
    })
  },

})