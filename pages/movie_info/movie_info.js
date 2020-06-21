// pages/movie_info/movie_info.js
const app = getApp()
const fetch = app.fetch
import { network } from "../../utils/network"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movielist:null,
    _id:null,
    movie_info:null,
    isLikes:false
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // console.log(options)
    var info = JSON.parse(decodeURIComponent(options.info))
    var category = info.category
    category = category.join(' ')
    info.category = category
      //影人+导演
    var director = info.director
    director.forEach(element => {
      //追加属性赋值
      element.identity = "导演"
    });
    var actors = info.actors
    for(var i =0; i<actors.length; i++){
        // console.log(director[i])
        var obj ={
          name:actors[i].name,
          picture_url:actors[i].picture_url,
          identity:"演员"
        }
        director.push(obj)
    }
    info.director = director
    that.setData({
      movie_info:info
    })
    //  console.log(this.data.movie_info)
    wx.setNavigationBarTitle({
      title: info.name + "\t(" +info.year +")"
    })
    //获取id
    // console.log(info)
    that.setData({
      _id:info._id
    })
    network.getLike({
      success:res=>{
        console.log(res)
        res.favorite_movies.forEach(item=>{
          if(item._id == that.data._id){
            that.setData({
              isLikes: true
            })
          }    
        }) 
      }
      
    },'movie',wx.getStorageSync('openid'))
  },
  //是否喜欢
  likes:function(e){
    // console.log(e)
    var openid = wx.getStorageSync('openid')
    var isLike = e.detail.isLike
    console.log(isLike,this.data._id)
    if(isLike) {
     network.isLike({
      success:function(data){
        console.log(data)
        wx.showToast({
          title: '添加喜欢成功',
          icon:'success'
        })
      }
     },this.data._id,'movie',openid)
    } else {
      network.unLike({
        success:function(data){
          console.log(data)
          wx.showToast({
            title: '取消喜欢成功',
            icon:'success'
          })
        }
       },this.data._id,'movie',openid)
    }
  }
  
})