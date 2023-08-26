export default function(data) {
	console.log('模拟接口:创建订单', data);

	return {
		"code": 0,
		"msg": "",
		"data": {
			"sign_type": "RSA",
			"pay_sign": "N8qRdFn/tOgRV8ry4ZExw/UBu+OgYr0eTCvmNLdhiwlt3+Mvaa8ZAMy65COZ/pN5IGTpKUwKinPc1bWuvPmAIBdnqpQCY4Ve8nMC7vUyZ/PBjrvAdRjv3bNJx034No/Rp+rPT+XMJvNefrfwYnSMF10F3WdUCXrp/B3vfnTFwTZLXt6uzbacNX3+vZMRHYM5FwtRvliVm97mDCxvHosE0HMRRMuRlgqxD/q6wsKdEK4Yk7vClonAp54E1OdI2Wga+oz0CO6FjHpnKGhqPBDu9v0Tam1RMPXhPXvt8x1ClxnUdTXaF0ddkXZDZFsXDpQstSJzWIQtXoqP69srQ5o0qw==",
			"prepay_id": "wx21212545043977c88cf02cc2daf7070000",
			"nonce_str": "7gjKqCBduyrJhm8R5deQ1X6y0Li3kQXU",
			"timestamp": "1692624348"
		}
	};
}