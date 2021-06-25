Page({
	data: {
		isShow: false,
		bookidlist: [1, 2, 3, 4, 5],
		length: 5
	},

	onLoad() {
		wx.cloud.callFunction({
			name: 'sortBookByScore',
			success: res => {
				this.setData({
					isShow: true,
					bookidlist: res.result.data.list_ISBN.slice(0, this.data.length)
				})
			}
		})
	},

	onReachBottom() {
		this.setData({
			length: this.data.length + 5
		})
		this.onLoad()
	}
})