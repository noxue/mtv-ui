<template>
	<view class="loveList-page page-base">
		<view class="goods-list m-t-200">
			<view class="goods-item" v-for="(item,index) in list">
				<image class="w-180 h-200" :src="item.cover"></image>
				<view class="m-l-15 flex-column-center flex-1">
					<view class="font-28" style="font-weight: 700;">{{item.movie_name}}</view>
					<view class="flex-row m-t-10">看到<view class="m-l-5" style="color:#fd9261;">第TODO集</view>
					</view>
		<!-- 			<view class="flex-row m-t-10">更新至<view class="m-l-5" style="font-weight: 700;">第TODO集</view>
					</view> -->
				</view>
				<image class="w-55 h-50 m-r-20" src="@/static/play-icon.png" @click="pageListItemRemove(item)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	// 我喜欢
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
				this.$api.users.recents.request().then(data => {
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