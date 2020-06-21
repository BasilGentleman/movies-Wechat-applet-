// components/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLikes:{
      type:Boolean,
      value:false,
       observer: function(newval, oldval) {
        console.log("传过来的值",newval);
         value:newval
         if(newval == true) {
           this.setData({
             isLike:true
           })
         }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLike:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // fnActive(e){
    //   this.setData({
    //      isLike:!e.target.dataset.favourite
    //   })
    // }
    like(e) {
    
      this.setData({
        isLike:!this.data.isLike
      })
      this.triggerEvent("isLike",{
        isLike:this.data.isLike
      })
     }
  
  },
  // lifetimes:{
  //   ready:function(){
  //     console.log(this.properties.isLikes)
  //   }
  // }
   
})
