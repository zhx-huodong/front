
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

            <el-form-item
              label="所在区域："
              v-if="nowRole.type == 11 ||nowRole.type == 12||nowRole.type == 13"
            >
              <el-select
                v-model="areaid"
                filterable
                placeholder="请选择"
                size="small"
                @change="areaChange"
              >
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

            <el-form-item
              label="所在单位："
              v-if="nowRole.type == 11 ||nowRole.type == 12||nowRole.type == 13"
            >
              <el-select
                v-model="school_id"
                filterable
                placeholder="请选择"
                size="small"
                @change="schoolChange"
              >
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

            <el-form-item label="所在学段：" v-show="flag==2">
              <el-select
                v-model="period_id"
                filterable
                placeholder="请选择"
                size="small"
                @change="periodChange"
              >
                <el-option
                  v-for="item in periodArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所在年级：" v-show="flag==2">
              <el-select
                v-model="grade_id"
                filterable
                placeholder="请选择"
                size="small"
                @change="gradeChange"
              >
                <el-option
                  v-for="item in gradeArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所在班级：" v-show="flag==2">
              <el-select
                v-model="class_id"
                filterable
                placeholder="请选择"
                size="small"
                @change="classChange"
              >
                <el-option
                  v-for="item in classArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="关联学生：" v-show="flag==3">
              <el-select
                v-model="student_id"
                filterable
                placeholder="请选择"
                size="small"
                @change="studentChange"
              >
                <el-option
                  v-for="item in studentArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="身份角色：">
              <el-tag
                :key="index"
                v-for="(tag,index) in identityTags"
                :disable-transitions="false"
              >{{tag.name}}</el-tag>
            </el-form-item>

            <el-form-item v-show="flag!=10">
              <el-button type="primary" @click="onSubmit()" size="small">保存</el-button>
              <el-button size="small" @click="cancel()">取消</el-button>
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
      school_id: "",
      period_id: "",
      grade_id: "",
      class_id: "",
      identityTags: [],
      flag: 0,
      userIcon: require("../../public/images/userIcon.png"),
      nowRole: JSON.parse(localStorage.getItem("nowRole")),
      schoolList: [], //学校列表
      areaid: "",
      areaList: [
        { id: 732, pid: "77", type: "3", name: "市直属" },
        { id: 726, pid: "77", type: "3", name: "福田区" },
        { id: 727, pid: "77", type: "3", name: "罗湖区" },
        { id: 728, pid: "77", type: "3", name: "南山区" },
        { id: 729, pid: "77", type: "3", name: "宝安区" },
        { id: 730, pid: "77", type: "3", name: "龙岗区" },
        { id: 731, pid: "77", type: "3", name: "盐田区" },
        { id: 733, pid: "77", type: "3", name: "龙华区" },
        { id: 734, pid: "77", type: "3", name: "坪山区" },
        { id: 735, pid: "77", type: "3", name: "光明区" },
        { id: 736, pid: "77", type: "3", name: "大鹏新区" },
        { id: 3789, pid: "77", type: "3", name: "深汕特别合作区" }
      ],
      userInfo: {}, //用户信息
      periodArray: [
        { name: "幼教组", id: 1 },
        { name: "小学组", id: 2 },
        { name: "初中组", id: 4 },
        { name: "高中组", id: 8 },
        { name: "特教组", id: 16 },
        { name: "中职组", id: 32 },
        { name: "高教组", id: 64 }
      ],
      gradeArray: [
        { name: "一年级", id: 1 },
        { name: "二年级", id: 2 },
        { name: "三年级", id: 3 },
        { name: "四年级", id: 4 },
        { name: "五年级", id: 5 },
        { name: "六年级", id: 6 }
      ],
      classArray: [
        { name: "1班", id: 1 },
        { name: "2班", id: 2 },
        { name: "3班", id: 3 },
        { name: "4班", id: 4 },
        { name: "5班", id: 5 },
        { name: "6班", id: 6 },
        { name: "7班", id: 7 },
        { name: "8班", id: 8 },
        { name: "9班", id: 9 },
        { name: "10班", id: 10 },
        { name: "11班", id: 11 },
        { name: "12班", id: 12 },
        { name: "13班", id: 13 },
        { name: "14班", id: 14 },
        { name: "15班", id: 15 },
        { name: "16班", id: 16 },
        { name: "17班", id: 17 },
        { name: "18班", id: 18 },
        { name: "19班", id: 19 },
        { name: "20班", id: 20 }
      ],
      studentArray: [], //学生列表
      student_id: "",
      memberTypeObj: {
        0: "超级管理员",
        2: "市级管理员",
        3: "区级管理员",
        4: "专家",
        11: "老师",
        12: "学生",
        13: "家长"
      }
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
          that.userInfo = res;
          that.form.userIcon = res.avatar;
          that.form.userName = res.name;
          if (
            that.nowRole.type == 11 ||
            that.nowRole.type == 12 ||
            that.nowRole.type == 13
          ) {
            if (res.memberInfo[0].type == 1) {
              that.flag = 1; //是老师
              that.form.unitName = res.memberInfo[0].school.title;
              that.form.areaName = res.memberInfo[0].school.areaName;
              that.identityTags = [{ name: "老师" }];
              that.school_id = res.memberInfo[0].school.id;
              that.areaid = res.memberInfo[0].school.areaid;
              let params = {
                "filter[areaid]": that.areaid
              };
              that.getSchoolList(params);
            } else if (res.memberInfo[0].type == 2) {
              that.flag = 2; //是学生
              that.form.unitName = res.memberInfo[0].school.title;
              that.form.areaName = res.memberInfo[0].school.areaName;
              that.form.className =
                res.memberInfo[0].school.classes[0].class_alias;
              that.period_id = res.memberInfo[0].school.classes[0].period;
              that.grade_id = res.memberInfo[0].school.classes[0].grade;
              that.class_id = res.memberInfo[0].school.classes[0].class;
              that.identityTags = [{ name: "学生" }];
              that.school_id = res.memberInfo[0].school.id;
              that.areaid = res.memberInfo[0].school.areaid;
              let params = {
                "filter[areaid]": that.areaid
              };
              that.getSchoolList(params);
            } else if (res.memberInfo[0].type == 3) {
              that.flag = 3; //是家长
              that.form.unitName = res.memberInfo[0].school.title;
              that.form.areaName = res.memberInfo[0].school.areaName;
              that.identityTags = [{ name: "家长" }];
              that.school_id = res.memberInfo[0].school.id;
              let params = {};
              params.school = that.school_id;
              that.getStudentList(params);
              that.areaid = res.memberInfo[0].school.areaid;
              params = {
                "filter[areaid]": that.areaid
              };
              that.getSchoolList(params);
              that.student_id = res.memberInfo[0].students[0].id;
            }
          } else {
            //是管理员
            that.flag = 10;
            that.form.unitName = "暂无";
            that.form.areaName = "暂无";
            // this.form.unitName=res.memberInfo[0].school.areaName
            if (that.nowRole.type == 0) {
              that.identityTags = [{ name: "超级管理员" }];
            } else if (that.nowRole.type == 2) {
              that.identityTags = [{ name: "市级管理员" }];
            } else if (that.nowRole.type == 3) {
              that.identityTags = [{ name: "区级管理员" }];
            } else if (that.nowRole.type == 4) {
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
    areaChange(id) {
      let params = {
        "filter[areaid]": id
      };
      this.getSchoolList(params);
    },
    //学校改变
    schoolChange(id) {
      let that = this;
      that.student_id = "";
      let params = {};
      params.school = that.school_id;
      that.getStudentList(params);
    },
    //学段改变
    periodChange() {},
    //年级改变
    gradeChange() {},
    //班级改变
    classChange() {},
    //关联学生改变
    studentChange() {},
    //获取学生列表
    async getStudentList(params) {
      let that = this;
      params.expand = "memberAuth,memberInfo,roleInfo";
      params.ball = 1;
      params.mtype = 2;
      params.url = api.user;
      await this.axiosGet(params)
        .then(res => {
          let newStudentArray = [];
          if (res.items != undefined) {
            for (let i in res.items) {
              newStudentArray.push({
                id: res.items[i].id,
                name: res.items[i].name
              });
            }
            that.studentArray = newStudentArray;
          }
        })
        .catch(err => err);
    },
    //提交
    async onSubmit() {
      let that = this;
      let params = {};
      params.url = api.user;
      params.id = this.userInfo.id;
      params.name = this.form.userName;
      params.openid = this.userInfo.openid;
      params.mobile = this.userInfo.mobile;
      params.email = this.userInfo.email;
      params.avatar = this.userInfo.avatar;
      params.gender = this.userInfo.gender;
      params.birthday = this.userInfo.birthday;
      if (that.nowRole.type == 11) {
        params.identity = [
          {
            type: 1,
            school: this.school_id
          }
        ];
      } else if (that.nowRole.type == 12) {
        params.identity = [
          {
            type: 2,
            school: this.school_id,
            period: this.period_id,
            grade: this.grade_id,
            class: this.class_id
          }
        ];
      } else if (that.nowRole.type == 13) {
        params.identity = [
          {
            type: 3,
            children: [that.student_id]
          }
        ];
      }
      await this.axiosPut(params)
        .then(res => {
          if (res.id != undefined) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.getRoleInfo();
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          } else {
            this.$message({
              type: "warning",
              message: "修改失败"
            });
          }
        })
        .catch(err => err);
    },
    //取消
    cancel() {
      this.$router.go(-1);
    },
    //获取角色数据
    async getRoleInfo() {
      let that = this;
      let params = {};
      params.type = that.nowRole.type;
      params.url = api.switchToken;
      await this.axiosGet(params)
        .then(res => {
          if(res.token!=undefined){
            setCookie("x-api-key", res.token);
          }
          that.$store.dispatch("INIT_USER", res);
          let userInfo = JSON.stringify(res);
          localStorage.setItem("user", userInfo);
          let members = res.members.map(items => {
            let memberItem = {};
            memberItem.type = items.type;
            memberItem.name = that.memberTypeObj[items.type];
            if (items.school_id != undefined) {
              memberItem.school_id = items.school_id;
            }
            if (items.school_title != undefined) {
              memberItem.school_title = items.school_title;
            }
            if (items.current != undefined) {
              memberItem.current = items.current;
              let nowRole = JSON.stringify(memberItem);
              localStorage.setItem("nowRole", nowRole);
              this.$store.dispatch("INIT_NOWROLE", memberItem);
              console.log("nowrole===", nowRole);
            }
            return memberItem;
          });
          let roles = JSON.stringify(members);
          localStorage.setItem("roles", roles);
          that.$store.dispatch("INIT_ROLES", members);
        })
        .catch(err => err);
    }
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