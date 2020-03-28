<template>
  <div class="uni-app uni-layout">
    <t-header></t-header>
    <div class="uni-layout-content">
      <div class="pages">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>

  </div>
</template>
<script>
  import tHeader from '../layout/tHeader.vue';
  import Login from '../components/Login'
  export default {
    name: 'uni-content',
    components: { tHeader, Login },
    watch: {
      
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
