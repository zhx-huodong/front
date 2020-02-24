<template>
    <div class="home-center">
		<div class="home-wrap">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="活动设置" name="first">活动设置</el-tab-pane>
                <el-tab-pane label="报名信息" name="second">
                    <enroll-info></enroll-info>
                </el-tab-pane>
                <el-tab-pane label="作品管理" name="third">
                    <works-management></works-management>
                </el-tab-pane>
                <el-tab-pane label="评审结果" name="fourth">
                    <evaluation-result></evaluation-result>
                </el-tab-pane>
                <el-tab-pane label="活动统计" name="fifth">
                    <activity-statistics></activity-statistics>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import EnrollInfo from './EnrollInfo';
import WorksManagement from './WorksManagement';
import EvaluationResult from './EvaluationResult';
import ActivityStatistics from './ActivityStatistics';
  export default {
    components: {EnrollInfo,WorksManagement,EvaluationResult,ActivityStatistics},
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style lang="less" scoped>
.add-activety-setting{
    margin-top:36px;
}
.home-center{
    width: 100%;
    margin-top: 10px;
    .home-wrap{
        width: 1180px;
        margin: auto;

    }
}

</style>
