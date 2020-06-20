import Vue from 'vue';
import Vuex from 'vuex'
import config from '@/config'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    homeSignOut: false, // 是否离开
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
      state.homeSignOut = false
    }
  },
  plugins: [createPersistedState({
    storage: window[`${config.storageType}Storage`],
  })],
});
