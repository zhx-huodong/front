<template>
  <div class="admin-centainer">
    <el-card style="min-height:600px;">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="教师" name="teacher"></el-tab-pane>
        <el-tab-pane label="学生" name="student"></el-tab-pane>
        <el-tab-pane label="家长" name="parent"></el-tab-pane>
      </el-tabs>
      <div>
        <el-row class="teacher-top">
          <el-col :span="2" v-if="index!=2">所在地区</el-col>
          <el-col :span="6" v-if="index!=2">
            <el-select v-model="areaVal" placeholder="请选择" size="small" @change="areaChange">
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" v-if="index!=2">所在学校</el-col>
          <el-col :span="6" v-if="index!=2">
            <el-select v-model="schoolVal" placeholder="请选择" size="small" @change="schoolChange">
              <el-option
                v-for="item in schoolList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" v-if="index==1">关联家长</el-col>
          <el-col :span="6" v-if="index==1">
            <el-input v-model="parent" placeholder="请输入关联家长" size="small"></el-input>
          </el-col>
          <el-col :span="2" v-if="index==2">关联学生</el-col>
          <el-col :span="6" v-if="index==2">
            <el-input v-model="student" placeholder="请输入关联学生" size="small"></el-input>
          </el-col>
        </el-row>
        <el-row class="teacher-top">
          <el-col :span="1">电话</el-col>
          <el-col :span="6">
            <el-input v-model="mobile" placeholder="请输入电话" size="small"></el-input>
          </el-col>
          <el-col :span="1" :offset="1">姓名</el-col>
          <el-col :span="6">
            <el-input v-model="name" placeholder="请输入姓名" size="small"></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" size="small" icon="el-icon-search" @click="goToSearch">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" plain size="small" @click="goToBatchForbidden">批量禁用</el-button>
          </el-col>
          <!-- <el-col :span="2">
                            <el-button type="danger" plain size="small" @click="goToBatchDelete">批量删除</el-button>
          </el-col>-->
        </el-row>
        <el-row>
          <el-table
            ref="multipleTable"
            :data="userList"
            border
            :header-cell-style="{background:'#EEEEEE',color:'#323232'}"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="tableSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="序号" type="index" width="160"></el-table-column>

            <el-table-column prop="name" label="姓名"></el-table-column>

            <el-table-column label="所在区域" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.areaName }}</template>
            </el-table-column>
            <el-table-column label="所在学校" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.schoolTitle }}</template>
            </el-table-column>
            <el-table-column label="手机号">
              <template slot-scope="scope">{{ scope.row.mobile }}</template>
            </el-table-column>
            <el-table-column label="所关联的家长" show-overflow-tooltip v-if="this.index==1">
              <template slot-scope="scope">
                <template v-for="item in scope.row.memberInfo">{{ item.parent.join(",") }}</template>
              </template>
            </el-table-column>
            <el-table-column label="所关联的学生" show-overflow-tooltip v-if="this.index==2">
              <template slot-scope="scope">
                <template v-for="item in scope.row.memberInfo">{{ item.student.join(",") }}</template>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <template v-if="scope.row.status==1">
                  <!-- <el-button @click="goToDetail(scope.row.id)" type="text" size="small">查看</el-button> -->
                  <el-button
                    @click="goToForbidden(scope.row.id)"
                    type="text"
                    size="small"
                    style="color:red;"
                  >禁用</el-button>
                </template>
                <template v-if="scope.row.status==0">
                  <el-button type="text" size="small" style="color:#999;">已禁用</el-button>
                  <el-button @click="goToRelieve(scope.row.id)" type="text" size="small">解禁</el-button>
                </template>
                <el-button
                  @click="goToDelete(scope.row.id,scope.row.openid)"
                  type="text"
                  size="small"
                  style="color:red;"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="page-div">
          <el-pagination
            @size-change="pageSizeChange"
            @current-change="pageCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 30, 40, 50, 100]"
            :page-size="perPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import api from "../service/api";
export default {
  data() {
    return {
      index: 0,
      activeName: "teacher",
      areaList: [
        { id: "77", pid: "6", type: "2", name: "深圳" },
        { id: "726", pid: "77", type: "3", name: "福田区" },
        { id: "727", pid: "77", type: "3", name: "罗湖区" },
        { id: "728", pid: "77", type: "3", name: "南山区" },
        { id: "729", pid: "77", type: "3", name: "宝安区" },
        { id: "730", pid: "77", type: "3", name: "龙岗区" },
        { id: "731", pid: "77", type: "3", name: "盐田区" },
        { id: "732", pid: "77", type: "3", name: "市辖区" },
        { id: "733", pid: "77", type: "3", name: "龙华区" },
        { id: "734", pid: "77", type: "3", name: "坪山区" },
        { id: "735", pid: "77", type: "3", name: "光明区" },
        { id: "736", pid: "77", type: "3", name: "大鹏区" }
      ],
      schoolList: [],
      areaVal: "",
      schoolVal: "",
      name: "",
      mobile: "",
      parent: "",
      student: "",
      tableParent: "", //父母表格数据
      tableStudent: "", //学生表格数据
      userList: [],
      multipleSelection: [],
      perPage: 20, //每页数据条数
      currentPage: 1, //当前页
      totalCount: 0 //总条数
    };
  },
  mounted() {},
  created() {
    let params = {
      "per-page": this.perPage
    };
    params.page = this.currentPage;
    params.mtype = parseInt(this.index) + 1;
    this.getUserList(params);
    params = {};
    this.getSchoolList(params);
  },
  methods: {
    //获取用户列表
    async getUserList(params) {
      params.url = api.user;
      params.expand = "memberInfo";
      if (this.name != "") {
        params.name = this.name;
      }
      if (this.mobile != "") {
        params.mobile = this.mobile;
      }
      if (this.schoolVal != "") {
        params.school = this.schoolVal;
      }
      if (this.parent != "") {
        params.parent = this.parent;
      }
      if (this.student != "") {
        params.student = this.student;
      }
      await this.axiosGet(params)
        .then(res => {
          this.userList = res.items;
          this.totalCount = res._meta.totalCount;
          //获取表格学生 表格父母信息
          for (let i = 0; i < this.userList.length; i++) {
            for (let j = 0; j < this.userList[i].memberInfo.length; j++) {
                if(this.userList[i].memberInfo!=undefined&&this.userList[i].memberInfo.length>0&&this.userList[i].memberInfo[0].school!=undefined&&this.userList[i].memberInfo[0].school.areaName!=undefined){
                    this.userList[i].areaName=this.userList[i].memberInfo[0].school.areaName
                }
                if(this.userList[i].memberInfo!=undefined&&this.userList[i].memberInfo.length>0&&this.userList[i].memberInfo[0].school!=undefined&&this.userList[i].memberInfo[0].school.title!=undefined){
                    this.userList[i].schoolTitle=this.userList[i].memberInfo[0].school.title
                }
                
              if (this.userList[i].memberInfo[j].parents != undefined) {
                this.userList[i].memberInfo[j].parent = this.userList[
                  i
                ].memberInfo[j].parents.map(item => {
                  return item.name;
                });
              } else {
                this.userList[i].memberInfo[j].parent = [];
              }
              if (this.userList[i].memberInfo[j].students != undefined) {
                this.userList[i].memberInfo[j].student = this.userList[
                  i
                ].memberInfo[j].students.map(item => {
                  return item.name;
                });
              } else {
                this.userList[i].memberInfo[j].student = [];
              }
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
    async areaChange(id) {
      console.log("area===", id);
      let params = {};
      if (id != 77) {
        params = { "filter[areaid]": this.areaVal };
      }
      this.schoolVal = "";
      this.getSchoolList(params);
      params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      params.mtype = parseInt(this.index) + 1;
      this.getUserList(params);
    },
    //学校改变
    schoolChange(id) {
      this.schoolVal = id;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      params.mtype = parseInt(this.index) + 1;
      this.getUserList(params);
    },

    //导航栏
    tabClick(tab, event) {
      console.log(tab.index, event);
      this.currentPage = 1;
      this.index = tab.index;
      if (this.index == 0) {
        this.parent = "";
      } else if (this.index == 2) {
        this.schoolVal = "";
        this.parent = "";
      }
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      params.mtype = parseInt(this.index) + 1;
      this.getUserList(params);
    },
    //每页数量改变
    pageSizeChange(val) {
      this.perPage = val;
      let params = {
        "per-page": this.perPage
      };
      params.mtype = parseInt(this.index) + 1;
      params.page = this.currentPage;
      this.getUserList(params);
    },
    //页码改变
    pageCurrentChange(val) {
      this.currentPage = val;
      let params = {
        "per-page": this.perPage
      };
      params.mtype = parseInt(this.index) + 1;
      params.page = this.currentPage;
      this.getUserList(params);
    },
    //列表选择
    tableSelectionChange(val) {
      this.multipleSelection = val;
    },
    //查看
    goToDetail(val) {},
    //禁用
    goToForbidden(id) {
      let status = 0;
      this.open(id, status);
    },
    //删除
    goToDelete(id, openid) {
      let openId = "del_" + openid + "_" + Date.parse(new Date()) / 1000;
      let status = -1;
      this.open(id, status, openId);
    },
    //提示框
    open(id, status, openid) {
      let tag = "";
      if (status == 0) {
        tag = "禁止该用户使用改系统";
      } else if (status == -1) {
        tag = "永久删除该用户";
      }
      this.$confirm(`此操作将${tag}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {};
          params.id = id;
          params.status = status;
          // params.openid=openid
          this.updateUser(params);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消！"
          });
        });
    },
    //修改角色权限
    async updateUser(params) {
      params.url = api.user;
      let msg = "";
      if (params.status == 0) {
        msg = "禁用成功！";
      } else if (params.status == -1) {
        msg = "删除成功！";
      }
      await this.axiosPut(params)
        .then(res => {
          this.$message({
            type: "success",
            message: msg
          });
          let params = {
            "per-page": this.perPage
          };
          params.page = this.currentPage;
          params.mtype = parseInt(this.index) + 1;
          this.getUserList(params);
        })
        .catch(err => err);
    },
    //解禁
    async goToRelieve(id) {
      let params = {};
      params.id = id;
      params.status = 1;
      params.url = api.user;
      await this.axiosPut(params)
        .then(res => {
          this.$message({
            type: "success",
            message: "解禁成功！"
          });
          params = {
            "per-page": this.perPage
          };
          params.page = this.currentPage;
          params.mtype = parseInt(this.index) + 1;
          this.getUserList(params);
        })
        .catch(err => err);
    },
    //查询
    async goToSearch() {
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      params.mtype = parseInt(this.index) + 1;
      this.getUserList(params);
    },
    //批量禁用
    async goToBatchForbidden() {
      let ids = [];
      for (let i in this.multipleSelection) {
        ids.push(this.multipleSelection[i].id);
      }
      if (ids.length == 0) {
        this.$message({
          type: "info",
          message: "请先选择需要禁用的用户"
        });
        return;
      }
      let params = {};
      params.ids = ids;

      params.url = api.disableUsers;
      this.$confirm(`此操作将批量禁用用户使用该系统, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.batchForbidden(params);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消！"
          });
        });
    },
    //批量禁用
    async batchForbidden(params) {
      await this.axiosPost(params)
        .then(res => {
          this.$message({
            type: "success",
            message: "批量禁用成功！"
          });
          let params = {
            "per-page": this.perPage
          };
          params.page = this.currentPage;
          params.mtype = parseInt(this.index) + 1;
          this.getUserList(params);
        })
        .catch(err => err);
    },
    //批量删除
    goToBatchDelete() {
      let ids = [];
      for (let i in this.multipleSelection) {
        ids.push(this.multipleSelection[i].id);
      }
      if (ids.length == 0) {
        this.$message({
          type: "info",
          message: "请先选择需要删除的用户"
        });
        return;
      }
      let params = {};
      params.ids = ids;
      params.url = api.deleteUsers;
      this.$confirm(`此操作将批量删除用户, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.batchDelete(params);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消！"
          });
        });
    },
    //批量删除
    async batchDelete(params) {
      await this.axiosPost(params)
        .then(res => {
          this.$message({
            type: "success",
            message: "批量删除成功！"
          });
          let params = {
            "per-page": this.perPage
          };
          params.page = this.currentPage;
          params.mtype = parseInt(this.index) + 1;
          this.getUserList(params);
        })
        .catch(err => err);
    }
  }
};
</script>
<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
<style lang="less" scoped>
.admin-centainer {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  .teacher-top {
    display: flex;
    align-items: center;
  }
  .page-div {
    display: flex;
    justify-content: center;
  }
}
</style>