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
                   width="150"
                  align="center">
                </el-table-column>
                <!-- name author address shcoolname private -->
                <el-table-column
                  prop="name"
                  label="作品名称"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="author"
                  label="作者"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="didaolaos"
                  label="指导老师"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="所在地区"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="shcoolname"
                  label="所在学校"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="private"
                  label="分配专家"
                  width="150">
                </el-table-column>
                
                <!-- <el-table-column
                  prop="address"
                  label="所在地区"
                  width="180">>
                </el-table-column>
                <el-table-column
                  prop="shcoolname"
                  label="所在学校"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="private"
                  label="分配专家"
                  width="180">
                </el-table-column> -->
              </el-table>
            </template>
          </div>
           <div class="block">
              
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[10,20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="10">
              </el-pagination>
            </div>
             
                  <div v-if="dialogVisible" class="mask">
                    <div class="box">
                      <my-transfer @edit="edit" @Noedit="Noedit"></my-transfer>
                    </div>
                  </div>
                  
              
     
      </div>
      
    
</template>
<script>
import MyTransfer from '../../components/MyTransfer';

  export default {
    components:{MyTransfer},
    data() {
        const generateData = _ => {
        const data = [];
       
        const cities = ['陈老师', '张老师', '李老师', '吴老师', '张老师', '曹老师', '周老师','吴老师',"张老师"];
        const pinyin = ['陈老师', '张老师', '李老师', '吴老师', '张老师', '曹老师', '周老师','吴老师',"张老师"];
       
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
            // 森林精灵 赵四 罗湖区 罗湖中学 张老师、朱老师
            tableData:[
                {name:'森林精灵',author:'赵四', address:'罗湖区', shcoolname:"罗湖中学",private:"张老师、朱老师"},
                {name:'森林精灵',author:'赵四', address:'罗湖区', shcoolname:"罗湖中学",private:"张老师、朱老师"},
                {name:'森林精灵',author:'赵四', address:'罗湖区', shcoolname:"罗湖中学",private:"张老师、朱老师"},
                {name:'森林精灵',author:'赵四', address:'罗湖区', shcoolname:"罗湖中学",private:"张老师、朱老师"},
                {name:'森林精灵',author:'赵四', address:'罗湖区', shcoolname:"罗湖中学",private:"张老师、朱老师"},
                {name:'森林精灵',author:'赵四', address:'罗湖区', shcoolname:"罗湖中学",private:"张老师、朱老师"},
                {name:'森林精灵',author:'赵四', address:'罗湖区', shcoolname:"罗湖中学",private:"张老师、朱老师"},
                {name:'森林精灵',author:'赵四', address:'罗湖区', shcoolname:"罗湖中学",private:"张老师、朱老师"},
                {name:'森林精灵',author:'赵四', address:'罗湖区', shcoolname:"罗湖中学",private:"张老师、朱老师"},
                {name:'森林精灵',author:'赵四', address:'罗湖区', shcoolname:"罗湖中学",private:"张老师、朱老师"},
                {name:'森林精灵',author:'赵四', address:'罗湖区', shcoolname:"罗湖中学",private:"张老师、朱老师"},
            ],
              currentPage1: 1,
              
              dialogVisible:false,
            
      };
    },
    methods: {
      edit(item){
        this.dialogVisible=item;
      },
      Noedit(item){
        this.dialogVisible=item;
      },
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
  .mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 3;
  }
  .box{
    background: #ffffff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -250px;
    margin-left: -400px;
    width:782px;
    height:500px;
    background:rgba(255,255,255,1);
    border-radius:6px;
  }

</style>
