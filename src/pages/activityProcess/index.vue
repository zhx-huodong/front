<template>
  <div class="activity-publicity">
    <div class="activity-wrap">
      <div class="activity-left">
        <prepare v-if="currentStage == 'STAGE_PREPARE'"></prepare>
        <work-upload v-if="currentStage == 'STAGE_WORK_UPLOAD'" :stage="currentStage"></work-upload>
        <work-upload v-if="currentStage == 'STAGE_WORK_AUDIT'" :stage="currentStage"></work-upload>
        <work-show key='work-show1' v-if="currentStage == 'STAGE_WORK_SHOW'" :stage="currentStage"></work-show>
        <expert-jude key='expert-jude1' v-if="currentStage == 'STAGE_WORK_PRE_JUDGE'" :stage="currentStage"></expert-jude>
        <expert-jude key='expert-jude2' v-if="currentStage == 'STAGE_WORK_JUDGE'" :stage="currentStage"></expert-jude>
        <work-show key='work-show2' v-if="currentStage == 'STAGE_EXCELLENT_WORK_SHOW'" :stage="currentStage"></work-show>
      </div>
      <!-- <div class="activity-right" v-if="stageList.length > 0">
        <flow-steps :stage-list="stageList" :stage="currentStage" @changeStage="changeStage"></flow-steps>
      </div> -->
    </div>
  </div>
</template>
<script>
  import FlowSteps from './FlowSteps';
  import Prepare from './prepare'; // 活动预热
  import WorkUpload from './workUpload'; // 作品上传
  import WorkShow from './workShow'; // 作品展示
  import ExpertJude from './expertJudge'; // 专家评审

  export default {
    components: { FlowSteps, Prepare, WorkUpload, WorkShow, ExpertJude },
    data() {
      return {
        activityId: 1,
        currentStage: '', // 当前阶段
        stageList: []
      };
    },
    mounted() {
      this.activityId = this.$route.query.ActivityId;
      this.getStageList();
    },
    methods: {
      async getStageList() {
        // let res = await this.axiosGet({
        //   url: '/v1/activity/GetStageList',
        //   ActivityId: this.activityId
        // }).catch(err => err);
        // if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        // this.currentStage = res.Data.Current;
        // this.stageList = res.Data.StageList || [];
        this.currentStage='STAGE_WORK_SHOW';
        console.log(this.currentStage)
        
      },
      changeStage(val) {
        this.currentStage = val;
      }
    }
  };
</script>
<style lang="less">
  .activity-publicity {
    width: 100%;
    margin-top: 47px;
    .activity-wrap {
      width: 1180px;
      margin: auto;
      display: flex;
      .activity-left {
        width: 690px;
        height: auto;
        margin-right: 100px;
      }
      .activity-right {
        flex: 1;
      }
    }
  }
</style>
