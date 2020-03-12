import postsData from '../../data/posts-data.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    posts: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      posts: postsData.posts,
    })
  },

  /**
   * 监听文章点击
   */
  onPostTap(event) {
    const postId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  onSwiperTap(event) {
    const postId = event.target.dataset.id
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
})
