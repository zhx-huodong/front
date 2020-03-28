<template>
    <div class="work-review-container">
        <el-card style="min-height:600px;"> 
            <el-tabs v-model="workReview">
                <el-tab-pane label="作品评审" name="workReview">
                    <el-row>
                        <el-col>
                            <type-select :gradeList="gradeList" :activityNameList="activityNameList" :activityTypleList="activityTypleList" :activityProjectList="activityProjectList" 
							@activityNameObject='activityNameObject' @gradeObject='gradeObject' @activityTypleObject='activityTypleObject' @activityProjectObject="activityProjectObject"></type-select>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="2">
                            <el-button type="primary" plain size="small" @click="downloadWork">下载作品</el-button>
                        </el-col>
                        <!-- <el-col :span="3">
                            <el-button type="primary" plain @click="goToImport" size="small">导入评分表</el-button>
                        </el-col> -->
                        <el-col :span="2">
                            <el-button type="primary" plain @click="goToDownload" size="small">下载评分表</el-button>
                        </el-col>
                        <el-col :span="10" :offset="4">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="width:900px">
                                <el-form-item label="作品编号：" >
                                    <el-input v-model="formInline.work_id" placeholder="输入作品编号" style="width:250px" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="作品名称：" >
                                    <el-input v-model="formInline.activityName" placeholder="输入作品名称" style="width:250px" size="small"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="goToSearch" size="small">查找</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            border
                            :header-cell-style="{background:'#EEEEEE',color:'#323232'}"
                            tooltip-effect="dark"
                            style="width: 100%"
                            v-loading="loading"
                            @selection-change="tableSelectionChange"
                            >
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            label="序号"
                            type="index"
                            width="100">
                            </el-table-column>
                             <el-table-column
                            prop="serial_id"
                            label="作品编号"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="info.activity"
                            label="活动名称"
                            show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                            prop="info.category"
                            label="活动类型"
                            show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                            prop="info.project"
                            label="活动项目"
                            show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                            prop="works.title"
                            label="作品名称"
                            show-overflow-tooltip>
                            </el-table-column>
                            
                            <el-table-column
                            label="评分"
                            prop="score">
                            </el-table-column>

                            <el-table-column
                            prop="comment"
                            label="评语"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                                <el-button @click="goToLook(scope.row)" v-if="scope.row.score==0&&scope.row.comment==''" type="text" size="small">查看</el-button>
                                <el-button @click="goToLook(scope.row)" v-else  type="text" size="small" style="color:red">修改</el-button>

                            </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row class="page-div">
                        <el-pagination
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="pages.now_page"
                         :page-sizes="[10, 20, 30, 40]"
                         :page-size="searchParams.per_page"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="pages.total">
                         </el-pagination>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
import TypeSelect from '../components/TypeSelect';
import api from "../service/api";
import { axiosGet, getCookie } from "../tools/tools";
import axios from "axios";
export default {
    components: {TypeSelect},
    data(){
        return{
            workReview:'workReview',
            userid: "", //用户id
            activityNameList:[
                // {id:0,name:'全部'},
                // {id:1,name:'深圳中小学数字创作大赛'},
                // {id:2,name:'深圳中小学图文大赛'},
                // {id:3,name:'深圳电脑创作大赛'}
            ],
            activityNameSelectID:'',//活动名称所选择的id
            activityTypleList:[
                // {id:0,name:'全部'},
                // {id:1,name:'数字创作'},
                // {id:2,name:'程序设计'},
                // {id:3,name:'电脑绘画'}
            ],
            activityTypleSelectID:'',//活动分类所选择的id
            activityProjectList:[
                // {id:0,name:'全部'},
                // {id:1,name:'数字创作'},
                // {id:2,name:'程序设计'},
                // {id:3,name:'电脑绘画'},
                // {id:4,name:'手绘插画'}
            ],
            activityProjectSelectID:'',
            gradeList:[
                // { id: 0, name: '全部' },
                { id: 1, name: '小学组' },
                { id: 2, name: '初中组' },
                { id: 3, name: '高中组' }
            ],
            gradeSelectID:'',//学段选择的id
            formInline: {
                activityName: '',
                activityType:'',
                work_id:'',
            },
            tableData: [
                // {
                // activityName:'深圳市中小学电脑制作大赛',
                // activityType:'电脑制作类',
                // activityProject:'程序设计项目',
                // score: '59',
                // workName: '森林精',
                // comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                // }
            ],
            multipleSelection: [],
            selectedCell:[],//选择的表格行数
            pages:{now_page:1,per_page:10,total:0},
            searchParams:{now_page:0,per_page:10},
            apiKey:getCookie("x-api-key"),
            loading:true,
        }
    },
    created() {
        this.userid = JSON.parse(localStorage.getItem("user")).id;
        this.getWorksList();
        this.getActivityList();
    },
    mounted(){

    },
    methods:{
        //获取所有的活动列表
        async getActivityList(){
            let that=this;
            let params={};
            params.url=api.activity;
            params.expand='category';
            params.inscore=1;
            await this.axiosGet(params).then(res=>{
                that.activityNameList=res.items.map(item=>{
                    return {
                        "id":item.id,
                        "name":item.title,
                    }
                })
                that.activityTypleList=res.items.map(item=>{
                    return {
                        "id":item.category[0].id,
                        "name":item.category[0].title,
                    }
                })
                that.activityProjectList=res.items.map(item=>{
                    return {
                        "id":item.category[0].child[0].id,
                        "name":item.category[0].child[0].title,
                    }
                })
            })
            // that.activityNameList.unshift({id:0,name:"全部"});
            // that.activityTypleList.unshift({id:0,name:"全部"});
            // that.activityProjectList.unshift({id:0,name:"全部"});
        },
        //获取所有的专家作品列表
        async getWorksList(){
            let that=this;
            let params={};
            params.url=api.enroll;
            params.inscore=1;
            params.expand='info,works,professional';
            params.currentPage=that.pages.now_page;
            if(that.pages.per_page!=0){
                params.pagesize=that.pages.per_page;
            }
            if(that.activityNameSelectID!=''){
               params.activity_id=that.activityNameSelectID;//按活动筛选报名记录
            }
            if(that.gradeSelectID!=''&&that.gradeSelectID!=0){
               params.period=that.gradeSelectID;//按学段筛选 [筛选活动时有效] 按学段筛选：多个学段则相加 
            }
            if(that.activityTypleSelectID!=''&&that.activityTypleSelectID!=0){
               params.category_id=that.activityTypleSelectID;//按分类筛选
            }
            if(that.activityProjectSelectID!=''&&that.activityProjectSelectID!=0){
               params.item_id=that.activityProjectSelectID;//按项目筛选
            }
            if(that.formInline.activityName!=''){//按作品名称搜索
                params.works_title=that.formInline.activityName;
            }
            if(that.formInline.work_id!=''){//按作品id搜索
                params.serial_id=that.formInline.work_id;
            }
            //if(that.selectedCell.length>0){
            //    params.bdownload=1;//支持下载作品附件
            //    params.id=that.selectedCell.join(",");//需要导出或下载的记录
            //    console.log(params.id);
            //}
            // params.bself=1,//只读取自己相关的报名
            // params.region='',//按区域筛选
            // params.school='',//按学校筛选
            // params.author='',//按作者筛选
            // params.mentor='',//[筛选活动时有效] 按指导老师筛选
            // params.exhibit='',//[筛选活动时有效] 按优秀作品筛选
            // params.bexport=1,//支持导出excel
            //params.sort='score',//记录排序，支持多字段排序：score：按score字段升序 -score：按score字段降序
            await this.axiosGet(params).then(res=>{
                
                that.tableData=[];
                let item=res.items;
                that.tableData=item;

                for(let i=0;i<that.tableData.length;i++){
                       that.tableData[i].score=that.tableData[i].professional.map(res=>{
                           return res.score/10;
                       });
                       that.tableData[i].comment=that.tableData[i].professional.map(res=>{
                           return res.comment;
                       });
                }

                that.pages.per_page=res._meta.pageCount;
                that.pages.now_page=res._meta.currentPage;
                that.pages.total=res._meta.totalCount;
                that.loading=false;

            }).catch(err=>{
                console.log(err);
                that.loading=false;
            });
        },
        //查询
        goToSearch(){
            let that=this;
            that.getWorksList();
        },
        //导入评分表
        goToImport(){
            this.$router.push({
                path:'/importWorkList'
            })
        },
        //下载评分表
        goToDownload(){
       let params = {};
      var ids = [];
      this.multipleSelection.forEach(item => {
        ids.push(item.id);
      });
      if(ids.length==0){
        return this.$message({
          type:'error',
          message:"请先勾选需要导出的作品"
        })
      }
      axios.get(api.enroll, {
        params: {
          id: ids.join(","),
          bexport: "1",
          expand:'info,works,school,professional,award'
        },
        responseType: "blob",
        headers: {"x-api-key" : getCookie("x-api-key") }
      }).then(res=>{
        console.log("res===",res)
          if(res.status==200){
           // let elink=document.createElement('a');
           // elink.download="作品.xls";
           // elink.href=res.data;
           // elink.click();
             this.downloadFile("评分表.xlsx",res.data);
          }else{
            return  this.$message({
               type:'error',
               message:'出错了'
            })
          }
      });
        },
        downloadFile (fileName,data) {
    	if (!data) { return }
    	let url = window.URL.createObjectURL(new Blob([data]))
    	let link = document.createElement('a')
    	link.style.display = 'none'
    	link.href = url;
    	link.setAttribute('download', fileName)
    	document.body.appendChild(link)
    	link.click()
    },
        //下载作品
        downloadWork(){
            let that=this;
            axios.get(api.enroll, {
             params: {
               id: that.selectedCell.join(","),
               bdownload: "1",
               inscore:"1"
             },
             headers: { 'x-api-key': that.apiKey }
            }).then(res=>{
                let datas=res.data;
                if(datas.code==0){
                    console.log("哈哈",datas.url);
                    window.location.href=datas.url;
                    return;
                }
                that.selectedCell=[];//再把所选的下载文件置空
            });
        },
        //查看
        goToLook(row){
            console.log(row);
            let query;
            this.$router.push({
                path:'/workScore',
                query:{"id":row.id,"score":row.score,"comment":row.comment}
            });

        },
        //处理每页数量的改变
        handleSizeChange(val) {
            let that=this;
            that.searchParams.per_page=val;
            that.getWorksList();
        },
        //处理每页的改变
        handleCurrentChange(val) {
            let that=this;
            that.searchParams.now_page=val;
            that.getWorksList();
        },
        //提示框
        open(index,rows) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                rows.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //活动名称
        async activityNameObject(value) {
            let that=this;
            that.activityNameSelectID=value;
            that.getWorksList();
        },
        //活动类型
        async activityTypleObject(value) {
            let that=this;
            that.activityTypleSelectID=value;
            that.getWorksList();
        },
        //学段
        async gradeObject(value) {
            let that=this;
            that.gradeSelectID=value;
            that.getWorksList();
        },
        //活动项目
        async activityProjectObject(value){
            let that=this;
            that.activityProjectSelectID=value;
            that.getWorksList();
        },
        //表格选择
        async tableSelectionChange(val){
            let that=this;
            let select=val;
            that.selectedCell=select.map((item)=>{
                return item.id;
            })
            this.multipleSelection = val;

            // console.log("ces",that.selectedCell);
        }
			
    }
}
</script>
<style lang="less" scoped>
.work-review-container{
    width: 1180px;
    margin: auto;
    margin-top: 20px;
    .page-div{
        display:flex;
        justify-content:center;
    }
}
</style>
