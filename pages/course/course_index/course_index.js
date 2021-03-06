const util = require('../../../utils/util.js');
const authSer = require('../../../apis/auth.js');
const memberSer = require('../../../apis/member.js');
const bannerSer = require('../../../apis/banner.js');
const courseSer = require('../../../apis/course.js');

const app = getApp();

var loadCoursesOver = false;
Page({
  data: {
    banners: [],
    courses: [],
    member: {},
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
    if (!!options.uscene) {
      try {
        wx.setStorageSync('uscene', options.uscene);
      } catch (e) {
        wx.hideLoading();
        wx.redirectTo({
          url: '/pages/wx/auth/auth'
        });
        return;
      }
    } else {
      options.uscene = '';
    }
    // 设置标题
    wx.setNavigationBarTitle({
      title: '课程'
    });
    wx.showTabBar({});
    util.login().then(code => {
      return authSer.login({
        code: code,
        uscene: options.uscene
      })
    }).then(token => {
      wx.setStorageSync('token', token);
      return memberSer.userInfo();
    }).then(member => {
      this.setData({
        member: member
      });
      wx.hideLoading();
      this.loadIndexData();
    }).catch(err => {
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
      return memberSer.getAuthenticationInfo()
    }).then(res => {
      if (res.isMember) {
        if (!res.provinceName || !res.cityName || !res.countyName) {
          wx.showModal({
            title: '提示',
            content: '请完善您的个人所在区域信息',
            showCancel: false,
            confirmColor: '#e95410',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/my/my_set_edit/my_set_edit'
                })
              }
            }
          })
        }
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
  },

  onShareAppMessage() {
    return {
      title: '我正在白赚猫学习实战课程，挺不错的！',
      path: '/pages/course/course_index/course_index?uscene=' + this.data.member.userId,
      success: function (res) { }
    }
  }
})