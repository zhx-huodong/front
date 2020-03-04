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
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
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
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :limit="1"
          list-type="picture"
          :before-upload="beforeAvatarUpload"
            >
          <el-button size="small" type="primary" @click="upload()" plain>点击上传</el-button>
        </el-upload>
        </div>
        </el-form-item>
        <el-form-item label="作品上传：">
          <div class="upload-container">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1"
              list-type="picture"
              :before-upload="beforeAvatarUpload" >
              <el-button size="small" type="primary"  @click="upload()" plain>点击上传</el-button>
            </el-upload>
            <p>作品为  JPG、BMP等常用格式，大小不超过20MB</p>
          </div>
        </el-form-item>
        <el-form-item label="">
          <div class="upload-container">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1"
              list-type="picture"
              :before-upload="beforeAvatarUpload" >
              <el-button size="small" type="primary"  @click="upload()" plain>点击上传</el-button>
            </el-upload>
            <p>支持  MPG、MPEG、AVI、MP4、MOV、等常用格式，大小不超过100MB.</p>
          </div>
        </el-form-item>
        <el-form-item label="">
          <div class="upload-container">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1"
              list-type="picture"
              :before-upload="beforeAvatarUpload" >
              <el-button size="small" type="primary"  @click="upload()" plain>点击上传</el-button>
            </el-upload>
            <p>文件大小不超过700MB</p>
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
                @keyup.enter.native="authorInputConfirm"
                @blur="authorInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showAuthorInput" type="primary">添加作者</el-button>
              <el-tag type="info">限制2人</el-tag>
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
              <el-tag type="info">限制2人</el-tag>
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
import UploadFile from '../../components/UploadFile';
import MyEditor from '../../components/MyEditor';
export default {
    components: { UploadFile,MyEditor },
    data(){
        return{
          activeName:'first',
          activeName2:'two',
          form: {
            activityName:'数字创作',
            activityProject:'电脑绘画',
            name: '',
            desc: ''
          },
          authorTags: ['陆同学', '刘同学'],
          authorInputVisible: false,
          authorInputValue: '',
          teacherTags: ['吴老师', '陈老师'],
          teacherInputVisible: false,
          teacherInputValue: '',
        }
    },
    methods:{
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeAvatarUpload(file){
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
        this.authorTags.splice(this.authorTags.indexOf(tag), 1);
      },

      showAuthorInput() {
        this.authorInputVisible = true;
        this.$nextTick(_ => {
          this.$refs.authorSaveTagInput.$refs.input.focus();
        });
      },

      authorInputConfirm() {
        let authorInputValue = this.authorInputValue;
        if (authorInputValue) {
          this.authorTags.push(authorInputValue);
        }
        this.authorInputVisible = false;
        this.authorInputValue = '';
      },
      //作者
      teacherClose(tag) {
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