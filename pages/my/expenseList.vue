<template>
	<view class="loveList-page page-base">
		<view class="goods-list m-t-200">
			<view class="goods-item" v-for="(item,index) in list" @click="$wxRouter.toPage('/pages/home/video')">
				<view class="w-180 h-240" style="position: relative;">
					<image class="w-h-full" :src="item.cover || '/static/logo.png'"></image>
				</view>
				<view class="m-l-15 flex-column-center flex-1">
					<view class="font-28" style="font-weight: 700;">{{item.movie_name}}</view>
					<view class="m-t-10 flex-row">
						购买<view class="m-l-5" style="color: red;">第1集</view>
					</view>
					<!-- <view class="p-bottom-right">全部</view> -->
				</view>
				<view>
					4.29
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 我的追剧
	export default {
		components: {},
		data() {
			return {
				list: [],
			}
		},
		onLoad() {
			this.pageDataGet();
		},
		onReady() {},
		onPullDownRefresh() {},
		onReachBottom() {},
		methods: {
			pageDataGet() {
				this.$api.users.follows.request().then(data => {
					this.list = data;
					console.log(this.list);
				});
			},
			pageListDataPageRequest() {
				return this.$api.getBanner();
			}
		}
	}
</script>

<style lang="scss">
	.loveList-page {
		padding: 0rpx 20rpx;

		.goods-list {
			.goods-item {
				margin-top: 15rpx;
				display: flex;
				align-items: center;
			}
		}
	}
</style>