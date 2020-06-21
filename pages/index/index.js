// pages/index/index.js
import {network} from "../../utils/network.js"
const app = getApp()
const fetch = app.fetch
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    movielist:{},
    books:{},
    orderList:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '请求中',
      mask:true
    })
    //获取电影
    network.getmoviesList({
      success:function(movielist){
        that.setData({
          movielist : movielist
        })
      },
      fail:()=>{
        this.onLoad()
      }
    },1,5)
    //将获取到的数据赋值给全局变量供其他页面使用
    app.globalData.movielist = this.data.movielist  

    //获取首页轮播图
    network.getBanner({
      success:function(banner){
        that.setData({
          banner:banner
        })
      },
      fail:()=>{
        this.onLoad()
      }
    })

    //获取图书
    network.getBooks({
      success:function(books){
        that.setData({
          books:books
        })
      },
      fail:()=>{
        this.onLoad()
      }
    },1,5)
     //app.globalData.books = this.data.books
  },
  movie_more:function(){
    wx.navigateTo({
      url: '../list/list?ismovies='+true
    })
  },
  selectMovie:function(e){
    var id = e.currentTarget.dataset.id
    var info =JSON.stringify(this.data.movielist[id])
    wx.navigateTo({
      url: '/pages/movie_info/movie_info?info='+encodeURIComponent(info),
    })
  },
  book_more:function(){
    wx.navigateTo({
      url: '../list/list?isbookes='+true,
    })
  },
  selectBook:function(e){
    var id = e.currentTarget.dataset.id
    var info = JSON.stringify(this.data.books[id])
    // console.log(this.data.books[id])
    wx.navigateTo({
      url: '/pages/book_info/book_info?info='+encodeURIComponent(info),
    })
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // wx.showNavigationBarLoading()
    this.onLoad()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  }
})