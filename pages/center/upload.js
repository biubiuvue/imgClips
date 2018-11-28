var o = function(o) {
    return o && o.__esModule ? o : {
      default: o
    };
  }(require("../../utils/weCropper.js")),
  e = wx.getSystemInfoSync(),
  t = e.windowWidth,
  r = e.windowHeight - 50;
var app = getApp();
Page({
  data: {
    cropperOpt: {
      id: "cropper",
      width: t,
      height: r,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (t - 375) / 2,
        y: (r - 200) / 2,
        width: 375,
        height: 200
      }
    }
  },
  touchStart: function(o) {
    this.wecropper.touchStart(o);
  },
  touchMove: function(o) {
    this.wecropper.touchMove(o);
  },
  touchEnd: function(o) {
    this.wecropper.touchEnd(o);
  },
  getCropperImage: function() {
    this.wecropper.getCropperImage(function(o) {
      console.log("这个是什么鬼" + o);
      app.globalData.imgs = o; //这个是上传图片的关键，剪裁后的图片，添加到全局图片中
      // wx.switchTab({
      //   url: "/pages/center/center"
      // })
      wx.navigateBack({})
    });
  },
  uploadTap: function() {
    var o = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ['camera', 'album'],
      success: function(e) {
        var t = e.tempFilePaths[0];
        o.wecropper.pushOrign(t);
      }
    });
  },
  onLoad: function(e) {
    var isChoose = e.isChoose;
    this.setData({
      isChoose: isChoose
    })
    var t = this.data.cropperOpt,
      r = e.src;
    r && (Object.assign(t, {
      src: r
    }), new o.default(t).on("ready", function(o) {
      console.log("wecropper is ready for work!");
    }).on("beforeImageLoad", function(o) {
      console.log("before picture loaded, i can do something"), console.log("current canvas context:", o),
        wx.showToast({
          title: "上传中",
          icon: "loading",
          duration: 2e4
        });
    }).on("imageLoad", function(o) {
      console.log("picture loaded"), console.log("current canvas context:", o), wx.hideToast();
    }));
  }
});