// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: { // 显示标题
      type: String
    },
    latest: { // 是否是最新页（页面刚载入见到的页面），index=08
      type: Boolean
    },
    first: { // 是否是最后一页，index=01
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft() {
      if (!this.properties.latest){
        this.triggerEvent('left', {}, {})
      }
    },
    onRight() {
      if (!this.properties.first){
        this.triggerEvent('right', {}, {})
      }
    }
  }
})