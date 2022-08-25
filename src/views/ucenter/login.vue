<template>
  <div>
    <div class="logo">
      <img :src="logo" />
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="mobile"
          name="mobile"
          label="手机号"
          placeholder="手机号"
          :rules="[{ pattern:m_pattern, message: '请填写正确的手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ pattern: p_pattern, message: '密码长度至少6个' }]"
        />
        <div style="margin: 16px;">
          <van-button
            square
            block
            type="info"
            native-type="submit"
          >提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/images/logo.png'
import Vue from 'vue'
import { Form, Field, Button, Toast } from 'vant'
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
export default {
  data() {
    return {
      mobile: '',
      password: '',
      m_pattern: /^1[3-9]\d{9}$/,
      p_pattern: /[\s\S]{6,}/,
      logo
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
      const { password, mobile } = values
      this.$http
        .post('http://10.70.10.139:8080/v1/user/login', { password, mobile })
        .then((res) => {
          // console.log(res)
          if (res.data.code === 0) {
            Toast.success({
              message: '登录成功',
              duration: 500,
              onClose: () => {
                this.$router.replace('/ucenter')
              }
            })
            // 存储token
            // localStorage.setItem('jwt', res.data.token)
          } else {
            Toast.fail('用户名或者密码错误')
          }
        }).catch((e)=>{
          Toast.fail('网络错误!')
        })
    }
  },
  // 初始化操作
  beforeCreate() {
    // console.log(this.$store);
    this.$store.commit('film/setFooterShow')
  },
  beforeDestroy() {
    // console.log(this.$store);
    this.$store.commit('film/setFooterShow')
  }
}
</script>

<style scoped>
.logo {
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: center;
}
</style>

</style>
