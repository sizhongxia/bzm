
const productSer = require('../../../apis/product.js');
const paySer = require('../../../apis/pay.js');
const app = getApp();
Page({
  data: {
    product: {},
    orderModle: {
      productId: '',
      productNum: 1,
      recipientName: '',
      recipientPhoneNo: '',
      recipientAddrDetail: '',
    },
    paying: false
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
      const orderModle = this.data.orderModle;
      orderModle.productId = options.productId;
      this.setData({
        product: product,
        orderModle: orderModle
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    })
  },

  inputRecipientName(e) {
    const orderModle = this.data.orderModle;
    orderModle.recipientName = e.detail.value;
    this.setData({
      orderModle: orderModle
    });
  },

  inputRecipientPhoneNo(e) {
    const orderModle = this.data.orderModle;
    orderModle.recipientPhoneNo = e.detail.value;
    this.setData({
      orderModle: orderModle
    });
  },

  inputRecipientAddrDetail(e) {
    const orderModle = this.data.orderModle;
    orderModle.recipientAddrDetail = e.detail.value;
    this.setData({
      orderModle: orderModle
    });
  },

  toBuy() {
    if (!this.data.orderModle.recipientName) {
      wx.showToast({
        title: '收件人名称不允许为空！',
        icon: 'none'
      });
      return;
    }
    if (!this.data.orderModle.recipientPhoneNo) {
      wx.showToast({
        title: '收件人联系方式不允许为空！',
        icon: 'none'
      });
      return;
    }
    if (!/^[1][0-9]{10}$/.test(this.data.orderModle.recipientPhoneNo)) {
      wx.showToast({
        title: '请输入正确的联系方式！',
        icon: 'none'
      });
      return;
    }
    if (!this.data.orderModle.recipientAddrDetail) {
      wx.showToast({
        title: '收件人收件地址不允许为空！',
        icon: 'none'
      });
      return;
    }
    const _this = this;
    wx.showModal({
      title: '温馨提示',
      content: '是否要创建订单并支付？',
      confirmText: '确定',
      confirmColor: '#e95410',
      success(res) {
        if (res.confirm) {
          _this.setData({
            paying: true
          });
          wx.showLoading({
            title: '正在创建订单',
            mask: true
          });
          productSer.placeOrder(_this.data.orderModle).then(res => {
            wx.showLoading({
              title: '等待支付',
              mask: true
            });
            return paySer.unifiedorder(res.orderId, res.orderType);
          }).then(res => {
            const orderNo = res.orderNo;
            wx.requestPayment({
              timeStamp: res.timeStamp,
              nonceStr: res.nonceStr,
              package: 'prepay_id=' + res.prepayId,
              signType: 'MD5',
              paySign: res.paySign,
              success(res) {
                wx.showLoading({
                  title: '支付完成',
                  mask: true
                });
                setTimeout(() => {
                  paySer.orderquery(orderNo).then(res => {
                    if (res) {
                      wx.navigateBack({
                        complete: () => {
                          wx.hideLoading();
                        }
                      });
                    } else {
                      wx.showLoading({
                        title: '正在查询支付状态',
                        mask: true
                      });
                      setTimeout(() => {
                        wx.navigateBack({
                          complete: () => {
                            wx.hideLoading();
                          }
                        });
                      }, 1000)
                    }
                  }).catch(err => {
                    wx.navigateBack({
                      complete: () => {
                        wx.hideLoading();
                      }
                    });
                  })
                }, 1000)
              },
              fail(res) {
                wx.hideLoading();
                wx.showModal({
                  title: '支付提示',
                  content: '支付失败，请重新下单',
                  showCancel: false,
                  confirmText: '确定',
                  confirmColor: '#e95410',
                  complete() {
                    wx.navigateBack();
                  }
                });
              }
            })
          }).catch(err => {
            wx.hideLoading();
          });
        }
      }
    })
  }

})
