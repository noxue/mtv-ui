import base from '@/constant/base.js';

/**
 * 订单状态
 * 0:新订单;
 * 1:已支付定金;
 * 3:进行中;
 * 4:已完成;
 * 5:已取消;
 * 6:退定金
 */
class orderStatus extends base {
  constructor() {
    super();

    this.awaitDeposit = 0
    this.payDeposit = 1
    this.underway = 3
    this.success = 4
    this.cancel = 5
    this.refundDeposit = 6

    this.empty = {
      value: '',
      label: '',
    }

    this.list = {
      'awaitDeposit': {
        value: this.awaitDeposit,
        label: '待支付定金',
      },
      'payDeposit': {
        value: this.payDeposit,
        label: '已支付定金',
      },
      'underway': {
        value: this.underway,
        label: '进行中',
      },
      'success': {
        value: this.success,
        label: '已完成',
      },
      'cancel': {
        value: this.cancel,
        label: '已取消',
      },
      'refundDeposit': {
        value: this.refundDeposit,
        label: '已退定金',
      }
    }
  }
}

export default new orderStatus();
