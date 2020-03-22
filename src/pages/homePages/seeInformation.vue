<template>
  <div class="see-information-container">
    <el-card style="min-height:600px">
      <div class="title">
        <p>{{form.title}}</p>
        <p style="margin-top:10px;">{{formatDateChar(form.time*1000)}}</p>
      </div>
      <el-divider></el-divider>
      <div class="content" v-html="form.content"></div>
    </el-card>
  </div>
</template>
<script>
import api from "../../service/api";
export default {
  data() {
    return {
      id: this.$route.query.id,
      form: {
        title: "",
        content: "",
        time: ""
      }
    };
  },
  mounted() {
      this.getAnnouncementDetail()
  },
  methods: {
    //获取公告信息
    async getAnnouncementDetail() {
      let params = {};
      params.url = api.activityNotice;
      params.id = this.id;
      params.expand = "content,bcheck";
      await this.axiosGet(params)
        .then(res => {
          this.form.title = res.title;
          this.form.content = res.content;
          this.form.time=res.created_at
        })
        .catch(err => err);
    }
  }
};
</script>
<style lang="less" scoped>
.see-information-container {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
      font-size: 16px;
      color: #333;
    }
  }
  .content {
    width: 600px;
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