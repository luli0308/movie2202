import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入封装后的axios
import axios from './http/req'
// 引入过滤器
import filmFilter from './filters/film'
Vue.filter('parseActors', filmFilter.parseActors)
Vue.filter('parseTime', filmFilter.parseTime)
// 在Vue原型上添加属性 后续可以直接通过 this.$http 在组件中使用
Vue.prototype.$http = axios
Vue.config.productionTip = false
import { Lazyload } from 'vant'
// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload)
// 导入懒加载图片
import lazyloadImg from './assets/images/lazy_load.png'
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  // 懒加载的预置图片
  loading:lazyloadImg
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
