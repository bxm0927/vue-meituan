// 收藏功能 localstorage 本地存储

let store = {
  // 存储 localstorage
  setLocalstorage (id, key, value) {
    let seller = window.localStorage.__seller__

    if (!seller) {
      seller = {}
      seller[id] = {}
    } else {
      seller = JSON.parse(seller)
      if (!seller[id]) {
        seller[id] = {}
      }
    }

    seller[id][key] = value
    window.localStorage.__seller__ = JSON.stringify(seller)
  },

  // 获取 localstorage
  getLocalstorage (id, key, def) {
    let seller = window.localStorage.__seller__
    if (!seller) {
      return def
    }

    let sellerId = JSON.parse(seller)[id]
    if (!sellerId) {
      return def
    }

    return sellerId[key] || def
  },

  // 删除单个数据 localstorage
  removeLocalstorage (id, key) {}
}

export default store
