import {
	appid
} from '@/config/config.js';

/**
 * 获取微信auth认证链接地址
 */
export function getAuthUrl() {
	console.log(1,appid);
	let str = appid;
	let url = uni.getStorageSync('login_back_url') ? uni.getStorageSync('login_back_url') : location.pathname +
		location.search; // 以当前地址拼接，这里有问题
	let redirect_uri = encodeURIComponent(`${location.origin}/pages/home/home?redirect_uri=` + encodeURIComponent(
		encodeURIComponent(url))); // 回调地址
	let state = encodeURIComponent(("" + Math.random()).split(".")[1] + "authorizestate"); // 自动登录模式
	return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${str}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
}