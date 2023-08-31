<script>
	import apiFun from '@/api/apiFun.js';

	export default {
		onLaunch: function(e) {
			console.log('请求参数', e);

			// #ifdef H5
			if (e.query.code) {
				console.log('用户登录', e.query.code);
				apiFun.userCodeLogin(e.query.code, 'mp');
			} else {
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/micromessenger/i) == 'micromessenger') {
					// TODO 要设置回调地址
					let url = this.getAuthUrl();
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