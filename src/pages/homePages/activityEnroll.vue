<template>
  <div class="activity-enroll">
    <el-card class="box-card">
      <div class="title">
        <p>活动报名</p>
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="活动组别：">
          <el-input
            v-model="form.activityName"
            placeholder="请输入活动组别"
            style="width:400px;"
            size="small"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动项目：">
          <el-input
            v-model="form.activityProject"
            placeholder="请输入活动项目"
            style="width:400px;"
            size="small"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="作品名称：">
          <el-input v-model="form.title" placeholder="请输入作品名称" style="width:400px;" size="small"></el-input>
        </el-form-item>
        <el-form-item label="作品封面：">
          <template>
            <upload-picture
              :uploadType="'picture'"
              :max="1"
              :myPictureList="form.cover"
              @uploadSuccess="coverSuccess"
              :name="'添加作品封面JPG,PNG格式'"
            ></upload-picture>
          </template>
        </el-form-item>
        <el-form-item label="作品简介：">
          <div class="my-editor-main">
            <my-editor @editorChange="editorChange" :inputtext="inputtext"></my-editor>
          </div>
        </el-form-item>
        <el-form-item label="报名登记：">
          <upload-picture
            :uploadType="'picture'"
            :max="1"
            :myPictureList="form.registration"
            @uploadSuccess="registrationSuccess"
            :name="'上传登记表JPG,PNG格式'"
          ></upload-picture>
        </el-form-item>
        <el-form-item
          label="作品上传"
          v-for="(item,index) in activityProjectDetail.formats"
          :key="index"
        >
          <div style="width:700px;">
            <upload-file
              :uploadType="uploadTypeObj[item.type]"
              :myFileList="formats"
              @uploadSuccess="(data)=>{return upsuccess(data,item.id,item.type)}"
              :name="'上传'+uploadTypeChar[item.type]+'格式作品'"
            ></upload-file>
          </div>
        </el-form-item>

        <el-form-item label="作者：">
          <el-row>
            <el-col :span="16">
              <el-tag
                :key="tag.id"
                v-for="tag in authorTags"
                closable
                :disable-transitions="false"
                @close="authorClose(tag.id)"
              >{{tag.name}}</el-tag>
              <el-select
                filterable
                placeholder="请选择作者"
                v-if="authorInputVisible"
                v-model="authorInputValue"
                ref="authorSaveTagInput"
                size="small"
                @change="authorInputConfirm"
              >
                <el-option
                  v-for="item in studentList"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                >
                  <span style="float: left">{{ item.name }}</span>
                  <span
                    style="float: right; color: #8492a6; font-size: 13px"
                  >{{ item.memberInfo[0].school.title }}</span>
                </el-option>
              </el-select>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showAuthorInput"
                type="primary"
              >添加作者</el-button>
              <el-tag type="info">限制{{author_limit}}人</el-tag>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="指导老师：">
          <el-row>
            <el-col :span="16">
              <el-tag
                :key="tag.id"
                v-for="tag in teacherTags"
                closable
                :disable-transitions="false"
                @close="teacherClose(tag.id)"
              >{{tag.name}}</el-tag>

              <el-select
                filterable
                placeholder="请选择指导老师"
                v-if="teacherInputVisible"
                v-model="teacherInputValue"
                ref="teacherSaveTagInput"
                size="small"
                @change="teacherInputConfirm"
              >
                <el-option
                  v-for="item in teacherList"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                >
                  <span style="float: left">{{ item.name }}</span>
                  <span
                    style="float: right; color: #8492a6; font-size: 13px"
                  >{{ item.memberInfo[0].school.title }}</span>
                </el-option>
              </el-select>
              <el-button
                v-else
                class="button-new-tag"
                type="primary"
                size="small"
                @click="showTeacherInput"
              >添加指导老师</el-button>
              <el-tag type="info">限制{{mentor_limit}}人</el-tag>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="作者邮箱：">
          <el-input v-model="form.email" placeholder="请输入电子邮箱" style="width:400px;" size="small"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="5" :offset="5">
          <el-button type="primary" @click="submitEnroll()" size="small">提交报名</el-button>
          <el-button type="default" @click="goback()" size="small">取消</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import api from "../../service/api.js";
import MyEditor from "../../components/MyEditor";
import { getCookie, axiosGet, axiosPost, axiosPut } from "../../tools/tools";
import UploadPicture from "../../components/UploadPicture";
import UploadFile from "../../components/UploadFile";
export default {
  components: { MyEditor, UploadPicture, UploadFile },
  data() {
    return {
      headers: {
        "x-api-key": getCookie("x-api-key")
      },
      action: api.uploadPic,
      uploadFile: api.uploadFile,
      apipath: "http://api.huodong.eduinspector.com",
      form: {
        activityName: this.$route.query.activityName,
        activityProject: "",
        title: "",
        cover: [],
        registration: [],
        email: ""
      },
      inputtext: "", //富文本内容
      registration: "", //报名登记表
      cover: "", //作品封面
      authorTags: [],
      authorInputVisible: false,
      authorInputValue: "",
      teacherTags: [],
      teacherInputVisible: false,
      teacherInputValue: "",
      title: "",
      author_limit: "", //限制学生人数
      mentor_limit: "", //限制指导老师人数
      filename: "upFile",
      studentList: [], //学生选择列表
      authorIds: [], //学生IDS
      teacherList: [], //老师选择列表
      teacherIds: [], //老师ids
      content: "", //活动介绍
      activityProjectId: this.$route.query.id, //活动项目id
      activityProjectDetail: {}, //活动项目信息
      formats: [], //作品上传
      attachment: {}, //作品上传
      operate: this.$route.query.operate,
      uploadTypeObj: { 1: "picture", 2: "video", 3: "work" },
      uploadTypeChar: { 1: "图片", 2: "视频", 3: "普通文档" },
      category_id: ""
    };
  },
  created() {
    let params = {};
    this.getTeacherList(params);

    if (this.operate == 0) {
      this.getObjectDetail();
    } else {
      this.getEnrollDetail();
      this.getObjectDetail();
    }
  },
  mounted() {
    let params = {};
    this.getStudentList(params);
  },
  methods: {
    //读取报名项目详情
    async getEnrollDetail() {
      let that = this;
      let params = {};
      params.url = api.enroll;
      params.id = that.activityProjectId;
      params.expand = "info,works,school,professional,award";
      await that.axiosGet(params).then(res => {
        this.category_id = res.category_id;
        that.form.activityProject = res.info.project;
        that.form.title = res.works.title;
        that.inputtext = res.works.content;
        that.form.email = res.works.email;
        if (res.works.attachment.length > 0) {
          res.works.attachment.map(res => {
            that.formats.push({
              id: res.id,
              name: res.title,
              url: res.url,
              type: res.type
            });
          });
          console.log("我是", that.formats);
        }
        // this.attachment=res.works.attachment

        that.form.cover.push({ url: res.works.cover });

        that.form.registration.push({ url: res.registration });

        that.authorTags = res.info.author.map(item => {
          return {
            id: item.id,
            name: item.name
          };
        });
        that.teacherTags = res.info.mentor.map(item => {
          return {
            id: item.id,
            name: item.name
          };
        });
      });
    },
    //读取活动项目详情
    async getObjectDetail() {
      let params = {};
      params.url = api.activityCategory;
      params.id = this.activityProjectId;
      params.expand = "content,formats";
      await this.axiosGet(params)
        .then(res => {
          this.activityProjectDetail = res;
          this.form.activityProject = res.title;
          this.author_limit = res.author_limit;
          this.mentor_limit = res.mentor_limit;
        })
        .catch(err => err);
    },

    //cover
    coverSuccess(data) {
      data.forEach(item => {
        this.cover = item.url;
      });
    },

    //报名登记表
    registrationSuccess(data) {
      this.registration = "";
      data.forEach(item => {
        this.registration = item.url;
      });
    },

    handlePreview(file) {
      console.log(file);
      window.open(file.url);
    },

    //作品上传
    upsuccess(data, id, type) {
      console.log("data==", data, "id==", id, "type==", type);
      let key = id;
      this.attachment[id] = [];
      data.forEach(item => {
        let attachmentItem = {};
        attachmentItem.url = item.url;
        attachmentItem.title = item.name;
        this.attachment[id].push(attachmentItem);
      });
      console.log("this.attachment===", this.attachment);
    },

    //提交报名
    async submitEnroll() {
      let params = {};
      params.url = api.works;
      params.category_id = this.activityProjectDetail.id;
      if (this.form.title != "") {
        params.title = this.form.title;
      } else {
        this.$message({
          message: "请添加作品名称",
          type: "warning"
        });
        return;
      }
      if (this.cover != "") {
        params.cover = this.cover;
      } else if (this.form.cover.length != 0 && this.operate != 0) {
        params.cover = this.form.cover[0].url;
      } else {
        this.$message({
          message: "请上传作品封面",
          type: "warning"
        });
        return;
      }
      if (this.registration != "") {
        params.registration = this.registration;
      } else if (this.form.registration.length != 0 && this.operate != 0) {
        params.registration = this.form.registration[0].url;
      } else {
        this.$message({
          message: "请上传报名表",
          type: "warning"
        });
        return;
      }
      if (this.content !== "") {
        params.content = this.content;
      } else {
        this.$message({
          message: "请添加活动介绍",
          type: "warning"
        });
        return;
      }
      if (this.authorIds.length > 0) {
        params.author = this.authorIds;
      } else if (this.authorTags.length > 0 && this.operate != 0) {
        params.author = this.authorTags.map(res => {
          return res.id;
        });
      } else {
        this.$message({
          message: "请添加作者",
          type: "warning"
        });
        return;
      }

      if (this.operate != 0) {
        params.mentor = this.teacherTags.map(res => {
          return res.id;
        });
      } else {
        params.mentor = this.teacherIds;
      }

      if (this.form.email !== "") {
        params.email = this.form.email;
      } else {
        this.$message({
          message: "请添加邮箱",
          type: "warning"
        });
        return;
      }
      params.attachment = this.attachment;
      // if(this.formats.length>0&&this.operate!=0){
      //   let attachment={};
      //   for(let i=0;i<this.formats.length;i++){
      //     attachment[this.formats[i].id]={"url":this.formats[i].url,"title":this.formats[i].name};
      //   }
      //   params.attachment =Object.assign(this.attachment,attachment);
      // }else{
      //    params.attachment = this.attachment;
      // }
      console.log("params===", params);
      if (this.operate == 0) {
        await axiosPost(params)
          .then(res => {
            if (res.code == -1) {
              this.$message({
                message: res.message,
                type: "warning"
              });
            } else if (res.title != undefined && res.title != "") {
              this.$message({
                message: "报名成功！！",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/home/submitEnroll"
                });
                // this.$router.go(-1);
              }, 1000);
            } else {
              that.$router.go(-1);
            }
          })
          .catch(err => err);
      } else {
        params.id = this.activityProjectId;
        params.category_id = this.category_id;
        console.log("修改===", params);
        await axiosPut(params)
          .then(res => {
            if (res.code == -1) {
              this.$message({
                message: res.message,
                type: "warning"
              });
            } else if (res.title != undefined && res.title != "") {
              this.$message({
                message: "修改成功！！",
                type: "success"
              });
              setTimeout(() => {
                // this.$router.push({
                //   path: "/home/submitEnroll"
                // });
                // this.$router.go(-1);
              }, 1000);
            } else {
              that.$router.go(-1);
            }
          })
          .catch(err => err);
      }
    },

    editorChange(data) {
      this.content = data;
    },
    //取消
    goback() {
      let that = this;
      this.$confirm("确定取消吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.$router.go(-1);
        })
        .catch(() => {
          console.log("取消");
        });
    },
    //获取学生列表
    async getStudentList(params) {
      delete params.mtype;
      params.url = api.user;
      params.expand = "memberAuth,memberInfo,roleInfo";
      params.mtype = 2;
      params.ball = 1;
      await this.axiosGet(params)
        .then(res => {
          this.studentList = res.items;
        })
        .catch(err => err);
    },
    //获取老师列表
    async getTeacherList(params) {
      delete params.mtype;
      params.url = api.user;
      params.expand = "memberAuth,memberInfo,roleInfo";
      params.mtype = 1;
      params.ball = 1;
      await this.axiosGet(params)
        .then(res => {
          this.teacherList = res.items;
        })
        .catch(err => err);
    },

    //作者
    authorClose(id) {
      this.authorIds.splice(this.authorIds.indexOf(id), 1);
      let newAutorTags = [];
      for (let i in this.authorTags) {
        if (this.authorTags[i].id != id) {
          newAutorTags.push(this.authorTags[i]);
        }
      }
      this.authorTags = newAutorTags;
    },

    showAuthorInput() {
      this.authorInputVisible = true;
    },

    authorInputConfirm(tag) {
      if (this.authorIds.length < this.author_limit) {
        this.authorIds.push(tag.id);
        this.authorTags.push(tag);
      } else {
        this.$message({
          type: "warning",
          message: "人数已超出"
        });
      }

      this.authorInputVisible = false;
      this.authorInputValue = "";
    },
    //作者
    teacherClose(id) {
      this.teacherIds.splice(this.teacherIds.indexOf(id), 1);
      let newTeacherTags = [];
      for (let i in this.teacherTags) {
        if (this.teacherTags[i].id != id) {
          newTeacherTags.push(this.teacherTags[i]);
        }
      }
      this.teacherTags = newTeacherTags;
    },

    showTeacherInput() {
      this.teacherInputVisible = true;
    },

    teacherInputConfirm(data) {
      console.log(data);
      if (this.teacherIds.length < this.mentor_limit) {
        this.teacherTags.push(data);
        this.teacherIds.push(data.id);
      } else {
        this.$message({
          type: "warning",
          message: "人数已超出"
        });
      }
      this.teacherInputVisible = false;
      this.teacherInputValue = "";
    }
  }
};
</script>
<style lang="less" scoped>
.activity-enroll {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
}
.box-card {
  min-height: 650px;
  .title {
    display: flex;
    justify-content: center;
    p {
      font-size: 18px;
      color: #333;
    }
  }
  .upload-container {
    display: flex;
    flex-direction: row;
    p {
      font-size: 14px;
      color: #999;
      margin-left: 20px;
    }
  }
}
</style>