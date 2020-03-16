<template>
      <div style=" clear: both;text-align: left;">
          <el-form ref="form" :model="form" :inline="true">
           
            <el-row :gutter="12">
              <el-col :span="8">
                   <el-form-item label="所在学校：">
              <el-input v-model="form.school" placeholder="请输入"> </el-input>
            </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="作者：">
                    <el-input v-model="form.author" placeholder="请输入"> </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                  <el-form-item label="指导老师：">
                    <el-input v-model="form.mentor" placeholder="请输入"> </el-input>
                  </el-form-item>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="作品名称：">
                    <el-input v-model="form.work_title" placeholder="请输入作品名称"> </el-input>
                </el-form-item>

              </el-col>
              <el-col :span="8">
                  <el-form-item> 
                    <el-button type="primary" @click="onSubmit()">查询</el-button>
                  </el-form-item> 
              </el-col>
            </el-row>
            
             
            
          </el-form>
          <!--展示内容-->
          <div class="buttonenum">
             <el-button size="medium" type="primary" @click="fenpeiwork()">分配作品</el-button>
             <el-button size="medium" @click="xiazai()">下载作品</el-button>
             <el-button size="medium" @click="daochu()">导出excel</el-button>
             <!-- <div>
               ------------{{id1}},{{id2}},{{id3}},{{id4}}-------
             </div> -->
          </div>
          <div style="margin-top:16px;">
            <template>
              <!-- 序号 报名时间 报名人 联系电话 所在地区 所在学校 -->
              <el-table :data="tableData" stripe style="width: 100%"
                @selection-change="handleSelectionChange">>
                 <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="序号"
                  type="index"
                   width="116"
                  align="center">
                </el-table-column>
                <!-- name author address shcoolname private -->
                <el-table-column
                  prop="works.title"
                  label="作品名称"
                  width="116">
                </el-table-column>
                <el-table-column
                  prop="author_"
                  label="作者"
                  width="116">
                </el-table-column>
                <el-table-column
                  prop="mentor_"
                  label="指导老师"
                  width="116">
                </el-table-column>
                <el-table-column
                  prop="areaName"
                  label="所在地区"
                  width="116">
                </el-table-column>
                <el-table-column
                  prop="title_"
                  label="所在学校"
                  width="116">
                </el-table-column>
                 <el-table-column
                  prop="info.category"
                  label="活动分类"
                  width="116">
                </el-table-column>
                 <el-table-column
                  prop="info.project"
                  label="活动项目"
                  width="116">
                </el-table-column>
                <el-table-column
                  prop="private"
                  label="分配专家"
                  width="116">
                </el-table-column>
                
              
              </el-table>
            </template>
          </div>
           <div class="block">
              
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[perPage]"
                :page-size="perPage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
              </el-pagination>
            </div>
             
                  <div v-if="dialogVisible" class="mask">
                    <div class="box">
                      <my-transfer @edit="edit" @Noedit="Noedit" :workList="workList" ></my-transfer>
                    </div>
                  </div>
                  
                   <!-- totalCount:'',
          pageCount: "",
          currentPage: "",
          perPage: "",
               -->
     
      </div>
      
    
</template>
<script>
import MyTransfer from '../../components/MyTransfer';
import api from '../../service/api';
import { axiosGet, getCookie } from '../../tools/tools';
import axios from 'axios';

  export default {
    components:{MyTransfer},
     
    props:['id1',"id2","id3","id4"],
    // props:{
    //     id1:Number,
    //     id2:Number,
    //     id3:Number,
    //     id4:String,
    // },
    data() {
      //   const generateData = _ => {
      //   const data = [];
       
      //   const cities = ['陈老师', '张老师', '李老师', '吴老师', '张老师', '曹老师', '周老师','吴老师',"张老师"];
      //   const pinyin = ['陈老师', '张老师', '李老师', '吴老师', '张老师', '曹老师', '周老师','吴老师',"张老师"];
       
      //   cities.forEach((city, index) => {
      //     data.push({
      //       label: city,
      //       key: index,
      //       pinyin: pinyin[index]
      //     });
      //   });
      //   return data;
      // };
      return {
       
            data: [],
            value: [],
            filterMethod(query, item) {
              return item.pinyin.indexOf(query) > -1;
            },
            form:{
              
              school:'',
              work_title:'',
              mentor:'',
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
            tableData:[],
            
              
              dialogVisible:false,

          totalCount:'',
          pageCount: "",
          currentPage: 1,
          perPage: "",
          teacherList:[],
          workList:[],
          
            
      };
    },
    watch:{
        id1:function(val){
          console.log(val,"watch1")
          this.enrollSelect()

        },
        id2:function(val){
            this.enrollSelect()
            console.log(val,"watch2")
        },
        id3:function(val){
            this.enrollSelect()
            console.log(val,"watch3")
        },
        id4:function(val){
            this.enrollSelect()
            console.log(val,"watch4")
        }
    },
    created(){
     
      this.enrollSelect()
      
    },
    mounted(){
      
      
    },
    methods: {
      handleSelectionChange(val){
        console.log(val,"val")
        this.workList=val
      },
    
      
      onSubmit(){
          this.enrollSelect()
          
      },
    async xiazai(){
      let parmas={};
       
       
        var ids=[];
        this.workList.forEach(item=>{
          ids.push(item.id)
          console.log(typeof(item.id))
        })
       
     
        
        axios.get(api.enroll,{
          params:{
            id:ids.join(","),
            bdownload:"1"
          },
          headers:
          {headers:getCookie('x-api-key')}
        })
      },
     async enrollSelect(){

        
          let parmas={}
          if(this.form.school!=""){
            parmas.school=this.form.school
          }
           if(this.form.work_title!=""){
            parmas.work_title=this.form.work_title
          }
           if(this.form.mentor!=""){
            parmas.mentor=this.form.mentor
          }
           if(this.form.author!=""){
            parmas.author=this.form.author
          }
          // ---------------------
           if(this.id1!=0){
            parmas.period=this.id1
          }
           if(this.id2!=0){
            parmas.category_id=this.id2
          }
           if(this.id3!=0){
            parmas.item_id=this.id3
          }
          console.log(this.id4)
           if(this.id4!=0&&this.id4!="77"){
            parmas.region=this.id4.toString()
          }

          parmas.url=api.enroll
          parmas.expand='info,works,school,professional'
          parmas.page=this.currentPage
          parmas.activity_id=sessionStorage.getItem("workid")
          let res=await axiosGet(parmas).catch(err=>err)
         
          this.tableData=res.items
         
          this.tableData.forEach(ite=>{
             var title=""
             var areaName=""
             var author_=""
             var mentor_=""
            ite.school.forEach(item=>{
           title==""?title=item.title:title=title+","+item.title
            areaName=item.areaInfo.areaName
          })
          ite.works.member.author.forEach(item=>{
            author_==""?author_=item.name:author_=author_+","+item.name
          })
          ite.works.member.mentor.forEach(item=>{
            mentor_==""?mentor_=item.name:mentor=mentor_+","+item.name
          })
          ite.mentor_=mentor_
          ite.author_=author_
          ite.areaName=areaName
          ite.title_=title
          })
          // totalCount: 22
          // pageCount: 2
          // currentPage: 1
          // perPage: 20
          this.totalCount=res._meta.totalCount
          this.pageCount=res._meta.pageCount
          this.currentPage=res._meta.currentPage
          this.perPage=res._meta.perPage
         
         
           console.log(this.tableData)
      },
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
        this.currentPage=val
        console.log(`当前页: ${val}`);
        this.enrollSelect()
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
