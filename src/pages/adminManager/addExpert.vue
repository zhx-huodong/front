<template>
    <div class="add-expert-container">
        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="添加专家" name="addExpert">
                    <div class="add-expert-item">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="电话号码" prop="phoneNum">
                                <el-input v-model="ruleForm.phoneNum" placeholder="请输入电话号码"></el-input>
                            </el-form-item>
                            <el-form-item label="专家介绍" prop="des">
                                <el-input v-model="ruleForm.des" type="textarea" :rows="4" placeholder="请输填写专家介绍"></el-input>
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
                activeName:'addExpert',
                ruleForm:{
                    name: '',
                    phoneNum:'',
                    des:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    phoneNum: [
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
            //保存
            submitForm(){

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
        width:600px;
        height:500px;
    }
}
</style>