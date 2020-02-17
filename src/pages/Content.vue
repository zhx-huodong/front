<template>
  <div class="uni-app uni-layout">
    <t-header></t-header>
    <div class="uni-layout-content">
      <div class="pages">
        <router-view></router-view>
      </div>
    </div>
    <w-x-login ref="wxLogin"></w-x-login>
  </div>
</template>
<script>
  import tHeader from '../layout/tHeader.vue';
  import WXLogin from '../components/WXLogin';
  export default {
    name: 'uni-content',
    components: { tHeader, WXLogin },
    watch: {
      '$store.state.login.show'(val) {
        if (val) this.$refs.wxLogin.login();
      }
    }
  };
</script>
<style lang="sass">
  .uni-layout-content
    overflow-y: auto
    overflow-x: auto
    display: flex
    width: 100%
    flex: auto
    height: auto
    padding-bottom: 20px
    .pages
      flex-direction: column
      display: flex
      width: 100%
      height: 100%
</style>
