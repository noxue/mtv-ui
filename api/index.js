/***************************************************************
 * 接口参数介绍
 * name 接口名称 以XX:XX格式取,主要用在输出日志
 * api  接口名称与const定义需要一样（必须强制一样），主要用在输出日志
 * url  访问链接地址
 * data 请求数据
 * dataModal 请求数据检测与格式化
 * clickDelay 点击延迟，一个接口只能1秒钟只能调用一次，true开启 false关闭,默认开启
 * -->true 开启(默认)
 * -->false 关闭
 * showLoading 显示加载loading,请求时弹出窗口
 * -->true 显示(默认)
 * -->false 不显示
 * showLoadingMessage 显示加载loading文本
 * -->false 只显示loading，不显示文本
 * -->'正在请求...' 显示loading,显示配置文本(默认)
 * showSuccessLoading 显示加载/请求返回正确信息时显示的loading
 * -->true  显示loading
 * -->false 不显示loading(默认)
 * showSuccessLoadingMessage 示加载/请求返回正确信息时显示的loading消息
 * -->false 不显示文本
 * -->'加载成功' 显示文本,为空时显示后台文本，有内容时显示设置内容(默认值为空)
 * showErrorLoading 显示加载/请求返回错误信息时显示的loading
 * -->true  显示(默认)
 * -->false 不显示
 * showErrorLoadingMessage 显示加载/请求返回错误信息时显示的loading文本
 * -->false 不显示文本
 * -->'加载失败' 显示文本,为空时显示后台文本，有内容则优先显示内容(默认值为空)
 * apiType 请求默认类型,会根据参数增加一些额外的设置
 * -->default 普通模式，不强制用户登录(默认,如果用户已经登录，接口中会带有用户token过去)
 * -->login 登录状态,第三方/微信登录登录后可以使用
 * -->register 注册,需要注册手机号或者个人认证之后才能访问的权限
 * -->notUser 强制不使用token
 * method 微信小程序的传参模式，一般就是GET/POST
 * -->GET
 * -->POST
 * dataConfig 传参配置,主要用来进行传参验证(未配置)
 * returnConfig 返回参数配置,一些特殊的类型直接进行排错(TODO 该系统未实现,主要参数格式化，补充参数等操作)
 * -->type类型:普通类型转换int/string/array/object基本类型转换，特殊类型转换jsonString/date/time等
 * -->-->jsonString会进字符串尝试型进行转换，如果转换失败转换为{},防止程序报错
 * -->-->date 会将时间戳转换成时间格式
 * -->isComplementing:是否补足,如果在没有检查到会补充一个空的参数,
 * request 接口快捷模式
 * isProcessReturnData 不对接口进行处理，用于上报类接口,接口出现错误时前台也不会有影响
 * mock: ture/false
 **************************************************************/

//服务器配置
import hostConst from '@/config/hostConfig.js'
import userServe from '@/serve/userServe.js'
import router from '@/serve/router.js'
import apiFun from './apiFun.js';
import requestServe from '@/api/requestServe.js';

requestServe.baseUrl = hostConst.apiHost + '/';
requestServe.codeFunList = {
	"301": router.toLogin,
	"401": () => { // token 过期
		userServe.logout()

		setTimeout(function() {
			router.toPageName('home')
		}, 1500)
	}
}
requestServe.checkUserLogin = userServe.checkUserLogin;
requestServe.checkUserRegister = userServe.checkUserRegister;
requestServe.userWxLogin = userWxLogin;
requestServe.getUserToken = function() {
	return userServe.getUserToken();
}