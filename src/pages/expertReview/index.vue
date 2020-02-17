<template>
  <div class="warrp">
    <div class='audit-center'>
      <div class='audit-lable'>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待评审的作品" name="first">
            <div class="audit-table">
              <el-table :data='tableData' style='width: 100%'>
                <el-table-column prop='Title' label='作品名称'></el-table-column>
                <el-table-column prop='ActivityName' label='活动名称'></el-table-column>
                <el-table-column prop='Category' label='类别'>
                  <template slot-scope="scope">
                    {{ typeMap[scope.row.Category] }}
                  </template>
                </el-table-column>
                <el-table-column prop='CreatedTime' label='提交时间'>
                  <template slot-scope="scope">
                    {{ timeFormat(new Date(scope.row.CreatedTime * 1000), 'yyyy-MM-dd hh:mm:ss') }}
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope='scope'>
                    <el-button @click="goToWorkDetail(scope.row, 0)" type='text' size='small'>评审</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已评审的作品" name="second">
            <div class="audit-table">
              <el-table :data='tableData' style='width: 100%'>
                <el-table-column prop='Title' label='作品名称'></el-table-column>
                <el-table-column prop='ActivityName' label='活动名称'></el-table-column>
                <el-table-column prop='Category' label='类别'>
                  <template slot-scope="scope">
                    {{ typeMap[scope.row.Category] }}
                  </template>
                </el-table-column>
                <el-table-column prop='CreatedTime' label='提交时间'>
                  <template slot-scope="scope">
                    {{ timeFormat(new Date(scope.row.CreatedTime * 1000), 'yyyy-MM-dd hh:mm:ss') }}
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope='scope'>
                    <el-button @click='goToWorkDetail(scope.row, 1)' type='text' size='small'>查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-pagination
            background
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total"
            class="paging"
            @current-change="handleCurrentPage"
          ></el-pagination>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        select: false,
        selector: true,
        activeName: 'first',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        scoreStatus: 0, // 未评审
        divisionId: 1, // 赛区id
        tableData: [],
        workId: '',
        typeMap: {}
      };
    },
    mounted() {
      this.scoreStatus = location.hash.substr(1) || '0';
      this.activeName = this.scoreStatus == '0' ? 'first' : 'second';
      this.getActivityType();
      this.getJudgeWorkList();
    },
    methods: {
      async getJudgeWorkList() {
        this.tableData = [];
        let res = await this.axiosGet({
          url: '/v1/activity/GetWorkListByJudge',
          ScoreStatus: this.scoreStatus,
          PageNum: this.currentPage,
          PageSize: this.pageSize
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        this.tableData = res.Data.WorkList || [];
        this.total = res.Data.Total;
      },
      async handleClick(tab) {
        this.currentPage = 0;
        if (tab.name == 'first') this.scoreStatus = 0;
        else if (tab.name == 'second') this.scoreStatus = 1;
        location.hash = this.scoreStatus;
        this.getJudgeWorkList();
      },
      handleCurrentPage(page) {
        this.currentPage = page;
        this.getJudgeWorkList();
      },
      goToWorkDetail(item, status) {
        this.$router.push({
          path: '/expertReview/workDetail',
          query: {
            WorkId: item.WorkId,
            WorkName: item.Title,
            status: status,
            DivisionId: item.DivisionId
          }
        });
      },
      async getActivityType() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetActivityType'
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;
        let list = res.Data.ActivityTypeList || [];
        list.forEach(item => {
          this.typeMap[item.Id] = item.Name;
        });
      }
    }
  };
</script>
<style lang="less" scope>
  .warrp {
    display: flex;
    justify-content: center;
    align-items: center;
    .audit-center {
      width: 1180px;
    }
    .el-pagination {
      margin: 30px auto;
      text-align: left;
    }
  }
</style>
<style lang='less'>
  .audit-lable {
    .el-tabs__active-bar {
      background-color: #2568ED;
    }
    .el-tabs__item.is-active {
      color: #2568ED;
    }
    .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
      padding-left: 0;
    }
    .el-table td, .el-table th {
      padding: 8px 0 7px 0;
    }
    .el-button--text {
      color: #2568ED;
    }
  }
</style>
