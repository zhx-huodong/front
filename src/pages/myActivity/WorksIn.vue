<template>
  <div>
    <div class="work-warrp">
      <div class="activity-lable">
        <type-select
          :gradeList="gradeList" :subjectList="subjectList" :regionList="regionList"
          :hide-region="IsDivisionAdmin" toPage="elcellent"
          @award='awardMgr' @gradeGroup='gradeGroupMgr' @subject='subjectMgr' @region='regionMgr'></type-select>
      </div>
    </div>
    <div class="work-box">
      <el-button
        v-for="(item, id) in list" :key="id"
        @click="action(id, item.key)"
        :disabled="selectedList.length == 0">{{item.name}}</el-button>
      <el-button @click="download">导出作品信息</el-button>
      <div class="work-box-title">已选择数量：{{selectedList.length}}</div>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
              @selection-change="handleSelect">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="优秀作品" show-overflow-tooltip width="200">
        <template slot-scope="scope">{{ scope.row.Title }}</template>
      </el-table-column>
      <el-table-column prop="TeamName" label="提交人"></el-table-column>
      <el-table-column prop="CreatedTime" label="提交时间">
        <template slot-scope="scope">
          {{ timeFormat(scope.row.CreatedTime * 1000, 'yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="Score" label="评分"></el-table-column>
      <el-table-column prop="GradeName" label="奖项">
        <template slot-scope="scope">
          {{ scope.row.GradeName || '无' }}
        </template>
      </el-table-column>
      <!--<el-table-column label="是否设为优秀作品">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.IsExcellent == 1 ? '是' : '否' }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="是否推荐到市">
        <template slot-scope="scope">
          {{ scope.row.PushCity == 1 ? '是' : '否' }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="PageSize"
      :current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
  import TypeSelect from '../../components/TypeSelect';
  export default {
    props: { type: String, required: true },
    components: { TypeSelect },
    data() {
      return {
        gradeList: [],
        subjectList: [],
        regionList: [],
        award: 0, // 奖项
        region: 0, // 区域
        gradeGroup: 0, // 学段
        subject: 0, // 学科类型
        PageSize: 10,
        currentPage: 1,
        list: [
          { id: 1, name: '设为优秀作品', key: '优秀奖' },
          { id: 3, name: '设为一等奖', key: '一等奖' },
          { id: 4, name: '设为二等奖', key: '二等奖' },
          { id: 5, name: '设为三等奖', key: '三等奖' },
          { id: 6, name: '取消奖项', key: '未得奖' }
        ],
        tableData: [],
        ActivityId: '',
        total: 0,
        curFilter: 0, // 奖项
        selectedList: [],
        IsActivityAdmin: false,
        IsDivisionAdmin: false
      };
    },
    mounted() {
      this.ActivityId = this.$route.query.id;
      this.getAdmin();
      this.getGradeGroup();
      this.getSubjectList();
      this.getAllDivision();
      if (!this.ActivityId) return;
      this.getAwardsList();
    },
    methods: {
      async getAdmin() { // 判断是区还是市的管理员
        let res = await this.axiosGet({
          url: '/v1/activity/IsActivityAdmin',
          ActivityId: this.ActivityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        this.IsActivityAdmin = res.Data.IsActivityAdmin;
        this.IsDivisionAdmin = res.Data.IsDivisionAdmin;
        let list = [
          { id: 1, name: '设为优秀作品', key: '优秀奖' },
          { id: 3, name: '设为一等奖', key: '一等奖' },
          { id: 4, name: '设为二等奖', key: '二等奖' },
          { id: 5, name: '设为三等奖', key: '三等奖' },
          { id: 6, name: '取消奖项', key: '未得奖' }
        ];
        if (this.IsDivisionAdmin) { // 区管理员才展示推荐至市按钮
          list = list.concat([
            { id: 7, name: '推荐到市', key: 'push' },
            { id: 7, name: '取消推荐', key: 'unpush' }
          ]);
        }
        this.list = list;
      },
      async getAwardsList() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetWorkAwardsList',
          ActivityId: this.ActivityId,
          DivisionId: this.region,
          Subject: this.subject,
          SchoolSection: this.gradeGroup,
          PageSize: this.PageSize,
          PageNum: this.currentPage,
          GradeId: this.award
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

        this.tableData = res.Data.AwardsList;
        this.total = res.Data.Total;
      },
      async action(id, key) {
        let workIdList = this.selectedList.map(item => item.WorkId);
        let res;
        if (key == 'push') {
          res = await this.axiosPost({
            url: '/v1/activity/PushCityByAdmin',
            ActivityId: this.ActivityId,
            WorkIdList: workIdList,
            STATUS: 'PUSH'
          }).catch(err => err);
        } else if (key == 'unpush') {
          res = await this.axiosPost({
            url: '/v1/activity/PushCityByAdmin',
            ActivityId: this.ActivityId,
            WorkIdList: workIdList,
            STATUS: 'UNPUSH'
          }).catch(err => err);
        } else {
          res = await this.axiosPost({
            url: '/v1/activity/SetWorkAwards',
            WorkIdList: workIdList,
            Awards: key
          }).catch(err => err);
        }
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        this.$message.success('设置成功');
        this.getAwardsList();
      },
      async download() {
        let res = await this.axiosGet({
          url: '/v1/activity/DownloadWorkInfoList',
          ActivityId: this.ActivityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        let url = res.Data.CosUrl;
        window.open(url);
      },
      handleSelect(list) {
        this.selectedList = list;
      },
      handleSizeChange(val) {
        this.PageSize = val;
        this.getAwardsList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getAwardsList();
      },
      async getGradeGroup() { // 获取学段列表
        let res = await this.axiosGet({
          url: '/v1/activity/GetGradeGroup'
        }).catch(err => err);
        this.gradeList = res.Data.GradeGroup || [];
      },
      async getSubjectList() { // 获取科目列表
        let res = await this.axiosGet({
          url: '/v1/activity/GetSubjectList'
        }).catch(err => err);
        this.subjectList = res.Data.SubjectList || [];
      },
      async getAllDivision() { // 获取区域列表
        let res = await this.axiosGet({
          url: '/v1/activity/GetAllDivision'
        }).catch(err => err);
        this.regionList = [
          { DivisionId: 0, Name: '全部' }
        ].concat(res.Data.DivisionList || []);
      },
      async awardMgr(value) {
        this.award = value;
        this.getAwardsList();
      },
      async gradeGroupMgr(value) { // 学段
        this.gradeGroup = value;
        this.getAwardsList();
      },
      async subjectMgr(value) { // 学科
        this.subject = value;
        this.getAwardsList();
      },
      async regionMgr(value) {
        this.region = value;
        this.getAwardsList();
      }
    }
  };
</script>
<style lang="less" scoped>
  .work-warrp {
    display: flex;
    .work-show {
      color: #333333;
      font-size: 14px;
      margin-right: 10px;
      width: 60px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .active-box {
      display: flex;
      &:hover {
        cursor: pointer;
      }
      .active-box-item {
        width: 60px;
        height: 40px;
        border-radius: 4px;
        font-size: 14px;
        line-height: 40PX;
        color: #888888;
        margin-right: 20px;
        text-align: center;
      }
      .secectBackground {
        width: 60px;
        height: 40px;
        border-radius: 4px;
        font-size: 14px;
        background-color: #2568ED;
        margin-right: 20px;
        text-align: center;
        line-height: 40px;
        color: #FFFFFF
      }
    }
  }

  .work-box {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    .work-content {
      width: 124px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      font-size: 14px;
      color: #606266;
      margin-right: 20px;
    }
    .workBackground {
      width: 124px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      font-size: 14px;
      color: #FFFFFF;
      margin-right: 20px;
      background-color: #2568ED
    }
    .work-box-title {
      color: #606266;
      font-size: 14px;
      line-height: 38px;
      text-align: right;
      flex: 1;
    }
  }
</style>
