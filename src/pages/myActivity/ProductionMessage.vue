<template>
  <div class="production-message">
    <div class="work-warrp">
      <div class="activity-lable">
        <type-select
          :gradeList="gradeList" :subjectList="subjectList" :regionList="regionList"
          :hide-region="IsDivisionAdmin" :hide-award="true" toPage="elcellent"
          @gradeGroup='gradeGroupMgr' @subject='subjectMgr' @region='regionMgr'></type-select>
      </div>
    </div>
    <el-tabs v-model="curStatus" @tab-click="filterData" style="width: 330px">
      <el-tab-pane label="待审核" name="1"></el-tab-pane>
      <el-tab-pane label="审核通过" name="2"></el-tab-pane>
      <el-tab-pane label="未审核通过" name="3"></el-tab-pane>
    </el-tabs>
    <div class="audit-pass" v-if="curStatus == 1">
      <el-button @click="changeStatus(1)" :disabled="checkedList.length == 0">通过</el-button>
      <el-button @click="changeStatus(2)" :disabled="checkedList.length == 0">不通过</el-button>
    </div>
    <div class="audit-pass" v-if="curStatus == 2">
      <el-button @click="changeStatus(2)" :disabled="checkedList.length == 0">不通过</el-button>
    </div>
    <div class="audit-pass" v-if="curStatus == 3">
      <el-button @click="changeStatus(1)" :disabled="checkedList.length == 0">通过</el-button>
    </div>
    <div class="activity-conts">
      <div class="acitivity-self" v-for="(item, index) in arr" :key="index">
        <el-checkbox @change="checkChange($event, item)" v-model="item.checked"></el-checkbox>
        <video
          v-if="item.ResourceList.length > 0"
          controls="controls"
          :src="item.ResourceList[0].ResourceContent"></video>
        <div class="activity-tex">
          <div class="avtive-title">{{item.TeamName}}</div>
          <div class="activity-time">
            <el-tooltip effect="dark" :content="item.School" placement="top" v-if="item.School.length > 8">
              <span>{{ item.School.substr(0, 8) }}</span>
            </el-tooltip>
            <span v-else>{{ item.School }}</span>
          </div>
          <a class="detail-tip" @click="auditClick(item)">详情</a>
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="PageSize"
      class="paging"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
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
        isShadeShow: false,
        show: true,
        total: 0,
        currentPage: 1, // 初始ye
        PageSize: 12,
        passIndex: 1,
        list: [],
        WorkId: '',
        Status: 1,
        auditShow: false,
        arr: [],
        activityId: '',
        checkedList: [], // 勾选的作品id列表
        curStatus: '',
        region: 0, // 区域
        gradeGroup: 0, // 学段
        subject: 0, // 学科类型
        IsActivityAdmin: false,
        IsDivisionAdmin: false
      };
    },
    created() {
      this.getGradeGroup();
      this.getSubjectList();
      this.getAllDivision();
      this.activityId = this.$route.query.id;
      this.getAdmin();
      this.curStatus = this.$route.query.curStatus || '1';
      this.getWorkList();
    },
    methods: {
      async getAdmin() { // 判断是区还是市的管理员
        let res = await this.axiosGet({
          url: '/v1/activity/IsActivityAdmin',
          ActivityId: this.activityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        this.IsActivityAdmin = res.Data.IsActivityAdmin; // 市管理员
        this.IsDivisionAdmin = res.Data.IsDivisionAdmin; // 区管理员
      },
      async getWorkList() {
        this.checkedList = [];
        let status = this.curStatus == 4 ? '1' : this.curStatus; // 推荐至市的必须是审核通过的
        let params = {
          url: '/v1/activity/GetWorkListByAdmin',
          Status: status, // 1待审核 2审核通过 3审核不通过
          PageNum: this.currentPage,
          PageSize: this.PageSize,
          ActivityId: this.activityId,
          DivisionId: this.region,
          SubjectId: this.subject,
          SchoolSection: this.gradeGroup
        };
        if (this.curStatus == 4) params.PushStatus = 'PUSH'; // 推荐至市
        let res = await this.axiosGet(params).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

        let list = res.Data.WorkList || [];
        list.forEach(item => item.checked = false);
        this.arr = list;
        this.total = res.Data.Total;
      },
      filterData(item) {
        this.curStatus = item.name;
        this.getWorkList();
      },
      handleCurrentChange(page) {
        this.currentPage = page;
        this.getWorkList();
      },
      async changeStatus(status) {
        if (this.checkedList.length == 0) return this.$message.error('请先选择作品');
        if (status == 1) {
          let res = await this.axiosPost({
            url: '/v1/activity/AuditWork',
            WorkIdList: this.checkedList,
            ActivityId: this.activityId,
            Status: 'WORK_AUDIT_ACCEPT',
            Message: '审核通过'
          }).catch(err => err);
          if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
          this.$message.success('审核通过');
        } else if (status == 2) {
          let res = await this.axiosPost({
            url: '/v1/activity/AuditWork',
            WorkIdList: this.checkedList,
            ActivityId: this.activityId,
            Status: 'WORK_AUDIT_REJECT',
            Message: '审核未通过'
          }).catch(err => err);
          if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
          this.$message.success('审核未通过');
        }
        this.getWorkList();
      },
      checkChange(event, item) {
        if (event) {
          this.checkedList.push(item.WorkId);
        } else {
          let delIndex = this.checkedList.indexOf(item.WorkId);
          this.checkedList.splice(delIndex, 1);
        }
      },
      auditClick(item) {
        this.$router.push({
          path: '/myActivity/workAuditDetail',
          query: {
            workId: item.WorkId,
            activityId: this.activityId,
            title: this.$route.query.title,
            curStatus: this.curStatus
          }
        });
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
      async gradeGroupMgr(value) { // 学段
        this.gradeGroup = value;
        this.getWorkList();
      },
      async subjectMgr(value) { // 学科
        this.subject = value;
        this.getWorkList();
      },
      async regionMgr(value) {
        this.region = value;
        this.getWorkList();
      }
    }
  };

</script>
<style lang="less">
  .audit-buttom {
    display: flex;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 15px;
    .audit-self {
      &:hover {
        cursor: pointer;
      }
      width: 95px;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      font-size: 14px;
      text-align: center;
      color: #606266;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
  }

  .audit-pass {
    display: flex;
    margin-bottom: 20px;
    .active-box-item {
      width: 95px;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      font-size: 14px;
      text-align: center;
      color: #606266;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .secectBackground {
      width: 95px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
      display: inline-block;
      background-color: #2568ED;
      text-align: center;
      line-height: 40px;
      color: #FFFFFF;
      border: 1px solid #ddd;
    }
  }

  .activity-conts {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    margin-right: -30px;
  }

  .activity-conts > * {
    margin-right: 30px;
    margin-bottom: 20px;
    width: 250px;
    height: 220px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    position: relative;
    white-space: normal;
    video {
      width: 100%;
      height: 180px;
    }
    .activity-tex {
      display: flex;
      justify-content: space-between;
    }
  }

  .type-active {
    width: 96px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff !important;
    background: #2568ed;
  }

  .acitivity-self {
    .el-checkbox__label {
      display: block;
      padding-left: 0;
    }
  }

  .detail-tip:hover {
    cursor: pointer;
  }
</style>
