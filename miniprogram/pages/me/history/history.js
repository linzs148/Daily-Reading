Page({
  data: {
    records:[]
  },
  searchBySSID:(e)=>{
    var book = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../../book/book?bookISBN='+book.bookISBN,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getHistoryInfo',
      data:{usrID:getApp().globalData.openid},
      success: res => {
        console.log("success");
        console.log(res)
        this.setData({
          records:res.result.data.historyInfo
        })
        console.log(this.data.records)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
})