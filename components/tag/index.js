// components/tag/index.js
Component({
  options: {
    multipleSlots: true // 运行使用多个slot
  },
  externalClasses: ['tag-class'],
  properties: {
    text: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})