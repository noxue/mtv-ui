import hostConst, {
	fileHost
} from '@/config/hostConfig.js'
import userServe from '@/serve/userServe.js'
import router from '@/serve/router.js'
import apiFun from './apiFun.js';
import requestServe from '@/api/requestServe.js';

requestServe.baseUrl = hostConst.apiHost + '/';
requestServe.codeFunList = {
	"301": router.toLogin,
	"-2": () => { // token 过期
		requestServe.userLogout();
	}
}
requestServe.checkUserLogin = userServe.checkUserLogin;
requestServe.checkUserRegister = userServe.checkUserRegister;
requestServe.userWxLogin = apiFun.userWxLogin;
requestServe.userLogout = function() {
	userServe.logout()

	setTimeout(function() {
		router.toPageName('home')
	}, 1500)
}
requestServe.getUserToken = function() {
	return userServe.getUserToken();
}