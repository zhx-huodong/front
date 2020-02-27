<template>
  <div class="activity-enroll">
   <el-card class="box-card">
        <el-tabs v-model="activeName">
          <el-tab-pane label="活动报名" name="first">
            <el-form ref="form" :model="form" label-width="90px">
              <el-form-item label="作品名称：">
                <el-input v-model="form.name" placeholder="请输入作品名称" style="width:500px;"></el-input>
              </el-form-item>
              <el-form-item label="作品简介：">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入作品简介"
                  v-model="form.name"
                  style="width:800px;">
                </el-input>
              </el-form-item>
              <el-form-item label="报名登记：">
                <div class="dianji1">
                 <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :limit="1"
                list-type="picture"
                :before-upload="beforeAvatarUpload"
                 >
                <el-button size="small" type="primary" @click="upload()">点击上传</el-button>
              </el-upload>
              </div>
              </el-form-item>
              <el-form-item label="作品附件：">
                <div class="dianji2">
                  <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :limit="1"
                  list-type="picture"
                  :before-upload="beforeAvatarUpload" >
                  <el-button size="small" type="primary"  @click="upload()">点击上传</el-button>
                </el-upload>
              </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <el-tabs v-model="activeName2">
          <el-tab-pane label="报名信息" name="two">
            <el-form ref="form" :model="form" label-width="90px">
              <el-form-item label="作者：">
                <el-input v-model="form.name" placeholder="请输入作品人" style="width:500px;"></el-input>
              </el-form-item>
              <el-form-item label="指导老师：">
                <el-input v-model="form.name" placeholder="请输入指导老师" style="width:500px;"></el-input>
              </el-form-item>
              <el-form-item label="作者邮箱：">
                <el-input v-model="form.name" placeholder="请输入电子邮箱" style="width:500px;"></el-input>
              </el-form-item>
               <el-form-item label="作者人数：">
                <el-input v-model="form.name" placeholder="请输入（限制）人数" style="width:500px;"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-row>
          <el-col :span="2" :offset="11">
            <el-button type="primary" @click="submitEnroll()">提交报名</el-button>
          </el-col>
        </el-row>
    </el-card>
  </div>
</template>
<script>
import UploadFile from '../../components/UploadFile';
export default {
     components: { UploadFile },
    data(){
        return{
          activeName:'first',
          activeName2:'two',
            form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          }
        }
    },
    methods:{
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
  }

</style>