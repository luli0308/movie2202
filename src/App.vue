<template>
  <div>
    <!-- movie2202 -->
    <!-- 将路由加载到的组件 渲染出来 -->
    <!-- 渲染容器 -->
    <router-view></router-view>
    <!-- 引入显示底部导航菜单 -->
    <Footer v-show="$store.state.film.footerShow" />
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
export default {
  // 局部注册
  components: {
    Footer
  },
}
</script>

<style lang="scss">
/* App里的设置一般是全局使用的 它也不需要使用作用域 */
.van-toast {
  background-color: rgba(0, 0, 0, 0.4) !important;
}
</style>