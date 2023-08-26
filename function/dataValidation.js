import {
  isEmpty,
  isIdCard,
  isRealName,
  isNickName,
  isPassword,
  isPurenumber,
  isMobile,
  isEmail,
  isArray,
  isJsonString
} from "./validation.js"

/**
 * 数据集体检测(TODO 未完成)
 * 规则 以,号进行单个规则
 * 以|进行参数区分
 * 第一个,必须是字段名称
 * x|x|x  规则|规则参数|不符号规则进行报错
 * 示便  filed:'手机号,r,l|6-10,l|6,l|1/2/3,max|6,min|1,mobile,email,array,object,number,string',
 * r 必填项
 * l 长度值 x 固定长度   x-x 范围长度   x/x/x 不同的固定长度 max-10 min-10 针对number,array,string判断不同
 * string 是否是字符串
 * number 是否是数字
 * mobile 是否是手机号
 * email 是否是邮箱
 * array 是否是数组
 * object 是否是对象
 * idCrad 身份证
 * regular 正则表达式(未写)
 * purenumber 纯数字 只包含0-9
 * eq 等于某个字段
 * //下面的是根据项目不同参数不同
 * realName 真实姓名,只让输中文
 * bankNumber 银行卡号 暂时只判断是否是数据(未写)
 */

const a = {
  /**
   * @param {Object} rule 规则
   * @param {Object} inputList 所有输入的输入值
   */
  validation: function(rule, inputList) {
    var returnData = {
      flag: true,
      msg: '',
      key: '',
      data: {}
    }

    //TODO 初始化检测
    // if(rule && Object.keys(rule).length <= 0){
    // 	rule = {}
    // }else if(!rule){

    // }

    // //数据检测
    // if(inputList && Object.keys(inputList).length <= 0){
    // 	inputList = {}
    // }else{
    // 	inputList = {}
    // }

    waiceng:
      for (let field in rule) {

        let inputRuleList = rule[field].split(','); // 将规则进行分解 
        let inputData = inputList.hasOwnProperty(field) ? inputList[field] : ''; // 输入值

        if (Object.keys(inputRuleList).length > 0) {
          let filedName = inputRuleList[0]; //字段名称

          returnData.key = field;

          // 必填项
          if (inputRuleList.indexOf('r') > -1) {
            let check = this['r'](filedName, inputData, '', inputList)
            if (check !== true) {
              returnData.flag = false
              returnData.msg = check
              break waiceng;
            }
          }

          // 如果是空数据,跳过检查
          if (isEmpty(inputData)) continue;

          // 对一个数字进行循环
          for (var x in inputRuleList) {
            let inputRuleItem = inputRuleList[x];

            let ruleKey;
            let ruleValue;
            if (inputRuleItem.indexOf('|') > -1) {
              ruleKey = inputRuleItem.split('|')[0];
              ruleValue = inputRuleItem.split('|')[1];
            } else {
              ruleKey = inputRuleItem;
              ruleValue = '';
            }

            // 非必填其他的内容检查
            if (this[ruleKey]) {
              let check = this[ruleKey](filedName, inputData, ruleValue, inputList)
              console.log(check)
              if (check !== true) {
                returnData.flag = false
                returnData.msg = check
                break waiceng;
              }
            }
          }
        }
      }

    return returnData;
  },

  // 必填项
  r(filedName, inputData, ruleValue, inputList) {
    console.log(filedName, inputData)
    if (isEmpty(inputData)) {
      return `请输入${filedName}`;
    }

    return true
  },

  // 等于
  eq(filedName, inputData, ruleValue, inputList) {
    if (inputData != inputList[ruleValue]) {
      var othreName = rule[ruleValue].split(',')[0];

      return filedName + '与' + othreName + '不一致';
    }

    return true
  },

  // 真实姓名
  realName(filedName, inputData, ruleValue, inputList) {
    if (isRealName(inputData) === false) {
      return '请输入正确的' + name;
    }

    return true
  },

  // 对象
  object(filedName, inputData, ruleValue, inputList) {
    if (isObject(inputData) === false) {
      return `请输入${filedName}(对象)`;
    }

    return true
  },

  // 数组
  array(filedName, inputData, ruleValue, inputList) {
    if (isArray(inputData) === false) {
      return `请输入${filedName}(数组)`;
    }

    if (inputData.indexOf('|')) {
      return this.length(filedName, inputData.length, ruleValue, '条')
    }

    return true
  },

  // 数字, 这里判断有问题 isNaN,会判断出其他的东西
  number(filedName, inputData, ruleValue, inputList) {
    if (isNaN(inputData) === false) {
      return `请输入正确的${name}(数字)`;
    }

    if (inputData.indexOf('|')) {
      return this.length(filedName, inputData, ruleValue, '')
    }

    return true
  },

  // 正整数
  purenumber(filedName, inputData, ruleValue, inputList) {
    if (isPurenumber(inputData) === false) {
      return `请输入${filedName}(正整数)`;
    }

    if (inputData.indexOf('|')) {
      return this.length(filedName, inputData, ruleValue, '')
    }

    return true
  },

  // 银行卡
  idCard(filedName, inputData, ruleValue, inputList) {
    if (isIdCard(data) === false) {
      return `请输入正确的${filedName}`;
    }

    return true
  },

  // 邮箱
  email(filedName, inputData, ruleValue, inputList) {
    if (isEmail(inputData) === false) {
      return `请输入正确的${filedName}`;
    }

    return true
  },

  // 手机号
  mobile(filedName, inputData, ruleValue, inputList) {
    console.log('手机号', filedName, isMobile(inputData))
    if (isMobile(inputData) === false) {
      return `请输入正确的${filedName}`;
    }

    return true
  },

  // 字符串长度,分为 固定长度 x  范围长度 x-x 不同值 x/x/x max-10 min-10
  l(filedName, inputData, ruleValue, inputList) {

    let length = inputData.length;

    if (ruleValue.indexOf('-')) {
      let list = ruleValue.split('-');
      let one = list[0];
      let two = list[1];

      if (one === 'max') {
        if (length > two) {
          return `请输入正确的${filedName}(最长${two}位)`;
        }
      } else if (one === 'min') {
        if (length < two) {
          return `请输入正确的${filedName}(最少${two}位)`;
        }
      } else {
        if (one > length || length > two) {
          return '请输入正确的${filedName}(${one}位到${two}位)';
        }
      }
    } else if (ruleValue.indexOf('/')) {
      let list = ruleValue.split('/');

      let check = false
      list.map(item => {
        if (item === length) check = true
      })

      if (check === false) {
        return `请输入正确的${filedName}(${ruleValue}位)`;
      }
    } else {
      if (inputData.length != ruleValue) {
        return `请输入正确的${filedName}(固定${ruleValue}位)`;
      }
    }

    return true
  },


  length(filedName, number, ruleValue, unit) {
    let length = number;

    if (ruleValue.indexOf('-')) {
      let list = ruleValue.split('-');
      let one = list[0];
      let two = list[1];

      if (one === 'max') {
        if (length > two) {
          return `请输入正确的${filedName}(最多${two}${unit})`;
        }
      } else if (one === 'min') {
        if (length < two) {
          return `请输入正确的${filedName}(最少${two}${unit})`;
        }
      } else {
        if (one > length || length > two) {
          return `请输入正确的${filedName}(${one}${unit}到${two}${unit})`;
        }
      }
    } else if (ruleValue.indexOf('/')) {
      let list = ruleValue.split('/');

      let check = false
      list.map(item => {
        if (item === length) check = true
      })

      if (check === false) {
        return `请输入正确的${filedName}(${ruleValue}${unit})`;
      }
    } else {
      if (inputData.length != ruleValue) {
        return `请输入正确的${filedName}(${ruleValue}${unit})`;
      }
    }

    return true
  }
}

module.exports = a;
