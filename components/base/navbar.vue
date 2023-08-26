<template>
  <view style="position: fixed;" :style="{ top: top + 'px', height: height + 'px', width: width }">
    <slot />
  </view>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        top: 0,
        height: 0,
        width: 0
      };
    },
    created() {
      // #ifdef H5
      this.top = 44;
      this.height = 50;
      this.width = '100vw';
      // #endif

      // #ifdef MP
      let info = uni.getMenuButtonBoundingClientRect();
      let windowInfo = uni.getSystemInfoSync();
      this.top = info.top;
      this.height = info.height;
      this.width = windowInfo.windowWidth - info.width + 'px';
      // #endif
    }
  };
</script>
