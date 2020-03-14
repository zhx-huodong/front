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
          <el-input v-model="form.name" placeholder="请输入作品名称" style="width:400px;" size="small"></el-input>
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
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
              <span
                style="font-size: 12px;position: absolute;top: 26%;left: 15%;color:#ccc"
              >添加作品封面 (JPG、PNG格式)</span>
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
               list-type="picture-card"
          
            >
              <i class="el-icon-plus"></i>
               <span
                style="font-size: 12px;position: absolute;top: 26%;left:41%;color:#ccc"
              >点击上传</span>
          <!-- <el-button size="small" type="primary" @click="upload(1)" plain>点击上传</el-button> -->
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
               list-type="picture-card"
               >
               <i class="el-icon-plus"></i>
                <span
                style="font-size: 12px;position: absolute;top: 26%;left: 41%;color:#ccc"
              >点击上传</span>
              <!-- <el-button size="small" type="primary"  @click="upload(2)" plain>点击上传</el-button> -->
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
                 <span
                style="font-size: 12px;position: absolute;top: 26%;left: 41%;color:#ccc"
              >点击上传</span>
              <!-- <el-button size="small" type="primary"  @click="upload(3)" plain>点击上传</el-button> -->
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
              list-type="picture-card"
               >
                 <i class="el-icon-plus"></i>
                  <span
                style="font-size: 12px;position: absolute;top: 26%;left: 41%;color:#ccc"
              >点击上传</span>
              <!-- <el-button size="small" type="primary"  @click="upload()" plain>点击上传</el-button> -->
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
              <el-input
                class="input-new-tag"
                v-if="authorInputVisible"
                v-model="authorInputValue"
                ref="authorSaveTagInput"
                size="small"
                @keyup.enter.native="authorInputConfirm(tag)"
                @blur="authorInputConfirm"
              >
              </el-input>
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
              <el-input
                class="input-new-tag"
                v-if="teacherInputVisible"
                v-model="teacherInputValue"
                ref="teacherSaveTagInput"
                size="small"
                @keyup.enter.native="teacherInputConfirm"
                @blur="teacherInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" type="primary" size="small" @click="showTeacherInput" >添加指导老师</el-button>
              <el-tag type="info">限制{{mentor_limit}}人</el-tag>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="作者邮箱：">
          <el-input v-model="form.name" placeholder="请输入电子邮箱" style="width:400px;" size="small"></el-input>
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
import { getCookie, axiosGet } from '../../tools/tools';
export default {
    components: { UploadFile,MyEditor },
    data(){
        return{
            headers:{
          'x-api-key':getCookie("x-api-key"),
          },
         action:api.uploadPic,
        apipath:"http://api.huodong.eduinspector.com",
          activeName:'first',
          activeName2:'two',
          form: {
            activityName:'数字创作',
            activityProject:'电脑绘画',
            name: '',
            desc: '',
            banner:[],
            cover:[]
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
          items:[],
        }
    },
    created(){
      console.log(this.action)
      var object_=JSON.parse(sessionStorage.getItem("object_"))
      this.object_=object_;
      this.categoryDetail=object_.categoryDetail
      this.handle();
    },
    methods:{

         upsuccess(response, file, fileList) {
           
          //    this.form.cover=[]
          //   fileList.forEach(item=>{
          //     item.response.files.forEach(ite=>{
                
          //       this.form.cover.push(this.apipath+ite.path)
          //     })
          //   })
          //  console.log(this.form.cover)
          //  var activedata=JSON.parse(sessionStorage.getItem("activedata"))
          //  activedata.cover=this.form.cover[0]
          //  sessionStorage.setItem("activedata",JSON.stringify(activedata))
            
        },

      handle(){
        var data=JSON.parse(sessionStorage.getItem("OneObject"))
        this.object_.categoryDetail.forEach(item=>{
            if(item.id==data.pid){
                this.form.activityName=item.title
            }
        })
        console.log(data,"...........")
       this.form.activityProject=data.title
       data.formats.forEach((item,index)=>{
         console.log(item)
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
    // tv_id!=".mp4"&&tv_id!=".rmvb"&&tv_id!=".avi"&&tv_id!=".ts"

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
      // const extension =
      //   testmsg === "jpg" ||
      //   testmsg === "JPG" ||
      //   testmsg === "png" ||
      //   testmsg === "PNG" ||
      //   testmsg === "bpm" ||
      //   testmsg === "BPM";
      //   if (!extension) {
      //     this.$message({
      //       message: "上传图片只能是jpg / png / bpm格式!",
      //       type: "error"
      //     });
      //     return false; //必须加上return false; 才能阻止
      //   }
        if(this.ppp[2]<file.size){
           this.$message({
            message: "上传单个文件大小超过了",
            type: "error"
          });
          return false;
        }
    },






      submitEnroll(){
        this.$router.push({
          path:"/home/submitEnroll",
        })
      },
      updata(item){
        console.log(item)
      },
      onSubmit() {
        console.log('submit!');
      },
      handlePictureCardPreview(){

      },
      editorChange(){

      },
      //作者
      authorClose(tag) {
        console.log(tag,"tag2")
        this.authorTags.splice(this.authorTags.indexOf(tag), 1);
      },
    //查询学生
    
    isPhoneNumber(tel) {
        var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
        return reg.test(tel);
    },
   async  selectStudent(){
      //  //判断是否是手机号
      let params={}
      var mtype=[]
      mtype=JSON.parse(sessionStorage.getItem("baomingdata"));
      console.log(mtype)
      console.log(mtype.toString())
      
      // console.log(typeof(mtype))
      if(mtype.length>0){
       
        params.mtype=mtype.toString();
      }
     
      params.url=api.user
      // params.mtype=sessionStorage.getItem
      params.expand='memberAuth,memberInfo,roleInfo';
     
      if(this.isPhoneNumber(this.authorInputValue)==false){
          var name=this.authorInputValue
          params.name=name
      }else{
          var mobile=this.authorInputValue
          params.mobile=mobile
      }
      let res = await this.axiosGet(params).catch(err => err);
          this.items=res.items
    },
      showAuthorInput() {
        this.authorInputVisible = true;
        
        this.$nextTick(_ => {
          this.$refs.authorSaveTagInput.$refs.input.focus();
        });
      },

      authorInputConfirm(tag) {
        console.log(tag,"tag")
        this.selectStudent();
        if(this.items.length==0){
          this.authorInputValue="";
          return false;
        }else{

       
        // console.log("this.authorInputValue",'111111111111',this.authorInputValue)
        let authorInputValue = this.authorInputValue;
        if (authorInputValue) {
          this.authorTags.push(authorInputValue);
        }
        this.authorInputVisible = false;
        this.authorInputValue = '';
         }
      },
      //作者
      teacherClose(tag) {
        console.log(tag)
        this.teacherTags.splice(this.teacherTags.indexOf(tag), 1);
      },

      showTeacherInput() {
        this.teacherInputVisible = true;
        this.$nextTick(_ => {
          this.$refs.teacherSaveTagInput.$refs.input.focus();
        });
      },

      teacherInputConfirm() {
        let teacherInputValue = this.teacherInputValue;
        if (teacherInputValue) {
          this.teacherTags.push(teacherInputValue);
        }
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