<template>
<div
  class="home animate__animated animate__zoomInUp_center"
  :class="addClass"
>
  <div class="layout">
    <div>
      <page-header
        class="system-header"
        :newChannelFlag="newChannel"
      >
      </page-header>
      <div class="home-content">
        <router-view/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import pageHeader from '@/view/components/header.vue';
import { mapState } from 'vuex';

export default {
  name: 'index',
  data () {
    return {
      addClass: ''
    }
  },
  components: {
    pageHeader
  },
  computed: {
    ...mapState([
      'homeSignOut',
      'newChannel',
      'songList'
    ])
  },
  watch: {
    /*
    * 监听退出登录
    * */
    homeSignOut (data) {
      if (data) {
        this.addClass = 'animate__zoomOut_center';
      }
    }
  }
}
</script>

<style lang="less">
  .home{
    width: 100%;
    height: 100%;
    .home-content{
      width: 100%;
      height: 100%;
    }
  }
</style>
