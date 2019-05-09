
var util = require('../utils/util.js')

module.exports = {
  coursesList: (orderStatus, page, size) => {
    return util.post('/wxmp/api/order/courses', {
      orderStatus: orderStatus,
      page: page,
      size: size
    });
  },
  productsList: (orderStatus, page, size) => {
    return util.post('/wxmp/api/order/products', {
      orderStatus: orderStatus,
      page: page,
      size: size
    });
  }
}