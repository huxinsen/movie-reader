import movieTemplate from 'template/movie/movie.js'
import movieListTemplate from 'template/movie-list/movie-list.js'
import {
  IN_THEATERS,
  COMING_SOON,
  TOP_250,
  SEARCH_RESULTS,
  MOVIE_CATEGORY,
  API,
} from '../../config/config.js'
import { get } from '../../utils/request.js'

Page({
  ...movieTemplate,
  ...movieListTemplate,

  /**
   * 页面的初始数据
   */
  data: {
    isSearching: false,
    inputValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMovieListData(IN_THEATERS, API.getMoviesInTheaters)
    this.getMovieListData(COMING_SOON, API.getMoviesComingSoon)
    this.getMovieListData(TOP_250, API.getMoviesTop250)
  },

  getMovieListData(category, url) {
    get(
      url,
      {
        start: 0,
        count: 3,
      },
      this.getProcessMovieDataFunc(category)
    )
  },

  getProcessMovieDataFunc(category) {
    return data => {
      const movies = data.subjects.map(item => ({
        id: item.id,
        title: item.title,
        imgURL: item.images.small,
        rating: item.rating.average,
      }))

      const movieData = {}
      movieData[category] = {
        category: MOVIE_CATEGORY[category],
        movies,
      }
      this.setData(movieData)
    }
  },

  onSearchFocus() {
    this.setData({
      isSearching: true,
    })
  },

  onSearchCancel() {
    this.setData({
      isSearching: false,
      inputValue: '',
      searchResults: {},
    })
  },

  onSearchConfirm(event) {
    const input = event.detail.value
    this.getSearchResults(input)
  },

  getSearchResults(input) {
    get(
      API.getMoviesSearch,
      {
        start: 0,
        count: 50,
      },
      data => {
        // 过滤模拟搜索
        const movies = data.subjects
          .map(item => ({
            id: item.id,
            title: item.title,
            imgURL: item.images.small,
            rating: item.rating.average,
          }))
          .filter(movie => {
            return movie.title.includes(input)
          })

        const movieData = {}
        movieData[SEARCH_RESULTS] = {
          movies,
        }
        this.setData(movieData)
      }
    )
  },
})
