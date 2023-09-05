<template>
	<view class="navbar flex-row-start-center" style="position: fixed;clear: #fff;"
		:style="{ top: top + 'px', height: height + 'px', width: width }">
		<view style="line-height: 1em;" class="m-l-40 flex-row-start-center font-34" @click="toBack">
			<image src="@/static/back.png" class="w-18 h-30"></image>
			<view class="m-l-8">{{title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Navbar',
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				top: 0,
				height: 0,
				width: 0
			};
		},
		created() {
			// #ifdef H5
			this.top = 20;
			this.height = 50;
			this.width = '100vw';
			// #endif

			// #ifdef MP
			let info = uni.getMenuButtonBoundingClientRect();
			let windowInfo = uni.getSystemInfoSync();
			this.top = info.top;
			this.height = info.height;
			this.width = windowInfo.windowWidth - info.width + 'px';
			// #endif
		},
		methods: {
			toBack() {
				this.$wxRouter.toBack();
			}
		}
	};
</script>
<style lang="scss">
	.navbar {
		z-index: 1000;
		color: #fff;
	}
</style>