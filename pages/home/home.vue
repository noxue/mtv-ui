<template>
	<view class="home-page page-base p-20">
		<!-- 顶部导航 -->
		<view class="tab-list flex-row-between-center" style="justify-content:space-evenly;">
			<view class="tab-item" @click="orderClick('hot')">
				<image class="w-h-80" src="@/static/home-hot.png"></image>
				<view class="tab-text">热门</view>
			</view>
			<view class="tab-item" @click="orderClick('update_time')">
				<image class="w-h-80" src="@/static/home-new.png"></image>
				<view class="tab-text">最新</view>
			</view>
			<view class="tab-item" @click="orderClick('top')">
				<image class="w-h-80" src="@/static/home-tuijian.png"></image>
				<view class="tab-text">推荐</view>
			</view>
		</view>

		<!-- 视频列表 -->
		<view class="video-list m-t-25 flex-row-between-center flex-wrap">
			<view v-for="(item,index) in pageList.data" :key="index"
				@click="$wxRouter.toPage('/pages/home/video?mid=' + item.id)" class="video-item">
				<imageUrl class="w-345 h-540" :src="item.cover"></imageUrl>
				<view class="flex-row-start-center p-lr-20 h-70">
					<view v-if="item.is_hot" class="hot">热门</view>
					<view class="name text-line-1">{{item.name}}</view>
				</view>
			</view>
		</view>
		<pageList :pageList="pageList"></pageList>

		<!-- 继续观看 -->
		<view v-if="continueWatch" class="continueWatch"
			:class="{'anim-close':continueWatchShow == false,'anim-open':continueWatchShow == true}" @click="toContinueWatch">
			<image class="w-h-full" style="position: absolute;left: 0;top: 0;z-index: 2;"
				src="../../static/home-jixuguankan.png"></image>
			<imageUrl class="w-h-full bR-30" style="position: absolute;left: 0;top: 0;z-index: 1;overflow: hidden;"
				:src="continueWatch.cover"></imageUrl>
		</view>
	</view>
</template>

<script>
	import pageList from '@/mixin/pageList.js';

	export default {
		mixins: [pageList],
		data() {
			return {
				options: {},
				continueWatch: null,
				continueWatchShow: true,
				type: '', // hot top like view update_time price
				order: false, // true = desc
			}
		},
		onLoad(options) {
			console.log('登录', options)
			this.options = options;
		},
		onShow(e) {
			this.continueWatch = uni.getStorageSync('watch');

			// 用户进行登录
			if (this.$userServe.checkUserLogin() == false) {
				this.$userServe.userLogin(this.options.code).then(data => {
					this.$userServe.userSetChannel();
				})
			}
		},
		onReady() {},
		onPullDownRefresh() {},
		onReachBottom() {},
		onPageScroll(e) {
			if (e.scrollTop > 250) {
				this.continueWatchShow = false;
			}
		},
		methods: {
			orderClick(type, order) {
				this.type = type;
				this.order = order;

				this.pageListRequest('reset');
			},
			pageListDataPageRequest() {
				return new Promise((r, a) => {
					this.$api.movies.list.request({}, {
						url: this.$hostConfig.apiHost + '/' + 'movies?' + this.type +
							(this.order == true ? '＆desc' : '')
					}).then(data => {
						console.log('获取数据', data)
						r(data.data)
					})
				})
			},
			continueWatchChange() {
				this.continueWatchShow = !this.continueWatchShow
			},
			toContinueWatch() {
				this.$wxRouter.toPage('/pages/home/video', {
					moviesId: this.continueWatch.moviesId,
					videosId: this.continueWatch.videosId,
				})
			},

		}
	}
</script>

<style lang="scss">
	.home-page {
		.tab-list {
			position: fixed;
			top: 0rpx;
			/* #ifdef H5 */
			top: 0px;
			/* #endif */
			left: 0;
			width: 100%;
			padding: 20rpx 0 5rpx 0rpx;
			background-color: #fff;
			z-index: 2;

			.tab-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}

		.video-list {
			margin-top: 126rpx;
		}

		.video-item {
			margin-top: 20rpx;
			width: 345rpx;
			border-radius: 20rpx;
			background-color: #fff;
			box-shadow: 0rpx 6rpx 16rpx 6rpx #dadada;
			overflow: hidden;
			font-size: 0rpx;

			.hot {
				margin-right: 10rpx;
				width: 70rpx;
				height: 30rpx;
				font-size: 24rpx;
				line-height: 24rpx;
				color: #fff;
				background-color: #b3f10d;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.name {
				color: #000;
				flex: 1;
				font-size: 24rpx;
			}
		}

		.continueWatch {
			position: fixed;
			bottom: 40rpx;
			/* #ifdef H5 */
			bottom: 60px;
			/* #endif */
			left: 0rpx;
			width: 180rpx;
			height: 270rpx;
			// border-radius: 30rpx;
			overflow: hidden;
			transition-duration: 1s;

			&.anim-close {
				transform: translateX(-150rpx);
			}

			&.anim-open {
				transform: translateX(0rpx);
			}
		}
	}
</style>