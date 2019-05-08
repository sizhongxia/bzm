
const productSer = require('../../../apis/product.js');
const app = getApp();
var loadProductOver = false;
Page({
  data: {
    products: [],
    currentPage: 1
  },

  onLoad: function (options) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: '教具'
    })
    this.loadIndexData();
  },

  loadIndexData(cb) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    productSer.productList({
      page: 1,
      size: 10
    }).then(products => {
      if (products && products.length > 0) {
        this.setData({
          products: products,
          currentPage: 2
        });
      } else {
        loadProductOver = true;
      }
      wx.hideLoading();
      typeof cb === "function" && cb();
    }).catch(err => {
      wx.hideLoading();
      typeof cb === "function" && cb();
    })
  },

  onReachBottom() {
    if (loadProductOver) {
      return;
    }
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    productSer.productList({
      page: _this.data.currentPage,
      size: 10
    }).then(products => {
      var _products = _this.data.products;
      if (products && products.length > 0) {
        _this.setData({
          products: _products.concat(products),
          currentPage: _this.data.currentPage + 1
        });
      } else {
        loadProductOver = true;
      }
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
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
