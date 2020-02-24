<template>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span style="float:left;margin-left:30px;" class="title">消息公告</span>
  </div>
  <div>
      <el-form ref="form" :model="form">
          <el-row>
                   <el-col style="margin-top:5px" :xs="12" :sm="12" :md="5" :span="8">
                       <span style="float:left;width:40%;   text-align: right;">作者：</span>
                      <el-input v-model="form.name" size="mini" class="filterinput" style="width:55%" placeholder="请输入"> </el-input>
                  </el-col>
                   <el-col style="margin-top:5px" :xs="12" :sm="12" :md="10" :span="8">
                      <span style="float:left;width:40%;text-align: right;">报名时间：</span>
                          <el-date-picker
                              format="yyyy-MM-dd"
                              v-model="form.enrolltime"
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              size="mini"
                              style="width:50%">
                              
                          </el-date-picker>
                  </el-col>
                  <el-col style="margin-top:5px" :xs="24" :sm="24" :md="2">
                      <el-button style="float:left; width:100%" type="primary" @click="onSubmit()" size="mini">查询</el-button>
                  </el-col>
            </el-row>
          </el-form>
  </div>
 
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
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
                </el-table-column>


              </el-table>
            </template>
 
    </div>
</el-card>
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
<style  lang="less">
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
    width: 1200px;
  }
  .title{
      font-size:16px;
        font-family:Adobe Heiti Std;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:43px;
  }
 
</style>