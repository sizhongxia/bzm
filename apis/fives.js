
var util = require('../utils/util.js')

module.exports = {
  // lng, lat, name, provinceCode, cityCode, countyCode, page, size
  fivesList: (params) => {
    return util.post('/wxmp/api/fives/list', params);
  },

  // lng, lat, resId
  fivesDetail: (params) => {
    return util.post('/wxmp/api/fives/detail', params);
  },
}
