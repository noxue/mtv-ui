import {
  shareConfig
} from "@/config/shareConfig.js"

/**
 * 分享
 * 
 onShareAppMessage() {
 	return {
		title: '', // 默认为小程序名称
		path: '', // 默认为当前页面路径
		imageUrl: '' // 默认为当前页面的截图
	}
 },
 
 * @desc 目前兼容小程序，后期增加app
 */

module.exports = {
  data() {
    return {
      share: {
        title: '', // 默认为小程序名称
        path: '', // 默认为当前页面路径
        imageUrl: '' // 默认为当前页面的截图
      }
    }
  },
  onLoad() {
    // #ifdef MP-WEIXIN
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    // #endif

    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    // #endif

    this.shareSet(shareConfig)
  },

  onShareAppMessage() {
    return this.share
  },

  // #ifdef MP-WEIXIN
  onShareTimeline() {
    return this.share
  },
  // #endif

  methods: {
    // 外部调用,分享设置
    shareSet(config) {
      this.share = {
        ...this.share,
        ...config
      }
    }
  }
}
