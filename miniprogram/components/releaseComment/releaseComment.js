// component/releaseComment/releaseComment.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Component({

  /**
   * 页面的初始数据
   */
  properties:{
    bookISBN:{
      type:Number,
      value:0
     },

  },
  data: {
    "newComment":""
  },
  methods:{
    textchange:function(params){
      console.log(params)
    },
    release:function (params) {
      console.log(params)
      Toast.success('发表成功！重新进入这本书即可看到您的评论')
      var app = getApp()
		  var id = app.globalData.openid
      wx.cloud.callFunction({
        name: 'usrComment',
        data:{
			usrName:"微积分不过平均分不改名",
          usrID:id,
          bookISBN:this.properties.bookISBN,
          content:this.data.newComment
        },
        success: res => {
        }
      })
      console.log(this.data.newComment)
      this.setData({
        newComment:""
      })
    }
  }
  
})