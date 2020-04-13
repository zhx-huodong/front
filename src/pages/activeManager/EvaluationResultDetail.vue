<template>
  <div class="create-activity-container">
    <el-card style="min-height:650px">
      <el-page-header @back="back()"></el-page-header>
      <el-divider></el-divider>

      <div class="create-activity-body">
        <template>
          <el-table :data="tableData" border style="width:100%">
            <el-table-column prop="name" label="专家"></el-table-column>
            <el-table-column prop="score" label="评分"></el-table-column>
            <el-table-column prop="comment" label="评语" show-overflow-tooltip></el-table-column>
          </el-table>
          <el-table :show-header="false" :data="averageScore" border style="width:100%">
            <el-table-column prop="name"></el-table-column>
            <el-table-column prop="average"></el-table-column>
          </el-table>
        </template>
      </div>
      <el-divider></el-divider>
      <works-preview :id="id"></works-preview>
    </el-card>
  </div>
</template>
<script>
import MyEditor from "../../components/MyEditor";
import api from "../../service/api";
import WorksPreview from '../homePages/WorksPreview'

export default {
  components: {
    MyEditor,
    WorksPreview
  },
  data() {
    return {
      id: this.$route.query.id,
      tableData: [], //专家评分列表
      averageScore: [{ name: "综合评分", average: "95" }], //综合评分
      workDetail: {}, //作品详情
      activityInfo: {} //活动详情
    };
  },
  computed: {},
  mounted() {
    this.getWorksDetail();
  },
  methods: {
    //获取报名作品详情
    async getWorksDetail() {
      let params = {};
      params.id = this.id;
      params.url = api.enroll;
      params.expand = "info,works,school,professional,award";
      await this.axiosGet(params)
        .then(res => {
          this.tableData = res.professional;
          this.tableData.forEach(ite=>{
            ite.score=ite.score/10;//把分数除10
          })
          if (res.professional.length > 0) {
            let totalScore = 0;
            res.professional.forEach(item => {
              totalScore += parseInt(item.score);
            });
            this.averageScore[0].average = totalScore / res.professional.length;
          }
          this.workDetail = res.works;
          this.activityInfo = res.info;
        })
        .catch(err => err);
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" >
.create-activity-container {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  .create-activity-body {
    padding: 30px 60px;
  }
}
</style>