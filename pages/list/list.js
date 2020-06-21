// pages/movie/movie.js
import {network} from "../../utils/network.js"
const app = getApp()
const fetch = app.fetch
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movielist: {},
    books: {},
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
        title: "电影"
      })
      that.setData({
        ismovies: true,
        isbooks: false
      })
    } else {
      that.setData({
        isbooks: true,
        ismovies: false
      })
      wx.setNavigationBarTitle({
        title: "图书"
      })

    }
    //获取电影
    network.getmoviesList({
      success: function (movielist) {
        that.setData({
          movielist: movielist
        })
      },
      fail: () => {
        this.onLoad({
          ismovies: true
        })
        console.log('请求失败')
      }

    }, 1, 10)
    // 获取图书
    network.getBooks({
      success: books => {
        that.setData({
          books: books
        })
        // console.log(that.data.books)
      },
      fail: () => {
        this.onLoad()
        console.log('请求失败')
      }
    }, 1, 10)

  },
  selectMovie: function (e) { 
    // console.log(e)
    // console.log(id)
    // console.log(this.data.movielist[id])
    var id = e.currentTarget.dataset.id
    var info = JSON.stringify(this.data.movielist[id])
    wx.navigateTo({
      url: './../movie_info/movie_info?info=' + encodeURIComponent(info),
    })
  },
  selectBook: function (e) {
    // console.log(e)
    var id = e.currentTarget.dataset.id
    var info = JSON.stringify(this.data.books[id])
    wx.navigateTo({
      url: '/pages/book_info/book_info?info=' + encodeURIComponent(info),
    })
  },
  //更多电影
  moremovies: function () {
    var that = this
    var page = that.data.page + 1
    // var per_page = that.data.page + 1
    that.setData({
      page: page,
    })
    //获取更多电影
    network.getmoviesList({
      success: function (movielist) {
        // console.log(movielist)
        if (movielist.length == 0) {
          that.setData({
            hasData: !that.data.hasData,
            page: 2
          })
          return
        }
        var moreMives = that.data.movielist
        movielist.forEach(element => {
          moreMives.push(element)
        });
        that.setData({
          movielist: moreMives,
          hasData: true
        })
      }
    }, that.data.page, 5)
    // console.log(that.data.movielist)
  },
  // 更多图书
  morebooks: function () {
    var that = this
    var page = that.data.page + 1
    // var per_page = that.data.page + 1
    that.setData({
      page: page,
    })
    network.getBooks({
      success: morebooks => {
        if (morebooks.length == 0) {
          that.setData({
            hasData: !that.data.hasData,
            page: 2
          })
          return
        }
        var books = that.data.books
        morebooks.forEach(element => {
          books.push(element)
        })
        that.setData({
          books: books,
          hasData: true
        })
      }
    }, that.data.page, 5)
  },

  onShow: function () {
    if (this.enableRefresh) {
      if (this.data.ismovies) {
        this.onLoad({
          ismovies: true
        })
      }
    } else {
      this.data.isbooks = true
    }
    wx.pageScrollTo({
      succes: res => {
        scrollTop: 0
      }
    })
  },
  enableRefresh: false,
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(!this.data.hasData){
      return
    }
    if (this.data.ismovies) {
      this.moremovies()
    } else if (this.data.isbooks) {
      this.morebooks()
    }
  }
})