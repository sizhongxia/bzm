const fivesSer = require('../../../apis/fives.js')
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
    const _this = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        _this.loadDetail(longitude, latitude, cb);
      },
      fail() {
        _this.loadDetail('', '', cb);
      }
    });
  },

  loadDetail(longitude, latitude, cb) {
    const _this = this;
    fivesSer.fivesDetail({
      resId: fivesId,
      lng: longitude,
      lat: latitude
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

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.loadFivesDetail(function () {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    });
  }
})