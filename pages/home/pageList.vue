<template>
	<view class="content">
		<pageList ref="pageList" :pageListApiRequest="abc">
			<template v-slot="{data}">
				<view v-for="(item,index) in data">
					<view class="h-500">
						{{item.a}} {{index}}
					</view>
				</view>
			</template>
		</pageList>
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
				title: 'Hello'
			}
		},
		onLoad() {
			console.log(identityStatus);
		},
		onReady() {
			this.$refs.pageList.pageListRequest();
		},
		onPullDownRefresh() {
			this.$refs.pageList.pageListRequest();
		},
		// 滑动到底部
		onReachBottom() {
			this.$refs.pageList.pageListRequest();
		},
		methods: {
			abc() {
				return new Promise((r, a) => {
					r([{
						a: 1
					}, {
						a: 2
					}, {
						a: 3
					}, {
						a: 4
					}, {
						a: 5
					}])
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>