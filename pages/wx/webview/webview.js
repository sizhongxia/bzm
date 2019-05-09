
Page({
  data: {
    url: ''
  },
  onLoad: function (options) {
    this.setData({
      url: options.url
    });
  },
  onWebLoad: function (e) {
    console.info(e.detail)
  }
})