<template>
	<view class="orderList-page page-base">
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods-item flex-row-start-center" style="border-bottom: 1px solid #f1f1f1;"
				v-for="(item,index) in pageList.data">
				<image class="w-h-80 flex-shrink-0" src="@/static/jinbi.png"></image>
				<view class="flex-1 m-l-20">
					<view class="flex-row-between-center">
						<view>{{item.mark}}</view>
						<view style="color: red;">- {{item.score}} 金币</view>
					</view>
					<view class="flex-row-between-center m-t-10" style="color: #a5a5a5;">
						<view>{{item.update_time}}</view>
					</view>
				</view>
			</view>

			<pageList :pageList="pageList"></pageList>
		</view>
	</view>
</template>

<script>
	import pageList from '@/mixin/pageList.js';
	import {
		div
	} from '@/function/bc.js';

	export default {
		mixins: [pageList],
		components: {},
		data() {
			return {}
		},
		onLoad() {},
		onReady() {},
		onPullDownRefresh() {},
		onReachBottom() {},
		methods: {
			pageListDataPageRequest(params) {
				return new Promise((r, a) => {
					this.$api.users.consumes.request(params).then(data => {
						let list = data.data.map(item => {
							item.update_time = new Date(item.create_time).toLocaleString();
							return item;
						})

						r(list)
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	.orderList-page {

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

	.goods-list {
		.goods-item {
			padding: 20rpx;
			width: 750rpx;
			background-color: #fff;
		}
	}
</style>