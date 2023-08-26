<template>
  <button open-type="getPhoneNumber" @getphonenumber="getphonenumber" class="getPhoneNumber">{{ text }}</button>
</template>

<script>
  import userServe from '@/config/userServe.js';

  /**
   * 获取电话号码
   * 需要后台支援
   * @cancel 取消
   * @success(data) 完成
   */
  export default {
    name: 'GetPhoneNumber',
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    methods: {
      getphonenumber(e) {
        if (!e.detail.code) {
          this.$emit('cancel');
        } else {
          userServe.userWxRegister(e.detail).then(data => {
            this.$emit('success', data);
          });
        }
      }
    }
  };
</script>
