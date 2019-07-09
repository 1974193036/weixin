import HTTP from '../utils/http.js'

class BookModel extends HTTP {
  constructor() {
    super()
  }

  /**
   * 获取书单页面精选列表数据
   */
  getHotList() {
    return this.request({
      url: '/book/hot_list'
    })
  }


  /**
   * 获取书单详情
   * @param bid 本书id
   */
  getDetail(bid) {
    return this.request({
      url: `/book/${bid}/detail`
    })
  }


  /**
   * 获取短评数据
   * @param bid 本书id
   */
  getComments(bid) {
    return this.request({
      url: `/book/${bid}/short_comment`
    })
  }


  /**
   * 获取收藏数量和状态
   * @param bid 本书id
   */
  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}/favor`
    })
  }


  /**
   * 提交短评
   * @param bid 本书id
   * @param comment 短评字词
   */
  postComment(bid, comment) {
    return this.request({
      url: '/book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }


  /**
   * 获取搜索结果
   * @param start 页码
   * @param q 搜索关键字
   */
  search(start, q) {
    return this.request({
      url: '/book/search?summary=1',
      data: {
        start: start,
        q: q
      }
    })
  }

  /**
   * 获取喜欢的书数量
   */
  getMyBookCount() {
    return this.request({
      url: '/book/favor/count'
    })
  }

}

export default BookModel