<template>
	<view class="home-page page-base p-20">
		<!-- 视频列表 -->
		<view class="video-list flex-row-between-center flex-wrap">
			<view v-for="(item,index) in 20" class="video-item">
				<image class="w-345 h-550" src="@/static/logo.png"></image>
				<view class="flex-row-start-center p-lr-20 h-70">
					<view class="hot">热门</view>
					<view class="name text-line-1">我是好个我是好个局我是好个局我是好个局局</view>
				</view>
			</view>
		</view>

		<!-- 继续观看 -->
		<view class="continueWatch">
			<!-- <image class="w-h-full" src="../../static/logo.png"></image> -->
		</view>
	</view>
</template>

<script>
	import pageList from '@/components/base/pageList.vue';
	import identityStatus from '@/constant/identityStatus.js';

	export default {
		components: {
			pageList
		},
		data() {
			return {
				title: 'Hello',
				list: []
			}
		},
		onLoad() {},
		onReady() {
			// this.$refs.pageList.pageListRequest();
		},
		onPullDownRefresh() {
			// this.$refs.pageList.pageListRequest();
		},
		// 滑动到底部
		onReachBottom() {

		},
		methods: {}
	}
</script>

<style lang="scss">
	.home-page {
		.tab-list {
			position: fixed;
			top: 44px;
			left: 0;
			width: 100%;
			// height: 126rpx;
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
		}

		.video-item {
			margin-top: 20rpx;
			width: 345rpx;
			height: 620rpx;
			border-radius: 20rpx;
			background-color: #fff;
			box-shadow: 0rpx 6rpx 16rpx 6rpx #dadada;
			overflow: hidden;
			font-size: 0rpx;

			.hot {
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
				margin-left: 10rpx;
				color: #000;
				flex: 1;
				font-size: 24rpx;
			}
		}

		.continueWatch {
			position: fixed;
			bottom: 60px;
			left: 0rpx;
			width: 180rpx;
			height: 270rpx;
			border-radius: 10rpx;
			background-color: red;
		}
	}
</style>