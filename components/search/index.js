// components/search/index.js
import BookModel from '../../models/book.js'
import PaginationBev from '../behaviors/pagination.js'
import KeywordModel from '../../models/keyword.js'

const bookModel = new BookModel()
const keywordModel = new KeywordModel()

Component({
  /**
   * 组件间代码共享的特性
   */
  behaviors: [PaginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [], // 历史搜索字段列表
    hotWords: [], // 热门搜索字段列表
    searching: false, // 是否显示搜索结果列表
    q: '', // 输入框值
    loadingCenter: false, // 是否显示 搜索loading 效果
  },

   /**
   * 组件的生命周期，节点树完成，可以用setData渲染节点，但无法操作节点
   */
  attached() {
    console.log('attached')
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },
  
  methods: {
    /**
     * 点击取消按钮，发送事件到父组件，关闭搜索页面，回到书单列表
     */
    onCancel() {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    /**
     * 搜索书籍
     */
    onConfirm(e) {
      this._showResult()
      this._showLoadingCenter()
      this.initialize()

      const q = e.detail.value || e.detail.text
      this.setData({
        q: q
      })
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this._hideLoadingCenter()
        keywordModel.addToHistory(q)
      }, () => {
        this._hideLoadingCenter()
      })
    },

    /**
     * 上拉加载更多
     */
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }

      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.unLocked()
        }, () => {
          this.unLocked()
        })
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
      }
    },

    /**
     * 删除输入框到内容
     */
    onDelete() {
      this.initialize()
      this._closeResult()
      this._hideLoadingCenter()
    },

    /**
     * 展示搜索结果
     */
    _showResult() {
      this.setData({
        searching: true
      })
    },

    /**
     * 关闭搜索结果
     * 情况输入框内容
     */
    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    },

    /**
     * 展示搜索loading
     */
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    /**
     * 隐藏搜索loading
     */
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    /**
    * 页面上拉触底事件的处理函数
    * 由于此页面不是一个新的页面栈，仍然处于 /page/book/book 页面内，
    * 所以 onReachBottom 无效，需要监听 /page/book/book 页面内的上拉触底事件
    */
    onReachBottom: function () {
      // this.loadMore()
    },
  }
})