<template>
	<div class="activity-center">
		<el-card style="min-height:650px;">
			<div class="activity-wrap">
				<!-- <div class="activity-header"></div> -->
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
							<el-tab-pane label="活动中心" name="first">
				<div class="activity-lable">
					
					
					<type-select v-if="gradeList.length > 0 && regionList.length > 0"
						:gradeList="gradeList" :regionList="regionList"
						@activityObject='activityObjectMgr' @gradeGroup='gradeGroupMgr' @region='regionMgr'></type-select>
				</div>
				<div class="activity-content" v-if="activityList.length > 0">
					<activity-list :activityList="activityList" :goToDetail="excellentWork"></activity-list>
				</div>
				<div class="activity-page">
					<el-pagination
					background
					:current-page="currentPage"
					:page-size="pageSize"
					layout="prev, pager, next"
					:total="total"
					class="paging"
					@current-change="handleCurrentPage"
					></el-pagination>
				</div>
				</el-tab-pane>
				<el-tab-pane label="优秀作品" name="second">
					<div class="activity-lable">
					<!-- <sec-topic></sec-topic> -->
					
						<type-select v-if="gradeList.length > 0 && regionList.length > 0"
							:gradeList="gradeList" :regionList="regionList"
							@activityObject='activityObjectMgr' @gradeGroup='gradeGroupMgr' @region='regionMgr'></type-select>
					</div>
					<div class="activity-content" v-if="activityList.length > 0">
						<activity-list :activityList="activityList" :goToDetail="excellentWork"></activity-list>
					</div>
					<div class="activity-page">
						<el-pagination
							background
							:current-page="currentPage"
							:page-size="pageSize"
							layout="prev, pager, next"
							:total="total"
							class="paging"
							@current-change="handleCurrentPage"
							></el-pagination>
						</div>
					</el-tab-pane>
				</el-tabs>

			</div>
		</el-card>
	</div>
</template>
<script>
	// import SecTopic from '../components/publishManage/SecTopic';
	import TypeSelect from '../components/TypeSelect';
	import ActivityList from '../components/ActivityList';
	export default {
		name: 'activity-center',
		components: { TypeSelect, ActivityList },
		data() {
			return {
				activeName: 'first',
				gradeList: [],
				subjectList: [],
				regionList: [
          { DivisionId: 0, Name: '全部' }
        ],
				region: '', // 区域
				gradeGroup: '', // 组别
				activityObject: '', // 活动对象
				activityList: [],
				excellentWork: 'activityDetail',
				dialogVisible: false,
				wechatVisible: false,
				currentPage: 1,
				pageSize: 12,
				total: 0,
        filter: {
          Role: 0, // 活动对象
          GradeGroup: 0, // 组别
          District: 0 // 区域
        }
			};
		},
		async created() {
			this.getGradeGroupList(); // 获取组别列表
			this.getRegionList(); // 获取区域列表
      		this.getActivityList();
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			async getActivityList() {
        // let res = await this.axiosGet({
        //   url: '/v1/activity/GetActivityList',
        //   Role: this.filter.Role,
        //   GradeGroup: this.filter.GradeGroup,
        //   District: this.filter.District,
        //   PageSize: this.pageSize,
        //   PageNum: this.currentPage
        // });
        // if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        // this.total = res.Data.Total;
        // let list = res.Data.ActivityList || [];
        // list.forEach(item => {
        //   item.StartTime = this.timeFormat(item.StartTime * 1000, 'yyyy-MM-dd');
        //   item.EndTime = this.timeFormat(item.EndTime * 1000, 'yyyy-MM-dd');
        // });
		// this.activityList = list;
			this.total=1
			let list=[
				{'ActivityLogo' : require('../assets/img2/1.png'), 'ActivityName' : '电脑绘图', 'ActivityId':1},
				{'ActivityLogo' : require('../assets/img2/2.png'), 'ActivityName' : '电脑动画'},
				{'ActivityLogo' : require('../assets/img2/3.png'), 'ActivityName' : '电脑艺术计'},
				{'ActivityLogo' : require('../assets/img2/4.png'), 'ActivityName' : '电子板报'},
				{'ActivityLogo' : require('../assets/img2/5.png'), 'ActivityName' : '艺术设计'},
				{'ActivityLogo' : require('../assets/img2/6.png'), 'ActivityName' : '创客项目'},
			];
			this.activityList = list;
			},
			async getGradeGroupList() {
				console.log("1")
				// let res = await this.axiosGet({
				//   url: '/v1/activity/GetGradeGroup'
				// }).catch(err => err);
				// this.gradeList = res.Data.GradeGroup;
				this.gradeList=[
				{ Id : 0, Name : '全部' },
				{ Id : 1, Name : '小学组' },
				{ Id : 2, Name : '初中组' },
				{ Id : 3, Name : '高中组' },
			]},
			async getRegionList() {
			// let res = await this.axiosGet({
			//   url: '/v1/activity/GetAllDivision'
			// }).catch(err => err);
			//  this.regionList = [
			//   { DivisionId: 0, Name: '全部' }
			// ].concat(res.Data.DivisionList);
				let res=[
					{Id:0, Name:'全部'},
					{Id:1, Name:'罗湖区'},
					{Id:2, Name:'南山区'},
					{Id:3, Name:'宝安区'},
					{Id:4, Name:'罗湖区'},
					{Id:5, Name:'盐田区'},
					{Id:6, Name:'龙岗区'},
				];
				this.regionList = [
				{ DivisionId: 0, Name: '全部' }
				].concat(res);
			},
			async activityObjectMgr(value) {
				this.filter.Role = value;
				this.currentPage = 1;
				this.getActivityList();
			},
			async gradeGroupMgr(value) {
				this.filter.GradeGroup = value;
				this.currentPage = 1;
				this.getActivityList();
			},
			async regionMgr(value) {
				this.filter.District = value;
				this.currentPage = 1;
				this.getActivityList();
			},
			handleCurrentPage(page) {
				this.currentPage = page;
				this.getActivityList();
			}
		}
	};
</script>
<style lang="less">
.activity-center{
	.el-dialog{
		border-radius: 4px;
	}
	.el-dialog__header{
		padding: 0;
	}
}
</style>
<style lang="less" scoped>
.activity-center{
	width: 1180px;
	margin: auto;
	margin-top: 20px;
  .activity-self {
    height: 255px;
  }
	.activity-wrap{
		.activity-header{
			width: 100%;
			height: 120px;
			font-size: 28px;
			line-height: 120px;
			text-align: center;
			color: #fff;
			background: url('../public/images/banner.png');
      		background-size: cover;
			border-radius: 4px;
			margin-bottom: 20px;
		}
		.activity-page{
			text-align: center;
			margin-top: 30px;
		}
	}
	.code-wrap{
		width: 126px;
		height: 126px;
		border: 1px solid #EEEEEE;
		margin: auto;
		img{
			width: 126px;
			height: 126px;
		}
	}
	.code-title{
		font-size: 14px;
		color: #606266;
		text-align: center;
		margin-top: 10px;
	}
	.code-text{
		font-size: 16px;
		text-align: center;
		color: #303133;
		margin: 20px 0 10px 0;
	}
	.code-hit{
		font-size: 14px;
		color: #909399;
		text-align: center;
		margin-bottom: 20px;
	}
	.code-btn{
		width: 160px;
		height: 40px;
		line-height: 40px;
		background: #2568ED;
		text-align: center;
		color: #fff;
		border-radius:4px;
		margin: 0 auto;
	}
}
</style>
