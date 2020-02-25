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
             <el-button size="medium" type="primary" @click="fenpeiwork()">分配作品</el-button>
             <el-button size="medium">下载作品</el-button>
             <el-button size="medium">回退</el-button>
          </div>
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
                  label="作品名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="作者"
                  width="180">
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
                <el-table-column
                  prop="address"
                  label="分配专家"
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

                <el-dialog
                  :visible.sync="dialogVisible"
                  width="40%"
                  :before-close="handleClose">
                  
                  <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    filter-placeholder="请输入城市拼音"
                    v-model="value"
                    :data="data">
                  </el-transfer>
                    
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                  </span>
                </el-dialog>
     
      </div>
      
    
</template>
<script>
  export default {
    data() {
        const generateData = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
            data: generateData(),
            value: [],
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
              dialogVisible:false,
            
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
      
      fenpeiwork(){
        if(this.dialogVisible==true){
           this.dialogVisible=false;
        }else{
          this.dialogVisible=true;
        }
       
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
