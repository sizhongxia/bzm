
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
  placeOrder: (courseId) => {
    return util.post('/wxmp/api/course/placeOrder', {
      courseId: courseId
    });
  }
}