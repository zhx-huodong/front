<template>
  <div class="activity-work-show">
    <template v-if="workList.length > 0">
      <el-card class="work-list-item" v-for="(item, index) in workList" :key="index">
        <video :src="item.url" controls></video>
        <div class="name">{{ item.name }}</div>
        <div class="school">{{ item.school || '未知学校' }}</div>
      </el-card>
    </template>
    <div v-else class="no-data">暂无数据</div>
  </div>
</template>
<script>
  import ActivityList from '../../components/ActivityList';
  export default {
    name: 'activity-work-show',
    components: { ActivityList },
    data() {
      return {
        workList: [],
        activityId: ''
      };
    },
    props: {
      stage: { type: String }
    },
    mounted() {
      this.activityId = this.$route.query.ActivityId;
      if (this.stage == 'STAGE_WORK_SHOW') this.getAllWorkList();
      else if (this.stage == 'STAGE_EXCELLENT_WORK_SHOW') this.getExcellentWorkList();
    },
    methods: {
      async getAllWorkList() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetWorkList',
          ActivityId: this.activityId,
          Category: 0
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;
        let list = res.Data.WorkList || [];
        this.workList = list.map(item => {
          let resourceList = item.ResourceList;
          let video = resourceList.find(re => re.ResourceType == 4);
          return {
            name: item.TeamName,
            school: item.School,
            url: video.ResourceContent
          };
        });
      },
      async getExcellentWorkList() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetExcellentWorkList',
          ActivityId: this.activityId,
          GradeId: 5
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;
        let list = res.Data.WorkList || [];
        this.workList = list.map(item => {
          let resourceList = item.ResourceList;
          let video = resourceList.find(re => re.ResourceType == 4);
          return {
            name: item.TeamName,
            school: item.School,
            url: video.ResourceContent
          };
        });
      }
    }
  };
</script>
<style lang="less">
  .activity-work-show {
    .work-list-item {
      width: 325px;
      display: inline-block;
      margin: 0 15px 15px 0;
      text-align: center;
      .name {
        font-size: 16px;
        margin: 10px 0;
      }
      .school {
        font-size: 14px;
        color: #999999;
      }
      video {
        width: 100%;
      }
    }
    .no-data {
      text-align: center;
      color: #999999;
    }
  }
</style>
