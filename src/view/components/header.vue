<template>
<div class="header">
  <div class="clearfix">
    <div class="logo fl"><img src="@/assets/image/logo.png"/></div>
    <div class="fr SentyPea">
      <ul>
        <li v-if="!newChannelFlag">
          <a href="javascript:;" @click="seeUser">
            <Icon
              type="ios-man"
              size="16"
            />谁在听
          </a>
        </li>
        <li v-if="!newChannelFlag">
          <a href="javascript:;" @click="addFavorite">
            <Icon
              type="md-heart"
              size="16"
            />收藏
          </a>
        </li>
        <li v-if="!newChannelFlag">
          <a href="javascript:;" @click="invite">
            <Icon
              type="ios-headset"
              size="18"
            />邀请
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="signOut">
            <Icon
              type="ios-alarm"
              size="18"
            />离开
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="invite-box" v-show="inviteFlag">
    <div class="clearfix invite-box-header">
      <div class="fl title SentyPea">邀请伙伴加入频道</div>
      <div class="fr" @click="closeInvite">
        <Icon
          type="md-close-circle"
          size="22"
          color="#2d8cf0"
        />
      </div>
    </div>
    <div class="code" ref="inviteCode"></div>
    <div class="invite-box-footer">
      <Button
        v-clipboard:copy="url"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        type="warning"
        long>复制频道链接</Button>
    </div>
  </div>
  <div class="userList" v-if="userListBox">
    <Modal v-model="userListFlag" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span class="SentyPea">谁在听</span>
      </p>
      <div style="text-align:center">
        <div class="clearfix user SentyPea">
          <div class="fl">我</div>
          <div class="fl">
            <span style="color: #0078D7">他（她）</span>
            <Icon
              type="md-close"
              @click="removeUser"
            />
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</div>
</template>

<script>
import {
  signOut,
  addFavorite
} from '@/libs/util';
import { mapState, mapMutations } from 'vuex';
import QRCode from 'qrcodejs2';
import config from '@/config';

export default {
  name: 'pageHeader',
  data () {
    return {
      inviteFlag: false,
      url: '',
      closeFlag: false,
      userListBox: false,
      userListFlag: false,
      otherUser: ''
    }
  },
  props: {
    newChannelFlag: {
      default() {
        return true;
      },
      type: Boolean
    }
  },
  computed: {
    ...mapState([
      'channelIdInfo'
    ])
  },
  methods: {
    ...mapMutations([
      'setSignOut'
    ]),
    /*
    * 离开
    * */
    async signOut () {
      const out = await this.$api.signOutChannel(this.channelIdInfo.channelID);
      if (out) {
        this.$Message.info('频道退出成功');
        this.setSignOut(true);
        this.$ba.trackEvent(`${this.$store2[config.storageType]('userName')}-退出频道`, JSON.stringify({
          info: '退出频道'
        }));
        signOut(this.$router);
      }
    },
    /*
    * 加入收藏
    * */
    addFavorite () {
      addFavorite();
    },
    /*
    * 邀请
    * */
    async invite () {
      const user = await this.$api.getAudienceList(this.channelIdInfo.channelID);
      if (user && user.length == 2) {
        this.$Message.warning('抱歉，当前频道人员已满。')
      } else {
        this.inviteFlag = !this.inviteFlag;
        this.$refs.inviteCode.innerHTML = '';
        /* eslint-disable no-new */
        new QRCode(this.$refs.inviteCode, {
          text: this.url,
          width: 220,
          height: 220
        });
        this.$ba.trackEvent(`${this.$store2[config.storageType]('userName')}-执行邀请操作`, JSON.stringify({
          info: this.url
        }));
      }
    },
    /*
    * 关闭邀请
    * */
    closeInvite () {
      this.inviteFlag = !this.inviteFlag;
    },
    /*
    * 查看在线人员
    * */
    async seeUser () {
      const userList = await this.$api.getAudienceList(this.channelIdInfo.channelID);
      const userInfo = await this.$api.getThisUserName(this.channelIdInfo.channelID);
      if (userList.length === 1 && userList[0] === userInfo) {
        this.$Message.info('只有我在');
      } else {
        Object.keys(userList).forEach(i => {
          if (userList[i] !== userInfo) {
            this.otherUser = userList[i]
          }
        });
        this.userListBox = true;
        this.userListFlag = true;
      }
    },
    removeUser () {
      this.$Modal.info({
        title: '确定移除吗？',
        onOk: () => {
          this.$api.deleteUser(this.channelIdInfo.channelID, this.otherUser).then((d) => {
            if (d) {
              this.userListBox = false;
              this.userListFlag = false;
              this.$Message.info('移除成功')
            }
          })
        }
      })
    },
    /*
    * 复制
    * */
    onCopy () {
      this.$Message.success('分享链接已复制到剪切板！');
      this.$ba.trackEvent(`${this.$store2[config.storageType]('userName')}-执行邀请操作`, JSON.stringify({
        info: this.url
      }));
    },
    onError () {
      this.$Message.error('抱歉，复制失败！');
    }
  },
  mounted() {
    this.url = `${config.url[process.env.NODE_ENV]}${config.addChannelPath}/${this.channelIdInfo.channelID}`;
  }
}
</script>

<style lang="less">
  .header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 65px;
    z-index: 10;
    >div.clearfix{
      height: 100%;
      .logo{
        padding: 10px 0 0 50px;
        img {height: 45px;}
      }
      .fr {
        height: 100%;
        ul {
          height: 100%;
          li{
            margin-right: 20px;
            float: left;
            align-items:center;
            justify-content:center;
            display:-webkit-flex;
            height: 100%;
            a{
              display: block;
              color: #333333;
              i{margin-right: 5px}
            }
          }
        }
      }
      @media only screen and (max-width: 700px) and (min-width:0px) {
        .logo{
          padding: 10px 0 0 10px;
        }
      }
    }
    .invite-box{
      width: 240px;
      background: #ffffff;
      padding: 10px;
      position: fixed;
      z-index: 9999;
      left: 50%;
      top: 10%;
      border-radius: 15px;
      margin-left: -120px;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.07), 0 1px 5px 0 rgba(0,0,0,.1);
      .invite-box-header{
        padding-bottom: 10px;
        .title{
          font-size: 18px;
          color: #2d8cf0;
        }
        .fr{
          padding-top: 3px;
        }
      }
      .code{
        img{
          width: 100%;
        }
      }
      .invite-box-footer{
        padding-top: 10px;
      }
    }
  }
</style>
