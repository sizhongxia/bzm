const baseUrl = 'https://api.bzm365.com';
// const baseUrl = 'http://192.168.1.105:9091';

function request(url, data = {}, method = "POST") {
  return new Promise(function (resolve, reject) {
    const token = wx.getStorageSync('token');
    wx.request({
      url: baseUrl + url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'token': token
      },
      success: function (res) {
        if (res.statusCode === 401) {
          // 需要重新登陆
          wx.removeStorageSync('token');
          // login().then(code => {
          //   return request('/wxmp/api/login', {
          //     code: code
          //   })
          // }).then(token => {
          //   wx.setStorageSync('token', token);
          //   return request(url, data, method)
          // }).then(res => {
          //   resolve(res)
          // }).catch(err => {
          wx.redirectTo({
            url: '/pages/wx/auth/auth'
          });
          // })
          // reject(res.data);
        } else {
          if (res.statusCode === 200) {
            if (res.data.code === 200) {
              resolve(res.data.data);
            } else {
              reject(res.data);
            }
          } else {
            reject({
              message: '请求失败'
            });
          }
        }
      },
      fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: '请检查网络连接',
          icon: 'none'
        });
        reject(err);
      }
    })
  });
}

function post(url, data = {}) {
  return request(url, data, 'POST')
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

module.exports = {
  request,
  post,
  login
}