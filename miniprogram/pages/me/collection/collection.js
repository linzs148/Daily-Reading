// miniprogram/pages/me/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records:[
     ]
  },
  searchBySSID:(e)=>{
    var book = e.currentTarget.dataset.index;
    console.log(book.bookISBN);
    wx.navigateTo({
      url: '../../book/book?bookISBN='+book.bookISBN,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	var app  = getApp();
	var id = app.globalData.openid;
	console.log(id);
    wx.cloud.callFunction({
      name: 'getCollectionInfo',
      data: {usrID:getApp().globalData.openid},
      success: res => {
        console.log("success");
        console.log(res.result)
        this.setData({
          records:res.result.data.collectionInfo
        })
        console.log("records are "+this.data.records)
      },
      fail: err => {
        console.error('[云函数] [getCollectionInfo] 调用失败', err)
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})