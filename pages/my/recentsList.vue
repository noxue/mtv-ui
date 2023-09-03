<template>
	<view class="loveList-page page-base">
		<view class="goods-list m-t-200">
			<view class="goods-item" v-for="(item,index) in pageList.data"
				@click="$wxRouter.toPage('/pages/home/video?mid=' + item.id +'&vid=' + item.video_id)">
				<imageUrl class="w-180 h-250" :src="item.cover"></imageUrl>
				<view class="m-l-15 flex-column-center flex-1">
					<view class="font-28" style="font-weight: 700;">{{item.movie_name}}</view>
					<view class="flex-row m-t-10">看到<view class="m-l-5" style="color:#fd9261;">{{item.video_name}}</view>
					</view>
					<!-- 		<view class="flex-row m-t-10">更新至<view class="m-l-5" style="font-weight: 700;">{{item.video_name}}</view>
					</view> -->
				</view>
				<image class="w-55 h-50 m-r-20" src="@/static/play-icon.png" @click.stop="pageListItemRemove(item)"></image>
			</view>
		</view>

		<pageList :pageList="pageList"></pageList>
	</view>
</template>

<script>
	import pageList from '@/mixin/pageList.js';

	// 观看历史
	export default {
		mixins: [pageList],
		components: {},
		data() {
			return {}
		},
		onLoad() {},
		methods: {
			pageListDataPageRequest(params) {
				return new Promise((r, a) => {
					this.$api.users.recents.request(params).then(data => {
						r(data)
					})
				})
			},
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