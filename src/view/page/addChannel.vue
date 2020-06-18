<template>
<div class="main">
  <div class="handle-box">
    <div class="waves-block">
      <div class="waves wave-1"></div>
      <div class="waves wave-2"></div>
      <div class="waves wave-3"></div>
    </div>
    <div class="bg-player-box">
      <div class="logo"><img src="@/assets/image/logo.png"></div>
      <div class="description">ToMu - 让音乐连接你我</div>
      <div class="input-channel-id"><Input v-model="channelId" size="large" placeholder="请输入频道ID..." /></div>
      <div class="channel-id-submit">
        <Row>
          <Col span="12">
            <Button
              type="success"
              long
              size="large"
              icon="md-add"
              @click="addChannel"
            >新建频道</Button>
          </Col>
          <Col span="12">
            <Button
              type="primary"
              long
              size="large"
              icon="ios-musical-notes"
              @click="getChannel"
            >进入频道</Button>
          </Col>
        </Row>
      </div>
      <div class="copy-right">Copyright @ 2011-2020 MoTu All Rights Reserved.</div>
    </div>
  </div>
</div>
</template>

<script>
import store2 from 'store2'
import config from '@/config'

export default {
  name: 'addChannel',
  data () {
    return {
      channelId: ''
    }
  },
  methods: {
    getChannel () {
      if (this.channelId === '') {
        this.$Message.info('请输入频道ID')
      } else {
        store2.local(config.loginChannelName, true)
        this.$router.push('/')
      }
    },
    addChannel () {
      store2.local(config.loginChannelName, true)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="less">
.main{
  background: url("~@/assets/image/bg.jpg") center no-repeat;
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
      .waves {background: rgba(25,190,107,0.75);}
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
    }
  }
}
</style>
