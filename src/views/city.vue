<template>
  <div>
    <van-index-bar :index-list="indexList">
      <!-- 
        [
          {index:'A',area:[
              {cityId: 340800, name: '安庆', pinyin: 'anqing', isHot: 0},
              xxxx
          ]}
        ]
       -->
      <template v-for="item in cityList">
        <van-index-anchor
          :key="item.index"
          :index="item.index"
        >{{item.index}}
        </van-index-anchor>
        <!-- 每一个城市 -->
        <van-cell
          v-for="item1 in item.cities"
          :key="item1.cityId"
          :title="item1.name"
          @click="goFilm(item1)"
        />
      </template>

    </van-index-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell } from 'vant'

Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Cell)
import url from '@/config/url'
export default {
  data() {
    return {
      // 右侧的索引列表
      indexList: [],
      // 左侧的城市列表
      cityList: [
        // {
        //   index: 'A',
        //   cities: [
        //     { cityId: 340800, name: '安庆', pinyin: 'anqing', isHot: 0 },
        //     { cityId: 410500, name: '安阳', pinyin: 'anyang', isHot: 0 }
        //   ]
        // },
        // {
        //   index: 'B',
        //   cities: [
        //     { cityId: 340801, name: '北京', pinyin: 'anqing', isHot: 0 },
        //     { cityId: 410502, name: '北海', pinyin: 'anyang', isHot: 0 }
        //   ]
        // }
      ]
    }
  },
  // 初始化操作
  beforeCreate() {
    // console.log(this.$store);
    this.$store.commit('film/setFooterShow')
  },
  created() {
    this.$http.get(url.cityList).then((res) => {
      console.log(res)
      // 获取右侧索引列表
      this.parseIndexList2(res)
      // 获取左侧城市列表
      this.parseCityList(res)
    })
  },
  // 回收资源操作  重置状态
  beforeDestroy() {
    this.$store.commit('film/setFooterShow')
  },
  methods: {
    // 重组索引列表结构
    parseIndexList(res) {
      let indexList = []
      res.data.data.cities.forEach((item, index) => {
        // 取出首字母
        let letter = item.pinyin.slice(0, 1).toUpperCase()
        // 判断元素是否已经存在数组中 如果不存在再添加进去
        // if(indexList.indexOf(letter)===-1){
        if (!indexList.includes(letter)) {
          indexList.push(letter)
        }
      })
      // 字母排序后进行赋值
      this.indexList = indexList.sort()
    },
    parseIndexList2(res) {
      let indexList = []
      res.data.data.cities.forEach((item, index) => {
        // 取出首字母
        let letter = item.pinyin.slice(0, 1).toUpperCase()
        // 判断元素是否已经存在数组中 如果不存在再添加进去
        // if(indexList.indexOf(letter)===-1){
        indexList.push(letter)
      })
      // 通过set集合[天然去重] 再转为数组 进行排序
      // console.log(Array.from(new Set(indexList)).sort());
      // 字母排序后进行赋值
      this.indexList = [...new Set(indexList)].sort()
    },
    // 处理左侧城市列表
    parseCityList(res) {
      let cityList = []
      this.indexList.forEach((item, index) => {
        // item 就是首字母索引
        // 创建空对象存储数据  {index:'A',area:[{},{}]}
        let obj = { index: item }
        // 过滤出符合条件的元素 并合并返回为数组
        let cities = res.data.data.cities.filter((item1, index1) => {
          // item1 每一个城市数据 对象结构
          if (item1.pinyin.slice(0, 1).toUpperCase() === item) {
            return item1
          }
        })
        // 将数组放入对象中
        obj.cities = cities
        // 添加城市列表中
        cityList.push(obj)
      })
      this.cityList = cityList
      // console.log(this.cityList);
    },
    // 跳转到电影模块
    goFilm(item1) {
      // console.log(this.$route);
      // 从哪儿来的,再跳转哪儿去
      // this.$router.push({path:this.$route.query.back,query:{cityId}})
      // 存储参数到LocalStorage中
      localStorage.setItem('cityId', item1.cityId)
      localStorage.setItem('cityName', item1.name)
      this.$router.push({ path: this.$route.query.back })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>