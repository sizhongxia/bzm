
var util = require('../utils/util.js')

module.exports = {
  checkUser: (code) => {
    return util.post('/wxmp/api/checkUser', {
      code: code
    });
  },
  login: (code, nickName, avatarUrl) => {
    return util.post('/wxmp/api/login', {
      code: code,
      nickName: nickName,
      avatarUrl: avatarUrl
    });
  }
}