const courseSer = require('../../../apis/course.js');
const memberSer = require('../../../apis/member.js');
const sysSer = require('../../../apis/sys.js');
const paySer = require('../../../apis/pay.js');
var courseId = "";
Page({

  data: {
    course: {},
    ruleUrl: '',
    orderModel: {
      userName: '',
      phoneNo: '',
      originUserName: '',
      originNickName: ''
    },
    paying: false
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '课程-在线支付'
    });
    courseId = options.courseId;
    sysSer.awardRule().then(res => {
      this.setData({
        ruleUrl: res.ruleUrl
      });
    }).catch(err => {
    });
  },

  onShow: function () {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    memberSer.getAuthenticationInfo().then(res => {
      wx.hideLoading();
      if (!res.isMember) {
        wx.showModal({
          title: '温馨提示',
          content: '购买课程前请先完成身份验证',
          confirmText: '去认证',
          confirmColor: '#e95410',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/my/my_set_edit/my_set_edit'
              })
            } else {
              wx.navigateBack();
            }
          }
        })
      } else {
        const orderModel = this.data.orderModel;
        orderModel.userName = res.userName;
        orderModel.phoneNo = res.phoneNo;
        if (!res.haveOriginUser) {
          wx.showModal({
            title: '温馨提示',
            content: '购买课程前请去关联您的推荐人',
            confirmText: '去关联',
            confirmColor: '#e95410',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/my/my_origin_edit/my_origin_edit'
                })
              } else {
                wx.navigateBack();
              }
            }
          });
        } else {
          orderModel.originUserName = res.originUserName;
          orderModel.originNickName = res.originNickName;
        }
        this.setData({
          orderModel: orderModel
        });
      }
      this.loadCourseDetail();
    }).catch(err => {
      wx.hideLoading();
    });
  },

  loadCourseDetail: function () {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    courseSer.courseDetail(courseId).then(course => {
      this.setData({
        course: course
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  },

  toBuy() {
    const _this = this;
    wx.showModal({
      title: '温馨提示',
      content: '是否要创建订单并支付？',
      confirmText: '确定',
      confirmColor: '#e95410',
      success(res) {
        if (res.confirm) {
          _this.setData({
            paying: true
          });
          wx.showLoading({
            title: '正在创建订单',
            mask: true
          });
          courseSer.placeOrder(courseId).then(res => {
            wx.showLoading({
              title: '等待支付',
              mask: true
            });
            return paySer.unifiedorder(res.orderId, res.orderType);
          }).then(res => {
            const orderNo = res.orderNo;
            wx.requestPayment({
              timeStamp: res.timeStamp,
              nonceStr: res.nonceStr,
              package: 'prepay_id=' + res.prepayId,
              signType: 'MD5',
              paySign: res.paySign,
              success(res) {
                wx.showLoading({
                  title: '支付完成',
                  mask: true
                });
                setTimeout(() => {
                  paySer.orderquery(orderNo).then(res => {
                    if (res) {
                      wx.navigateBack({
                        complete: () => {
                          wx.hideLoading();
                        }
                      });
                    } else {
                      wx.showLoading({
                        title: '正在查询支付状态',
                        mask: true
                      });
                      setTimeout(() => {
                        wx.navigateBack({
                          complete: () => {
                            wx.hideLoading();
                          }
                        });
                      }, 1000)
                    }
                  }).catch(err => {
                    wx.navigateBack({
                      complete: () => {
                        wx.hideLoading();
                      }
                    });
                  })
                }, 1000)
              },
              fail(res) {
                wx.hideLoading();
                wx.showModal({
                  title: '支付提示',
                  content: '支付失败或您已取消支付',
                  showCancel: false,
                  confirmText: '确定',
                  confirmColor: '#e95410',
                  complete() {
                    wx.navigateBack();
                  }
                });
              }
            })
          }).catch(err => {
            wx.hideLoading();
          });
        }
      }
    })
  }

})