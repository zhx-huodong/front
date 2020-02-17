<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="Content" label="内容" show-overflow-tooltip></el-table-column>
      <el-table-column prop="UserName" label="姓名" width="150"></el-table-column>
      <el-table-column prop="CreateTime" label="日期" width="180">
        <template slot-scope="scope">
          {{ timeFormat(scope.row.CreateTime * 1000, 'yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="PageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    props: { type: String, required: true },
    data() {
      return {
        activityId: '',
        currentPage: 1, // 初始页
        PageSize: 10,
        total: 0,
        tableData: []
      };
    },
    mounted() {
      this.activityId = this.$route.query.id;
      if (this.activityId) this.init();
    },
    methods: {
      async init() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetFeedbackList',
          ActivityId: this.activityId,
          PageNum: this.currentPage - 1,
          PageSize: this.PageSize
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

        this.tableData = res.Data.FeedbackList;
        this.total = res.Data.Total;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.init(this.PageSize, this.currentPage);
      }
    }
  };
</script>
