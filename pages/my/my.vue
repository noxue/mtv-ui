<template>
	<view class="my-page page-base p-lr-35">
		<!-- 已经登录 -->
		<view class="flex-row-start-center m-t-20">
			<image class="w-h-120" :src="userInfo.avatar || '/static/my.png'"></image>
			<view class="m-l-20">
				<view class="font-34" style="color: #333333;">{{userInfo.nickname || '微信用户'}}</view>
				<view class="font-22 m-t-15" style="color: #999999;">用户ID:{{userInfo.id || ''}}</view>
			</view>
		</view>

		<view class="my-top m-t-20">
			<!-- tab列表 -->
			<view class="flex-row-between-center" style="justify-content:space-around;">
				<view class="flex-column-start-center">
					<view style="color:#ff7426;">{{userInfo.score || 0}}</view>
					<view class="m-t-5" style="color:#999999;">我的金币</view>
				</view>
				<!-- <view class="pay-button" @click="$wxRouter.toPage('/pages/index/index')">
					<view>充值金币</view>
				</view> -->
			</view>
		</view>

		<!-- 导航栏目 -->
		<view class="tab-list m-t-20">
			<!-- 	<view class="tab-item" @click="$wxRouter.toPage('/pages/my/loveList')">
				<image class="tab-icon" src="@/static/logo.png"></image>
				<view class="tab-text">我的喜欢</view>
				<image class="tab-arrows" src="@/static/logo.png"></image>
			</view> -->
			<view class="tab-item" @click="$wxRouter.toPage('/pages/my/recentsList')">
				<image class="w-45 h-40" src="@/static/my-1.png"></image>
				<view class="tab-text">观看历史</view>
				<image class="tab-arrows" src="@/static/jiantou-you.png"></image>
			</view>
			<view class="tab-item" @click="$wxRouter.toPage('/pages/my/followsList')">
				<image class="w-45 h-40" src="@/static/my-3.png"></image>
				<view class="tab-text">我的追剧</view>
				<image class="tab-arrows" src="@/static/jiantou-you.png"></image>
			</view>
			<view class="tab-item" @click="$wxRouter.toPage('/pages/my/rechargeList')">
				<image class="w-40 h-40" src="@/static/my-4.png"></image>
				<view class="tab-text">充值记录</view>
				<image class="tab-arrows" src="@/static/jiantou-you.png"></image>
			</view>
			<view class="tab-item" @click="$wxRouter.toPage('/pages/my/expenseList')">
				<image class="w-45 h-40" src="@/static/my-5.png"></image>
				<view class="tab-text">消费记录</view>
				<image class="tab-arrows" src="@/static/jiantou-you.png"></image>
			</view>
			<view class="tab-item" style="position: relative;">
				<button class="opacityButton" open-type="contact"></button>
				<image class="tab-icon" src="@/static/my-6.png"></image>
				<view class="tab-text">联系客服</view>
				<image class="tab-arrows" src="@/static/jiantou-you.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import userServe from '@/serve/userServe.js';

	export default {
		components: {},
		data() {
			return {
				isLogin: false,
				userInfo: {}
			}
		},
		onLoad() {},
		onShow() {
			// 检查用户登录信息
			let isLogin = userServe.checkUserLogin();
			if (isLogin) this.isLogin = true;

			this.pageDataGet();
		},
		onReady() {},
		onPullDownRefresh() {},
		onReachBottom() {},
		methods: {
			pageDataGet() {
				this.$api.users.me.request().then(data => {
					console.log(data);
					this.userInfo = data;
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.my-top {
		padding: 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
	}

	.tab-list {
		background-color: #fff;

		.tab-item {
			padding: 0 40rpx 0 40rpx;
			height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			line-height: 32rpx;
			color: #3b4144;

			.tab-icon {
				width: 40rpx;
				height: 40rpx;
			}

			.tab-text {
				margin-left: 20rpx;
				flex: 1;
			}

			.tab-arrows {
				width: 24rpx;
				height: 32rpx;
			}
		}
	}

	.pay-button {
		width: 170rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 30rpx;
		background-color: #ff7426;
		color: #fff;
		line-height: 1em;
	}
</style>