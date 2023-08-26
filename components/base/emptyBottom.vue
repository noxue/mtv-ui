<template>
	<view class="emptyBottom" style="width: 100%;" :style="{ height: height + 'rpx' }"></view>
</template>

<script>
/**
 * 用来顶开底部空间使用
 */
export default {
	name: 'EmptyBottom',
	props: {
		height: {
			type: [Number, String],
			default() {
				return 50;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.emptyBottom {
	padding-bottom: env(safe-area-inset-bottom);
}
</style>
