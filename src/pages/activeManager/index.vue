<template>
  <div class="outter">
    <el-card style="min-height:650px">
      <div style="position:relative">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="活动中心" name="first">
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
                <el-button type="primary" @click="onSubmit()" size="small">查询</el-button>
              </el-form-item>
            </el-form>
            <div v-for="(item,index) in list" :key="index">
              <div class="count">
                <div class="sc">
                  <div class="imglogo">
                    <img :src="item.cover" style="width:173px;height:127px;border-radius:8px;" />
                  </div>
                  <div class="activeclass">
                    <p class="font1">{{item.title}}</p>
                    <p>
                      活动对象：
                      {{item.targetList}}
                    </p>
                    <p>活动范围：{{item.regionList}}</p>
                    <p>发起时间：{{item.Sta_created_at}}</p>
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
                  <el-button type="text" style="color:red;" @click="deleteOne(item.id)">删除</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="历史记录" name="second"></el-tab-pane>
        </el-tabs>
        <el-button
          size="mini"
          type="primary"
          style="position: absolute;right:0px;top:0px;"
          @click="fabuActive()"
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
      list: [],
      activeName: "first",
      form: {
        object: "",
        limit: "",
        time: "",
        acitvename: ""
      },

      ClassList: [
        { name: "幼教组", id: 1 },
        { name: "小学组", id: 2 },
        { name: "初中组", id: 4 },
        { name: "高中组", id: 8 },
        { name: "特教组", id: 16 },
        { name: "中职组", id: 32 },
        { name: "高教组", id: 64 }
      ],
      time1: "",
      time2: "",
      userid: "" //用户id
    };
  },
  created() {
    this.userid = JSON.parse(localStorage.getItem("user")).id;
    this.selectActive();
  },
  methods: {
    //删除
    deleteOne(id) {
      let params = {};
      params.url = api.activity;
      params.id = id;
      axios
        .delete(params.url + "/" + params.id, {
          headers: {
            "x-api-key": getCookie("x-api-key")
          }
        })
        .then(res => {
          console.log(res);
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
          this.selectActive();
        })
        .catch(err => {
          this.$message({
            type: "warning ",
            message: "删除失败，权限不够"
          });
        });
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    async selectActive() {
      console.log(1);
      let params = {};
      if (this.time1.length != 0 && this.time2.length != 0) {
        params.upload_stime = this.time1 / 1000;
        params.upload_etime = this.time2 / 1000;
      }
      if (this.form.acitvename != "") {
        params.title = this.form.acitvename;
      }
      (params.url = api.activityDetail),
        (params.expand =
          "detail,region,node,attachment,banner,category,categoryDetail,process,progress");
      let res = await this.axiosGet(params)
        .then(res => {
          this.list = res.items;
          this.list.forEach(item => {
            var Str = ""; //活动对象数据处理
            var ii = item.target.toString(2);
            for (let i = 0; i < ii.length; i++) {
              if (ii[i] == 1) {
                Str = Str + "【" + this.ClassList[i].name + "】";
              }
            }
            item.targetList = Str; //活动对象数据处理
            var Str2 = ""; //活动范围数据处理
            for (let i = 0; i < item.region.length; i++) {
              Str2 = Str2 + "【" + item.region[i].area_name + "】";
            }
            item.regionList = Str2;
            var Str3 = ""; //发起时间
            let opts = {};
            opts.dateZero = "dateZero";
            Str3 = this.timestampToTime(item.created_at, opts);
            item.Sta_created_at = Str3;
          });
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

    onSubmit() {
      if (this.form.time.length == 2) {
        this.time1 = this.form.time[0];
        this.time2 = this.form.time[1];
      }

      this.selectActive();
    },
    fabuActive() {
      this.$router.push({
        path: "/activeManager/createActivity"
      });
    },
    //活动管理
    goToActivityDetail(id) {
      this.$router.push({
        path: "/home/activityIntroduction",
        query: {
          id: id
        }
      });
    },
    //活动详情
    goToManagerCenter(id) {
      this.$router.push({
        path: "/activeManager/managerCenter",
        query: {
          name: "third",
          id: id
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
  color: rgba(255, 198, 44, 1);
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
</style>