
const productSer = require('../../../apis/product.js');
const app = getApp();
Page({
  data: {
    product: {},
    productId: ''
  },

  onLoad: function (options) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: '教具介绍'
    })
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    productSer.productDetail(options.productId).then(product => {
      this.setData({
        product: product,
        productId: options.productId
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    })
  }

})
