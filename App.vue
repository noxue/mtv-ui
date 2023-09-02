<script>
	import apiFun from '@/api/apiFun.js';
	import {
		getAuthUrl
	} from '@/serve/wxH5.js';

	export default {
		onLaunch: function(e) {
			console.log('请求参数', e);

			// #ifdef H5
			console.log('h5页面');

			if (e.query.code) {
				console.log('用户登录', e.query.code);
				apiFun.userCodeLogin(e.query.code, 'mp');
			} else {
				console.log('用户跳转');
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/micromessenger/i) == 'micromessenger') {
					let url = getAuthUrl(e.path);
					window.location.href = url;
				}
			}
			// #endif

			// #ifdef MP
			// 进入页面直接的登录
			apiFun.userWxLogin();
			// #endif

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