const util = require('../../../utils/util.js');
const authSer = require('../../../apis/auth.js');
const bannerSer = require('../../../apis/banner.js');
const courseSer = require('../../../apis/course.js');

const app = getApp();

var loadCoursesOver = false;
Page({
  data: {
    banners: [],
    courses: [],
    currentPage: 1,
    indicatorDots: true,
    autoplay: true,
    interval: 6000,
    duration: 1000,
    isFirst: false
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    // 扫码进入，获取参数
    var uscene = '';
    if (!!options.scene) {
      try {
        wx.setStorageSync('uscene', uscene)
      } catch (e) {
        wx.hideLoading();
        wx.redirectTo({
          url: '/pages/wx/auth/auth'
        });
        return;
      }
    }
    // 设置标题
    wx.setNavigationBarTitle({
      title: '课程'
    });
    wx.showTabBar({});
    util.login().then(code => {
      return authSer.login({
        code: code
      })
    }).then(token => {
      wx.setStorageSync('token', token);
      wx.hideLoading();
      this.loadIndexData();
    }).catch(err => {
      // wx.redirectTo({
      //   url: '/pages/wx/auth/auth',
      //   success() {
      //     wx.hideLoading();
      //   }
      // });
      this.setData({
        isFirst: true
      });
      wx.hideTabBar({});
      wx.hideLoading();
    })

    // Banner轮播图
    bannerSer.bannerList('KC').then(banners => {
      this.setData({
        banners: banners
      });
    })
  },

  loadIndexData(cb) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    // Banner轮播图
    bannerSer.bannerList('KC').then(banners => {
      this.setData({
        banners: banners
      });
      // 默认加载第一页10个
      return courseSer.courseList(1, 10);
    }).then(courses => {
      if (courses && courses.length > 0) {
        this.setData({
          courses: courses,
          currentPage: 2
        });
      } else {
        loadCoursesOver = true;
      }
      wx.hideLoading();
      typeof cb === "function" && cb();
    }).catch(err => {
      wx.hideLoading();
      typeof cb === "function" && cb();
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

  toBannerDetail(e) {
    wx.navigateTo({
      url: '/pages/wx/webview/webview?url=' + e.currentTarget.dataset.url,
      complete() {
        bannerSer.visitBanner(e.currentTarget.dataset.id).then(res => {
        }).catch(err => {
        });
      }
    })
  },

  onReachBottom() {
    if (loadCoursesOver) {
      return;
    }
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    courseSer.courseList(this.data.currentPage, 10).then(courses => {
      var _courses = this.data.courses;
      if (courses && courses.length > 0) {
        this.setData({
          courses: _courses.concat(courses),
          currentPage: this.data.currentPage + 1
        });
      } else {
        loadCoursesOver = true;
      }
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    })
  },

  onPullDownRefresh() {
    if (this.data.isFirst) {
      wx.stopPullDownRefresh();
      return;
    }
    wx.showNavigationBarLoading();
    this.loadIndexData(function () {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    });
  }
})