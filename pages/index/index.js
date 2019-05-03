
var paySer = require('../../apis/pay.js')
const app = getApp()

Page({
  data: {
  },
  onShow: function () {
    // paySer.orderquery('TEST1122420413142536192497169').then(res => {
    //   console.info(res)
    // }).catch(err => {
    //   console.error(err)
    // })
  },
  pay: function(e) {
    paySer.unifiedorder('', '').then(res => {
      wx.requestPayment({
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: "prepay_id=" + res.prepayId,
        signType: 'MD5',
        paySign: res.paySign,
        success(res) {
          console.info(res)
        },
        fail(res) {
          console.error(res)
        }
      })
    }).catch (err => {
      console.error(err)
    });
  }
})
