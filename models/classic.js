import HTTP from '../utils/http.js'

class ClassicModel extends HTTP {
  constructor() {
    super()
  }

  /**
   * 获取初始化最新数据
   * 返回 index=8
   * 最新页，刚载入页面就能看到的页面
   */
  getLatest() {
    return this.request({
      url: '/classic/latest',
    }).then(res => {
      this._setLatestIndex(res.index)
      let key = this._getKey(res.index)
      wx.setStorageSync(key, res)
      return res // 再次暴露res给下一个 then 使用
    })
  }

  /** 
   * 点击左侧 or 右侧按钮，获取切换后的页面内容，进行页面切换
   * @param index
   * @param nextOrPrevious
   */
  getClassic(index, nextOrPrevious) {
    // 缓存中寻找 or API 写入到缓存中
    // key 确定key
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key) // 获取 storage 内的页面内容object

    if (!classic) {
      return this.request({
        url: `/classic/${index}/${nextOrPrevious}`,
      }).then(res => {
        wx.setStorageSync(this._getKey(res.index), res)
        return res // 再次暴露res给下一个 then 使用
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve(classic)
      })
    }


    // if (!classic) {
    //   this.request({
    //     url: `classic/${index}/${nextOrPrevious}`,
    //     success: (res) => {
    //       wx.setStorageSync(
    //         this._getKey(res.index), res)
    //       sCallback(res)
    //     }
    //   })
    // } else {
    //   sCallback(classic)
    // }
  }

  /**
   * @param index
   * 判断是否是最新页，刚载入页面就能看到的页面
   */
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  /**
   * @param index
   * 判断是否是最后一页，点击右侧按钮可以切换到最后一页
   */
  isFirst(index) {
    return index == 1 ? true : false
  }


  /**
   * @param index
   * storage内存入最新页的 index=8
   * @returns {storage: {latest: 8}}
   */
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  /**
   * storage内取出最新页的 index=8
   */
  _getLatestIndex() {
    const index = wx.getStorageSync('latest')
    return index
  }

  /**
   * @param index
   * @returns 'classic-数字'
   */
  _getKey(index) {
    const key = 'classic-' + index
    return key
  }

  /**
   * 获取收藏列表(电影，音乐，句子)
   */
  getMyFavor() {
    return this.request({
      url: '/classic/favor',
    })
  }

  /**
   * 获取【喜欢】tab页面进入的详情页的数据
   */
  getById(cid, type) {
    return this.request({
      url: `/classic/${type}/${cid}`,
    })
  }
}

export default ClassicModel