export default {
  onMoreTap(event) {
    const category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: '/pages/movies/movies-more/movies-more?category=' + category,
    })
  },
}
