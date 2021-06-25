// component/bookBriefIntro/bookBriefIntro.js
Component({

  /**
   * 页面的初始数据
   */
  properties: {
     imgSrc:{
       type:String,
       value:""
     },
     bookISBN:{
       type:Number,
       value:0
      },
     bookName:{
       type:String,
       value:""
      },
     avgRate:{
       type:Number,
       value:8
     },
     usrRate:{
       type:Number,
       value:0
     },
     usrCollected:{
       type:Boolean,
       value:""
      }
  },
  data:{
     
  },
  lifetimes:{
    attached:function(){
      
    }
  }
})