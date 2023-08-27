/************************
 * 简易路由系统
 ************************/
import userServe from '@/serve/userServe.js'
// import {
// 	objectToParams
// } from '@/function/url.js'

// tab页列表,要与pages.json一致,用来做toPage验证
export const tabPageList = [
	'/pages/index/index',
	'/pages/goods/chum/list',
	'/pages/serve/index',
	'/pages/member/index',
];

// 常用列表页,用来支持各个插件使用
export const pageList = {
	'home': '/pages/index/index', //首页,涉及到后退，异常等操作必须配置
	'login': '/pages/login/login', //用户授权登录
	'register': '/pages/login/login', //用户注册页
	'errorPage': '/pages/index/index', // 当页面发生异常的情况下跳转的页面
	'tokenError': '/pages/index/index', // token过期或异常转跳的页面
}

// 登录成功后后退上一页，如果上一页为以下url则会退到到首页
export const loginSuccessRedirectUrl = [
	'/pages/lgoin/index'
];

/**
 * 去页面
 * @desc 判断是否跳转的是tab页面,进行不同的跳转
 * @param {Object} url 跳转路径
 * @param {Object} data 拼接参数
 */
export function toPage(url, data, type = 'navigateTo', config) {
	let defaultConfig = {
		loginCheck: false, // 是否检查登录
		loginJumpIs: false, // 未登录是否跳转到登录页面
		loginJumpParams: {}, // 跳转参数
		registerCheck: false, // 是否检查注册
		registerJumpIs: false, // 未注册是否跳转到注册页面
		registerJumpParams: {} // 跳转参数
	}

	let {
		loginCheck,
		loginJumpIs,
		loginJumpParams,
		registerCheck,
		registerJumpIs,
		registerJumpParams
	} = Object.assign({}, defaultConfig, config);

	if (!type) type = 'navigateTo';

	// 检查url是否正确
	if (url.indexOf('/') != 0) return console.log('路径需要以/为开始');

	// 检查是否需要登录
	if (loginCheck == true && userServe.checkUserLogin(loginJumpIs, loginJumpParams) == false) {
		return false;
	}

	// 检查是否需要注册
	if (registerCheck == true && userServe.checkUserRegister(registerJumpIs, registerJumpParams) == false) {
		return false;
	}

	// 如果是tabBar页面强制转换跳转类型
	if (tabPageList.indexOf(url) > -1) type = 'switchTab';

	// 配置参数
	if (data) url += '?' + objectToParams(data)
	switch (type) {
		case 'switchTab':
			uni.switchTab({
				url
			})
			break;

		case 'redirectTo':
			uni.redirectTo({
				url
			})
			break;

		case 'reLaunch':
			uni.reLaunch({
				url
			})
			break;

		default:
			// 检查页面堆栈
			let pageList = getCurrentPages();
			if (pageList.length >= 10) {
				uni.showToast({
					title: '页面最多支持10层,请回退页面重试',
					icon: 'none'
				})
			}

			uni.navigateTo({
				url
			})
	}
}

/**
 * 通过名称跳转页面
 */
export function toPageName(name, params, type = 'navigateTo', config) {
	if (!pageList[name]) return console.log('路径不存在');
	toPage(pageList[name], params, type, config);
}

/**
 * 后退
 */
export function toBack(funName, funParams, delayTime = 0) {
	let upPage = getUpPage();
	if (upPage) {
		if (funName && typeof upPage.$vm[funName] == 'function') {
			upPage.$vm[funName](funParams);
		}

		setTimeout(() => {
			uni.navigateBack();
		}, delayTime);
	} else {
		// 只剩下一个页面的时候跳转到首页
		setTimeout(() => {
			toPageName('home');
		}, delayTime);
	}
}

/**
 * 去登录页面
 * @desc 在一定时间内只会触发一次跳转
 */
let toLoginTime = 0;
export function toLogin() {
	// TODO 未测试
	// 如果当前页面为登录页面不进行跳转
	let pageList = getCurrentPages();
	let currentPage = pageList[0];
	if (currentPage.path == pageList.login) return false;

	// 执行
	let time = new Date().getTime();
	if (time - toLoginTime > 1500) {
		toLoginTime = time
		userServe.deleteUser();
		toPageName('login');
	}
}

/**
 * 去注册页面
 * toRegister 会限制在一定时间内跳转登
 */
let toRegisterTime = 0;
export function toRegister() {
	// TODO 未测试
	let pageList = getCurrentPages();
	let currentPage = pageList[0];
	if (currentPage.path == pageList.register) return false;

	// 执行
	let time = new Date().getTime();
	if (time - toRegisterTime > 1500) {
		toRegisterTime = time
		userServe.deleteUser();
		toPageName('register');
	}
}

/**
 * 登陆成功
 * @desc 1.获取上一个页面，并执行getPageLoginData
 * 2.如果没有则检测是否有缓存url
 * 3.跳到首页
 */
export function loginSuccess() {
	// 有上一个页面执行的方法
	let upPageObject = getUpPage();
	if (upPageObject) {
		if (loginSuccessRedirectUrl.indexOf(url) > -1) {
			return toPage(pageList.home)
		}

		// 登录成功执行方法
		if (typeof upPageObject['onLoginSuccess'] == 'function') upPageObject['onLoginSuccess']();

		return toBack();
	}

	// 没有上一个页面,检查是否有重向向链接
	let backUrl = uni.getStorageSync('login_back_url');
	if (backUrl) return toPage(backUrl)

	// 依然没有则跳转到首页
	return toPageName('home');
}

/**
 * 去错误页面
 */
export function toError() {
	if (pageList.errorPage) {
		toPageName('errorPage', '', 'redirectTo')
	} else {
		toPageName('home');
	}
}

/**
 * 获取上一个页面的实例
 */
export function getUpPage() {
	let pageList = getCurrentPages();
	if (pageList.length > 1) {
		let pageInfo = pageList[pageList.length - 2];
		return pageInfo;
	} else {
		return false
	}
}

module.exports = {
	tabPageList,
	pageList,
	toPage,
	toPageName,
	toBack,
	toLogin,
	toRegister,
	toError,
	getUpPage,
}


function objectToParams(obj) {
	const params = [];

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			const value = obj[key];
			// 若值为数组，则拼接多个参数
			if (Array.isArray(value)) {
				value.forEach(val => {
					params.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
				});
			} else {
				params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
			}
		}
	}

	return params.join('&');
}