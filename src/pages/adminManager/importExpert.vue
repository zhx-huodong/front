<template>
    <div class="import-expert-container">
        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="导入专家" name="importExpert">
                    <el-row>
                        <el-col :span="3">
                            <el-button type="primary" plain size="small">下载模板</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-button type="primary" size="small">导入专家</el-button>
                        </el-col>
                    </el-row>
                    <p style="margin-bottom:20px;color:#999999">上传文件，导入专家信息</p>
                    <el-row>
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            border
                            :header-cell-style="{background:'#EEEEEE',color:'#323232'}"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column
                            prop="fileName"
                            label="文件名"
                            >
                            </el-table-column>

                            <el-table-column
                            prop="status"
                            label="上传状态"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="finishStatus"
                            label="完成状态"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="operPeple"
                            label="操作人"
                            >
                            </el-table-column>
                            <el-table-column
                            label="导入时间"
                            prop="importTime"
                            >
                            </el-table-column>
                            <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                                <el-button @click="goToExport(scope.row)" type="text" size="small">导出</el-button>
                                <el-button @click="goToDelete(scope.$index, tableData)" type="text" size="small" style="color:red;">删除</el-button>
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
    export default{
        data(){
            return{
                activeName:'importExpert',
                tableData: [{
                fileName: '龙华区专家组',
                status: '上传完成',
                finishStatus:'完成',
                operPeple:'陆同学',
                importTime:'2019-11-18 16:26:35'
                }, {
                fileName: '龙华区专家组',
                status: '上传完成',
                finishStatus:'完成',
                operPeple:'陆同学',
                importTime:'2019-11-18 16:26:35'
                }, {
                fileName: '龙华区专家组',
                status: '上传完成',
                finishStatus:'完成',
                operPeple:'陆同学',
                importTime:'2019-11-18 16:26:35'
                }, {
                fileName: '龙华区专家组',
                status: '上传完成',
                finishStatus:'完成',
                operPeple:'陆同学',
                importTime:'2019-11-18 16:26:35'
                }, {
                fileName: '龙华区专家组',
                status: '上传完成',
                finishStatus:'完成',
                operPeple:'陆同学',
                importTime:'2019-11-18 16:26:35'
                }, {
                fileName: '龙华区专家组',
                status: '上传完成',
                finishStatus:'完成',
                operPeple:'陆同学',
                importTime:'2019-11-18 16:26:35'
                }, {
                fileName: '龙华区专家组',
                status: '上传完成',
                finishStatus:'完成',
                operPeple:'陆同学',
                importTime:'2019-11-18 16:26:35'
                }],
                multipleSelection: [],
                currentPage:1,//当前页
            }
        },
        mounted(){

        },
        methods:{
            //导出
            goToExport(){

            },
            //删除
            goToDelete(index,rows){
                this.open(index,rows)
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
            //每页数量改变
            pageSizeChange(val){

            },
            //页码改变
            pageCurrentChange(val){

            },
        }
    };
</script>
<style lang="less" scoped>
.import-expert-container{
    width:1180px;
    margin:auto;
    margin-top:20px;
    
    .import-expert-item{
        margin-top:60px;
        width:600px;
        height:500px;
        display:flex;
    }
    .page-div{
        display:flex;
        justify-content:center;
    }
}
</style>