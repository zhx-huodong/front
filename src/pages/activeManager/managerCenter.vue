<template>
    <div class="home-center">
      <el-card style="min-height:650px;">
		    <div class="home-wrap">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="活动设置" name="first">活动设置</el-tab-pane>
                <el-tab-pane label="报名信息" name="second">
                    <div class="activity-lable">
                        <type-select v-if="gradeList.length > 0 && regionList.length > 0"
                          :gradeList="gradeList" :regionList="regionList"
                        ></type-select>
                    </div>
                    <enroll-info></enroll-info>
                </el-tab-pane>
                <el-tab-pane label="作品管理" name="third">
                  <div class="activity-lable">
                        <type-select v-if="gradeList.length > 0 && regionList.length > 0"
                          :gradeList="gradeList" :regionList="regionList"
                        ></type-select>
                    </div>
                    <works-management></works-management>
                </el-tab-pane>
                <el-tab-pane label="评审结果" name="fourth">
                  <div class="activity-lable">
                        <type-select v-if="gradeList.length > 0 && regionList.length > 0"
                          :gradeList="gradeList" :regionList="regionList"
                        ></type-select>
                  </div>
                    <evaluation-result></evaluation-result>
                </el-tab-pane>
                <el-tab-pane label="活动统计" name="fifth">
                    <activity-statistics></activity-statistics>
                </el-tab-pane>
            </el-tabs>
        </div>
      </el-card>
    </div>
</template>
<script>
import EnrollInfo from './EnrollInfo';
import WorksManagement from './WorksManagement';
import EvaluationResult from './EvaluationResult';
import ActivityStatistics from './ActivityStatistics';
import TypeSelect from '../../components/TypeSelect';
  export default {
    components: {EnrollInfo,WorksManagement,EvaluationResult,ActivityStatistics,TypeSelect},
    data() {
      return {
          	gradeList:[
		    { Id : 0, Name : '全部' },
        { Id : 1, Name : '小学组' },
        { Id : 2, Name : '初中组' },
        { Id : 3, Name : '高中组' },
      ],
      regionList:[
      {Id:0, Name:'全部'},
      {Id:1, Name:'罗湖区'},
      {Id:2, Name:'南山区'},
      {Id:3, Name:'宝安区'},
      {Id:4, Name:'罗湖区'},
      {Id:5, Name:'盐田区'},
      {Id:6, Name:'龙岗区'},
    	],
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

.home-center{
    width: 1180px;
    margin: auto;
    margin-top: 20px;
    .home-wrap{
        

    }
}
.add-activety-setting{
    margin-top:36px;
}

</style>
