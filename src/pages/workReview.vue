<template>
    <div class="work-review-container">
        <el-card style="min-height:600px;">
            <el-tabs v-model="workReview">
                <el-tab-pane label="作品评审" name="workReview">
                    <el-row>
                        <el-col>
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="活动类别：">
                                    <el-input v-model="formInline.activityType" placeholder="请输入活动名称"></el-input>
                                </el-form-item>
                                
                                <el-form-item label="">
                                    <el-input v-model="formInline.activityName" placeholder="输入姓名"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="goToSearch">查找</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <el-button type="primary" plain>下载作品</el-button>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary" plain @click="goToImport">导入评分表</el-button>
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
                            width="160"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="姓名"
                            >
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
export default {
    data(){
        return{
            workReview:'workReview',
            formInline: {
                activityName: '',
                activityType:''
            },
            tableData: [{
                name: '森林精',
                score: '70',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }, {
                score: '80',
                name: '森林精',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }, {
                score: '75',
                name: '森林精',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }, {
                score: '90',
                name: '森林精',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }, {
                score: '85',
                name: '森林精',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }, {
                score: '78',
                name: '森林精',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }, {
                score: '59',
                name: '森林精',
                comment:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                }
            ],
            multipleSelection: [],
            currentPage:1,//当前页
        }
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
