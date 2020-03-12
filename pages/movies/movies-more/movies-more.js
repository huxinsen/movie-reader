import movieTemplate from '../template/movie/movie.js'
import {
  IN_THEATERS,
  COMING_SOON,
  TOP_250,
  MOVIE_CATEGORY,
  API,
} from '../../../config/config.js'
import { get } from '../../../utils/request.js'

Page({
  ...movieTemplate,

  /**
   * 页面的初始数据
   */
  data: {
    navigationTitle: '',
    movieURL: '',
    movieStartIndex: 0,
    movies: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      navigationTitle: options.category,
    })

    this.setMovieURL(options.category)

    this.getMovies()
  },

  setMovieURL(category) {
    let movieURL = ''
    switch (category) {
      case MOVIE_CATEGORY[IN_THEATERS]:
        movieURL = API.getMoviesInTheaters
        break
      case MOVIE_CATEGORY[COMING_SOON]:
        movieURL = API.getMoviesComingSoon
        break
      case MOVIE_CATEGORY[TOP_250]:
        movieURL = API.getMoviesTop250
        break
      default:
        movieURL = API.getMoviesInTheaters
        break
    }
    this.setData({
      movieURL,
    })
  },

  getMovies() {
    get(
      this.data.movieURL,
      {
        start: this.data.movieStartIndex,
        count: 20,
      },
      this.processMovieData
    )
  },

  processMovieData(data) {
    const moviesNew = data.subjects.map(item => ({
      id: item.id,
      title: item.title,
      imgURL: item.images.small,
      rating: item.rating.average,
    }))

    const moviesOld = this.data.movies

    this.setData({
      movies: [...moviesOld, ...moviesNew],
      movieStartIndex: this.data.movieStartIndex + 20,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.navigationTitle,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      movieStartIndex: 0,
      movies: [],
    })
    this.getMovies()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getMovies()
  },
})
