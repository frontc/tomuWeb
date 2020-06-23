export default {
  /**
   * @description 网站域名
   */
  url: 'www.tomu.com',
  /**
   * @description 网站名称
   */
  title: 'ToMu',
  /**
   * @description 首页入口名称
   */
  homePath: 'home',
  /**
   * @description 录入频道页入口
   */
  addChannelPath: 'addChannel',
  /**
   * @description 是否已经进入频道标志
   */
  loginChannelName: 'ToMuLoginChanne',
  /**
   * @description 设置全局存储类型
   */
  storageType: 'session',
  /**
   * @description 设置api版本
   */
  apiVersions: '/api/v1/channel',
  /**
   * @description 歌单API解析地址
   */
  songListApi: 'https://api.i-meto.com/meting/api',
  /**
   * @description 音乐平台
   */
  musicPlatform: [{
    title: '网易云音乐',
    logo: 'https://www.ooorq.com/image/wangyi.png',
    type: 'netease',
    listUrl: 'https://music.163.com/#/playlist?id=',
    songUrl: 'https://music.163.com/#/song?id=',
    listUrlType: '',
    songUrlType: '',
    addSongTypeName: '歌单',
    addSongType: true,
    listValue: '',
    songValue: ''
  }, {
    title: 'QQ音乐',
    logo: 'https://www.ooorq.com/image/qq.png',
    type: 'tencent',
    listUrl: 'https://y.qq.com/n/yqq/playlist/',
    songUrl: 'https://y.qq.com/n/yqq/song/',
    listUrlType: '.html',
    songUrlType: '.html',
    addSongTypeName: '歌单',
    addSongType: true,
    listValue: '',
    songValue: ''
  }, {
    title: '酷狗音乐',
    logo: 'https://www.ooorq.com/image/kugou.png',
    type: 'kugou',
    listUrl: 'https://www.kugou.com/yy/special/single/',
    songUrl: '',
    listUrlType: '.html',
    songUrlType: '',
    addSongTypeName: '歌单',
    addSongType: true,
    listValue: '',
    songValue: ''
  }, {
    title: '千千音乐',
    logo: 'https://www.ooorq.com/image/qianqian.png',
    type: 'baidu',
    listUrl: 'http://music.taihe.com/songlist/',
    songUrl: 'http://music.taihe.com/song/',
    listUrlType: '',
    songUrlType: '',
    addSongTypeName: '歌单',
    addSongType: true,
    listValue: '',
    songValue: ''
  }],
  /**
   * @description 音乐播放源地址
   */
  serverLink: [
    ['music.163.com.*song.*id=(\\d+)', 'netease', 'song'],
    ['music.163.com.*album.*id=(\\d+)', 'netease', 'album'],
    ['music.163.com.*artist.*id=(\\d+)', 'netease', 'artist'],
    ['music.163.com.*playlist.*id=(\\d+)', 'netease', 'playlist'],
    ['music.163.com.*discover/toplist.*id=(\\d+)', 'netease', 'playlist'],
    ['y.qq.com.*song/(\\w+).html', 'tencent', 'song'],
    ['y.qq.com.*album/(\\w+).html', 'tencent', 'album'],
    ['y.qq.com.*singer/(\\w+).html', 'tencent', 'artist'],
    ['y.qq.com.*playsquare/(\\w+).html', 'tencent', 'playlist'],
    ['y.qq.com.*playlist/(\\w+).html', 'tencent', 'playlist'],
    ['xiami.com.*song/(\\w+)', 'xiami', 'song'],
    ['xiami.com.*album/(\\w+)', 'xiami', 'album'],
    ['xiami.com.*artist/(\\w+)', 'xiami', 'artist'],
    ['xiami.com.*collect/(\\w+)', 'xiami', 'playlist'],
  ]
}
