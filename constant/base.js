// 认证状态(0:未认证;1:已认证;3:认证失败;)
class base {
  constructor(arg) {
    console.log(2);
  }

  // 获取数据
  getData(value, filed = '') {
    let data = this.empty;

    for (let i in this.list) {
      if (this.list[i].value == value) {
        data = this.list[i];
      }
    }

    if (filed === '') {
      return data;
    } else {
      return data[filed];
    }
  }

  // 获取列表
  getList() {
    let list = [];
    this.list.forEach(item => {
      array.push(item);
    })

    return list
  }
}

export default base;
