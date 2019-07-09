// pages/book/book.js

import { random } from '../../utils/common.js'
import BookModel from '../../models/book.js'
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [], // 书单列表
    loadingCenter: true, // loading效果
    searching: false, // 是否出现搜索页面
    more: '' // 监听搜索列表上拉触底事件
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList().then(res => {
      this.setData({
        books: res,
        loadingCenter: false
      })
    }, () => {
      this.setData({
        loadingCenter: false
      })
    })
  },

  /**
   * 点击搜索框，出现搜索页面
   */
  onSearching() {
    this.setData({
      searching: true
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      more: random(16)
    })
  },

  /**
   * 关闭搜索页面
   */
  onCancel() {
    this.setData({
      searching: false
    })
  }

})