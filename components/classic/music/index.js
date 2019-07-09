// components/classic/music/index.js
import ClassicBeh from '../classic-beh.js'

// 获取全局唯一的背景音频管理器。 小程序切入后台，如果音频处于播放状态，可以继续播放。但是后台状态不能通过调用API操纵音频的播放状态
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
  * 组件间代码共享的特性
  */
  behaviors: [ClassicBeh],

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    src: {
      type: String
    }
  },

  /**
  * 组件的生命周期，节点树完成，可以用setData渲染节点，但无法操作节点
  */
  attached() {
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false, // 是否播放音乐
    pauseSrc: 'images/player@pause.png', // 播放图片
    playSrc: 'images/player@play.png' // 暂停图片
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 设置 src title 开始播放
     * pause方法，停止播放
     */
    onPlay() {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    /**
     * 如果音乐先是在播放状态，每次切换到音乐时，wx:if会销毁再次生成新页面，页面数据会重置，但是音乐仍然在播放
     * 判断播放状态重新设置 playing=true
     * 
     * 如果音乐先是暂停状态，每次切换到音乐时，设置 playing = false
     */
    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }

      // 判断是当前已经正在播放的音乐，防止初始化就旋转图片，防止播放下一首音乐上一首图片还在旋转
      // console.log(mMgr.src) 初始化时候=undefined，以后是当前播放的音乐
      // console.log(this.properties.src) 初始化时候=http://xxxx.mp3
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    /** 
     * 监听后台切换状态
     */
    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
