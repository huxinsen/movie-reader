export default {
  onMovieTap(event) {
    const movieId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/movies/movie-detail/movie-detail?id=' + movieId,
    })
  },
}
