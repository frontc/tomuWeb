import Vue from 'vue';
import Vuex from 'vuex'
import config from '@/config'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    homeSignOut: false, // 是否离开
    newChannel: false, // 是否是新建频道
    songList: [], // 歌曲列表
  },
  mutations: {
    /*
    * 设置播放器状态
    * */
    setSignOut (state, info) {
      state.homeSignOut = info
    },
    /*
    * 重置系统基本设置
    * */
    resetSystemInfo (state) {
      state.newChannel = false
      state.homeSignOut = false
      state.songList = []
    },
    /*
    * 新建频道
    * */
    setNewChannel (state) {
      state.newChannel = true
      state.songList = []
    },
    /*
    * 设置歌单列表
    * */
    setSongList (state, info) {
      state.newChannel = false
      state.songList = info
    }
  },
  plugins: [createPersistedState({
    storage: window[`${config.storageType}Storage`],
  })],
});
