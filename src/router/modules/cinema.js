/***
 *  路由模块化
 *  根据不同业务模块 将路由分布在不同文件中
 *  方便后续进行维护
 *
 *
 */
import Cinema from '../../views/cinema/cinema.vue'
 const routes = [
   {
     // url地址路径
     path: '/cinema',
     // 渲染的组件对象
     component: Cinema,
     meta:{
      isLogin:true
     }
   }
 ]
 // 默认导出
 export default routes
 