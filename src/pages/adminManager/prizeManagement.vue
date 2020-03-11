<template>
    <div class="import-expert-container">
        <el-dialog
            center
            title="奖项"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-input v-model="input" size="small" placeholder="请输入奖项" ></el-input>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="addPrize" size="small">确 定</el-button>
            </span>
        </el-dialog>

        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="奖品设置" name="importExpert">
                   
                    <el-row>
                        <el-col :span="8">
                            <el-button type="primary" @click="dialogVisible=true" size="small">添加奖项</el-button>
                        </el-col>
                    </el-row>
                   
                    <el-row>
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            border
                            :header-cell-style="{background:'#EEEEEE',color:'#323232'}"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column
                            type="index"
                            label="序号"
                            width="100"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="title"
                                label="奖项"
                                >
                            </el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="100"
                               >
                                <template slot-scope="scope">
                                    <el-button @click="goToEdit(scope.row)" type="text" size="small">编辑</el-button>
                                    <el-button @click="goToDelete(scope.$index, scope.row)" type="text" size="small" style="color:red;">删除</el-button>
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
    import api from '../../service/api';
    export default{
        data(){
            return{
                dialogVisible:false,
                activeName:'importExpert',
                tableData: [],
                multipleSelection: [],
                currentPage:1,//当前页
                input:"",
            }
        },
        mounted(){
            let params={}
            this.getAward(params)
        },
        methods:{
            //获取奖项
            async getAward(params){
                params.url=api.award
                let res = await this.axiosGet(params).catch(err => err);
                this.tableData=res.items
                console.log("award===",res.items)
            },
            async addPrize(){
                let params={}
                if(this.input==''){
                    this.$message({
                        type: 'warning',
                        message: '请输入奖项名称'
                    });
                    return
                }else{
                    params.url=api.award
                    params.title=this.input
                    let res=await this.axiosPost(params).catch(err=>err)
                }
            },
            //编辑
            goToEdit(){

            },
            //删除
            goToDelete(index,row){
                this.open(index,row)
            },
            //提示框
            open(index,row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // rows.splice(index, 1);
                    this.deleteItem(row.id)
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
            //删除
            async deleteItem(id){
                let params={}
                params.url=api.award
                params.id=id
                let res=await this.axiosDelete(params).catch(err=>err)

            },
            //每页数量改变
            pageSizeChange(val){

            },
            //页码改变
            pageCurrentChange(val){

            },
            handleClose(){
                this.dialogVisible=false
            }
        }
    };
</script>
<style lang="less" scope >

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