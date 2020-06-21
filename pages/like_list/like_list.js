// pages/like_list/like_list.js
import {network} from "../../utils/network.js"
const app = getApp()
const fetch = app.fetch
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movielist:{},
    books:{},
    ismovies: false,
    isbooks: false,
    page: 2,
    per_page: 5,
    hasData: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var that = this
    var ismovies = options.ismovies
    var isbooks = options.isbooks
    if (ismovies) {
      wx.setNavigationBarTitle({
        title: "喜欢的电影"
      })
      that.setData({
        ismovies: true,
        isbooks: false
      })
      this.getLikeMovie()
    } else {
      that.setData({
        isbooks: true,
        ismovies: false
      })
      wx.setNavigationBarTitle({
        title: "喜欢的图书"
      })
      this.getLikeBooks()
    }

  },
// 获取喜欢的电影
getLikeMovie:function(){
  var that = this
  var openid = wx.getStorageSync('openid')
  network.getLike({
    success:function(data) {
      // console.log(data)
      that.setData({
        movielist:data.favorite_movies
      })
    }
  },'movie',openid)
},
// 选中电影
selectMovie:function(e) {
  var id = e.currentTarget.dataset.id
  var info = JSON.stringify(this.data.movielist[id])
  wx.navigateTo({
    url: './../movie_info/movie_info?info=' + encodeURIComponent(info),
  })
},
//获取图书
getLikeBooks:function(){
  var that = this
  var openid = wx.getStorageSync('openid')
  network.getLike({
    success:function(data) {
      console.log(data)
      that.setData({
        books:data.favorite_books
      })
      console.log(that.data.books)
    }
  },'book',openid)
},
//选中图书
selectBook:function(e){
  var id = e.currentTarget.dataset.id
    var info = JSON.stringify(this.data.books[id])
    wx.navigateTo({
      url: '/pages/book_info/book_info?info=' + encodeURIComponent(info),
    })
},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  }
})