import base from '@/constant/base.js';

/**
 * 认证状态
 * 0:未认证;
 * 1:已认证;
 * 3:认证失败;
 */
class identityStatus extends base {
	constructor() {
		super();

		this.no = 0
		this.success = 1
		this.fail = 2

		this.empty = {
			value: '',
			label: '',
		}

		this.list = {
			'no': {
				value: this.no,
				label: '未实名认',
			},
			'success': {
				value: this.success,
				label: '已实名认证',
			},
			'fail': {
				value: this.fail,
				label: '实名认证失败',
			}
		}
	}

	/**
	 * 获取是否认证状态， 
	 * @param {Number} 状态value
	 * @return {String} 只返回认证或者未认证的文字
	 */
	getIsIdentity(value) {
		if (value == this.success) {
			return this.list.success.label;
		} else {
			return this.list.no.label;
		}
	}
}

export default new identityStatus();
