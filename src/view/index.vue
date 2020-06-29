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
      <div class="home-content" :style="newChannel ? 'z-index:9999' : ''">
        <router-view/>
      </div>
      <page-footer/>
    </div>
  </div>
</div>
</template>

<script>
import pageHeader from '@/view/components/header.vue';
import pageFooter from '@/view/components/footer.vue';
import { mapState } from 'vuex';

export default {
  name: 'index',
  data () {
    return {
      addClass: ''
    }
  },
  components: {
    pageHeader,
    pageFooter
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
    background: rgba(255, 255, 255, 0.8);
    .home-content{
      position: fixed;
      left: 0;
      top: 65px;
      bottom: 40px;
      width: 100%;
      z-index: 3;
    }
  }
</style>
