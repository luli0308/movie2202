import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由模块文件
import FilmRoutes from './modules/film'
import CinemaRoutes from './modules/cinema'
import NewsRoutes from './modules/news'
import UcenterRoutes from './modules/ucenter'
import { Toast } from 'vant'
Vue.use(Toast)
Vue.use(VueRouter)
// 数据合并
const routes = [
  // 重定向
  {
    path: '/',
    redirect: '/film/nowPlaying'
    // redirect:'/vuex'
  },
  {
    path: '/city',
    component: () => import('@/views/city.vue')
  },
  {
    path: '/vuex',
    component: () => import('@/vuex.vue')
  },
  // ...xxx 将数组元素一个一个放进来
  ...FilmRoutes,
  ...CinemaRoutes,
  ...NewsRoutes,
  ...UcenterRoutes
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//to 跳转到的路由信息
// from 来源路由信息
// next 放行函数
// router.beforeEach((to, from, next) => {
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('role') === 'admin') {
    next()
    return
  }
  // console.log(to)
  // console.log(from)
  if (to.meta.isLogin) {
    // 判断用户是否登录
    if (localStorage.getItem('jwt')) {
      next()
    } else {
      Toast.fail({
        message: '没有权限请登录！',
        duration: 500,
        onClose() {
          // this 代表vue实例 此处没有vue实例
          // this.$router.push('/login')
          // next('/login')
          router.push('/login')
        }
      })
    }
  } else {
    next()
  }
})
export default router
