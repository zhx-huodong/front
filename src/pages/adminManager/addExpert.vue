<template>
    <div class="add-expert-container">
        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="添加专家" name="addExpert">
                    <div>
                        <el-form :model="ruleForm"  ref="ruleForm" label-width="300px" class="demo-ruleForm">
                            <el-form-item label="请输入完整的手机号码查看用户是否存在" style="width:800px;">
                                <el-input v-model="searchVal" placeholder="请输入完整手机号" size="small" maxlength="11" style="width:400px"></el-input>
                                <el-button type="primary"  size="small" icon="el-icon-search" @click="goToSearch">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="add-expert-item" v-if="isHave!=null">
                        <div class="tag">
                            <p v-if="isHave" style="color:#F9513F">该电话号码关联的用户已存在，可以直接修改</p>
                            <p v-if="!isHave" style="color:#198AF3">该电话号码关联的用户不存在，可以直接添加</p>
                        </div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="请输入姓名" size="small" :disabled="isHave"></el-input>
                            </el-form-item>
                            <el-form-item label="电话号码" prop="mobile">
                                <el-input v-model="ruleForm.mobile" placeholder="请输入电话号码" size="small" :disabled="isHave"></el-input>
                            </el-form-item>
                            <el-form-item label="专家介绍" prop="des">
                                <el-input v-model="ruleForm.des" type="textarea" :rows="4" placeholder="请输填写专家介绍"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <template v-if="!isHave">
                                    <el-button type="primary" @click="submitForm()" size="small" >确定</el-button>
                                </template>
                                <template v-if="isHave">
                                    <el-button type="primary" @click="onUpdate()" size="small" >确定修改</el-button>
                                    <el-button type="info" @click="onCancel()" size="small" plain>取消</el-button>
                                </template>
                            </el-form-item>
                        </el-form>
                    </div>
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
                activeName:'addExpert',
                ruleForm:{
                    name: '',
                    mobile:'',
                    des:''
                },
                id:'',
                role_id:[5],
                area_id:[],
                isHave:null,
                searchVal:'',
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

        },
        methods:{
            //获取用户列表
            async getUserList(params){
                params.url=api.user
                params.expand='memberAuth,memberInfo,roleInfo'
                if(this.searchVal!=''){
                    params.mobile=this.searchVal
                }
                params.role_id=5
                await this.axiosGet(params).then(res=>{
                    this.isHave=res.items.length>0? true:false
                    if(this.isHave){
                        this.id=res.items[0].id
                        this.ruleForm.name=res.items[0].name
                        this.ruleForm.mobile=res.items[0].mobile
                        for(let i in res.items[0].roleInfo){
                            if(this.role_id[0]!==parseInt(res.items[0].roleInfo[i].id)){
                                this.role_id.push(parseInt(res.items[0].roleInfo[i].id))
                            }
                            if(parseInt(res.items[0].roleInfo[i].id)==5){
                                this.ruleForm.des=res.items[0].roleInfo[i].description
                            }
                            if(res.items[0].roleInfo[i].areas!=undefined){
                                for(let j in res.items[0].roleInfo[i].areas){
                                    this.area_id.push(parseInt(res.items[0].roleInfo[i].areas[j].id))
                                }
                            }
                        }
                    }else{
                        this.ruleForm.mobile=this.searchVal
                    }
                    
                }).catch(err => err);
            },
            //查询用户
            goToSearch(){
                if(this.searchVal.length<11)return;
                let params={}
                this.getUserList(params)
            },
            //保存
            async submitForm(){
                let params={}
                params.name=this.ruleForm.name
                params.mobile=this.ruleForm.mobile
                params.description=this.ruleForm.des
                params.role_id=this.role_id
                params.url=api.user
                await this.axiosPost(params).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '添加成功！'
                    });
                    this.ruleForm={
                        name: '',
                        mobile:'',
                        des:''
                    }
                    this.id=''
                    this.role_id=[5]
                    this.isHave=null
                    this.searchVal=''
                }).catch(err=>err)
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
                    this.ruleForm={
                        name: '',
                        mobile:'',
                        des:''
                    }
                    this.id=''
                    this.role_id=[5]
                    this.area_id=[]
                    this.isHave=null
                    this.searchVal=''
                }).catch(err=>err)
            },
            //取消
            onCancel(){
                this.ruleForm={
                    name: '',
                    mobile:'',
                    des:''
                }
                this.id=''
                this.role_id=[5]
                this.area_id=[]
                this.isHave=null
                this.searchVal=''
            }
        }
    };
</script>
<style lang="less" scoped>
.add-expert-container{
    width:1180px;
    margin:auto;
    margin-top:20px;
    .add-expert-item{
        margin-top:60px;
        width:700px;
        // height:500px;
    }
    .tag{
        margin-left: 250px;
        font-size: 16px;
        padding: 10px;
    }
}
</style>