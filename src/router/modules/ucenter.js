/***
 *  路由模块化
 *  根据不同业务模块 将路由分布在不同文件中
 *  方便后续进行维护
 *
 *
 */
import Ucenter from '../../views/ucenter/ucenter.vue'
const routes = [
  {
    // url地址路径
    path: '/ucenter',
    // 渲染的组件对象
    component: Ucenter
  },
  {
    path: '/login',
    component: () => import('../../views/ucenter/login.vue')
  },
  {
    path: '/money',
    component: () => import('../../views/ucenter/money.vue'),
    // 路由元信息 就是参数的传递  隐式传参
    meta:{
      isLogin:true
    }
  }
]
// 默认导出
export default routes
