<template>
  <div>
    <!-- 海报 -->
    <div style="height:210px;overflow:hidden">
      <img
        v-lazy="film.poster"
        style="width:100%;margin-top:-160px"
      />
    </div>
    <!-- 信息 -->
    <div>
      <div>{{film.name}}</div>
      <div>
        <div>{{film.category}}</div>
        <div>{{film.premiereAt|parseTime}}上映</div>
        <div>{{film.nation}} | {{film.runtime}}分钟</div>
        <div>
          {{film.synopsis}}
        </div>
      </div>
    </div>
    <!-- 演员 -->
    <div class="actors">
      <div>演职人员</div>
      <div style="display:flex;width:100%;overflow:auto;">
        <template v-for="item,index in film.actors">
          <div
            v-if="index===0"
            :key="item.name"
            style="margin-left:15px;margin-right:15px"
          >
            <img
              v-lazy="item.avatarAddress"
              style="height:90px;width:80px"
            />
            <div style="text-align:center">
              <!-- 名称 -->
              <div>{{item.name}}</div>
              <!-- 角色名 -->
              <div>{{item.role}}</div>
            </div>
          </div>
          <div
            v-else
            :key="item.name"
            style="margin-right:15px"
          >
            <img
              v-lazy="item.avatarAddress"
              style="height:90px;width:80px"
            />
            <div style="text-align:center">
              <!-- 名称 -->
              <div>{{item.name}}</div>
              <!-- 角色名 -->
              <div>{{item.role}}</div>
            </div>
          </div>
        </template>

      </div>
    </div>
    <!-- 剧照 -->
    <div></div>
  </div>
</template>

<script>
import url from '@/config/url'
/***
 *   从电影列表页面 跳转到详情页面
 *   传递电影id 通过电影id 发送请求获取到电影的详情信息
 *
 */
export default {
  data() {
    return {
      film: {
        poster: ''
      }
    }
  },
  beforeCreate() {
    this.$store.commit('film/setFooterShow')
  },
  created() {
    console.log(this.$route)
    this.$http
      .get(url.filmInfo, { params: { filmId: this.$route.params.id } })
      .then((res) => {
        console.log(res)
        this.film = res.data.data.film
      })
  },
  beforeDestroy() {
    this.$store.commit('film/setFooterShow')
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  overflow: hidden;
}
/* .actors {
  > div:nth-child(2) >div{
    margin-right: 10px;
    margin-left: 10px;
  }
} */
</style>