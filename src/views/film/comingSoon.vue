<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="- 无更多电影 -"
      @load="onLoad"
    >
      <Card
        v-for="item in films"
        :key="item.filmId"
        :filmId="item.filmId"
        text="预购"
        :isPresale="item.isPresale"
      >
        <!-- 插入left插槽 -->
        <template v-slot:left>
          <img v-lazy="item.poster"/>
        </template>
        <!-- 插入中间的插槽 影片信息 -->
        <template v-slot:center>
          <!-- 名称 -->
          <div class="van-ellipsis">{{item.name}} <span class="film-type">{{item.filmType.name}}</span></div>
          <div>
            <!-- 演员 -->
            <div class="van-ellipsis">主演: {{item.actors|parseActors}}</div>
            <!-- 上映时间 -->
            <div>上映日期:{{item.premiereAt|parseTime}}</div>
          </div>
        </template>
      </Card>
    </van-list>
  </div>
</template>

<script>
/**
 * 1、发请求
 * 2、拿数据
 * 3、存本地
 * 4、做展示
 *
 *
 */
import url from '@/config/url'
import Card from '@/components/Card.vue'
// 引入时间格式化处理库
import moment from 'moment'
import Vue from 'vue'
import { List } from 'vant'
Vue.use(List)
export default {
  components: { Card },
  data() {
    return {
      films: [],
      loading: false,
      finished: false,
      pageNum: 1,
      total: 0
    }
  },
  created() {
    // $http是在main.js 挂载到原型对象属性的axios
    this.$http.get(url.comingSoon).then((res) => {
      // console.log(res)
      this.films = res.data.data.films
      // 存储总条数
      this.total = res.data.data.total
    })
  },
  methods: {
    onLoad() {
      // console.log(this.pageNum);
      // console.log(Math.ceil(this.total/10));
      if (this.pageNum === Math.ceil(this.total / 10)) {
        this.finished = true
        return
      }
      // console.log('触底加载')
      this.$http
        .get(url.comingSoon, { params: { pageNum: this.pageNum + 1 } })
        .then((res) => {
          // console.log(res)
          this.films = [...this.films, ...res.data.data.films]
          // 每取一起页数+1
          this.pageNum += 1
          this.total = res.data.data.total
          // 请求发送完毕 加载数据成功 将加载状态置为false
          this.loading = false
        })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>