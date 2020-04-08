<template>
  <div class="create-activity-container">
    <el-card style="min-height:650px">
      <el-page-header @back="back()" content="公告编辑"></el-page-header>
      <el-divider></el-divider>
      <div class="create-activity-body">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-form-item label="标题:" prop="title">
            <el-col :span="9">
              <el-input placeholder="请输入标题" v-model="form.title" size="small" type="text"></el-input>
            </el-col>
          </el-form-item>

          <div class="my-editer" style="margin-left: 50px;">
            <P style="width:45px;margin-left:25px">内容:</P>
            <my-editor @editorChange="editorChange" :inputtext="this.form.content"></my-editor>
          </div>
        </el-form>
        <el-row>
          <el-col :offset="10">
            <el-button type="primary" size="small" @click="goToRelease()">确定</el-button>
            <el-button size="small" @click="goToCancel()">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import MyEditor from "../../components/MyEditor";
import api from "../../service/api";
export default {
  components: { MyEditor },
  data() {
    return {
        edit:this.$route.query.edit,
      id: this.$route.query.id,
      rules: {
        title: [
          { required: true, message: "标题必填，不能为空", trigger: "blur" }
        ]
      },
      form: {
        title: "", //标题
        content: "" //内容
      }
    };
  },
  watch: {},
  created() {
      if(this.edit==1){
          this.getAnnouncementDetail()
      }
  },
  computed: {},
  mounted() {},
  methods: {
    //返回
    back() {
      this.$router.go(-1);
    },
    //公告内容
    editorChange(data) {
      this.form.content = data;
    },
    //获取公告信息
    async getAnnouncementDetail(){
        let params={}
        params.url=api.activityNotice
        params.id=this.id
        params.expand="content,bcheck"
        await this.axiosGet(params).then(res=>{
            this.form.title=res.title
            this.form.content=res.content
        }).catch(err=>err)
    },
    //发布公告
    async goToRelease() {
      let params = {};
      
      params.url = api.activityNotice;
      if (this.form.title != "") {
        params.title = this.form.title;
      } else {
        this.$message({
          type: "warning",
          message: "请添加标题"
        });
        return;
      }
      if (this.form.content != "") {
        params.content = this.form.content;
      } else {
        this.$message({
          type: "warning",
          message: "请添加内容"
        });
        return;
      }
      if(this.edit==0){
          params.activity_id = this.id;
          await this.axiosPost(params)
        .then(res => {
          if (res.title != undefined && res.title != "") {
            this.$message({
              type: "success",
              message: "发布成功！！"
            });
            setTimeout(() => {
              this.back();
            }, 1000);
          } else if (res.code == -1) {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(err => err);
      }else if(this.edit==1){
          params.id = this.id;
          await this.axiosPut(params)
        .then(res => {
          if (res.title != undefined && res.title != "") {
            this.$message({
              type: "success",
              message: "发布成功！！"
            });
            setTimeout(() => {
              this.back();
            }, 1000);
          } else if (res.code == -1) {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(err => err);
      }
      
    },
    //取消
    goToCancel() {
      this.back();
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

.my-editer {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  p {
    font-size: 14px;
    color: #666;
  }
}
</style>