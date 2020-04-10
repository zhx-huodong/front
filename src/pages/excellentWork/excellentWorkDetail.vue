<template>
<div class="excellent-work-detail">
  <div class="work-title">资源展示 / {{workName}}</div>
  <div class="work-detail-wrap">
    <work-detail class="work-vido" :WorkId="workId"></work-detail>
  </div>
</div>
</template>
<script>
import WorkDetail from '../../components/WorkDetail';
export default {
  components: { WorkDetail },
  data() {
    return {
      workId: '',
      workName: ''
    };
  },
  async created() {
    this.workId = +this.$route.query.WorkId;
    this.workName = this.$route.query.WorkName;
  }
};
</script>
<style lang="less">
.excellent-work-detail{
  width: 1180px;
  margin: 0 auto;
  .work-title{
    font-size: 12px;
    color: #888888;
    margin: 20px 0;
  }
  .work-detail-wrap{
    padding: 20px;
    border: 1px solid #E5E5E5;
    .work-vido{
      width: 100%;
    }
  }
}
</style>
