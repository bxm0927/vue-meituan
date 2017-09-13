// 映射及计算

export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

// 当前播放的歌曲的索引
export const currentIndex = state => state.currentIndex

// 当前播放的歌曲
export const currentSong = (state) => state.playlist[state.currentIndex] || {}

export const songlist = state => state.songlist

export const rankList = state => state.rankList

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList
