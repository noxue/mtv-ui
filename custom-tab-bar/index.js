Component({
	data: {
		isFanTi: false,
		selected: null,
		color: "#999999",
		selectedColor: "#f3c350",
		list: [{
				"pagePath": "/pages/index/index",
				"iconPath": "/static/icon/home.png",
				"selectedIconPath": "/static/icon/home-selected.png",
				"width": 42,
				"height": 42,
				"isSpecial": false,
				"text": "首页",
				"text2": "首頁"
			}, {
				"pagePath": "/pages/goods/chum/list",
				"iconPath": "/static/icon/chum.png",
				"selectedIconPath": "/static/icon/chum-selected.png",
				"width": 34,
				"height": 42,
				"isSpecial": false,
				"text": "找室友",
				"text2": "找室友"
			},
			{
				"pagePath": "/pages/index/publish",
				"iconPath": "/static/icon/tab-publish-2.png",
				"selectedIconPath": "/static/icon/tab-publish-2.png",
				"width": 42,
				"height": 42,
				"isSpecial": true,
				"text": "我要发布",
				"text2": "我要發佈"
			},
			{
				"pagePath": "/pages/serve/index",
				"iconPath": "/static/icon/serve.png",
				"selectedIconPath": "/static/icon/serve-selected.png",
				"width": 50,
				"height": 42,
				"isSpecial": false,
				"text": "服务",
				"text2": "服務"
			}, {
				"pagePath": "/pages/member/index",
				"iconPath": "/static/icon/member.png",
				"selectedIconPath": "/static/icon/member-selected.png",
				"width": 42,
				"height": 42,
				'isSpecial': false,
				"text": "我的",
				"text2": "我的"
			}
		]
	},
	methods: {
		localeChange(e) {
			let locale = wx.getStorageSync('locale')
			if (locale == 'zh-Hant') {
				this.setData({
					isFanTi: true
				})
			} else {
				this.setData({
					isFanTi: false
				})
			}
		},
		switchTab(e) {
			const data = e.currentTarget.dataset
			const url = data.path

			this.localeChange();
			
			wx.switchTab({
				url
			})
		}
	}
})
