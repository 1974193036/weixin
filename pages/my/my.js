// pages/my/my.js
import BookModel from '../../models/book.js'
import ClassicModel from '../../models/classic.js'
import { promisic } from '../../utils/common.js'

const bookModel = new BookModel()
const classicModel = new ClassicModel()

// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookCount: 0, // 喜欢的书数量
    classics: [], // 收藏列表数据
    authorized: false, // 是否已经授权获取用户信息
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMyBookCount()
    this.getMyFavor()
    this.userAuthorized()
  },

  /**
   * 获取喜欢的书数量
   */
  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  /**
   * 获取收藏列表(电影，音乐，句子)
   */
  getMyFavor() {
    classicModel.getMyFavor().then(res => {
      this.setData({
        classics: res
      })
    })
  },

  /**
   * 跳转到详情页
   */
  onJumpToDetail(e) {
    const cid = e.detail.cid
    const type = e.detail.type
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  },

  /**
   * 点击获取用户信息
   */
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo

    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        authorized: true
      })
    }
  },

  /**
   * 如果已经获取了用户信息，直接获取头像昵称
   */
  userAuthorized() {
    // 方案1
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     authorized: true,
    //     userInfo: app.globalData.userInfo
    //   })
    // }

    // 方案2
    // 获取用户当前的授权状态
    // 如果已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: data => {
    //           this.setData({
    //             authorized: true,
    //             userInfo: data.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })

    // 方案3，针对方案2用promise优化
    promisic(wx.getSetting)().then(res => {
      if (res.authSetting['scope.userInfo']) {
        return promisic(wx.getUserInfo)()
      }
      return false
    }).then(data => {
      if (!data) return
      this.setData({
        authorized: true,
        userInfo: data.userInfo
      })
    })
  }
})