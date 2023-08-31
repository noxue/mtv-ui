import api from '@/api/api.js';
import userServe from '@/serve/userServe.js';
/**
 * 这里主要放不能非页面接口
 */

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


					userSetChannel();

					r()
				}, () => {
					a()
				});
			}
		});
	})
}

// 使用code方式登录
function userCodeLogin(code, loginType) {
	let that = this;
	return new Promise((r, a) => {
		api.wx.login.request({
			code: loginRes.code,
			login_type: 'weapp'
		}).then(data => {
			let {
				token,
				openid, // 是否注册
			} = data

			userServe.createUserInfo({
				token,
				openid,
			})

			userSetChannel();

			r()
		}, () => {
			a()
		});
	})
}

/**
 * 设置用户渠道
 */
function userSetChannel() {
	let channel = uni.getStorageSync('channel');

	if (channel) {
		api.users.channel.request({
			channel: channel
		}).then(data => {
			// TODO 是否删除渠道参数
		})
	}
}

module.exports = {
	userWxLogin,
	userCodeLogin,
	userSetChannel
};