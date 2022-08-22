<template>
  <div>
    <!-- 粘性布局 吸顶 -->
    <van-sticky @scroll="changeStatus">
      <van-nav-bar
        title="电影"
        v-show="navBarStatus"
        :border="false"
      >
        <template slot="left">
          <!-- 组件标签式导航 -->
          <!-- <router-link to="/city"><span>北京</span></router-link> -->
          <!-- 点击事件触发编程API方式导航 -->
          <span @click="$router.push({path:'/city',query:{back:$route.path}})">{{cityName}}</span>
          <van-icon name="arrow-down" />
        </template>
      </van-nav-bar>
      <van-tabs
        v-model="active"
        title-active-color="#ff5f16"
        :line-height="2"
        :line-width="55"
        v-show="tabsStatus"
      >
        <van-tab
          title="正在热映"
          replace
          to="/film/nowPlaying"
        ></van-tab>
        <van-tab
          title="即将上映"
          replace
          to="/film/comingSoon"
        ></van-tab>
      </van-tabs>
    </van-sticky>
    <!-- 父级路由添加嵌套路由加载组件 显示位置 -->
    <router-view></router-view>
    <!-- 底部菜单遮挡部分 设置一个高度将底部显示出来 -->
    <div style="height:50px"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs, NavBar, Icon, Sticky } from 'vant'

Vue.use(Tab)
Vue.use(Tabs)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Sticky)
export default {
  data() {
    return {
      // 顶部导航栏显示状态
      navBarStatus: false,
      // tabs栏显示的状态
      tabsStatus: true,
      // tab标签切换到的标签的下标
      // 根据路由的路径 判断选择第几个标签栏
      active: window.location.pathname === '/film/comingSoon' ? 1 : 0,
      // 城市名称
      cityName: localStorage.getItem('cityName')
        ? localStorage.getItem('cityName')
        : '北京'
    }
  },
  methods: {
    changeStatus(event) {
      // console.log(event);
      // if(event.scrollTop > 300){
      //   this.navBarStatus = true
      // }else{
      //   this.navBarStatus = false
      // }
      // 距离顶部100-300之间隐藏
      this.tabsStatus = event.scrollTop < 100 || event.scrollTop > 300
      this.navBarStatus = event.scrollTop > 300
    }
  }
}
</script>

<style lang="scss" scoped>
/* scoped 当前组件生成 不会影响下级组件  样式的作用域 */
/* 样式穿透的写法 ::v-deep */
/* ::v-deep .van-tabs__line{
  background-color: #ff5f16;
} */
/* 新版里 样式穿透写法  :deep(选择器) */
:deep(.van-tabs__line) {
  background-color: #ff5f16;
}
:deep(.van-nav-bar__text) {
  color: black;
}
:deep(.van-icon-arrow-down) {
  color: black;
}
:deep(.van-sticky) {
  background-color: #fff;
}
</style>