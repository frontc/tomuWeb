<template>
<div class="footer SentyPea">
  Copyright @ 2011-2020 MoTu All Rights Reserved.
</div>
</template>

<script>
export default {
  name: 'pageFooter'
}
</script>

<style lang="less">
  .footer{
    width: 100%;
    text-align: center;
    color: #999999;
    border-top: 1px solid #d8d8d8;
    height: 40px;
    line-height: 40px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
  }
  @media only screen and (max-width: 700px) and (min-width:0px) {
    .footer{
      font-size: 12px;
    }
  }
</style>
