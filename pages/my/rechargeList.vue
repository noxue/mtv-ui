<template>
	<view class="orderList-page page-base">
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods-item" v-for="(item,index) in 10">
				<view class="flex-row-between-center p-tb-10">
					<view>订单号:</view>
					<view>状态码</view>
				</view>
				<view class="flex-row-start-center m-t-20">
					<image class="w-h-130  bR-20" src="../../static/logo.png"></image>
					<view class="m-l-20">
						<view>商品名称:xxxxxxxxx</view>
						<view>赠送金币:xxxxxxxxx</view>
						<view>支付日期:xxxxxxxxx</view>
					</view>
				</view>
			</view>
			<!-- <emptyBottom></emptyBottom> -->
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				list: [],
				value1: 1,
				options1: [{
						label: '商品名称',
						value: 1,
					},
					{
						label: '订单编号',
						value: 2,
					},
					{
						label: '办理号码',
						value: 3,
					}
				],
				value2: 2,
				options2: [{
						label: '全部状态',
						value: 1,
					},
					{
						label: '下单成功',
						value: 2,
					},
					{
						label: '激活成功',
						value: 3,
					},
					{
						label: '充值成功',
						value: 4,
					},
					{
						label: '下单失败',
						value: 5,
					},
				],
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
	.orderList-page {
		padding: 0rpx 20rpx;

		.saerch-view {
			display: flex;
			align-items: center;

			.search-input {
				flex: 1;
				padding: 0 9px;
				height: 35px;
				background-color: rgb(242, 242, 242);
				border-radius: 55px;
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.search-text {
				margin-left: 20rpx;
			}
		}
	}
	
	.goods-list{
		.goods-item{
			margin-bottom: 20rpx;
			padding: 20rpx;
			width: 700rpx;
			border-radius: 20rpx;
			background-color: #fff;
		}
	}
</style>