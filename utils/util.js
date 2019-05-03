var baseUrl = 'http://127.0.0.1:9091';
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
          wx.removeStorageSync('token');
          wx.redirectTo({
            url: '/pages/auth/login/login'
          });
          return false;
        }
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            reject(res.data);
          }
        } else {
          showErrorToast(res.errMsg)
          reject(null);
        }
      },
      fail: function (err) {
        showErrorToast('请检查网络连接');
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