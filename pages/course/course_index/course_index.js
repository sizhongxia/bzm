var bannerSer = require('../../../apis/banner.js')
const app = getApp()

Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '课程'
    })
    bannerSer.bannerList('KC').then(res => {
      this.setData({
        imgUrls: res
      })
    }).catch(err => {

    })
  },

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