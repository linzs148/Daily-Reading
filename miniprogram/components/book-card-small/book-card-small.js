Component({
	properties: {
		bookid: {
			type: String,
			value: ""
		}
	},
	data: {
		bookinfo: {}
	},
	methods: {
		addHistory: function(){
			wx.cloud.callFunction({
				name: 'login',
				data: {},
				success: res => {
					wx.cloud.callFunction({
						name: 'addHistory',
						data: {
							bookISBN: this.data.bookid,
							uid: res.result.openid
						},
						success: res => {
							console.log("success")
						}
					})
				}
			})
		}
	},
	ready: function() {
		wx.cloud.callFunction({
			name: 'getBookCard',
			data: {
				bookISBN: this.properties.bookid
			},
			success: res => {
				const info = {img: res.result.data.bookImgSrc, title: res.result.data.bookName, score: res.result.data.bookAvgRate}
				this.setData({
					bookinfo: info
				})
			}
		})
	}
})
