// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
// new Vuex.Store创建一个新的store
// 分模块 使用的是同一个store  不能创建新的store 只能是一个普通对象
export default {
  // 开启命名空间
  namespaced: true,
  state: {
    num: 1000,
    // 底部菜单显示的状态
    footerShow: true
  },
  getters: {},
  mutations: {
    dec(state, payload) {
      state.num -= payload
    },
    setFooterShow(state) {
      // 因为只有true和false两种状态
      // 只要修改 肯定修改为相反状态
      state.footerShow = !state.footerShow
    }
  },
  actions: {}
}
