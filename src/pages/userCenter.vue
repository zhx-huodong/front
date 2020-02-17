<template>
  <div class="user-center">
    <div class="user-wrap">
      <div class="user-content">
        <div class="user-left">
          <div class="block">
            <div class="user-text">我参加的活动</div>
            <el-table :data="tableData" style="width: 100%" height="400px">
              <el-table-column prop="ActivityName" label="活动名称" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button type="text" @click="goToActDetail(scope.row)">{{scope.row.ActivityName}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="Sponsor" label="主办方"></el-table-column>
              <el-table-column prop="Status" label="状态">
                <template slot-scope="scope">
                  {{ statusMap[scope.row.Status] }}
                </template>
              </el-table-column>
              <el-table-column prop="StartTime" label="报名日期">
                <template slot-scope="scope">
                  {{ timeFormat(scope.row.StartTime * 1000, 'yyyy-MM-dd hh:mm:ss') }}
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
        <div class="user-right">
          <div class="user-info-wrap" v-if="user">
            <div class="user-head-left">
              <img v-if="user.Avatar" :src="user.Avatar">
              <div class="head-img" v-else></div>
            </div>
            <div class="user-head-right">
              <div class="user-name">{{user.Name}}</div>
              <div class="user-tel">{{user.Phone}}</div>
              <div class="user-tel">{{user.School}}</div>
            </div>
          </div>
          <div class="user-info-atlas">
            <high-charts :options="abilityOpt"></high-charts>
          </div>
        </div>
      </div>
      <!-- <div class="user-certificate">
        <div class="certificate-title">我获得的证书</div>
        <div class="certificate-wrap">
          <div class="certificate-self" v-for="(item, index) in certificateList" :key="index">
            <div class="certificate-img">
              <div class="ranking">一等奖</div>
              <div class="qr"><img src="../public/images/qr-code.svg" alt=""></div>
              <div class="user-info">
                <div class="activity-title">青年文采大赛</div>
                <div class="english-title">Youth Literary Competition</div>
                <div class="name">向前进</div>
                <div class="id-cad">身份证号：430626199912096226</div>
                <div class="school">学校：深圳实验中学</div>
                <div class="grade">年级：高二</div>
                <div class="classroom">班级：708班</div>
                <div class="sponsor">主办方：腾讯智趣</div>
                <div class="activ-name">活动名称：青年文采大赛</div>
              </div>
            </div>
            <div class="activity-name">{{item.name}}</div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
  import HighCharts from '../components/highcharts';

  export default {
    name: 'activity-center',
    components: { HighCharts },
    data() {
      return {
        currentPage: 1, // 初始页
        pageSize: 10,
        total: 0,
        tableData: [],
        day: '',
        certificateList: [
          { img: '0', name: '活动名称' },
          { img: '0', name: '活动名称' },
          { img: '0', name: '活动名称' },
          { img: '0', name: '活动名称' },
          { img: '0', name: '活动名称' },
          { img: '0', name: '活动名称' },
          { img: '0', name: '活动名称' },
          { img: '0', name: '活动名称' }
        ],
        statusMap: {
          ACTIVITY_WAITING_AUDIT: '待审核',
          STAGE_PREPARE: '活动预热',
          STAGE_WORK_UPLOAD: '作品上传（提交作品）',
          STAGE_WORK_AUDIT: '作品审核',
          STAGE_WORK_PRE_JUDGE: '作品预审',
          STAGE_WORK_JUDGE: '作品评审',
          STAGE_WORK_SHOW: '作品公示',
          STAGE_EXCELLENT_WORK_SHOW: '优秀作品展示',
          ACTIVITY_RUNNING: '进行中'
        },
        abilityOpt: {}
      };
    },
    computed: {
      user() {
        return this.$store.state.account.user;
      }
    },
    mounted() {
      this.getActivityList();
      this.getAbility();
    },
    methods: {
      async handleCurrentChange(page) {
        this.currentPage = page;
        this.getActivityList();
      },
      async getActivityList() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetMyApplyActivityList',
          PageSize: this.pageSize,
          PageNum: this.currentPage
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;

        this.tableData = res.Data.ActivityList;
        this.total = res.Data.Total;
      },
      async getAbility() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetAbilityRadar'
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;

        this.renderChart(res.Data.AbilityList);
      },
      renderChart(list = []) {
        let xAxis = [], data = [];
        list.forEach(item => {
          xAxis.push(item.Name);
          data.push(item.Value);
        });
        let options = {
          show: true,
          chart: {
            polar: true,
            type: 'line'
          },
          title: {
            text: '我的能力图谱'
          },
          pane: {
            size: '65%'
          },
          xAxis: {
            categories: xAxis,
            tickmarkPlacement: 'on',
            lineWidth: 0
          },
          yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
          },
          legend: {
            enabled: false
          },
          series: [{
            name: '能力值',
            data: data,
            pointPlacement: 'on'
          }]
        };
        this.abilityOpt = options;
      },
      goToActDetail(item) { // 跳转活动详情页
        if (item.Status == 'ACTIVITY_WAITING_AUDIT') return;
        this.$router.push({
          path: '/activity/process',
          query: {
            ActivityId: item.ActivityId
          }
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  .user-center {
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    .user-wrap {
      width: 1180px;
      margin: auto;
      .user-content {
        width: 100%;
        display: flex;
        .user-left {
          width: 830px;
          height: 560px;
          border: 1px solid #E6E6E6;
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
          width: 330px;
          height: 560px;
          border: 1px solid #E6E6E6;
          .user-info-wrap {
            display: flex;
            margin: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #E6E6E6;
            .user-head-left {
              width: 95px;
              height: 95px;
              background: khaki;
              border-radius: 4px;
              margin-right: 20px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .user-head-right {
              .user-name {
                font-size: 18px;
              }
              .user-tel {
                font-size: 16px;
                color: #888888;
                margin: 10px 0;
              }
            }
          }
          .user-info-atlas {
            .atlas-title {
              font-size: 16px;
              text-align: center;
            }
          }
        }
      }
      .user-certificate {
        width: 830px;
        height: 529px;
        margin-top: 20px;
        padding: 35px 20px 0 20px;
        border: 1px solid #E6E6E6;
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
              background: url('../public/images/template.png') no-repeat;
              background-size: 100%;
              position: relative;
              padding-top: 8px;
              .ranking {
                position: absolute;
                top: 22px;
                right: 23px;
                font-size: 4px;
                color: #F4DA98;
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
                .id-cad, .school, .grade, .classroom, .sponsor, .activ-name {
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
