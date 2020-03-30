<template>
  <div class="outter">
    <el-card style="min-height:650px">
      <div style="position:relative">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="活动中心" name="first"></el-tab-pane>
          <el-tab-pane label="历史记录" name="second"></el-tab-pane>
          <el-row>
            <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
              <el-form-item label="报名时间：">
                <el-date-picker
                  format="yyyy-MM-dd"
                  v-model="form.time"
                  size="small"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="timestamp"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="活动名称：">
                <el-input v-model="form.acitvename" placeholder="请输入活动名称" size="small"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="goToSearch()" size="small">查询</el-button>
              </el-form-item>
            </el-form>
            <div v-for="(item,index) in activityList" :key="index">
              <div class="count">
                <div class="sc">
                  <div class="imglogo">
                    <img :src="item.cover" style="width:173px;height:127px;border-radius:8px;" />
                  </div>
                  <div class="activeclass">
                    <p class="font1">{{item.title}}</p>
                    <p>
                      活动对象：
                      【{{targetObj[item.target]}}】
                    </p>
                    <p>活动范围：
                      <template v-if="item.region.length<12" v-for="(subItem,index1) in item.region">
                        <span>【{{subItem.area_name}}】</span>
                      </template>
                      <template>
                        <span v-if="item.region.length>=12">【深圳市】</span>
                      </template>

                    </p>
                    <p>发起时间：{{formatDateChar(item.created_at*1000)}}</p>
                  </div>
                </div>
                <div class="shenheclass">
                  <p>{{item.progress}}</p>
                </div>
                <div class="shenheclass2">
                  <el-button
                    type="text"
                    @click="goToManagerCenter(item.id)"
                    style="display:block;margin-left:9px;"
                  >管理</el-button>
                  <el-button
                    type="text"
                    @click="goToActivityDetail(item.id)"
                    style="display:block"
                  >查看详情></el-button>
                  <el-button type="text" style="color:red;" @click="deleteOne(item.id)" v-if="$store.state.account.nowRole.type!=3">删除</el-button>
                </div>
              </div>
            </div>
          </el-row>
        </el-tabs>
        <el-button
          size="mini"
          type="primary"
          style="position: absolute;right:0px;top:0px;"
          @click="releaseActivity()"
          v-if="$store.state.account.nowRole.type==0||$store.state.account.nowRole.type==2"
        >+发起活动</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
import api from "../../service/api";
import { timestampToTime, axiosDelete, getCookie } from "../../tools/tools";
import Axios from "axios";
export default {
  data() {
    return {
      activityList: [],
      activeName: "first",
      process:1,
      form: {
        object: "",
        limit: "",
        time: "",
        acitvename: ""
      },
      targetObj: { 1: "老师",  2: "学生", 4: "家长"},
      time1: "",
      time2: ""
    };
  },
  created() {
    this.getActivityList();
  },
  methods: {
    //删除
    async deleteOne(id) {
      let params = {};
      params.url = api.activity;
      params.id = id;
      this.open(params)
    },
    //删除提示
    open(params) {
        this.$confirm(`此操作将永久删除该活动, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.deleteItem(params)
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消！'
            });          
        });
    },
    //删除
    async deleteItem(params){
      await this.axiosDelete(params)
        .then(res => {
          if (res.status == 200) {
            this.$message({
              type: "success ",
              message: "删除成功"
            });
          }
          if (res.status == 204) {
            this.$message({
              type: "success ",
              message: "无内容"
            });
          }
          this.getActivityList();
        })
        .catch(err => {
          this.$message({
            type: "warning ",
            message: "删除失败，权限不够"
          });
        });
    },
    //切换
    handleClick(tab) {
      if(tab.index==1){
        this.process=2
      }else if(tab.index==0){
        this.process=1
      }
      if (this.form.time.length == 2) {
        this.time1 = this.form.time[0];
        this.time2 = this.form.time[1];
      }
      this.getActivityList();
    },
    //获取活动列表
    async getActivityList() {
      let params = {};
      params.process=this.process //注释掉是因为超级管理员看不到自己刚创建的活动
      if (this.time1.length != 0 && this.time2.length != 0) {
        params.upload_stime = this.time1 / 1000;
        params.upload_etime = this.time2 / 1000;
      }
      if (this.form.acitvename != "") {
        params.title = this.form.acitvename;
      }
      params.url = api.activityDetail
      params.expand =
          "detail,region,node,attachment,banner,category,categoryDetail,process,progress"
      if(this.$store.state.account.nowRole.type==3){
        params.inregion=1
      } else if(this.$store.state.account.nowRole.type==2){
        params.created_by=this.$store.state.account.user.id
      }
      let res = await this.axiosGet(params)
        .then(res => {
          this.activityList = res.items;
          // 数据清除
          {
            this.time1 = "";
            this.time2 = "";
            this.form.time = "";
            this.form.acitvename = "";
          }
        })
        .catch(err => err);
    },
    //查询
    goToSearch() {
      if (this.form.time.length == 2) {
        this.time1 = this.form.time[0];
        this.time2 = this.form.time[1];
      }
      this.getActivityList();
    },
    //发布活动
    releaseActivity() {
      let addActivityForm = null;
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(addActivityForm)
      );
      this.$router.push({
        path: "/activeManager/createActivity"
      });
    },
    //活动详情
    goToActivityDetail(id) {
      this.$router.push({
        path: "/home/activityIntroduction",
        query: {
          id: id
        }
      });
    },
    //活动管理
    goToManagerCenter(id) {
      this.$router.push({
        path: "/activeManager/managerCenter",
        query: {
          id: id,
          activeName:'third'
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.sc {
  width: 750px;
}
.outter {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
}
.count {
  display: flex;
  width: 1120px;
  height: 170px;
  background: rgba(247, 248, 250, 1);
  border: 1px solid rgba(229, 229, 229, 1);
  border-radius: 8px;
  margin-bottom: 20px;
}
.imglogo {
  float: left;
  margin: 20px 0 0 20px;
}

.font2 {
  float: left;
}
.shenheclass {
  margin-left: 100px;
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #1D8CFD;
}
.shenheclass2 {
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
}
.activeclass {
  display: flex;
  flex-direction: column;
  justify-content: start;
  p {
    padding: 2px 10px 2px 61px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 24px;
  }
  .font1 {
    margin: 7px 0 0 0;
    float: left;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 43px;
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.list-item-content{
  display: flex;
  flex-direction: row;
}
</style>