export default {
  /**
   * @description 网站域名
   */
  url: {
    production: 'https://tomu.orous.cn/#/',
    development: 'http://localhost:8080/#/'
  },
  /**
   * @description 网站名称
   */
  title: 'ToMu',
  /**
   * @description 网站发布版本
   */
  versions: '0.0.15',
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
   * @description 设置存储token的名称
   */
  tokenName: 'token',
  /**
   * @description 设置api版本
   */
  apiVersions: '/api/v1',
  /**
   * @description 设置状态码
   */
  code: {
    ok: 200
  },
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
    playlistUrl: 'https://music.163.com/#/playlist?id=',
    songUrl: 'https://music.163.com/#/song?id=',
    artistUrl: 'https://music.163.com/#/artist?id=',
    playlistUrlType: '',
    songUrlType: '',
    artistUrlType: '',
    addSongTypeName: '歌单',
    addSongType: true,
    playlistValue: '',
    songValue: '',
    artistValue: '',
    searchValue: ''
  }, {
    title: 'QQ音乐',
    logo: 'https://www.ooorq.com/image/qq.png',
    type: 'tencent',
    playlistUrl: 'https://y.qq.com/n/yqq/playlist/',
    songUrl: 'https://y.qq.com/n/yqq/song/',
    artistUrl: 'https://y.qq.com/n/yqq/singer/',
    playlistUrlType: '.html',
    songUrlType: '.html',
    artistUrlType: '.html',
    addSongTypeName: '歌单',
    playlistValue: '',
    songValue: '',
    artistValue: '',
    searchValue: ''
  }, {
    title: '酷狗音乐',
    logo: 'https://www.ooorq.com/image/kugou.png',
    type: 'kugou',
    playlistUrl: 'https://www.kugou.com/yy/special/single/',
    songUrl: '',
    artistUrl: 'https://www.kugou.com/yy/singer/home/',
    playlistUrlType: '.html',
    songUrlType: '',
    artistUrlType: '.html',
    addSongTypeName: '歌单',
    playlistValue: '',
    songValue: '',
    artistValue: '',
    searchValue: ''
  }, {
    title: '千千音乐',
    logo: 'https://www.ooorq.com/image/qianqian.png',
    type: 'baidu',
    playlistUrl: 'http://music.taihe.com/songlist/',
    songUrl: 'http://music.taihe.com/song/',
    artistUrl: 'http://music.taihe.com/artist/',
    playlistUrlType: '',
    songUrlType: '',
    artistUrlType: '',
    addSongTypeName: '歌单',
    playlistValue: '',
    songValue: '',
    artistValue: '',
    searchValue: ''
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
