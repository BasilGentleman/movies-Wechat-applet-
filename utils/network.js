const app = getApp()
const fetch = app.fetch

const network = {
  //获取电影
  getmoviesList :function(params,page,per_page) {
    fetch('movie',{page:page,per_page:per_page}).then(data =>{
      wx.hideLoading()
      // console.log(data)
      var movies = data
      if(params && params.success) {
        params.success(movies)
      }
      // app.globalData.movielist = this.data.movielist //将获取到的数据赋值给全局变量供其他页面使用
    },()=>{
      this.onLoad()
      console.log('请求失败')
    })
  },

  //获取首页轮播图
  getBanner:function(params) {
    fetch('banner').then(data=>{
      // 获取轮播图
      //  console.log(data)
      var banner = data.banner_images
      if(params && params.success) {
        params.success(banner)
      }
    },()=>{
      this.onLoad()
    })
  },
  //获取图书
  getBooks: function(params,page,per_page) {
    fetch('book',{page:page,per_page:per_page}).then(data =>{
      var books = data
      // console.log(data)
      if(params && params.success) {
        params.success(books)
      } 
    },()=>{
      this.onLoad()
    })
  },
  //标记喜欢
  isLike:function(params,id,type,openid) {
    fetch('user/like',{id:id,type:type,openid:openid},'POST').then(data =>{
      if(params && params.success) {
        params.success(data)
      }
    })
  },
  //取消喜欢
  unLike:function(params,id,type,openid) {
    fetch('user/unlike',{id:id,type:type,openid:openid},'POST').then(data =>{
      
      if(params && params.success) {
        params.success(data)
      }
    })
  },
 //获取喜欢的xx列表
 getLike:function(params,type,openid) {
    fetch('user/like/list',{type:type,openid:openid},'GET').then(data=>{
      // console.log(data)
      if(params && params.success) {
        params.success(data)
      }
    })
 }
}

export {network}