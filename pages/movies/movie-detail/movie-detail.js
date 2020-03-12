import { API } from '../../../config/config.js'
import { get } from '../../../utils/request.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const movieId = options.id
    const movieURL = API.getMovieById + movieId

    this.getMovieData(movieURL)
  },

  getMovieData(url) {
    get(url, {}, this.processMovieData)
  },

  processMovieData(data) {
    const movie = {
      image: data.images.small,
      title: data.title,
      country: data.countries[0],
      year: data.year,
      likeCount: data.collect_count,
      reviewCount: data.reviews_count,
      originalTitle: data.original_title,
      rating: data.rating.average,
      director: data.directors[0].name,
      casts: data.casts.map(item => item.name).join(' / '),
      genres: data.genres.join('、'),
      summary: data.summary,
      castsDetail: data.casts.map(item => ({
        avatar: item.avatars.small,
        name: item.name,
      })),
    }
    this.setData({
      ...movie,
    })
  },

  /**
   * 预览图片
   */
  onImageTap(event) {
    const src = event.currentTarget.dataset.src
    wx.previewImage({
      urls: [src],
    })
  },
})
