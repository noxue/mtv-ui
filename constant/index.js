import base from '@/constant/base.js';
import identityStatus from '@/constant/identityStatus.js';
import orderStatus from '@/constant/orderStatus.js';

let statusList = {
	deleteSelect,
	feedbackStatus
}

/**
 * 插入新的状态
 * list : [{label:'文本',value:1},{label:'文本',value:1}]
 */
export const statusListPush(name, list) {
	var newObject = new base();

	newObject.list = [];

	newObject.empty = {
		value: '',
		label: '',
	}

	list.forEach((item, index) => {
		newObject.list[item.value] = {
			value: item.value,
			label: item.label,
		};

		newObject[item.value] = item.value
	})

	statusList[name] = newObject;
}

export default statusList
