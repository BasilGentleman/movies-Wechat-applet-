import { network } from "../../utils/network"
const app = getApp()
// pages/book_info/book_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:{},
    _id:"",
    type:"",
    isLikes:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    var info = JSON.parse(decodeURIComponent(options.info)) 
    // console.log(that.data.books)
    that.setData({
      books:info,
      _id:info._id,
       type: "book"
    })
    wx.setNavigationBarTitle({
      title: info.name 
    })
    
    network.getLike({
      success:res=>{
        console.log(res)
        res.favorite_books.forEach(item=>{
          if(item._id == that.data._id){
            that.setData({
              isLikes: true
            })
          }      
        })  
      }
      
    },'book',wx.getStorageSync('openid'))
    
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
     },this.data._id,'book',openid)
    } else {
      network.unLike({
        success:function(data){
         
          wx.showToast({
            title: '取消喜欢成功',
            icon:'success'
          })
        }
       },this.data._id,'book',openid)
    }
  }
})