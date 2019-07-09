import HTTP from '../utils/http.js'

class LikeModel extends HTTP {
  constructor() {
    super()
  }

  /**
   * 操作收藏/取消收藏
   * @param behavior('like' : 'cancel')
   * @param artID
   * @param category
   */
  like(behavior, artID, category) {
    let url = behavior == 'like' ? '/like' : '/like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }

}

export default LikeModel