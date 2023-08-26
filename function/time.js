/**
 * 获取倒计时时间
 * @param {Number} endTime 秒数
 * @param {string} timeType 返回
 * @param {string} timeFormat 最大单位，目前最大支持到天
 */
export function countDownTime(endTime, timeType = 1, timeFormat = 40) {
	let callBackData = {
		errorMsg: '', // 消息
		endTime: endTime,
		totalSecond: -1, //总秒数
		day: '00',
		hour: '00',
		minute: '00',
		second: '00'
	};

	if (isNaN(endTime)) {
		callBackData['errorMsg'] = 'endTime is not number！';
		return callBackData;
	}

	// 剩余总秒灵敏
	let totalSecond = endTime; // 剩余秒数
	callBackData['totalSecond'] = totalSecond;

	// 小于0
	if (totalSecond <= 0) {
		return callBackData;
	}


	if (timeType == 1) {
		// 当前秒数
		let second = totalSecond;

		// 天位
		if (timeFormat >= 40) {
			let day = Math.floor(second / (3600 * 24));
			second = Math.floor(second % (3600 * 24));

			let dayStr = day.toString();
			if (dayStr.length == 1) dayStr = '0' + dayStr;
			callBackData['day'] = dayStr;
		}

		// 小时位
		if (timeFormat >= 30) {
			let hr = Math.floor(second / 3600);
			second = Math.floor(second % 3600);

			let hrStr = hr.toString();
			if (hrStr.length == 1) hrStr = '0' + hrStr;
			callBackData['hour'] = hrStr;
		}

		// 分钟位  
		if (timeFormat >= 20) {
			let min = Math.floor(second / 60);
			second = Math.floor(second % 60);

			let minStr = min.toString();
			if (minStr.length == 1) minStr = '0' + minStr;
			callBackData['minute'] = minStr;
		}

		// 秒位  
		if (timeFormat >= 10) {
			let sec = second;
			let secStr = sec.toString();
			if (secStr.length == 1) secStr = '0' + secStr;
			callBackData['second'] = secStr;
		}
	}

	return callBackData;
}


/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 10位时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 Y-M-D
 */
export function formatTime(number, format) {
	var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
	var returnArr = [];

	var date = new Date(number * 1000);
	returnArr.push(date.getFullYear());
	returnArr.push(fillZeroPrefix(date.getMonth() + 1));
	returnArr.push(fillZeroPrefix(date.getDate()));

	returnArr.push(fillZeroPrefix(date.getHours()));
	returnArr.push(fillZeroPrefix(date.getMinutes()));
	returnArr.push(fillZeroPrefix(date.getSeconds()));

	for (var i in returnArr) {
		format = format.replace(formateArr[i], returnArr[i]);
	}

	return format;
}
