
var util = require('../utils/util.js')

module.exports = {
  fivesList: (name, provinceCode, cityCode, countyCode, page, size) => {
    return util.post('/wxmp/api/fives/list', {
      name: name,
      provinceCode: provinceCode,
      cityCode: cityCode,
      countyCode: countyCode,
      page: page,
      size: size
    });
  }
}