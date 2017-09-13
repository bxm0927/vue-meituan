/**
 * 单一状态树
 * vuex 操作顺序：state.js -> mutations-type.js -> mutations.js -> getters.js
 */
import { getStorage, getPlayStorage, getFavorite } from '@/common/js/store.js'

const playMode = {
  sequence: 0, // 顺序播放
  loop: 1, // 单曲循环
  random: 2 // 随机播放
}

const state = {
  // 歌手信息
  singer: {},
  // 播放器播放状态
  playing: false,
  // 播放器展开状态
  fullScreen: false,
  // 播放歌曲列表
  playlist: [],
  // 顺序播放列表
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前播放歌曲索引
  currentIndex: -1,
  // 推荐页歌单
  songlist: {},
  // 歌曲排行数据
  rankList: {},
  // 搜索结果
  searchHistory: getStorage(),
  // 播放历史（最近播放）
  playHistory: getPlayStorage(),
  // 我的收藏
  favoriteList: getFavorite()
}

export default state
