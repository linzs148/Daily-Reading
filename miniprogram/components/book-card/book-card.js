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
						success: ress => {
							console.log(ress)
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
				this.setData({
					bookinfo: res.result.data
				})
			}
		})
	}
})
