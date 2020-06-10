<template>
<div>
  <div class="create-activity-container" v-if="!showPreview">
    <el-card style="min-height:650px">
      <el-page-header @back="back()" content="公告编辑"></el-page-header>
      <el-divider></el-divider>
      <div class="create-activity-body">
        <el-form ref="form" :model="form" label-width="130px" :rules="rules">
          <el-form-item label="标题:" prop="title">
            <el-col :span="9">
              <el-input placeholder="请输入标题" v-model="form.title" size="small" type="text"></el-input>
            </el-col>
          </el-form-item>

          <div class="my-editer" style="margin-left: 15px;">
            <P style="width:45px;margin-left:60px">内容:</P>
            <my-editor @editorChange="editorChange" :inputtext="form.content"></my-editor>
            <!-- <ueditor :value="ueditor.value" :config="ueditor.config" ref="editor"></ueditor> -->
          </div>
          <el-form-item label="公告附件:">
            <div style="width:710px">
              <upload-file
                :uploadType="'all'"
                :myFileList="attachment"
                :max="50"
                @uploadSuccess="attachmentSuccess"
                :name="'上传附件'"
              ></upload-file>
            </div>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :offset="10">
            <el-button type="primary" size="small" @click="goToPreview()">预览</el-button>
            <el-button size="small" @click="goToCancel()">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
  <div class="see-information-container" v-if="showPreview">
    <el-card style="min-height:600px">
      <div class="title">
        <p>{{form.title}}</p>
        <!-- <p style="margin-top:10px;">{{formatDateChar(form.time*1000)}}</p> -->
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
      <el-row>
        <el-col :offset="10" style="margin-top:20px;">
          <el-button type="primary" size="small" @click="goToRelease()">确定并发布</el-button>
          <el-button size="small" @click="goBack()">返回</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
  </div>
</template>
<script>
import MyEditor from "../../components/MyEditor";
import api from "../../service/api";
import UploadFile from "../../components/UploadFile";
import FilePreview from "../../components/FilePreview";
import Ueditor from "../../components/Ueditor";
export default {
  components: { MyEditor, UploadFile,FilePreview,Ueditor },
  data() {
    return {
      edit: this.$route.query.edit,
      id: this.$route.query.id,
      rules: {
        title: [
          { required: true, message: "标题必填，不能为空", trigger: "blur" }
        ]
      },
      form: {
        title: "", //标题
        content: "" //内容
      },
      attachment:[],//附件
      showPreview:false,
      ueditor: {
          value: '',
          config: {
              initialFrameWidth: 800,
              initialFrameHeight: 280
          }
      }
    };
  },
  watch: {},
  created() {
    if (this.edit == 1) {
      this.getAnnouncementDetail();
    }
  },
  computed: {},
  mounted() {},
  methods: {
    //活动指南
    attachmentSuccess(data) {
      this.attachment = [];
      data.forEach(item => {
        let attachmentItem = {};
        attachmentItem.url = item.url;
        attachmentItem.title = item.name;
        this.attachment.push(attachmentItem);
      });
    },
    //返回
    back() {
      this.$router.go(-1);
    },
    //公告内容
    editorChange(data) {
      this.form.content = data;
    },
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
    },
    //确定预览
    goToPreview(){
      this.showPreview=true
    },
    //取消
    goToCancel() {
      this.back();
    },
    //发布公告
    async goToRelease() {
      let params = {};

      params.url = api.activityNotice;
      if (this.form.title != "") {
        if (this.form.title.length > 128) {
          this.$message({
            type: "warning",
            message: "标题太长，请重新填写"
          });
          return;
        } else {
          params.title = this.form.title;
        }
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
      params.attachment=this.attachment
      if (this.edit == 0) {
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
          .catch(err => {
            console.log("err===", err);
          });
      } else if (this.edit == 1) {
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
          .catch(err => {
            console.log("err==", err);
          });
      }
    },
    //返回
    goBack(){
      this.showPreview=false
    },
    
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