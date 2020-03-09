
<template>
    <div class="user-edit-center">
        <el-card>
        <div class="user-edit-wrap">
            <div class="user-edit-top">
                <p>个人信息</p>
            </div>
            <div class="user-edit-body">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="头像：">
                        <template>
                            <div class="user-icom">
                                <img src="../../public/images/ac1.png"></img>
                                <div class="upload-icon">
                                    <el-upload
                                        :before-upload="beforeupload"
                                        :on-success="upsuccess"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :headers="headers"
                                        :action="action"
                                        :name="filename"
                                       
                                        :limit="1"
                                        list-type="picture">
                                        <!-- {'x-api-key':headerkey} -->
                                        <el-button size="small" type="primary">上传头像</el-button>
                                    </el-upload>
                                </div>
                                <!-- <UploadFile></UploadFile> -->
                            </div>
                        </template>
                    </el-form-item>
                    <el-form-item label="用户名称：">
                        <el-input v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="所在单位：">
                        <el-input v-model="form.unitName"></el-input>
                    </el-form-item>
                    <el-form-item label="身份角色：">
                        <el-tag
                            :key="tag"
                            v-for="tag in identityTags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                            class="input-new-tag"
                            v-if="identityVisible"
                            v-model="identityValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                            >
                        </el-input>
                        <el-button v-else class="button-new-tag" type="primary" plain size="small" @click="showInput">添加角色</el-button>
                    </el-form-item>
                    <el-form-item label="所在区域：">
                        <el-input v-model="form.areaName"></el-input>
                    </el-form-item>
                    <el-form-item label="所在班级：">
                        <el-input v-model="form.className"></el-input>
                    </el-form-item>
                    <el-form-item label="获得证书：">
                        <el-input v-model="form.cerNum"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        </el-card>
    </div>
</template>
<script>
// import axios from 'axios';
import api from '../../service/api';
import UploadFile from '../../components/UploadFile';
import { setCookie, getCookie } from '../../tools/tools';
export default {
    components: { UploadFile },
    data(){
        return{
            filename:"upFile",
            url:"",
            datas:{},
            headers:{
                'x-api-key':JSON.parse(localStorage.getItem("user")).token,
            },
            action:api.uploadPic,
            form: {
                userIcon:'',
                userName: '',
                unitName: '清湖小学',
                areaName: '龙华区',
                className: '一年级（1）班',
                cerNum: 5,
            },
            identityTags: ['老师', '家长', '学生'],
            identityVisible: false,
            identityValue: '',
            
        }
    },
    created(){
        console.log(localStorage.user!="")
        if(localStorage.user!=""){
            this.form.userName=JSON.parse(localStorage.getItem("user")).name;
        }
    },
    methods: {
        beforeupload(file){
            // this.datas={upFile:file.name} 
            console.log(file.name)
            console.log(file)
        },
        upsuccess(response, file, fileList) {
            console.log(file)
            
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        //图片上传
     async uplaod(fileurl){
             console.log(1)
             let params = {
                url:api.uploadPic,
                upFile:fileurl,
            };
        let res = await this.axiosPostPIC(params).catch(err => err);
        console.log(res)
       },
       
     
        handleClose(tag) {
        this.identityTags.splice(this.identityTags.indexOf(tag), 1);
      },

      showInput() {
        this.identityVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let identityValue = this.identityValue;
        if (identityValue) {
          this.identityTags.push(identityValue);
        }
        this.identityVisible = false;
        this.identityValue = '';
      },
      //提交
      onSubmit(){

      }
    }
}
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<style lang="less" scoped>
 .user-edit-center{
    width: 1180px;
    margin: auto;
    margin-top: 20px;
    box-sizing: border-box;
    .user-edit-wrap {
      .user-edit-top{
          p{
              padding-bottom:20px;
          }
          border-bottom:1px solid #E5E5E5;
      }
      .user-edit-body{
          padding:60px;
          width:520px;
          .user-icom{
              display:flex;
              align-items:center;
              img{
                  height:80px;
                  width:80px;
                  border-radius:8px;
              }
              .upload-icon{
                  margin-left:40px;
              }
          }
      }
    }
 }
</style>