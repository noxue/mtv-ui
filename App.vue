<script>
	import {
		getAuthUrl
	} from '@/serve/wxH5.js';

	export default {
		onLaunch: function(e) {
			// 渠道接口
			if (e.query.channel) {
				uni.setStorageSync('channel', e.query.channel);
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	@import "@/css/base.css";
	@import "@/css/base.scss";
	@import "@/css/h5Base.css";
	@import "@/css/project.scss";

	page {
		background-color: #fff;
	}
</style>