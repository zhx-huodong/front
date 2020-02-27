<template>
      <div style=" clear: both;text-align: left;">
          <el-form ref="form" :model="form" :inline="true">
            <el-form-item label="所在地区：">
              <el-select v-model="form.addr" placeholder="请选择" >
                <el-option v-for="item in AddrList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在学校：">
              <el-select v-model="form.schoolname" placeholder="请选择" >
                <el-option v-for="item in SchoolList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作品名称：">
              <el-input v-model="form.workname" placeholder="请输入作品名称"> </el-input>
            </el-form-item>
            <el-form-item label="电话：">
              <el-input v-model="form.phone" placeholder="请输入电话"> </el-input>
            </el-form-item>
            <el-form-item label="作者：">
               <el-input v-model="form.author" placeholder="请输入"> </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">查询</el-button>
            </el-form-item> 
          </el-form> 
          <!--展示内容-->
          <div class="buttonenum">
             <el-button size="medium" type="primary" >设置奖项</el-button>
             <el-button size="medium">推荐省级</el-button>
             <el-button size="medium">下载作品</el-button>
             <el-button size="medium">下载表单</el-button>
             <el-button size="medium">回退</el-button>
          </div>
          <div style="margin-top:16px;">
            <template>
              <!-- 序号 报名时间 报名人 联系电话 所在地区 所在学校 -->
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column
                  label="序号"
                  type="index"
                   width="140"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="作品名称"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="athuor"
                  label="指导老师"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="schoolname"
                  label="所在学校"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="所在地区"
                  width="140">
                </el-table-column>
                
                <el-table-column
                  prop="score"
                  label="得分"
                  width="140">
                </el-table-column>
                 <el-table-column
                  prop="getHonor"
                  label="获奖"
                  width="140">
                </el-table-column>
                 <el-table-column
                  prop="tuijian"
                  label="推荐"
                  width="140">
                </el-table-column>
              </el-table>
            </template>
          </div>
           <div class="block">
              
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[10]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="10">
              </el-pagination>
            </div>


     
      </div>
      
    
</template>
<script>
  export default {
    data() {

      return {
          
            filterMethod(query, item) {
              return item.pinyin.indexOf(query) > -1;
            },
            form:{
              addr:'',
              schoolname:'',
              workname:'',
              phone:'',
              author:'',
            
            },
            AddrList:[
                {id:1,name:"宝安"},
                {id:2,name:"福田"},
                {id:3,name:"南山"},
            ],
            SchoolList:[
                {id:1,name:"一中"},
                {id:2,name:"二中"},
                {id:3,name:"三中"},
            ],
            
            tableData:[
                {name:"森林精灵" , athuor:"赵四", address:"罗湖区",schoolname:"罗湖中学",score:"95", getHonor:"一等奖",tuijian:"推荐省级"},
                {name:"森林精灵" , athuor:"赵四", address:"罗湖区",schoolname:"罗湖中学",score:"95", getHonor:"一等奖",tuijian:"推荐省级"},
                {name:"森林精灵" , athuor:"赵四", address:"罗湖区",schoolname:"罗湖中学",score:"95", getHonor:"一等奖",tuijian:"推荐省级"},
                {name:"森林精灵" , athuor:"赵四", address:"罗湖区",schoolname:"罗湖中学",score:"95", getHonor:"一等奖",tuijian:"推荐省级"},
                {name:"森林精灵" , athuor:"赵四", address:"罗湖区",schoolname:"罗湖中学",score:"95", getHonor:"一等奖",tuijian:"推荐省级"},
                {name:"森林精灵" , athuor:"赵四", address:"罗湖区",schoolname:"罗湖中学",score:"95", getHonor:"一等奖",tuijian:"推荐省级"},
                {name:"森林精灵" , athuor:"赵四", address:"罗湖区",schoolname:"罗湖中学",score:"95", getHonor:"一等奖",tuijian:"推荐省级"},
                {name:"森林精灵" , athuor:"赵四", address:"罗湖区",schoolname:"罗湖中学",score:"95", getHonor:"一等奖",tuijian:"推荐省级"},
                {name:"森林精灵" , athuor:"赵四", address:"罗湖区",schoolname:"罗湖中学",score:"95", getHonor:"一等奖",tuijian:"推荐省级"},
                {name:"森林精灵" , athuor:"赵四", address:"罗湖区",schoolname:"罗湖中学",score:"95", getHonor:"一等奖",tuijian:"推荐省级"},
            ],
              currentPage1:1,
              
            
      };
    },
    methods: {
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
      
    
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }

    }
  };
</script>
<style lang="less" scoped>
  .secendROw{
        margin-left: -126px;
  }
  .block{
    margin-top:16px;
    margin-left:276px;
  }
  .buttonenum{
    float:left;
    margin:20px 0 10px 0;
  }
</style>
