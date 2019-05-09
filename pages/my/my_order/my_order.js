
const orderSer = require('../../../apis/order.js');
const app = getApp();
Page({
  data: {
    index: 1,
    currentPage: 1,
    isEnd: false,
    orders: []
  },

  onLoad: function (options) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: '我的订单'
    });
    this.loadOrders();
  },

  siwchTab: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      index: index,
      orders: []
    });
    this.loadOrders();
  },

  loadOrders(cb) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    if (this.data.index == 1) {
      orderSer.productsList('', 1, 10).then(orderRes => {
        const orders = orderRes.orders;
        const isEnd = orderRes.isEnd;
        this.setData({
          orders: orders,
          isEnd: isEnd,
          currentPage: 2
        });
        wx.hideLoading();
        typeof cb === "function" && cb();
      }).catch(err => {
        wx.hideLoading();
        typeof cb === "function" && cb();
      });
    } else {
      orderSer.coursesList('', 1, 10).then(orderRes => {
        const orders = orderRes.orders;
        const isEnd = orderRes.isEnd;
        this.setData({
          orders: orders,
          isEnd: isEnd,
          currentPage: 2
        });
        wx.hideLoading();
        typeof cb === "function" && cb();
      }).catch(err => {
        wx.hideLoading();
        typeof cb === "function" && cb();
      });
    }
  },

  onReachBottom() {
    if (this.data.isEnd) {
      return;
    }
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    if (this.data.index == 1) {
      orderSer.productsList('', this.data.currentPage, 10).then(orderRes => {
        const orders = orderRes.orders;
        if (orders.length > 0) {
          const isEnd = orderRes.isEnd;
          const _orders = this.data.orders;
          this.setData({
            orders: _orders.concat(orders),
            isEnd: isEnd,
            currentPage: this.data.currentPage + 1
          });
        } else {
          this.setData({
            isEnd: isEnd
          });
        }
        wx.hideLoading();
      }).catch(err => {
        wx.hideLoading();
      });
    } else {
      orderSer.coursesList('', this.data.currentPage, 10).then(orderRes => {
        const orders = orderRes.orders;
        if (orders.length > 0) {
          const isEnd = orderRes.isEnd;
          const _orders = this.data.orders;
          this.setData({
            orders: _orders.concat(orders),
            isEnd: isEnd,
            currentPage: this.data.currentPage + 1
          });
        } else {
          this.setData({
            isEnd: isEnd
          });
        }
        wx.hideLoading();
      }).catch(err => {
        wx.hideLoading();
      });
    }
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.loadOrders(function () {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    });
  }

})
