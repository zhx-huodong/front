<template>
    <div class="import-expert-container">
        <el-dialog
            center
            title="奖项"
            :visible.sync="dialogVisible"
            width="400px"
            :before-close="handleClose">
            <el-input v-model="input" size="small" placeholder="请输入奖项" ></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addPrize" size="small" v-if="operate=='add'">确 定</el-button>
                <el-button type="primary" @click="editPrize" size="small" v-if="operate=='edit'">确 定</el-button>
            </span>
        </el-dialog>

        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="奖品设置" name="importExpert">
                    <el-row>
                        <el-col :span="8">
                            <el-button type="primary" @click="dialogVisible=true;operate='add'" size="small">添加奖项</el-button>
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
                                    <el-button @click="goToDelete(scope.row.id)" type="text" size="small" style="color:red;">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row class="page-div">
                        <el-pagination
                        @size-change="pageSizeChange"
                        @current-change="pageCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[20, 30, 40, 50, 100]"
                        :page-size="perPage"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
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
                perPage: 20,//每页数据条数
                currentPage:1,//当前页
                totalCount:0,//总条数
                input:"",//输入框
                id:'',
                operate:'add',
            }
        },
        mounted(){
            let params={
                'per-page':this.perPage
            }
            params.page=this.currentPage
            this.getAward(params)
        },
        methods:{
            //获取奖项
            async getAward(params){
                params.url=api.award
                await this.axiosGet(params).then(res=>{
                    this.tableData=res.items
                    this.totalCount=res._meta.totalCount
                }).catch(err => err); 
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
                    await this.axiosPost(params).then(err=>{
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        });
                        this.handleClose()
                        let params={
                            'per-page':this.perPage
                        }
                        params.page=this.currentPage
                        this.getAward(params)
                    }).catch(err=>err)
                }
            },
            //编辑
            goToEdit(data){
                this.dialogVisible=true
                this.input=data.title
                this.operate='edit'
                this.id=data.id 
            },
            //编辑
            async editPrize(){
                let params={}
                params.id=this.id
                params.title=this.input
                params.url=api.award
                await this.axiosPut(params).then(res=>{
                    this.$message({
                            type: 'success',
                            message: '编辑成功！'
                        });
                        this.handleClose()
                        let params={
                            'per-page':this.perPage
                        }
                        params.page=this.currentPage
                        this.getAward(params)
                }).catch(err=>err)
            },
            //删除
            goToDelete(id){
                this.open(id)
            },
            //提示框
            open(id) {
                this.$confirm('此操作将永久删除该奖项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => { 
                    this.deleteItem(id)   
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
                await this.axiosDelete(params).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    let params={
                        'per-page':this.perPage
                    }
                    params.page=this.currentPage
                    this.getAward(params)
                }).catch(err=>err)

            },
            //每页数量改变
            pageSizeChange(val){
                this.perPage=val
                let params={
                    'per-page':this.perPage
                }
                params.page=this.currentPage
                this.getAward(params)
            },
            //页码改变
            pageCurrentChange(val){
                this.currentPage=val
                let params={
                    'per-page':this.perPage
                }
                params.page=this.currentPage
                this.getAward(params)
            },
            handleClose(){
                this.input=''
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