export default function(data) {
	console.log('模拟接口', data);

	if (data.id > 2) {
		return {
			"code": 0,
			"msg": "",
			"data": {
				isWatch: false,
				operationType: 1, // 0 无操作 1充值金币
			}
		};
	} else {
		return {
			"code": 0,
			"msg": "",
			"data": {
				isWatch: true,
			}
		};
	}
}