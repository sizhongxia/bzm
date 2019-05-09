
var util = require('../utils/util.js')

module.exports = {
  systemInfo: () => {
    return util.post('/wxmp/api/systemInfo', {});
  },

  awardRule: () => {
    return util.post('/wxmp/api/awardRule', {});
  }
}