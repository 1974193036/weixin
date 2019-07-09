import HTTP from '../utils/http.js'

class KeywordModel extends HTTP {
  key = 'q' // 存到storage内的key
  maxLength = 10 // 历史搜索最多显示10个


  /**
   * 从storage内取历史搜索
   */
  getHistory() {
    const words = wx.getStorageSync(this.key)
    if (!words) {
      return []
    }
    return words
  }

  /**
   * 获取热门搜索字词数据
   */
  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  /**
   * 添加搜索过的书籍名称到历史记录
   * @param keyword 
   */
  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    // 队列 栈
    if (!has) {
      // 数组末尾 删除 ， keyword 数组第一位
      const length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }

}

export default KeywordModel
