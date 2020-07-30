<template>
<div class="footer SentyPea">
  Copyright @ 2011-2020 ToMu- <span @mouseover="versionsFlag" v-if="showVersions">{{ apiVersions }}</span><span @mouseout="versionsFlag" v-else>{{ webVersions }}</span> All Rights Reserved.
</div>
</template>

<script>
import config from '@/config';

export default {
  name: 'pageFooter',
  data () {
    return {
      showVersions: true,
      webVersions: config.versions,
      apiVersions: ''
    }
  },
  methods: {
    /*
    * 查看版权
    * */
    async getVersion() {
      const version = await this.$api.getVersion();
      if (version) {
        this.apiVersions = version
      }
    },
    /*
    * 显示版权
    * */
    versionsFlag () {
      this.showVersions = !this.showVersions
    }
  },
  mounted() {
    this.getVersion();
  }
}
</script>

<style lang="less">
  .footer{
    width: 100%;
    text-align: center;
    color: #999999;
    border-top: 1px solid #d8d8d8;
    height: 40px;
    line-height: 40px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
  }
  @media only screen and (max-width: 700px) and (min-width:0px) {
    .footer{
      font-size: 12px;
    }
  }
</style>
