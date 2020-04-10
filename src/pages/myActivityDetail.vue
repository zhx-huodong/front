<template>
  <div class="my-activity-detail" ref="myActivityDetail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item @click="$router.push('myActivity')">
        <span class="link-btn">我发布的活动</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>创建活动_{{activityName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <setting-item></setting-item>
  </div>
</template>

<script>
  import SettingItem from './myActivity/settingItem';

  export default {
    name: 'myActivityDetail',
    components: { SettingItem },
    data() {
      return {
        activityName: ''
      };
    },
    mounted() {
      this.activityName = this.$route.query.title;
    }
  };
</script>

<style lang="less">
  .my-activity-detail {
    width: 80%;
    margin: 20px auto;
    position: relative;
    .el-breadcrumb__item {
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 18px;
      color: rgba(71, 86, 105, 1);
    }
  }
</style>
