<template>
  <div class="excellent-work-list">
    <div class="work-show" v-if="activityList.length > 0">
      <activity-list :activityList="activityList" :goToDetail="excellentWork"></activity-list>
    </div>
  </div>
</template>
<script>
  import ActivityList from '../../components/ActivityList';
  export default {
    name: 'activity-center',
    components: { ActivityList },
    data() {
      return {
        activityList: [],
        excellentWork: 'excellentWork'
      };
    },
    async created() {
      let res = await this.axiosGet({
        url: '/v1/activity/GetExcellentWorkCategory'
      }).catch(err => err);
      if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

      let list = res.Data.CategoryList || [];
      list.forEach(item => {
        item.StartTime = this.timeFormat(item.StartTime * 1000, 'yyyy-MM-dd');
        item.EndTime = this.timeFormat(item.EndTime * 1000, 'yyyy-MM-dd');
      });
      this.activityList = list;
    }
  };
</script>
<style lang="less">
  .excellent-work-list {
    .work-show {
      width: 1180px;
      margin: 20px auto 0 auto;
      .activity-self {
        width: 280px;
        height: 280px;
      }
    }
  }
</style>
