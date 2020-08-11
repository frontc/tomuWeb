<template>
<div class="footer">
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
    color: #6a6ca6;
    height: 60px;
    line-height: 60px;
    width: 100%;
    background: #babafd;
  }
  @media only screen and (max-width: 700px) and (min-width:0px) {
    .footer{
      font-size: 12px;
    }
  }
</style>
