// components/stars/stars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rate: {
      type:Number,
      value:0, 
      // observer: function(newval, oldval) {
      //   // console.log("传过来的值",newval);
      //   // this.raterate(newval)
      //   //  this.rate(newval)
      //   value:newval
      // }

    },
    starsize: {
      type:Number,
      value:35 //rpx
    },
    fontsize: {
      type:Number,
      value:26 //rpx
    },
    fontcolor: {
      type:String,
      value:"black"
    },
   top: {
     type:Number,
     value:20
   },
   left: {
    type:Number,
    value: 20
   }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  /**组件生命周期函数 */
  lifetimes: {
    attached:function(){
      var that = this;
      // console.log(that.properties.rate)
      var rate = that.properties.rate;
      var intRate = parseInt(rate);
      var light = parseInt(intRate/2);
      var half = intRate % 2;
      var gray = 5 - light - half
      var ligths = [];
      var halfs = [];
      var grays = [];
      for ( var index = 1; index <= light;index++ ) {
        ligths.push(index)
      }
      for ( var index = 1; index <= half;index++ ) {
        halfs.push(index)
      }
      for ( var index = 1; index <= gray;index++ ) {
        grays.push(index)
      }
      
      var ratetext = rate && rate > 0 ? rate.toFixed(1) : '未评分'

      that.setData({
        lights:ligths,
        halfs:halfs,
        grays:grays,
        ratetext:ratetext
      })
    }
  }
})
