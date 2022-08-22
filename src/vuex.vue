<template>
  <div>
    vuex使用
    <div>
      <button @click="$store.commit('add',10)">{{$store.state.num}}</button>
    </div>
    <div>
      <button @click="add(20)">{{num}}</button>
    </div>
    <div>
      <button @click="$store.dispatch('asyncAdd',100)">{{num}}</button>
    </div>
    <div>
      <button @click="asyncAdd(200)">{{num}}</button>
    </div>
    <hr>
    <div>
     {{$store.getters.getNum}}
    </div>
     <div>
     {{getNum}}
    </div>
    <hr>
    <div>{{$store.state.film.num}}</div>
     <div>
      <button @click="$store.commit('film/dec',100)">{{$store.state.film.num}}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
/**
 *   vuex操作
 *   读取
 *   方法一:this.$store.state.xxx
 *   方法二:将state映射为计算属性  ...mapState
 * 
 *    getters获取数据
 *    方法一:this.$store.getters.xxx
 *    方法二:将getters获取映射到方法里 ...mapGetters
 *
 *   设置
 *   同步方法
 *   方法一:this.$store.commit('修改方法',payload)
 *   方法二:将方法映射为组件内部的方法  ...mapMutations
 *   异步方法
 *   方法一:this.$store.dispatch('asyncAdd',100)
 *   方法二:将异步方法映射到组件的计算属性 ...mapActions
 *
 *
 *
 */
export default {
  mounted() {
    console.log(this.$store)
  },
  computed: {
    // 方法二:将state映射为计算属性  ...mapState
    ...mapState(['num']),
     // 方法二:将获取修饰数据方法映射到组件计算属性  ...mapGetters
    ...mapGetters(['getNum'])
  },
  methods: {
    //  方法二:将方法映射为组件内容的方法  ...mapMutations
    ...mapMutations(['add']),
    //  方法二:将异步方法映射到组件的方法  ...mapActions
    ...mapActions(['asyncAdd']),
  }
}
</script>

<style lang="scss" scoped>
</style>