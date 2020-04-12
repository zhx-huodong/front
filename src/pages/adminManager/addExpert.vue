<template>
  <div class="add-expert-container">
    <el-card style="min-height:600px;">
      <el-tabs v-model="activeName">
        <el-tab-pane label="添加专家" name="addExpert">
          <div class="add-expert-item">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="200px"
              class="demo-ruleForm"
            >
              <el-form-item label="电话号码" prop="mobile">
                <el-input
                  v-model="ruleForm.mobile"
                  placeholder="请输入电话号码"
                  maxlength="11"
                  size="small"
                  :disabled="isHave"
                  @change="mobileChange"
                ></el-input>
              </el-form-item>

              <el-form-item label="姓名" prop="name">
                <el-input
                  v-model="ruleForm.name"
                  placeholder="请输入姓名"
                  size="small"
                  :disabled="isHave"
                ></el-input>
              </el-form-item>

              <el-form-item label="专家介绍" prop="des">
                <el-input v-model="ruleForm.des" type="textarea" :rows="4" placeholder="请输填写专家介绍"></el-input>
              </el-form-item>
              <el-form-item>
                <template v-if="!isHave">
                  <el-button type="primary" @click="submitForm()" size="small">确定</el-button>
                  <el-button type="info" @click="onCancel()" size="small" plain>取消</el-button>
                </template>
                <template v-if="isHave">
                  <el-button type="primary" @click="onUpdate()" size="small">确定修改</el-button>
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
import api from "../../service/api";
export default {
  data() {
    return {
      activeName: "addExpert",
      ruleForm: {
        name: "",
        mobile: "",
        des: ""
      },
      id: "",
      role_id: [5],
      area_id: [],
      isHave: null,
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        mobile: [
          { required: true, message: "请输入电话号码", trigger: "blur" }
        ],
        des: [{ required: true, message: "请填写专家介绍", trigger: "change" }]
      }
    };
  },
  mounted() {},
  methods: {
    //电话号码查询
    async mobileChange() {
      let params = {};
      params.url = api.user;
      params.expand = "memberAuth,memberInfo,roleInfo";
      if (this.ruleForm.mobile.length == 11) {
        params.mobile = this.ruleForm.mobile;
        await this.axiosGet(params)
          .then(res => {
            this.isHave = res.items.length > 0 ? true : false;
            if (res.items.length > 0) {
              this.id = res.items[0].id;
              this.$message({
                type: "success",
                message: "该用户已存在，可以直接修改角色"
              });
              this.ruleForm = {
                name: "",
                mobile: "",
                des: ""
              };
              let params = {};
              params.id = this.id;
              params.expand = "memberAuth,memberInfo,roleInfo";
              this.getUserInfo(params);
            }
          })
          .catch(err => err);
      }
    },
    //获取用户信息
    async getUserInfo(params) {
      params.url = api.user;
      let res = await this.axiosGet(params).catch(err => err);
      if (res.roleInfo != undefined) {
        this.ruleForm.name = res.name;
        this.ruleForm.mobile = res.mobile;
        for (let i in res.roleInfo) {
          if (this.role_id[0] !== parseInt(res.roleInfo[i].id)) {
            this.role_id.push(parseInt(res.roleInfo[i].id));
          }
          if (parseInt(res.roleInfo[i].id) == 5) {
            this.ruleForm.des = res.roleInfo[i].description;
          }
          if (res.roleInfo[i].areas != undefined) {
            for (let j in res.roleInfo[i].areas) {
              this.area_id.push(parseInt(res.roleInfo[i].areas[j].id));
            }
          }
        }
      }
    },
    //保存
    async submitForm() {
      let params = {};
      params.name = this.ruleForm.name;
      params.mobile = this.ruleForm.mobile;
      params.description = this.ruleForm.des;
      params.role_id = this.role_id;
      params.url = api.user;
      await this.axiosPost(params)
        .then(res => {
          if (res.id != undefined && res.id != "") {
            this.$message({
              type: "success",
              message: "添加成功！"
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          } else {
            this.$message({
              type: "warning",
              message: "添加失败"
            });
          }
        })
        .catch(err => err);
    },
    //修改
    async onUpdate() {
      let params = {};
      params.name = this.ruleForm.name;
      params.mobile = this.ruleForm.mobile;
      params.description = this.ruleForm.des;
      params.role_id = this.role_id;
      params.area_id = this.area_id;
      params.id = this.id;
      params.url = api.user;
      await this.axiosPut(params)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功！"
          });
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        })
        .catch(err => err);
    },
    //取消
    onCancel() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.add-expert-container {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  .add-expert-item {
    margin-top: 60px;
    width: 700px;
    // height:500px;
  }
  .tag {
    margin-left: 250px;
    font-size: 16px;
    padding: 10px;
  }
}
</style>