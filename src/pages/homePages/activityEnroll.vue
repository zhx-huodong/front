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
                <el-button type="primary" plain  @click="updata(1)">点击上传</el-button>
              </el-form-item>
              <el-form-item label="作品附件：">
                <el-button type="primary" plain  @click="updata(2)">点击上传</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <el-tabs v-model="activeName2">
          <el-tab-pane label="报名信息" name="two">
            <el-form ref="form" :model="form" label-width="90px">
              <el-form-item label="作品人：">
                <el-input v-model="form.name" placeholder="请输入作品人" style="width:500px;"></el-input>
              </el-form-item>
              <el-form-item label="指导老师：">
                <el-input v-model="form.name" placeholder="请输入指导老师" style="width:500px;"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱：">
                <el-input v-model="form.name" placeholder="请输入电子邮箱" style="width:500px;"></el-input>
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
export default {
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
    display: inline-block;
    min-height: 650px;
  }

</style>