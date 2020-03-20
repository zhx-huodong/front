<template>
  <div class="home-center">
    <el-card style="min-height:650px;">
      <div class="home-wrap">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="活动设置" name="first">活动设置</el-tab-pane>

          <el-tab-pane label="作品管理" name="third">
            <div class="activity-lable">
              <type-select
                :gradeList="gradeList"
                :activityProjectList="activityProjectList"
                :activityTypleList="activityTypleList"
                :regionList="regionList"
                @gradeObject="gradeObject"
                @activityProjectObject="activityProjectObject"
                @activityTypleObject="activityTypleObject"
                @regionObject="regionObject"
              ></type-select>
            </div>
            <works-management :id1="id1" :id2="id2" :id3="id3" :id4="id4"></works-management>
          </el-tab-pane>
          <el-tab-pane label="评审结果" name="fourth">
            <div class="activity-lable">
              <type-select :activityObjectList="gradeList2" :gradeList="gradeList3"></type-select>
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
import EnrollInfo from "./EnrollInfo";
import WorksManagement from "./WorksManagement";
import EvaluationResult from "./EvaluationResult";
import ActivityStatistics from "./ActivityStatistics";
import TypeSelect from "../../components/TypeSelect";
import NewsBulletin from "../newsBulletin";
import { axiosGet } from "../../tools/tools";
import api from "../../service/api";
export default {
  components: {
    EnrollInfo,
    WorksManagement,
    EvaluationResult,
    ActivityStatistics,
    TypeSelect,
    NewsBulletin
  },
  data() {
    return {
      parentMsg: "father",
      gradeList: [
        { id: 0, name: "全部" },
        { name: "幼教组", id: 1 },
        { name: "小学组", id: 2 },
        { name: "初中组", id: 4 },
        { name: "高中组", id: 8 },
        { name: "特教组", id: 16 },
        { name: "中职组", id: 32 },
        { name: "高教组", id: 64 }
      ],

      gradeList2: [
        { Id: 0, name: "全部" },
        { Id: 1, name: "老师" },
        { Id: 2, name: "学生" }
      ],
      gradeList3: [
        { Id: 0, name: "全部" },
        { Id: 1, name: "小学组" },
        { Id: 2, name: "初中组" },
        { Id: 3, name: "高中组" }
      ],
      activityProjectList: [{ id: 0, name: "全部" }],
      activityTypleList: [{ id: 0, name: "全部" }],
      regionList: [],
      inRegionList: [
        { Id: 0, name: "全部" },
        { Id: 1, name: "罗湖区" },
        { Id: 2, name: "南山区" },
        { Id: 3, name: "宝安区" },
        { Id: 4, name: "罗湖区" },
        { Id: 5, name: "盐田区" },
        { Id: 6, name: "龙岗区" }
      ],
      activeName: "first",
      id1: 0,
      id2: 0,
      id3: 0,
      id4: 0
    };
  },
  created() {
    console.log(this.$route.query.name, this.$route.query.id);
    sessionStorage.setItem("workid", this.$route.query.id);
    this.activeName = this.$route.query.name;
    this.activeDeatil();
  },


  // "target":7,// 必填，活动对象（1:老师; 2:学生; 4:家长;）eg:（3：老师+学生）
  methods: {
    async gradeObject(val) {
      console.log(val);
      this.id1 = val;
    },
    async activityProjectObject(val) {
      console.log(val);
      this.id3 = val;
    },
    async activityTypleObject(val) {
      console.log(val);
      this.id2 = val;
    },
    async regionObject(val) {
      console.log(val);
      this.id4 = val;
    },
    async activeDeatil() {
      let params = {};
      params.url = api.activity;
      params.id = this.$route.query.id;
      params.expand =
        "detail,region,node,attachment,banner,category,categoryDetail";
      let res = await axiosGet(params).catch(err => err);

      console.log(res.categoryDetail);
      if (res.categoryDetail.length > 0) {
        res.categoryDetail.forEach(element => {
          this.activityTypleList.push({ id: element.id, name: element.title });
          element.child.forEach(ite => {
            this.activityProjectList.push({ id: ite.id, name: ite.title });
          });
        });
        res.region.forEach(item => {
          this.regionList.push({ id: item.id, name: item.area_name });
        });
        console.log(this.activityTypleList);
      }

      console.log(res, "res");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="less" scoped>
.home-center {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  .home-wrap {
  }
}
.add-activety-setting {
  margin-top: 36px;
}
</style>
