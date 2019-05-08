
var util = require('../utils/util.js')

module.exports = {
  areas: (pcode) => {
    return util.post('/wxmp/api/areas', {
      pcode: pcode
    });
  }
}