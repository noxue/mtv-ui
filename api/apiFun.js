import api from '@/api/api.js';
import userServe from '@/serve/userServe.js';

function userWxLogin() {
	let that = this;
	return new Promise((r, a) => {
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				api.wx.login.request({
					code: loginRes.code,
					login_type: 'weapp'
				}).then(data => {

					let {
						token,
						regist,
						openid, // 是否注册
					} = data

					userServe.createUserInfo({
						token,
						openid,
						regist // 是否注册
					})

					r()
				}, () => {
					a()
				});
			}
		});
	})
}

module.exports = {
	userWxLogin
};