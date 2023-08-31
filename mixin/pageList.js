/**
 * 外部需要实现的方法
 * pageListDataPageRequest 翻页数据请求
 * pageListDataItemRequest 单个数据请求
 */
module.exports = {
	data() {
		return {
			pageList: { // 页面列表
				isFirst: true, // 是否是第一次请求
				onShowIsReset: false, // 是否进入onshow后每次都更新
				data: [], // 数据列表
				dataKey: 'id', // data 主键，用来更新/移除使用，默认id
				total: 0, // 总数
				pageSize: 10, // 每次请求页面
				pageNum: 1, // 当前页码
				pageStatus: 0, // 0 无状态 1加载前 5加载中 10没有更多 99空数据
				uniPageStatus: {
					1: 'loadmore', // 加载前
					5: 'loading', // 加载中,
					10: 'nomore', // 加载更多
				}
			}
		}
	},
	onLoad(options) {
		if (typeof this.pageListRequestBefore == 'function') this.pageListRequestBefore(options);

		this.pageListRequest('reset');
	},
	onShow() {
		if (this.pageList.isFirst == false && this.pageList.onShowIsReset == true) {
			this.pageListRequest('reset');
		}
	},
	// 滑动到底部
	onReachBottom() {
		console.log('上拉到底部加载')
		this.pageListRequest();
	},
	onPullDownRefresh() {
		console.log('下拉页面刷新')
		this.pageListRequest('reset');

		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 0)
	},
	methods: {
		// 添加单条
		pageListItemRemove(data) {
			this.pageList.data.unshift(data);

			// 移到顶部
			uni.pageScrollTo({
				scrollTop: 0
			})
		},
		// 移除单条
		pageListItemRemove(data) {
			let removeIndex = this.pageListItemGetIndex(data);
			if (removeIndex > -1) {
				this.pageList.data.splice(removeIndex, 1);
			}
		},
		// 更新单条
		pageListItemUpdate(data, updateData) {
			let updateIndex = this.pageListItemGetIndex(data);

			if (updateIndex > -1) {
				// 存在更新数据
				if (updateData) {
					this.pageList.data[updateIndex] = updateData;
					return false;
				}

				// 存在单个请求接口
				if (typeof this.pageListDataItemRequest == 'function') {
					this.pageListDataItemRequest(data).then(data => {
						this.pageList.data[updateIndex] = data;
					})
					return false;
				}
			}
		},
		// 页面请求
		pageListRequest(type) {
			console.log('获取数据', type, this.pageList);

			let pageList = this.pageList;
			if (type === 'reset') {
				pageList.pageNum = 1;
				pageList.pageStatus = 1;
				pageList.data = [];
			}

			console.log(1, pageList.pageStatus);

			// 状态判断
			if (pageList.pageStatus !== 1) return false;
			pageList.pageStatus = 5;
			console.log(2);
			// 页面请求api
			if (typeof this.pageListDataPageRequest == 'undefined') {
				return false;
			}
			console.log(3);
			this.pageListDataPageRequest({
				pageNum: this.pageList.pageNum,
				pageSize: this.pageList.pageSize,
			}).then(list => {
				console.log('翻页数据', list);

				if (!list) list = []; // 防止空数据报错

				// 数据调整
				if (pageList.pageNum > 1) {
					list.forEach(item => {
						pageList.data.push(item);
					})
				} else {
					pageList.data = list;
				}

				// 翻页配置修改
				if (pageList.pageNum == 1 && list.length <= 0) {
					pageList.pageStatus = 99;
				} else if (list.length < pageList.pageSize) {
					pageList.pageStatus = 10;
				} else {
					pageList.pageStatus = 1;
				}

				pageList.pageNum++;

				if (type == 'reset') {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
				}
			}, err => {
				pageList.pageStatus = 1;
			}).then(res => {
				// 不再是第一次请求了
				if (this.pageList.isFirst == true) this.pageList.isFirst = false;
			})
		},
		pageListItemGetIndex(data) {
			let idnex = -1;
			let key = this.pageList.dataKey;
			this.pageList.data.forEach((item, index) => {
				if (item[key] == data[key]) {
					idnex = index;
				}
			});

			return index;
		}
	}
}