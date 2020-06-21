const config = require('./config');
module.exports = function(path, data, method) {
  return new Promise((resolve, reject) =>{
    wx.request({
      url: config.url+ path,
      method: method,
      data: data,
      // header: {
      //   'Content-Type': 'json',
      //   'X-Requested-With': 'XMLHttpRequest'
      // },
      success: res=>{
        //请求成功
        if (res.statusCode !== 200) {
          fail('服务器异常', reject)
          return
        }
        // if (res.data.code === 0) {
        //   fail(res.data.msg, reject)
        //   return
        // }
        resolve(res.data)
      },
      fail:function(){
        //请求失败
        fail('数据加载失败了',reject)
      }
    })
  })

  function fail(title, callback) {
    wx.hideLoading()
    wx.showModal({
      title: title,
      confirmText: '重试',
      success: res => {
        if (res.confirm) {
          callback()
        }
      }
    })
  }
}