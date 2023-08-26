<template>
	<text :style="style_">{{text}}</text>
</template>

<script>
	import selectIndex from '@/constant/constant/index';

	/**
	 * 展示select的组件
	 */
	export default {
		name: 'selectText',
		props: {
			name: {
				type: String,
				default: ''
			},
			value: {
				type: [Number, String],
				default: ''
			},
			textFiled: {
				type: String,
				default: 'label'
			},
			style_: { // 自定义样式
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed: {
			text() {
				let list = selectIndex[this.name];

				return list.getData(this.value, this.textFiled);
			}
		}
	}
</script>

<style lang="scss" scoped></style>
