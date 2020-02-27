<template>
    <div class="create-activity-container">
        <el-card style="min-height:650px">
            <el-tabs v-model="activeName" >
                <el-tab-pane label="创建活动" name="first">
                    <div class="create-activity-body">
                    <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="活动对象 :">
                                <el-select v-model="form.region" placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动组别 :">
                                <el-select v-model="form.region" placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动范围 :">
                                <el-select v-model="form.region" placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动图片 :">
                                <template>
                                    <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                    </el-upload>
                                </template>
                            </el-form-item>
                            <!-- <el-form-item label="活动预热 :">
                                <el-date-picker
                                v-model="form.date2"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item> -->
                            <div class="my-editer">
                                <P>活动介绍 ：</P>
                                <my-editor @editorChange="editorChange"></my-editor>
                            </div>
                        
                            <div class="upload-file">
                                <div class="annex">上传活动指南</div>
                                <p>支持excle、word、pdf 三种格式 </p>
                            </div>
                            <el-divider ></el-divider>
                            <el-form-item label="作品上传 :">
                                <el-date-picker
                                v-model="form.date2"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="作品初审 :">
                                <el-date-picker
                                v-model="form.date2"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="区域推荐 :">
                                <el-date-picker
                                v-model="form.date2"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="市审核 :">
                                <el-date-picker
                                v-model="form.date2"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <!-- <div class="prize-set">
                                <div class="prize-title">市设置作品奖项 </div>
                                <div class="prize-input">
                                    <div class="left">奖品名称</div>
                                    <div class="right">奖品数量</div>
                                    <div class="option"></div>
                                </div>
                                <div class="prize-input">
                                    <div class="left">
                                        <el-input></el-input>
                                    </div>
                                    <div class="right">
                                        <el-input></el-input>
                                    </div>
                                    <div class="option"></div>
                                </div>
                            </div> -->
                            <el-form-item label="作品展示 :">
                                <el-date-picker
                                v-model="form.date2"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="作者人数 :">
                                <el-col :span="9">
                              <el-input placeholder="请输入限制人数" v-model="form.date2"></el-input>
                               </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" >保存并发布</el-button>
                                <el-button>保存草稿</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>
                        </el-form> 
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
    import MyEditor from '../../components/MyEditor'
    export default{
        components: {
            MyEditor
        },
        data(){
            return{
                activeName:'first',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                content: null,
                editorOption:{}
            }
        },
        computed: {
        
        },
        mounted(){

        },
        methods:{
            //提交
            onSubmit() {
                console.log('submit!');
            },
            handlePictureCardPreview(){
                
            },
            handleRemove(){

            },
            //富文本内容改变
            editorChange(data){
                console.log("data===",data)
            }
         
        }
    }
</script>
<style lang="less" scoped>
.create-activity-container{
    width:1180px;
    margin:auto;
    margin-top:20px;
    .title{
        display:flex;
        align-items:center;
        text-align:center;
        justify-content: center;
        padding-top: 20px;
    }
    .create-activity-body{
        padding:30px 60px;
    }
}
.upload-file{
    display:flex;
    justify-content:row;
    align-items:center;
    .annex{
        font-size:14px;
        color:#198AF3;
        padding:5px;
        border:1px solid #198AF3;
    }
    p{
        margin-left:30px;
        font-size:14px;
        color:#999;
    }
}
.prize-set{
    border:1px solid #E5E5E5;
    margin-bottom:20px;
    font-size:14px;
    color:#333;
    padding:20px;
    .prize-input{
        display:flex;
        flex-direction:row;
        margin-left:100px;
        margin-top:10px;
        .left{
            width:300px;  
        }
        .right{
            width:200px;
            margin-left:20px;
        }
        .option{
            width:100px;
            margin-left:20px;
        }
    }
}
.my-editer{
    display:flex;
    flex-direction:row;
    margin-bottom:10px;
    p{
        font-size:14px;
        color:#666;
    }
}

</style>