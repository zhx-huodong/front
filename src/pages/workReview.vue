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
                            <el-button type="primary" plain size="small">下载作品</el-button>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary" plain @click="goToImport" size="small">导入评分表</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" plain @click="goToDownload" size="small">下载评分表</el-button>
                        </el-col>
                        <el-col :span="8" :offset="6">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="width:900px">
                                <el-form-item label="作品名称：" >
                                    <el-input v-model="formInline.activityName" placeholder="输入作品姓名" style="width:350px" size="small"></el-input>
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
                            @selection-change="tableSelectionChange">
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
                            prop="activityName"
                            label="活动名称"
                            show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                            prop="activityType"
                            label="活动类型"
                            show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                            prop="activityProject"
                            label="活动项目"
                            show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                            prop="workName"
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
                                <el-button @click="goToLook(scope.row)" type="text" size="small">查看</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row class="page-div">
                        <el-pagination
                        @size-change="pageSizeChange"
                        @current-change="pageCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="40">
                        </el-pagination>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
import TypeSelect from '../components/TypeSelect';
export default {
    components: {TypeSelect},
    data(){
        return{
            workReview:'workReview',
            activityNameList:[
                {id:0,name:'全部'},
                {id:1,name:'深圳中小学数字创作大赛'},
                {id:2,name:'深圳中小学图文大赛'},
                {id:3,name:'深圳电脑创作大赛'}
            ],
            activityTypleList:[
                {id:0,name:'全部'},
                {id:1,name:'数字创作'},
                {id:2,name:'程序设计'},
                {id:3,name:'电脑绘画'}
            ],
            activityProjectList:[
                {id:0,name:'全部'},
                {id:1,name:'数字创作'},
                {id:2,name:'程序设计'},
                {id:3,name:'电脑绘画'},
                {id:4,name:'手绘插画'}
            ],
            gradeList:[
                { id: 0, name: '全部' },
                { id: 1, name: '小学组' },
                { id: 2, name: '初中组' },
                { id: 3, name: '高中组' }
            ],
            formInline: {
                activityName: '',
                activityType:''
            },
            tableData: [{
                activityName:'深圳市中小学电脑制作大赛',
                activityType:'电脑制作类',
                activityProject:'程序设计项目',
                workName: '森林精',
                score: '70',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }, {
                activityName:'深圳市中小学电脑制作大赛',
                activityType:'电脑制作类',
                activityProject:'程序设计项目',
                score: '80',
                workName: '森林精',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }, {
                activityName:'深圳市中小学电脑制作大赛',
                activityType:'电脑制作类',
                activityProject:'程序设计项目',
                score: '75',
                workName: '森林精',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }, {
                activityName:'深圳市中小学电脑制作大赛',
                activityType:'电脑制作类',
                activityProject:'程序设计项目',
                score: '90',
                workName: '森林精',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }, {
                activityName:'深圳市中小学电脑制作大赛',
                activityType:'电脑制作类',
                activityProject:'程序设计项目',
                score: '85',
                workName: '森林精',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }, {
                activityName:'深圳市中小学电脑制作大赛',
                activityType:'电脑制作类',
                activityProject:'程序设计项目',
                score: '78',
                workName: '森林精',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }, {
                activityName:'深圳市中小学电脑制作大赛',
                activityType:'电脑制作类',
                activityProject:'程序设计项目',
                score: '59',
                workName: '森林精',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }
            ],
            multipleSelection: [],
            currentPage:1,//当前页
        }
    },
    async created() {
        
    },
    mounted(){

    },
    methods:{
        //查询
        goToSearch(){

        },
        //导入评分表
        goToImport(){
            this.$router.push({
                path:'/importWorkList'
            })
        },
        //下载评分表
        goToDownload(){

        },
        //查看
        goToLook(){
            this.$router.push({
                path:'/workScore'
            })
        },
        //每页数量改变
        pageSizeChange(val){

        },
        //页码改变
        pageCurrentChange(val){

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
            console.log(value)
        },
        //活动类型
        async activityTypleObject(value) {
            console.log(value)
        },
        //学段
        async gradeObject(value) {
            console.log(value)
        },
        //活动项目
        async activityProjectObject(value){
            console.log(value)
        },
        //表格选择
        async tableSelectionChange(){

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
