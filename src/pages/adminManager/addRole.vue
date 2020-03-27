<template>
    <div class="add-role-container">
        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="添加角色" name="addRole">
                    <div class="add-role-item">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            
                            <el-form-item label="手机号码" prop="mobile">
                                <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码" maxlength="11" size="small" :disabled="id!==undefined" @change="mobileChange"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="请输入姓名" size="small" :disabled="id!==undefined"></el-input>
                            </el-form-item>
                            <el-form-item label="管理权限" prop="type">
                                <el-checkbox-group v-model="ruleForm.type" @change="typeChange">
                                    <template v-for="item in adminList" >
                                        <el-checkbox :label="item.id" name="type" :value="item.id">{{item.name}}</el-checkbox>
                                    </template>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="管理区域" v-show="ruleForm.type.indexOf(4)>-1">
                                <el-checkbox-group v-model="area" @change="areaChange">
                                    <template v-for="item in areaList" >
                                        <el-checkbox :label="item.id" name="area" :value="item.id">{{item.name}}</el-checkbox>
                                    </template>
                                </el-checkbox-group>
                            </el-form-item>
                    
                            <el-form-item>
                                <el-button type="primary" @click="submitForm()" size="small" >保存</el-button>
                                <el-button  @click="cancel()" size="small">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
    import api from '../../service/api'
    export default{
        data(){
            return{
                activeName:'addRole',
                ruleForm:{
                    name: '',
                    mobile:'',
                    type: []
                },
                adminList:[],
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'change' },
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择管理权限', trigger: 'change' }
                    ]
                },
                areaList:[
                    {"id":77,"pid":"6","type":"2","name":"深圳"},
                    {"id":726,"pid":"77","type":"3","name":"福田区"},
                    {"id":727,"pid":"77","type":"3","name":"罗湖区"},
                    {"id":728,"pid":"77","type":"3","name":"南山区"},
                    {"id":729,"pid":"77","type":"3","name":"宝安区"},
                    {"id":730,"pid":"77","type":"3","name":"龙岗区"},
                    {"id":731,"pid":"77","type":"3","name":"盐田区"},
                    {"id":732,"pid":"77","type":"3","name":"市辖区"},
                    {"id":733,"pid":"77","type":"3","name":"龙华区"},
                    {"id":734,"pid":"77","type":"3","name":"坪山区"},
                    {"id":735,"pid":"77","type":"3","name":"光明区"},
                    {"id":736,"pid":"77","type":"3","name":"大鹏区"}
                ],
                area:[],
                id:this.$route.query.id
            }
        },
        mounted(){
            this.getRole()
            if(this.id!=undefined){
                let params={}
                params.id=this.id
                params.expand='memberAuth,memberInfo,roleInfo'
                this.getUserInfo(params)
            }
        },
        methods:{
            //电话号码查询
            async mobileChange(){
                let params={}
                params.url=api.user
                params.expand='memberAuth,memberInfo,roleInfo'
                if(this.ruleForm.mobile.length==11){
                    params.mobile=this.ruleForm.mobile
                    await this.axiosGet(params).then(res=>{
                        if(res.items.length>0){
                            this.id=res.items[0].id
                            this.$message({
                                type:'success',
                                message:'该用户已存在，可以直接修改角色'
                            })
                            let params={}
                            params.id=this.id
                            params.expand='memberAuth,memberInfo,roleInfo'
                            this.getUserInfo(params)
                        }
                        console.log("res===",res)
                    }).catch(err=>err)
                }
            },
            //获取用户信息
            async getUserInfo(params){
                params.url=api.user
                let res=await this.axiosGet(params).catch(err=>err)
                if(res.roleInfo!=undefined){
                    this.ruleForm.name=res.name
                    this.ruleForm.mobile=res.mobile
                    for(let i in res.roleInfo){
                        this.ruleForm.type.push(parseInt(res.roleInfo[i].id))
                        if(res.roleInfo[i].areas!=undefined){
                            for(let j in res.roleInfo[i].areas){
                                this.area.push(parseInt(res.roleInfo[i].areas[j].id))
                            }
                        }
                    }
                }    
            },
            //获取角色
            async getRole(){
                let params={}
                params.url=api.role
                let res = await this.axiosGet(params).catch(err => err);
                this.adminList=res.items
                console.log("adminList===",this.adminList)
            },
            //管理权限改变
            async typeChange(data){
                
            },
            //管理区域改变
            async areaChange(data){
                
            },
            //保存
            async submitForm(){
                let params={}
                params.url=api.user
                if(this.ruleForm.name!=''){
                    params.name=this.ruleForm.name
                }else{
                    this.$message({
                        type: 'warning',
                        message: '请填写姓名!'
                    });
                    return
                }
                if(this.ruleForm.mobile!=''){
                    params.mobile=this.ruleForm.mobile
                }else{
                    this.$message({
                        type: 'warning',
                        message: '请填写手机号码!'
                    });
                    return
                }
                if(this.ruleForm.type.length>0){
                    params.role_id=this.ruleForm.type
                }else{
                    this.$message({
                        type: 'warning',
                        message: '请选择角色!'
                    });
                    return
                }
                
                if(this.ruleForm.type.indexOf(4)>-1&&this.area.length<=0){
                     this.$message({
                         type: 'warning',
                         message: '请选择管理区域!'
                     });
                     return
                 }
                //如果选了区域管理员和市管理员
                 if(this.ruleForm.type.indexOf(4)>-1&&this.ruleForm.type.indexOf(3)>-1&&this.area.length>0){
                      params.area_id=this.area;
                      params.area_id.push(77);
                 }
                //如果只选择了市管理员
                 if(this.ruleForm.type.indexOf(4)==-1&&this.ruleForm.type.indexOf(3)>-1){
                     params.area_id=[77];
                 }
                 if(this.ruleForm.type.indexOf(4)>-1&&this.area.length>0){
                     params.area_id=this.area;
                 }
                //  if(this.ruleForm.type==3){
                //      params.area_id=[77];
                //  }
                console.log("area",this.area);
                if(this.id!=undefined){
                    params.id=this.id
                    let res = await this.axiosPut(params).catch(err => err);
                    console.log("put=",res)
                    if(res.name!=''&&res.name!=undefined){
                        this.$message({
                            type: 'success',
                            message: '编辑成功！'
                        });
                    }else{
                        this.$message({
                            type: 'warning',
                            message: res.message
                        });
                    }
                }else{
                    let res = await this.axiosPost(params).catch(err => {
                        this.$message({
                            type: 'warning',
                            message: err[0].message
                        });
                    });
                    if(res.name!=''&&res.name!=undefined){
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        });
                    }else{
                        this.$message({
                            type: 'warning',
                            message: res.message
                        });
                    }
                }
                
                
            },
            cancel(){
                this.$router.go(-1)
            }
        }
    };
</script>
<style lang="less" scoped>
.add-role-container{
    width:1180px;
    margin:auto;
    margin-top:20px;
    
    .add-role-item{
        margin-left:150px;
        margin-top:60px;
        width:600px;
        height:500px;
        display:flex;
    }
}
</style>