<script>
	import apiFun from '@/api/apiFun.js';

	export default {
		onLaunch: function() {
			// 进入页面直接的登录
			apiFun.userWxLogin();
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