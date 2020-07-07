<template>
  <div>
    <div
      ref="aplayer"
    ></div>
  </div>
</template>

<script>
import APlayer from 'aplayer';
import { mapState, mapMutations } from 'vuex';
import {
  setOptionsData,
  getPropsData
} from '@/libs/util';

export default {
  name: 'tomuAplayer',
  data () {
    return {
      aplayerOptions: {},
      api: '',
      ap: '', // 播放器句柄
      seekTimeFlag: false,
      songList: []
    }
  },
  props: {
    /*
    * 歌曲ID
    * song id / playlist id / album id / search keyword
    * */
    id: {
      default() {
        return '60198';
      },
      type: String
    },
    /*
    * 音乐平台
    * netease, tencent, kugou, xiami, baidu
    * */
    server: {
      default() {
        return 'netease';
      },
      type: String
    },
    /*
    * 播放类型
    * song, playlist, album, search, artist
    * */
    type: {
      default() {
        return 'playlist';
      },
      type: String
    },
    /*
    * 音乐歌单链接
    * netease, tencent, xiami
    * */
    auto: {
      default() {
        return '';
      },
      type: String
    },
    /*
    * 音乐歌单链接
    * netease, tencent, xiami
    * */
    url: {
      default() {
        return '';
      },
      type: String
    },
    /*
    * 开启吸底模式
    * Boolean
    * */
    fixed: {
      default() {
        return false;
      },
      type: Boolean
    },
    /*
    * 开启迷你模式
    * Boolean
    * */
    mini: {
      default() {
        return false;
      },
      type: Boolean
    },
    /*
    * 音频自动播放
    * Boolean
    * */
    autoplay: {
      default() {
        return true;
      },
      type: Boolean
    },
    /*
    * 主题色
    * */
    theme: {
      default() {
        return '#b7daff';
      },
      type: String
    },
    /*
    * 音频循环播放
    * 'all', 'one', 'none'
    * */
    loop: {
      default() {
        return 'all';
      },
      type: String
    },
    /*
    * 音频循环顺序
    * 'list', 'random'
    * */
    order: {
      default() {
        return 'list';
      },
      type: String
    },
    /*
    * 预加载
    * 'none', 'metadata', 'auto'
    * */
    preload: {
      default() {
        return 'none';
      },
      type: String
    },
    /*
    * 预加载
    * 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
    * */
    volume: {
      default() {
        return '0.7';
      },
      type: String
    },
    /*
    * 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    * Boolean
    * */
    mutex: {
      default() {
        return true;
      },
      type: Boolean
    },
    /*
    * 歌词导入类型
    *
    * */
    lrcType: {
      default() {
        return 3;
      },
      type: Number
    },
    /*
    * 歌词
    *
    * */
    lrc: {
      default() {
        return '';
      },
      type: String
    },
    /*
    * 歌词
    *
    * */
    pic: {
      default() {
        return '';
      },
      type: String
    },
    /*
    * 列表默认折叠
    * */
    listFolded: {
      default() {
        return true;
      },
      type: Boolean
    },
    /*
    * 列表最大高度
    * */
    listMaxHeight: {
      default() {
        return '400px';
      },
      type: String
    },
    /*
    * 存储播放器设置的 localStorage key
    * */
    storageName: {
      default() {
        return 'aplayer-setting';
      },
      type: String
    },
    /*
    * 支持一次性传入所有属性
    * */
    options: {
      default() {
        return null;
      },
      type: Object
    },
    /*
    * 销毁播放器
    * */
    destroy: {
      default() {
        return false;
      },
      type: Boolean
    },
    /*
    * 暂停播放器
    * */
    pause: {
      default() {
        return false;
      },
      type: Boolean
    },
    /*
    * 播放列表
    * */
    playList: {
      default() {
        return [];
      },
      type: Array
    },
    /*
    * 增加播放列表
    * */
    listAdd: {
      default() {
        return [];
      },
      type: Array
    },
    /*
    * 移除歌曲
    * */
    deleteIndex: {
      default() {
        return null;
      },
      type: Number
    },
    /*
    * 切换歌曲
    * */
    switchSong: {
      default() {
        return null;
      },
      type: Number
    },
    /*
    * 切换时间
    * */
    seekTime: {
      default() {
        return null;
      },
      type: Number
    }
  },
  computed: {
    ...mapState([
      'firstEntry'
    ])
  },
  methods: {
    ...mapMutations([
      'setFirstEntry'
    ]),
    /*
    * 获取所有属性值
    * */
    getPropsData () {
      this.aplayerOptions = (this.options === null) ? getPropsData(this.$props) : setOptionsData(this.options, this.$props);
      if (this.aplayerOptions.auto) this.parseServerLink();
      this.setAplayerOptions();
    },
    /*
    * 自动播放时-设置播放源
    * */
    parseServerLink () {
      // 从配置文件中匹配播放源
      let link = this.$config.serverLink;
      for (let rule of link) {
        let patt = new RegExp(rule[0]);
        let res = patt.exec(this.aplayerOptions.auto);
        if (res !== null) {
          this.aplayerOptions.server = rule[1];
          this.aplayerOptions.type = rule[2];
          this.aplayerOptions.id = res[1];
        }
      }
    },
    /*
    * 设置播放属性
    * */
    async setAplayerOptions () {
      let options = this.aplayerOptions;
      // 设置播放所需属性
      if (this.aplayerOptions.url && this.aplayerOptions.url != '') {
        let newOption = {
          name: options.name || options.title || 'Audio name',
          artist: options.artist || options.author || 'Audio artist',
          url: options.url,
          cover: options.cover || options.pic,
          lrc: options.lrc || options.lyric || '',
          type: 'auto',
        };
        // 如果没有设置歌词模式-自动填充歌词模式
        if (!newOption.lrc) {
          this.aplayerOptions.lrcType = 0;
        }
        this.loadPlayer([newOption]);
      }
      if (options.playList.length > 0) {
        this.loadPlayer(options.playList);
      }
    },
    /*
    * 开始播放
    * */
    loadPlayer (data) {
      let defaultOption = {
        audio: data,
        mutex: true,
        lrcType: this.aplayerOptions.lrcType || 3,
        storageName: 'tomu'
      };
      let options = {
        ...defaultOption,
        ...this.aplayerOptions,
      };
      Object.keys(options).forEach((optkey) => {
        if (options[optkey] === 'true' || options[optkey] === 'false') {
          options[optkey] = (options[optkey] === 'true')
        }
      });
      options.container = this.$refs.aplayer;
      /* eslint-disable no-new */
      this.ap = new APlayer(options);
      this.ap.on('loadstart', () => {
        this.$emit('loadstart');
      });
      // playing
      this.ap.on('playing', (d) => {
        this.ap.list.hide();
        this.$emit('play', d);
        if (!this.seekTimeFlag && !this.firstEntry) {
          this.$emit('updateTime', this.ap.audio.currentTime);
        }
        this.seekTimeFlag = false;
        this.setFirstEntry(false);
      });
      // 暂停
      this.ap.on('pause', () => {
        this.$emit('pause');
      });
      // error
      this.ap.on('error', (e) => {
        this.$emit('error', e);
      });
    },
    /*
    * 显示关闭歌词
    * */
    lrcFlag () {
      this.ap.lrc.toggle();
    },
    /*
    * 显示关闭歌单
    * */
    aplayListFlag () {
      this.ap.list.toggle();
    }
  },
  watch: {
    /*
    * 销毁播放器
    * */
    destroy (data) {
      if (data) {
        this.ap.pause();
      }
    },
    pause (data) {
      if (data) {
        this.ap.pause();
      }
    },
    /*
    * 增加播放列表
    * */
    listAdd(data) {
      this.ap.list.add(data);
    },
    /*
    * 移除歌曲
    * */
    deleteIndex(index) {
      this.ap.list.hide();
      this.ap.list.remove(index);
    },
    /*
    * 切换歌曲
    * */
    switchSong(index) {
      this.seekTimeFlag = true;
      try {
        this.ap.play();
      } catch (e) {
        this.$Message.info('自动播放失败，请先点击播放。')
      }
      this.ap.list.switch(index);
    },
    /*
    * 切换时间
    * */
    seekTime(time) {
      this.seekTimeFlag = true;
      try {
        this.ap.play();
      } catch (e) {
        this.$Message.info('自动播放失败，请先点击播放。')
      }
      this.ap.seek(time);
    },
    /*
    * 列表
    * */
    playList (data) {
      if (this.songList.length === 0) {
        this.songList = data;
        this.loadPlayer(data)
      }
    }
  },
  mounted() {
    /*
    * 初始化
    * */
    this.getPropsData();
  }
}
</script>

<style scoped>
</style>
