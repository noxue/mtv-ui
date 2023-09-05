<template>
	<view class="content">
		<navbar v-if="showTab" class="back-btn" :title="'返回'"></navbar>

		<swiper :style="'width: '+ windowWidth +'px; height:100vh; background-color: #000;'" class="swiper" circular
			@change="swiperChange" :current="displayIndex" :vertical="true" duration="300">

			<swiper-item v-for="(list, index) in displaySwiperList" :key="index"
				:style="'width: '+ windowWidth +'px; height:100vh; background-color: #000;'">
				<view :style="'width: '+ windowWidth +'px; height:'+heightxw+'vh;'">

					<!-- 视频  v-if="index == displayIndex" :autoplay="true"-->
					<video v-if="index == displayIndex" :id="'video_' + index" :controls="false" :loop="false"
						:enable-progress-gesture="false" :show-center-play-btn="true" :show-loading="true"
						:show-fullscreen-btn="false" @ended="videoEnd" @click="tapVides()" @pause="playStatusChange(2)"
						@play="playStatusChange(1)" :style="'width: '+ windowWidth +'px; height:'+heightxw+'vh; z-index: 1'"
						:poster="moviesInfo.cover" @timeupdate="timeupdate($event,index)"
						:src="list.videosInfo && list.videosInfo.video" :autoplay="true" class="tsvideo" x5-video-player-type="h5"
						x5-video-player-fullscreen="true" webkit-playsinline="true" playsinline>
					</video>

					<!-- 视频不存在的时候弹出 -->
					<view v-if="index != displayIndex || !list.videosInfo || playStatus == 0 " class="videoHover tsimg"
						@click.stop="watchChange" :style="'width: '+ windowWidth +'px; height:'+heightxw+'vh;z-index:10;'">
						<imageUrl :src="moviesInfo.cover"
							:style="'width: 100vw; height:'+heightxw+'vh; background-color: #000; position: absolute;'">
						</imageUrl>
						<image class="playState" src="@/static/play.png"></image>
					</view>

					<!-- 显示栏目 -->
					<template v-if="showTab">
						<!-- 右侧 -->
						<view class="userInfo">
							<!-- 点赞 -->
							<view @click.stop="linkClick" class="flex-column-center-center" style="opacity: 0.9; margin-top: 17px;">
								<image v-if="list.videosInfo && list.videosInfo.is_liked == true" src="@/static/aixinRed.png"
									style="width: 60rpx; height: 50rpx;"></image>
								<image v-else src="@/static/aixin.png" style="width: 60rpx; height: 50rpx;">
								</image>
								<text style=" color: #FFFFFF; margin-top: 5px; font-size: 14px; text-align: center;font-weight: bold;"
									:class="{'likeNumActive':list.like}">{{likes}}</text>
							</view>
							<!-- 追剧 -->
							<view @click.stop="followedClick" class="flex-column-center-center"
								style="opacity: 0.9; margin-top: 17px;">
								<image v-if="list.videosInfo && list.videosInfo.is_followed == true" src="@/static/zhuiJu-select.png"
									class="w-h-60">
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
								{{moviesInfo.description}}
							</text>
							<text class="words" :style="'width: '+ (windowWidth - 90) +'px;'">
								{{list.name}} 共{{originList.length}}集 <text class="font-36 m-l-10 select-video">选集></text>
							</text>
						</view>

						<!-- 进度条 -->
						<view class="flex-row-start-center" style="position: absolute; bottom: 50rpx;z-index: 10;">
							<!-- @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" -->
							<view
								:style="'width: '+ (windowWidth - (windowWidth*0.20)) +'px; margin-left: '+ (windowWidth * 0.05) +'px;'">
								<!-- 不拖动情况下 -->
								<view style="width: 100%;height: 10rpx;position: relative;">
									<!-- 1.底部背景进度条 -->
									<view
										:style="'width: '+ (windowWidth - (windowWidth*0.20)) +'px;  height: 5px; border-radius: 10px; background-color: #999999; opacity: 0.6;'">
									</view>
									<!-- 2.播放的进度条 -->
									<view v-if="!isTouch"
										:style="'width: '+ ((windowWidth - (windowWidth*0.20)) * progressBarPercent) +'px; position: absolute;top:0rpx;   height: 5px; border-radius: 10px; background-color: #e6e4e7; '">
									</view>
									<!-- 3.拖动时的进度条 -->
									<view v-if="isTouch"
										:style="'width: '+ (videoStartPositon + addPositon) +'px; position: absolute; top:0rpx;  height: 5px; border-radius: 10px; background-color: #e6e4e7; '">
									</view>
								</view>
							</view>
							<view class="w-40 h-50 m-l-30" style="flex-shrink:0;" @click.stop="videoChange">
								<image v-if="playStatus == 0 || playStatus == 2" class="w-h-full" src="@/static/play.png"></image>
								<image v-if="playStatus == 1" class="w-h-full" src="@/static/play-pause.png"></image>
							</view>
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
							<view v-if="index != originIndex">{{index + 1}}</view>
							<image v-else class="w-h-70" src="../../static/playing.png"></image>
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
							<view>解锁本集: {{originList[originIndex] ? originList[originIndex].price : '0'}}金币</view>
							<view>账号余额: {{userInfo.score}}金币</view>
						</view>
						<view class="weChatPay-button">
							微信支付
						</view>
					</view>
					<view class="goods-list">
						<view v-for="(item,index) in rechargeModel.data" :key="index" @click="goodsClick(item)" class="goods-item"
							:class="{'hot-1':item.is_hot == true}">
							<view class="hot-sign p-top-right" v-if="item.is_hot == true">
								特惠
							</view>
							<view class="font-34">
								{{item.price}}<text style="font-size: 24rpx;margin-left: 5rpx;">元</text>
							</view>
							<view v-if="item.description" class="font-25 m-t-15" style="color:#777777;">
								{{item.description}}
							</view>
							<view class="font-25 m-t-15 w-full goods-bottom" :class="{'hot-2':item.is_hot == true}"
								style="color:#fe5000;border-top:1px solid #f1f1f1;text-align: center;height: 60rpx;line-height: 1em;display: flex;align-items: center;justify-content: center;">
								{{item.name}}
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
	import userServe from '@/serve/userServe.js';
	import {
		div
	} from '@/function/bc.js';
	import {
		appid
	} from '@/config/config.js'

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
				isAutoPaly: true, // 是否自动播放下一个视频
				nodate: true, //true 有数据 
				showTab: true,
				rechargeModel: { // 充值相关东西
					show: false,
					data: []
				},
				goodsIndex: 'goods_1', // 视频滑动位置
				safeArea: 0, // 安全区配置
				heightxw: 100, // 安全区配置
				playStatus: 0, // 播放状态
				isH5: 0,
				progressBarPercent: 0, // 进度条
				videoStartPositon: 0,
				touchStartPosition: 0,
				addPositon: 0,
				isTouch: false
			};
		},
		computed: {
			likes() {
				let num1 = this.moviesInfo.vlikes || 0;
				let num2 = (this.originList[this.originIndex] && this.originList[this.originIndex].videosInfo && this.originList[
					this.originIndex].videosInfo.likes) || 0
				return num1 + num2;
			}
		},
		onLoad(e) {
			console.log('这查票在要', e);
			// 短视频id
			if (e.mid || e.moviesId) {
				this.moviesId = parseInt(e.mid || e.moviesId)
			}
			// 视频id
			if (e.vid || e.videosId) {
				this.videosId = parseInt(e.vid || e.videosId)
			}

			// 未登录
			if (userServe.checkUserLogin() == false) {
				userServe.userLogin(e.code, `/pages/home/video?moviesId=${this.moviesId}&videosId=${this.videosId}`).then(
					data => {
						this.getUserInfo();
						this.getMoviesDetail();
						this.getVideosList();
					})
			} else {
				this.getUserInfo();
				this.getMoviesDetail();
				this.getVideosList();
			}

			this.windowWidth = uni.getSystemInfoSync().windowWidth

			// 获取安全区 视频是不需要安全区的，只有文字啥的需要 TODO
			uni.getSystemInfo({
				success: res => {
					this.safeArea = res.safeAreaInsets.bottom;
					if (this.safeArea > 0) {
						this.heightxw = 97
					}
				}
			})
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
			getUserInfo() {
				this.$api.users.me.request().then(data => {
					this.userInfo = data;
				})
			},
			// 获取短剧详情
			getMoviesDetail() {
				this.$api.movies.detail.request({}, {
					url: this.$hostConfig.apiHost + '/' + 'movies/' + this.moviesId
				}).then((data) => {
					this.moviesInfo = data;
					this.setStorage();
				})
			},
			// 获取视频列表
			getVideosList() {
				this.originList = []

				this.$api.movies.videos.request({}, {
					url: this.$hostConfig.apiHost + '/' + 'movies/' + this.moviesId + '/videos'
				}).then(data => {
					// 如果数据为空
					let list = data;
					if (list.length > 0) {
						let selectIndex = -1;
						for (let i = 0; i < list.length; i++) {
							list[i]._id = 'video_' + list[i].id;
							list[i].videosInfo = null;

							if (list[i].id == this.videosId) {
								selectIndex = i;
							}

							this.originList.push(list[i])
						}

						// 首次计算播放视频
						if (selectIndex > 0) {
							this.originIndex = selectIndex || 0;
						} else {
							this.originIndex = 0;
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
				console.log('点击事件', this.playStatus);

				if (this.isH5 == 0) {
					this.rechargeChange(false);

					let info = this.originList[this.originIndex];
					setTimeout(() => {
						uni.createVideoContext('video_' + this.displayIndex, this).play();
					}, 100)
				} else {
					this.showTab = !this.showTab
				}

				// // #ifdef H5
				// if (this.isH5 == false) {
				// 	this.isH5 = true;
				// 	// this.videoPlay();

				// 	this.rechargeChange(false);

				// 	let info = this.originList[this.originIndex];
				// 	setTimeout(() => {
				// 		uni.createVideoContext('video_' + this.displayIndex, this).play();
				// 	}, 100)
				// } else {
				// 	this.showTab = !this.showTab
				// }
				// // #endif
				// // #ifndef H5
				// this.showTab = !this.showTab
				// // #endif
			},
			// 切换视频
			vidoeWitch(index) {
				this.originIndex = index
				this.swiperInit(index);

				this.originListModel = false;
			},
			// 视频结束
			videoEnd() {
				console.log('视频播放结束');
				// 自动切换下一个视频
				if (this.isAutoPaly) {
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

				this.progressBarPercent = 0;

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
				uni.createVideoContext('video_' + 0, this).seek(0);
				uni.createVideoContext('video_' + 1, this).seek(0);
				uni.createVideoContext('video_' + 2, this).seek(0);

				// #ifdef MP-WEIXIN
				uni.createVideoContext('video_' + 0, this).stop(); // 微信小程序
				uni.createVideoContext('video_' + 1, this).stop(); // 微信小程序
				uni.createVideoContext('video_' + 2, this).stop(); // 微信小程序
				// #endif
				// #ifndef MP-WEIXIN
				uni.createVideoContext('video_' + 0, this).pause(); // 其他平台
				uni.createVideoContext('video_' + 1, this).pause(); // 其他平台
				uni.createVideoContext('video_' + 2, this).pause(); // 其他平台
				// #endif

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
						console.log('进到异常界面')
						this.rechargeChange(true);
					})
				}
			},
			videoPlay() {
				this.rechargeChange(false);

				let info = this.originList[this.originIndex];
				this.playStatus = 0;

				setTimeout(() => {
					// #ifdef MP
					uni.createVideoContext('video_' + this.displayIndex, this).seek(0);
					uni.createVideoContext('video_' + this.displayIndex, this).play();
					// #endif

					// #ifdef H5
					if (typeof WeixinJSBridge == "undefined") {
						uni.createVideoContext('video_' + this.displayIndex, this).seek(0);
						uni.createVideoContext('video_' + this.displayIndex, this).play();
					} else {
						WeixinJSBridge.invoke('getNetworkType', {}, e => {
							uni.createVideoContext('video_' + this.displayIndex, this).seek(0);
							uni.createVideoContext('video_' + this.displayIndex, this).play();
						})
					}
					// #endif
				}, 100)
			},
			videoChange() {
				console.log('视频播放变化');
				if (this.playStatus == 0 || this.playStatus == 2) {
					uni.createVideoContext('video_' + this.displayIndex, this).play();
				} else {
					// #ifdef MP-WEIXIN
					uni.createVideoContext('video_' + this.displayIndex, this).stop(); // 微信小程序
					// #endif
					// #ifndef MP-WEIXIN
					uni.createVideoContext('video_' + this.displayIndex, this).pause(); // 其他平台
					// #endif

					this.playStatus == 2
				}
			},
			// 打开/关闭充值
			rechargeChange(show) {
				this.rechargeModel.show = show;

				// 打开弹窗
				if (this.rechargeModel.show == true) {
					this.$api.goods.list.request().then(data => {
						this.rechargeModel.data = data.map(item => {
							item.price = div(item.price, 100)
							return item
						});
					})
				}
			},
			// 商品点击
			goodsClick(item) {
				this.$api.orders.create.request({
					'goods_id': item.id
				}).then(data => {
					let orderNo = data.order_no;
					this.$api.orders.pay.request({
						"order_no": orderNo,
						"openid": this.$userServe.getUserInfo('openid')
					}).then(data => {
						// #ifdef H5
						this.wxH5Pay(data).then(() => {
							this.paySuccess(orderNo);
						});
						// #endif

						// #ifndef H5
						this.wxPay(data).then(() => {
							this.paySuccess(orderNo);
						})
						// #endif
					})
				})
			},
			wxH5Pay(payData) {
				let _this = this;

				// if (typeof WeixinJSBridge == "undefined") {
				// 	if (document.addEventListener) {
				// 		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				// 	} else if (document.attachEvent) {
				// 		document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
				// 		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				// 	}
				// } else {
				// 	onBridgeReady();
				// }

				return new Promise((r, a) => {
					WeixinJSBridge.invoke(
						'getBrandWCPayRequest', {
							"appId": appid, //公众号名称，由商户传入     
							"timeStamp": payData.timestamp, //时间戳，自1970年以来的秒数     
							"nonceStr": payData.nonce_str, //随机串     
							"package": 'prepay_id=' + payData.prepay_id,
							"signType": payData.pay_sign, //微信签名方式：     
							"paySign": payData.pay_sign //微信签名 
						},
						function(res) {
							console.log('支付结果', res)

							if (res.err_msg == "get_brand_wcpay_request:ok") {
								r();
							} else if (res.err_msg.indexOf('cancel') > -1) {
								uni.showToast({
									title: '支付取消,返回首页',
									icon: 'none'
								});

								setTimeout(() => {
									uni.switchTab({
										url: '/pages/home/home'
									})
								}, 1500)
							} else {
								uni.showModal({
									content: '支付失败,原因为: ' + res.err_msg,
									showCancel: false
								});

								a();
							}
						});
				});
			},
			wxPay(payData) {
				return new Promise((r, a) => {
					let appid;
					let sysInfo = uni.getAccountInfoSync();
					if (sysInfo && sysInfo.miniProgram && sysInfo.miniProgram.appId) {
						appid = sysInfo.miniProgram.appId;
					} else {
						appid = appid;
					}

					uni.requestPayment({
						appId: appid,
						signType: payData.sign_type,
						nonceStr: payData.nonce_str,
						package: 'prepay_id=' + payData.prepay_id,
						paySign: payData.pay_sign,
						timeStamp: payData.timestamp,
						success: e => {
							console.log('pay:[success] ===>', e);
							r();
						},
						fail: e => {
							console.log('pay:[fail] ===>', e);
							// 支付取消的弹轻提示
							if (e.errMsg.indexOf('cancel') > -1) {
								uni.showToast({
									title: '支付取消,返回首页',
									icon: 'none'
								});

								setTimeout(() => {
									uni.switchTab({
										url: '/pages/home/home'
									})
								}, 1500)
							} else {
								uni.showModal({
									content: '支付失败,原因为: ' + e.errMsg,
									showCancel: false
								});
							}
							a();
						},
						complete: () => {}
					});
				});
			},
			paySuccess(orderId) {
				let time = 0;

				let timer = setInterval(() => {
					time++;

					if (time >= 4) {
						clearInterval(timer);
						this.watchChange();
						return false;
					}

					this.$api.orders.check.request({}, {
						url: this.$hostConfig.apiHost + '/' + 'orders/' + orderId + '/pay/check'
					}).then(data => {
						clearInterval(timer);
						this.watchChange();
					})
				}, 1000)
			},
			// 状态发生变化
			playStatusChange(data) {
				console.log('状态发生变化', data);
				this.playStatus = data;
				this.isH5 = 1;
			},
			// 点赞
			linkClick() {
				let info = this.originList[this.originIndex].videosInfo;

				this.$api.movies.like.request({
					movie_id: this.moviesInfo.id,
					video_id: info.id,
					like: !info.is_liked
				}).then(data => {
					info.is_liked = !info.is_liked

					if (info.is_liked == true) {
						info.likes = info.likes + 1
					} else if (info.is_liked == false) {
						info.likes = info.likes - 1
					}
				})
			},
			// 追剧
			followedClick() {
				let info = this.originList[this.originIndex].videosInfo;

				this.$api.movies.follow.request({
					movie_id: this.moviesInfo.id,
					video_id: info.id,
					follow: !info.is_followed
				}).then(data => {
					info.is_followed = !info.is_followed
				})
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
			},
			timeupdate(event, index) {
				console.log('时间发生变化', )
				this.timeduration = event.detail.duration;
				this.progressBarPercent = parseFloat(Number(event.detail.currentTime / event.detail.duration));
			},
			// ---- 进度条相关 --- start
			touchstart(e) {
				// console.log(e);
				this.isTouch = true;
				// #ifdef H5
				if (this.isClick) {
					this.addPositon = 0;
					this.videoStartPositon = (this.windowWidth - (this.windowWidth * 0.20)) * this.progressBarPercent;
					this.touchStartPosition = e.changedTouches[0].clientX;
				}
				// #endif
				// #ifdef MP
				this.addPositon = 0;
				this.videoStartPositon = (this.windowWidth - (this.windowWidth * 0.20)) * this.progressBarPercent;
				this.touchStartPosition = e.changedTouches[0].clientX;
				// #endif
			},
			touchmove(e) {
				// console.log(e);
				// #ifdef H5
				if (this.isClick) {
					let num = e.changedTouches[0].clientX - this.touchStartPosition;
					if ((this.videoStartPositon + num) <= (this.windowWidth - (this.windowWidth * 0.20))) {
						this.addPositon = e.changedTouches[0].clientX - this.touchStartPosition;
					} else {
						this.addPositon = 0;
						this.videoStartPositon = (this.windowWidth - (this.windowWidth * 0.20));
					}
				}
				// #endif
				// #ifdef MP
				let num = e.changedTouches[0].clientX - this.touchStartPosition;
				if ((this.videoStartPositon + num) <= (this.windowWidth - (this.windowWidth * 0.20))) {
					this.addPositon = e.changedTouches[0].clientX - this.touchStartPosition;
				} else {
					this.addPositon = 0;
					this.videoStartPositon = (this.windowWidth - (this.windowWidth * 0.20));
				}
				// #endif
			},
			touchend(e) {
				// #ifdef H5
				if (this.isClick) {
					let per = Number((this.videoStartPositon + this.addPositon) / (this.windowWidth - (this.windowWidth * 0.20)));
					let timeSubmit = parseInt(this.timeduration * per)

					uni.createVideoContext('video_' + this.displayIndex, this).seek(timeSubmit)
					uni.createVideoContext('video_' + this.displayIndex, this).play()
					setTimeout(() => {
						this.isTouch = false;
					}, 500)
				}
				// #endif
				// #ifdef MP
				let per = Number((this.videoStartPositon + this.addPositon) / (this.windowWidth - (this.windowWidth * 0.20)));
				let timeSubmit = parseInt(this.timeduration * per)

				uni.createVideoContext('video_' + this.displayIndex, this).seek(timeSubmit)
				uni.createVideoContext('video_' + this.displayIndex, this).play()
				setTimeout(() => {
					this.isTouch = false;
				}, 500)
				// #endif
			},
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
		z-index: 10;
		width: 120rpx;
		height: 120rpx;
		opacity: 0.5;
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
		// width: 720rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		color: #ffffff;
	}

	.userName {
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
		position: relative;
		margin-top: 25rpx;
		padding-top: 20rpx;
		width: 332rpx;
		border: 1px solid #e8e8e8;
		border-radius: 20rpx;
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

	.hot-1 {
		background-color: rgb(249, 233, 243);
		color: #000;
	}

	.hot-2 {
		background-color: rgb(251, 103, 161);
		color: #fff !important;
	}

	.hot-sign {
		background-color: rgb(253, 0, 3);
		border: 1px solid #be3c44;
		padding: 2rpx 4rpx;
		color: #fff;
		border-radius: 15rpx;
		right: -10rpx;
		top: -10rpx;
	}

	.goods-bottom {
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}

	.select-video {
		font-weight: 900;

	}

	.back-btn {
		font-weight: 900;
	}
</style>