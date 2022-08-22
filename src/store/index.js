import Vue from 'vue'
import Vuex from 'vuex'
// 导入分模块的仓库
import film from './modules/film'
// 插件使用语法  使用某个插件
Vue.use(Vuex)

// 创建一个store 并导出
export default new Vuex.Store({
  // 初始化的状态
  state: {
    // 读取localStorage
    num: localStorage.getItem('num') ? Number(localStorage.getItem('num')) : 100
  },
  // 编写方法获取数据 并且对于数据进行处理
  // 监控器  当数据发生改变时会触发
  getters: {
    getNum(state) {
      console.log('num发生修改了')
      // 进行数据处理返回
      // 必须要有返回值
      return '计算结果为:' + state.num
    }
  },
  // 同步修改方法
  mutations: {
    // 传入state进行操作
    // payload 载荷  就是一个参数
    add(state, payload) {
      // 根据传入的参数payload 进行对num数的增加
      state.num += payload
      // mutations里可以写异步操作
      // setTimeout(() => state.num += payload, 2000)
      // 持久化存储
      localStorage.setItem('num', state.num)
    },
    dec(state, payload) {
      state.num -= payload
    }
  },
  // mutations和actions 为了方便在调试工具中查看方法
  // 实际它里面写同步或者异步方法都可以吧
  // 异步修改方法  里面方法 本身不直接操作state数据  调用mutaions里的方法进行操作
  actions: {
    // 定时器  发送请求
    // context 上下文  payload 参数
    asyncAdd(context, payload) {
      // 这里this 就是创建的vuex store的实例
      // console.log(this)
      // console.log(context);
      // 定时器模拟异步操作
      setTimeout(() => context.commit('add', payload), 2000)
    }
  },
  // // 模块化是可选的
  modules: {
    // 模块名称:对象
    // film:film
    film
  }
})
