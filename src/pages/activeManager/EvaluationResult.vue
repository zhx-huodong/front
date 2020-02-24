<template>
      <div style=" clear: both;text-align: left;">
          <el-form ref="form" :model="form">
              <el-row :gutter="3">
                  <el-col style="margin-top:5px" :xs="12" :sm="12" :md="5" :span="8">
                      <span style="float:left;width:40%;   text-align: right;">所在地区：</span>
                      <el-select v-model="form.addr" placeholder="请选择" size="mini"  class="filterinput" style="width:50%">
                          <el-option v-for="item in AddrList" :key="item.id" :label="item.name" :value="item.id">
                          </el-option>
                      </el-select>
                  </el-col>
                  <el-col style="margin-top:5px" :xs="12" :sm="12" :md="5" :span="8">
                      <span style="float:left;width:40%;   text-align: right;">所在学校：</span>
                      <el-select v-model="form.schoolname" placeholder="请选择" size="mini" class="filterinput" style="width:50%">
                          <el-option v-for="item in SchoolList" :key="item.id" :label="item.name" :value="item.id">
                          </el-option>
                      </el-select>
                  </el-col>
                    <el-col style="margin-top:5px" :xs="12" :sm="12" :md="10" :span="8">
                      <span style="float:left;width:40%;text-align: right;">作品名称：</span>
                      <el-input v-model="form.workname" size="mini" class="filterinput" style="width:55%" placeholder="请输入作品名称"> </el-input>
                  </el-col>
              </el-row>
              <div class="secendROw">
              <el-row style="margin-left:100px;margin-top:20px" :gutter="3">
                  <el-col style="margin-top:5px" :xs="12" :sm="12" :md="5" :span="8">
                       <span style="float:left;width:40%;   text-align: right;">电话：</span>
                      <el-input v-model="form.phone" size="mini" class="filterinput" style="width:55%" placeholder="请输入电话"> </el-input>
                  </el-col>
                   <el-col style="margin-top:5px" :xs="12" :sm="12" :md="5" :span="8">
                       <span style="float:left;width:40%;   text-align: right;">作者：</span>
                      <el-input v-model="form.author" size="mini" class="filterinput" style="width:55%" placeholder="请输入"> </el-input>
                  </el-col>
                  <el-col style="margin-top:5px" :xs="24" :sm="24" :md="2">
                      <el-button style="float:left; width:100%" type="primary" @click="onSubmit()" size="mini">查询</el-button>
                  </el-col>
              </el-row>
             </div> 
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
                  prop="date"
                  label="作品名称"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="作者"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="所在地区"
                  width="140">>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="所在学校"
                  width="140">>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="得分"
                  width="140">>
                </el-table-column>
                 <el-table-column
                  prop="address"
                  label="获奖"
                  width="140">>
                </el-table-column>
                 <el-table-column
                  prop="address"
                  label="推荐"
                  width="140">>
                </el-table-column>
              </el-table>
            </template>
          </div>
           <div class="block">
              
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
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
            tableData:[],
              currentPage1: 5,
              currentPage2: 5,
              currentPage3: 5,
              currentPage4: 4,
              
            
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
