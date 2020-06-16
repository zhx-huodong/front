<template>
  <div class="router-comtainer">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div style="height:50px;"></div>
    <div class="footer">
      <p>粤ICP备12020978号-1&nbsp;&nbsp;&nbsp;&nbsp;深圳市教育信息技术中心（教育装备中心）版权所有&nbsp;&nbsp;&nbsp;&nbsp;技术支持QQ群：927971616</p>
    </div>
  </div>
</template>
<script>
import tHeader from "./layout/tHeader.vue";

export default {
  name: "uni-app",
  components: { tHeader },
};
</script>
<style lang="less">
.uni-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.uni-layout-content {
  height: 85%;
}
.el-icon-arrow-down {
  justify-content: center !important;
}
.footer{
  z-index: 1000;
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 50px;
  background-color: rgba(49, 48, 48);
  color: #ffffff;
  text-align: center;
  p{
    line-height: 50px;
  }
}
</style>
