// component/score&collection/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Component({

  /**
   * 页面的初始数据
   */
  properties:{
    value:{
      type:Number,
      val:0
    },
    usrCollected:{
      type:Boolean,
      val:false,
      observer: function(newval, oldval) {
        this.loadIcon(newval)
      }
    },
    bookISBN:{
      type:Number,
      val:0
    }
  },
  data: {
    buttonMsg:"收藏",
    buttonIcon:"star-o",
    buttonColor:""
  },
methods:{
  onTap:function(){
    var col = this.properties.usrCollected
    var app = getApp()
		var id = app.globalData.openid
    if(!col){
      this.setData({
        usrCollected:true,
        buttonMsg:"已收藏",
        buttonIcon:"success",
        buttonColor:"orange"
      })
	  Toast.success("收藏成功")
	  console.log(this.properties.bookISBN)
      wx.cloud.callFunction({
		name: 'usrCollect',
        data:{
          usrID:id,
		  bookISBN:this.properties.bookISBN,
          collect:true
        },
        success: res => {
        }
      })
      console.log(this.data.bookid)
    }
    else{
      this.setData({
        usrCollected:false,
        buttonMsg:"收藏",
        buttonIcon:"star-o",
        buttonColor:""
      })
      Toast.fail("取消收藏")
      wx.cloud.callFunction({
        name: 'usrCollect',
        data:{
          usrID:id,
          bookISBN:this.properties.bookISBN,
          collect:false
        },
        success: res => {
        }
      })
    }
    },
    //todo:发送收藏变更表单
  onChange1:function(e){
    this.setData({
      value:e.detail*2
    })
    var app = getApp()
		var id = app.globalData.openid
		console.log(id)
    wx.cloud.callFunction({
      name: 'usrRate',
      data:{
        usrID:id,
        bookISBN:Number(this.properties.bookISBN),
        score:this.properties.value
      },
      success: res => {
      }
    })
    //todo:发送修改评分表单
  },
  loadIcon:function(e){
    var col = e
    // console.log(col)
    if(col){
      this.setData({
        properties:"true",
        buttonMsg:"已收藏",
        buttonIcon:"success",
        buttonColor:"orange"
      })
    }
    else{
      this.setData({
        properties:"false",
        buttonMsg:"收藏",
        buttonIcon:"star-o",
        buttonColor:""
      })
    }
  }
},
  lifetimes:{
    ready:function(){
    
    }
  }
})