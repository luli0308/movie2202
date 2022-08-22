/***
 *  路由模块化
 *  根据不同业务模块 将路由分布在不同文件中
 *  方便后续进行维护
 *
 *
 */
import Film from '@/views/film/film.vue'
const routes = [
  {
    // url地址路径
    path: '/film',
    // 渲染的组件对象
    component: Film,
    // 嵌套路由
    children: [
      {
        // 不能从/开始,从上级父路由开始
        path: 'nowPlaying',
        component: () => import('../../views/film/nowPlaying.vue')
      },
      {
        path: 'comingSoon',
        component: () => import('../../views/film/comingSoon.vue')
      }
    ]
  },
  {
    path:'/films/:id?',
    // 路由别名 名称  
    name:'films',
    component:()=>import('../../views/film/detail.vue')
  }
]
// 默认导出
export default routes
