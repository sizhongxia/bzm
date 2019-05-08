const util = require('../../../utils/util.js')
const authSer = require('../../../apis/auth.js')

Page({
  data: {
    goGotUserInfo: false,
    forbiddenLocation: false
  },
  onShow() {
    this.showAuthLocationModel()
  },
  showAuthLocationModel() {
    const _this = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              _this.setData({
                goGotUserInfo: true
              });
            },
            fail() {
              _this.setData({
                forbiddenLocation: true
              });
            }
          })
        } else {
          _this.setData({
            goGotUserInfo: true
          });
        }
      }
    })
  },
  onGotUserLocation(e) {
    if (e.detail.authSetting['scope.userLocation']) {
      this.setData({
        goGotUserInfo: true,
        forbiddenLocation: false
      });
    }
  },
  onGotUserInfo(e) {
    if (e.detail.userInfo) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      util.login().then(code => {
        wx.getUserInfo({
          withCredentials: true,
          lang: 'zh_CN',
          success: (res) => {
            const userInfo = res.userInfo;
            userInfo.rawData = res.rawData;
            userInfo.encryptedData = res.encryptedData;
            userInfo.iv = res.iv;
            userInfo.signature = res.signature;
            userInfo.code = code;

            userInfo.uscene = wx.getStorageSync('uscene');

            authSer.login(userInfo).then(token => {
              wx.setStorageSync('token', token)
              wx.switchTab({
                url: '/pages/course/course_index/course_index',
                complete: () => {
                  wx.hideLoading();
                }
              })
            }).catch(err => {
              wx.hideLoading();
            })
          }
        })
      }).catch(err => {
        wx.hideLoading();
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '请点击“允许”按钮进行微信授权',
        confirmText: '确定',
        confirmColor: '#e95410',
        showCancel: false
      })
    }
  }
})