<template>
  <div class="message-warrp">
    <div class="message-center">
      <div class="message-title">消息中心</div>
      <div class="message-lable">
        <el-table ref="multipleTable" :data="tableData" style="width: 100%">
          <el-table-column label="时间" prop="UpdatedTime" width="120">
            <template slot-scope="scope">
              {{ timeFormat(scope.row.UpdatedTime * 1000, 'yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column label="标题" prop="Title" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.Title }}</span>
              <el-button v-if="scope.row.Type == 1" type="text" @click="messageDetail(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
          <el-table-column label="内容" prop="Abstract" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="PageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        currentPage: 1,
        PageSize: 10,
        total: 0,
        MessageId: '',
        day: ''
      };
    },
    async created() {
      this.init();
      let res = await this.axiosGet({
        url: '/v1/message/GetUserMessageList',
        AppId: 1567654633,
        PageNum: this.currentPage,
        PageSize: this.PageSize
      }).catch(err => err);
      this.total = res.Data.Total;
    },
    methods: {
      async init() {
        let res = await this.axiosGet({
          url: '/v1/message/GetUserMessageList',
          AppId: 1567654633,
          PageNum: this.currentPage,
          PageSize: this.PageSize
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;
        this.tableData = res.Data.MessageList;
      },
      handleCurrentChange(page) {
        this.currentPage = page;
        this.init();
      },
      async messageDetail(item) { // 通过消息id查询作品id，再跳到作品详情页
        let res = await this.axiosGet({
          url: '/v1/message/GetUserMessage',
          MessageId: item.MessageId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        let content = JSON.parse(res.Data.Content || '{}'); // 获取作品id
        this.$router.push({
          path: '/myActivity/workAuditDetail',
          query: {
            activityId: content.ActivityId,
            title: content.Title,
            workId: content.WorkId,
            curStatus: 3
          }
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  .message-warrp {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    .message-center{
       width: 1180px;
     .message-title {
      font-size: 12px;
      color: #888888;
      padding-bottom: 37px;
     }
     .el-pagination {
       margin: 30px auto;
       text-align: center;
     }
    }
  }
</style>
<style lang='less'>
  .message-lable {
    .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
      padding-left: 0;
    }
    .el-table td, .el-table th {
      padding: 8px 0 7px 0;
      color: #888888;
      font-size: 14px;
    }
  }
</style>
