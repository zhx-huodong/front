<template>
  <div>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column prop="UserName" label="报名人姓名" width="180"></el-table-column>
      <el-table-column prop="Phone" label="联系电话" width="180"></el-table-column>
      <el-table-column prop="DivisionName" label="区域"></el-table-column>
      <el-table-column prop="School" label="所在学校"></el-table-column>
      <el-table-column prop="ApplyTime" label="报名时间">
        <template slot-scope="scope">
          {{ timeFormat(scope.row.ApplyTime * 1000, 'yyyy-MM-dd')}}
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
    prop: {
      type: String, required: true
    },
    data() {
      return {
        currentPage: 1, // 初始页
        PageSize: 10,
        total: 0,
        ActivityId: '',
        tableData: []
      };
    },
    created() {
      this.ActivityId = +this.$route.query.id;
      this.getList();
    },
    methods: {
      async getList() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetApplyUserList',
          ActivityId: this.ActivityId,
          PageNum: this.currentPage,
          PageSize: this.PageSize
        }).catch(err => err);
        this.tableData = res.Data.ApplyUserList;
        this.total = res.Data.Total;
      },
      handleCurrentChange(page) {
        this.currentPage = page;
        this.getList();
      }
    }
  };
</script>
