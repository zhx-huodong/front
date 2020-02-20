<template>
  <div class="uni-header">
    <a class="uni-title" href="/">
      <img class="logo" src="../public/images/logo.png">
      <span>中小学信息化活动平台</span>
    </a>
    <div class="header-menu">
      <div v-for="t in tabs" :key="t.key" @click="switchPage(t.key)" v-if="!t.hide"
           :class="'menu-item ' + (activeTab === t.key ? 'active' : '')">{{t.name}}
      </div>
    </div>
    <div class="header-user">
      <div class="message" @click="goToMessage">
        <img src="../public/images/message.svg" v-if="messageList.length == 0">
        <img src="../public/images/message2.svg" v-else>
      </div>
      <div class="divider">|</div>
      <template v-if="user">
        <div class="name">{{user.Name || '未知用户'}}</div>
        <div class="divider">|</div>
        <div class="logout" @click="logout">退出</div>
      </template>
      <template v-else>
        <el-dropdown @command="loginClick">
          <span class="name">未登录</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="wx" v-if="!isPro">微信扫码登录</el-dropdown-item>
            <el-dropdown-item command="phone">短信验证码登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </div>
    <w-x-login ref="wxLogin"></w-x-login>
    <el-dialog
      class="login-dialog"
      :visible.sync="showMpCode"
      width="400px"
      :modal-append-to-body="false">
      <img src="../public/images/test-code.png" v-if="isTest">
      <img src="../public/images/code.png" v-else>
      <div class="info">
        请前往小程序端完成身份认证
        <br/>认证完成后，重新登录
      </div>
    </el-dialog>
    <el-dialog
      class="choose-dialog"
      title="选择身份"
      width="400px"
      :visible.sync="showChooseRole"
      :show-close="false"
      :close-on-click-modal="false">
      <div class="choose-role">
        <el-button type="primary" size="medium" v-for="(role, index) in roles" :key="index" @click="chooseRole(role.Role)">
          {{ role.RoleName }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios';
  import UuniV4 from 'uuid/v4';
  import { setCookie, getCookie } from '../tools/tools';
  import WXLogin from '../components/WXLogin';

  export default {
    name: 'uni-header',
    components: { WXLogin },
    data() {
      return {
        tabs: [],
        normalTabs: [
          { key: 'home', name: '首页', hide: false },
          // { key: 'activityCenter', name: '活动中心', hide: false },
          { key: 'myActivity', name: '活动发布与管理', hide: false },
          { key: 'excellence', name: '优秀作品展', hide: false },
          { key: 'expertReview', name: '专家评审', hide: true },
          { key: 'userCenter', name: '个人中心', hide: false },
          { key:'activeManager',name:'活动管理',hide:false}
        ],
        adminTabs: [
          { key: 'auditActivity', name: '审核中心', hide: false },
          { key: 'expertReview', name: '专家评审', hide: true },
          { key: 'expertStore', name: '专家库', hide: true }
        ],
        activeTab: 'home',
        wxCode: '', // 微信登录后的code
        isAdmin: false, // 平台管理员
        isJudge: false, // 专家
        messageList: [],
        showMpCode: false, // 展示小程序码
        isTest: location.hostname == '127.0.0.1' ||
          location.hostname == 'api.huodong.eduinspector.com',
        isPro: location.hostname == 'cxyy.educloud.tencent.com' || location.hostname == 'cxyy.szdj.edu.cn',
        showMul: false, // 多重身份选择弹框
        roles: [
          { Role: 'TEACHER', RoleName: '教师' },
          { Role: 'PARENT', RoleName: '家长' }
        ], // 角色列表
        showChooseRole: false,
        loginCb: ''
      };
    },
    computed: {
      user() {
        return this.$store.state.account.user;
      }
    },
    async mounted() {
      let token = this.$route.query.token || getCookie('Authorization');
      this.wxCode = this.$route.query.code || '';
      if (this.wxCode) { // 微信扫码登录
        this.idaasLogin(loginSuccess => {
          this.tabs = this.normalTabs;
          if (loginSuccess) {
            this.$store.dispatch('INIT_USER');
            this.getMessage();
          } else {
            this.$router.push('/home');
          }
        });
      } else if (token) { // 登录页短信验证码登录会跳
        setCookie('Authorization', token);
        await this.$store.dispatch('INIT_USER');
        if (!this.user) { // token不正确
          this.tabs = this.normalTabs;
          if (this.$route.path == '/') this.$router.push('/home');
        } else {
          this.activeTab = this.$route.path.split('/')[1];
          this.getMessage();
        }
      } else {
        this.tabs = this.normalTabs;
        if (this.$route.path == '/') this.$router.push('/home');
      }
    },
    watch: {
      $route(val) {
        this.activeTab = val.path.split('/')[1];
      },
      user() {
        this.checkRole();
      }
    },
    methods: {
      switchPage(key) {
        console.log(key)
        if (this.activeTab === key && this.$route.path == ('/' + this.activeTab)) return;
        this.activeTab = key;
        this.$router.push('/' + key);
      },
      async checkRole() {
        this.isAdmin = this.user.IsPlatformAdmin;
        this.isJudge = this.user.IsJudge;
        if (this.isAdmin) this.tabs = this.adminTabs;
        else this.tabs = this.normalTabs;
        if (this.isJudge) {
          let tab = this.getTabByKey('expertReview', this.tabs);
          tab.hide = false;
        }
      },
      getTabByKey(key, tabs) {
        for (let item of tabs) {
          if (item.key == key) return item;
        }
        return {};
      },
      goToMessage() {
        if (this.$route.path.indexOf('msgcenter') > -1) return;
        this.$router.push('/msgcenter');
      },
      loginClick(type) {
        if (type == 'wx') {
          this.$refs.wxLogin.login();
        } else {
          if (location.hostname === '127.0.0.1') {
            let redirectUrl = location.protocol + '//' + location.host;
            location.href = `https://api.huodong.eduinspector.com/edulogin?redirectUrl=${redirectUrl}&from=activity`;
          } else {
            let redirectUrl = location.protocol + '//' + location.host;
            location.href = `${redirectUrl}/edulogin/?redirectUrl=${redirectUrl}&from=activity`;
          }
        }
      },
      logout() {
        setCookie('Authorization', '');
        localStorage.removeItem('user');
        location.href = '/';
      },
      idaasLogin(cb) {
        this.loginCb = cb;
        return new Promise(async (resolve, reject) => {
          let codeRes = await this.idassCode();
          if (!codeRes) return cb(false);

          let loginRes = await this.axiosPost({
            url: '/idaasproxy/v1/account/oauth2/login'
          }).catch(err => err);
          if (loginRes.code == 12008) { // 未注册
            this.showMpCode = true;
            return cb(false);
          } else if (loginRes.code != 0) {
            this.$message.error(loginRes.message);
            return cb(false);
          }

          this.stateAuthLogin();
        });
      },
      async stateAuthLogin(role) {
        return new Promise(async (resolve, reject) => {
          let stateInfo = await this.axiosGet({
            url: '/v1/users/state',
            loginType: 'IDAAS',
            callback: location.protocol + '//' + location.host
          }).catch(err => err);
          if (stateInfo.ErrorCode != 'OK') {
            this.$message.error(stateInfo.ErrorMsg);
            return resolve(false);
          }

          let url = stateInfo.Data.redirectUrl;
          if (location.hostname == 'api.huodong.eduinspector.com') { // 测试环境
            url = url.replace('https://login.educloud.tencent.com', 'https://api.huodong.eduinspector.com/idaasproxy');
          }

          let authRes = await this.axiosGet({
            url: url
          }, false, { 'x-client': 'true' });
          if (!authRes || !authRes.code) {
            this.$message.error('获取code失败');
            return resolve(false);
          }

          let params = {
            url: '/v1/users/login',
            code: authRes.code,
            loginType: 'IDAAS',
            state: authRes.state
          };
          if (role) params.LoginRoles = [role];
          let userLoginRes = await this.axiosPost(params).catch(err => err);
          if (userLoginRes.ErrorCode == 'OK') {
            if (userLoginRes.Data.status == 'LOGIN_MULTIROLE') { // 多重身份，进行身份选择
              this.getRoles(userLoginRes.Data.token);
            } else {
              setCookie('Authorization', userLoginRes.Data.token);
              this.loginCb(true);
            }
          } else if (userLoginRes.ErrorCode == 'User.UserNotExists') { // 用户不存在（注册）
            this.showMpCode = true;
            return this.loginCb(false);
          } else if (userLoginRes.ErrorCode == 'User.NoRole') { // 用户未认证身份
            this.showMpCode = true;
            return this.loginCb(false);
          } else if (userLoginRes.ErrorCode != 'OK') {
            this.$message.error(userLoginRes.ErrorMsg);
            return this.loginCb(false);
          }
        });
      },
      async idassCode() {
        let stateRes = await this.getIdaasId();
        let idaasId = stateRes.Data.idaasId;
        let randomToken = UuniV4();
        setCookie('XSRF-TOKEN', randomToken); // 设置cookie，发请求带上
        return new Promise((resolve, reject) => {
          axios.post('/idaasproxy/v1/account/oauth2/code', {
            code: this.wxCode,
            registrationId: idaasId
          }, {
            headers: {
              CompanyID: 1,
              'X-XSRF-TOKEN': randomToken
            }
          }).then(res => {
            if (res.data.code != 0) {
              this.$message.error(res.data.message);
              resolve(false);
            } else {
              resolve(true);
            }
          }).catch(() => {
            resolve(false);
          });
        });
      },
      getIdaasId() {
        let callBackUrl = location.hostname == '127.0.0.1' ? 'api.huodong.eduinspector.com' : location.hostname;
        return new Promise((resolve, reject) => {
          axios.get('/v1/users/state', {
            params: {
              callback: callBackUrl,
              loginType: 'IDAAS'
            }
          }).then(res => {
            resolve(res.data);
          }).catch(err => {
            resolve(err);
          });
        });
      },
      getRoles(token) { // 获取多重身份
        axios.get('/v1/users/getroles', {
          headers: {
            Authorization: token
          }
        }).then(res => {
          let roles = res.data.Data.UserRole || [];
          this.showChooseRole = true;
          this.roles = roles;
        });
      },
      chooseRole(key) {
        this.stateAuthLogin(key);
        this.showChooseRole = false;
      },
      async getMessage() {
        let res = await this.axiosGet({
          url: '/v1/message/GetUserMessageList',
          AppId: 1567654633 // 此系统固定用这个appid
        }, false).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        this.messageList = res.Data.MessageList || [];
      }
    }
  };
</script>
<style lang="less">
  .uni-header {
    background-color: #2568ED;
    box-shadow: rgba(0, 21, 41, 0.08) 0 1px 4px;
    height: 60px;
    line-height: 60px;
    padding: 0 20px 0 0;
    display: flex;
    .uni-title {
      float: left;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #FFFFFF;
      margin-right: 15%;
      .logo {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 0 10px 0 20px
      }
    }
    .header-menu {
      flex: 1;
      color: #FFFFFF;
      font-size: 16px;
      .menu-item {
        opacity: 0.5;
        display: inline-block;
        margin-right: 48px;
      }
      .active {
        opacity: 1;
      }
      .menu-item:hover {
        cursor: pointer;
      }
    }
    .header-user {
      font-size: 14px;
      display: flex;
      color: #FFFFFF;
      .divider {
        margin: 0 18px;
      }
      .message, .name, .logout {
        color: #FFFFFF;
        display: flex;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .login-dialog {
      img {
        width: 300px;
        height: 300px;
      }
      .info {
        margin-top: -20px;
        font-size: 16px;
        line-height: 25px;
      }
    }
    .choose-dialog {
      .choose-role {
        text-align: center;
        margin-bottom: -20px;
        margin-top: -40px;
        .el-button {
          margin: 0 20px;
        }
      }
    }
  }
</style>
