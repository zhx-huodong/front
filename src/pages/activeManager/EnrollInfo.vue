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
            <el-form-item label="电话：">
              <el-input v-model="form.phone" placeholder="请输入电话"> </el-input>
            </el-form-item>
            <el-form-item label="报名人：">
              <el-input v-model="form.enrollpersonl" placeholder="请输入"> </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">查询</el-button>
            </el-form-item> 
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
                  prop="phone"
                  label="联系电话"
                  width="180">
                </el-table-column>
                 <el-table-column
                  prop="address"
                  label="所在地区"
                  width="180">
                </el-table-column>
                 <el-table-column
                  prop="schoolname"
                  label="所在学校"
                  width="180">
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
                :page-size="100"
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
              currentPage1:1,

            
      };
    },
    created(){
      this.tableData=[
          {date:'2019-12-20',name:'赵四',phone:'133131655',address:'罗湖区',schoolname:'罗湖中学'},
          {date:'2019-12-20',name:'赵四',phone:'133131655',address:'罗湖区',schoolname:'罗湖中学'},
          {date:'2019-12-20',name:'赵四',phone:'133131655',address:'罗湖区',schoolname:'罗湖中学'},
          {date:'2019-12-20',name:'赵四',phone:'133131655',address:'罗湖区',schoolname:'罗湖中学'},
          {date:'2019-12-20',name:'赵四',phone:'133131655',address:'罗湖区',schoolname:'罗湖中学'},
          {date:'2019-12-20',name:'赵四',phone:'133131655',address:'罗湖区',schoolname:'罗湖中学'},
          {date:'2019-12-20',name:'赵四',phone:'133131655',address:'罗湖区',schoolname:'罗湖中学'},
          {date:'2019-12-20',name:'赵四',phone:'133131655',address:'罗湖区',schoolname:'罗湖中学'},
          {date:'2019-12-20',name:'赵四',phone:'133131655',address:'罗湖区',schoolname:'罗湖中学'},
          {date:'2019-12-20',name:'赵四',phone:'133131655',address:'罗湖区',schoolname:'罗湖中学'},       
      ]
             
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
