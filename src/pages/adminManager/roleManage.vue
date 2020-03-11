<template>
    <div class="role-centainer">
        <el-card style="min-height:600px;">
            <el-row>
                <el-col :span="14">
                    <el-button type="primary" @click="goToAddRole" size="small">添加角色</el-button>
                </el-col>
                <el-col :span="8">
                    <el-input placeholder="请输入搜索姓名" v-model="searchVal" size="small" clearable @clear="clearInput"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button icon="el-icon-search" type="primary" @click="goToSearch" size="small">搜索</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                    ref="multipleTable"
                    :data="userList"
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
                    label="权限类型"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                            <template  v-for="item in (scope.row.roleInfo)">{{ item.name }}、</template>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="区域"
                    >
                        <template slot-scope="scope" >
                            <template v-for="item in (scope.row.areas)" >{{item}}、</template>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="operTime"
                    label="操作时间"
                    show-overflow-tooltip>
                    <template slot-scope="scope" >{{ formatDateChar(scope.row.roleInfo[0].created_at*1000) }}</template>
                    </el-table-column>
                    <el-table-column
                    label="手机号"
                    >
                    <template slot-scope="scope">{{ scope.row.mobile }}</template>
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <template v-if="scope.row.status==1">
                            <el-button @click="goToEdit(scope.row.id)" type="text" size="small">编辑</el-button>
                            <el-button @click="goToForbidden(scope.row.id)" type="text" size="small" style="color:red;">禁用</el-button>
                        </template>
                        <template v-if="scope.row.status==0">
                            <el-button type="text" size="small" style="color:#999;" >已禁用</el-button>
                            <el-button @click="goToRelieve(scope.row.id)" type="text" size="small">解禁</el-button>
                        </template>
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
  
        </el-card>
    </div>
</template>
<script>
    import api from '../../service/api'
    export default{
        data(){
            return{
                searchVal:'',//搜索
                userList: [],
                multipleSelection: [],
                currentPage:1,//当前页
                perPage:20,//每页数据条数
                totalCount:0,//总数
            }
        },
        mounted(){
            let params={
                'per-page':this.perPage
            }
            params.page=this.currentPage
            params.role_id='1,3,4,5'
            params.expand='roleInfo'
            this.getUserList(params)
        },
        methods:{
            //获取角色管理列表
            async getUserList(params){
                params.url=api.user
                params.role_id='1,3,4'
                params.expand='roleInfo'
                let res=await this.axiosGet(params).catch(err=>err)
                this.userList=res.items
                this.totalCount=res._meta.totalCount
                for(let i in this.userList){
                    let areas=[]
                    for(let j in this.userList[i].roleInfo){
                        if(this.userList[i].roleInfo[j].areas!=undefined){
                            for(let k in this.userList[i].roleInfo[j].areas){
                                areas.push(this.userList[i].roleInfo[j].areas[k].name)
                            }
                        }  
                    }
                    this.userList[i].areas=areas
                }
            },
            //添加角色
            goToAddRole(){
                this.$router.push({
                    path: '/addRole',
                })   
            },
            //搜索
            goToSearch(){
                let params={
                    'per-page':this.perPage
                }
                params.name=this.searchVal
                this.getUserList(params)
            },
            clearInput(){
                console.log("清空")
                let params={
                    'per-page':this.perPage
                }
                params.name=this.searchVal
                this.getUserList(params)
            },
            //编辑
            goToEdit(id){
                this.$router.push({
                    path:'/addRole',
                    query: {
                        id: id
                    }
                })
            },
            //禁用
            goToForbidden(id){
                let status=0
                this.open(id,status)
            },
            //删除
            goToDelete(id){
                let status=-1
                this.open(id,status)
            },
            //提示框
            open(id,status) {
                let tag=''
                if(status==0){
                    tag='禁止该用户使用改系统'
                }else if(status==-1){
                    tag='永久删除该用户'
                }
                this.$confirm(`此操作将${tag}, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={}
                    params.id=id
                    params.status=status
                    this.updateUser(params) 
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消！'
                    });          
                });
            },
            //修改角色权限
            async updateUser(params){
                params.url=api.user
                let msg=''
                if(params.status==0){
                    msg='禁用成功！'
                }else if(params.status==-1){
                    msg='删除成功！'
                }
                await this.axiosPut(params).then(res=>{
                    this.$message({
                        type: 'success',
                        message: msg
                    });
                    let params={
                        'per-page':this.perPage
                    }
                    params.page=this.currentPage
                    params.name=this.searchVal
                    this.getUserList(params)
                }).catch(err => err);
                
            },
            //解禁
            async goToRelieve(id){
                let params={}
                params.id=id
                params.status=1
                params.url=api.user
                await this.axiosPut(params).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '解禁成功！'
                    });
                    params={
                        'per-page':this.perPage
                    }
                    params.page=this.currentPage
                    params.name=this.searchVal
                    this.getUserList(params)
                }).catch(err => err);
            },
            
            //每页数量改变
            pageSizeChange(val){
                this.perPage=val
                let params={
                    'per-page':this.perPage
                }
                params.page=this.currentPage
                params.name=this.searchVal
                this.getUserList(params)
            },
            
            //页码改变
            pageCurrentChange(val){
                this.currentPage=val
                let params={
                    'per-page':this.perPage
                }
                params.page=this.currentPage
                params.name=this.searchVal
                this.getUserList(params)
            },
            
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