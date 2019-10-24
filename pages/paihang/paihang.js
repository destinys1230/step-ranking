// pages/leftSwiperDel/index.js
Page({
  data: {
    delBtnWidth: 180//删除按钮宽度单位（rpx）
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.initEleWidth();
    this.tempData();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  

  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //测试临时数据
  tempData: function () {
    var list = [
      {
        rank: "1",
        txtStyle: "",
        icon: "/imgs/account.png",
        name: "李飞",
        pace: "23456",
      },
      {
        rank: "2",
        txtStyle: "",
        icon: "/imgs/account.png",
        name: "张叶",
        pace: "23450",

      },]



    //
    this.setData({
      list: list
    });
  }

})
