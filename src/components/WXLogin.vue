<template>
  <el-dialog
    class="login-dialog"
    :visible.sync="show"
    width="400px"
    @close="onClose"
    :modal-append-to-body="false">
    <div id="weixin-code"></div>
  </el-dialog>
</template>
<script>
  export default {
    name: 'wx-login',
    data() {
      return {
        show: false
      };
    },
    methods: {
      login() {
        // this.show = true;
        let redirectUri = location.hostname == '127.0.0.1' ? 'https://upclaass.educloud.tencent.com'
          : (location.protocol + '//' + location.host);
        if (location.hostname == 'cxyy.educloud.tencent.com' || location.hostname == 'cxyy.szdj.edu.cn') {
          location.href = `${redirectUri}/edulogin/?redirectUrl=${redirectUri}&from=activity`;
          return;
        }
        setTimeout(() => {
          new window.WxLogin({
            id: 'weixin-code',
            appid: 'wx34fc14711090d000',
            scope: 'snsapi_login',
            redirect_uri: encodeURIComponent(redirectUri),
            state: new Date().getTime()
          });
        });
      },
      onClose() {
        this.$store.dispatch('INIT_SHOW', false);
      }
    }
  };
</script>
<style lang="less">
  .login-dialog {
    text-align: center;
  }
</style>
