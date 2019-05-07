const util = require('../../../utils/util.js')
const authSer = require('../../../apis/auth.js')
const bannerSer = require('../../../apis/banner.js')
const courseSer = require('../../../apis/course.js')

const app = getApp()

Page({
  data: {
    banners: [],
    courses: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  onLoad: function (options) {
    // 扫码进入，获取参数
    var uscene = '';
    if (!!options.scene) {
      try {
        wx.setStorageSync('uscene', uscene)
      } catch (e) { }
    }
    // 设置标题
    wx.setNavigationBarTitle({
      title: '课程'
    });
    // Banner轮播图
    // wx.showLoading({
    //   title: '请稍后...',
    //   mask: true
    // });
    bannerSer.bannerList('KC').then(banners => {
      this.setData({
        banners: banners
      });
      return courseSer.courseList(1, 10)
    }).then(courses => {
      this.setData({
        courses: courses
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    })
  },

  // checkAuth: function () {
  //   util.login().then(res => {
  //     return authSer.checkUser(res)
  //   }).then(res => {
  //     if (!res) {
  //       wx.showModal({
  //         title: '温馨提示',
  //         content: '请点击确定，进行微信授权',
  //         cancelColor: '#444444',
  //         confirmText: '授权',
  //         confirmColor: '#e95410',
  //         success: (res) => {
  //           if (res.confirm) {
  //             wx.redirectTo({
  //               url: '/pages/wx/auth/auth'
  //             })
  //           } else {
  //             this.checkAuth()
  //           }
  //         }
  //       })
  //     }
  //   }).catch(err => {})
  // },

  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})