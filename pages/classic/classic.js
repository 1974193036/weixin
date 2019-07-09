// pages/classic/classic.js
import ClassicModel from '../../models/classic.js'
import LikeModel from '../../models/like.js'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cid: {
      type: Number
    },
    type: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    classic: {}, // 页面数据
    likeCount: 0, // 收藏数量
    likeStatus: 0, // 收藏状态
    latest: true, // 是否最新页，index=8，刚载入页面就能看到的页面
    first: false // 是否第一页（页面倒叙，最后一页），index=1，需要点击右侧按钮切换到最后
  },

  /**
   * 组件的生命周期，节点树完成，可以用setData渲染节点，但无法操作节点
   */
  attached() {
    const cid = this.properties.cid
    const type = this.properties.type
    if (!cid) {
      classicModel.getLatest().then(res => {
        this.setData({
          classic: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
        })
      })
    } else {
      classicModel.getById(cid, type).then(res => {
        this.setData({
          classic: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status,
          // latest: classicModel.isLatest(res.index),
          // first: classicModel.isFirst(res.index)
        })
      })
    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击左侧按钮
     */
    onNext() {
      this._updateClassic('next')
    },

    /**
     * 点击右侧侧按钮
     */
    onPrevious() {
      this._updateClassic('previous')
    },

    /**
     * 操作收藏/取消收藏
     */
    onLike(e) {
      const behavior = e.detail.behavior
      likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
    },

    /**
     * 点击左侧 or 右侧按钮，进行页面切换
     * @param nextOrPrevious
     */
    _updateClassic(nextOrPrevious) {
      const index = this.data.classic.index

      classicModel.getClassic(index, nextOrPrevious).then(res => {
        this.setData({
          classic: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
        })
      })
    }

  }
})