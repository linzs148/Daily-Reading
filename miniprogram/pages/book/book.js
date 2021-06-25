Page({
	data: {
		bookISBN:"",
		bookName:"",
		bookAvgRate:"",
		bookImgSrc:"",
		bookCategory:"",
		bookIntro:"",
		bookCuts:[
		],
		bookComments:[
			{usrName:"usrName1",comment:"comment1"},
			{usrName:"usrName2",comment:"comment2"},
			{usrName:"usrName3",comment:"comment3"},
			{usrName:"usrName4",comment:"comment4"},
			{usrName:"usrName5",comment:"comment5"},
		],
		usrRate:"",
		usrCollected:"",
		usrId:"",
		usrName:""
	},
	async onLoad(option) {
		wx.cloud.callFunction({
			name: 'login',
			data: {},
			success: res => {
			  console.log('[云函数] [login] user openid: ', res.result.openid)
			  this.setData({
				  usrId:res.result.openid
			  })
			  console.log(res.result)
			  getApp().globalData.openid=res.result.openid
			  
			  wx.navigateTo({
				url: '../userConsole/userConsole',
			  })
			},
			fail: err => {
			  console.error('[云函数] [login] 调用失败', err)
			  wx.navigateTo({
				url: '../deployFunctions/deployFunctions',
			  })
			}
		  });
		console.log(this.data.usrId);
		this.setData({
			bookISBN:Number(option.bookISBN),
		})
		// console.log(this.data.usrID)
		wx.cloud.callFunction({
			name: 'getBookDetail',
			data: {
				bookISBN:Number(option.bookISBN),
				usrID:getApp().globalData.openid
			},
			success: res => {
				// console.log(res.result.data)
				this.setData({
					bookISBN:String(res.result.data.bookISBN),
					bookName:res.result.data.bookName,
					bookAvgRate:res.result.data.bookAvgRate,
					bookImgSrc:res.result.data.bookImgSrc,
					bookCategory:res.result.data.bookCategory,
					bookIntro:res.result.data.bookIntro,
					bookCuts:res.result.data.bookCuts,
					bookComments:res.result.data.bookComments,
					usrRate:res.result.data.usrRate,
					usrCollected:Boolean(res.result.data.usrCollected),

					usrName:res.result.data.usrName
				})
			}
		})
	},
	goTop: function(e){
		wx.pageScrollTo({
			scrollTop: 0
		})
	}
})