
var util = require('../utils/util.js')

module.exports = {
  userInfo: () => {
    return util.post('/wxmp/api/member/userInfo', {});
  },
  updateAuthenticationInfo: (realName, phoneNo) => {
    return util.post('/wxmp/api/member/updateAuthenticationInfo', {
      realName: realName,
      phoneNo: phoneNo
    });
  },
  myExpandMembers: (page, size) => {
    return util.post('/wxmp/api/member/myExpandMembers', {
      page: page,
      size: size
    });
  },
  updateWxInfo: (nickName, avatarUrl) => {
    return util.post('/wxmp/api/member/updateWxInfo', {
      nickName: nickName,
      avatarUrl: avatarUrl
    });
  }
}