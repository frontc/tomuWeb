<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      className: ''
    }
  }
}
</script>

<style lang="less">
  @import "~@/assets/style/common.less";
  body{
    background: #ffffff;
  }
  #app {
    overflow: auto;
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    background: url("~@/assets/image/home_bg.jpg") center no-repeat;
    >div{
      height: 100%;
    }
  }
  .ivu-modal-footer{
    display: none;
  }
  .user{
    .fl{
      width: 50%;
    }
  }
</style>
