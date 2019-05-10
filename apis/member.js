
var util = require('../utils/util.js')

module.exports = {
  userInfo: () => {
    return util.post('/wxmp/api/member/userInfo', {});
  },
  getAuthenticationInfo: () => {
    return util.post('/wxmp/api/member/getAuthenticationInfo', {});
  },
  updateAuthenticationInfo: (data) => {
    return util.post('/wxmp/api/member/updateAuthenticationInfo', data);
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
  },
  userShareInfo: () => {
    return util.post('/wxmp/api/member/userShareInfo', {});
  },
  courseShareInfo: (orderId) => {
    return util.post('/wxmp/api/member/courseShareInfo', {
      orderId: orderId
    });
  }
}