<template>
  <router-view></router-view>
</template>
<script>
  import tHeader from './layout/tHeader.vue';

  export default {
    name: 'uni-app',
    components: { tHeader }
  };
</script>
<style lang="less">
  .uni-layout {
    width: 100%;
    height: 100%;
    overflow:hidden;
  }
  .uni-layout-content{
    height:85%;
  }
</style>
