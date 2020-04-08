<template>
  <div class="activity-expert-judge">
    <div class="info" v-if="loaded">
      <span v-if="!award">暂无获奖信息</span>
      <span v-else>{{ award.Message }}</span>
    </div>
    <div class="expert-img"></div>
  </div>
</template>
<script>
  export default {
    name: 'activity-expert-judge',
    props: {
      stage: { type: String }
    },
    data() {
      return {
        activityId: '',
        award: '', // 获奖信息
        loaded: false
      };
    },
    mounted() {
      this.activityId = this.$route.query.ActivityId;
      // this.getAward();
    },
    methods: {
      async getAward() {
        let res = await this.axiosGet({
          url: '/v1/activity/AwardStatus',
          ActivityId: this.activityId,
          StageId: this.stage
        }).catch(err => err);
        this.loaded = true;
        if (res.ErrorCode != 'OK') return;
        let awardList = res.Data.AwardList;
        if (awardList && awardList[0]) this.award = awardList[0];
      }
    }
  };
</script>
<style lang="less">
  .activity-expert-judge {
    height: 100%;
    position: relative;
    background: rgba(242,251,255,1);
    .info {
      position: absolute;
      font-size: 18px;
      color: #2568ED;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
    }
    .expert-img {
      position: absolute;
      width: 334px;
      height: 136px;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      background: url('../../public/images/empty.svg')
    }
  }
</style>
