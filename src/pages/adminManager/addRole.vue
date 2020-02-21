<template>
    <div class="add-role-container">
        <el-card>
            <el-tabs v-model="activeName">
                <el-tab-pane label="添加角色" name="addRole">
                    <div class="add-role-item">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            
                            <el-form-item label="管理权限" prop="type">
                                <el-checkbox-group v-model="ruleForm.type">
                                    <template v-for="(item,index) in adminList" >
                                        <el-checkbox :label="item.adminName" name="type" :value="item.id"></el-checkbox>
                                    </template>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="管理区域" >
                                <el-checkbox-group v-model="area">
                                    <template v-for="(item,index) in areaList" >
                                        <el-checkbox :label="item.areaName" name="type" :value="item.id"></el-checkbox>
                                    </template>
                                </el-checkbox-group>
                            </el-form-item>
                    
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                activeName:'addRole',
                ruleForm:{
                    name: '',
                    type: []
                },
                adminList:[{id:1,adminName:'超级管理员'},{id:2,adminName:'市管理员'},{id:3,adminName:'区管理员'}],
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择管理权限', trigger: 'change' }
                    ]
                
                },
                areaList:[{id:1,areaName:'龙华区'},{id:2,areaName:'龙岗区'},{id:3,areaName:'宝安区'},{id:4,areaName:'南山区'},{id:5,areaName:'福田区'},{id:6,areaName:'光明区'}],
                area:[],
            }
        },
        mounted(){

        },
        methods:{
            //保存
            submitForm(){

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
        margin-top:60px;
        width:600px;
        height:500px;
        display:flex;
    }
}
</style>