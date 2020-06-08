<template>
  <div class="see-information-container">
    <el-card style="min-height:600px">
      <div class="title">
        <p>{{form.title}}</p>
        <p style="margin-top:10px;">{{formatDateChar(form.time*1000)}}</p>
      </div>
      <el-divider></el-divider>
      <div class="content ql-snow ql-editor" v-html="form.content"></div>
      <el-divider></el-divider>
      <div class="attachment">
        <p>公告附件</p>
        <div class="attachment-item">
          <template v-for="subItem in attachment">
            <file-preview :fileObj="subItem"></file-preview>
          </template>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import api from "../../service/api";
import FilePreview from "../../components/FilePreview";
export default {
  components: { FilePreview},
  data() {
    return {
      id: this.$route.query.id,
      form: {
        title: "",
        content: "",
        time: ""
      },
      attachment:[],//附件
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
      params.expand = "content,bcheck,attachment";
      await this.axiosGet(params)
        .then(res => {
          this.form.title = res.title;
          this.form.content = res.content;
          this.form.time=res.created_at
          if(res.attachment.length>0){
            this.attachment=res.attachment.map(item=>{
              return {
                title:item.title,
                url:item.url
              }
            })
          }
        })
        .catch(err => err);
    }
  }
};
</script>
<style lang="less" scoped>
body{
  line-height: 30px;
}
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
      font-size: 20px;
      color: #333;
    }
  }
  .content {
    margin: auto;
    width: 80%;
    line-height: 30px;
    // text-indent: 2em;
    p {
      line-height: 30px;
      font-size: 14px;
      // text-indent: 2em;
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
.attachment{
  width: 80%;
  margin-left: 120px;
  p{
    font-size: 16px;
    color: #333;
  }
  .attachment-item{
    margin-top: 20px;
  }
}
</style>