import { API } from '../config/config.js'

export const get = (url, data, callback) => {
  wx.showNavigationBarLoading()
  wx.request({
    url,
    data: {
      apikey: API.apiKey,
      ...data,
    },
    header: {
      'content-type': 'json',
    },
    method: 'GET',
    success: res => {
      callback(res.data)
    },
    fail: () => {
      wx.showToast({
        title: '获取数据失败',
        icon: 'none',
      })
    },
    complete: () => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    },
  })
}
