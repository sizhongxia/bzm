App({
  onLaunch: function () {
    const _this = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        _this.globalData.u_longitude = res.longitude
        _this.globalData.u_latitude = res.latitude
      }
    });
  },
  globalData: {
    u_longitude: '',
    u_latitude: ''
  }
})