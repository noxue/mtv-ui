import {
	toPage,
	toPageLogin,
	toPageRegister,
} from '@/serve/router.js';

/**
 * 用户模块
 * @desc 与用户相关的方法都会存在这里
 * @TODO 用户登录未配置自动登录过期配置
 * @TODO 退出登录需要发给后台进行token清理
 */
class userServe {
	/**
	 * 配置
	 * @param {Object} data
	 */
	constructor(data) {}

	/**
	 * 获取用户token
	 */
	getUserToken() {
		return this.getUserInfo('token');
	}

	/**
	 * 检查用户是否登录
	 * @param {boolean} isToUserLogin 是否跳转到登录页面,如果为true,未登录将会跳转到登录页面
	 */
	checkUserLogin(isToPagesUserLogin = false) {
		let token = this.getUserToken();
		if (token) return token;
		if (isToPagesUserLogin == true) toPageLogin();
		return false;
	}

	/**
	 * 用户退出登录
	 */
	logout() {
		this.deleteUserInfo();
	}

	/**
	 * 微信登录
	 */
	userWxLogin() {
		let that = this;
		return new Promise((r, a) => {
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					api.user.login.request({
						code: loginRes.code,
					}).then(data => {

						uni.setStorageSync('loginInfo', {
							session_key: data.session_key
						})

						let {
							token,
							regist, // 是否注册
						} = data

						that.createUserInfo({
							token,
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

	/**
	 * 检车用户是否注册
	 * @param {boolean} isToUserLogin 是否跳转到登录页面,如果为true,未登录将会跳转到登录页面
	 */
	checkUserRegister(isRegister = false) {
		let info = this.getUserInfo('regist');
		if (info) return info;
		if (isRegister == true) {
			toPageRegister();
		};
		return false;
	}

	/**
	 * 用户微信注册,本系统使用手机号注册
	 */
	userWxRegister(info) {
		let that = this;
		return new Promise((r, a) => {
			api.weChat.mobile.request({
				data: {
					encryptedData: info.encryptedData,
					iv: info.iv
				}
			}).then(data => {
				that.updateUserInfo('regist', true);
				r(data)
			}, err => {
				e()
			})
		})
	}

	/**
	 * 创建用户
	 */
	createUserInfo(userInfo) {
		uni.setStorageSync('userInfo', userInfo)
		return userInfo;
	}

	/**
	 * 获取用户信息
	 */
	getUserInfo(key) {
		let userInfo;

		userInfo = uni.getStorageSync('userInfo')

		// 如果存在key 返回key的内容
		if (key) {
			if (typeof userInfo[key] != 'undefined') {
				return userInfo[key]
			} else {
				return '';
			}
		}

		return userInfo;
	}

	/**
	 * 添加/修改 用户信息
	 * @param {Object} key  下标
	 * @param {Object} value vlaue值(TODO '' 进行字段删除 ,其他存值 未增加)
	 */
	updateUserInfo(key, value) {
		if (!key) {
			return ''
		}

		let userInfo = this.getUserInfo()
		userInfo[key] = value;

		return this.createUserInfo(userInfo);
	}

	/**
	 * 删除用户
	 */
	deleteUserInfo() {
		uni.removeStorageSync('userInfo')
	}

	/**
	 * 是否对像检测
	 * @param {Object} data
	 */
	isObject(data) {
		return Object.prototype.toString.call(data) === '[object Object]';
	}
}

module.exports = new userServe();