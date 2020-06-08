<template>
  <div class="user-center">
    <el-card>
      <div class="user-wrap">
        <div class="user-content">
          <div class="user-left">
            <div class="block">
              <div class="user-text">我参加的活动</div>
              <el-table :data="tableData" style="width: 100%;font-size:12px" height="460px">
                <el-table-column width="40px">
                  <template slot-scope="scope">
                  <p v-if="scope.row.remind_counts>0" class="el-icon-message-solid" style="color:red;font-size:16px"></p>
                  </template>
                </el-table-column>
                <el-table-column label="活动名称" show-overflow-tooltip>
                  <template slot-scope="scope">{{scope.row.info.activity}}</template>
                </el-table-column>
                <el-table-column label="项目" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{scope.row.info.project}}
                    <!-- <el-button type="text" @click="goToActDetail(scope.row)">{{scope.row.ActivityName}}</el-button> -->
                  </template>
                </el-table-column>
                <el-table-column label="组别">
                  <template slot-scope="scope">{{gradeObj[scope.row.period]}}</template>
                </el-table-column>
                <el-table-column label="作者" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <template>{{scope.row.works.member.author.map(item=>{return item.name}).join('、')}}</template>
                    <!-- <template v-for="item in (scope.row.works.member.author)">{{item.name}}</template> -->
                  </template>
                </el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <p style="color:#1985F3;">{{ scope.row.process }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="报名日期">
                  <template
                    slot-scope="scope"
                  >{{ timeFormat(scope.row.created_at * 1000, 'yyyy-MM-dd') }}</template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="goToActDetail(scope.row.id)">查看</el-button>
                    <el-button type="text" style="color:red;" @click="goToDelete(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="pageSizeChange"
                @current-change="pageCurrentChange"
                :current-page="currentPage"
                :page-sizes="[20, 30, 40, 50, 100]"
                :page-size="perPage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
              ></el-pagination>
            </div>
          </div>
          <div class="user-right">
            <div class="user-edit">
              <el-button type="primary" size="mini" plain @click="goToUserEdit">编辑</el-button>
            </div>
            <div class="user-info-wrap" v-if="user">
              <div class="user-head-left">
                <img v-if="user.avatar!=''" :src="user.avatar" />
                <img v-else src="../public/images/userIcon.png" />
              </div>
              <div class="user-head-right">
                <div class="user-name">
                  {{user.name}}
                  <p style="color:#666;font-size:12px;margin-left:10px;">{{nowRole.name}}</p>
                </div>
                <div class="user-tel">{{user.mobile}}</div>
                <div class="user-tel">{{nowRole.school_title}}</div>
              </div>
            </div>
            <!-- <div class="user-info-atlas" >
              <high-charts :options="abilityOpt"></high-charts>
            </div> -->
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import HighCharts from "../components/highcharts";
import api from "../service/api";
import { setCookie, getCookie } from "../tools/tools";
export default {
  name: "activity-center",
  components: { HighCharts },
  data() {
    return {
      currentPage: 1, // 初始页
      perPage: 20,
      totalCount: 0,
      tableData: [],
      statusMap: {},
      abilityOpt: {},
      gradeObj: {
        1: "幼教组",
        2: "小学组",
        4: "初中组",
        8: "高中组",
        16: "特教组",
        32: "中职组",
        64: "高教组"
      }, //组别
      nowRole: JSON.parse(localStorage.getItem("nowRole"))
    };
  },
  computed: {
    user() {
      return this.$store.state.account.user;
    }
  },
  created() {
    
  },
  mounted() {
    this.$store.dispatch("INIT_REMINDCOUNT",0);
    let list = [
      { Name: "沟通能力", Value: 0 },
      { Name: "逻辑思维", Value: 0 },
      { Name: "实践创新", Value: 0 },
      { Name: "艺术", Value: 0 },
      { Name: "人文底蕴", Value: 0 }
    ];
    this.$nextTick(function() {
      this.renderChart(list);
    });
    let params = {};
    this.getActivityList(params);
  },
  methods: {
    
    //获取报名活动列表
    async getActivityList(params) {
      params.url = api.enroll;
      params.bself = 1;
      params.expand = "info,works,school,professional,award";
      await this.axiosGet(params)
        .then(res => {
           
            this.tableData = res.items;
            this.totalCount = res._meta.totalCount;
            for (let i in this.tableData) {
              if (this.tableData[i].award.length > 0) {
                this.tableData[i].process = "已获奖";
              } else if (this.tableData[i].score >0) {
                this.tableData[i].process = "已评分";
              } else if (this.tableData[i].status == 0) {
                this.tableData[i].process = "已退回";
              } else {
                this.tableData[i].process = "已提交";
              }
            }
          
        })
        .catch(err => err);
    },
    //每页数量改变
    pageSizeChange(val) {
      this.perPage = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getActivityList(params);
    },
    //页码改变
    pageCurrentChange(val) {
      this.currentPage = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getActivityList(params);
    },
    //能力图谱
    renderChart(list = []) {
      let xAxis = [],
        data = [];
      list.forEach(item => {
        xAxis.push(item.Name);
        data.push(item.Value);
      });
      let options = {
        show: true,
        chart: {
          polar: true,
          type: "line"
        },
        title: {
          text: "我的能力图谱"
        },
        pane: {
          size: "65%"
        },
        xAxis: {
          categories: xAxis,
          tickmarkPlacement: "on",
          lineWidth: 0
        },
        yAxis: {
          gridLineInterpolation: "polygon",
          lineWidth: 0,
          min: 0
        },
        legend: {
          enabled: false
        },
        series: [
          {
            name: "能力值",
            data: data,
            pointPlacement: "on"
          }
        ]
      };
      this.abilityOpt = options;
    },
    //活动详情
    goToActDetail(id) {
      // 跳转活动详情页
      this.$router.push({
        path: "/home/activityDetail",
        query: {
          id: id,
          look: 1
        }
      });
    },
    //删除
    goToDelete(id) {
      this.open(id);
    },
    //提示框
    open(id) {
      this.$confirm(`此操作将永久删除该报名记录, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {};
          params.id = id;
          this.deleteConfirm(params);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消！"
          });
        });
    },
    //删除确认
    async deleteConfirm(params) {
      params.url = api.enroll;
      params.status = -1;
      await this.axiosPut(params)
        .then(res => {
          if (res.id != undefined) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            let params = {
              "per-page": this.perPage
            };
            params.page = this.currentPage;
            this.getActivityList(params);
          } else {
            this.$message({
              type: "warning",
              message: "删除失败"
            });
          }
        })
        .catch(err => err);
    },
    //信息编辑
    goToUserEdit() {
      this.$router.push({
        path: "/userCenter/userEdit"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-center {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  box-sizing: border-box;
  .user-wrap {
    .user-content {
      width: 100%;
      display: flex;
      .user-left {
        width: 800px;
        height: 600px;
        border: 1px solid #e6e6e6;
        margin-right: 20px;
        padding: 30px 20px 20px 20px;
        box-sizing: border-box;
        .user-text {
          font-size: 14px;
          color: #909399;
          margin-bottom: 18px;
        }
      }
      .user-right {
        width: 310px;
        height: 600px;
        border: 1px solid #e6e6e6;
        .user-edit {
          display: flex;
          margin: 10px 20px 0;
          justify-content: flex-end;
        }
        .user-info-wrap {
          display: flex;
          margin: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e6e6e6;
          .user-head-left {
            width: 80px;
            height: 80px;
            background: khaki;
            border-radius: 4px;
            margin-right: 20px;
            border-radius: 40px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .user-head-right {
            .user-name {
              font-size: 16px;
              display: flex;
              flex-direction: row;
              align-items: center;
            }
            .user-tel {
              font-size: 14px;
              color: #888888;
              margin: 10px 0;
            }
          }
        }
        .user-info-atlas {
          .atlas-title {
            font-size: 14px;
            text-align: center;
          }
        }
      }
    }
    .user-certificate {
      width: 830px;
      height: 529px;
      margin-top: 10px;
      padding: 35px 20px 0 20px;
      border: 1px solid #e6e6e6;
      box-sizing: border-box;
      .certificate-title {
        font-size: 14px;
        color: #909399;
        margin-bottom: 30px;
      }
      .certificate-wrap {
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        margin-right: -20px;
        margin-bottom: -20px;
        .certificate-self {
          width: 184px;
          height: 160px;
          margin-right: 18px;
          .certificate-img {
            width: 100%;
            height: 120px;
            background: url("../public/images/template.png") no-repeat;
            background-size: 100%;
            position: relative;
            padding-top: 8px;
            .ranking {
              position: absolute;
              top: 22px;
              right: 23px;
              font-size: 4px;
              color: #f4da98;
            }
            .qr {
              width: 20px;
              height: 20px;
              position: absolute;
              top: 55px;
              right: 19px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .user-info {
              margin-left: 15px;
              .activity-title {
                font-size: 12px;
                color: #000000;
              }
              .english-title {
                font-size: 7px;
                margin-bottom: 2px;
              }
              .name {
                font-size: 10px;
              }
              .id-cad,
              .school,
              .grade,
              .classroom,
              .sponsor,
              .activ-name {
                font-size: 4px;
                margin-bottom: 3px;
              }
            }
          }
          .activity-name {
            font-size: 14px;
            color: #333;
            text-align: center;
            margin-top: 10px;
          }
        }
      }
    }
  }
}

.el-pagination {
  margin: 30px auto;
  text-align: left;
}
</style>
