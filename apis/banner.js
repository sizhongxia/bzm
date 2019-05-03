
var util = require('../utils/util.js')

module.exports = {
  bannerList: (displayPosition) => {
    return util.post('/wxmp/api/banner/list', {
      displayPosition: displayPosition
    });
  },
  visitBanner: (resId) => {
    return util.post('/wxmp/api/banner/visit', {
      resId: resId
    });
  }
}