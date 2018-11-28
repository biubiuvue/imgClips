const app = getApp()
Page({

  data: {
    defaultImg:"../../img/defaultImg.png"
  },
  onShow(){
    console.log(app.globalData.imgs)
    this.setData({
      defaultImg: app.globalData.imgs
    });
    this.upLoad(app.globalData.imgs)
  },
  bindChooseType(e) {//选择相机还是相册
    var demo=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = app.globalData.imgs;
        console.log(imgs)
        wx.navigateTo({
          url: "/pages/center/upload?src=" + tempFilePaths
        });
        demo.setData({
          imgs: imgs
        });
      }
    });
  },
  upLoad(e) {
    wx.showLoading({
      title: '上传中...',
    })
    var demo = this;
    return
    wx.uploadFile({
      url: 'https://xxxxxxxxxx',
      filePath: e,
      name: 'uploadImg',
      formData: {
        // 'userId': app.globalData.iuserId
      },
      success: function (res1) {
        wx.hideLoading();
      },
    })
  },


})