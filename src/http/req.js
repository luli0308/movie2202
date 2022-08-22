/**
 *  对axios进行封装
 *  拦截器封装
 *
 *
 */
import axios from 'axios'
// 引入轻提示组件
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)
// 请求拦截器
axios.interceptors.request.use((cfg) => {
  // console.log('请求拦截')
  // 统一设置请求头添加token信息
  if(localStorage.getItem('jwt')){
    // cfg.headers['authorization'] = localStorage.getItem('jwt')
    cfg.headers.authorization = localStorage.getItem('jwt')
  }
  // 调用显示加载状态
  Toast.loading({
    // 显示文字
    message: '加载中...',
    // duration:0
  })
  return cfg
})

// 响应拦截器
axios.interceptors.response.use((res) => {
  // console.log('响应拦截')
  // 关闭加载状态
  Toast.clear()
  // 判断接口状态请求成功为0 并且接口返回存在token再进行存储
  if (res.data.code === 0 && res.data.token) {
    // 存储token
    localStorage.setItem('jwt', res.data.token)
  }
  return res
})

export default axios
