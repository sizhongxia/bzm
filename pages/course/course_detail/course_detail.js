const courseSer = require('../../../apis/course.js')
var courseId = "";
Page({

  data: {
    course: {}
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '课程详情'
    });
    courseId = options.courseId;
    this.loadCourseDetail();
  },

  loadCourseDetail: function() {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    courseSer.courseItemDetail(courseId).then(course => {
      this.setData({
        course: course
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  }
})