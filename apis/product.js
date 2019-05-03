
var util = require('../utils/util.js')

module.exports = {
  productList: (page, size) => {
    return util.post('/wxmp/api/product/list', {
      page: page,
      size: size
    });
  },
  placeOrder: (productId, productNum, ecipientName, recipientPhoneNo, recipientAddrDetail) => {
    return util.post('/wxmp/api/product/placeOrder', {
      productId: productId,
      productNum: productNum,
      ecipientName: ecipientName,
      recipientPhoneNo: recipientPhoneNo,
      recipientAddrDetail: recipientAddrDetail
    });
  }
}