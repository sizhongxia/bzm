
const fivesSer = require('../../../apis/fives.js');
const bannerSer = require('../../../apis/banner.js');
const app = getApp();
var loadFivesOver = false;
var searchName = '';
Page({
  data: {
    banners: [],
    fives: [],
    currentPage: 1,
    firstLoad: true,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  onLoad: function (options) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: '5S店'
    })
    this.loadIndexData();
  },

  loadIndexData(cb) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    const _this = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        _this.loadData(longitude, latitude, cb)
      },
      fail() {
        _this.loadData('', '', cb)
      }
    });
  },

  loadData(longitude, latitude, cb) {
    const _this = this;
    // Banner轮播图
    bannerSer.bannerList('5S').then(banners => {
      _this.setData({
        banners: banners
      });
      // 默认加载第一页10个
      return fivesSer.fivesList({
        lng: longitude,
        lat: latitude,
        name: searchName,
        page: 1,
        size: 10
      });
    }).then(fives => {
      if (fives && fives.length > 0) {
        _this.setData({
          fives: fives,
          firstLoad: false,
          currentPage: 2
        });
      } else {
        _this.setData({
          fives: [],
          firstLoad: false,
          currentPage: 1
        });
        loadFivesOver = true;
      }
      wx.hideLoading();
      typeof cb === "function" && cb();
    }).catch(err => {
      wx.hideLoading();
      typeof cb === "function" && cb();
    })
  },

  searchFives(e) {
    searchName = e.detail.value;
    this.loadIndexData()
  },

  onReachBottom() {
    if (loadFivesOver) {
      return;
    }
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    const _this = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        _this.loadMoreFives();
      },
      fail() {
        _this.loadMoreFives();
      }
    });
  },

  loadMoreFives(longitude, latitude) {
    const _this = this;
    // 加载更多5S店
    fivesSer.fivesList({
      lng: longitude,
      lat: latitude,
      name: searchName,
      page: _this.data.currentPage,
      size: 10
    }).then(fives => {
      var _fives = _this.data.fives;
      if (fives && fives.length > 0) {
        _this.setData({
          fives: _fives.concat(fives),
          currentPage: _this.data.currentPage + 1
        });
      } else {
        loadFivesOver = true;
      }
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    })
  },

  makePhoneCall(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },

  openLocation(e) {
    wx.openLocation({
      latitude: e.currentTarget.dataset.lat,
      longitude: e.currentTarget.dataset.lng,
      name: e.currentTarget.dataset.name,
      address: e.currentTarget.dataset.address
    })
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.loadIndexData(function () {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    });
  }
})
