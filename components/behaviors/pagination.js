const PaginationBev = Behavior({
  data: {
    dataArray: [], // 列表数据
    total: 0, // 总条数
    noneResult: false, // 是否显示 '无搜索结果'
    loading: false // 是否显示 上拉加载loading 效果
  },

  methods: {
    // 显示数据
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    // 获取页码
    getCurrentStart() {
      return this.data.dataArray.length
    },

    // 设置总条数，总条数为0处理
    setTotal(total) {
      // this.data.total = total
      this.setData({
        total: total
      })
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },

    // 判断是否已经加载完全部数据
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    // 初始化搜索状态
    initialize() {
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false,
        total: 0
      })
      // this.data.total = 0
    },

    // 如果 上拉加载 正在执行，则不监听页面触底事件
    isLocked() {
      return this.data.loading ? true : false
    },

    // 显示 上拉加载loading
    locked() {
      this.setData({
        loading: true
      })
    },

    // 隐藏 上拉加载loading
    unLocked() {
      this.setData({
        loading: false
      })
    },

  }
})

export default PaginationBev
  