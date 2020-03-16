<template>
  <div class="activity-enroll">
   <el-card class="box-card">
      <div class="title">
        <p>活动报名</p>
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="活动组别：">
          <el-input v-model="form.activityName" placeholder="请输入活动组别" style="width:400px;" size="small" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="活动项目：">
          <el-input v-model="form.activityProject" placeholder="请输入活动项目" style="width:400px;" size="small" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="作品名称：">
          <el-input v-model="form.title" placeholder="请输入作品名称" style="width:400px;" size="small"></el-input>
        </el-form-item>
        <el-form-item label="作品封面：">
          <template>
            <el-upload
              :on-success="upsuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headers"
              :action="action"
              :name="filename" 
              :file-list="form.cover" 
              list-type="picture-card">
              <i class="el-icon-plus"></i>
              <span style="font-size: 12px;position: absolute;top: 26%;left: 15%;color:#ccc">添加作品封面 (JPG、PNG格式)</span>
            </el-upload>
          </template>
        </el-form-item>
        <el-form-item label="作品简介：">
          <div class="my-editor-main">
            <my-editor @editorChange="editorChange"></my-editor>
          </div>
        </el-form-item>
        <el-form-item label="报名登记：">
          <div class="dianji1">
            <el-upload
              :before-upload="beforeAvatarUpload"
              :on-success="upsuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headers"
              :action="action"
              :name="filename" 
              :file-list="form.banner" 
              :limit="1"
              list-type="picture-card">
            <i class="el-icon-plus"></i>
            <span style="font-size: 12px;position: absolute;top: 26%;left:41%;color:#ccc">点击上传</span>
        </el-upload>
        </div>
        </el-form-item>
        <el-form-item label="作品上传：">
          <div class="upload-container">
            <el-upload
              :before-upload="beforeAvatarUpload1"
              :on-success="upsuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headers"
              :action="action"
              :name="filename" 
              :file-list="form.banner" 
              list-type="picture-card">
              <i class="el-icon-plus"></i>
              <span style="font-size: 12px;position: absolute;top: 26%;left: 41%;color:#ccc">点击上传</span>
            </el-upload>
            <p>{{pp[0]}}</p>
          </div>
        </el-form-item>
        <el-form-item label="">
          <div class="upload-container">
            <el-upload
              :before-upload="beforeAvatarUpload2"
              :on-success="upsuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headers"
              :action="action"
              :name="filename" 
              :file-list="form.banner" 
              list-type="picture-card"
              >
                <i class="el-icon-plus"></i>
                <span style="font-size: 12px;position: absolute;top: 26%;left: 41%;color:#ccc">点击上传</span>
            </el-upload>
            <p>{{pp[1]}}</p>
          </div>
        </el-form-item>
        <el-form-item label="">
          <div class="upload-container">
            <el-upload
             :before-upload="beforeAvatarUpload3"
              :on-success="upsuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headers"
              :action="action"
              :name="filename" 
              :file-list="form.banner" 
              list-type="picture-card">
                <i class="el-icon-plus"></i>
                <span style="font-size: 12px;position: absolute;top: 26%;left: 41%;color:#ccc">点击上传</span>
            </el-upload>
            <p>{{pp[2]}}</p>
          </div>
        </el-form-item>
        <el-form-item label="作者：">
          <el-row>
            <el-col :span="16">
             <el-tag
                :key="tag"
                v-for="tag in authorTags"
                closable
                :disable-transitions="false"
                @close="authorClose(tag)">
                {{tag}}
              </el-tag>
              <el-select filterable placeholder="请选择作者" 
                v-if="authorInputVisible"
                v-model="authorInputValue"
                ref="authorSaveTagInput"
                size="small"
                @change="authorInputConfirm">
                <el-option
                  v-for="item in studentList"
                  :key="item.id"
                  :label="item.name"
                  :value="item">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.memberInfo[0].school.title }}</span>
                </el-option>
              </el-select>
              <el-button v-else class="button-new-tag" size="small" @click="showAuthorInput" type="primary">添加作者</el-button>
              <el-tag type="info">限制{{author_limit}}人</el-tag>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="指导老师：">
          <el-row>
            <el-col :span="16">
             <el-tag
                :key="tag"
                v-for="tag in teacherTags"
                closable
                :disable-transitions="false"
                @close="teacherClose(tag)">
                {{tag}}
              </el-tag>
              
              <el-select filterable placeholder="请选择指导老师" 
                v-if="teacherInputVisible"
                v-model="teacherInputValue"
                ref="teacherSaveTagInput"
                size="small"
                @change="teacherInputConfirm">
                <el-option
                  v-for="item in teacherList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.memberInfo[0].school.title }}</span>
                </el-option>
              </el-select>
              <el-button v-else class="button-new-tag" type="primary" size="small" @click="showTeacherInput" >添加指导老师</el-button>
              <el-tag type="info">限制{{mentor_limit}}人</el-tag>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="作者邮箱：">
          <el-input v-model="form.email" placeholder="请输入电子邮箱" style="width:400px;" size="small"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="2" :offset="6">
          <el-button type="primary" @click="submitEnroll()" size="small">提交报名</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import api from '../../service/api.js';
import UploadFile from '../../components/UploadFile';
import MyEditor from '../../components/MyEditor';
import { getCookie, axiosGet, axiosPost } from '../../tools/tools';
export default {
    components: { UploadFile,MyEditor },
    data(){
        return{
          headers:{
          'x-api-key':getCookie("x-api-key"),
          },
          action:api.uploadPic,
          apipath:"http://api.huodong.eduinspector.com",
          form: {
            activityName:'',
            activityProject:'',
            title: '',
            banner:[],
            cover:[],
            email:''
          },
          authorTags: [],
          authorInputVisible: false,
          authorInputValue: '',
          teacherTags: [],
          teacherInputVisible: false,
          teacherInputValue: '',
          object_:{},
          categoryDetail:{},
          title:"",
          pp:[],
          author_limit:"",
          mentor_limit:"",
          filename:"upFile",
          ppp:[],
          studentList:[],//学生选择列表
          authorIds:[],//学生IDS
          teacherList:[],//老师选择列表
          teacherIds:[],//老师ids
          content:'',//活动介绍
          category_id:'',//活动id
        }
    },
    created(){
      console.log(this.action)
      var object_=JSON.parse(sessionStorage.getItem("object_"))
      this.object_=object_;
      this.categoryDetail=object_.categoryDetail
      this.handle();
      let params={}
      this.getTeacherList(params) 
    },
    mounted(){
      let params={}
      this.getStudentList(params) 
    },
    methods:{
        async postData(){
          let params={
            "category_id":19,
              "title":"大闹天宫",
              "cover":"https://edu-cloud-dev-1255701415.cos.ap-guangzhou.myqcloud.com/activity_platform/20190930180753.jpg",
              "content":"大闹天宫动漫",
              "registration":"https://edu-cloud-dev-1255701415.cos.ap-guangzhou.myqcloud.com/activity_platform/20190930180753.jpg",
              "author":[7],
              "mentor":[5],
              "email":"77288022@qq.com",
              "attachment":{
                "19":[
                  "https://edu-cloud-dev-1255701415.cos.ap-guangzhou.myqcloud.com/activity_platform/20190930180753.jpg",
                  "https://edu-cloud-dev-1255701415.cos.ap-guangzhou.myqcloud.com/activity_platform/20190930180753.jpg"
                ],
                "20":[
                  "https://edu-cloud-dev-1255701415.cos.ap-guangzhou.myqcloud.com/activity_platform/20190930180753.jpg",
                  "https://edu-cloud-dev-1255701415.cos.ap-guangzhou.myqcloud.com/activity_platform/20190930180753.jpg"
                ]
              }
          }
          params.url=api.works
          let res=await axiosPost(params).catch(err=>err)
        },

         upsuccess(response, file, fileList) {
            
        },

      handle(){
        var data=JSON.parse(sessionStorage.getItem("OneObject"))
        this.object_.categoryDetail.forEach(item=>{
            if(item.id==data.pid){
              this.form.activityName=item.title
            }
        })
       this.form.activityProject=data.title
       data.formats.forEach((item,index)=>{
         console.log(item.remark,item.size/1024)
         this.pp.push(item.remark+(item.size/1024)+'M')
         this.ppp.push(item.size)
         this.author_limit=data.author_limit
         this.mentor_limit=data.mentor_limit
       })
       
      },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //报名登记上传
    beforeAvatarUpload(file){
      console.log(file)
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        testmsg === "jpg" ||
        testmsg === "JPG" ||
        testmsg === "png" ||
        testmsg === "PNG" ||
        testmsg === "bpm" ||
        testmsg === "BPM";
        if (!extension) {
          this.$message({
            message: "上传图片只能是jpg / png / bpm格式!",
            type: "error"
          });
          return false; //必须加上return false; 才能阻止
        }
      },

    //作品上传
    beforeAvatarUpload1(file){
      console.log(file,this.ppp[0])
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        testmsg === "jpg" ||
        testmsg === "JPG" ||
        testmsg === "png" ||
        testmsg === "PNG" ||
        testmsg === "bpm" ||
        testmsg === "BPM";
        if (!extension) {
          this.$message({
            message: "上传图片只能是jpg / png / bpm格式!",
            type: "error"
          });
          return false; //必须加上return false; 才能阻止
        }
        if(this.ppp[0]<file.size){
           this.$message({
            message: "上传单个文件大小超过了",
            type: "error"
          });
          return false;
        }
    },
    //作品上传
    beforeAvatarUpload2(file){
      console.log(file)
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        testmsg === "mp4" ||
        testmsg === "rmvb" ||
        testmsg === "avi" ||
        testmsg === "ts" ;//||
        // testmsg === "bpm" ||
        // testmsg === "BPM";
        if (!extension) {
          this.$message({
            message: "上传图片只能是jpg / png / bpm格式!",
            type: "error"
          });
          return false; //必须加上return false; 才能阻止
        }
        if(this.ppp[1]<file.size){
           this.$message({
            message: "上传单个文件大小超过了",
            type: "error"
          });
          return false;
        }
    },
    //作品上传
    beforeAvatarUpload3(file){
      console.log(file)
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
        if(this.ppp[2]<file.size){
           this.$message({
            message: "上传单个文件大小超过了",
            type: "error"
          });
          return false;
        }
    },
    submitEnroll(){
      this.postData();
      // this.$router.push({
      //   path:"/home/submitEnroll",
      // })
      let params={}
      if(this.form.title!=''){
        params.title=this.form.title
      }else{
        this.$message({
          message: "请添加作品名称",
          type: "warning"
        });
        return
      }
      if(this.content!==''){
        params.content=this.content
      }else{
        this.$message({
          message: "请添加活动介绍",
          type: "warning"
        });
        return
      }
      if(this.authorIds.length>0){
        params.author=this.authorIds
      }else{
        this.$message({
          message: "请添加作者",
          type: "warning"
        });
        return
      }
      if(this.teacherIds.length>0){
        params.mentor=this.teacherIds
      }else{
        this.$message({
          message:'请添加指导老师',
          type: "warning"
        })
        return;
      }
      if(this.form.email!==''){
        params.email=this.form.email
      }else{
        this.$message({
          message:'请添加邮箱',
          type: "warning"
        })
        return;
      }
    },
 
    editorChange(data){
      this.content=this.data
    },
    
    //获取学生列表
    async  getStudentList(params){
      delete params.mtype
      params.url=api.user
      params.expand='memberAuth,memberInfo,roleInfo'
      params.mtype=2
      params.ball=1
      await this.axiosGet(params).then(res=>{
        this.studentList=res.items
      }).catch(err => err); 
    },
    //获取老师列表
    async  getTeacherList(params){
      delete params.mtype
      params.url=api.user
      params.expand='memberAuth,memberInfo,roleInfo'
      params.mtype=1
      params.ball=1
      await this.axiosGet(params).then(res=>{
        this.teacherList=res.items
      }).catch(err => err); 
    },

    //作者
    authorClose(tag) {
      this.authorTags.splice(this.authorTags.indexOf(tag), 1);
    },

    showAuthorInput() {
      this.authorInputVisible = true;
    },

    authorInputConfirm(tag) {
      this.authorIds.push(tag.id)
      this.authorTags.push(tag.name);
      this.authorInputVisible = false;
      this.authorInputValue=''
    },
    //作者
    teacherClose(tag) {
      this.teacherTags.splice(this.teacherTags.indexOf(tag), 1);
    },

    showTeacherInput() {
      this.teacherInputVisible = true;
    },

    teacherInputConfirm(data) {
      this.teacherTags.push(data.name);
      this.teacherIds.push(data.id)
      this.teacherInputVisible = false;
      this.teacherInputValue = '';
    }
  }
}
</script>
<style lang="less" scoped>  
  .activity-enroll{
    width:1180px;
    margin: auto;
    margin-top: 20px;
  }
  .box-card {
    min-height: 650px;
    .title{
      display:flex;
      justify-content:center;
      p{
        font-size:18px;
        color:#333;
      }
    }
    .upload-container{
      display:flex;
      flex-direction:row;
      p{
        font-size:14px;
        color:#999;
        margin-left:20px;
      }
    }
  }

</style>