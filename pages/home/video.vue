<template>
	<view class="content">
		<swiper :style="'width: '+ windowWidth +'px; height:100vh; background-color: #000;'" class="swiper" circular
			@change="swiperChange" :current="displayIndex" :vertical="true" duration="300">

			<swiper-item v-for="(list, index) in displaySwiperList" :key="index"
				:style="'width: '+ windowWidth +'px; height:100vh; background-color: #000;'">
				<view :style="'width: '+ windowWidth +'px; height:'+heightxw+'vh;'">
					<!-- 视频 -->
					<video v-if="index == displayIndex" :id="'video_' + index" :controls="true" :loop="false"
						:enable-progress-gesture="false" :show-center-play-btn="true" :show-loading="true"
						:show-fullscreen-btn="false" @ended="videoEnd" @click="tapVides()"
						:poster="'https://mtv.static.noxue.com/' +  moviesInfo.cover"
						:style="'width: '+ windowWidth +'px; height:'+heightxw+'vh;'" :src="list.videosInfo.video" class="tsvideo">
					</video>
					<template v-else>
						<image class="w-h-full" :src="'https://mtv.static.noxue.com/' +  moviesInfo.cover"></image>
					</template>

					<!-- 视频不存在的时候弹出 -->
					<view v-if="index == displayIndex && !list.videosInfo" class="videoHover tsimg" @click.stop="rechargeChange"
						:style="'width: '+ windowWidth +'px; height:'+heightxw+'vh;'">
						<image :src="list.img"
							:style="'width: 100vw; height:'+heightxw+'vh; background-color: #000; position: absolute;'"
							mode="aspectFit"></image>
						<image class="playState" src="@/static/play.png"></image>
					</view>

					<!-- 显示栏目 -->
					<template v-if="showTab">
						<!-- 右侧 -->
						<view class="userInfo">
							<!-- 点赞 -->
							<view @click.stop="linkClick" class="flex-column-center-center" style="opacity: 0.9; margin-top: 17px;">
								<image v-if="list.videosInfo.is_liked == true" src="@/static/aixinRed.png"
									style="width: 60rpx; height: 50rpx;"></image>
								<image v-else src="@/static/aixin.png" style="width: 60rpx; height: 50rpx;">
								</image>
								<text style=" color: #FFFFFF; margin-top: 5px; font-size: 14px; text-align: center;font-weight: bold;"
									:class="{'likeNumActive':list.like}">{{(list.videosInfo && list.videosInfo.likes) || 0}}</text>
							</view>
							<!-- 追剧 -->
							<view @click.stop="followedClick" class="flex-column-center-center"
								style="opacity: 0.9; margin-top: 17px;">
								<image v-if="list.videosInfo.is_followed == true" src="@/static/zhuiJu-select.png" class="w-h-60">
								</image>
								<image v-else src="@/static/zhuiJu-noSelect.png" class="w-h-60">
								</image>
							</view>
						</view>

						<!-- 最下侧 -->
						<view class="contentcd" @click.stop="videoListShow()">
							<text class="userName" :style="'width: '+ (windowWidth - 90) +'px;'">
								{{moviesInfo.name || '短剧标题'}}
							</text>
							<text class="wordss" :style="'width: '+ (windowWidth - 90) +'px;'">
								{{moviesInfo.description || '短剧介绍'}}
							</text>
							<text class="words" :style="'width: '+ (windowWidth - 90) +'px;'">{{list.name}} 选集></text>
						</view>
					</template>
				</view>
			</swiper-item>
		</swiper>

		<!-- 选集弹窗 -->
		<u-popup v-model="originListModel" mode="bottom" border-radius="25">
			<view class="h-700 p-20 flex-column" style="background-color: #181a1f;color: #fff;overflow-y: auto;">
				<view class="flex-row flex-shrink-0">
					<view class="flex-column">
						<view class="font-40">{{moviesInfo.name}}</view>
						<view class="font-30 m-t-10" style="color: #999;">更新至{{originList.length}}集</view>
					</view>
				</view>
				<view class="w-full h-20 flex-shrink-0"></view>
				<scroll-view class="w-full" style="height: calc(700rpx - 92rpx - 10rpx - 20rpx - 40rpx);" :scroll-y="true"
					:scroll-into-view="goodsIndex">
					<view class="video-list">
						<view class="video-item" v-for="(item,index) in originList" :key="index" @click="vidoeWitch(index)"
							:id="'goods_' + index">
							{{index + 1}}
							<view class="pay-lock" v-if="item.price > 0">
								<image class="w-h-full" src="@/static/lock.png"></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>

		<!-- 充值弹窗 -->
		<u-popup v-model="rechargeModel.show" mode="bottom" ref="select" border-radius="25">
			<view class="p-b-36" style="background-color: #fff;overflow-y: auto;">
				<view class="goods-title">本集为付费剧集，充值后可继续观看</view>
				<view class="p-lr-36">
					<view class="flex-row-between-center m-t-20">
						<view>
							<view>解锁本集:{{originList[originIndex].price}}金币</view>
							<view>账号余额:0金币</view>
						</view>
						<view class="weChatPay-button">
							微信支付
						</view>
					</view>
					<view class="goods-list">
						<view v-for="(item,index) in rechargeModel.data" :key="index" @click="goodsClick(item)" class="goods-item">
							<view class="font-34">
								{{item.price}}<text style="font-size: 24rpx;margin-left: 5rpx;">元</text>
							</view>
							<view class="font-25 m-t-15" style="color:#777777;">
								{{item.score}}金币
							</view>
							<view class="font-25 m-t-15" style="color:#fe5000">
								{{item.description}}
							</view>
						</view>
					</view>
					<view class="m-t-20 font-24" style="color:#999;">虚拟商品购买后不可退换，青少年请在家长陪同下观看</view>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				moviesId: 0, // 短剧id
				videosId: 0, // 视频id
				moviesInfo: {}, // 短剧详情
				userInfo: {}, // 用户信息
				originList: [], // 源数据
				originIndex: -1, // 当前要播放的视频
				originOldIndex: 0, // 上一个要播放的视频
				originListModel: false, // 视频列表展示
				displaySwiperList: [], // swiper需要的数据
				displayIndex: 0, // 用于显示swiper的真正的下标数值只有：0，1，2。
				displayOldIndex: -1, // 上一个直播的视频
				windowWidth: 0,
				isPlay: true, //是否自动播放下一个视频
				nodate: true, //true 有数据 
				showTab: true,
				rechargeModel: { // 充值相关东西
					show: false,
					data: []
				},
				goodsIndex: 'goods_1', // 视频滑动位置
				safeArea: 0, // 安全区配置
				heightxw: 100, // 安全区配置
			};
		},
		onLoad(e) {
			// 短视频id
			if (e.mid || e.moviesId) {
				this.moviesId = parseInt(e.mid || e.moviesId)
			}
			// 视频id
			if (e.vid || e.videosId) {
				this.videosId = parseInt(e.vid || e.videosId)
			}

			// 获取安全区 视频是不需要安全区的，只有文字啥的需要 TODO
			uni.getSystemInfo({
				success: res => {
					this.safeArea = res.safeAreaInsets.bottom;
					if (this.safeArea > 0) {
						this.heightxw = 97
					}
				}
			})

			this.windowWidth = uni.getSystemInfoSync().windowWidth

			this.getMoviesDetail();
			this.getVideosList();
		},
		onShow() {},
		onShareAppMessage: function(res) {
			var href = '/pages/client/tuan/detail?vid=' + this.vid + '&fxpid=' + this.uid + '&mid=0'
			console.log(res)
			let that = this;
			const obj = {
				title: "发送给好友",
				imageUrl: '',
				path: href,
				success: function(res) {
					console.log(res, "转发成功")
				},
				fail: function(res) {
					wx.showToast({
						title: '发送失败',
						icon: 'none'
					})
				}
			}
			return obj
		},
		methods: {
			// 获取短剧详情
			getMoviesDetail() {
				this.$api.movies.detail.request({}, {
					url: this.$hostConfig.apiHost + '/' + 'movies/' + 1
				}).then((data) => {
					this.moviesInfo = data;
					this.setStorage();
				})
			},
			// 获取视频列表
			getVideosList() {
				this.originList = []

				this.$api.movies.videos.request({}, {
					url: this.$hostConfig.apiHost + '/' + 'movies/' + 1 + '/videos'
				}).then(data => {
					// 如果数据为空
					let list = data;
					if (list.length > 0) {
						for (let i = 0; i < list.length; i++) {
							list[i]._id = 'video_' + list[i].id;
							list[i].playStatus = 0; // 0 等待  5可以播放 10需要付费
							list[i].videosInfo = null;
							this.originList.push(list[i])
						}

						// 首次计算播放视频
						if (this.originIndex < 0) {
							if (this.videosId < 0 || this.videosId > this.originList.length - 1) {
								this.originIndex = 0;
							} else {
								this.originIndex = this.videosId || 0;
							}
						};

						console.log('播放视频', this.originIndex);

						this.swiperInit(this.originIndex);
					} else {
						this.nodate = false
					}
				})
			},
			// 显示选集界面
			videoListShow() {
				this.originListModel = true;
				this.$nextTick(() => {
					this.goodsIndex = 'goods_' + this.originIndex;
				})
			},
			// 视频信息
			tapVides() {
				this.showTab = !this.showTab
			},
			// 切换视频
			vidoeWitch(index) {
				this.originIndex = index
				this.swiperInit(index);

				this.originListModel = false;
			},
			// 视频结束
			videoEnd() {
				// 自动切换下一个视频
				if (this.isPlay) {
					let current;
					if (this.displayIndex < 2) {
						current = this.displayIndex + 1
					} else {
						current = 0
					}

					this.swiperChange({
						detail: {
							current: current
						}
					})
					console.log('显示swiper Index:', current)
				}
			},
			/**
			 * 初始一个显示的swiper数据
			 * @originIndex  从源数据的哪个开始显示默认0，如从其他页面跳转进来，要显示第n个，这个参数就是他的下标
			 */
			swiperInit(originIndex = this.originIndex) {
				console.log('--------当前数据 Index:', originIndex)

				this.showTab = false
				const originListLength = this.originList.length; // 源数据长度

				// 当前视频
				this.displaySwiperList[this.displayIndex] = this.originList[originIndex]; // 当前的视频替换

				// 上一个视频
				let displayListUp = this.displayIndex - 1 == -1 ? 2 : this.displayIndex - 1;
				let originListUp = originIndex - 1 == -1 ? originListLength - 1 : originIndex - 1;
				this.displaySwiperList[displayListUp] = this.originList[originListUp];

				// 下一个视频
				let displayListDown = this.displayIndex + 1 == 3 ? 0 : this.displayIndex + 1;
				let originListDown = originIndex + 1 == originListLength ? 0 : originIndex + 1;
				this.displaySwiperList[displayListDown] = this.originList[originListDown];

				// 最终列表
				console.log('最终列表', this.displaySwiperList);

				// 获取上一个视频
				if (this.originOldIndex >= this.originList.length) {
					this.originOldIndex = 0
				} else if (this.originOldIndex < 0) {
					this.originOldIndex = this.originList.length - 1
				}

				this.watchChange()
			},
			// swiper滑动的时候
			swiperChange(event) {
				const {
					current
				} = event.detail;

				const originListLength = this.originList.length; // 源数据长度

				// =============向后==========
				this.displayOldIndex = this.displayIndex;

				if (this.displayIndex - current == 2 || this.displayIndex - current == -1) {
					this.originIndex = this.originIndex + 1 == originListLength ? 0 : this.originIndex + 1;
					this.displayIndex = this.displayIndex + 1 == 3 ? 0 : this.displayIndex + 1;
					this.originOldIndex = this.originIndex - 1
					this.swiperInit(this.originIndex);
				}

				// ======如果两者的差为-2或者1则是向前滑动============
				else if (this.displayIndex - current == -2 || this.displayIndex - current == 1) {
					this.originIndex = this.originIndex - 1 == -1 ? originListLength - 1 : this.originIndex - 1;
					this.displayIndex = this.displayIndex - 1 == -1 ? 2 : this.displayIndex - 1;
					this.originOldIndex = this.originIndex + 1
					this.swiperInit(this.originIndex);
				}
			},
			// 进行视频播放
			watchChange() {
				console.log('----------上一条播放数据 Index:', this.originOldIndex, this.originList[this.originOldIndex]._id);
				console.log('----------当前要播放的视频 Index:', this.originIndex, this.originList[this.originIndex]._id);
				// 显示栏目
				this.showTab = true

				// 旧的视频进行暂停
				let oldInfo = this.originList[this.originOldIndex];
				// #ifdef MP-WEIXIN
				uni.createVideoContext('video_' + this.displayOldIndex, this).stop(); // 微信小程序
				// #endif
				// #ifndef MP-WEIXIN
				uni.createVideoContext('video_' + this.displayOldIndex, this).pause(); // 其他平台
				// #endif
				oldInfo.playStatus = 0;

				// 对当前视频处理
				let info = this.originList[this.originIndex];

				// 缓存当前已经看过的视频
				this.setStorage();

				if (info.videosInfo) {
					setTimeout(() => {
						this.$nextTick(() => {
							this.videoPlay();
						})
					}, 100)
				} else {
					// 向后台请求数据
					this.$api.movies.videosDetail.request({}, {
						url: this.$hostConfig.apiHost + '/movies/videos/' + info.id
					}).then(data => {
						console.log('-----视频详情', data)
						info.videosInfo = data;
						this.$nextTick(() => {
							this.videoPlay();
						})
					}, err => {
						info.playStatus = 10;
						this.rechargeChange();
					})
				}
			},
			videoPlay() {
				this.rechargeChange(false);

				let info = this.originList[this.originIndex];
				info.playStatus = 5;
				setTimeout(() => {
					uni.createVideoContext('video_' + this.displayIndex, this).play();
				}, 100)
			},
			// 打开/关闭充值
			rechargeChange(show) {
				this.rechargeModel.show = show;

				// 打开弹窗
				if (this.rechargeModel.show == true) {
					this.$api.goods.list.request().then(data => {
						this.rechargeModel.data = data;
					})
				}
			},
			// 商品点击
			goodsClick(item) {
				this.$api.orders.create.request({}).then(data => {
					this.$api.orders.pay.request({}).then(data => {
						this.watchChange();
					})
				})
			},
			// TODO 点赞
			linkClick() {

			},
			// 追剧点击
			followedClick() {

			},
			setStorage() {
				let info = this.originList[this.originIndex];

				if (this.moviesInfo && info) {
					uni.setStorageSync('watch', {
						cover: this.moviesInfo.cover,
						moviesId: this.moviesId,
						videosId: info.id
					})
				}
			}
		},

	};
</script>

<style lang="scss">
	page {
		background: #000000;
	}

	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60rpx;
	}

	.swiper {}

	.wrap_content {
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: gray;
		color: aqua;
		height: 100%;
		font-size: 80px;
		margin: 0rpx 40rpx;
	}

	.container {
		background-color: #000000;
	}

	.item {
		/* width : 750rpx; */
		background-color: #000000;
		position: relative;
	}

	.videoHover {
		position: absolute;
		top: 0;
		left: 0;
		flex: 1;
		background-color: rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.playState {
		width: 160rpx;
		height: 160rpx;
		opacity: 0.2;
	}

	.userInfo {
		position: absolute;
		z-index: 99;
		bottom: 20%;
		right: 10px;
		width: 100rpx;
		display: flex;
		text-align: center;
		flex-direction: column;
	}

	.userAvatar {
		border-radius: 500%;
		margin-bottom: 15px;
		border-style: solid;
		border-width: 2px;
		border-color: #ffffff;
	}

	.userAvatar {
		width: 100rpx;
		height: 100rpx;
	}

	.likeIco,
	.shareIco,
	.commentIco {
		width: 60rpx;
		height: 60rpx;
		margin-top: 15px;
	}

	.likeNum,
	.commentNum,
	.shareTex {
		color: #ffffff;
		font-size: 30rpx;
		text-align: center;
		margin: 5px;
	}

	.likeNumActive {
		color: red;
	}

	.contentcd {
		z-index: 99;
		position: absolute;
		bottom: 100rpx;
		padding: 15rpx;
		width: 720rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		color: #ffffff;
	}

	.userName {
		margin-top: 80upx;
		font-size: 30rpx;
		color: #ffffff;
	}

	.words {
		margin-top: 16rpx;
		font-size: 30rpx;
		color: #ffffff;
		margin-bottom: 20rpx;
	}

	.wordss {
		margin-top: 10rpx;
		font-size: 26rpx;
		color: #ffffff;
	}

	.root {
		background-color: #000000;
	}

	.gdfgjh {
		font-size: 30rpx;
		font-weight: 600;
		line-height: 90rpx;
		background: #fff;
		border-radius: 18rpx;
		padding: 0 20rpx;
		text-align: center;
		margin-bottom: 20rpx;
	}

	.tsvideo {
		/* animation:showDivAni 1s 1; */
	}

	@keyframes showDivAni {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.tsimg {
		/* animation:fadenum12 10s 1; */
	}

	@keyframes fadenum12 {
		0% {
			opacity: 1;
		}

		10% {
			opacity: 0.8;
		}

		100% {
			opacity: 0;
		}
	}

	.video-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		.video-item {
			position: relative;
			margin-bottom: 10rpx;
			width: 125rpx;
			height: 110rpx;
			color: #fff;
			border: 1px solid #2b2b33;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #2b2b33;
			border-radius: 20rpx;

			.pay-lock {
				position: absolute;
				top: 0;
				left: 0;
				width: 30rpx;
				height: 30rpx;
			}

			&.select {
				border: 1px solid #ff562a;
			}
		}



	}


	.goods-title {
		padding: 0 36rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #fff0ec;
		font-size: 24rpx;
	}

	.goods-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.goods-item {
		margin-top: 25rpx;
		width: 332rpx;
		height: 208rpx;
		border: 1px solid #e8e8e8;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.weChatPay-button {
		border-radius: 10rpx;
		background-color: #62d63f;
		padding: 10rpx;
		color: #fff;
		font-size: 24rpx;
	}
</style>