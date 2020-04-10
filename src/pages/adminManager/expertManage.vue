<template>
    <div class="expert-centainer">
        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="专家管理" name="expertManage">
                    <el-row>
                        <el-col :span="2">
                            <el-button type="primary" @click="goToAddExpert" size="small">添加专家</el-button>
                        </el-col>
                        <!-- <el-col :span="2">
                            <el-button type="primary" plain @click="goToImportExpert" size="small">导入专家</el-button>
                        </el-col> -->
                        <el-col :span="2">
                            <el-button type="danger" plain @click="goToBatchForbidden" size="small">批量禁用</el-button>
                        </el-col>
                        <el-col :span="10">
                            <el-button type="danger" plain @click="goToBatchDelete" size="small">批量删除</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入搜索内容" v-model="searchVal" size="small" clearable @clear="clearInput"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button icon="el-icon-search" type="primary" @click="goToSearch" size="small">搜索</el-button>
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
                            label="介绍"
                            show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <template v-for="item in scope.row.roleInfo" v-if="item.id==5">{{ item.description }}</template>
                                </template>
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
                                    <el-button @click="goToEdit(scope.row)" type="text" size="small">编辑</el-button>
                                    <el-button @click="goToForbidden(scope.row.id)" type="text" size="small" style="color:red;">禁用</el-button>
                                </template>
                                <template v-if="scope.row.status==0">
                                    <el-button  type="text" size="small" style="color:#999;">已禁用</el-button>
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
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <el-dialog
            center
            title="编辑"
            :visible.sync="editDialogVisible"
            width="600px"
            :before-close="editHandleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入姓名" size="small" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="mobile">
                    <el-input v-model="ruleForm.mobile" placeholder="请输入电话号码" size="small" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="专家介绍" prop="des">
                    <el-input v-model="ruleForm.des" type="textarea" :rows="4" placeholder="请输填写专家介绍"></el-input>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
               
                <el-button type="primary" @click="onUpdate()" size="small" >确定修改</el-button>
                <el-button type="info" @click="onCancel()" size="small" plain>取消</el-button>
                
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import TypeSelect from '../../components/TypeSelect';
    import api from '../../service/api';
    export default{
        components: {TypeSelect},
        data(){
            return{
                
                activeName:'expertManage',
                searchVal:'',//搜索
                tableData: [],
                multipleSelection: [],
                perPage: 20,//每页数据条数
                currentPage:1,//当前页
                totalCount:0,//总条数
                editDialogVisible:false,

                ruleForm:{
                    name: '',
                    mobile:'',
                    des:''
                },
                id:'',
                role_id:[],
                area_id:[],
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' }
                    ],
                    des:[
                        { required: true, message: '请填写专家介绍', trigger: 'blur' }

                    ]
                
                },
            }
        },
        mounted(){
            let params={}
            this.getUserList(params)
        },
        methods:{
            //获取用户列表
            async getUserList(params){
                params.url=api.user
                params.expand='memberAuth,memberInfo,roleInfo'
                if(this.searchVal!=''){
                    params.name=this.searchVal
                }
                params.role_id=5
                await this.axiosGet(params).then(res=>{
                    this.tableData=res.items
                    this.totalCount=res._meta.totalCount
                }).catch(err => err);
            },

            //添加专家
            goToAddExpert(){
                this.$router.push({
                    path: '/addExpert',
                })
            },
            //导入专家
            goToImportExpert(){
                this.$router.push({
                    path: '/importExpert',
                })   
            },
            //搜索
            goToSearch(){
                let params={
                    'per-page':this.perPage
                }
                params.page=this.currentPage
                this.getUserList(params)
            },
            clearInput(){
                let params={
                    'per-page':this.perPage
                }
                params.page=this.currentPage
                this.getUserList(params)
            },
            //编辑
            goToEdit(data){
                this.editDialogVisible=true
                console.log("data====",data)
                this.id=data.id
                this.ruleForm.name=data.name
                this.ruleForm.mobile=data.mobile
                for(let i in data.roleInfo){
                    
                    this.role_id.push(parseInt(data.roleInfo[i].id))
                    
                    if(parseInt(data.roleInfo[i].id)==5){
                        this.ruleForm.des=data.roleInfo[i].description
                    }
                    if(data.roleInfo[i].areas!=undefined){
                        for(let j in data.roleInfo[i].areas){
                            this.area_id.push(parseInt(data.roleInfo[i].areas[j].id))
                        }
                    }
                }
            },
            //修改
            async onUpdate(){
                let params={}
                params.name=this.ruleForm.name
                params.mobile=this.ruleForm.mobile
                params.description=this.ruleForm.des
                params.role_id=this.role_id
                params.area_id=this.area_id
                params.id=this.id
                params.url=api.user
                await this.axiosPut(params).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '修改成功！'
                    });
                    this.editDialogVisible=false
                    this.ruleForm={
                        name: '',
                        mobile:'',
                        des:''
                    }
                    this.id=''
                    this.role_id=[]
                    this.area_id=[]
                    let params={
                    'per-page':this.perPage
                    }
                    params.page=this.currentPage
                    this.getUserList(params)
                }).catch(err=>err)
            },
            //取消
            onCancel(){
                this.editDialogVisible=false
                this.ruleForm={
                    name: '',
                    mobile:'',
                    des:''
                }
                this.id=''
                this.role_id=[]
                this.area_id=[]
            },
            editHandleClose(){
                this.editDialogVisible=false
            },
            //列表选择
            tableSelectionChange(val){
                this.multipleSelection = val;
            },
            
            //每页数量改变
            pageSizeChange(val){
                this.perPage=val
                let params={
                    'per-page':this.perPage
                }
                params.page=this.currentPage
                this.getUserList(params) 
            },
            //页码改变
            pageCurrentChange(val){
                this.currentPage=val
                let params={
                    'per-page':this.perPage
                }
                params.page=this.currentPage
                this.getUserList(params) 
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
            //批量禁用
            async goToBatchForbidden(){
                let ids=[]
                for(let i in this.multipleSelection){
                    ids.push(this.multipleSelection[i].id)
                }
                let params={}
                params.ids=ids
                params.url=api.disableUsers
                this.$confirm(`此操作将批量禁用用户使用该系统, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                     this.batchForbidden(params)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消！'
                    });          
                });
            },
            //批量禁用
            async batchForbidden(params){
                await this.axiosPost(params).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '批量禁用成功！'
                    });
                    let params={
                        'per-page':this.perPage
                    }
                    params.page=this.currentPage
                    this.getUserList(params) 
                }).catch(err=>err)
            },
            //批量删除
            goToBatchDelete(){
                let ids=[]
                for(let i in this.multipleSelection){
                    ids.push(this.multipleSelection[i].id)
                }
                let params={}
                params.ids=ids
                params.url=api.deleteUsers
                this.$confirm(`此操作将批量删除用户, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.batchDelete(params)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消！'
                    });          
                });
            },
            //批量删除
            async batchDelete(params){
                await this.axiosPost(params).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '批量删除成功！'
                    });
                    let params={
                        'per-page':this.perPage
                    }
                    params.page=this.currentPage
                    this.getUserList(params) 
                }).catch(err=>err)
            }
        }
    }
</script>
<style lang="less" scoped>
.expert-centainer{
    width:1180px;
    margin:auto;
    margin-top:20px;
    .page-div{
        display:flex;
        justify-content:center;
    }
}
</style>