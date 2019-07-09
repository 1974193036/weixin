// components/book/index.js
Component({
  properties: {
    book: {
      type: Object,
      value: {}
    },
    showLike: {
      type: Boolean,
      value: true
    }
  },
  data() {

  },
  methods: {
    onTap() {
      const bid = this.properties.book.id
      wx.navigateTo({
        url: `../../pages/book-detail/book-detail?bid=${bid}`
      })
    }
  }
})