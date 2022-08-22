/**
 *  接口地址模块化 封装
 *  数据接口API地址 进行统一管理
 *
 *
 */
// 地址前缀 接口地址公共部分
// const prefix = 'https://api.iynn.cn/film/api/v1'
// 通过在不同的环境下，加载不同的环境变量
// 开发环境 /api
// 生产环境 https://api.iynn.cn/film/api/v1
const prefix = process.env.VUE_APP_API_PREFIX
const url = {
  // 正在热映
  nowPlaying: prefix + '/getNowPlayingFilmList?cors=T',
  // 即将上映
  comingSoon: prefix + '/getComingSoonFilmList?cors=T',
  // 城市列表
  cityList: prefix + '/getCitiesInfo?cors=T',
  // 影片详情
  filmInfo: prefix + '/getFilmInfo?cors=T'
}
export default url
