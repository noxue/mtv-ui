<template>
	<view class="empty-view">
		<block v-if="type == 'order'">
			<!-- <image class="image-bg" src="@/static/images/empty-data.png"></image> -->
			<view class="text">暂无订单</view>
		</block>
		<block v-else>
			<!-- <image class="image-bg" src="@/static/images/empty-data.png"></image> -->
			<view class="text">暂无内容</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'emptyData',
		props: {
			type: {
				type: String,
				default: 'default'
			}
		},
		data() {
			return {};
		},
		methods: {}
	};
</script>

<style lang="scss" scoped>
	.empty-view {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.image-bg {
			width: 419rpx;
			height: 274rpx;
		}

		.text {
			margin-top: 40rpx;
			font-size: 24rpx;
			color: #999999;
			text-align: center;
		}
	}
</style>