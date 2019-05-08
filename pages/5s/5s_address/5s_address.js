
const fivesSer = require('../../../apis/fives.js');
const areaSer = require('../../../apis/area.js');
const app = getApp();
Page({
  data: {
    provinces: [],
    provinceIndex: 0,
    cities: [],
    cityIndex: 0,
    counties: [],
    countyIndex: 0,
    fives: [],
    firstLoad: true
  },

  onLoad: function (options) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: '5S店'
    });
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    areaSer.areas('86').then(provinces => {
      this.setData({
        provinces: provinces
      })
      return areaSer.areas(provinces[0].code)
    }).then(cities => {
      this.setData({
        cities: cities
      })
      return areaSer.areas(cities[0].code)
    }).then(counties => {
      this.setData({
        counties: counties
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  },

  searchFives() {
    this.loadIndexData(this.data.provinces[this.data.provinceIndex].code,
      this.data.cities[this.data.cityIndex].code,
      this.data.counties[this.data.countyIndex].code
    );
  },

  loadIndexData(provinceCode, cityCode, countyCode) {
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
        _this.loadData(longitude, latitude, provinceCode, cityCode, countyCode)
      },
      fail() {
        _this.loadData('', '', provinceCode, cityCode, countyCode)
      }
    });
  },

  loadData(longitude, latitude, provinceCode, cityCode, countyCode) {
    const _this = this;
    fivesSer.fivesList({
      lng: longitude,
      lat: latitude,
      provinceCode: provinceCode,
      cityCode: cityCode,
      countyCode: countyCode,
      page: 1,
      size: 999999
    }).then(fives => {
      if (fives && fives.length > 0) {
        _this.setData({
          fives: fives,
          firstLoad: false
        });
      } else {
        _this.setData({
          fives: [],
          firstLoad: false
        });
      }
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    })
  },

  bindProvinceChange(e) {
    var index = parseInt(e.detail.value);
    this.setData({
      provinceIndex: index,
      cities: [],
      cityIndex: 0,
      counties: [],
      countyIndex: 0
    });
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    areaSer.areas(this.data.provinces[index].code).then(cities => {
      this.setData({
        cities: cities
      })
      return areaSer.areas(this.data.cities[0].code);
    }).then(counties => {
      this.setData({
        counties: counties
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  },


  bindCityChange(e) {
    var index = parseInt(e.detail.value);
    this.setData({
      cityIndex: index,
      counties: [],
      countyIndex: 0
    });
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    areaSer.areas(this.data.cities[index].code).then(counties => {
      this.setData({
        counties: counties
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  },

  bindCountyChange(e) {
    var index = parseInt(e.detail.value);
    this.setData({
      countyIndex: index
    });
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
  }
})
