<template>
<div>
  <div class="waves-block">
    <div class="waves wave-1" :style="'background:'+color"></div>
    <div class="waves wave-2" :style="'background:'+color"></div>
    <div class="waves wave-3" :style="'background:'+color"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'waves',
  props: {
    color: {
      default() {
        return 'rgba(25,190,107,0.75)';
      },
      type: String
    }
  }
}
</script>

<style lang="less">
  /* 音乐背景动画 */
  .waves {
    position:absolute;
    width:100%;
    height:100%;
    background:#ffffff;
    opacity:0;
    -ms-filter:"alpha(opacity=0)";
    border-radius:50%;
    background-clip:padding-box;
    -webkit-animation:waves 3s ease-in-out infinite;
    animation:waves 3s ease-in-out infinite;
  }
  .wave-1 {
    -webkit-animation-delay:0s;
    animation-delay:0s;
  }
  .wave-2 {
    -webkit-animation-delay:1s;
    animation-delay:1s;
  }
  .wave-3 {
    -webkit-animation-delay:2s;
    animation-delay:2s;
  }
</style>
