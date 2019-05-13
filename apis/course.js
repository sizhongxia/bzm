
var util = require('../utils/util.js')

module.exports = {
  courseList: (page, size) => {
    return util.post('/wxmp/api/course/list', {
      page: page,
      size: size
    });
  },
  courseDetail: (resId) => {
    return util.post('/wxmp/api/course/detail', {
      resId: resId
    });
  },
  courseItemDetail: (resId) => {
    return util.post('/wxmp/api/course/itemDetail', {
      resId: resId
    });
  },
  placeOrder: (courseId, originUserNo) => {
    return util.post('/wxmp/api/course/placeOrder', {
      courseId: courseId,
      originUserNo: originUserNo
    });
  }
}
