<template>
<div class="home-main">
  <div class="home-body">
    <div class="newChannel" v-if="newChannelFlag">
      <div class="SentyPea title">您还未添加歌曲请先添加歌曲</div>
      <div class="newChannel-handle">
        <div class="clearfix music-platform">
          <div class="body">
            <div class="nav-list clearfix">
              <div>
                <ul>
                  <li
                    v-for="(item, index) in musicPlatform"
                    :key="index"
                    :class="{on: index === ins}"
                    @click='tabPlatform(index, item.type)'
                  >
                    <a href="javascript:;"><img :src='item.logo'/></a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="song-list"
              v-for="(item, index) in musicPlatform"
              :key="index"
            >
              <div class="song-list-body" v-if="index === ins">
                <div class="song-list-header">
                  <div class="tab">
                    <RadioGroup
                      v-model="item.addSongTypeName"
                      @on-change="tabSongType(index)"
                    >
                      <Radio label="歌单"></Radio>
                      <Radio label="单歌曲"></Radio>
                    </RadioGroup>
                  </div>
                  <div class="form">
                    <div class="clearfix form-handle" v-if="item.addSongType">
                      <div class="fl">
                        <Input
                          v-model="item.listValue"
                        >
                          <span slot="prepend">{{ item.listUrl }}</span>
                          <span slot="append" v-if="item.listUrlType !== ''">{{ item.listUrlType }}</span>
                        </Input>
                      </div>
                      <div class="fr clearfix">
                        <Button @click="initSongList(item, 'playlist')">添加歌单</Button>
                        <a href="https://music.163.com/#/playlist?id=4912458725" target="_blank">查看示例链接</a>
                      </div>
                    </div>
                    <div class="clearfix form-handle" v-else>
                      <div v-if="item.songUrl !== ''">
                        <div class="fl">
                          <Input
                            v-model="item.songValue"
                          >
                            <span slot="prepend">{{ item.songUrl }}</span>
                            <span slot="append" v-if="item.songUrlType !== ''">{{ item.songUrlType }}</span>
                          </Input>
                        </div>
                        <div class="fr clearfix">
                          <Button @click="initSongList(item, 'song')">添加歌曲</Button>
                          <a href="https://music.163.com/#/song?id=1377909454" target="_blank">查看示例链接</a>
                        </div>
                      </div>
                      <div v-else>该平台暂不支持此方式添加</div>
                    </div>
                  </div>
                </div>
                <div class="song-list-footer">
                  <ul>
                    <li
                      v-for="(item, index) in addSongListData"
                      :key="index"
                    >
                      <Checkbox
                        v-model="item.flag"
                        @on-change="selectSong(item, index)"
                      >{{ item.title }}</Checkbox>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="generate-playlist" v-if="addSongListData.length > 0">
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
    <div v-else class="home-player">
      <div class="clearfix home-player-info">
        <div class="fl title clearfix">
          <Icon
            type="ios-radio"
            size="30"
          /><span class="SentyPea">当前频道: channel-520</span>
        </div>
        <div class="fr SentyPea">
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
      <div class="tomu-aplayer">
        <div class="tomu-aplayer-handle clearfix">
          <div class="fr clearfix SentyPea">
            <ul>
              <li :class="lrcFlag ? 'on' : ''">
                <a href="javascript:;"  @click="lrcShowFlag">
                  <i class="iconfont icon-gecishezhi_"></i>歌词
                </a>
              </li>
              <!-- <li :class="aplayListFlag ? 'on' : ''">
                <a href="javascript:;"  @click="aplayListShowFlag">
                  <i class="iconfont icon-jiarugedan"></i>已选歌单
                </a>
              </li> -->
            </ul>
          </div>
        </div>
        <tomu-aplayer
          @play="play"
          @pause="pause"
          @loadstart="setPlayImage"
          :destroy="homeSignOut"
          :playList="songList"
          ref="aplayer"
        ></tomu-aplayer>
      </div>
      <div class="home-tomu-handle">
        <ul>
          <li>
            <a href="javascript:;"  @click="aplayListShowFlag">
              <Icon type="md-list" /><span class="SentyPea">歌单</span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <Icon type="md-musical-notes" /><span class="SentyPea">随便听听</span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <Icon type="md-search" /><span class="SentyPea">搜索</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import tomuAplayer from '@/components/tomuAplayer.vue'
import { mapState, mapMutations } from 'vuex';
import config from '@/config'
import {
  addSongData,
  saveSongList
} from '@/libs/util'

export default {
  name: 'pageHome',
  data () {
    return {
      aplayListFlag: false,
      lrcFlag: true,
      newChannelFlag: true,
      addClass: '',
      musicPlatform: [],
      ins: 0,
      addSongList: []
    }
  },
  components: {
    tomuAplayer
  },
  computed: {
    ...mapState([
      'homeSignOut',
      'newChannel',
      'songList'
    ]),
    musicPlatformData: {
      get () {
        return this.musicPlatform
      },
      set (data) {
        this.musicPlatform = data
      }
    },
    addSongListData: {
      get () {
        return this.addSongList
      },
      set (data) {
        this.addSongList = data
      }
    }
  },
  methods: {
    ...mapMutations([
      'setSongList'
    ]),
    /*
    * 初始化
    * */
    initHome () {
      if (this.songList.length === 0 && this.newChannel) {
        this.newChannelFlag = true
        // 赋值切换类型
        this.musicPlatformData = config.musicPlatform
      } else {
        this.newChannelFlag = false
      }
    },
    /*
    * 切换平台
    * */
    tabPlatform (num, type) {
      this.ins = num
      console.log(type)
    },
    /*
    * 切换歌曲添加方式
    * */
    tabSongType (index) {
      this.musicPlatformData[index].addSongType = !this.musicPlatformData[index].addSongType
    },
    /*
    * 初始化列表
    * */
    async initSongList (options, type) {
      const { addSongListData } = this
      let id = (type === 'song') ? options.songValue : options.listValue
      const songListData = await this.$api.getSongList({
        server: options.type,
        type,
        id
      })
      const data = addSongData(addSongListData, songListData)
      this.addSongListData = data
    },
    /*
    * 选择歌曲
    * */
    selectSong (data, index) {
      this.addSongListData[index].flag = data.flag
    },
    /*
    * 生成已选择的歌曲列表
    * */
    generatePlaylist () {
      let songList = this.addSongListData
      if (songList.length > 0) {
        this.copyRightApi(saveSongList(songList))
      } else {
        this.$Message.info('请先选择歌曲')
      }
    },
    /*
    * 验证歌曲版权
    * */
    async copyRightApi (list) {
      // await Promise.all(Object.values(list).map((data) => this.$api.copyRightApi(data.url)))
      this.newChannelFlag = false
      this.setSongList(list)
    },
    /*
    * 自定义播放动画所需元素
    * */
    async setPlayImage () {
      const handle = document.getElementsByClassName('aplayer-pic')[0];
      let {
        style: {
          backgroundImage
        }
      } = handle
      backgroundImage = backgroundImage.substring(5, backgroundImage.length - 2)
      let picResponseURL = await this.$api.getPicUrl(backgroundImage)
      let picUrl = picResponseURL.responseURL.substring(0, picResponseURL.responseURL.length - 5)
      picUrl = `background-image: url('${picUrl}190y190');`
      // 添加高清封面
      const newBox = document.createElement('div')
      const handleStyle = picUrl
      if (!document.getElementsByClassName('aplayImage')[0]) {
        newBox.className = 'aplayImage'
        handle.appendChild(newBox);
      }
      // 添加CD
      const cdBox = document.createElement('div')
      if (!document.getElementsByClassName('cdImage')[0]) {
        cdBox.className = 'cdImage'
        handle.appendChild(cdBox);
      }
      const aplayImageBox = document.getElementsByClassName('aplayImage')[0];
      aplayImageBox.style.cssText = handleStyle
    },
    /*
    * 播放
    * */
    play () {
      const handle = document.getElementsByClassName('aplayer-pic')[0];
      handle.setAttribute('class', 'aplayer-pic aplayer-pic-play')
      // 延迟一秒播放动画
      setTimeout(() => {
        handle.classList.add('aplayer-pic-play-color');
      }, 1000)
    },
    /*
    * 暂停
    * */
    pause () {
      const handle = document.getElementsByClassName('aplayer-pic')[0];
      handle.setAttribute('class', 'aplayer-pic')
    },
    /*
    * 显示关闭歌词
    * */
    lrcShowFlag () {
      this.lrcFlag = !this.lrcFlag
      this.$refs.aplayer.lrcFlag()
    },
    /*
    * 显示关闭歌单
    * */
    aplayListShowFlag () {
      this.aplayListFlag = !this.aplayListFlag
      this.$refs.aplayer.aplayListFlag()
    }
  },
  mounted() {
    // 初始化
    this.initHome()

    /* const source = new EventSource('https://tomu.orous.cn/api/v1/channel/520/status');

    source.addEventListener('open', () => {
      console.log('Connected');
    }, false);
    source.addEventListener('status', (e) => {
      console.log(e.data);
    }, false);

    source.addEventListener('pause', (e) => {
      console.log(e);
      source.close();
    }, false); */
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
        .title{
          font-size: 20px;
        }
        .newChannel-handle{
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.2);
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
                        width: 560px;
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
                        }
                      }
                    }
                  }
                }
                .song-list-footer{
                  max-height: 300px;
                  overflow: auto;
                  ul li{
                    padding: 6px 6px 6px 11px;
                    background: #ffffff;
                    float: left;
                    border: 1px #d8d8d8 dashed;
                    margin: 5px 5px 5px 0;
                    .ivu-checkbox-inner{margin-right: 5px}
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
      .home-player{
        padding: 30px 0;
        width: 800px;
        max-width: 800px;
        margin: 0 auto;
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
          .fr{padding-top: 4px;}
        }
        .tomu-aplayer-handle{
          padding: 10px 0px 0 0px;
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
                background: rgba(255,255,255,0.15);
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
