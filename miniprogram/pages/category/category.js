Page({
	data: {
		isShow: false,
		categorylist: ["科幻", "推理", "言情", "武侠", "计算机", "经济学", "儿童文学", "社会", "艺术", "政治", "职场", "教育", "科技", "悬疑", "心理"],
		bookidlist: []
	},
	onLoad() {
		const bookISBNlist = new Array(15)
		for(let i = 0; i < 15; i++) {
			wx.cloud.callFunction({
				name: 'getBookByCategory',
				data: {
					category: i
				},
				success: res => {
					bookISBNlist[i] = res.result.data.list_ISBN
					this.setData({
						bookidlist: bookISBNlist,
						isShow: true
					})
				}
			})
		}
	}
})