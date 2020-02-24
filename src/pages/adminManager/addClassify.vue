<template>
    <div class="add-classify-centainer">
        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="添加分类" name="addClassify">
                    <div class="add-classify-body">
                        <el-row>
                            <el-col>
                                分类标题：
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-input
                                placeholder="请输入分类标题"
                                v-model="title"
                                clearable>
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                分类封面：
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-button type="primary" @click="goToSubmit">提交</el-button> 
                            </el-col>
                        </el-row>
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
                activeName:'addClassify',
                title:'',
            }
        },
        mounted(){

        },
        methods:{
            //提交
            goToSubmit(){
                console.log("提交")
            }
        }
    }
</script>
<style lang="less" scoped>
.add-classify-centainer{
    width:1180px;
    margin:auto;
    margin-top:20px;
    .add-classify-body{
        width:600px;
        margin:30px 60px;
    }
}
</style>