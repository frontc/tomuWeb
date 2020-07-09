<template>
<div class="main">
  <div
    class="handle-box animate__animated animate__zoomInUp_center"
    :class="addClass"
  >
    <waves
      class="waves-block"
      color="rgba(25,190,107,0.75)"
    />
    <div class="bg-player-box">
      <div class="logo"><img src="@/assets/image/logo.png"></div>
      <div class="description SentyPea">ToMu - 让音乐连接你我</div>
      <div class="input-channel-id"><Input v-model="channelId" size="large" class="SentyPea" placeholder="请输入频道号" /></div>
      <div class="channel-id-submit">
        <Row>
          <Col span="12">
            <Button
              type="success"
              long
              size="large"
              icon="md-add"
              @click="addChannel"
            ><span class="SentyPea">新建频道</span></Button>
          </Col>
          <Col span="12">
            <Button
              type="primary"
              long
              size="large"
              icon="ios-musical-notes"
              @click="getChannel"
            ><span class="SentyPea">进入频道</span></Button>
          </Col>
        </Row>
      </div>
      <div class="copy-right SentyPea">Copyright @ 2011-2020 ToMu-{{ versions }} All Rights Reserved.</div>
    </div>
  </div>
</div>
</template>

<script>
import config from '@/config';
import waves from '@/components/waves.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'addChannel',
  data () {
    return {
      channelId: '',
      addClass: '',
      versions: config.versions
    }
  },
  components: {
    waves
  },
  methods: {
    ...mapMutations([
      'resetSystemInfo',
      'setNewChannel',
      'setChannelIdInfo',
      'setFirstEntry'
    ]),
    /*
    * 初始化系统基本设置
    * */
    initSystemInfo () {
      this.resetSystemInfo();
    },
    /*
    * 进入频道
    * */
    async getChannel () {
      if (this.channelId === '') {
        this.$Message.info('请输入频道ID');
      } else {
        // 获取令牌
        const auth = await this.$api.getAuthKey();
        if (auth) {
          this.$store2[config.storageType](config.tokenName, auth);
          // 新建频道
          const info = await this.$api.getChannelInfo(this.channelId);
          if (info) {
            this.setChannelIdInfo(info);
            this.setFirstEntry(true);
            await this.getUserName();
            this.$ba.trackEvent(`${this.$store2[config.storageType]('userName')}-加入频道`, JSON.stringify({
              info
            }));
            this.goToHome();
          }
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
        // 新建频道
        const add = await this.$api.addChannel();
        if (add) {
          await this.getUserName();
          this.$ba.trackEvent(`${this.$store2[config.storageType]('userName')}-新建频道`, JSON.stringify({
            info: add
          }));
          this.setChannelIdInfo(add);
          this.setNewChannel();
          this.goToHome();
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
  align-items:center;
  justify-content:center;
  display:-webkit-flex;
  .handle-box{
    width: 600px;
    height: 600px;
    position: relative;
    .waves-block {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      .waves {background: rgba(25,190,107,0.75) !important;}
    }
    .bg-player-box{
      position: absolute;
      left: -50px;
      top: 100px;
      z-index: 3;
      background: rgba(255,255,255,0.75);
      width: 700px;
      height: 400px;
      border-radius: 30px;
      .logo{
        text-align: center;
        padding: 30px 0 10px 0;
        img{height:80px;}
      }
      .description{
        text-align: center;
        padding-bottom: 30px;
      }
      .input-channel-id{
        padding: 10px 30px 20px 30px;
      }
      .channel-id-submit{
        padding: 0px 100px 30px 100px;
        .ivu-col{
          padding: 0 15px;
        }
      }
      .copy-right{
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 20px;
        width: 100%;
        color: #999999;
      }
      @media only screen and (max-width: 700px) and (min-width:0px) {
        width: 90%;
        left: 0%;
        top: 0;
        height: auto;
        position: relative;
        .channel-id-submit{
          padding: 0 30px 10px 30px;
        }
        .ivu-col{
          padding: 0 5px !important;
        }
        .copy-right{
          position: relative;
          left: 0;
          bottom: 0;
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
    @media only screen and (max-width: 700px) and (min-width:0px) {
      .waves-block{
        display: none;
      }
    }
  }
  @media only screen and (max-width: 700px) and (min-width:0px) {
    .handle-box{
      width: 100%;
      height: 100%;
      align-items:center;
      justify-content:center;
      display:-webkit-flex;
    }
  }
}
</style>
