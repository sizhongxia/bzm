var util = require('../../../utils/util.js')
var bannerSer = require('../../../apis/banner.js')
var authSer = require('../../../apis/auth.js')
const app = getApp()

Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '课程'
    });

    bannerSer.bannerList('KC').then(res => {
      this.setData({
        imgUrls: res
      });
    }).catch(err => {})

    var uscene = '';
    if (!!options.scene) {
      try {
        wx.setStorageSync('uscene', uscene)
      } catch (e) { }
    }
    this.checkAuth(uscene);
  },

  checkAuth: function (uscene) {
    util.login().then(res => {
      return authSer.checkUser(res)
    }).then(res => {
      if (!res) {
        wx.showModal({
          title: '温馨提示',
          content: '请点击确定，进行微信授权',
          cancelColor: '#444444',
          confirmText: '授权',
          confirmColor: '#e95410',
          success: (res) => {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/wx/auth/auth?uid=' + uscene
              })
            } else {
              this.checkAuth(uscene)
            }
          }
        })
      }
    }).catch(err => {
      console.error(err)
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