var o = require("../../config").uploadFileUrl;

module.exports = function(e, t) {
    console.log(t), wx.showToast({
        icon: "loading",
        title: "正在上传"
    }), wx.uploadFile({
        url: o,
        filePath: t,
        name: "file",
        header: {
            "Content-Type": "multipart/form-data"
        },
        formData: {
            session_token: wx.getStorageSync("session_token")
        },
        success: function(o) {
            if (console.log(o), 200 == o.statusCode) {
                o.data;
                e.setData({
                    src: t[0]
                });
            } else wx.showModal({
                title: "提示",
                content: "上传失败",
                showCancel: !1
            });
        },
        fail: function(o) {
            console.log(o), wx.showModal({
                title: "提示",
                content: "上传失败",
                showCancel: !1
            });
        },
        complete: function() {
            wx.hideToast();
        }
    });
};