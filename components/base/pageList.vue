<template>
	<view>
		<template v-if="pageList.pageStatus == 1">
			<!-- 展示请求前的数据 -->
		</template>
		<template v-if="pageList.pageStatus != 99">
			<!-- 正常加载数据展示加载条 -->
			<view class="m-t-20">
				<u-loadmore :status="pageList.uniPageStatus[pageList.pageStatus]"></u-loadmore>
			</view>
		</template>
		<template v-if="pageList.pageStatus == 99">
			<!-- 空数展示 -->
			<emptyData class='w-full' :type='emptyDataType' :style="{height: emptyDataHeight}"></emptyData>
		</template>
		<emptyBottom :height="bottomHeight"></emptyBottom>
	</view>
</template>

<script>
	import emptyData from '@/components/base/emptyData.vue';
	import spaceView from '@/components/base/spaceView.vue';

	/**
	 * 页面刷新列表
	 */
	export default {
		name: 'List',
		components: {
			emptyData,
			spaceView
		},
		props: {
			pageList: {
				type: Object,
				default: '200'
			},
			bottomHeight: { // 距离底部距离
				type: String,
				default: '200'
			},
			emptyDataHeight: { // 数据为空的显示的数据的高度
				type: String,
				default: '500rpx'
			},
			emptyDataType: { // 数据为空的显示的数据的类型
				type: String,
				default: ''
			},
		},
		data() {
			return {};
		},
		created() {},
		methods: {}
	};
</script>