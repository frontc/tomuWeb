<template>
<div class="main">
  <div
    class="handle-box animate__animated animate__zoomInUp_center"
    :class="addClass"
  >
    <div class="bg-player-box">
      <div class="logo"><img src="@/assets/image/logo.svg"></div>
      <div class="channel-form">
        <div class="clearfix form">
          <div class="input-channel-id fl">
            <input v-model="channelId" placeholder="请输入频道号" />
          </div>
          <div class="fr">
            <button
              @click="getChannel"
            >进入</button>
          </div>
        </div>
      </div>
      <div class="channel-id-submit">
        <div class="clearfix">
          <div class="fl">
            <a
              href="javascript:;"
            >不知道如何开始？</a>
          </div>
          <div class="fr">
            <a
              href="javascript:;"
              @click="addChannel"
            >您可以创建一个新频道</a>
          </div>
        </div>
      </div>
      <div class="copy-right">Copyright @ 2011-2020 ToMu-<span @mouseover="versionsFlag" v-if="showVersions">{{ apiVersions }}</span><span @mouseout="versionsFlag" v-else>{{ webVersions }}</span> All Rights Reserved.</div>
    </div>
  </div>
</div>
</template>

<script>
import config from '@/config';
import { mapMutations } from 'vuex';

export default {
  name: 'addChannel',
  data () {
    return {
      channelId: '',
      addClass: '',
      showVersions: true,
      webVersions: config.versions,
      apiVersions: '',
      auth: ''
    }
  },
  methods: {
    ...mapMutations([
      'resetSystemInfo',
      'setNewChannel',
      'setSongList',
      'setChannelIdInfo',
      'setFirstEntry',
      'lastChannelInfo',
      'setLastSongs'
    ]),
    /*
    * 初始化系统基本设置
    * */
    initSystemInfo () {
      this.getVersion();
      this.resetSystemInfo();
    },
    /*
    * 查看版权
    * */
    async getVersion() {
      const version = await this.$api.getVersion();
      if (version) {
        this.apiVersions = version
      }
    },
    /*
    * 显示版权
    * */
    versionsFlag () {
      this.showVersions = !this.showVersions
    },
    /*
    * 进入频道
    * */
    async getChannel () {
      if (this.channelId === '') {
        this.$Message.info('请输入频道ID');
      } else {
        if (this.auth === '') {
          // 获取令牌
          const auth = await this.$api.getAuthKey();
          if (auth) {
            this.$store2[config.storageType](config.tokenName, auth);
          }
        }
        // 进入频道
        const info = await this.$api.getChannelInfo(this.channelId);
        if (info) {
          this.setLastSongs(info.playlist);
          this.setChannelIdInfo(this.channelId);
          this.lastChannelInfo({
            channelCreateDate: info.channelCreateDate,
            channelName: info.channelName,
            lastPlayDate: info.lastPlayDate,
            lastPosition: info.lastPosition,
            lastSongID: info.lastSongID
          });
          await this.getUserName();
          this.$ba.trackEvent(`${this.$store2[config.storageType]('userName')}-加入频道`, JSON.stringify({
            info
          }));
          this.goToHome();
        }
      }
    },
    /*
    * 新增频道
    * */
    async addChannel () {
      // 获取令牌
      const auth = await this.$api.getAuthKey();
      if (auth) {
        this.$store2[config.storageType](config.tokenName, auth);
        this.auth = auth;
        // 新建频道
        const add = await this.$api.addChannel();
        if (add) {
          await this.getUserName();
          this.$ba.trackEvent(`${this.$store2[config.storageType]('userName')}-新建频道`, JSON.stringify({
            info: add
          }));
          this.channelId = add;
          this.setChannelIdInfo(add);
          this.setNewChannel();
          this.getChannel();
        }
      }
    },
    /*
    * 进入播放首页
    * */
    goToHome () {
      this.$store2[config.storageType](config.loginChannelName, true);
      this.addClass = 'animate__zoomOut_center';
      setTimeout(() => {
        this.$router.push(`/${config.homePath}`);
      }, 800);
    },
    async getUserName () {
      const name = await this.$api.getThisUserName();
      this.$store2[config.storageType]('userName', name);
    }
  },
  watch: {
    $route (router) {
      // 获取频道ID
      this.channelId = router.params.id || '';
      if (this.channelId !== '') {
        this.setFirstEntry(true);
        this.getChannel()
      }
    }
  },
  created() {
    // 获取频道ID
    this.channelId = this.$route.params.id || '';
    if (this.channelId !== '') {
      this.getChannel()
    }
    // 初始化系统设置
    this.initSystemInfo();
  }
}
</script>

<style scoped lang="less">
.main{
  background-size: cover;
  background: url("~@/assets/image/bg.jpg") center no-repeat;
  .handle-box{
    width: 100%;
    height: 100%;
    position: relative;
    .bg-player-box{
      position: absolute;
      left: 50%;
      top: 10%;
      z-index: 3;
      margin-left: -295px;
      width: 590px;
      .logo{
        text-align: center;
      }
      .description{
        text-align: center;
        padding-bottom: 30px;
      }
      .channel-form{
        padding: 65px 0px 22px 0px;
        .form{
          width: 590px;
          height: 70px;
          .input-channel-id{
            width: 495px;
            height: 67px;
            float: left;
            input{
              background: #8F92FA;
              color: #D5D6FD;
              height: 67px;
              width: 100%;
              outline: none;
              font-size: 20px;
              text-indent: 25px;
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
              border: 2px solid #8D48F3;
            }
            input::-webkit-input-placeholder{
              color: #D5D6FD;
            }
            input::-moz-placeholder{
              color: #D5D6FD;
            }
            input:-moz-placeholder{
              color: #D5D6FD;
            }
            input:-ms-input-placeholder{
              color: #D5D6FD;
            }
          }
          .fr{
            width: 95px;
            button{
              width: 95px;
              height: 67px;
              background: #8D48F3;
              border: none;
              font-size: 20px;
              color: #ffffff;
              border-top-right-radius: 7px;
              border-bottom-right-radius: 7px;
              outline: none;
            }
          }
        }
      }
      .channel-id-submit{
        width: 530px;
        margin: 0 auto;
        padding-top: 20px;
        a{
          color: #ffffff;
        }
      }
      .copy-right{
        text-align: center;
        position: fixed;
        left: 0;
        bottom: 20px;
        width: 100%;
        font-size: 13px;
        color: #B9BAC6;
      }
      @media only screen and (max-width: 700px) and (min-width:0px) {
        width: 90%;
        left: 5%;
        height: auto;
        position: relative;
        margin-left: 0;
        .channel-form{
          padding: 30px 0 15px 0;
          .form{
            width: 100%;
            height: 55px;
            .input-channel-id{
              width: 70%;
              height: 52px;
              input{
                height: 52px;
                font-size: 16px;
              }
            }
            .fr{
              width: 30%;
              height: 52px;
              button{
                font-size: 16px;
                height: 52px;
              }
            }
          }
        }
        .channel-id-submit{
          width: 100%;
          padding: 0;
        }
        .copy-right{
          padding: 8px;
        }
      }
      @media only screen and (max-width: 400px) and (min-width:0px) {
        .ivu-col{
          padding: 5px 0px !important;
          width: 100% !important;
        }
      }
    }
  }
}
</style>
