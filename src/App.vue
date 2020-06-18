<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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
    background: #ffffff;
    >div{
      height: 100%;
    }
  }
</style>
