// 根级别的 mutation

import * as types from './mutations-type.js'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_SONGLIST](state, songlist) {
    state.songlist = songlist
  },
  [types.SET_RANKLIST](state, rankList) {
    state.rankList = rankList
  },
  [types.SET_SEARCHHISTORY](state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [types.SET_PLAYHISTORY](state, playHistory) {
    state.playHistory = playHistory
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  }
}

export default mutations
