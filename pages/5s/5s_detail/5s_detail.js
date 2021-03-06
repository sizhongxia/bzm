const fivesSer = require('../../../apis/fives.js')
const app = getApp();
var fivesId = "";
Page({

  data: {
    fives: {},
    markers: []
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '5S店详情'
    });
    fivesId = options.fivesId;
    this.loadFivesDetail();
  },

  loadFivesDetail: function (cb) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    this.loadDetail(cb);
  },

  loadDetail(cb) {
    const _this = this;
    fivesSer.fivesDetail({
      resId: fivesId,
      lng: app.globalData.u_longitude,
      lat: app.globalData.u_latitude
    }).then(fives => {
      const marker = {
        iconPath: '/img/location.png',
        id: 0,
        latitude: fives.addrLat,
        longitude: fives.addrLng,
        width: 32,
        height: 32
      }
      _this.setData({
        fives: fives,
        markers: [marker]
      })
      wx.hideLoading();
      typeof cb === "function" && cb();
    }).catch(err => {
      wx.hideLoading();
      typeof cb === "function" && cb();
    });
  },

  makePhoneCall(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },

  openLocation(e) {
    wx.openLocation({
      latitude: Number(e.currentTarget.dataset.lat),
      longitude: Number(e.currentTarget.dataset.lng),
      name: e.currentTarget.dataset.name,
      address: e.currentTarget.dataset.address
    })
  },

  onPullDownRefresh() {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        app.globalData.u_latitude = res.latitude;
        app.globalData.u_longitude = res.longitude;
      }
    });
    wx.showNavigationBarLoading();
    this.loadFivesDetail(function () {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    });
  }
})