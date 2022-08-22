<template>
  <!-- 条件渲染 接口数据为异步返回 数据未返回时 先不渲染 -->
  <div v-if="films.length>0">
    <!-- van-list 组件中
      v-model loading 加载状态
      finished 完成状态
      immediate-check 关闭默认加载
      @load  当触底时 加载触发

      List 组件通过 loading 和 finished 两个变量控制加载状态，当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。若数据已全部加载完毕，则直接将 finished 设置成 true 即可。
     -->
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
        text="购票"
        :filmId="item.filmId"
      >
        <!-- 插入left插槽 -->
          <template v-slot:left>
            <img v-lazy="item.poster" />
          </template>
          <!-- 插入中间的插槽 影片信息 -->
          <template v-slot:center>
            <!-- 名称 -->
            <div class="van-ellipsis">{{item.name}} <span class="film-type">{{item.filmType.name}}</span></div>
            <div>
              <!-- 评分 -->
              <div v-if="item.grade">观众评分 <span style="color:#ffb232">{{item.grade}}</span></div>
              <div v-else>暂无评分</div>
              <!-- 演员 -->
              <div class="van-ellipsis">主演: {{item.actors|parseActors}}</div>
              <!-- 时间 -->
              <div>{{item.nation}} | {{item.runtime}}分钟</div>
            </div>
          </template>
      </Card>
    </van-list>
  </div>
</template>

<script>
/***
 *   在vue完成一个页面的案例基本实现步骤
 *   1、发送请求
 *   2、获取数据  在请求回调方法里打印
 *   3、存本地  组件的data选项中  data里的数据是响应式的
 *   4、做展示  渲染页面 调用组件  v-if v-for,xxxx css样式
 *
 *
 */
import url from '../../config/url'
// 引入vant组件
import Vue from 'vue'
import { Button, Calendar, Cell, List } from 'vant'
import Card from '@/components/Card.vue'
Vue.use(Button)
Vue.use(Calendar)
Vue.use(Cell)
Vue.use(List)
export default {
  components: { Card },
  data() {
    return {
      // 电影列表
      films: [],
      // 加载状态
      loading: false,
      // 完成状态
      finished: false,
      // 当前页数
      page: 1,
      // 总条数
      total: 0
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 默认调取第一页
    loadData(page = 1) {
      this.$http
        .get(url.nowPlaying, {
          // params: { pageNum: page, cityId: this.$route.query.cityId }
          params: { pageNum: page, cityId: localStorage.getItem('cityId') }
        })
        .then((res) => {
          // console.log(res)
          // 根据数据返回的结构 进行数据赋值操作
          // 新数据和旧数据进行拼接 旧+新
          this.films = [...this.films, ...res.data.data.films]
          // 当前页数+1
          this.page += 1
          // 总条数
          this.total = res.data.data.total
          // 需要加载完毕再置为false 才可以进行新的触底加载
          this.loading = false
        })
    },
    onLoad() {
      // console.log('加载数据')
      // 默认loading为fasle 不可触底 当onLoad方法执行时,把loading置为true
      // 判断最大页数和当前页数 如果当前页数就是最大页数 就不发请求了
      // 41条数据
      // 4页 40条
      if (this.page > Math.ceil(this.total / 10)) {
        // 将加载状态设置为完成
        this.finished = true
        return
      }
      this.loadData(this.page)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>