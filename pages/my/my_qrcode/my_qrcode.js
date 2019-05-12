const memberSer = require('../../../apis/member.js');
const app = getApp();

Page({
  data: {
    canvasHidden: true,
    orders: [],
    member: {},
    headPics: [],
    courseQrUrl: '',
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      current: 0
    },
    doing: ''
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '课程分享'
    })
  },

  onReady: function() {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    memberSer.userInfo().then(member => {
      this.setData({
        member: member
      });
      return memberSer.userShareInfo();
    }).then(res => {
      if (res.orders && res.orders.length > 0) {
        this.setData({
          orders: res.orders
        });
        memberSer.courseShareInfo(res.orders[0].orderId).then(res => {
          this.setData({
            headPics: res.headPics,
            courseQrUrl: res.courseQrUrl
          });
          wx.hideLoading();
        })
      } else {
        wx.hideLoading();
        wx.navigateBack();
      }
    }).catch(err => {
      wx.hideLoading();
    });
  },

  onShow: function() {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  prevImg: function() {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current > 0 ? current - 1 : this.data.orders.length - 1;
    this.setData({
      swiper: swiper,
    });
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    memberSer.courseShareInfo(this.data.orders[swiper.current].orderId).then(res => {
      this.setData({
        headPics: res.headPics,
        courseQrUrl: res.courseQrUrl
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  },

  nextImg: function() {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current < (this.data.orders.length - 1) ? current + 1 : 0;
    this.setData({
      swiper: swiper,
    });
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    memberSer.courseShareInfo(this.data.orders[swiper.current].orderId).then(res => {
      this.setData({
        headPics: res.headPics,
        courseQrUrl: res.courseQrUrl
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  },

  previewImage(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.imgUrl]
    })
  },

  toShare() {
    const _this = this;
    const ctx = wx.createCanvasContext('share');
    // 获取背景图
    _this.setData({
      doing: '正在渲染，进度6%'
    });
    _this.getImageInfo('https://baizhuanmao.oss-cn-beijing.aliyuncs.com/bzm/fives/5cd8234b60b2417d33ee3360f91639').then(res => {
      ctx.drawImage(res.path, 0, 0, 693, 1196);
      ctx.restore();
      //ctx.draw(true, function () {
      // 获取当前用户头像
      _this.setData({
        doing: '正在渲染，进度11%'
      });
      return _this.getImageInfo(_this.data.member.headImgUrl);
      //});
    }).then(res => {
      _this.circleImg(ctx, res.path, 31.1, 15.1, 30);

      _this.setData({
        doing: '正在渲染，进度16%'
      });
      return _this.getImageInfo(_this.data.courseQrUrl);
    }).then(res => {
      ctx.drawImage(res.path, 29.8, 1009.8, 146, 146);
      ctx.restore();
      //ctx.draw(true, function () {
      // 获取课程图片
      _this.setData({
        doing: '正在渲染，进度21%'
      });
      return _this.getImageInfo(_this.data.orders[_this.data.swiper.current].coverPicUrl);
      //});
    }).then(res => {
      ctx.drawImage(res.path, 0, 90, 693, 600.3);
      ctx.restore();

      _this.setData({
        doing: '正在渲染，进度26%'
      });
      return _this.getImageInfo(_this.data.headPics[0].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 29.8, 786.6, 35);
      _this.circleImg(ctx, res.path, 29.8, 786.6, 35);

      _this.setData({
        doing: '正在渲染，进度31%'
      });
      return _this.getImageInfo(_this.data.headPics[1].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 122.8, 786.6, 35);
      _this.circleImg(ctx, res.path, 122.8, 786.6, 35);

      _this.setData({
        doing: '正在渲染，进度36%'
      });
      return _this.getImageInfo(_this.data.headPics[2].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 2, 786.6, 35);
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 2, 786.6, 35);

      _this.setData({
        doing: '正在渲染，进度41%'
      });
      return _this.getImageInfo(_this.data.headPics[3].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 3, 786.6, 35);
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 3, 786.6, 35);

      _this.setData({
        doing: '正在渲染，进度46%'
      });
      return _this.getImageInfo(_this.data.headPics[4].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 4, 786.6, 35);
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 4, 786.6, 35);

      _this.setData({
        doing: '正在渲染，进度51%'
      });
      return _this.getImageInfo(_this.data.headPics[5].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 5, 786.6, 35);
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 5, 786.6, 35);

      _this.setData({
        doing: '正在渲染，进度56%'
      });
      return _this.getImageInfo(_this.data.headPics[6].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 6, 786.6, 35);
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 6, 786.6, 35);

      _this.setData({
        doing: '正在渲染，进度61%'
      });
      return _this.getImageInfo(_this.data.headPics[7].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 29.8, 876.6, 35);
      _this.circleImg(ctx, res.path, 29.8, 876.6, 35);

      _this.setData({
        doing: '正在渲染，进度66%'
      });
      return _this.getImageInfo(_this.data.headPics[8].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 122.8, 876.6, 35);
      _this.circleImg(ctx, res.path, 122.8, 876.6, 35);

      _this.setData({
        doing: '正在渲染，进度71%'
      });
      return _this.getImageInfo(_this.data.headPics[9].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 2, 876.6, 35);
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 2, 876.6, 35);

      _this.setData({
        doing: '正在渲染，进度76%'
      });
      return _this.getImageInfo(_this.data.headPics[10].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 3, 876.6, 35);
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 3, 876.6, 35);

      _this.setData({
        doing: '正在渲染，进度81%'
      });
      return _this.getImageInfo(_this.data.headPics[11].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 4, 876.6, 35);
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 4, 876.6, 35);

      _this.setData({
        doing: '正在渲染，进度86%'
      });
      return _this.getImageInfo(_this.data.headPics[12].headImgUrl);
    }).then(res => {
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 5, 876.6, 35);
      _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * 5, 876.6, 35);

      _this.setData({
        doing: '正在渲染，进度91%'
      });
      ctx.draw(true, function () {
        _this.canvasToTempFilePath();
      });
    }).catch(err => {
      console.info(err)
    });
  },

  // _this.getHeadPic(0, ctx, function () {

  //   _this.getImageInfo(_this.data.headPics[10].headImgUrl).then(res => {
  //     _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * (10 - 7), 876.6, 35);
  //     ctx.draw(true, function () {
  //       _this.canvasToTempFilePath();
  //     });
  //   })

  // });

  // getHeadPic(idx, ctx, cb) {
  //   const _this = this;
  //   if (idx >= _this.data.headPics.length) {
  //     cb && cb();
  //     return;
  //   }
  //   _this.getImageInfo(_this.data.headPics[idx].headImgUrl).then(res => {
  //     if (idx === 0) {
  //       _this.circleImg(ctx, res.path, 29.8, 786.6, 35);
  //     } else if(idx < 7) {
  //       _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * idx , 786.6, 35);
  //     } else if (idx === 7) {
  //       _this.circleImg(ctx, res.path, 29.8, 876.6, 35);
  //     } else if (idx < 13) {
  //       _this.circleImg(ctx, res.path, 29.8 + (70 + 23) * (idx-7), 876.6, 35);
  //     }
  //     ctx.draw(true, function () {
  //       setTimeout(function() {
  //         _this.getHeadPic(idx + 1, ctx, cb);
  //       }, 100);
  //     });
  //   })
  // },

  canvasToTempFilePath() {
    const _this = this;
    _this.setData({
      doing: '正在渲染，进度99%'
    });
    wx.canvasToTempFilePath({
      canvasId: 'share',
      x: 0,
      y: 0,
      width: 693,
      height: 1196,
      destWidth: 693,
      destHeight: 1196,
      fileType: 'jpg',
      quality: 1,
      success(res) {
        _this.setData({
          doing: false
        });
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              title: '提示',
              content: '文件已保存到您的相册，您可以通过此图片进行分享',
            });
          }
        })
      }
    });
  },

  getImageInfo(src) {
    return new Promise(function(resolve, reject) {
      wx.getImageInfo({
        src: src,
        success: resolve,
        fail: reject
      });
    });
  },

  circleImg(ctx, img, x, y, r) {
    ctx.save();
    ctx.beginPath();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore();
  }

  // onShareAppMessage () {
  //   return {
  //     title: '我正在白赚猫学习实战课程，挺不错的！',
  //     path: '/pages/course/course_share/course_share?userId=' + this.data.member.userId,
  //     success: function (res) { }
  //   }
  // }
})