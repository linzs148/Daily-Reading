/**
 * processTime根据公历时间调用黄历API
 * response.data.newslist[0]结构
 * {
 * 	 gregoriandate: 公历日期
 * 	 lubarmonth: 农历月
 * 	 lunarday: 农历日
 * 	 lunar_festival: 农历节日
 * 	 festival: 公历节日
 * 	 fitness: 适宜
 * 	 taboo: 不宜
 * 	 tiangandizhiyear: 天干地支年
 * 	 tiangandizhimonth: 天干地支月
 * 	 tiangandizhiday: 天干地支日
 * 	 jieqi: 节气
 * }
 */
const processTime = function(date) {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()

	return new Promise((resolve, reject) => {
		wx.request({
			url: "https://api.tianapi.com/txapi/lunar/index",
	  		data: {
		  		key: "b6cafa58c55c3bea259b91aa7101796e",
				date: `${year}-${month}-${day}`
			},
			success: function(response) {
				resolve(response.data.newslist[0])
			},
			fail: function(error) {
				reject(error)
			}
		})
	})
}

module.exports = {
	processTime
}
