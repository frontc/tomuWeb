<template>
<div class="home-main" :class="{open: footerHandleShow}">
  <div class="home-body" :style="{height: `${homeOffsetHeight}px`}">
    <div  class="home-player">
      <div class="clearfix home-player-info clearfix">
        <img class="fl img" src="@/assets/image/channel.svg">
        <span class="fl title">频道 {{ channelIdInfo || '获取中' }}</span>
        <div class="fl clearfix audience">
          <a
            v-for="(item, index) in audienceList"
            :class="{on: item.flag}"
            href="javascript:;"
            :key="index"
            :title="item.name"
            @click="removeUser(index)"
          ><i class="iconfont icon-ren"></i></a>
        </div>
      </div>
      <div class="tomu-aplayer">
        <tomu-aplayer
          @play="play"
          @pause="pause"
          @loadstart="setPlayImage"
          @error="error"
          @updateTime="updateTime"
          :destroy="homeSignOut"
          :pause="pauseFlag"
          :playList="songList"
          :listAdd="listAdd"
          :deleteIndex="deleteIndex"
          :switchSong="switchSong"
          :seekTime="seekTime"
          ref="aplayer"
        ></tomu-aplayer>
      </div>
    </div>
  </div>
  <div class="home-footer" ref="homeFooter" :style="{height: `${footerHandleHeight}px`}">
    <div v-if="!homeFooterOpen" class="home-tomu-handle">
      <ul>
        <li
          v-for="(item, index) in navList"
          :key="index"
        >
          <a href="javascript:;" @click="openFooterHandle(item.index)">
            <i class="iconfont" :class="`${item.icon}`"></i><span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div v-else class="home-footer-body">
      <div class="content">
        <div class="content-header">
          <div class="content-header-main">
            <div class="content-handle-header clearfix">
              <div class="nav fl">
                <ul>
                  <li
                    v-for="(item, index) in navList"
                    :class="{on: item.flag}"
                    :key="index"
                  >
                    <a href="javascript:;" @click="switchFooterHandle(item.index)">
                      <i class="iconfont" :class="`${item.icon}`"></i><span>{{ item.name }}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="fr close">
                <a href="javascript:;" @click="closeFooterHandle">
                  <i class="iconfont icon-hao"></i>
                </a>
              </div>
            </div>
            <div class="content-handle-body">
              <div class="list-main" v-if="navList[0].flag">
                <list-tpl
                  :songList="allSong"
                  @playing="switchSongPlayer"
                  type="songs"
                  @delete="deleteSong"
                  v-if="songList.length > 0"
                ></list-tpl>
                <div v-else class="no-data">
                  <div>
                    <div><img src="@/assets/image/no-data.png"/></div>
                    <div class="text">请先搜索添加歌曲~</div>
                  </div>
                </div>
              </div>
              <div class="list-main" v-else-if="navList[1].flag">
                <div class="list-main-header clearfix">
                  <div class="fl song-select">
                    <div class="name" @click="showMusicPlatform">{{ insName }}<i class="iconfont icon-tubiao-"></i></div>
                    <div class="select" v-show="musicPlatformShow">
                      <ul>
                        <li
                          v-for="(item, index) in musicPlatformData"
                          :key="index"
                          @click='tabPlatform(index, item.title)'
                        ><a href="javascript:;">{{ item.title }}</a> </li>
                      </ul>
                    </div>
                  </div>
                  <div class="list-form fl">
                    <div
                      v-for="(item, index) in musicPlatformData"
                      :key="index"
                    >
                      <div class="clearfix" v-if="index === ins && item.artistUrl !== ''">
                        <div class="form fl">
                          <Input
                            v-model="item.searchValue"
                            @keyup.enter.native="initSongList(item, 'search')"
                          >
                          </Input>
                        </div>
                        <div class="fr form-submit">
                          <a href="javascript:;" @click="initSongList(item, 'search')">搜索</a>
                          <a href="javascript:;" class="icon">|</a>
                          <a href="javascript:;" @click="deleteSearchValue(index)">取消</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="list-main-body">
                  <list-tpl
                    :songList="addSongListData"
                    type="search"
                    @select="selectSong"
                    v-if="addSongListData.length > 0"
                  ></list-tpl>
                  <div v-else class="no-data">
                    <div>
                      <div><img src="@/assets/image/no-data.png"/></div>
                      <div class="text">请先搜索添加歌曲~</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-main" v-else-if="navList[2].flag">
                <div class="history-header">
                  相伴<span>{{ historyDays }}天</span>、共听<span>{{ historySongs }}</span>首歌
                </div>
                <div class="history-body" ref="historyBody">
                  <Scroll
                    :on-reach-bottom="handleReachBottom"
                    :height="historyHeight"
                  >
                    <list-group-tpl
                      :songList="historyList"
                    ></list-group-tpl>
                  </Scroll>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-footer">
          <page-footer></page-footer>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import tomuAplayer from '@/components/tomuAplayer.vue';
import listTpl from '@/components/list.vue';
import listGroupTpl from '@/components/list-group.vue';
import pageFooter from '@/view/components/footer.vue'
import { mapState, mapMutations } from 'vuex';
import config from '@/config';
import pinyin from '@/libs/pinyin'

import {
  addSongData,
  saveSongList,
  getSongBackgroundImage,
  addSongImage,
  addCdImage,
  byClass,
  getThisPlayer,
  changeResultData,
  changeRequestData,
  getToken,
  signOut
} from '@/libs/util';

export default {
  name: 'pageHome',
  data () {
    return {
      aplayListFlag: false,
      lrcFlag: true,
      addClass: '',
      musicPlatform: [],
      musicPlatformShow: false,
      ins: 0,
      insName: '网易云音乐',
      addSongList: [],
      thisPlayerInfo: {},
      pauseFlag: false,
      selectSongList: [],
      listAdd: [],
      deleteIndex: null,
      switchSong: null,
      seekTime: null,
      songs: [],
      homeHeight: 0,
      homeFooterOpen: false,
      footerHandleHeight: 110,
      navList: [{
        name: '歌单',
        flag: true,
        icon: 'icon-gedan',
        index: 0
      }, {
        name: '搜索',
        flag: false,
        icon: 'icon-sousuo',
        index: 1
      }, {
        name: '足迹',
        flag: false,
        icon: 'icon-yinle',
        index: 2
      }],
      footerHandleShow: false,
      audienceList: [{
        name: '我',
        flag: false
      }, {
        name: '他/她',
        flag: false
      }],
      otherUser: '',
      welcomeMusic: {
        id: 0,
        artist: 'ToMu',
        author: 'ToMu',
        cover: 'https://ooorq.com/image/tomu-logo.png',
        lrc: '',
        name: '欢迎使用ToMu,请添加歌曲',
        pic: 'https://ooorq.com/image/tomu-logo.png',
        songSource: 'netease',
        songUrl: 'https://ooorq.com/mp3/tomu.mp3',
        title: '欢迎使用ToMu,请添加歌曲',
        type: 'normal',
        url: 'https://ooorq.com/mp3/tomu.mp3'
      },
      songsArr: [],
      historyHeight: 300,
      historyPageNum: 1,
      historyPageSize: 10,
      historyList: {},
      historyDays: 0,
      historySongs: 0
    }
  },
  components: {
    tomuAplayer,
    pageFooter,
    listTpl,
    listGroupTpl
  },
  watch: {
    thisPlayerInfo (data) {
      this.showThisSong(data);
      document.title = `ToMu - ${data.title}`
    },
    songList() {
      this.showThisSong(this.thisPlayerInfo);
    }
  },
  computed: {
    ...mapState([
      'homeSignOut',
      'newChannel',
      'songList',
      'addFlag',
      'channelIdInfo',
      'lastSongs',
      'lastChannelInfo'
    ]),
    allSong: {
      get () {
        return this.songsArr;
      },
      set (data) {
        this.songsArr = data;
      }
    },
    musicPlatformData: {
      get () {
        return this.musicPlatform;
      },
      set (data) {
        this.musicPlatform = data;
      }
    },
    addSongListData: {
      get () {
        return this.addSongList;
      },
      set (data) {
        this.addSongList = data;
      }
    },
    homeOffsetHeight: {
      get () {
        return this.homeHeight;
      },
      set (data) {
        this.homeHeight = data;
      }
    }
  },
  methods: {
    ...mapMutations([
      'setSongList',
      'setChannelFlag',
      'setAddFlag',
      'setLastSongs',
      'setSignOut'
    ]),
    async getChannelSongs () {
      // 清空搜索歌单列表
      this.addSongListData = [];
      // 查询歌单
      // const songs = await this.$api.getChannelSongsAll(this.channelIdInfo);
      const songs = this.lastSongs;
      if (songs.length > 0) {
        this.setLastSongs([]);
        this.setSongList(changeResultData(songs));
        // 定位最后一次播放
        const indexOf = this.songList.findIndex(item => item.id === this.lastChannelInfo.lastSongID);
        if (indexOf !== -1) {
          this.switchSong = indexOf;
          setTimeout(() => {
            this.seekTime = this.lastChannelInfo.lastPosition
          }, 1000)
        }
      }
      // 初始化
      this.initHome();
      // 初始化监听
      this.listenChannelStatus()
    },
    /*
    * 初始化
    * */
    initHome () {
      // 赋值切换类型
      this.musicPlatformData = config.musicPlatform;
      // this.addSongList = this.$store2[config.storageType]('vuex').songList;
      this.selectSongList = this.$store2[config.storageType]('vuex').songList;
    },
    /*
    * 显示当前播放歌曲
    * */
    showThisSong(data) {
      const songs = this.$store2[config.storageType]('vuex').songList;
      Object.keys(songs).forEach((i) => {
        songs[i].flag = false;
      })
      const indexOf = this.songList.findIndex(item => item.id === data.id);
      if (indexOf !== -1) {
        songs[indexOf].flag = true;
      }
      this.allSong = songs
    },
    /*
    * 显示平台平台
    * */
    showMusicPlatform() {
      this.musicPlatformShow = !this.musicPlatformShow;
    },
    /*
    * 切换平台
    * */
    tabPlatform (num, name) {
      this.musicPlatformShow = !this.musicPlatformShow;
      this.ins = num;
      this.insName = name;
      this.$ba.trackEvent(`${this.$store2[config.storageType]('userName')}-选择播放平台`, JSON.stringify({
        info: name
      }));
    },
    /*
    * 切换歌曲添加方式
    * */
    tabSongType (value, index) {
      this.musicPlatformData[index].addSongType = value;
    },
    /*
    * 初始化列表
    * */
    async initSongList (options, type) {
      this.addSongListData = [];
      this.$Spin.show();
      const {
        addSongListData
      } = this;
      let id = options[`${type}Value`];
      const songListData = await this.$api.getSongList({
        server: options.type,
        type,
        id
      });
      this.$Spin.hide();
      const data = addSongData(addSongListData, songListData, options.type);
      this.addSongListData = data;
    },
    /*
    * 取消搜索歌曲
    * */
    deleteSearchValue(index) {
      this.musicPlatformData[index].searchValue = '';
      // 清空搜索
      this.addSongListData = [];
    },
    /*
    * 选择歌曲
    * */
    selectSong (data) {
      const hasData = this.selectSongList.find(item => JSON.stringify(item) === JSON.stringify(data));
      if (hasData === undefined) {
        this.selectSongList.push(data);
        // 清空搜索
        this.addSongListData = [];
        // 添加歌曲
        this.generatePlaylist();
      } else {
        this.$Message.warning('该歌曲已存在播放列表中');
      }
    },
    /*
    * 移除歌曲
    * */
    async deleteSong (data) {
      if (this.thisPlayerInfo.url === data.url) {
        this.$Message.warning('请不要移除正在播放的歌曲');
      } else {
        const indexOf = this.selectSongList.findIndex(item => item.url === data.url);
        if (indexOf !== -1 && this.selectSongList[indexOf].id != undefined) {
          await this.$api.deleteChannelSongs(this.channelIdInfo, this.selectSongList[indexOf].id);
          this.deleteIndex = indexOf;
          this.selectSongList.splice(indexOf, 1);
          if (this.selectSongList.length === 0) {
            this.thisPlayerInfo = this.welcomeMusic
          }
          this.setSongList(saveSongList(this.selectSongList));
        }
      }
    },
    /*
    * 生成已选择的歌曲列表
    * */
    generatePlaylist () {
      if (this.selectSongList.length > 0) {
        this.copyRightApi(saveSongList(this.selectSongList));
      } else {
        this.$Message.info('请先选择歌曲');
      }
    },
    /*
    * 验证歌曲版权
    * */
    copyRightApi (list) {
      // await Promise.all(Object.values(list).map((data) => this.$api.copyRightApi(data.url)))
      this.addSongsAll(list);
    },
    /*
    * 添加全部歌曲
    * */
    async addSongsAll (list) {
      // 是否是再次添加歌曲
      this.$store2[config.storageType]('listAdd', list);
      const getListAdd = this.$store2[config.storageType]('listAdd');
      if (this.songList.length > 0) {
        getListAdd.splice(0, this.songList.length);
      }
      const channelSongsList = changeRequestData(getListAdd);
      await Promise.all(Object.values(channelSongsList).map((data) => this.$api.setChannelSongs(this.channelIdInfo, data)));
      const songs = await this.$api.getChannelSongsAll(this.channelIdInfo);
      if (songs) {
        const resultData = changeResultData(songs);
        resultData.splice(0, this.songList.length);
        this.listAdd = resultData;
        this.saveSongsAll();
      }
    },
    /*
    * 保存全部歌曲
    * */
    async saveSongsAll () {
      const newSongs = await this.$api.getChannelSongsAll(this.channelIdInfo);
      if (newSongs) {
        this.setChannelFlag();
        this.setSongList(changeResultData(newSongs));
        this.selectSongList = this.$store2[config.storageType]('vuex').songList;
      }
    },
    /*
    * 自定义播放动画所需元素
    * */
    async setPlayImage () {
      if (this.thisPlayerInfo.songSource === undefined) return;
      // 获取歌曲封面
      const backgroundImage = getSongBackgroundImage('aplayer-pic');
      let picUrl = '';
      if (
        this.thisPlayerInfo.songSource === 'netease'
        || this.songList[0].songSource === 'netease'
      ) {
        if (this.thisPlayerInfo.artist !== 'ToMu') {
          let picResponseURL = await this.$api.getPicUrl(backgroundImage);
          picUrl = picResponseURL.responseURL.substring(0, picResponseURL.responseURL.length - 5);
          picUrl = `background-image: url('${picUrl}190y190');`;
        }
      } else if (
        this.thisPlayerInfo.songSource === 'tencent'
        || this.songList[0].songSource === 'tencent'
      ) {
        picUrl = `background-image: url('${backgroundImage}');`;
      } else if (
        this.thisPlayerInfo.songSource === 'kugou'
        || this.songList[0].songSource === 'kugou'
      ) {
        picUrl = 'background-image: url(\'https://www.ooorq.com/image/kugou-190.png\');';
      } else if (
        this.thisPlayerInfo.songSource === 'baidu'
        || this.songList[0].songSource === 'baidu'
      ) {
        picUrl = `background-image: url('${backgroundImage}');`;
      }
      // 添加高清封面
      addSongImage('aplayer-pic', picUrl);
      // 添加CD
      addCdImage('aplayer-pic');
    },
    /*
    * 播放
    * */
    play (d) {
      // 获取正在播放的歌曲
      this.thisPlayerInfo = this.songList[getThisPlayer(this.songList, d)];
      // 如果查询不到，加载欢迎音乐
      if (this.thisPlayerInfo === undefined) {
        this.thisPlayerInfo = this.welcomeMusic;
      }
      const handle = byClass('aplayer-pic');
      handle.setAttribute('class', 'aplayer-pic aplayer-pic-play');
      // 延迟一秒播放动画
      setTimeout(() => {
        handle.classList.add('aplayer-pic-play-color');
      }, 1000);
    },
    /*
    * 暂停
    * */
    pause () {
      const handle = byClass('aplayer-pic');
      handle.setAttribute('class', 'aplayer-pic');
    },
    /*
    * 错误
    * */
    error (data) {
      // 获取正在播放的歌曲
      const songIndex = getThisPlayer(this.songList, data);
      const thisPlayerInfo = this.songList[songIndex];
      this.$Message.error(`抱歉， ${thisPlayerInfo.title} - ${thisPlayerInfo.artist} 牵涉版权问题暂时无法播放`);
      this.$ba.trackEvent(`${this.$store2[config.storageType]('userName')}-播放了带有版权的歌曲`, JSON.stringify({
        info: `${thisPlayerInfo.title} - ${thisPlayerInfo.artist}`
      }));
      if (parseFloat(songIndex) + 1 === this.songList.length) {
        this.pauseFlag = true;
      }
    },
    /*
    * 显示关闭歌词
    * */
    lrcShowFlag () {
      if (this.songList.length > 0) {
        this.lrcFlag = !this.lrcFlag;
        this.$refs.aplayer.lrcFlag();
      } else {
        this.$Message.info('请添加歌曲');
      }
    },
    /*
    * 显示关闭歌单
    * */
    aplayListShowFlag () {
      if (this.songList.length > 0) {
        this.aplayListFlag = !this.aplayListFlag;
        this.$refs.aplayer.aplayListFlag();
      } else {
        this.$Message.info('请添加歌曲');
      }
    },
    /*
    * 上报播放状态变化
    * */
    async updateTime (time) {
      if (this.thisPlayerInfo.artist === 'ToMu') return;
      await this.$api.setChannelSongsStatus(this.channelIdInfo, {
        songID: this.thisPlayerInfo.id || '',
        position: time
      });
    },
    /*
    * 切换播放音乐
    * */
    switchSongPlayer(index) {
      this.switchSong = index
    },
    /*
    * 监听频道状态
    * */
    async listenChannelStatus () {
      const source = new this.$EventSourcePolyfill(`${process.env.VUE_APP_BASE_URL}${config.apiVersions}/channel/${this.channelIdInfo}/event?clientID=${getToken()}`);
      source.addEventListener('open', () => {
        this.$Message.info('欢迎使用ToMu');
      }, false);
      // 改变进度
      source.addEventListener('CHANGE_PLAY_STATUS', (e) => {
        let {
          data
        } = e;
        const {
          detail
        } = JSON.parse(data);
        const indexOf = this.songList.findIndex(item => item.id === detail.songID);
        if (indexOf !== -1) {
          this.switchSong = indexOf;
          setTimeout(() => {
            this.seekTime = detail.position
          }, 1000)
        }
      }, false);
      // 退出频道
      source.addEventListener('AUDIENCE_OUT', (e) => {
        let {
          data
        } = e;
        const {
          detail: {
            nickName
          }
        } = JSON.parse(data);
        this.$Message.info(`${nickName}退出频道`);
      }, false);
      // 进入频道
      source.addEventListener('AUDIENCE_IN', (e) => {
        let {
          data
        } = e;
        const {
          detail: {
            nickName
          }
        } = JSON.parse(data);
        this.$Message.info(`${nickName}进入频道`);
        this.seeUser();
      }, false);
      // 接收添加歌曲
      source.addEventListener('ADD_SONG', (e) => {
        let {
          data
        } = e;
        const {
          detail: {
            channelID,
            songView
          }
        } = JSON.parse(data);
        if (channelID === this.channelIdInfo) {
          this.listAdd = changeResultData([songView]);
          let newSongsList = this.$store2[config.storageType]('vuex').songList;
          newSongsList.push(changeResultData([songView])[0]);
          this.setSongList(newSongsList);
          this.selectSongList = this.$store2[config.storageType]('vuex').songList;
        }
      }, false);
      // 移除歌曲
      source.addEventListener('DELETE_SONG', (e) => {
        let {
          data
        } = e;
        const {
          detail: {
            songID
          }
        } = JSON.parse(data);
        if (this.thisPlayerInfo.id === songID) {
          this.$Message.warning('请不要移除正在播放的歌曲');
        } else {
          const indexOf = this.selectSongList.findIndex(item => item.id === songID);
          if (indexOf !== -1 && this.selectSongList[indexOf].id != undefined) {
            this.removeSong(songID);
            this.deleteIndex = indexOf;
            this.selectSongList.splice(indexOf, 1);
            this.setSongList(saveSongList(this.selectSongList));
          }
          this.selectSongList = this.$store2[config.storageType]('vuex').songList;
        }
      }, false);
      // 听众被踢走
      source.addEventListener('KICK_AUDIENCE', (d) => {
        let {
          data
        } = d;
        data = JSON.parse(data);
        if (data.detail.poorAudience === this.$store2[config.storageType](config.tokenName)) {
          this.signOut();
        }
      }, false);
      // 错误处理
      source.addEventListener('error', (e) => {
        source.close();
        this.$ba.trackEvent(`${this.$store2[config.storageType]('userName')}-推送接口连接失败了`, JSON.stringify({
          info: e
        }));
        this.listenChannelStatus();
      }, false);
    },
    /*
    * 离开
    * */
    async signOut () {
      const out = await this.$api.signOutChannel(this.channelIdInfo);
      if (out === '') {
        this.$Message.info('频道退出成功');
        this.setSignOut(true);
        this.$ba.trackEvent(`${this.$store2[config.storageType]('userName')}-退出频道`, JSON.stringify({
          info: '退出频道'
        }));
        signOut(this.$router);
      }
    },
    /*
    * 移除歌曲
    * */
    async removeSong (songID) {
      await this.$api.deleteChannelSongs(this.channelIdInfo, songID);
    },
    /*
    * 设置播放区域高度
    * */
    setPlayerHeight (height = 0, open) {
      const footerHeight = this.$refs.homeFooter.offsetHeight;
      const headerHeight = open ? 0 : 130;
      const documentHeight = document.documentElement.clientHeight;
      this.homeOffsetHeight = documentHeight - footerHeight - headerHeight + height;
    },
    /*
    * 打开底部操作区域
    * */
    openFooterHandle(index) {
      // 打开面板
      this.homeFooterOpen = !this.homeFooterOpen;
      // this.footerHandleShow = !this.footerHandleShow;
      this.switchFooterHandle(index);
      // 制作动画
      const homePlayerMinHeight = 260;
      const documentHeight = document.documentElement.clientHeight - 130 - homePlayerMinHeight;
      let animationHeight = setInterval(() => {
        if (this.footerHandleHeight < documentHeight) {
          this.footerHandleHeight += 5;
          this.setPlayerHeight();
        } else {
          this.setPlayerHeight();
          clearInterval(animationHeight);
        }
      }, 1)
    },
    /*
    * 关闭底部操作区域
    * */
    closeFooterHandle() {
      // this.footerHandleShow = !this.footerHandleShow;
      let animationHeight = setInterval(() => {
        if (this.footerHandleHeight > 0) {
          this.footerHandleHeight -= 5;
          this.setPlayerHeight(5);
        } else {
          this.homeFooterOpen = !this.homeFooterOpen;
          let minFooterHeight = setInterval(() => {
            if (this.footerHandleHeight < 110) {
              this.footerHandleHeight += 1;
              this.setPlayerHeight();
            } else {
              this.setPlayerHeight();
              clearInterval(minFooterHeight);
            }
          }, 1);
          this.setPlayerHeight(5);
          clearInterval(animationHeight);
        }
      }, 1)
    },
    /*
    * 切换底部显示
    * */
    switchFooterHandle(index) {
      Object.keys(this.navList).forEach((i) => {
        this.navList[i].flag = false;
      });
      this.navList[index].flag = true;
      if (index === 2) {
        setTimeout(() => {
          const boxHeight = this.$refs.historyBody.offsetHeight;
          this.historyHeight = boxHeight;
          // 初始化播放历史
          this.initHistory();
        }, 500)
      }
    },
    /*
    * 查看在线人员
    * */
    async seeUser () {
      const userList = await this.$api.getAudienceList(this.channelIdInfo);
      const userInfo = await this.$api.getThisUserName(this.channelIdInfo);
      Object.keys(userList).forEach(i => {
        if (userList[i] === userInfo) {
          this.audienceList[0].flag = true;
        } else {
          this.otherUser = userList[i];
          this.audienceList[1].flag = true;
        }
      });
    },
    /*
    * 移除在线人员
    * */
    removeUser (index) {
      if (index === 1 && this.audienceList[1].flag) {
        this.$Modal.info({
          title: '确定移除吗？',
          onOk: () => {
            this.$api.deleteUser(this.channelIdInfo, this.otherUser).then(() => {
              this.audienceList[1].flag = false;
              this.$Message.info('移除成功')
            })
          }
        })
      }
    },
    async initHistory() {
      const summary = await this.$api.getPlayHistorySummary(this.channelIdInfo);
      if (summary) {
        this.historyDays = summary.days;
        this.historySongs = summary.songs;
      }
      const {
        data
      } = await this.$api.getPlayHistory(this.channelIdInfo, this.historyPageNum, this.historyPageSize);
      Object.keys(data).forEach(i => {
        let keys = pinyin.chineseToPinYin(data[i].graceDateClassification);
        if (this.historyList[keys] === undefined) {
          this.$set(this.historyList, keys, {});
          this.$set(this.historyList[keys], 'name', data[i].graceDateClassification);
          this.$set(this.historyList[keys], 'data', []);
        }
        const hasData = this.historyList[keys].data.find(item => item.songID === data[i].songID);
        if (hasData === undefined) {
          this.historyList[keys].data.push(data[i]);
        }
      })
    },
    /*
    * 加载更多播放历史
    * */
    handleReachBottom() {
      this.historyPageNum += 1;
      this.initHistory();
    }
  },
  async created() {
    // 初始化频道歌单
    await this.getChannelSongs();
  },
  mounted() {
    // 初始化高度
    this.setPlayerHeight();
    window.onresize = () => {
      this.setPlayerHeight();
    }
    // 查询在线人员
    this.seeUser();
  }
}
</script>

<style lang="less">
  .open{
    top: 0 !important;
  }
  .home-main{
    position: fixed;
    left: 0;
    top: 130px;
    bottom: 0;
    width: 100%;
    z-index: 3;
    .home-body{
      /* overflow: auto; */
      width: 100%;
      height: 100%;
      align-items:center;
      justify-content:center;
      display:-webkit-flex;
      .home-player{
        padding-left: 50px;
        .home-player-info{
          padding-bottom: 30px;
          .img{width: 60px}
          .title{
            line-height: 34px;
            font-size: 20px;
            color: #ffffff;
            padding-left: 10px;
          }
          .audience{
            font-size: 20px;
            padding-left: 30px;
            a{
              color: #ffffff;
              margin: 0 5px;
            }
            a.on{
              color: #8c41f1;
            }
          }
        }
        .tomu-aplayer{
          width: 800px;
          .aplayer{
            background: none;
            box-shadow: none;
            border-radius: 0;
            .aplayer-pic{
              width: 150px;
              height: 150px;
              .aplayer-play{
                width: 36px;
                height: 36px;
                margin: 0 -20px -20px 0;
                background: rgba(0,0,0,0.15);
                svg{
                  width: 20px;
                  height: 20px;
                  top: 8px;
                  left: 9px;
                }
              }
              .aplayer-pause{
                width: 36px;
                height: 36px;
                margin: 0 10px 10px 0;
                svg{
                  width: 20px;
                  height: 20px;
                  top: 7px;
                  left: 8px;
                }
              }
            }
            .aplayer-info{
              border: none;
              margin-left: 150px;
              height: 150px;
              .aplayer-music{
                height: auto;
                padding-top: 25px;
                .aplayer-title{
                  font-size: 24px;
                  color: #ffffff;
                }
                .aplayer-author{
                  font-size: 24px;
                  color: #ffffff;
                }
              }
              .aplayer-controller{
                margin-top: 20px;
                .aplayer-time{
                  font-size: 16px;
                  color: #ffffff;
                  padding-top: 4px;
                  .aplayer-icon path {
                    fill: #ffffff;
                  }
                  .aplayer-icon-loop{
                    display: none;
                  }
                  .aplayer-icon-order{
                    display: none;
                  }
                }
                .aplayer-bar-wrap{padding: 4px 0 0 0}
                .aplayer-bar{
                  height: 12px;
                  background: #C1C1FF;
                  div{height: 12px !important;}
                  .aplayer-played{
                    background: #ffffff !important;
                    .aplayer-thumb{
                      width: 20px;
                      height: 20px;
                      background: #ffffff !important;
                      margin-right: -20px;
                    }
                  }
                }
                .aplayer-icon{
                  width: 35px;
                  height: 24px;
                }
                .aplayer-icon-menu{
                  display: none;
                }
                .aplayer-volume-bar-wrap{
                  right: 8px;
                  bottom: 30px;
                  .aplayer-volume-bar{
                    right: 8px;
                    width: 10px;
                    .aplayer-volume{
                      width: 10px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .home-footer{
      background-color: rgba(113, 96, 217, 0.8);
      .home-tomu-handle{
        height: 110px;
        text-align: center;
        align-items:center;
        justify-content:center;
        display:-webkit-flex;
        ul li{
          display: inline-block;
          margin: 0 45px;
          a{
            display: block;
            font-size: 23px;
            color: #ffffff;
            i{margin-right: 8px;font-size: 24px;}
          }
        }
      }
      .home-footer-body{
        height: 100%;
        background: #c3c3fa;
        .content{
          height: 100%;
          .content-header{
            height: calc(100% - 60px);
            max-width: 1125px;
            margin: 0 auto;
            .content-header-main{
              height: 100%;
              padding-top: 50px;
              .content-handle-header{
                height: 54px;
                border-bottom: 1px solid #8b49ed;
                .nav{
                  ul li{
                    display: inline-block;
                    margin: 0 45px;
                    a{
                      display: block;
                      font-size: 23px;
                      color: #ffffff;
                      i{margin-right: 8px;font-size: 24px;}
                    }
                  }
                  ul li.on{
                    a{
                      color: #8b49ed;
                    }
                  }
                }
                .close{
                  i{font-size: 24px;color: #626274}
                }
              }
              .content-handle-body{
                height: calc(100% - 55px);
                .list-main{
                  height: 100%;
                  .list-main-header{
                    .song-select{
                      width: 180px;
                      position: relative;
                      height: 59px;
                      border-bottom: 1px solid #8b49ed;
                      .name{
                        text-align: center;
                        position: relative;
                        height: 59px;
                        align-items:center;
                        justify-content:center;
                        display:-webkit-flex;
                        cursor: pointer;
                        font-size: 16px;
                        color: #565865;
                        i{margin-left: 6px}
                      }
                      .select{
                        position: absolute;
                        left: 0;
                        top: 59px;
                        width: 100%;
                        background: #C3C2FB;
                        padding: 5px 0;
                        ul li a{
                          display: block;
                          padding: 10px;
                          text-align: center;
                          color: #565865;
                        }
                        ul li a:hover{
                          background: #BEBEFC;
                        }
                      }
                    }
                    .list-form{
                      width: calc(100% - 180px);
                      .form{
                        height: 59px;
                        border-bottom: 1px solid #8b49ed;
                        width: calc(100% - 120px);
                        .ivu-input-default{
                          background: none;
                          border: none;
                          transition: none;
                          height: 59px;
                          font-size: 16px;
                          color: #565865;
                        }
                        .ivu-input-default:focus{
                          box-shadow: none;
                        }
                      }
                      .form-submit{
                        width: 120px;
                        align-items:center;
                        justify-content:center;
                        display:-webkit-flex;
                        height: 59px;
                        a{
                          font-size: 18px;
                          color: #565865;
                          margin-left: 5px;
                          margin-right: 5px;
                        }
                        a.icon{
                          color: #8A49EB;
                        }
                      }
                    }
                  }
                  .list-main-body{
                    height: calc(100% - 60px);
                  }
                  .history-header{
                    height: 44px;
                    line-height: 44px;
                    border-bottom: 1px solid #8A49ED;
                    padding-left: 45px;
                    font-size: 16px;
                    span{
                      color: #8A49ED;
                    }
                  }
                  .history-body{
                    height: calc(100% - 45px);
                  }
                }
              }
            }
          }
          .content-footer{height: 60px}
        }
      }
    }
  }
  .no-data{
    align-items:center;
    justify-content:center;
    text-align: center;
    height: 100%;
    display:-webkit-flex;
    .text{
      font-size: 14px;
      color: #555555;
      padding-top: 10px;
    }
  }
</style>
