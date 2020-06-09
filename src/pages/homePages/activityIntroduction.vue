<template>
  <div class="activity-introduction-container" ref="enrolment">
    <div class="banner-container" v-if="bannerUrl!=''">
      <el-image :src="bannerUrl" fit="cover"></el-image>
    </div>
    <div class="sub-nav">
      <div class="sub-nav-main">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="活动介绍" name="first">
            <el-card class="my-card">
              <el-steps :active="process" align-center>
                <el-step
                  title="作品报名"
                  :description="formatDateChar(activityObject.node[0].stime*1000)+'--'+formatDateChar(activityObject.node[0].etime*1000)"
                ></el-step>
                <el-step
                  title="区域推荐"
                  :description="formatDateChar(activityObject.node[1].stime*1000)+'--'+formatDateChar(activityObject.node[1].etime*1000)"
                ></el-step>
                <el-step
                  title="市级评审"
                  :description="formatDateChar(activityObject.node[2].stime*1000)+'--'+formatDateChar(activityObject.node[2].etime*1000)"
                ></el-step>
                <el-step
                  title="作品展示"
                  :description="formatDateChar(activityObject.node[3].stime*1000)+'--'+formatDateChar(activityObject.node[3].etime*1000)"
                ></el-step>
              </el-steps>
            </el-card>
            <div class="my-card card-body">
              <div class="title">
                <p v-if="activityObject.title.length<=75">{{activityObject.title}}</p>
                <el-tooltip :content="activityObject.title" placement="top" effect="dark" v-else>
                  <p>{{activityObject.title}}</p>
                </el-tooltip>
              </div>
              <el-divider></el-divider>
              <div class="activity-introduction-main">
                <div class="activity-title">
                  <p>活动介绍：</p>
                </div>
                <div class="activity-int-item">
                  <div
                    class="activity-int-content ql-snow ql-editor"
                    v-html="activityObject.detail.content"
                  ></div>
                </div>
              </div>
              <div class="activity-annex">
                <p>相关附件：</p>
                <div class="annex" v-for="(item,index) in activityObject.attachment" :key="index">
                  <file-preview :fileObj="item"></file-preview>
                </div>
              </div>
              <div class="list-item">
                <div class="list-item-title">
                  <p>活动对象：</p>
                </div>
                <div
                  class="list-item-content"
                  v-for="(item,index) in activityObject.target"
                  :key="index"
                >【{{targetObj[item]}}】</div>
              </div>
              <div class="list-item">
                <div class="list-item-title">
                  <p>活动范围：</p>
                </div>
                <template v-if="activityObject.region.length<12">
                  <div
                    class="list-item-content"
                    v-for="(item,index) in activityObject.region"
                    :key="index"
                  >【{{item.area_name}}】</div>
                </template>
                <template>
                  <div v-if="activityObject.region.length>=12">【深圳市】</div>
                </template>
              </div>
              <div class="enrolment">
                <div class="enrolment-top">
                  <p @click="goToEnroment()" v-if="!showEnrolment">我要报名</p>
                  <span v-if="showEnrolment">报名区域</span>
                </div>
                <div class="enrolment-area" v-if="showEnrolment">
                  <div class="tag">
                    <p style="font-size:16px;font-weight:700;color:red;">请选择您所在的组别</p>
                  </div>

                  <div style="padding:10px 30px;margin-bottom:10px;">
                    <type-select
                      :gradeList="activityObject.periodList"
                      @gradeObject="PeriodgradeObject"
                    ></type-select>
                  </div>
                  <div class="tag">
                    <p style="font-size:16px;font-weight:700;color:red;">请选择您所要参加活动项目</p>
                  </div>
                  <div class="list-item" style="margin-bottom:0;">
                    <div class="list-item-title">
                      <p>活动项目：</p>
                    </div>
                    <div class="list-item-content"></div>
                  </div>
                  <div v-for="(item,index) in activityObject.category" :key="index">
                    <div class="list-project">
                      <div class="list-project-title">
                        <p>{{item.title}}</p>
                      </div>
                      <div class="lable" v-if="activityProjectList.length>0">
                        <div class="lable-aside">
                          <div
                            class="lable-self"
                            v-for="(item1, index1) in item.child"
                            :key="index1"
                            @click="otherObjectOne(item1.id, index1)"
                            :class="{'type-active':(item1.periodList.indexOf(PeriodGradeObjectid)>-1),'not-click':(item1.periodList.indexOf(PeriodGradeObjectid)==-1)}"
                          >{{item1.name||item1.title}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="通知公告" name="second">
            <el-card style="padding-bottom:30px;" class="my-card">
              <div class="title">
                <p>消息公告</p>
              </div>
              <el-divider></el-divider>
              <el-row>
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  border
                  :header-cell-style="{background:'#EEEEEE',color:'#323232'}"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="tableSelectionChange"
                >
                  <el-table-column label="序号" type="index" width="100"></el-table-column>

                  <el-table-column prop="title" label="公告通知名称" show-overflow-tooltip></el-table-column>

                  <el-table-column label="时间">
                    <template slot-scope="scope">{{formatDateChar(scope.row.created_at*1000)}}</template>
                  </el-table-column>

                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button @click="goToLook(scope.row.id)" type="text" size="small">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <el-row class="page-div">
                <el-pagination
                  @size-change="pageSizeChange"
                  @current-change="pageCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[20, 30, 40,50,100]"
                  :page-size="perPage"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalCount"
                ></el-pagination>
              </el-row>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="优秀作品" name="third">
            <el-card style="padding-bottom:30px;" class="my-card">
              <el-row>
                <el-col>
                  <type-select
                    :gradeList="gradeListTwo"
                    :activityTypleList="activityTypleList"
                    :activityProjectList="activityProjectList"
                    @gradeObject="gradeObject"
                    @activityTypleObject="activityTypleObject"
                    @activityProjectObject="activityProjectObject"
                  ></type-select>
                </el-col>
              </el-row>
              <div class="workTotle">作品数量:{{workTotle}}个</div>
              <el-row>
                <el-col>
                  <div class="emptyWork" v-if="activityList.length==0">
                    <img src="../../assets/img2/empty.png" />
                    <p>无相关作品</p>
                  </div>
                  <card-list
                    :cardList="activityList"
                    :isExcellent="true"
                    @onlike="onlike"
                    @toNext="gotoGoodWorkDetail"
                  ></card-list>
                </el-col>
              </el-row>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import api from "../../service/api";
import FilePreview from "../../components/FilePreview";
import TypeSelect from "../../components/TypeSelect";
import CardList from "../../components/CardList";
import { getTimestamp } from "../../tools/tools";
import { getCookie, axiosGet, axiosPost } from "../../tools/tools";
import merge from "webpack-merge";
export default {
  components: { FilePreview, TypeSelect, CardList },
  data() {
    return {
      activeName: "first",
      bannerUrl: "",
      gradeList: [],
      tableData: [], //公告列表
      multipleSelection: [],
      perPage: 20, //每页数据条数
      currentPage: 1, //当前页
      totalCount: 0, //总条数
      activityTypleList: [],
      activityProjectList: [],
      activityNameIndex: 0, //选择参加活动项目的id
      activityTypleSelectID: "",
      activityProjectSelectID: "",
      gradeListTwo: [{ name: "全部", id: 0 }],
      activityObject: {},
      ClassList: [
        { name: "幼教组", id: 1 },
        { name: "小学组", id: 2 },
        { name: "初中组", id: 4 },
        { name: "高中组", id: 8 },
        { name: "特教组", id: 16 },
        { name: "中职组", id: 32 },
        { name: "高教组", id: 64 }
      ],
      targetObj: { 1: "老师", 2: "学生", 4: "家长" },
      targetList: [
        { name: "老师", id: 1 },
        { name: "学生", id: 2 },
        { name: "家长", id: 4 }
      ],
      activityList: [], // 活动列表
      gradeObjectid: "",
      PeriodGradeObjectid: "",
      id: this.$route.query.id, //获取详情id
      apiKey: getCookie("x-api-key"),
      process: 1, //进度
      workTotle: "", //优秀作品数量
      showEnrolment: false, //展示报名区域
      showProcess:1,
    };
  },
  created() {
    let params = {
      "per-page": this.perPage,
      "filter[activity_id]": this.$route.query.id
    };
    params.page = this.currentPage;
    this.getActivityNoticeList(params);
    this.goodWorkList();
    this.getActivityList();
  },
  mounted() {
    this.getActivityInfo();
    if (this.$route.query.activeName != undefined) {
      this.activeName = this.$route.query.activeName;
    }
  },
  watch: {
    getNowRole(newval, oldval) {
      console.log("登录newval===", newval, "登录oldval===", oldval);
      this.showEnrolment = true;
      setTimeout(() => {
        let enrolment = this.$refs["enrolment"];
        document.documentElement.scrollTop = enrolment.scrollHeight;
      }, 3000);
    }
  },
  computed: {
    getNowRole() {
      return this.$store.state.account.nowRole;
    }
  },
  methods: {
    //切换
    handleClick(tab) {
      this.activeName = tab.name;
      this.$router.push({
        query: merge(this.$route.query, { activeName: tab.name })
      });
    },
    //获取所有的活动列表 主要是用做筛选
    async getActivityList() {
      let that = this;
      let params = {};
      params.url = api.activity;
      params.expand = "category,categoryDetail";
      params.id = that.id;
      await this.axiosGet(params).then(res => {
        if (res.categoryDetail.length > 0) {
          for (let i in res.categoryDetail) {
            let typeItem = {};
            typeItem.id = res.categoryDetail[i].id;
            typeItem.name = res.categoryDetail[i].title;
            typeItem.activityProjectList = [];
            for (let j in res.categoryDetail[i].child) {
              let projectItem = {};
              projectItem.id = res.categoryDetail[i].child[j].id;
              projectItem.name = res.categoryDetail[i].child[j].title;
              typeItem.activityProjectList.push(projectItem);
            }
            this.activityTypleList.push(typeItem);
          }
          for (let i in this.activityTypleList) {
            if (
              this.activityTypleList[i].activityProjectList != undefined &&
              this.activityTypleList[i].activityProjectList.length > 0
            ) {
              this.activityProjectList = this.activityProjectList.concat(
                this.activityTypleList[i].activityProjectList
              );
            }
          }
        }
      });
      that.activityTypleList.unshift({ id: 0, name: "全部" });
      that.activityProjectList.unshift({ id: 0, name: "全部" });
    },
    async goodWorkList() {
      let that = this;
      let params = {};
      params.url = api.enroll;
      params.activity_id = this.id;
      params.position = 4; //优秀作品展示
      if (that.gradeObjectid != "" && that.gradeObjectid != 0) {
        params.period = that.gradeObjectid; //按组别筛选 [筛选活动时有效] 按组别筛选：多个组别则相加
      }
      if (that.activityTypleSelectID != "" && that.activityTypleSelectID != 0) {
        params.category_id = that.activityTypleSelectID; //按分类筛选
      }
      if (
        that.activityProjectSelectID != "" &&
        that.activityProjectSelectID != 0
      ) {
        params.item_id = that.activityProjectSelectID; //按项目筛选
      }
      params.expand = "info,works,school,professional,award";
      await this.axiosGet(params)
        .then(res => {
          console.log("优秀作品res===", res, "res.items==", res.items.length);
          if (res.items.length > 0) {
            that.workTotle = res.items.length;

            that.activityList = res.items.map(item => {
              let author = []; //作者
              let mentor = []; //指导老师
              let award = []; //奖项 因为可能有多个
              if (item.info.author.length > 0) {
                author = item.info.author.map(res => {
                  return res.name;
                });
              }
              if (
                item.info.mentor != undefined &&
                item.info.mentor.length > 0
              ) {
                mentor = item.info.mentor.map(res => {
                  return res.name;
                });
              }
              if (item.award.length > 0) {
                award = item.award.map(res => {
                  return res.title;
                });
              }
              return {
                id: item.works.id,
                activity_id: item.id,
                name: item.works.title,
                cover: item.works.cover,
                view_counts: item.view_counts,
                like_counts: item.like_counts,
                author: author.join("、"),
                mentor: mentor.join("、"),
                award: award.join("、"),
                school: item.school.title
              };
            });
            console.log("优秀作品===", that.activityList);
          } else {
            that.workTotle = 0;
            that.activityList = [];
          }
        })
        .catch(err => err);
    },
    //获取活动详情
    async getActivityInfo() {
      let params = {};
      params.url = api.activityDetail;
      params.id = this.$route.query.id;
      params.expand =
        "detail,region,node,attachment,banner,category,categoryDetail,process";
      await this.axiosGet(params)
        .then(res => {
          if (res.banner[0] != undefined) {
            this.bannerUrl = res.banner[0].url;
          }
          this.showProcess=res.process
          this.activityObject = res;
          this.activityObject.periodList = [];
          let arr = [1, 2, 4, 8, 16, 32, 64];
          let result = this.getSubSet(res.period, arr);
          console.log("getSubSet===", this.getSubSet(res.period, arr));
          for (let i in result) {
            for (let j in this.ClassList) {
              if (result[i] == this.ClassList[j].id) {
                this.activityObject.periodList.push(this.ClassList[j]);
                this.gradeListTwo.push(this.ClassList[j]);
              }
            }
          }
          this.PeriodGradeObjectid = this.activityObject.periodList[0].id; //一开始返回默认组的id
          //处理项目
          for (let i in this.activityObject.category) {
            for (let j in this.activityObject.category[i].child) {
              this.activityObject.category[i].child[
                j
              ].periodList = this.getSubSet(
                this.activityObject.category[i].child[j].period,
                arr
              );
            }
          }
          this.activityObject.target = this.getSubSet(
            this.activityObject.target,
            [1, 2]
          );
          let nowTime = Date.parse(new Date());
          if (res.node[0].stime * 1000 <= nowTime) {
            this.process = 1;
          }
          if (res.node[1].stime * 1000 <= nowTime) {
            this.process = 2;
          }
          if (res.node[2].stime * 1000 <= nowTime) {
            this.process = 3;
          }
          if (res.node[3].stime * 1000 <= nowTime) {
            this.process = 4;
          }
        })
        .catch(err => err);
    },

    //组别筛选
    gradeObject(value) {
      let that = this;
      if (value == 0) {
        that.gradeObjectid = "";
      } else {
        that.gradeObjectid = value;
      }
      that.goodWorkList();
    },
    //组别筛选出活动项目
    PeriodgradeObject(value) {
      let that = this;
      that.PeriodGradeObjectid = value;
    },
    //活动类型
    activityTypleObject(val) {
      if (val != 0) {
        for (let i in this.activityTypleList) {
          if (val == this.activityTypleList[i].id) {
            this.activityProjectList = this.activityTypleList[
              i
            ].activityProjectList;
          }
        }
        this.activityProjectSelectID = this.activityProjectList[0].id;
      } else if (val == 0) {
        this.activityProjectList = [{ id: 0, name: "全部" }];
        for (let i in this.activityTypleList) {
          if (
            this.activityTypleList[i].activityProjectList != undefined &&
            this.activityTypleList[i].activityProjectList.length > 0
          ) {
            this.activityProjectList = this.activityProjectList.concat(
              this.activityTypleList[i].activityProjectList
            );
          }
        }
        this.activityProjectSelectID = 0;
      }
      let that = this;
      that.activityTypleSelectID = val;
      that.goodWorkList();
    },
    //活动项目
    activityProjectObject(value) {
      let that = this;
      that.activityProjectSelectID = value;
      that.goodWorkList();
    },
    //其他
    otherObjectOne(id, index1) {
      this.activityNameIndex = index1;
      this.$router.push({
        path: "/home/choiceActivity",
        query: {
          period: this.PeriodGradeObjectid,
          id: id,
          activityName: this.activityObject.title,
          activeName: this.activeName
        }
      });
    },
    //表格选择
    tableSelectionChange() {},
    //点赞
    async onlike(id) {
      let that = this;
      let params = {};
      params.id = id;
      axios
        .get(api.like, {
          params: params,
          headers: { "x-api-key": that.apiKey }
        })
        .then(res => {
          if (res.data.code == 0) {
            for (let i = 0; i < that.activityList.length; i++) {
              if (that.activityList[i].id == id) {
                that.activityList[i].like_counts++;
              }
            }
          } else {
            that.$message.error("点赞失败");
          }
        });
    },
    gotoGoodWorkDetail(id, activity_id) {
      let that = this;
      that.$router.push({
        path: "/goodWorks",
        query: { id: id, activity_id: activity_id, activeName: this.activeName }
      });
    },
    //查看
    goToLook(id) {
      this.$router.push({
        path: "/home/seeInformation",
        query: {
          id: id,
          activityName: this.activeName
        }
      });
    },
    //获取公告
    async getActivityNoticeList(params) {
      params.url = api.activityNotice;
      params.expand = "content,bcheck";
      await this.axiosGet(params)
        .then(res => {
          this.tableData = res.items;
          this.totalCount = res._meta.totalCount;
        })
        .catch(err => err);
    },
    //每页数量改变
    pageSizeChange(val) {
      this.perPage = val;
      let params = {
        "per-page": this.perPage,
        "filter[activity_id]": this.$route.query.id
      };
      params.page = this.currentPage;
      this.getActivityNoticeList(params);
    },
    //页码改变
    pageCurrentChange(val) {
      this.perPage = val;
      let params = {
        "per-page": this.perPage,
        "filter[activity_id]": this.$route.query.id
      };
      params.page = this.currentPage;
      this.getActivityNoticeList(params);
    },
    //提示框
    open(index, rows) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //展示报名区域
    goToEnroment() {
      if (
        JSON.parse(localStorage.getItem("user")) != undefined &&
        JSON.parse(localStorage.getItem("user")) != null
      ) {
        if (this.showProcess > 1) {
          this.$message({
            type: "warning",
            message: "该活动的报名时间已经结束"
          });
        } else {
          this.showEnrolment = true;
          this.$nextTick(() => {
            let enrolment = this.$refs["enrolment"];
            document.documentElement.scrollTop = enrolment.scrollHeight;
          });
        }
      } else {
        this.$store.dispatch("INIT_SHOW", true);
        this.$message({
          type: "warning",
          message: "请登录后再进行操作"
        });
      }
    }
  }
};
</script>
<style lang="less">
.banner-container {
  height: 600px;
  .el-image {
    height: 600px;
    width: 100%;
  }
}
.sub-nav-main {
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: #fff !important;
    background-color: #198af3 !important;
  }
  .el-tabs__nav-scroll {
    width: 1180px !important;
    margin: auto !important;
  }
}

.my-card {
  .el-step.is-center .el-step__description {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .el-step__icon {
    width: 40px !important;
    height: 40px !important;
    font-size: 24px !important;
  }
  .el-step.is-horizontal .el-step__line {
    top: 18px !important;
  }
}
</style>
<style lang="less" scoped>
.activity-introduction-container {
  width: 100%;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 50px;
  .sub-nav {
    .sub-nav-main {
      width: 100%;
      margin: auto;
      .el-tabs--border-card {
        border: none;
        box-shadow: none;
        -webkit-box-shadow: none;
      }
      .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        color: #fff !important;
        background-color: #198af3 !important;
      }
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-top: 15px;
        p {
          color: #333333;
          font-size: 18px;

          width: 50%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
      .workTotle {
        text-align: right;
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        padding-bottom: 10px;
      }
      .emptyWork {
        text-align: center;
        margin-top: 40px;
        p {
          color: #bfbfbf;

          font-size: 14px;
        }
      }
    }
  }
  .my-card {
    width: 1180px;
    margin: auto;
  }
  .card-body {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  .activity-introduction-main {
    padding: 10px 30px;
    .activity-title {
      font-size: 14px;
      color: #333;
    }
    .activity-int-item {
      margin: 0 30px;
      margin-top: 30px;
      .sub-title {
        p {
          font-size: 14px;
          color: #333;
        }
      }
      .activity-int-content {
        line-height: 30px;
        // text-indent: 2em;
        p {
          margin-top: 10px;
          line-height: 30px;
          // text-indent: 2em;
          font-size: 14px;
        }
      }
    }
  }
  .activity-annex {
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    p {
      font-size: 14px;
      color: #333;
    }
    .annex {
      margin-left: 30px;
      width: 70%;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
    }
  }
  .list-item {
    padding: 10px 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
  }
  .tag {
    padding: 10px 30px;
    font-size: 14px;
    color: #666;
    // margin-bottom: 10px;
  }
  .list-project {
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    .lable-aside {
      margin-left: 90px;

      .type-active {
        background-color: #2d97f0;
      }
      .not-click {
        pointer-events: none;
        background-color: #bfbfbf;
      }
      .lable-self {
        padding: 0 10px;
        width: auto !important;
        margin-top: 5px;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        font-size: 14px;
        text-align: center;
        color: #888888;
        border-radius: 4px;
        margin-right: 10px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .list-project-title {
      margin-left: 90px;
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
  .page-div {
    display: flex;
    justify-content: center;
  }
  .enrolment {
    border: 2px solid #3a8ff5;
  }
  .enrolment-top {
    background: url("../../public/images/enrolment-back.png");
    background-repeat: no-repeat;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: rgba(255, 255, 255, 1);
      font-weight: bold;
      cursor: pointer;
      padding: 0 20px;
      line-height: 30px;
      background: linear-gradient(rgba(73, 200, 253, 1), rgba(40, 144, 246, 1));
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 15px;
    }
    p:hover {
      background: linear-gradient(
        rgba(73, 200, 253, 0.8),
        rgba(40, 144, 246, 0.8)
      );
      color: rgba(255, 255, 255, 0.8);
    }
    span {
      color: rgba(255, 255, 255, 1);
      font-weight: bold;
    }
  }
  .enrolment-area {
    padding: 20px 0;
  }
}
</style>