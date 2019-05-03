
var util = require('../utils/util.js')
 
module.exports = {
  unifiedorder: (orderId, orderType) => {
    return util.post('/open/api/wxpay/v20190424/unifiedorder', {
      orderId: orderId,
      orderType: orderType
    });
  },
  orderquery: (orderNo) => {
    return util.post('/open/api/wxpay/v20190424/orderquery', {
      orderNo: orderNo
    });
  }
}