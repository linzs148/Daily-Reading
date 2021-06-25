Page({
	data: {
		bookidlist: [],
		state: true
	},
	onLoad: function (options) {
		wx.cloud.callFunction({
			name: 'searchBookByKey',
			data: {
				key: options.key
			},
			success: res => {
				const search_result = res.result.data.list_ISBN;
				const bookidlist = new Array();
				for (let i = 0; i < search_result.length; i++) {
					if (i % 3 === 0) bookidlist.push([search_result[i]])
					else bookidlist[(i / 3) >> 0].push(search_result[i])
				}
				this.setData({
					bookidlist: bookidlist,
					state: search_result.length > 0
				})
			}
		})
	}
})