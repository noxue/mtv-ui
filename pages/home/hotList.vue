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
		onReady() {},
		onPullDownRefresh() {},
		onReachBottom() {},
		methods: {}
	}
</script>

<style lang="scss">
	.home-page {
		.video-list {
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
		}
	}
</style>