<template>
  <div class="warrp">
    <div class="active-warrp">
      <div class="active-title">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item @click.native="goToMyAct">
            <span class="link-btn">我发布的活动</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>活动_{{activityName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="active-tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="活动设置" name="first"></el-tab-pane>
          <el-tab-pane label="报名信息" name="second"></el-tab-pane>
          <el-tab-pane label="作品审核" name="third"></el-tab-pane>
          <el-tab-pane label="作品评奖" name="fourth"></el-tab-pane>
          <el-tab-pane label="活动统计" name="five"></el-tab-pane>
          <el-tab-pane label="用户反馈" name="six"></el-tab-pane>
        </el-tabs>
        <activity-setting v-if="activeName == 'first'"></activity-setting>
        <apply-message v-if="activeName == 'second'"></apply-message>
        <production-message v-if="activeName == 'third'"></production-message>
        <works-in v-if="activeName == 'fourth'"></works-in>
        <statistics v-if="activeName == 'five'"></statistics>
        <feed-back v-if="activeName == 'six'"></feed-back>
      </div>
    </div>
  </div>
</template>
<script>
  import ActivitySetting from './ActivitySetting.vue';
  import ApplyMessage from './ApplyMessage.vue';
  import ProductionMessage from './ProductionMessage.vue';
  import WorksIn from './WorksIn.vue';
  import FeedBack from './FeedBack.vue';
  import Statistics from './statistics';

  export default {
    components: { ActivitySetting, ApplyMessage, ProductionMessage, WorksIn, FeedBack, Statistics },
    data() {
      return {
        activeName: '',
        activityName: ''
      };
    },
    watch: {
      activeName(val) {
        location.hash = val;
      }
    },
    mounted() {
      this.activeName = location.hash.substr(1) || 'first';
      this.activityName = this.$route.query.title || '活动名称';
    },
    methods: {
      goToMyAct() {
        this.$router.push('/myActivity');
      }
    }
  };
</script>
<style lang="less" scoped>
  .warrp {
    display: flex;
    justify-content: center;
    align-items: center;
    .active-warrp {
      width: 1180px;
      margin-top: 20px;
      .active-title {
        &:hover {
          cursor: pointer;
        }
        color: #475669;
        font-size: 13px;
        margin-bottom: 20px;
      }
    }
  }
</style>
<style lang="less">
  .active-tab {
    .el-tabs__active-bar {
      background-color: #2568ED;
    }
    .el-tabs__item.is-active {
      color: #2568ED;
    }
    .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
      padding-left: 0;
    }
    .el-table_3_column_14 {
      color: #888888;
    }
    .el-table_1_column_5 {
      color: #888888;
    }
    .el-button--text {
      color: #2568ED;
    }
  }
</style>
