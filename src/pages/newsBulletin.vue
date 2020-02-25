<template>
  <div class="news-bulletin">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="float:left;margin-left:30px;" class="title">消息公告</span>
      </div>
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="作者：">
            <el-input v-model="form.name"  placeholder="请输入"> </el-input>
        </el-form-item>
        <el-form-item label="报名时间：">
            <el-date-picker
              format="yyyy-MM-dd"
              v-model="form.enrolltime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="onSubmit()">查询</el-button>
        </el-form-item>
      </el-form> 
    <div style="margin-top:16px;">
      <template> 
        <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background:'rgba(243,243,244,1)'}">
          <!-- <el-table-column
            label="序号"
            type="index"
              width="180"
            align="center">
          </el-table-column> -->
          <el-table-column
            prop="name"
            label="名称"
            >
          </el-table-column>
          <el-table-column
            prop="time"
            label="提交时间"
            >
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              >
              <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" >查看</el-button>
              </template>
          </el-table-column>
          
        </el-table>
      </template>
 
    </div>
  </el-card>
  </div>
</template>
<script>
 export default {
    data() {
       return{
            form:{
                name:"",
            },
            tableData:[
                {name:'绘画比赛获奖名单',time:"2019.10.30"},
                {name:'绘画比赛获奖名单',time:"2019.10.30"}
            ],
       }
    },
     methods: {
         handleClick(item){
             this.$router.push({
                 path:"/newsBulletinDetail"
             })
         }
     }
    }
    
</script>
<style  lang="less" scoped>
.news-bulletin{
  width: 1180px;
  margin: auto;
  margin-top: 20px;
}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    min-height: 650px;
  }
  .title{
      font-size:16px;
        font-family:Adobe Heiti Std;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:43px;
  }
 
</style>