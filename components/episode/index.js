// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function (newVal, oldVal, changedPath) {
        let val = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的生命周期，节点树完成，可以用setData渲染节点，但无法操作节点
   */
  attached() {
    // const indexStr = this.properties.index
    // console.log(indexStr)
    // const val = indexStr[1] ? indexStr : '0' + indexStr 
    // this.setData({
    //   _index: val
    // })
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
    year: 0,
    month: 0,
    _index: 0, // 显示的No.数字
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
