/**
 * 自动滑动到首页
 */
module.exports = {
  onShow() {
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
  }
}
