<template>
  <div>
    <span class="countnum" style="margin-left:33px;">共{{count}}个作品</span>
    <span class="title" style="margin-left:244px;">分配作品</span>
    <el-divider></el-divider>
    <div class="div1" style="overflow: auto;">
      <el-input class="inputclass" v-model="input" placeholder="请输入搜索名称" style="small"></el-input>

      <div style="margin-top:21px;">
        <div v-for="(item,index) in checkedUserList" :key="index" style="margin-bottom:10px;">
          <img :src="url" style="width:20px;height:20px;margin-left:30px;" />
          <span style="margin-left: 56px;margin-top: -25px;display: block;">{{item.name}}</span>
          <span
            style="margin-left: 301px;display: block;margin-top:-19px;"
            @change="JudgeAdd(index)"
          >
            <el-checkbox v-model="userList[index].checked"></el-checkbox>
          </span>
        </div>
      </div>
    </div>

    <div class="div2" style="overflow: auto;">
      <span
        style="font-size:14px;font-family:PingFang;font-weight:500;color:rgba(153,153,153,1);line-height:70px;margin-left:30px;"
      >请选择您要添加的人员</span>
      <div>
        <div v-for="(item,index) in addList" :key="index">
          <div
            style="width:75px;height:30px;background:rgba(255,255,255,1);border:1px solid rgba(229,229,229,1);border-radius:4px;margin-left:30px; margin-bottom:5px;"
          >
            <p
              style="font-size:14px;color:rgba(51,51,51,1);line-height:30px;text-align:center"
            >{{item.name}}</p>
            <img
              src="../public/images/delete.svg"
              style="margin: -24px 0 0 257px;display: block;"
              @click="delet(index)"
            />
          </div>
        </div>
      </div>
      <div class="bottom">
        <el-button type="primary" size="small" @click="commit()">确认</el-button>
        <el-button size="small" @click="Noedit()">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../service/api";
import { axiosGet } from "../tools/tools";
export default {
  props: ["workList"],
  data() {
    return {
      input: "",
      checkedUserList: [],
      userList: [],
      addList: [],
      url: require("../public/images/peopLogo.png"),
      count: ""
    };
  },
  created() {
    
    this.getUserList();
    this.count = this.workList.length;
  },
  methods: {
      //分配作品
    async commit() {
      var worList = [];
      var teaList = [];
      this.addList.forEach(item => {
        teaList.push(item.id);
      });
      this.workList.forEach(item => {
        worList.push(item.id);
      });
      let parmas = {};
      parmas.url = api.assignment;
      parmas.enroll_ids = worList;
      parmas.user_ids = teaList;
      await this.axiosPost(parmas)
        .then(res => {
            if(res.code==0){
                this.$message({
                    type: 'success',
                    message:"分配成功！！"
                });
                setTimeout(()=>{
                    this.$emit("edit", false);
                },1000)
            }else if(res.code==-1){
                this.$message({
                    type: 'error',
                    message:res.message
                });
                setTimeout(()=>{
                    this.$emit("Noedit", false);
                },1000)
            }
        })
        .catch(res => res);
    },
    //获取专家
    async getUserList() {
      let parmas = {};
      parmas.url = api.user;
      parmas.role_id = 5;
      let res = await axiosGet(parmas).catch(err => err);
      if (res.items.length != 0) {
        this.userList = res.items;
        this.checkedUserList = this.userList;
      }
    },

    Noedit() {
      this.$emit("Noedit", false);
    },
    JudgeAdd(item) {
      let list = [];
      this.userList.forEach(res => {
        if (res.checked == true) {
          list.push(res);
        }
      });
      this.addList = list;
      console.log(list);
    },
    delet(item) {
      console.log(item);
      let list = [];
      this.addList[item].checked = false;
      this.addList.forEach(res => {
        if (res.checked == true) {
          list.push(res);
        }
      });
      this.addList = list;
    },
    search(keyWord) {
      let list = [];
      if (keyWord != "") {
        for (var i = 0; i < this.userList.length; i++) {
          if (this.userList[i].name.indexOf(keyWord) >= 0) {
            list.push(this.userList[i]);
          }
        }
        this.checkedUserList = list;
      } 
    }
  },
  watch: {
    input: function(newVal) {
        console.log("input==",newVal)
        if(newVal!=''){
            this.input = newVal;
            this.search(this.input);
        }else{
            this.checkedUserList=this.userList
        }
      
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  font-size: 18px;
  color: rgba(51, 51, 51, 1);
  line-height: 48px;
}
.div1 {
  clear: both;
  float: left;
  width: 380px;
  height: 432px;
  border-right: 1px solid rgba(210, 210, 210, 1);
}
.div2 {
  position: relative;
  float: left;
  width: 400px;
  height: 432px;
  .bottom {
    height: 40px;
    position: fixed;
    bottom: 110px;
    margin-left: 118px;
    margin-bottom: 18px;
  }
}
.countnum {
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
  line-height: 48px;
}
.inputclass {
  margin: 10px 0 0 30px;
  width: 286px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
</style>