<template>
    <div class="role-centainer">
        <el-card>
            <el-row>
                <el-col :span="12">
                    <el-button type="primary" @click="goToAddRole">添加角色</el-button>
                </el-col>
                <el-col :span="8">
                    <el-input placeholder="请输入搜索内容" v-model="searchVal"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button icon="el-icon-search" type="primary" @click="goToSearch">搜索</el-button>
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
                    prop="name"
                    label="姓名"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="power"
                    label="权限类型"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    label="区域"
                    >
                    <template slot-scope="scope">{{ scope.row.area }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="operTime"
                    label="操作时间"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    label="手机号"
                    >
                    <template slot-scope="scope">{{ scope.row.phoneNum }}</template>
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="goToEdit(scope.row)" type="text" size="small">编辑</el-button>
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
        </el-card>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                searchVal:'',//搜索
                tableData: [{
                phoneNum: '13714264534',
                name: '陆同学',
                power: '市管理员',
                area:'龙华区',
                operTime:'2019-11-18 16:26:35'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                power: '市管理员',
                area:'宝安区',
                operTime:'2019-11-18 16:26:35'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                power: '区管理员',
                area:'南山区',
                operTime:'2019-11-18 16:26:35'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                power: '区管理员',
                area:'福田区',
                operTime:'2019-11-18 16:26:35'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                power: '市管理员',
                area:'罗湖区',
                operTime:'2019-11-18 16:26:35'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                power: '区管理员',
                area:'光明区',
                operTime:'2019-11-18 16:26:35'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                power: '超级管理员',
                area:'宝安区',
                operTime:'2019-11-18 16:26:35'
                }],
                multipleSelection: [],
                currentPage:1,//当前页
            }
        },
        mounted(){

        },
        methods:{
            //添加角色
            goToAddRole(){
                this.$router.push({
                    path: '/addRole',
                })   
            },
            //搜索
            goToSearch(){
                console.log("搜索")
            },
            //编辑
            goToEdit(){

            },
            //删除
            goToDelete(index, rows){
                this.open(index, rows)
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
.role-centainer{
    width:1180px;
    margin:auto;
    margin-top:20px;
    .page-div{
        display:flex;
        justify-content:center;
    }
}
</style>