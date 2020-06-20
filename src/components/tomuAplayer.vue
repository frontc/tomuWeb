<template>
  <div>
    <div
      ref="aplayer"
    ></div>
  </div>
</template>

<script>
import APlayer from 'aplayer'
import {
  setOptionsData,
  getPropsData
} from '@/libs/util'

export default {
  name: 'tomuAplayer',
  data () {
    return {
      aplayerOptions: {},
      api: '',
      ap: '' // 播放器句柄
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
        return 'song';
      },
      type: String
    },
    /*
    * 音乐歌单链接
    * netease, tencent, xiami
    * */
    auto: {
      default() {
        return 'https://music.163.com/#/playlist?id=60198';
      },
      type: String
    },
    /*
    * 音乐歌单链接
    * netease, tencent, xiami
    * */
    url: {
      default() {
        return 'https://api.i-meto.com/meting/api?server=netease&type=url&id=1441183869&auth=31c3ef95962dfcd49b5b667011901a31dcec861e';
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
        return false;
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
        return 'https://api.i-meto.com/meting/api?server=netease&type=lrc&id=1441183869&auth=bcb522602d52b5c8d916643f8c02b2150cf5c99c';
      },
      type: String
    },
    /*
    * 歌词
    *
    * */
    pic: {
      default() {
        return 'https://p3.music.126.net/FLoKNesjpaotmN-qGj9m_A==/109951164912637120.jpg?param=390y390';
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
    }
  },
  methods: {
    /*
    * 获取所有属性值
    * */
    getPropsData () {
      this.aplayerOptions = (this.options === null) ? getPropsData(this.$props) : setOptionsData(this.options, this.$props)
      if (this.aplayerOptions.auto) this.parseServerLink()
      this.setAplayerOptions()
    },
    /*
    * 自动播放时-设置播放源
    * */
    parseServerLink () {
      // 从配置文件中匹配播放源
      let link = this.$config.serverLink
      for (let rule of link) {
        let patt = new RegExp(rule[0])
        let res = patt.exec(this.aplayerOptions.auto)
        if (res !== null) {
          this.aplayerOptions.server = rule[1]
          this.aplayerOptions.type = rule[2]
          this.aplayerOptions.id = res[1]
        }
      }
    },
    /*
    * 设置播放属性
    * */
    setAplayerOptions () {
      // 设置播放所需属性
      if (this.aplayerOptions.url) {
        let options = this.aplayerOptions
        let newOption = {
          name: options.name || options.title || 'Audio name',
          artist: options.artist || options.author || 'Audio artist',
          url: options.url,
          cover: options.cover || options.pic,
          lrc: options.lrc || options.lyric || '',
          type: 'auto',
        }
        // 如果没有设置歌词模式-自动填充歌词模式
        if (!newOption.lrc) {
          this.aplayerOptions.lrcType = 0
        }
        this.loadPlayer([newOption])
      }
    },
    /*
    * 开始播放
    * */
    loadPlayer (data) {
      data.push(data[0])
      data.push(data[0])
      data.push(data[0])
      data.push(data[0])
      data.push(data[0])
      data.push(data[0])
      data.push(data[0])
      data.push(data[0])
      data.push(data[0])
      data.push(data[0])
      let defaultOption = {
        audio: data,
        mutex: true,
        lrcType: this.aplayerOptions.lrcType || 3,
        storageName: 'tomu'
      }
      if (!data.length) return
      let options = {
        ...defaultOption,
        ...this.aplayerOptions,
      }
      Object.keys(options).forEach((optkey) => {
        if (options[optkey] === 'true' || options[optkey] === 'false') {
          options[optkey] = (options[optkey] === 'true')
        }
      })
      options.container = this.$refs.aplayer
      /* eslint-disable no-new */
      console.log(options)
      this.ap = new APlayer(options)
      // 播放
      this.ap.on('play', () => {
        this.ap.list.hide()
        this.$emit('play')
      });
      // 暂停
      this.ap.on('pause', () => {
        this.$emit('pause')
      });
    },
    /*
    * 显示关闭歌词
    * */
    lrcFlag () {
      this.ap.lrc.toggle()
    },
    /*
    * 显示关闭歌单
    * */
    aplayListFlag () {
      this.ap.list.toggle()
    }
  },
  mounted() {
    /*
    * 初始化
    * */
    this.getPropsData()
  }
}
</script>

<style scoped>

</style>
