import mock from './mock.js'

/**
 * 在wx.request封装的配置层
 * 本接口处于半封装状态
 * TODO 未将wx.request功能未全部重写，所有特殊对应原时候再继续加
 * TODO 增加上传文件类型
 * @param data
 * @returns {*}
 */
class requestServe {

	/**
	 * 初始化配置
	 * @param {*} data 
	 */
	constructor(data) {
		this.defaultConfig = {
			apiType: 'default', // 默认参数类型
			method: 'GET', // 默认请求类型
			data: {}, // 数据为空
			header: {}, // 请求头配置
			clickDelay: true, // 开启点击延迟
			showLoading: true, // 发送请求是否显示loading true/false
			showLoadingMessage: '正在请求...', // 发送请求时显示的文本框
			showSuccessLoading: false, // 显示完成消息
			showSuccessLoadingMessage: '', // 
			showErrorLoading: true, // 开启显示错误消息
			showErrorLoadingMessage: '', // 显示错误消息
			isProcessReturnData: false, // 接口发出后，不做接收处理
			mock: false
		}

		this.baseUrl = '';

		// TODO 未完成
		this.errorUrl = ''; // 接口出现错误用来报警的api,正常来说后台应该自己有的，主要用来前期测试交流开发减少沟通

		// 模拟数据api配置
		this.openMock = true; // 开启模拟数据,总开关

		// 返回数据处理配置
		this.returnCofig = {
			codeField: 'code', // 状态码
			dataField: 'data', // 数据存储
			msgField: 'msg' // 提示消息信息
		}

		// code处理
		this.codeSuccess = 0 // [code]正常类型
		this.codeError = 200 // [code]通用错误类型
		this.codeFunList = {} // [code]其他登录错误类型,处理codeSuccess,codeError以外的情况

		// 防抖缓存
		this.shakeCacheTimer = 1000 // 同一个接口 1秒最多提交一次
		this.shakeCache = {}

		// lading计算器，用于多个接口同时调用时，只弹出一个loading
		this.showLoadingNum = 0

		// 未登录前如果有请求数据进行请求,先请求登录再进行请求，因为可能存在多个，所以收集到列表中，也可以使用其他解决方案
		this.login = false
		this.loginRequest = []
	}

	// 用户微信登录(需要自定义)
	userWxLogin() {}
	getUserToken() {}
	checkUserLogin() {}
	checkUserRegister() {}

	/**
	 * 数据请求
	 */
	request(setConfig) {
		setConfig['log'] = '【' + new Date().getDate() + '】-【api接口url】【' + setConfig.api + '】-->'; // log日志输出

		//默认配置合并,最终api配置: 默认配置 -> api列表配置 -> 独立配置
		var config = Object.assign({}, JSON.parse(JSON.stringify(this.defaultConfig)), setConfig);
		this.log('[api配置]', config)

		if (this.shakeCheck(config) === false) return false // 防抖限制
		if (this.tokenCheck(config) === false) return false // 检查用户是否登录

		this.requestParamsFiltering(config) // 请求参数过滤
		this.showLoading(config); // 请求loading

		let success = this.success(config)
		let fail = this.fail(config)

		// 增加appid
		if (uni.getAccountInfoSync) {
			let sysInfo = uni.getAccountInfoSync();
			if (sysInfo) {
				config.header['appid'] = 'wx0fe731a495a2841a'; // sysInfo.api;
			}
		} else {
			config.header['appid'] = 'wx190455d0f223c92d' // 公众号
		}

		// 开启模拟数据
		if (this.openMock == true && setConfig.mock == true) return success(this.mockGet(config));

		let url = this.getUrl(config); // 获取url

		this.log('[请求地址]', url)

		// 请求数据
		var cache = wx.request({
			url: url,
			method: config.method,
			data: config.data,
			dataType: 'json',
			header: config.header,
			success: success,
			fail: fail,
			complete: res => {
				// _this.hideLoading();
			}
		})

		// 用于数据请求中断,需要这种的话
		return cache;
	}

	getUrl(config) {
		if (config.url) {
			return config.url;
		} else {
			return this.baseUrl + config.api
		}
	}

	/**
	 * [封装方法] 配置token
	 */
	tokenCheck(config) {
		if (config.apiType == 'login') { //需要用户登录
			// 用户未登录
			if (this.checkUserLogin() == false) {
				// 重新登录,再次请求,如果不需要可以直接返回首页
				this.userLoginAsync(config);
				return false;
			}
		} else if (config.apiType == 'register') { // 需要用户注册
			this.log(config.log + '[执行用户强制注册检测]');

			if (this.checkUserRegister(true) == false) {
				return false
			}
		} else if (config.apiType == 'notUser') { // 强制不使用token
			return true
		}

		// default类型
		if (this.getUserToken()) {
			config.header['token'] = this.getUserToken();

		}

		return true
	}

	// 用户token过期时，重新登录处理
	userLoginAsync(config) {
		this.loginRequest.push(config) // 缓存未登录的接口配置
		console.log('循环调用开始', this.loginRequest);

		// 防止多次请求用户登录进行限制
		if (this.login == true) return false;
		this.login = true

		// 登录请求
		this.userWxLogin().then(() => {
			// 请求成功后,循环请求之前缓存的调用
			this.loginRequest.forEach((item) => {
				console.log('循环调用', item)
				this.request(item)
			})

			// 清空数据
			this.loginRequest = []
			this.login = false
		}, err => {
			// 请求失败，返回首页
			toPage('/pages/index/inex'); // TODO修改名称变量
			this.loginRequest = []
			this.login = false
		})
	}

	// 请求后拦截
	success(config) {
		let _this = this;
		return function(res) {
			// 接口不做任何处理
			if (config.isProcessReturnData === true) return true;

			_this.log(config.log + '[success数据]:', res);

			// html异常错误,不等于200走不到该程序内
			if (!res) {
				_this.alert('数据异常,请重试');
				_this.errorLog(res)
				return false
			}

			_this.hideLoading(config);

			// html异常错误,不等于200走不到该程序内
			if (res.statusCode !== 200) {
				_this.alert('网络延迟,请稍后重试');
				_this.errorLog(res)
				return false
			}

			//接口参数判断
			var content = res.data;
			var code = content[_this.returnCofig.codeField]; // 标识code
			var data = content[_this.returnCofig.dataField] ? content[_this.returnCofig.dataField] : {}; // 核心数据
			var msg = content[_this.returnCofig.msgField] ? content[_this.returnCofig.msgField] : ''; // 返回消息

			// 没有正常的标识,后期写接口访问日志
			if (code === '' || isNaN(code)) {
				_this.log(config.log + '[success][code]', code);
				_this.errorLog(res);
				_this.alert('接口异常,请联系我们');
				return false;
			}

			if (_this.codeFunList[code] && typeof _this.codeFunList[code] === 'function') {
				// 特殊处理接口
				let check = _this.codeFunList[code](config, data, code, msg);
				if (check === false) return false
			} else if (code == _this.codeSuccess) {
				// codeSuccess处理
				if (config.showSuccessLoading == true) {
					_this.alert(config.showSuccessLoadingMessage ? config.showSuccessLoadingMessage : msg)
				};

				if (typeof config.success === 'function') config.success(data, res)
			} else if (code || code.toString() === '0') {
				// codeError 与 未定义的错误都走这里
				if (config.showErrorLoading) {
					_this.alert(config.showErrorLoadingMessage ? config.showErrorLoadingMessage : msg)
				};

				if (typeof config.codeFun === 'function') config.codeFun(content, res); // 进入自定义codeFun函数
			} else {
				_this.errorLog('request->success', res)
				_this.alert('接口错误,未返回正确的标识,请联系我们');
			}
		}
	}

	// 接口异常使用
	fail(config) {
		let _this = this;
		return function(res) {
			console.log(res)

			_this.hideLoading(config);

			wx.showModal({
				title: '消息',
				content: '服务器未返回正确数据,请尝试重新请求~',
				showCancel: false,
			})

			if (typeof config.fail === 'function') config.fail(res)
		}
	}

	/**
	 * 显示loading
	 * @param {Object} config
	 */
	showLoading(config) {
		if (config.showLoading === true) {

			// 只有第一个弹出窗口
			if (this.showLoadingNum <= 0) {
				uni.showLoading({
					mask: true,
					title: config.showLoadingMessage
				})
			}

			this.showLoadingNum++
		}
	}

	/**
	 * 隐藏loading
	 */
	hideLoading(config) {
		if (config.showLoading === true) {
			this.showLoadingNum--

			// 最后一个隐藏窗口
			if (this.showLoadingNum <= 0) {
				uni.hideLoading();
			}
		}
	}

	/**
	 * 防抖处理
	 * 通用防抖处理，任何事件都不准许多次点击提交, 一个接口1秒只能提交一次
	 */
	shakeCheck(config) {
		if (config.clickDelay == true) {
			let apiName = config['api'];
			let newTime = new Date().getTime()
			if (this.shakeCache[apiName] && this.shakeCache[apiName].time - newTime > this.shakeCacheTimer) {
				this.log(config.log + apiName + ':接口延迟点击中..........拒绝本次请求');
				return false
			} else {
				this.log(config.log + apiName + ':请求通过,更新延迟时间', newTime);
				this.shakeCache[apiName] = newTime
				return true
			}
		} else {
			return true
		}
	}

	// 请求参数过滤
	// [parameter传参]参数剔空,去空格 TODO 无法检测多维数组,需要重构,这里应该与上面进行合并
	requestParamsFiltering(config) {
		// [apiType检测]某种类型下携带某些参数
		let params = config.data

		this.log(config.log + '[參數过滤前]', params);
		for (var i in params) {
			// 如果是字符串,两边去空
			if (typeof params[i] == 'string') params[i] = params[i].trim();

			// 值为null时 TODO 没有增加类型判断
			if (params[i] === null) params[i] = '';

			// 防止异常提交，后台会认为 undefined 是字符串,TODO 没有增加类型判断
			if (typeof params[i] === undefined || params[i] === undefined) params[i] = '';
		}

		this.log(config.log + '[參數过滤后]', params);
		return params
	}

	/**
	 * 输出错误信息
	 * @param {Object} content
	 */
	errorAlert(content) {
		wx.showModal({
			title: '提示',
			mask: true,
			content: content,
			showCancel: false,
		})

		return true;
	}

	// 错误提交
	errorLog(content) {
		if (this.errorUrl) {
			// TODO 后期写接口访问日志
		}
	}

	// 错误提示
	alert(content) {
		if (!content) return false;

		var time = content.length / 4 * 1000;
		if (time < 2000) time = 2000;
		wx.showToast({
			title: content,
			mask: true,
			icon: 'none',
			duration: time
		})
	}


	// 普通日志输出
	consoleLog(msg) {
		var time = new Date().getDate(); //获取时间参数
		var log = '【' + time + '】-【api接口url】【' + this.api + '】-->';

		console.log(log + msg)
	}

	// 输出logo模式
	log(title, content) {
		console.log(title, content);
	}

	mockGet(config) {
		console.log(mock, config)
		let mockFun = mock[config.api];
		if (mockFun) {
			return {
				statusCode: 200,
				data: mockFun(config.data)
			};
		} else {
			this.alert('未配置mock数据');
			return {};
		}
	}
}

export default new requestServe();