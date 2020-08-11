<template>
<div class="list-body">
  <div
    v-for="(item, key) in songList"
    :key="key"
  >
    <div class="name">{{ item.name }}</div>
    <div
      v-for="subItem in item.data"
      class="clearfix list on"
      :key="subItem.songID"
    >
      <div class="fl title">{{ subItem.songName }}</div>
      <div class="fr description">{{ subItem.artistName }}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'listGroupTpl',
  data() {
    return {
      thisFlag: false
    }
  },
  props: {
    songList: {
      default() {
        return {};
      },
      type: Object
    }
  }
}
</script>

<style lang="less">
  .list-body{
    height: 100%;
    padding: 15px 0;
    overflow: auto;
    .name{
      padding: 15px;
      color: #8A49ED;
      font-size: 16px;
    }
    .list{
      padding: 15px;
      cursor: pointer;
      .icon{
        width: 35px;
        color: #605D70;
        font-size: 16px;
        text-align: center;
        min-height: 5px;
        i{
          display: none;
        }
      }
      .title{
        font-size: 16px;
        color: #565865;
      }
      .description{
        font-size: 16px;
        color: #565865;
      }
    }
    .on{
      background: #BEBEFC;
      .icon{
        i{
          display: block;
        }
      }
    }
    .list:hover{
      background: #BEBEFC;
      .icon{
        i{
          display: block;
        }
      }
    }
  }
</style>
