<template>
  <el-dialog
    class="login-dialog"
    :visible.sync="show"
    width="350px"
    @close="onClose"
    :modal-append-to-body="false"
    custom-class="padding:0"
  >
    <el-tabs v-model="activeName" @tab-click="goToClick" style="height:400px">
      <el-tab-pane label="手机登录" name="phone">
        <div class="phone">
          <el-row>
            <el-col>
              <el-input
                type="text"
                placeholder="请输入电话号码"
                v-model="phoneNum"
                maxlength="11"
                @input="phoneChange"
              ></el-input>
            </el-col>
            <el-col :span="13">
              <el-input
                type="text"
                placeholder="请输入验证码"
                v-model="phoneCode"
                maxlength="6"
                @input="codeChange"
              ></el-input>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-button
                type="primary"
                :disabled="code"
                @click="goToGetCode"
              >{{code? countDownNum : ''}}{{btnTag}}</el-button>
            </el-col>
            <el-col>
              <el-button type="primary" style="width:100%" :disabled="login" @click="goToLogin">登录</el-button>
            </el-col>
          </el-row>
          <p>请使用电话号码获取验证码登录</p>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="微信登录" name="wx">
            <div id="weixin-code"></div>
      </el-tab-pane>-->
      <el-tab-pane label="账号注册" name="register">
            <div class="register">
                <el-image :src="codeUrl"></el-image>
                <p>请使用微信【扫一扫】扫码注册</p>
            </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script>
import api from "../service/api";
import { setCookie, getCookie } from "../tools/tools";
export default {
  name: "login",
  data() {
    return {
      show: false,
      activeName: "phone",
      codeUrl: require("../public/images/code.png"),
      phoneNum: "",
      phoneCode: "",
      login: true,
      code: true,
      btnTag: "获取验证码",
      timer: null,
      countDownNum: "",//倒计时
      memberTypeObj:{0:"超级管理员",2:"市级管理员",3:'区级管理员',4:"专家",11:"老师",12:"学生",13:"家长"}
    };
  },
  computed: {},
  methods: {
    showDialog() {
      this.show = true;
    },
    goToClick(data) {
      if (data.name === "wx") {
        this.wxLogin();
      }
    },
    phoneChange() {
      this.code = this.phoneNum.length == 11 ? false : true;
    },
    codeChange() {
      this.login = this.phoneCode.length == 4 ? false : true;
    },

    //获取验证码
    async goToGetCode() {
      let params = {};
      params.url = api.captcha;
      params.account = this.phoneNum;
      let res = await this.axiosGet(params).catch(err => err);
      if (res.msg === "已发送"||res.code==0) {
        this.code = true;
        this.countDownNum = 120;
        this.btnTag = "s重新获取";
        this.countDown();
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },
    //倒计时
    countDown: function() {
      this.timer = setInterval(() => {
        this.countDownNum--;
        if (this.countDownNum <= 0) {
          this.code = false;
          this.btnTag = "获取验证码";
          clearInterval(this.timer);
        }
      }, 1000);
    },

    //登录
    async goToLogin() {
      let params = {};
      params.url = api.account;
      params.account = this.phoneNum;
      params.code = this.phoneCode;
      await this.axiosGet(params)
        .then(res => {
          if (res.code == -1) {
            this.$message({
              message: res.message,
              type: "warning"
            });
          } else {
            this.$store.dispatch("INIT_SHOW", false);
            if(res.token!=undefined){
              setCookie("x-api-key", res.token);
            }
            this.$store.dispatch("INIT_USER", res);
            let userInfo = JSON.stringify(res);
            localStorage.setItem("user", userInfo);

            let members=res.members.map(items=>{
              let memberItem={}
              memberItem.type=items.type
              memberItem.name=this.memberTypeObj[items.type]
              if(items.school_id!=undefined){
                memberItem.school_id=items.school_id
              }
              if(items.school_title!=undefined){
                memberItem.school_title=items.school_title
              }
              if(items.current!=undefined){
                memberItem.current=items.current
                let nowRole = JSON.stringify(memberItem);
                localStorage.setItem("nowRole", nowRole);
                this.$store.dispatch("INIT_NOWROLE", memberItem);
              }
              return memberItem
            })
            let roles = JSON.stringify(members);
            localStorage.setItem("roles", roles);
            this.$store.dispatch("INIT_ROLES", members);

            const loading = this.$loading({
              lock: true,
              text: "登录中。。",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            setTimeout(() => {
              loading.close();
              this.show = false;
              this.phoneNum='';
              this.phoneCode='';
            }, 2000);
          }
        })
        .catch(err => err);
    },
    wxLogin() {
      let redirectUri =
        location.hostname == "127.0.0.1"
          ? "https://upclaass.educloud.tencent.com"
          : location.protocol + "//" + location.host;
      if (
        location.hostname == "cxyy.educloud.tencent.com" ||
        location.hostname == "cxyy.szdj.edu.cn"
      ) {
        location.href = `${redirectUri}/edulogin/?redirectUrl=${redirectUri}&from=activity`;
        return;
      }
      setTimeout(() => {
        new window.WxLogin({
          id: "weixin-code",
          appid: "wx34fc14711090d000",
          scope: "snsapi_login",
          redirect_uri: encodeURIComponent(redirectUri),
          state: new Date().getTime()
        });
      });
    },
    onClose() {
      this.$store.dispatch("INIT_SHOW", false);
    },
    //获取用户信息
    async getUserInfo(params) {
      params.url = api.user;
      let res = await this.axiosGet(params).catch(err => err);
      console.log("userInfo===", res);
      this.$store.dispatch("INIT_USER", res);
      let userInfo = JSON.stringify(res);
      localStorage.setItem("user", userInfo);
      let roles = JSON.stringify(res.roleInfo);
      localStorage.setItem("roles", roles);
      let nowRole = JSON.stringify(res.roleInfo[0]);
      localStorage.setItem("nowRole", nowRole);
      this.$store.dispatch("INIT_ROLES", res.roleInfo);
      this.$store.dispatch("INIT_NOWROLE", res.roleInfo[0]);
    }
  }
};
</script>
<style lang="less">
.login-dialog {
  text-align: center;
  .el-dialog__body {
    padding: 0 30px 30px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn {
    top: 10px;
    right: 10px;
  }
  .phone {
    margin-top: 30px;
    p {
      margin-top: 30px;
    }
  }
  .register {
    display: flex;
    flex-direction: column;
    // justify-content:center;
    text-align: center;
    align-items: center;
    img {
      width: 250px !important;
      height: 250px !important;
      margin-top: 30px;
    }
    p {
    }
  }
}
</style>
