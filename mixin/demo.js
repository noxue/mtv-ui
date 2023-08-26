/**
 * 所有方法，以名称开头
 */
module.exports = {
  data:{
    demo:{
      a:0,
      b:1,
      c:2
    }
  },
  methods: {
   demoClick(){
     this.$wxRouter.toBack("funName",funParams,delayTime)
   }
  }
}
