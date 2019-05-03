
var util = require('../utils/util.js')

module.exports = {
  login: (code, nickName, avatarUrl) => {
    return util.post('/wxmp/api/login', {
      code: code,
      nickName: nickName,
      avatarUrl: avatarUrl
    });
  }
}