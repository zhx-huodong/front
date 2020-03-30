<template>
  <div class="activity-enroll">
    <el-card class="box-card" v-show="!showPreview">
      <div class="title">
        <p>活动报名</p>
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="20" :offset="2">
      <el-form ref="form" :model="form" label-width="100px">
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
        <el-form-item label="作品名称：" :rules="{ required: true, message: '请输入作品名称', trigger: 'blur' }">
          <el-input v-model="form.title" placeholder="请输入作品名称" style="width:400px;" size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="作品封面：" :rules="{ required: true, message: '请上传作品封面', trigger: 'blur' }">
          <template>
            <upload-picture
              :uploadType="'picture'"
              :max="1"
              :myPictureList="form.cover"
              @uploadSuccess="coverSuccess"
              :name="'上传作品封面'"
            ></upload-picture>
            <span class="limit">仅支持JPG,PNG格式</span>
          </template>
        </el-form-item>

        <div class="my-editerContain">
          <P><span style="color:red;font-size:14px;">*</span>创作思想:</P>
          <my-editor @editorChange="editorChange" :inputtext="inputtext"></my-editor>
        </div>
        <el-form-item label="创作过程：">
          <el-input
            type="textarea"
            :rows="5"
            v-model="production"
            placeholder="请填写创作过程"
            style="width:715px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="参考资源：">
          <el-input
            type="textarea"
            v-model="reference"
            :rows="5"
            placeholder="请填写参考资源"
            style="width:715px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="制作用软件及运行环境：">
          <el-input
            type="textarea"
            v-model="environment"
            :rows="5"
            placeholder="请填写创作过程"
            style="width:715px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="其他说明：">
          <el-input
            type="textarea"
            v-model="remark"
            :rows="3"
            placeholder="请填写其他说明"
            style="width:715px;"
          ></el-input>
        </el-form-item>

        <el-form-item label="作品上传：" :rules="{ required: true, message: '请上传作品', trigger: 'blur' }">
          <div
            style="width:700px;margin-bottom:20px;"
            v-for="(item,index) in activityProjectDetail.formats"
            :key="index"
          >
            <upload-file
              :uploadType="uploadTypeObj[item.type]"
              :myFileList="item.fileList"
              @uploadSuccess="(data)=>{return upsuccess(data,item.id,item.type)}"
              :name="'上传'+uploadTypeChar[item.type]+'格式作品'"
              :fileLimit="item.size"
            ></upload-file>
            <p class="limit">{{item.remark}}</p>
          </div>
        </el-form-item>
        <el-form-item label="报名登记：" :rules="{ required: true, message: '请上传报名登记', trigger: 'blur' }">
          <upload-picture
            :uploadType="'picture'"
            :max="1"
            :myPictureList="form.registration"
            @uploadSuccess="registrationSuccess"
            :name="'上传登记表'"
            style="min-width:200px;"
          ></upload-picture>
          <span class="limit">仅支持JPG,PNG格式</span>
        </el-form-item>
        <el-form-item label="学校：" :rules="{ required: true, message: '请填写学校', trigger: 'blur' }">
          <el-select v-model="form.school_id" filterable placeholder="请选择" size="small" @change="schoolChange">
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者：" :rules="{ required: true, message: '请填写作者', trigger: 'blur' }">
          <el-row>
            <el-col>
              <el-row v-for="(item,index) in authorList" :key="index">
                <el-col :span="1" style="color:#999;">姓名:</el-col>
                <el-col :span="4">
                  <el-input size="small" v-model="item.name"></el-input>
                </el-col>
                <el-col :span="1" style="color:#999;" :offset="1">电话:</el-col>
                <el-col :span="4">
                  <el-input size="small" v-model="item.mobile"></el-input>
                </el-col>
                <el-col :span="2" :offset="1">
                  <i class="el-icon-circle-close" style="font-size:18px;color:red;cursor:pointer" @click="deleteAuthor(index)"></i>
                </el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-button size="small" type="primary" @click="addAuthor()">添加</el-button>
              <span class="limit leftpad">限制{{author_limit}}人</span>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="指导老师：" :rules="{ required: true, message: '请填写指导老师', trigger: 'blur' }">
          <el-row>
            <el-col>
              <el-row v-for="(item,index) in teacherList" :key="index">
                <el-col :span="1" style="color:#999;">姓名:</el-col>
                <el-col :span="4">
                  <el-input size="small" v-model="item.name"></el-input>
                </el-col>
                <el-col :span="1" style="color:#999;" :offset="1">电话:</el-col>
                <el-col :span="4">
                  <el-input size="small" v-model="item.mobile"></el-input>
                </el-col>
                <el-col :span="2" :offset="1">
                  <i class="el-icon-circle-close" style="font-size:18px;color:red;cursor:pointer" @click="deleteTeacher(index)"></i>
            
                </el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-button size="small" type="primary" @click="addTeacher()">添加</el-button>
              <span class="limit leftpad">限制{{mentor_limit}}人</span>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="作者邮箱：" :rules="{ required: true, message: '请填写作者邮箱', trigger: 'blur' }">
          <el-input v-model="form.email" placeholder="请输入电子邮箱" style="width:400px;" size="small"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="5" :offset="5">
          <el-button type="primary" @click="submitEnroll()" size="small">提交报名</el-button>
          <el-button type="default" @click="goback()" size="small">取消</el-button>
        </el-col>
      </el-row>
        </el-col>
      </el-row>
    </el-card>
    <!-- ----------------- -->
    <el-card style="min-height:600px" v-show="showPreview">
      <div class="works-preview">
        <div class="title">
          <p>{{detailObj.title}}</p>
   
        </div>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="20" :offset="2">
            <div class="content-main">
              <div class="content-item">
                <div class="sub-title">作品封面</div>
                <div class="content" >
                  <el-image :src="detailObj.cover" :fit="cover"></el-image>
                </div>
              </div>
              <div class="content-item">
                <div class="sub-title">创作思想</div>
                <div class="content" v-html="detailObj.content"></div>
              </div>
              <div class="content-item" v-if="detailObj.production!=''">
                <div class="sub-title">创作过程</div>
                <div class="content">{{detailObj.production}}</div>
              </div>
              <div class="content-item" v-if="detailObj.reference!=''">
                <div class="sub-title">参考资源</div>
                <div class="content">{{detailObj.reference}}</div>
              </div>
              <div class="content-item" v-if="detailObj.environment!=''">
                <div class="sub-title">制作用软件及运行环境</div>
                <div class="content">{{detailObj.environment}}</div>
              </div>
              <div class="content-item" v-if="detailObj.remark!=''">
                <div class="sub-title">其他说明</div>
                <div class="content">{{detailObj.remark}}</div>
              </div>

              <div class="content-item" style="width:50%">
                <div class="sub-title">作品:</div>
                <div
                  class="content"
                  v-for="(item,index) in detailObj.attachment"
                  :key="index"
                >
                <template v-for="subItm in detailObj.attachment[index]">
                  <file-preview :fileObj="subItm"></file-preview>
                </template>
                </div>
              </div>
              <div class="content-item">
                <div class="sub-title">报名登记表:</div>
                <div class="content" style="width:475px">
                  <file-preview :fileObj="{name:'报名登记表',url:detailObj.registration}"></file-preview>
                </div>
              </div>
              <el-divider></el-divider>
              <div class="works-detail-main">
                <div class="works-detail-item">活动组别：{{form.activityName}}</div>
                <div class="works-detail-item">活动项目：{{form.activityProject}}</div>
                <div class="works-detail-item">学段：{{periodList[detailObj.period]}}</div>
                <div class="works-detail-item">学校：{{school}}</div>
                <div
                  class="works-detail-item"
                  v-if="detailObj.author!=undefined"
                >作者：{{detailObj.author.map(item=>{return item.name+'('+item.mobile+')'}).join('、')}}</div>
                <div
                  class="works-detail-item"
                  v-if="detailObj.mentor!=undefined"
                >指导老师：{{detailObj.mentor.map(item=>{return item.name+'('+item.mobile+')'}).join('、')}}</div>
                <div class="works-detail-item" >邮箱：{{detailObj.email}}</div>
              </div>
            </div>
             <el-row>
                <el-col :span="4" :offset="10" style="margin-top:30px;"> 
                <el-button type="primary" @click="previewSubmitEnroll()" size="small">确认报名</el-button>
                <el-button @click="closePreview()" size="small">返回</el-button>  
                </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

    </el-card>

    <!-- ------------------ -->
  </div>
</template>
<script>
import api from "../../service/api.js";
import MyEditor from "../../components/MyEditor";
import { getCookie, axiosGet, axiosPost, axiosPut } from "../../tools/tools";
import UploadPicture from "../../components/UploadPicture";
import UploadFile from "../../components/UploadFile";
import FilePreview from "../../components/FilePreview";
export default {
  components: { MyEditor, UploadPicture, UploadFile,FilePreview },
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
        email: "",
        school_id: "" //学校id
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
      content: "", //活动介绍
      activityProjectId: this.$route.query.id, //活动项目id
      activityProjectDetail: {}, //活动项目信息
      formats: [], //作品上传
      attachment: {}, //作品上传
      operate: this.$route.query.operate,
      uploadTypeObj: { 1: "picture", 2: "video", 3: "work", 4: "zip" },
      uploadTypeChar: { 1: "图片", 2: "视频", 3: "普通文档", 4: "压缩文件" },
      category_id: "",
      authorList: [{ name: "", mobile: "" }], //作者列表
      authorIds: [], //学生IDS
      teacherList: [{ name: "", mobile: "" }], //老师选择列表
      teacherIds: [], //老师ids
      production: "", //创作过程
      reference: "", //参考资料
      environment: "", //制作软件及运行环境
      remark: "", //其他说明
      schoolList: [], //学校列表
      period: this.$route.query.period, //学段id
      works_id:'',//作品id
      school:'',//学校名称
      periodList: {
        1: "幼教组",
        2: "小学组",
        4: "初中组",
        8: "高中组",
        16: "特教组",
        32: "中职组",
        64: "高教组"
      },
      showPreview:false,
      detailObj:{}
    };
  },
  created() {
   
  },
  mounted() {
    let params = {};
    if (this.operate != 0) {
      this.getEnrollDetail();
    } else {
      this.getObjectDetail();
    }
    this.getSchoolList();
  },
  watch:{
    

  },
  methods: {
    //选择学校
    schoolChange(data){
      for(let i in this.schoolList){
        if(this.schoolList[i].id==data){
          this.school=this.schoolList[i].title
        }
      }
    },
    //获取学校列表
    async getSchoolList() {
      let params = {};
      params.url = api.school;
      params.ball = 1;
      await this.axiosGet(params)
        .then(res => {
          this.schoolList = res.items;
        })
        .catch(err => err);
    },
    //读取报名项目详情
    async getEnrollDetail() {
      let that = this;
      let params = {};
      params.url = api.enroll;
      params.id = that.activityProjectId;
      params.expand = "info,works,school,professional,award";
      await that.axiosGet(params).then(res => {
        this.category_id = res.category_id;
        this.works_id=res.works.id
        that.form.activityProject = res.info.project;
        that.form.title = res.works.title;
        that.inputtext = res.works.content.content;
        that.production = res.works.content.production; //创作过程
        that.reference = res.works.content.reference; //参考资料
        that.environment = res.works.content.environment; //制作软件及运行环境
        that.remark = res.works.content.remark; //其他说明
        that.form.email = res.works.email;
        that.form.school_id = res.school_id;
        that.authorList = res.works.member.author;
        that.teacherList = res.works.member.mentor;
        that.period = res.period;
        that.activityProjectDetail.formats = [];

        for (let i in res.works.attachment) {
          let isHave = that.activityProjectDetail.formats.findIndex(items => {
            return (items.id == res.works.attachment[i].category_file_id);
          });
          console.log("ishave==", isHave!=-1);
          if (isHave == -1) {
            let item = {};
            item.id = res.works.attachment[i].category_file_id;
            item.type = res.works.attachment[i].type;
            item.remark = res.works.attachment[i].remark;
            item.fileList = [
              {
                title: res.works.attachment[i].title,
                url: res.works.attachment[i].url
              }
            ];
            that.activityProjectDetail.formats.push(item);
            that.attachment[item.id]=[{title:res.works.attachment[i].title,url:res.works.attachment[i].url}]  
          } else {
            for (let j in that.activityProjectDetail.formats) {
              if (
                res.works.attachment[i].category_file_id ==
                that.activityProjectDetail.formats[j].id
              ) {
                that.activityProjectDetail.formats[j].fileList.push({
                  url: res.works.attachment[i].url,
                  title: res.works.attachment[i].title
                });
                that.attachment[res.works.attachment[i].category_file_id].push({url:res.works.attachment[i].url,title:res.works.attachment[i].title})
              }
            }
          }
        }

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

    //作品上传
    upsuccess(data, id, type) {
      console.log("data==", data, "id==", id, "type==", type);
      let key = id;
      this.attachment[id] = [];
      data.forEach(item => {
        let attachmentItem = {};
        attachmentItem.url = item.url;
        if(item.name!=undefined){
          attachmentItem.title = item.name;
        }
        if(item.title!=undefined){
          attachmentItem.title = item.title;
        }
        this.attachment[id].push(attachmentItem);
      });
    },

    //提交报名
    async submitEnroll() {
      let params = {};
      params.url = api.works;
      params.category_id = this.activityProjectDetail.id;
      params.production = this.production;
      params.reference = this.reference;
      params.environment = this.environment;
      params.remark = this.remark;
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

      if (this.authorList.length > 0) {
        params.author = this.authorList;
      } else {
        this.$message({
          message: "请添加作者",
          type: "warning"
        });
        return;
      }

      params.mentor = this.teacherList;

      if (this.form.email !== "") {
        params.email = this.form.email;
      } else {
        this.$message({
          message: "请添加邮箱",
          type: "warning"
        });
        return;
      }
      if (this.form.school_id != "") {
        params.school_id = this.form.school_id;
      } else {
        this.$message({
          message: "请选择学校",
          type: "warning"
        });
        return;
      }
      params.period = this.period;
      params.attachment = this.attachment;
      console.log("params===", params);
      if (this.operate == 0) {
        this.showPreview=true
        this.detailObj=params
      } else {
        params.id=this.works_id
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
              setTimeout(() => {}, 1000);
            } else {
              that.$router.go(-1);
            }
          })
          .catch(err => err);
      }
    },
    //确认报名
    async previewSubmitEnroll(){
      let params= this.detailObj
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
                
              }, 1000);
            } else {
              that.$router.go(-1);
            }
          })
          .catch(err => err);
    },
    //关闭预览
    closePreview(){
      this.showPreview=false
    },
    //富文本编辑器
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

    //添加作者
    addAuthor() {
      if (this.authorList.length < this.author_limit) {
        let author = { name: "", mobile: "" };
        this.authorList.push(author);
      } else {
        this.$message({
          type: "warning",
          message: "人数已超出"
        });
      }
    },
    //删除作者
    deleteAuthor(index) {
      this.authorList.splice(index, 1);
    },

    //添加老师
    addTeacher() {
      if (this.teacherList.length < this.mentor_limit) {
        let author = { name: "", mobile: "" };
        this.teacherList.push(author);
      } else {
        this.$message({
          type: "warning",
          message: "人数已超出"
        });
      }
    },
    //删除老师
    deleteTeacher(index) {
      this.teacherList.splice(index, 1);
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
.my-editerContain {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  margin-left: 10px;
  p {
    width: 80px;
    font-size: 14px;
    color: #666;
  }
}
.my-editer{
  margin-left: 10px;
  max-width: 900px;
}
//上传图片视频等按钮的样式
.my-button{
  min-width: 200px!important;
}
.limit{
  color:#999999;
  font-size:14px;
}
.leftpad{
  padding-left:20px;
}
.works-preview {
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .content-main {
    .content-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .sub-title {
        font-size: 16px;
        color: #333;
      }
      .content {
        margin-top: 10px;
        font-size: 14px;
        color: #666;
        line-height: 30px;
      }
    }
  }
  .works-detail-main {
    display: flex;
    flex-direction: column;

    .works-detail-item {
      font-size: 14px;
      color: #333;
      margin-bottom: 10px;
    }
  }
}
</style>