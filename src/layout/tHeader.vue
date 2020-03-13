<template>
  <div class="header-container">
    <div class="uni-header">
      <a class="uni-title" href="/">
        <img class="logo" src="../public/images/logo.png">
        <span>中小学信息化活动平台</span>
      </a>
      <div class="header-menu">
        <div v-for="item in tabs" :key="item.key" @click="switchPage(item.key)" v-if="!item.hide"
            :class="'menu-item ' + (activeTab === item.key ? 'active' : '')">{{item.name}}
        </div>
      </div>
      <div class="header-user">
        <template v-if="$store.state.account.roles.length>0">
          <span class="name" @click="roleClick"></span>
          <el-dropdown @command="roleClick">
            <span class="name">{{$store.state.account.nowRole.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="item.id" v-for="(item,index) in $store.state.account.roles" :key="index">{{item.name}}</el-dropdown-item>
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
      <!-- <w-x-login ref="wxLogin"></w-x-login> -->
      <login ref="allLogin"></login>
     
    </div>
    <div class="my-bread">
      <div class="my-bread-main">
        <my-bread-crumb :levelList="levelList"></my-bread-crumb>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import UuniV4 from 'uuid/v4';
  import { setCookie, getCookie } from '../tools/tools';
  import Login from '../components/Login'
  import MyBreadCrumb from '../components/MyBreadCrumb'
  export default {
    name: 'uni-header',
    components: {MyBreadCrumb,Login },
    data() {
      return {
        tabs: [],
        normalTabs: [
          { key: 'home', name: '首页', hide: false },
          { key: 'activeManager',name:'活动管理',hide:true},
          { key: 'workReview', name: '专家评审', hide: true },
          { key: 'userCenter', name: '个人中心', hide: false },   
        ],
        adminTabs: [
          { key: 'admin', name: '用户管理', hide: false },
          { key: 'roleManage', name: '角色管理', hide: false },
          { key: 'expertManage', name: '专家管理', hide: false },
          // { key: 'expertAssign', name: '专家分配', hide: false },
          // { key: 'classifyManage', name: '分类管理', hide: false },
          { key: 'prizeManagement', name: '奖品管理', hide: false },
        ],
        activeTab: 'home',
        levelList:[],//面包屑
      };
    },
    computed: {
      user() {
        return this.$store.state.account.user;
      },
      getRoles(){
        return this.$store.state.account.roles;
      },
      getNowRole(){
        return this.$store.state.account.nowRole
      }
      
    },
    created(){
      
    },
    mounted() {
      if(getCookie('x-api-key')){
        this.$store.dispatch('INIT_USER', JSON.parse(localStorage.getItem('user')));
        this.$store.dispatch('INIT_ROLES', JSON.parse(localStorage.getItem('roles')));
        this.$store.dispatch('INIT_NOWROLE', JSON.parse(localStorage.getItem('nowRole')));
        this.checkRole()
      }else{
        this.tabs = this.normalTabs;
        this.$router.push('/home');
        this.activeTab='home'
        this.levelList=[{path: '/home',name:'首页', meta: { title: '首页' }}]
      }
    },
    watch: {
      $route(val) {
        this.activeTab = val.path.split('/')[1];
        this.getBreadcrumb(val);
      },
      getNowRole(newval,oldval) {
        if(newval.type!==oldval.type){
          if(getCookie('x-api-key')){
            this.$store.dispatch('INIT_USER', JSON.parse(localStorage.getItem('user')));
            this.$store.dispatch('INIT_ROLES', JSON.parse(localStorage.getItem('roles')));
            this.$store.dispatch('INIT_NOWROLE', JSON.parse(localStorage.getItem('nowRole')));
            this.checkRole()
          }else{
            this.tabs = this.normalTabs;
            this.$router.push('/home');
            this.activeTab='home'
            this.levelList=[{path: '/home',name:'首页', meta: { title: '首页' }}]
          }
        }
        
      }
    },
    methods: {
      //导航栏跳转
      switchPage(key) {
        if (this.activeTab === key && this.$route.path == ('/' + this.activeTab)) return;
        this.activeTab = key;
        this.$router.push('/' + key);
      },
      //登录
      loginClick() {
        this.$refs.allLogin.showDialog();
      },
      //退出登录
      logout() {
        setCookie('x-api-key', '');
        localStorage.removeItem('user');
        localStorage.removeItem('roles');
        localStorage.removeItem('nowRole');
        location.href = '/';
      },
      //检查角色类型
      checkRole(){
        if(this.$store.state.account.nowRole.type==0){
          this.tabs=this.adminTabs
          this.activeTab='admin'
          this.$router.push('/admin');
          this.levelList=[{path: '/admin',name:'用户管理', meta: { title: '用户管理' }}]
        }else{
          if(this.$store.state.account.nowRole.type==1||this.$store.state.account.nowRole.type==2||this.$store.state.account.nowRole.type==3){
            for(let i in this.normalTabs){
              if(this.normalTabs[i].key=='activeManager'){
                this.normalTabs[i].hide=false
              }else if(this.normalTabs[i].key=='workReview'){
                this.normalTabs[i].hide=true
              }
            }
          }else if(this.$store.state.account.nowRole.type==4){
            for(let i in this.normalTabs){
              if(this.normalTabs[i].key=='workReview'){
                this.normalTabs[i].hide=false
              }else if(this.normalTabs[i].key=='activeManager'){
                this.normalTabs[i].hide=true
              }
            }
          }
          this.tabs = this.normalTabs;
          this.$router.push('/home');
          this.activeTab='home'
          this.levelList=[{path: '/home',name:'首页', meta: { title: '首页' }}]
        }
      },
      //角色切换
      roleClick(id){
        for(let i in this.$store.state.account.roles){
          if(this.$store.state.account.roles[i].id==id){
            let nowRole=JSON.stringify(this.$store.state.account.roles[i])
            localStorage.setItem('nowRole',nowRole);
            this.$store.dispatch('INIT_NOWROLE', this.$store.state.account.roles[i]);
          }
        }
      },
      /**
      * 生成面包屑的方法
      */
      getBreadcrumb(to) {
        let matched = this.$route.matched.filter(item => item.name)
        if(to!=undefined){
          matched[0].path=to.fullPath
          const first = matched[0]
          if (first && first.name !== '首页'&&first.name!=='活动管理'&&first.name!=='专家评审'
          &&first.name!=='个人中心'&&first.name!=='用户管理'&&first.name!=='角色管理'
          &&first.name!=='专家管理'&&first.name!=='专家分配'&&first.name!=='分类管理'&&first.name!=='奖品管理') {
            var index=this.levelList.findIndex((item)=>{
              return item.name==first.name
            })
            if(index!=-1){
              matched =this.levelList.slice(0,(index+1))
            }else{
              matched =this.levelList.concat(matched)
            }
          }else if(first.name == '首页'||first.name=='活动管理'||first.name=='专家评审'
          ||first.name=='个人中心'||first.name=='用户管理'||first.name=='角色管理'
          ||first.name=='专家管理'||first.name=='专家分配'||first.name=='分类管理'||first.name=='奖品管理'){
            matched =matched
          } else{
            matched=[{path: '/home',name:'首页', meta: { title: '首页' }}]
          }
          this.levelList = matched;
        }
        
      }
      
    }
  };
</script>
<style lang="less">
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
    display: flex;
    align-items: center;
  }
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
        margin-right: 45px;
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
  .my-bread{
    height:36px;
    width:100%;
    background:rgba(247,248,250,1);
    .my-bread-main{
      display:flex;
      width:1180px;
      margin:auto;
      height:36px;
      align-items:center;
    }
  }
</style>
