<template>
  <div class="header-container">
    <div class="uni-header">
      <a class="uni-title" href="/">
        <img class="logo" src="../public/images/logo.png" />
        <span>深圳市中小学科技创新活动平台</span>
      </a>
      <div class="header-menu">
        <div
          v-for="item in tabs"
          :key="item.key"
          @click="switchPage(item.key)"
          v-if="!item.hide"
          :class="'menu-item ' + (activeTab === item.key ? 'active' : '')"
        >{{item.name}}<p v-if="item.name=='个人中心'&&$store.state.account.remindCount>0" class="el-icon-message-solid"></p></div>
      </div>
      <div class="header-user">
        <template v-if="$store.state.account.roles.length>0">
          <span class="name" @click="roleClick"></span>
          <el-dropdown @command="roleClick">
            <span class="name">
              {{$store.state.account.nowRole.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="item.type"
                v-for="(item,index) in $store.state.account.roles"
                :key="index"
              >{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <div class="divider">|</div>
        <template v-if="user">
          <div class="name">{{user.name || '未知用户'}}</div>
          <div class="divider">|</div>
          <div class="logout" @click="logout">退出</div>
        </template>
        <template v-else>
          <span class="name" @click="loginClick">未登录</span>
        </template>
      </div>
      <login ref="allLogin"></login>
    </div>
    <div class="my-bread" v-if="levelList.length>1">
      <div class="my-bread-main">
        <my-bread-crumb :levelList="levelList" ></my-bread-crumb>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import UuniV4 from "uuid/v4";
import { setCookie, getCookie } from "../tools/tools";
import Login from "../components/Login";
import MyBreadCrumb from "../components/MyBreadCrumb";
import api from "../service/api";
export default {
  name: "uni-header",
  components: { MyBreadCrumb, Login },
  data() {
    return {
      tabs: [],
      normalTabs: [
        { key: "home", name: "首页", hide: false },
        { key: "activeManager", name: "活动管理", hide: true },
        { key: "workReview", name: "专家评审", hide: true },
        { key: "userCenter", name: "个人中心", hide: true }
      ],
      adminTabs: [
        { key: "admin", name: "用户管理", hide: false },
        { key: "roleManage", name: "角色管理", hide: false },
        { key: "expertManage", name: "专家管理", hide: false },
        // { key: 'expertAssign', name: '专家分配', hide: false },
        // { key: 'classifyManage', name: '分类管理', hide: false },
        { key: "prizeManagement", name: "奖项管理", hide: false },
        { key: "activeManager", name: "活动管理", hide: false }
      ],
      activeTab: "home",
      levelList: [], //面包屑
      memberTypeObj: {
        0: "超级管理员",
        2: "市级管理员",
        3: "区级管理员",
        4: "专家",
        11: "老师",
        12: "学生",
        13: "家长"
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.account.user;
    },
    getRoles() {
      return this.$store.state.account.roles;
    },
    getNowRole() {
      return this.$store.state.account.nowRole;
    },
    show() {
      return this.$store.state.login.show;
    },
    remindCount(){
      return this.$store.state.account.remindCount;
    }
  },
  created() {
    console.log("getCookie===",getCookie("x-api-key"))
  },
  mounted() {
    if (getCookie("x-api-key")!=undefined&&getCookie("x-api-key")) {
      this.$store.dispatch(
        "INIT_USER",
        JSON.parse(localStorage.getItem("user"))
      );
      this.$store.dispatch(
        "INIT_ROLES",
        JSON.parse(localStorage.getItem("roles"))
      );
      this.$store.dispatch(
        "INIT_NOWROLE",
        JSON.parse(localStorage.getItem("nowRole"))
      );
      let val=1
      this.checkRole(val);
      this.getRemindCount()
    } else {
      this.tabs = this.normalTabs;
      this.$router.push("/home");
      this.activeTab = "home";
      this.levelList = [
        { path: "/home", name: "首页", meta: { title: "首页" } }
      ];
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
      localStorage.removeItem("nowRole");
    }
  },
  watch: {
    $route(val) {
      this.activeTab = val.path.split("/")[1];
      this.getBreadcrumb(val);
    },
    getNowRole(newval, oldval) {
      if (newval.type !== oldval.type) {
        if (getCookie("x-api-key")!=undefined&&getCookie("x-api-key")!='') {
          this.$store.dispatch(
            "INIT_USER",
            JSON.parse(localStorage.getItem("user"))
          );
          this.$store.dispatch(
            "INIT_ROLES",
            JSON.parse(localStorage.getItem("roles"))
          );
          this.$store.dispatch(
            "INIT_NOWROLE",
            JSON.parse(localStorage.getItem("nowRole"))
          );
          let val=0
          if(oldval.type==undefined){
            val=0
          }else{
            val=1
          }
          this.checkRole(val);
          this.getRemindCount()
        } else {
          this.tabs = this.normalTabs;
          this.$router.push("/home");
          this.activeTab = "home";
          this.levelList = [
            { path: "/home", name: "首页", meta: { title: "首页" } }
          ];
        }
      }
    },
    show(val) {
      if (val) this.$refs.allLogin.showDialog();
    }
  },
  methods: {
    //导航栏跳转
    switchPage(key) {
      if (this.activeTab === key && this.$route.path == "/" + this.activeTab)
        return;
      this.activeTab = key;
      this.$router.push("/" + key);
    },
    //登录
    loginClick() {
      this.$refs.allLogin.showDialog();
    },
    //退出登录
    logout() {
      setCookie("x-api-key", "");
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
      localStorage.removeItem("nowRole");
      location.href = "/";
    },
    //检查角色类型
    checkRole(val) {
      if (this.$store.state.account.nowRole.type != undefined&&this.$store.state.account.nowRole.type!=null) {
        console.log("this.$store.state.account.nowRole===",this.$store.state.account.nowRole)
        if (this.$store.state.account.nowRole.type == 0) {
          this.tabs = this.adminTabs;
          this.activeTab = "admin";
          this.$router.push("/admin");
          this.levelList = [
            { path: "/admin", name: "用户管理", meta: { title: "用户管理" } }
          ];
        } else {
          if (
            this.$store.state.account.nowRole.type == 1 ||
            this.$store.state.account.nowRole.type == 2 ||
            this.$store.state.account.nowRole.type == 3
          ) {
            for (let i in this.normalTabs) {
              if (this.normalTabs[i].key == "activeManager") {
                this.normalTabs[i].hide = false;
              } else if (this.normalTabs[i].key == "workReview") {
                this.normalTabs[i].hide = true;
              }
              if (this.normalTabs[i].key == "userCenter") {
                this.normalTabs[i].hide = false;
              }
            }
          } else if (this.$store.state.account.nowRole.type == 4) {
            for (let i in this.normalTabs) {
              if (this.normalTabs[i].key == "workReview") {
                this.normalTabs[i].hide = false;
              } else if (this.normalTabs[i].key == "activeManager") {
                this.normalTabs[i].hide = true;
              }
              if (this.normalTabs[i].key == "userCenter") {
                this.normalTabs[i].hide = false;
              }
            }
          } else if (
            this.$store.state.account.nowRole.type == 11 ||
            this.$store.state.account.nowRole.type == 12 ||
            this.$store.state.account.nowRole.type == 13
          ) {
            for (let i in this.normalTabs) {
              if (this.normalTabs[i].key == "workReview") {
                this.normalTabs[i].hide = true;
              } else if (this.normalTabs[i].key == "activeManager") {
                this.normalTabs[i].hide = true;
              }
              if (this.normalTabs[i].key == "userCenter") {
                this.normalTabs[i].hide = false;
              }
            }
          }
          this.tabs = this.normalTabs;
          if(val==1){
            this.$router.push("/home");
            this.activeTab = "home";
          }
          this.levelList = [
            { path: "/home", name: "首页", meta: { title: "首页" } }
          ];
        }
      }
    },
    //角色切换
    async roleClick(type) {
      let params = {};
      params.type = type;
      params.url = api.switchToken;
      await this.axiosGet(params)
        .then(res => {
          if(res.token!=undefined){
            setCookie("x-api-key", res.token);
          }
          this.$store.dispatch("INIT_USER", res);
          let userInfo = JSON.stringify(res);
          localStorage.setItem("user", userInfo);
          let members = res.members.map(items => {
            let memberItem = {};
            memberItem.type = items.type;
            memberItem.name = this.memberTypeObj[items.type];
            if (items.school_id != undefined) {
              memberItem.school_id = items.school_id;
            }
            if (items.school_title != undefined) {
              memberItem.school_title = items.school_title;
            }
            if (items.current != undefined) {
              memberItem.current = items.current;
              let nowRole = JSON.stringify(memberItem);
              localStorage.setItem("nowRole", nowRole);
              this.$store.dispatch("INIT_NOWROLE", memberItem);
            }
            return memberItem;
          });
          let roles = JSON.stringify(members);
          localStorage.setItem("roles", roles);
          this.$store.dispatch("INIT_ROLES", members);
          const loading = this.$loading({
            lock: true,
            text: "切换中。。",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          setTimeout(() => {
            loading.close();
          }, 2000);
        })
        .catch(err => err);
    },
    /**
     * 生成面包屑的方法
     */
    getBreadcrumb(to) {
      let matched = this.$route.matched.filter(item => item.name);
      if (to != undefined) {
        matched[0].path = to.fullPath;
        const first = matched[0];
        if (
          first &&
          first.name !== "首页" &&
          first.name !== "活动管理" &&
          first.name !== "专家评审" &&
          first.name !== "个人中心" &&
          first.name !== "用户管理" &&
          first.name !== "角色管理" &&
          first.name !== "专家管理" &&
          first.name !== "专家分配" &&
          first.name !== "分类管理" &&
          first.name !== "奖品管理"
        ) {
          var index = this.levelList.findIndex(item => {
            return item.name == first.name;
          });
          if (index != -1) {
            matched = this.levelList.slice(0, index + 1);
          } else {
            matched = this.levelList.concat(matched);
          }
        } else if (
          first.name == "首页" ||
          first.name == "活动管理" ||
          first.name == "专家评审" ||
          first.name == "个人中心" ||
          first.name == "用户管理" ||
          first.name == "角色管理" ||
          first.name == "专家管理" ||
          first.name == "专家分配" ||
          first.name == "分类管理" ||
          first.name == "奖品管理"
        ) {
          matched = matched;
        } else {
          matched = [{ path: "/home", name: "首页", meta: { title: "首页" } }];
        }
        this.levelList = matched;
      }
    },
    //提醒用户记录数
    async getRemindCount(){
      let params = {};
      params.url = api.remindCount;
      await this.axiosGet(params)
        .then(res => {
          if(res.code==0){
            this.$store.dispatch(
              "INIT_REMINDCOUNT",res.count);
          }
        }).catch(err=>{

        })
    }
  }
};
</script>
<style lang="less">
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
  display: flex;
  align-items: center;
}
.uni-header {
  background-color: #2568ed;
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
    color: #ffffff;
    margin-right: 15%;
    .logo {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin: 0 10px 0 20px;
    }
  }
  .header-menu {
    flex: 1;
    color: #ffffff;
    font-size: 16px;
    .menu-item {
      // opacity: 0.5;
      color: rgb(226, 215, 215);
      display: inline-block;
      margin-right: 45px;
      position: relative;
      p{
        position: absolute;
        line-height: 20px;
        top: 10px;
        right: -20px;
        font-size: 16px;
        padding: 0 5px;
        color: red;
        opacity:1;
      }
    }
    .active {
      opacity: 1;
      // font-weight: bold;
      color: #fff;
    }
    .menu-item:hover {
      cursor: pointer;
    }
  }
  .header-user {
    font-size: 14px;
    display: flex;
    color: #ffffff;
    .divider {
      margin: 0 18px;
    }
    .message,
    .name,
    .logout {
      color: #ffffff;
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
.my-bread {
  height: 36px;
  width: 100%;
  background: rgba(247, 248, 250, 1);
  .my-bread-main {
    display: flex;
    width: 1180px;
    margin: auto;
    height: 36px;
    align-items: center;
  }
}
</style>
