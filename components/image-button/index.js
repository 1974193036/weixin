// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 设置slot
  },
  properties: {
    openType: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  methods: {
    /**
     * open-type
     * open-type='share', 出现分享弹窗
     * open-type='getUserInfo', 出现获取用户信息授权弹窗，配合属性 bindgetuserinfo
     */
    onGetUserInfo(e) {
      this.triggerEvent('getuserinfo', {
        userInfo: e.detail.userInfo
      }, {})
    }
  }
})