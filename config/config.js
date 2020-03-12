export const MOVIE_CATEGORY = {
  inTheaters: '正在热映',
  comingSoon: '即将上映',
  top250: '豆瓣Top250',
}

export const IN_THEATERS = 'inTheaters'
export const COMING_SOON = 'comingSoon'
export const TOP_250 = 'top250'
export const SEARCH_RESULTS = 'searchResults'

export const API = {
  getMoviesInTheaters: 'https://api.douban.com/v2/movie/in_theaters',
  getMoviesComingSoon: 'https://api.douban.com/v2/movie/coming_soon',
  getMoviesTop250: 'https://api.douban.com/v2/movie/top250',
  getMoviesSearch: 'https://api.douban.com/v2/movie/top250', // 豆瓣搜索接口关闭
  getMovieById: 'https://api.douban.com/v2/movie/subject/',
  apiKey: '0df993c66c0c636e29ecbb5344252a4a',
}
