<template>
<div class="home-main">
  <div class="home-body">
    <div
      class="newChannel"
      v-show="addFlag"
      :class="{addSong: continueAddSong}"
    >
      <div class="title" v-if="!newChannel">您还未添加歌曲请先添加歌曲</div>
      <div class="newChannel-handle">
        <div class="clearfix music-platform">
          <div class="body">
            <div class="clearfix" v-if="continueAddSong">
              <Icon class="fr" type="md-close" @click="closeAddSong" size="26" />
            </div>
            <div class="nav-list clearfix">
              <div>
                <ul>
                  <li
                    v-for="(item, index) in musicPlatformData"
                    :key="index"
                    :class="{on: index === ins}"
                    @click='tabPlatform(index, item.title)'
                  >
                    <a href="javascript:;"><img :src='item.logo'/></a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="song-list clearfix"
              v-for="(item, index) in musicPlatformData"
              :key="index"
            >
              <div class="song-list-body" v-if="index === ins">
                <div class="song-list-header">
                  <div class="form SentyPea">
                    <div class="clearfix form-handle">
                      <div v-if="item.artistUrl !== ''">
                        <div class="fl">
                          <Input
                            v-model="item.searchValue"
                            @keyup.enter.native="initSongList(item, 'search')"
                          >
                          </Input>
                        </div>
                        <div class="fr clearfix" style="width: 190px">
                          <Button @click="initSongList(item, 'search')" type="warning" long>搜索歌曲</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="song-list-footer">
                  <div class="fl" v-if="addSongListData.length > 0">
                    <h3>搜索结果：</h3>
                    <ul>
                      <li
                        v-for="(item, index) in addSongListData"
                        :key="index"
                        @click="selectSong(item)"
                      >
                        <b>{{ item.title }}</b> - {{ item.author }}
                      </li>
                    </ul>
                  </div>
                  <div class="fr" v-if="selectSongList.length > 0">
                    <h3>已选歌曲：</h3>
                    <ul>
                      <li
                        v-for="(item, index) in selectSongList"
                        :key="index"
                      >
                        <span><b>{{ item.title }}</b> - {{ item.author }}</span>
                        <div class="close" @click="deleteSong(item)">
                          <Icon type="ios-close" size="22" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="generate-playlist" v-if="selectSongList.length > 0">
              <Button
                type="success"
                long
                @click="generatePlaylist"
              >完成选择</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!newChannel"  class="home-player">
      <div class="clearfix home-player-info">
        <div class="fl title clearfix">
          <Icon
            type="ios-radio"
            size="30"
          /><span>频道# {{ channelIdInfo || '获取中' }}</span>
        </div>
        <div class="fr clearfix">
          <ul>
            <li :class="lrcFlag ? 'on' : ''">
              <a href="javascript:;"  @click="lrcShowFlag">
                <i class="iconfont icon-gecishezhi_"></i>歌词
              </a>
            </li>
            <li :class="aplayListFlag ? 'on' : ''">
              <a href="javascript:;"  @click="aplayListShowFlag">
                <i class="iconfont icon-jiarugedan"></i>已选歌单
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tomu-aplayer">
        <div class="tomu-aplayer-handle clearfix" v-if="false">
          <div class="fr">
            <Dropdown>
              <a href="javascript:void(0)">
                已听2首
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>稻香</DropdownItem>
                <DropdownItem>青花瓷</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
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
      <div class="home-tomu-handle">
        <ul>
          <li>
            <a href="javascript:;"  @click="addSong">
              <Icon type="md-add-circle" /><span>添加歌曲</span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <Icon type="md-musical-notes" /><span>随便听听</span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <Icon type="md-search"/><span>搜索</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import tomuAplayer from '@/components/tomuAplayer.vue';
import { mapState, mapMutations } from 'vuex';
import config from '@/config';
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
  getToken
} from '@/libs/util';

export default {
  name: 'pageHome',
  data () {
    return {
      aplayListFlag: false,
      lrcFlag: true,
      addClass: '',
      musicPlatform: [],
      ins: 0,
      addSongList: [],
      thisPlayerInfo: {},
      pauseFlag: false,
      continueAddSong: false,
      selectSongList: [],
      listAdd: [],
      deleteIndex: null,
      switchSong: null,
      seekTime: null,
      songs: []
    }
  },
  components: {
    tomuAplayer,
  },
  watch: {
    thisPlayerInfo (data) {
      document.title = `ToMu - ${data.title}`
    }
  },
  computed: {
    ...mapState([
      'homeSignOut',
      'newChannel',
      'songList',
      'addFlag',
      'channelIdInfo',
    ]),
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
    }
  },
  methods: {
    ...mapMutations([
      'setSongList',
      'setChannelFlag',
      'setAddFlag'
    ]),
    async getChannelSongs () {
      const songs = await this.$api.getChannelSongsAll(this.channelIdInfo);
      if (songs) {
        if (songs.length > 0) {
          this.setSongList(changeResultData(songs))
        }
        // 初始化
        this.initHome();
        // 初始化监听
        // this.listenChannelStatus()
      } else {
        this.$Message.error('获取频道歌单失败，请重新进入频道。');
        this.$ba.trackEvent(`${this.$store2[config.storageType]('userName')}-获取频道歌单失败`, JSON.stringify({
          info: 'error'
        }));
        setTimeout(() => {
          this.$router.push(config.addChannelPath);
        }, 800);
      }
    },
    /*
    * 初始化
    * */
    initHome () {
      // 赋值切换类型
      this.musicPlatformData = config.musicPlatform;
      if (this.songList.length === 0 && this.newChannel) {
        this.setAddFlag(true);
      } else {
        this.addSongList = this.$store2[config.storageType]('vuex').songList;
        this.selectSongList = this.$store2[config.storageType]('vuex').songList;
        this.setAddFlag(false);
      }
    },
    /*
    * 切换平台
    * */
    tabPlatform (num, name) {
      this.ins = num;
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
    * 选择歌曲
    * */
    selectSong (data) {
      const hasData = this.selectSongList.find(item => JSON.stringify(item) === JSON.stringify(data));
      if (hasData === undefined) {
        this.selectSongList.push(data);
        this.addSongListData = []
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
      } else if (this.continueAddSong) {
        const indexOf = this.selectSongList.findIndex(item => item.url === data.url);
        if (indexOf !== -1 && this.selectSongList[indexOf].id != undefined) {
          await this.$api.deleteChannelSongs(this.channelIdInfo, this.selectSongList[indexOf].id);
          this.deleteIndex = indexOf;
          this.selectSongList.splice(indexOf, 1);
          this.setSongList(saveSongList(this.selectSongList));
        } else {
          this.selectSongList.splice(indexOf, 1);
        }
      } else if (!this.continueAddSong) {
        const indexOf = this.selectSongList.findIndex(item => item.url === data.url);
        this.selectSongList.splice(indexOf, 1);
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
      if (this.continueAddSong) {
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
      } else {
        // 是否首次添加歌曲
        const channelSongsList = changeRequestData(list)
        await Promise.all(Object.values(channelSongsList).map((data) => this.$api.setChannelSongs(this.channelIdInfo, data)));
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
    * 继续添加歌曲
    * */
    addSong () {
      this.continueAddSong = true;
      this.setAddFlag(true);
    },
    /*
    * 关闭继续添加歌曲
    * */
    closeAddSong () {
      this.continueAddSong = false;
      this.setAddFlag(false);
    },
    /*
    * 自定义播放动画所需元素
    * */
    async setPlayImage () {
      // 获取歌曲封面
      const backgroundImage = getSongBackgroundImage('aplayer-pic');
      let picUrl = '';
      if (
        this.thisPlayerInfo.songSource === 'netease'
        || this.songList[0].songSource === 'netease'
      ) {
        let picResponseURL = await this.$api.getPicUrl(backgroundImage);
        picUrl = picResponseURL.responseURL.substring(0, picResponseURL.responseURL.length - 5);
        picUrl = `background-image: url('${picUrl}190y190');`;
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
      await this.$api.setChannelSongsStatus(this.channelIdInfo, {
        songID: this.thisPlayerInfo.id || '',
        position: time
      });
    },
    /*
    * 监听频道状态
    * */
    async listenChannelStatus () {
      const source = new this.$EventSourcePolyfill(`${process.env.VUE_APP_BASE_URL}${config.apiVersions}/channel/${this.channelIdInfo}/status?clientID=${getToken()}`);
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
          } else {
            this.selectSongList.splice(indexOf, 1);
          }
          this.selectSongList = this.$store2[config.storageType]('vuex').songList;
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
    async deleteChannelSongs (songID) {
      await this.$api.deleteChannelSongs(this.channelIdInfo, songID);
    }
  },
  async created() {
    // 初始化频道歌单
    await this.getChannelSongs()
  }
}
</script>

<style lang="less">
  .home-main{
    width: 100%;
    height: 100%;
    .home-body{
      overflow: auto;
      width: 100%;
      height: 100%;
      overflow: auto;
      align-items:center;
      justify-content:center;
      display:-webkit-flex;
      .newChannel{
        position: fixed;
        left: 0;
        top: 65px;
        bottom: 65px;
        width: 100%;
        align-items:center;
        justify-content:center;
        display:-webkit-flex;
        z-index: 10;
        .title{
          font-size: 20px;
        }
        .newChannel-handle{
          position: fixed;
          left: 0;
          top: 65px;
          bottom: 65px;
          width: 100%;
          z-index: 99999999;
          align-items:center;
          justify-content:center;
          display:-webkit-flex;
          .music-platform{
            width: 800px;
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255,255,255,0.7);
            @media only screen and (max-width: 820px) and (min-width:0px) {
              width: 90%;
            }
            .body{
              padding: 20px;
              .nav-list{
                ul li{
                  float: left;
                  width: 25%;
                  text-align: center;
                  height: 35px;
                  @media only screen and (max-width: 820px) and (min-width:0px) {
                    width: 50%;
                  }
                  a{
                    display: inline-block;
                    img{
                      height: 20px;
                    }
                  }
                }
                ul li.on a{
                  border-bottom: 1px #999999 dashed;
                }
              }
              .song-list{
                .song-list-header{
                  padding-top: 15px;
                  text-align: center;
                  .tab{
                    padding-bottom: 10px;
                  }
                  padding-bottom: 10px;
                  .form{
                    .form-handle{
                      .fl{
                        width: 540px;
                        @media only screen and (max-width: 820px) and (min-width:0px) {
                          float: none;
                          display: block;
                          width: 100%;
                        }
                      }
                      .fr {
                        button{margin-right: 10px;}
                        @media only screen and (max-width: 820px) and (min-width:0px) {
                          float: none;
                          display: block;
                          padding-top: 10px;
                          width: 100% !important;
                        }
                      }
                    }
                  }
                }
                .song-list-footer{
                  .fl{
                    width: 440px;
                    padding-top: 10px;
                    ul{
                      display: block;
                      max-height: 315px;
                      overflow: auto;
                      @media only screen and (max-width: 820px) and (min-width:0px) {
                        max-height: 115px;
                      }
                      li{
                        padding: 6px 6px 6px 11px;
                        cursor: pointer;
                        background: #ffffff;
                        float: left;
                        border: 1px #d8d8d8 dashed;
                        margin: 5px 5px 5px 0;
                        .ivu-checkbox-inner{margin-right: 5px}
                      }
                    }
                    @media only screen and (max-width: 820px) and (min-width:0px) {
                      width: 100%;
                    }
                  }
                  .fr{
                    width: 300px;
                    padding-top: 10px;
                    ul{
                      display: block;
                      max-height: 315px;
                      overflow: auto;
                      @media only screen and (max-width: 820px) and (min-width:0px) {
                        max-height: 115px;
                      }
                      li{
                        padding: 5px 30px 5px 5px;
                        margin-top: 5px;
                        position: relative;
                        border: 1px #d8d8d8 dashed;
                        background: #ffffff;
                        .close{
                          position: absolute;
                          right: 4px;
                          top: 0;
                          cursor: pointer;
                          height: 100%;
                          align-items:center;
                          justify-content:center;
                          display:-webkit-flex;
                        }
                      }
                    }
                    @media only screen and (max-width: 820px) and (min-width:0px) {
                      width: 100%;
                    }
                  }
                }
              }
              .generate-playlist{
                padding-top: 10px;
              }
            }
          }
        }
      }
      .addSong{
        background: rgba(0,0,0,0.1) !important;
        top: 0 !important;
        bottom:0 !important;
        height: 100% !important;
        .newChannel-handle{
          top: 0 !important;
          bottom:0 !important;
          height: 100% !important;
          .music-platform{
            background: rgba(255,255,255,1) !important;
          }
        }
      }
      .home-player{
        padding: 30px 0;
        width: 800px;
        max-width: 800px;
        margin: 0 auto;
        position: relative;
        z-index: 9;
        @media only screen and (max-width: 820px) and (min-width:0px) {
          width: 90%;
        }
        .home-player-info{
          padding-bottom: 15px;
          .title{
            line-height: 30px;
            font-size: 16px;
            i{
              float: left;
              margin-right: 5px;
            }
          }
          .fr{
            padding-top: 4px;
            ul li {
              float: left;
              margin-left: 15px;
              line-height: 33px;
              a{
                color: #666666;
                font-size: 16px;
                display: block;
                i{
                  margin-right: 6px;
                  font-size: 22px;
                  float: left;
                }
              }
            }
            ul li.on {
              a{color:#0078D7 }
            }
          }
        }
        .tomu-aplayer-handle{
          padding: 10px 0px 0 0px;
        }
        /* 自定义播放器样式 */
        .aplayer{
          background: none;
          margin: 0;
          box-shadow: none;
          .aplayer-body{
            padding: 30px;
            .aplayer-pic{
              float: none;
              margin: 0 auto;
              width: 180px;
              height: 180px;
              position: relative;
              left: -30px;
              top: 0;
              .aplayer-button{
                z-index: 4;
              }
              .aplayImage{
                position: relative;
                z-index: 3;
                width: 180px;
                height: 180px;
                background-size: 100%;
              }
              .cdImage{
                position: absolute;
                right: -80px;
                top: 10px;
                width: 160px;
                height: 160px;
                background: url("~@/assets/image/cd.png") no-repeat;
                background-size: 100%;
              }
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
                margin: 0 -23px -23px 0;
                svg{
                  width: 20px;
                  height: 20px;
                  top: 7px;
                  left: 8px;
                }
              }
            }
            .aplayer-pic-play-color::after{
              background: rgba(0,120,215,0.45);
            }
            .aplayer-pic-play-color::before{
              background: rgba(0,120,215,0.45);
            }
            .aplayer-pic-play::after{
              border-radius: 100%;
              content: '';
              display: block;
              width: 220px;
              height: 220px;
              -webkit-animation:waves 3s ease-in-out infinite;
              animation:waves 3s ease-in-out infinite;
              -webkit-animation-delay:0s;
              animation-delay:0s;
              position: absolute;
              left: -20px;
              top: -20px;
              z-index: 1;
            }
            .aplayer-pic-play::before{
              content: '';
              display: block;
              width: 260px;
              height: 260px;
              -webkit-animation:waves 3s ease-in-out infinite;
              animation:waves 3s ease-in-out infinite;
              -webkit-animation-delay:1s;
              animation-delay:1s;
              border-radius: 100%;
              position: absolute;
              left: -40px;
              top: -40px;
              z-index: 2;
            }
            .aplayer-info{
              padding: 0;
              margin: 0;
              float: none;
              height: auto;
              border-bottom: none;
              .aplayer-music{
                text-align: center;
                margin-bottom: 0;
                padding-top: 20px;
                padding-bottom: 30px;
                height: auto;
                .aplayer-title{
                  font-size: 24px;
                }
                .aplayer-author{
                  font-size: 22px;
                }
              }
              .aplayer-controller{
                margin-top: 20px;
                .aplayer-bar-wrap{padding: 4px 0 0 0}
                .aplayer-bar{
                  height: 8px;
                  div{height: 8px !important;}
                  .aplayer-thumb{
                    width: 16px;
                    height: 16px;
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
          .aplayer-list{
            position: fixed;
            left: 50%;
            bottom: 0;
            margin-left: -300px;
            width: 100%;
            max-width: 600px;
            max-height: 440px;
            background: #ffffff;
            z-index: 9999;
            overflow: visible;
            box-shadow: 0 6px 6px 0 rgba(0,0,0,.07), 0 1px 5px 0 rgba(0,0,0,.1);
            ol{}
          }
          @media only screen and (max-width: 600px) and (min-width:0px) {
            .aplayer-list {
              left: 0;
              margin-left: 0;
            }
          }
        }
      }
      .home-tomu-handle{
        text-align: center;
        padding-top: 30px;
        ul li{
          display: inline-block;
          margin: 0 15px;
          a{
            display: block;
            font-size: 18px;
            color: #000000;
            i{margin-right: 8px;}
          }
        }
      }
    }
  }
</style>
