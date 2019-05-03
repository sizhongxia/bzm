
var util = require('../utils/util.js')

module.exports = {
  coursesList: (page, size) => {
    return util.post('/wxmp/api/order/courses', {
      page: page,
      size: size
    });
  },
  productsList: (page, size) => {
    return util.post('/wxmp/api/order/products', {
      page: page,
      size: size
    });
  }
}