<template>
  <div class="item van-hairline--bottom">
    <!-- 图片 -->
    <div @click="goDetail(filmId)">
      <slot name="left"></slot>
    </div>
    <!-- 信息 -->
    <div @click="goDetail(filmId)">
      <slot name="center"></slot>
    </div>
    <!-- 按钮 -->
    <div style="width:15%">
      <van-button
        v-if="isPresale"
        plain
        :color="color"
      >{{text}}</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'vant'
Vue.use(Button)
export default {
  // props接收两种语法：
  // 1、数组 简单便捷
  // 2、对象 可以设置约束
  props: {
    // text 组件的属性
    text: {
      // 属性值的类型
      type: String,
      require: true
    },
    isPresale: {
      type: Boolean,
      default: true
    },
    filmId: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      color: this.text === '预购' ? '#ffb232' : '#ff5f16'
    }
  },
  methods: {
    goDetail(filmId) {
      console.log(filmId)
      // 传递params参数时 跳转使用name属性 不能使用path
      this.$router.push({ name: 'films', params: { id: filmId } })
      // this.$router.push({ path: '/films/', params: { id: '123' } })
      // this.$router.push({ path: '/films/'+filmId})
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 10px 10px 10px 0px;
  display: flex;
  justify-content: space-around;
  /* nth-child(1) 选择子元素的第几个 */
  > div:nth-child(1) {
    > img {
      border-radius: 2px;
      width: 66px;
      height: 95px;
    }
  }
  > div:nth-child(2) {
    width: 58%;
    > div:nth-child(1) {
      font-size: 1.1em;
      font-weight: 500;
    }
    > div:nth-child(2) {
      margin-top: 5px;
      color: gray;
      font-size: 0.85em;
      > div:nth-child(2) {
        margin-top: 2.5px;
        margin-bottom: 2.5px;
        /* 一行显示 超出隐藏  ...代替 */
        /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
      }
    }
  }
  > div:nth-child(3) {
    display: flex;
    align-items: center;
    > button {
      height: 25px;
      font-size: 0.8em;
      padding: 0 10px;
    }
  }
}
.film-type {
  color: white;
  background-color: #d2d6dc;
  border-radius: 2px;
  font-size: 0.8em;
  padding: 0 2px;
}
</style>