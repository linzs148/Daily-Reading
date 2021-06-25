const util = require('../../utils/util.js')

Page({
	data: {
		today: {},
		isShow: false,
		bookid: 0,
		description: {},
		value: ""
	},
	onLoad() {
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
		
		util.processTime(new Date()).then(
			response => {
				// 格式化
				const dateArray = response.gregoriandate.split('-')
				response.gregoriandate = `${dateArray[0]}年${dateArray[1]}月${dateArray[2]}日`
				const fitnessArray = response.fitness.split('.')
				response.fitness = fitnessArray.join("、")
				const tabooArray = response.taboo.split('.')
				response.taboo = tabooArray.join("、")
				this.setData({
					today: response
				})
			}
		)
		

		wx.cloud.callFunction({
			name: 'getRandomBookCard',
			success: res => {
				this.setData({
					isShow: true,
					bookid: res.result.data.ISBN,
					description: {
						introduction: res.result.data.bookIntro,
						sentence: res.result.data.bookCuts,
						comment: res.result.data.comments
					}
				})
				console.log(this.data.description)
			}
		})
	},
	onChange(e) {
		this.setData({
		  value: e.detail
		});
	},
	onSearch() {
		wx.navigateTo({
		  url: '../search/search?key=' + this.data.value,
		  success: (result) => {},
		  fail: (res) => {},
		  complete: (res) => {},
		})
	}
})