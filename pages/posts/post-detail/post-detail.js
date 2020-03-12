import postsData from '../../../data/posts-data.js'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isMusicPlaying: false,
    isFavorite: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const postId = Number(options.id)
    this.setData(postsData.posts[postId])

    this.initMusicEvent()

    // 文章收藏列表缓存
    const favoriteList = wx.getStorageSync('favoritePostIds') || []
    this.setData({
      isFavorite: favoriteList.includes(postId),
    })
  },

  /**
   * 初始化音乐事件
   */
  initMusicEvent() {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    if (backgroundAudioManager.paused === false) {
      this.playMusic()
    }

    backgroundAudioManager.onPlay(() => {
      this.playMusic()
    })

    backgroundAudioManager.onStop(() => {
      this.stopMusic()
    })

    backgroundAudioManager.onPause(() => {
      this.stopMusic()
    })
  },

  /**
   * 设置当前页面音乐播放状态
   */
  playMusic() {
    if (app.data.currentMusicPostId === this.data.id) {
      this.setData({
        isMusicPlaying: true,
      })
    }
  },

  /**
   * 设置当前页面音乐结束状态
   */
  stopMusic() {
    this.setData({
      isMusicPlaying: false,
    })
  },

  /**
   * 收藏 / 取消收藏
   */
  onFavoriteTap() {
    this.setData({
      isFavorite: !this.data.isFavorite,
    })

    const favoriteList = wx.getStorageSync('favoritePostIds') || []
    if (favoriteList.includes(this.data.id)) {
      favoriteList.splice(favoriteList.indexOf(this.data.id), 1)
    } else {
      favoriteList.push(this.data.id)
    }

    wx.setStorageSync('favoritePostIds', favoriteList)
    wx.showToast({
      title: this.data.isFavorite ? '收藏成功' : '取消成功',
      duration: 1000,
    })
  },

  /**
   * 音乐
   */
  onMusicTap() {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    if (this.data.isMusicPlaying) {
      backgroundAudioManager.pause()
      this.stopMusic()
      app.data.currentMusicPostId = -1
      return
    }

    // 继续播放
    if (backgroundAudioManager.src === this.data.music.src) {
      backgroundAudioManager.play()
    } else {
      backgroundAudioManager.title = this.data.music.title
      backgroundAudioManager.epname = this.data.music.epname
      backgroundAudioManager.singer = this.data.music.singer
      backgroundAudioManager.coverImgUrl = this.data.music.coverImgUrl
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = this.data.music.src
    }

    this.playMusic()
    app.data.currentMusicPostId = this.data.id
  },
})
