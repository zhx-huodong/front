
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
                  <el-image :src="form.userIcon" fit="cover" v-if="form.userIcon!=''"></el-image>
                  <el-image :src="userIcon" fit="cover" v-else></el-image>
                </div>
              </template>
            </el-form-item>
            <el-form-item label="用户名称：">
              <el-input v-model="form.userName" size="small" style="width:215px"></el-input>
            </el-form-item>
            
            <el-form-item label="所在区域：" v-if="nowRole.type == 11 ||nowRole.type == 12||nowRole.type == 13">
              <el-select v-model="areaid" filterable placeholder="请选择" size="small" @change="areaChange">
                    <el-option
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="所在区域：" v-else>
              <el-input disabled v-model="form.areaName" size="small" style="width:215px"></el-input>
            </el-form-item>

            <el-form-item label="所在单位：" v-if="nowRole.type == 11 ||nowRole.type == 12||nowRole.type == 13">
                <el-select v-model="school_id" filterable placeholder="请选择" size="small" @change="schoolChange">
                    <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="所在单位：" v-else>
              <el-input disabled v-model="form.unitName" size="small" style="width:215px"></el-input>
            </el-form-item>

            <el-form-item label="所在班级：" v-show="flag==2">
              <el-input v-model="form.className" size="small" style="width:215px"></el-input>
            </el-form-item>

            <el-form-item label="身份角色：">
              <el-tag
                :key="index"
                v-for="(tag,index) in identityTags"
                :disable-transitions="false"
              >{{tag.name}}</el-tag>
            </el-form-item>

            <el-form-item v-show="flag!=10">
              <el-button type="primary" @click="onSubmit" size="small">保存</el-button>
              <el-button size="small">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import api from "../../service/api";
import UploadFile from "../../components/UploadFile";
import { setCookie, getCookie } from "../../tools/tools";
export default {
  components: { UploadFile },
  data() {
    return {
      form: {
        userIcon: "",
        userName: "",
        unitName: "",
        areaName: "",
        className: ""
      },
      school_id:'',
      identityTags: [],
      flag: 0,
      userIcon: require("../../public/images/userIcon.png"),
      nowRole:JSON.parse(localStorage.getItem("nowRole")),
      schoolList:[],//学校列表
      areaid:'',
      areaList:[
        {id:732,"pid":"77","type":"3","name":"市直属"},
        {id:726,"pid":"77","type":"3","name":"福田区"},
        {id:727,"pid":"77","type":"3","name":"罗湖区"},
        {id:728,"pid":"77","type":"3","name":"南山区"},
        {id:729,"pid":"77","type":"3","name":"宝安区"},
        {id:730,"pid":"77","type":"3","name":"龙岗区"},
        {id:731,"pid":"77","type":"3","name":"盐田区"},
        {id:733,"pid":"77","type":"3","name":"龙华区"},
        {id:734,"pid":"77","type":"3","name":"坪山区"},
        {id:735,"pid":"77","type":"3","name":"光明区"},
        {id:736,"pid":"77","type":"3","name":"大鹏新区"},
        {id:3789,"pid":"77","type":"3","name":"深汕特别合作区"},
      ]
    };
  },
  created() {
    this.gitUserInfo(); 
  },
  methods: {
    //获取用户详情信息
    async gitUserInfo() {
      let that = this;
      let params = {};
      params.url = api.user;
      params.id = JSON.parse(localStorage.getItem("user")).id;
      params.expand = "memberAuth,memberInfo,roleInfo";
      await this.axiosGet(params)
        .then(res => {
          //说明不是管理员
          that.form.userIcon = res.avatar;
          that.form.userName=res.name
          if (that.nowRole.type == 11 ||that.nowRole.type == 12||that.nowRole.type == 13) {
            if (res.memberInfo[0].type == 1) {
              that.flag = 1; //是老师
              that.form.unitName = res.memberInfo[0].school.title;
              that.form.areaName = res.memberInfo[0].school.areaName;
              that.identityTags = [{ name: "老师" }];
              that.school_id=res.memberInfo[0].school.id
              that.areaid=res.memberInfo[0].school.areaid
            } else if (res.memberInfo[0].type == 2) {
              that.flag = 2; //是学生
              that.form.unitName = res.memberInfo[0].school.title;
              that.form.areaName = res.memberInfo[0].school.areaName;
              that.form.className =
                res.memberInfo[0].school.classes[0].class_alias;
              that.identityTags = [{ name: "学生" }];
              that.school_id=res.memberInfo[0].school.id
              that.areaid=res.memberInfo[0].school.areaid
            } else if (res.memberInfo[0].type == 3) {
              that.flag = 3; //是家长
              that.form.unitName = res.memberInfo[0].school.title;
              that.form.areaName = res.memberInfo[0].school.areaName;
              that.identityTags = [{ name: "家长" }];
              that.school_id=res.memberInfo[0].school.id
              that.areaid=res.memberInfo[0].school.areaid
            }
            let params = {
                'filter[areaid]':that.areaid
            };
            this.getSchoolList(params);
          } else {
            //是管理员
            that.flag = 10;
            that.form.unitName = "暂无";
            that.form.areaName = "暂无";
            // this.form.unitName=res.memberInfo[0].school.areaName
            if(that.nowRole.type == 0){
                that.identityTags = [{ name: "超级管理员" }];
            }else if(that.nowRole.type==2){
                that.identityTags = [{ name: "市级管理员" }];
            }else if(that.nowRole.type==3){
                that.identityTags = [{ name: "区级管理员" }];
            }else if(that.nowRole.type==4){
                that.identityTags = [{ name: "专家" }];
            }
          }
        })
        .catch(err => err);
    },
    //获取学校列表
    async getSchoolList(params) {
      params.url = api.school;
      params.ball = 1;
      await this.axiosGet(params)
        .then(res => {
          this.schoolList = res.items;
        })
        .catch(err => err);
    },
    //区域改变
    areaChange(id){
        let params={
            'filter[areaid]':id
        }
        this.getSchoolList(params);
    },
    //学校改变
    schoolChange(id){
    },

    //提交
    onSubmit() {}
  }
};
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
.user-edit-center {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  box-sizing: border-box;
  .user-edit-wrap {
    .user-edit-top {
      p {
        padding-bottom: 20px;
      }
      border-bottom: 1px solid #e5e5e5;
    }
    .user-edit-body {
      padding: 60px;
      width: 520px;
      .user-icom {
        display: flex;
        align-items: center;
        .el-image {
          height: 80px;
          width: 80px;
          border-radius: 8px;
        }
        .upload-icon {
          margin-left: 40px;
        }
      }
    }
  }
}
</style>