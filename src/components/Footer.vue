<template>
  <div>
    <van-tabbar
      v-model="active"
      active-color="#ff5f16"
      inactive-color="#000"
    >
      <van-tabbar-item to="/film/nowplaying">
        <!-- 通过提供的插槽 显示自定义图标 -->
        <template slot="icon">
          <span class="iconfont icon-dianying"></span>
        </template>
        电影
      </van-tabbar-item>
      <van-tabbar-item to="/cinema">
        <template slot="icon">
          <span class="iconfont icon-yingyuan"></span>
        </template>
        影院
      </van-tabbar-item>
      <van-tabbar-item to="/news">
        <template slot="icon">
          <span class="iconfont icon-zixun"></span>
        </template>
        资讯
      </van-tabbar-item>
      <van-tabbar-item to="/ucenter">
        <template slot="icon">
          <span class="iconfont icon-wode"></span>
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'
// js中引入css的语法  文件后缀名不能省略
import '../assets/icon/iconfont.css'
// Vue.use 插件使用语法  vant这里使用该语法进行了组件注册
Vue.use(Tabbar)
Vue.use(TabbarItem)
export default {
  // 默认vue组件注册的方式
  components: {},
  mounted() {
    // 原生js代码获取url地址方式
    // console.log(window.location.pathname);
    switch (this.$route.path) {
      case '/':
        this.active = 0
        break
      case '/cinema':
        this.active = 1
        break
      // case '/news':
      //   this.active = 2
      //   break
      case '/ucenter':
        this.active = 3
        break
    }
  },
  data() {
    return {
      // 默认选中底部菜单的索引值
      active: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.van-tabbar-item__icon {
  > span {
    font-size: 22px;
  }
}
</style>