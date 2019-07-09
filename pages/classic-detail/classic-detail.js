// pages/classic-detail/classic-detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cid: null,
    type: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cid = options.cid 
    const type = options.type
    this.setData({
      cid: cid,
      type: type
    })
  }
})