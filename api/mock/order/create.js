export default function(data) {
	console.log('模拟接口:创建订单', data);

	return {
		"code": 0,
		"msg": "",
		"data": {
			orderNo: 'xxxxxxxxx'
		}
	};
}