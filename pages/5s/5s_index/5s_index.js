Page({
  data: {
    imgUrls: ['https://bzm.oss-cn-beijing.aliyuncs.com/baizhuanmao/5s-1.png'

    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '5S店'
    })
  }

})