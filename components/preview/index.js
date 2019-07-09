// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object,
      observer: function (newVal, oldVal, changedPath) {
        if (newVal) {
          var typeText = {
            100: '电影',
            200: '音乐',
            300: '句子'
          }[newVal.type]
        }
        this.setData({
          typeText: typeText
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: '' // 收藏类型tag
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      this.triggerEvent('tapping', {
        cid: this.properties.classic.id,
        type: this.properties.classic.type
      }, {})
    }
  }
})