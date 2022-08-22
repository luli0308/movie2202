<template>
  <div>
    <van-nav-bar
      title="资讯"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      // console.log(this.$route)
      // 注意返回操作 必须是具有上一页的历史记录
      // 之前页面跳转不能使用replace替换了历史页面 无法返回了
      this.$router.back()
    }
  },
  // 初始化操作
  beforeCreate() {
    // console.log(this.$store);
    this.$store.commit('film/setFooterShow')
  },
  beforeDestroy() {
    // console.log(this.$store);
    this.$store.commit('film/setFooterShow')
  },
  // beforeRouteLeave(to,from,next){
  //   // console.log(to);
  //   // console.log(from);
  //   console.log('离开资讯');
  // }
}
</script>

<style lang="scss" scoped>
</style>