<template>
  <div class="activity-statistic">
    <el-card class="apply-num">
      <high-charts :options="applyNumOpt"></high-charts>
    </el-card>
    <el-card class="learn">
      <div class="xueke">
        <high-charts :options="xuekeOpt"></high-charts>
      </div>
      <div class="xueduan">
        <high-charts :options="xueduanOpt"></high-charts>
      </div>
    </el-card>
    <el-card class="activity-table">
      <div class="quyu-table">
        <el-table :data="areaData" height="400" width="95%">
          <el-table-column prop="DivisionName" label="区"></el-table-column>
          <el-table-column prop="ApplyNum" label="报名数"></el-table-column>
          <el-table-column prop="WorkNum" label="作品数"></el-table-column>
        </el-table>
      </div>
      <div class="school-table">
        <el-table :data="schoolData" height="400" width="95%">
          <el-table-column prop="DivisionName" label="学校"></el-table-column>
          <el-table-column prop="ApplyNum" label="报名数"></el-table-column>
          <el-table-column prop="WorkNum" label="作品数"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
  import HighCharts from '../../components/highcharts';
  import { timeFormat } from '../../tools/tools';

  export default {
    name: 'activity-statistic',
    components: { HighCharts },
    data() {
      return {
        applyNumOpt: {}, // 报名人数
        xuekeOpt: {}, // 学科分布
        xueduanOpt: {}, // 学段分布
        areaData: [], // 区列表
        schoolData: [], // 学校列表
        activityId: '' // 活动id
      };
    },
    mounted() {
      this.activityId = this.$route.query.id;
      this.getApplyNumData();
      this.getXueKeData();
      this.getXueDuanData();
      this.getTableData();
    },
    methods: {
      async getApplyNumData() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetApplyUserNum',
          ActivityId: this.activityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

        let dataList = res.Data.DataList || [];
        let xAxis = [], data = [];
        for (let item of dataList) {
          let time = new Date(item.datetime * 1000);
          xAxis.push(timeFormat(time, 'yyyy-MM-dd'));
          data.push(item.value);
        }
        let options = {
          show: true,
          chart: { type: 'spline' },
          title: {
            text: null
          },
          yAxis: {
            title: {
              text: null
            }
          },
          xAxis: {
            categories: xAxis
          },
          series: [{
            name: '报名人数',
            data: data
          }]
        };
        this.applyNumOpt = options;
      },
      async getXueKeData() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetWorkCountBySubject',
          ActivityId: this.activityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

        let dataList = res.Data.SubjectList || [];
        let data = [];
        for (let item of dataList) {
          data.push({
            name: item.Name,
            y: item.Num
          });
        }
        let options = {
          show: true,
          chart: { type: 'pie' },
          title: {
            text: '学科分布'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [
            {
              name: '学科',
              data: data
            }
          ]
        };
        this.xuekeOpt = options;
      },
      async getXueDuanData() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetWorkCountByTerm',
          ActivityId: this.activityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

        let dataList = res.Data.TermList || [];
        let data = [], xAxis = [];
        for (let item of dataList) {
          xAxis.push(item.Name);
          data.push(item.Num);
        }
        let options = {
          show: true,
          chart: { type: 'column' },
          title: {
            text: '学段分布'
          },
          yAxis: {
            title: {
              text: null
            }
          },
          xAxis: {
            categories: xAxis
          },
          plotOptions: {
            column: {
              borderRadius: 4,
              pointPadding: 0.3,
              borderWidth: 0,
              stacking: 'normal'
            }
          },
          series: [
            {
              name: '学段',
              data: data
            }
          ]
        };
        this.xueduanOpt = options;
      },
      async getTableData() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetDivisionStatistics',
          ActivityId: this.activityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

        let data = res.Data;
        this.areaData = data.AreaData;
        this.schoolData = data.SchoolData;
      }
    }
  };
</script>
<style lang="less">
  .activity-statistic {
    .learn {
      .el-card__body {
        display: flex;
        justify-content: space-around;
      }
    }
    .el-card {
      margin-bottom: 20px;
    }
    .activity-table {
      .el-card__body {
        display: flex;
      }
      .quyu-table {
        flex: 1;
        margin-right: 10px;
      }
      .school-table {
        flex: 1;
        margin-left: 10px;
      }
    }
  }
</style>
