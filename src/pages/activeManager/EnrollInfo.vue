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
              </el-row>
              <div class="secendROw">
              <el-row style="margin-left:100px;margin-top:20px" :gutter="3">
                  <el-col style="margin-top:5px" :xs="12" :sm="12" :md="5" :span="8">
                       <span style="float:left;width:40%;   text-align: right;">电话：</span>
                      <el-input v-model="form.phone" size="mini" class="filterinput" style="width:55%" placeholder="请输入电话"> </el-input>
                  </el-col>
                   <el-col style="margin-top:5px" :xs="12" :sm="12" :md="5" :span="8">
                       <span style="float:left;width:40%;   text-align: right;">报名人：</span>
                      <el-input v-model="form.enrollpersonl" size="mini" class="filterinput" style="width:55%" placeholder="请输入"> </el-input>
                  </el-col>
                  <el-col style="margin-top:5px" :xs="24" :sm="24" :md="2">
                      <el-button style="float:left; width:100%" type="primary" @click="onSubmit()" size="mini">查询</el-button>
                  </el-col>
              </el-row>
             </div> 
          </el-form>
          <!--展示内容-->
          <div style="margin-top:16px;">
            <template>
              <!-- 序号 报名时间 报名人 联系电话 所在地区 所在学校 -->
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column
                  label="序号"
                  type="index"
                   width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="报名时间"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="报名人"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="联系电话"
                  width="180">>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="所在地区"
                  width="180">>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="所在学校"
                  width="180">>
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
            form:{
              addr:'',
              schoolname:'',
              enrolltime:'',
              phone:'',
              enrollpersonl:'',
            
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
              currentPage4: 4
            
      };
    },
    methods: {
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

</style>
