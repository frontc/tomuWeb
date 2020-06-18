export default {
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
