<template>
  <div class="elcellent-work">
    <div class="elcellent-title">
      资源展示 / <span style="font-weight: bold">{{ActivityName}}</span>优秀作品
    </div>
    <div class="activity-lable">
      <type-select :gradeList="gradeList" :subjectList="subjectList" :regionList="regionList" toPage="elcellent"
			  @award='awardMgr' @gradeGroup='gradeGroupMgr' @subject='subjectMgr' @region='regionMgr'></type-select>
    </div>
    <div class="activity-content">
      <activity-list :activityList="activityList" :goToDetail="'excellentWorkDetail'"></activity-list>
			<el-pagination
				layout="prev, pager, next"
				:total="totalCount"
				:page-size="pagesize"
				:current-page="currentPage"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange">
			</el-pagination>
    </div>
  </div>
</template>
<script>
  import TypeSelect from '../../components/TypeSelect';
	import ActivityList from '../../components/ActivityList';
  export default {
    components: { TypeSelect, ActivityList },
    data() {
      return {
        gradeList: [],
				subjectList: [],
				regionList: [],
				award: 0, // 奖项
				region: 0, // 活动类型
				gradeGroup: 0, // 组别
        subject: 0, // 学科类型
        activityList: [],
				ActivityId: '',
        ActivityName: '',
				SchoolSection: '', // 组别
				currentPage: 1, // 初始页
				pagesize: 10,
				totalCount: 0
      };
		},
    mounted() {
			this.ActivityId = this.$route.query.id;
			this.ActivityName = this.$route.query.name;
			this.getGradeGroup();
			this.getSubjectList();
			this.getAllDivision();
			this.onExcellentWorkList();
		},
    methods: {
			async onExcellentWorkList() {
				let res = await this.axiosGet({
					url: '/v1/activity/GetExcellentWorkList',
					ActivityId: this.ActivityId,
					GradeId: this.award,
					Subject: this.subject,
					SchoolSection: this.gradeGroup,
					DivisionId: this.region,
					PageNum: 0,
					PageSize: this.pagesize
				}).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

        this.activityList = res.Data.WorkList;
        this.totalCount = res.Data.Total;
			},
      async getGradeGroup() { // 获取组别列表
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
				this.onExcellentWorkList();
			},
			async gradeGroupMgr(value) {
				this.gradeGroup = value;
				this.onExcellentWorkList();
			},
			async subjectMgr(value) {
				this.subject = value;
				this.onExcellentWorkList();
			},
			async regionMgr(value) {
				this.region = value;
				this.onExcellentWorkList();
			},
			handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
				this.onExcellentWorkList();
      }
		}
  };
</script>
<style lang="less" scoped>
.elcellent-work{
  width: 1180px;
  margin: 0 auto;
  .elcellent-title{
    font-size: 12px;
    color: #888888;
    margin: 20px 0;
  }
}
.el-pagination{
  margin: 30px auto;
  text-align: left;
}
</style>
