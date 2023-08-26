import usreServe from '@/config/userServe.js';

/**
 * 常用方法
 */
module.exports = {
  data() {
    let isH5 = false;

    // #ifdef H5
    isH5 = true;
    // #endif

    return {
      isH5: isH5
    }
  },
  methods: {
    toPage: this.$wxRouter.toPage,
    bannerTo(item) {
      console.log('这里', item);
      if (item.type == 0) {
        // 网页
        this.$wxRouter.toPage('/pages/separatePage/webView', {
          url: item.url
        })
      } else if (item.type == 1) {
        // 房源
        this.$wxRouter.toPage(item.url);
      }
    },
    copy(text) {
      uni.setClipboardData({
        data: text,
        success() {
          uni.showToast({
            title: '复制成功',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },
  }
}
