import moment from "moment"
const filmFilter = {
  parseActors: (actors) => {
    if (!actors) {
      return
    }
    // 声明空字符串
    let actors_str = ''
    // 遍历演员数组
    actors.forEach((item) => {
      // item是每一个演员数组里的演员  数据结构为对象
      // 取出演员的姓名 并进行字符串拼接
      actors_str += item.name + ' '
    })
    // 拼接好的字符串进行返回
    return actors_str
  },
  parseTime(timestamp) {
    // 中文显示  设置语言包
    moment.locale('zh-cn')
    // 服务端返回的时间戳为s秒,js里的时间戳单位为毫秒ms 需要*1000进行转换
    // 取整 转换后有小数
    return moment(parseInt(timestamp * 1000)).format('ddd M月D日')
  }
}

export default filmFilter
