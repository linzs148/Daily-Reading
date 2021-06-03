// logs.js
const util = require('../../utils/util.js')
/*
Page({
	data: {
		logs: []
	},
	onLoad() {
		this.setData({
			logs: (wx.getStorageSync('logs') || []).map(log => {
				return {
					date: util.formatTime(new Date(log)),
					timeStamp: log
				}
			})
		})
	}
})
*/
Page({
	data: {
		date: {}
	},
	onLoad() {
		util.processTime(new Date()).then(
			res => this.setData({
				date: res
			})
		)
	},


})