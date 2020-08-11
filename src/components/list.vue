<template>
<div class="list-body">
  <div
    v-for="(item, index) in songList"
    :key="item.id"
    class="clearfix list"
    :class="{on: item.flag}"
  >
    <div class="fl icon">
      <i
        class="iconfont icon-run"
        @click="playerSong(index)"
        v-if="type === 'songs'"
      ></i>
      <i
        class="iconfont icon-iconjia"
        v-else-if="type === 'search'"
        @click="addSongs(item)"
      ></i>
      <i
        class="iconfont icon-iconjia"
        v-else-if="type === 'footprint'"
      ></i>
    </div>
    <div class="fl title">{{ item.title }}</div>
    <div class="fr description">{{ item.author }}</div>
    <div class="fr delete">
      <i
        class="iconfont icon-shanchu"
        v-if="type === 'songs'"
        @click="deleteSong(item)"
      ></i>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'listTpl',
  data() {
    return {
      thisFlag: false
    }
  },
  props: {
    songList: {
      default() {
        return [];
      },
      type: Array
    },
    type: {
      default() {
        return 'songs';
      },
      type: String
    },
    thisSong: {
      default() {
        return {};
      },
      type: Object
    }
  },
  methods: {
    // 添加歌曲
    addSongs(data) {
      this.$emit('select', data);
    },
    // 播放歌曲
    playerSong(index) {
      this.$emit('playing', index);
    },
    // 删除歌曲
    deleteSong(index) {
      this.$emit('delete', index);
    }
  }
}
</script>

<style lang="less">
  .list-body{
    height: 100%;
    padding: 15px 0;
    overflow: auto;
    .list{
      padding: 15px;
      cursor: pointer;
      .delete{
        margin-right: 15px;
        display: none;
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
      }
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
      .delete{
        display: block;
      }
      .icon{
        i{
          display: block;
        }
      }
    }
  }
</style>
