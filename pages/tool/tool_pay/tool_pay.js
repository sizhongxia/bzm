
const productSer = require('../../../apis/product.js');
const app = getApp();
Page({
  data: {
    product: {}
  },

  onLoad: function (options) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: '教具-在线支付'
    })
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    productSer.productDetail(options.productId).then(product => {
      this.setData({
        product: product
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    })
  }

})
