// pages/book-detail/book-detail.js

import BookModel from '../../models/book.js'
import LikeModel from '../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {}, // 详情数据
    comments: [], // 短评数据
    likeStatus: 0, // 是否收藏
    likeCount: 0, // 收藏数量
    posting: false, // 短评模块是否展开
    loaded: false // 接口是否加载完成
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中'
    })
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    Promise.all([detail, comments, likeStatus]).then(res => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums,
        loaded: true
      })
      wx.hideLoading()
    })
    // bookModel.getDetail(bid).then(res => {
    //   this.setData({
    //     book: res
    //   })
    // })
    // bookModel.getComments(bid).then(res => {
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
    // bookModel.getLikeStatus(bid).then(res => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
  },


  /** 
   * 操作收藏/取消收藏
   * */ 
  onLike(e) {
    const like_or_cancel = e.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },


  /**
   * 提交短评功能
   */
  onPost(e) {
    const comment = e.detail.text || e.detail.value

    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+ 1',
        icon: 'none'
      })

      this.data.comments.unshift({
        content: comment,
        nums: 1
      })

      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  },


  /**
   * 展开短评模块
   */
  onFakePost() {
    this.setData({
      posting: true
    })
  },


  /**
   * 关闭短评模块
   */
  onCancel() {
    this.setData({
      posting: false
    })
  }
})