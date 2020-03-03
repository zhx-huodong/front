<template>
    <div class="home-center">
      <el-card style="min-height:650px;">
		    <div class="home-wrap">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="活动设置" name="first">活动设置</el-tab-pane>
                <el-tab-pane label="报名信息" name="second">
                    <div class="activity-lable">
                       
                    </div>
                    <enroll-info></enroll-info>
                </el-tab-pane>
                <el-tab-pane label="作品管理" name="third">
                  <div class="activity-lable">
                        <type-select 
                          :gradeList="gradeList" :activityProjectList="activityProjectList" :activityTypleList="activityTypleList" :inRegionList="inRegionList"
                         
                        ></type-select>
                    </div>
                    <works-management></works-management>
                </el-tab-pane>
                <el-tab-pane label="评审结果" name="fourth">
                  <div class="activity-lable">
                        <type-select 
                         :activityObjectList='gradeList2' :gradeList="gradeList3"
                        ></type-select>
                  </div>
                    <evaluation-result></evaluation-result>
                </el-tab-pane>
                <el-tab-pane label="活动统计" name="fifth">
                    <activity-statistics></activity-statistics>
                </el-tab-pane>
                <!-- D:\lxf\front\src\pages\newsBulletin.vue -->
                <el-tab-pane label="消息公告" name="six">
                    <news-bulletin></news-bulletin>
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
import NewsBulletin from '../newsBulletin';
  export default {
    components: {EnrollInfo,WorksManagement,EvaluationResult,ActivityStatistics,TypeSelect,NewsBulletin},
    data() {
      return {
      gradeList:[
		    { Id : 0, name : '全部' },
        { Id : 1, name : '小学组' },
        { Id : 2, name : '初中组' },
        { Id : 3, name : '高中组' },
      ],
        gradeList2:[
		    { Id : 0, name : '全部' },
        { Id : 1, name : '老师' },
        { Id : 2, name : '学生' },
      ],
       gradeList3:[
		    { Id : 0, name : '全部' },
        { Id : 1, name : '小学组' },
        { Id : 2, name : '初中组' },
        { Id : 3, name : '高中组' },
      ],
      activityProjectList:[
        { Id : 0, name : '全部' },
        { Id : 1, name : '电脑绘画' },
        { Id : 2, name : '数字创作' },
        { Id : 3, name : '手绘插画' },
        { Id : 4, name : '电脑绘画' },
        { Id : 5, name : '数字创作' },
        { Id : 6, name : '手绘插画' },
      
      ],
      activityTypleList:[
        { Id : 0, name : '全部' },
        { Id : 1, name : '电脑绘画' },
        { Id : 2, name : '数字创作' },
        { Id : 3, name : '手绘插画' },
        { Id : 4, name : '电脑绘画' },
        { Id : 5, name : '数字创作' },
        { Id : 6, name : '手绘插画' },
      ],
      regionList:[],
      inRegionList:[
      {Id:0, name:'全部'},
      {Id:1, name:'罗湖区'},
      {Id:2, name:'南山区'},
      {Id:3, name:'宝安区'},
      {Id:4, name:'罗湖区'},
      {Id:5, name:'盐田区'},
      {Id:6, name:'龙岗区'},
    	],
        activeName: 'first'
      };
    },
    methods: {
        async gradeObject(value) {
            console.log(value)
        },
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
