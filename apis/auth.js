
var util = require('../utils/util.js')

module.exports = {
  checkUser: (code) => {
    return util.post('/wxmp/api/checkUser', {
      code: code
    });
  },
  login: (data) => {
    return util.post('/wxmp/api/login', data);
  }
}