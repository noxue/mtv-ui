<template>
  <view style="position: fixed;z-index: 10000;" :style="{ top: top + 'px', height: height + 'px', width: width }">
    <view class="w-h-full p-lr-20 flex-row">
      <view class="flex-row-start-center flex-shrink-0 h-58"
        style="background-color: rgba(255, 255, 255, 0.6);border-radius: 29rpx;">
        <view @click="toBack" class="p-l-28 p-r-25 h-full flex-row-start-center">
          <image class="w-18 h-30" src="@/static/icon/details-1.png"></image>
        </view>
        <view style="width: 1px;height: 30rpx;background-color: #c2c3c4;"></view>
        <view @click="toHome" class="p-l-25 p-r-28 h-full flex-row-start-center">
          <image class="w-h-30" src="@/static/icon/details-2.png"></image>
        </view>
      </view>
      <view class="flex-1"></view>
      <view class="flex-row-start-center flex-shrink-0 h-58"
        style="background-color: rgba(255, 255, 255, 0.6);border-radius: 29rpx;">
        <view @click="toShare" class="p-l-28 p-r-25 h-full flex-row-start-center" style="position: relative;">
          <button open-type="share" class="opacity-button"></button>
          <image class="w-h-30" src="@/static/icon/details-3.png"></image>
        </view>
        <view style="width: 1px;height: 30rpx;background-color: #c2c3c4;"></view>
        <view @click="collectChange" v-if="collection == true" class="p-l-25 p-r-28 h-full flex-row-start-center">
          <image class="w-h-32" src="@/static/icon/collect-type2-selected.png"></image>
        </view>
        <view @click="collectChange" v-else="collection" class="p-l-25 p-r-28 h-full flex-row-start-center">
          <image class="w-h-32" src="@/static/icon/details-4.png"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'GoodsNavbar',
    props: {
      collection: {
        type: Boolean,
        default () {
          return false;
        }
      }
    },
    data() {
      return {
        top: 0,
        height: 0,
        width: 0
      };
    },
    created() {
      // #ifdef H5
      this.top = 20;
      this.height = 30;
      this.width = '100vw';
      // #endif

      // #ifdef MP
      let info = uni.getMenuButtonBoundingClientRect();
      let windowInfo = uni.getSystemInfoSync();
      this.top = info.top;
      this.height = info.height;
      this.width = windowInfo.windowWidth - info.width + 'px';
      // #endif
    },
    methods: {
      toBack() {
        this.$wxRouter.toBack('', '', 0);
      },
      toHome() {
        this.$wxRouter.toPage('/pages/index/index');
      },
      toShare() {
        this.$emit('onShare');
      },
      collectChange() {
        this.$emit('collectChange');
      }
    }
  };
</script>
