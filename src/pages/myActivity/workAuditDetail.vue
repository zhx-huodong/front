<template>
  <div class="work-audit-detail">
    <div class="work-title">
      <el-button type="text" style="font-size: 16px" @click="goBack">返回</el-button>
    </div>
    <div class="work-detail-wrap" v-if="workId">
      <work-detail class="work-video" :WorkId="workId"></work-detail>
    </div>
  </div>
</template>
<script>
  import WorkDetail from '../../components/WorkDetail';

  export default {
    components: { WorkDetail },
    data() {
      return {
        activityId: '',
        workId: '',
        title: '',
        curStatus: ''
      };
    },
    methods: {
      goBack() {
        this.$router.push({
          path: `/myActivity/index?id=${this.activityId}&title=${this.title}&curStatus=${this.curStatus}#third`
        });
      }
    },
    mounted() {
      this.activityId = this.$route.query.activityId;
      this.title = this.$route.query.title;
      this.workId = this.$route.query.workId;
      this.curStatus = this.$route.query.curStatus;
    }
  };
</script>
<style lang="less">
  .work-audit-detail {
    width: 1180px;
    margin: 0 auto;
    .work-detail-wrap {
      padding: 20px;
      border: 1px solid #E5E5E5;
      .work-vido {
        width: 100%;
      }
      .aduit-list {
        color: #333333;
        font-size: 14px;
        margin-top: 15px;
        font-weight: bold;
        padding-bottom: 10px;
      }
      .aduit-bottom {
        width: 70%;
        margin-left: 20px;
        border-bottom: 1px solid #ebeef5;
        .box {
          border-top: 1px solid #ebeef5;
          display: flex;
          align-items: center;
          .el-select {
            width: 75px;
          }
          .box-btn {
            margin-right: 240px;
            color: #606266;
            font-size: 14px;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
</style>
