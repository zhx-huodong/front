<template>
  <div class="activity-container">
    <el-card>
      <div class="title">
        <p v-if="activityDetail.info.activity.length<=75">{{activityDetail.info.activity}}</p>
        <el-tooltip :content="activityDetail.info.activity" placement="top" effect="dark" v-else>
          <p>{{activityDetail.info.activity}}</p>
        </el-tooltip>
        
      </div>
      <el-divider></el-divider>
      <el-steps :active="process" align-center>
        <el-step
          title="作品报名"
          :description="formatDateChar(activityDetail.info.nodes[0].stime*1000)+'--'+formatDateChar(activityDetail.info.nodes[0].etime*1000)"
        ></el-step>
        <el-step
          title="区域推荐"
          :description="formatDateChar(activityDetail.info.nodes[1].stime*1000)+'--'+formatDateChar(activityDetail.info.nodes[1].etime*1000)"
        ></el-step>
        <el-step
          title="市级评审"
          :description="formatDateChar(activityDetail.info.nodes[2].stime*1000)+'--'+formatDateChar(activityDetail.info.nodes[2].etime*1000)"
        ></el-step>
        <el-step
          title="作品展示"
          :description="formatDateChar(activityDetail.info.nodes[3].stime*1000)+'--'+formatDateChar(activityDetail.info.nodes[2].etime*1000)"
        ></el-step>
      </el-steps>
    </el-card>
    <el-card style="margin-top:10px;">
        <div class="act-button">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="goToEdit"
            v-if="look!=0&&process<=2&&!position&1"
          >修改</el-button>
        </div>
        <works-preview :id="id" @goback="goback" :rejectReason="activityDetail.status==0"></works-preview>
    </el-card>
  </div>
</template>
<script>
import api from "../../service/api.js";
import WorksPreview from './WorksPreview'
export default {
    components:{WorksPreview},
  data() {
    return {
      imgUrl: require("../../public/images/ac1.png"),
      form: {},
      id: this.$route.query.id, //获取详情id
      activityDetail: {}, //活动详情
      look: this.$route.query.look,
      process: 1, //活动状态
      position:0,
    };
  },
  created(){
    
  },
  mounted() {
    this.getActivityDetail();
  },
  methods: {
    goback(){
      this.$router.push("/userCenter");
    },
    //获取报名活动详情
    async getActivityDetail() {
      let params = {};
      params.url = api.enroll;
      params.id = this.id;
      params.expand = "info,works,school,professional,award,process";
      await this.axiosGet(params)
        .then(res => {
          this.activityDetail = res;
          this.position=res.position
          let nowTime = Date.parse(new Date());
          if (res.info.nodes[0].stime * 1000 <=nowTime) {
            this.process = 1;
          }
          if ( res.info.nodes[1].stime * 1000 <=nowTime) {
            this.process = 2;
          } 
          if (res.info.nodes[2].stime * 1000 <=nowTime) {
            this.process = 3;
          }
          if (res.info.nodes[3].stime * 1000 <=nowTime) {
            this.process = 4;
          }
        })
        .catch(err => err);
    },
    //修改
    goToEdit() {
      let that = this;
      this.$router.push({
        path: "/home/activityEnroll",
        query: { id: that.id, activityName: that.activityDetail.info.category }
      });
    }
  }
};
</script>
<style lang="less">
.activity-container{
  .el-step.is-center .el-step__description{
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .el-step__icon{
    width: 40px !important;
    height: 40px !important;
    font-size: 24px !important;
  }
  .el-step.is-horizontal .el-step__line {
    top:18px !important;
  }
}
</style>
<style lang="less" scoped>
.activity-container {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  position: relative;
    .act-button {
      position: absolute;
      right: 20px;
    }
  .title{
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    p{
      width: 50%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>