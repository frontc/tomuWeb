import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/config';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    homeSignOut: false, // 是否离开
    newChannel: false, // 是否是新建频道
    songList: [], // 歌曲列表
    addFlag: false,
    channelIdInfo: null,
  },
  mutations: {
    /*
    * 设置播放器状态
    * */
    setSignOut (state, info) {
      state.homeSignOut = info;
    },
    /*
    * 重置系统基本设置
    * */
    resetSystemInfo (state) {
      state.newChannel = false;
      state.homeSignOut = false;
      state.addFlag = false;
      state.songList = [];
      state.channelIdInfo = null;
    },
    /*
    * 新建频道
    * */
    setNewChannel (state) {
      state.newChannel = true;
      state.addFlag = true;
      state.songList = [];
    },
    /*
    * 进入频道
    * */
    setChannelFlag (state) {
      state.newChannel = false;
      state.addFlag = false;
    },
    /*
    * 设置歌单列表
    * */
    setSongList (state, info) {
      state.songList = info;
    },
    /*
    * 设置是否添加歌单
    * */
    setAddFlag (state, info) {
      state.addFlag = info;
    },
    /*
    * 设置频道ID
    * */
    setChannelIdInfo (state, info) {
      state.channelIdInfo = info;
    }
  },
  plugins: [createPersistedState({
    storage: window[`${config.storageType}Storage`],
  })],
});
