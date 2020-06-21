App({
  fetch: require('utils/fetch.js'),
  config: require('utils/config.js'),
  globalData: {
    userInfo: null, //用户信息
    openid: null,
    isLogin: false,
    token: null
  },
  onLaunch: function () {
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    this.checkLogin(res => {
      if (!res.isLogin) {
        this.login()
      }
    })
    //获取token
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      data: {
        grant_type: 'client_credential',
        appid: this.config.appid,
        secret: this.config.secret
      },
      success: res => {
        // console.log(res)
        wx.setStorage({
          data: res.data.access_token,
          key: 'token',
        })
        this.globalData.token = res.data.access_token
        this.globalData.isLogin = true
      }
    })
    
  },

  login: function (options) {
    wx.login({
      success: res => {
        this.fetch('user/login', {
          appid: this.config.appid,
          secret: this.config.secret,
          js_code: res.code
        }, 'post').then(data => {
          console.log(data)
          wx.setStorage({
            data: data.openid,
            key: 'openid',
          })
        })
      }
    })
  },
  checkLogin: function (callback) {
    var token = this.globalData.token
    if (!token) {
      token = wx.getStorageSync('token')
      if (token) {
        this.globalData.token = token
      } else {
        callback({
          isLogin: false
        })
        return
      }
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})