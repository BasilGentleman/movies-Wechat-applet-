const app = getApp()
const fetch = app.fetch
const config =require('../../utils/config')
Page({
  data:{
    openid:'',
    is_login:false,
    userInfo:{}
  },
  onLoad:function(options){
    // 查看是否授权
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              //用户已经授权过
            }
          })
        }
      }
    })
  },
 //获取用户信息
  bindGetUserInfo:function(e){
    // console.log(e)
    if(e.detail.userInfo){
      this.setData({
        userInfo:e.detail.userInfo,
        is_login:!this.is_login
      })
    } 
  },
  //跳转喜欢的电影页面
  like_movies:function() {
    wx.navigateTo({
      url: '/pages/like_list/like_list?ismovies='+true,
    })
  },
  // 跳转喜欢的图书页面
  like_books:function() {
    wx.navigateTo({
      url: '/pages/like_list/like_list?isbooks='+true,
    })
  },
  //退出
  exit:function(){
    this.setData({
      is_login:false
    })
  }
})