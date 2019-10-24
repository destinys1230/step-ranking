Page({
  data: {
    target_txt: "目标步数：8000",
  },
  get3rdSession: function () {
    let that = this
    wx.request({
      url: 'https://www.hanjz.xyz/login.php',
      data: {
        code: this.data.code
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        var sessionId = res.data;
        that.setData({ sessionId: sessionId })
        wx.setStorageSync('sessionId', sessionId)
        
        //console.log(sessionId)
        that.decodeUserInfo()
      }
    })
  },
  decodeUserInfo: function () {
    let that = this
    wx.request({
      url: 'https://www.hanjz.xyz/decrypt.php',
      data: {
        encryptedData: that.data.encryptedData,
        iv: that.data.iv,
        sessionID: wx.getStorageSync('sessionId')
      },
      
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        //console.log(that.data)
        //console.log(res)
        let todayStep = res.data.stepInfoList[30];
        that.setData({
          step: todayStep.step
        });
        console.log(that.data);
        that.setData({
          progress_txt: (that.data.step)
        });
        that.drawProgressbg();
        that.drawCircle(that.data.step * 2 / 8000)
      }
    })
  },
  onLoad: function () {
    let that = this
    wx.login({
      success: function (res) {
        let code = res.code
        that.setData({ code: code })
        wx.getWeRunData({//解密微信运动
          success(res) {
            const wRunEncryptedData = res.encryptedData
            //console.log(wRunEncryptedData)
            that.setData({ encryptedData: wRunEncryptedData })
            that.setData({ iv: res.iv })
            that.get3rdSession()//解密请求函数
          },
          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: '开发者未开通微信运动，请关注“微信运动”公众号后重试',
              showCancel: false,
              confirmText: '知道了'
            })
          }
        })
      }
    })
  },
  drawProgressbg: function () {

    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(4);// 设置圆环的宽度
    ctx.setStrokeStyle('#20183b'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#2661DD");
    gradient.addColorStop("0.5", "#40ED94");
    gradient.addColorStop("1.0", "#5956CC");

    context.setLineWidth(10);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },



})


