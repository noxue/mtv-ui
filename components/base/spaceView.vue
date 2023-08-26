<template>
  <view class="spaceView" :style="{height:height}"></view>
</template>

<script>
  export default {
    name: 'spaceView',
    props: {
      height: {
        type: String,
        default: '100rpx;'
      }
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>

<style lang="scss" scoped>
  .spaceView {
    box-sizing: content-box;
    width: 100%;
    padding-bottom: 0rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>