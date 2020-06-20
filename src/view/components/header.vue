<template>
<div class="header clearfix">
  <div class="logo fl"><img src="@/assets/image/logo.png"/></div>
  <div class="fr SentyPea">
    <ul>
      <li>
        <a href="javascript:;">
          <Icon
            type="md-heart"
            size="16"
          />收藏
        </a>
      </li>
      <li>
        <a href="javascript:;">
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
</template>

<script>
import {
  signOut
} from '@/libs/util'
import { mapMutations } from 'vuex';

export default {
  name: 'pageHeader',
  methods: {
    ...mapMutations([
      'setSignOut'
    ]),
    /*
    * 离开
    * */
    signOut () {
      this.setSignOut(true)
      signOut(this.$router)
    }
  }
}
</script>

<style lang="less">
  .header{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 65px;
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
</style>
