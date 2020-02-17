<template>
  <div class="audit-detail">
    <div class="active-title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item @click.native="$router.back(-1)">
          <span style="color: #337ab7">审核中心</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>活动_{{activityName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <setting-item :read-only="true" :hide-publish="true"></setting-item>
  </div>
</template>
<script>
  import SettingItem from '../myActivity/settingItem';
  export default {
    components: { SettingItem },
    data() {
      return {
        activityName: ''
      };
    },
    mounted() {
      this.activityName = this.$route.query.name;
    }
  };
</script>
<style lang="less">
  .audit-detail {
    width: 1180px;
    margin: 20px auto;
    .active-title {
      &:hover {
        cursor: pointer;
      }
      color: #475669;
      font-size: 13px;
    }
  }
</style>
