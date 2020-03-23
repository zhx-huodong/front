<template>
  <div class="choice-activity-container">
    <el-card style="min-height:600px">
      <div class="title">
        <p>{{objectDetail.title}}</p>
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="content" v-html="objectDetail.content"></div>
          <el-row>
            <el-col :span="3" :offset="11" style="margin-top:20px;">
              <el-button type="primary" size="small" @click="goToActivityEnroll">我要报名</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
import api from "../../service/api";
export default {
  data() {
    return {
      id: this.$route.query.id,
      gradeListid: this.$route.query.gradeListid,
      activityName: this.$route.query.activityName,
      imgUrl: this.$route.query.coverUrl,
      objectDetail: {} //活动详情
    };
  },
  created() {
    this.getObjectDetail();
  },
  mounted() {
  },
  methods: {
    //报名
    goToActivityEnroll() {
      this.$router.push({
        path: "/home/activityEnroll",
        query: {
          id: this.id,
          activityName: this.activityName,
          operate:0
        }
      });
    },
    //读取活动项目详情
    async getObjectDetail() {
      let params = {};
      params.url = api.activityCategory;
      params.id = this.id;
      params.expand = "content,formats";
      await this.axiosGet(params)
        .then(res => {
          this.objectDetail = res;
          console.log(res);
        })
        .catch(err => err);
    }
  }
};
</script>
<style lang="less" scoped>
.choice-activity-container {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-size: 16px;
      color: #333;
    }
  }
  .content {
    // width: 600px;
    p {
      line-height: 30px;
      font-size: 14px;
    }
  }
  .activity-img {
    width: 800px;
    margin-top: 10px;
    margin-bottom: 50px;
    .el-image {
      width: 600px;
      height: 360px;
    }
  }
}
</style>