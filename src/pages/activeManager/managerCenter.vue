<template>
  <div class="home-center">
    <el-card style="min-height:650px;">
      <div class="home-wrap">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="活动设置" name="first">
            <activity-setting :id="id"></activity-setting>
          </el-tab-pane>
          <el-tab-pane label="作品管理" name="third">
            <works-management :id="id"></works-management>
          </el-tab-pane>
          <el-tab-pane label="评审结果" name="fourth">
            <evaluation-result :id="id"></evaluation-result>
          </el-tab-pane>
          <el-tab-pane label="消息公告" name="fifth">
            <el-row>
              <el-col>
                <el-button type="primary" @click="goToRelease()" size="small">发布公告</el-button>
                <!-- <el-button type="danger" @click="goToDelete()" size="small">删除公告</el-button> -->
              </el-col>
            </el-row>
            <el-row>
              <template>
                <el-table
                  :data="tableData"
                  ref="multipleTable"
                  border
                  :header-cell-style="{background:'#EEEEEE',color:'#323232'}"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="tableSelectionChange"
                >
                  <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                  <el-table-column label="序号" type="index" width="160"></el-table-column>
                  <el-table-column prop="title" label="名称"></el-table-column>
                  <el-table-column label="提交时间">
                    <template slot-scope="scope">{{formatDateChar(scope.row.created_at*1000)}}</template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button type="text" @click="goToEdit(scope.row.id)">编辑</el-button>
                      <el-button
                        style="color:red"
                        type="text"
                        @click="goToDeleteItem(scope.row.id)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
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
          </el-tab-pane>
          <el-tab-pane label="活动统计" name="six">
            <activity-statistics :id="id"></activity-statistics>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
import EnrollInfo from "./EnrollInfo";
import WorksManagement from "./WorksManagement";
import EvaluationResult from "./EvaluationResult";
import ActivityStatistics from "./ActivityStatistics";
import ActivitySetting from "./ActivitySetting"; //活动设置
import TypeSelect from "../../components/TypeSelect";
import { axiosGet } from "../../tools/tools";
import api from "../../service/api";
export default {
  components: {
    EnrollInfo,
    WorksManagement,
    EvaluationResult,
    ActivityStatistics,
    TypeSelect,
    ActivitySetting
  },
  data() {
    return {
      id: this.$route.query.id, //活动id
      activeName: "third",
      tableData: [], //公告列表
      multipleSelection: [],
      perPage: 20, //每页数据条数
      currentPage: 1, //当前页
      totalCount: 0 //总条数
    };
  },
  created() {
    let params = {
      "per-page": this.perPage,
      "filter[activity_id]": this.id
    };
    params.page = this.currentPage;
    this.getActivityNoticeList(params);
  },

  methods: {
    //导航栏
    tabClick(tag) {
      this.activeName = tag.name;
    },
    //发布公告
    goToRelease() {
      this.$router.push({
        path: "/activeManager/managerCenter/releaseAnnouncement",
        query: {
          id: this.id,
          edit:0
        }
      });
    },
    //获取公告
    async getActivityNoticeList(params) {
      params.url = api.activityNotice;
      params.expand = "content,bcheck";
      await this.axiosGet(params)
        .then(res => {
          this.tableData = res.items;
          this.totalCount = res._meta.totalCount;
        })
        .catch(err => err);
    },
    //删除公告
    goToDelete(id) {},
    //编辑
    goToEdit(id) {
      this.$router.push({
        path: "/activeManager/managerCenter/releaseAnnouncement",
        query: {
          id: id,
          edit:1
        }
      });
    },
    //删除单条公告
    async goToDeleteItem(id) {
      let params = {};
      params.url = api.activityNotice;
      params.id = id;
      await this.axiosDelete(params)
        .then(res => {
          let params = {
            "per-page": this.perPage,
            "filter[activity_id]": this.id
          };
          params.page = this.currentPage;
          this.getActivityNoticeList(params);
        })
        .catch(err => err);
    },
    //列表选择
    tableSelectionChange(val) {
      this.multipleSelection = val;
    },
    //每页数量改变
    pageSizeChange(val) {
      this.perPage = val;
      let params = {
        "per-page": this.perPage,
        "filter[activity_id]": this.id
      };
      params.page = this.currentPage;
      this.getActivityNoticeList(params);
    },
    //页码改变
    pageCurrentChange(val) {
      this.currentPage = val;
      let params = {
        "per-page": this.perPage,
        "filter[activity_id]": this.id
      };
      params.page = this.currentPage;
      this.getActivityNoticeList(params);
    }
  },
  beforeDestroy() {
    let addActivityForm = null;
    sessionStorage.setItem("addActivityForm", JSON.stringify(addActivityForm));
  }
};
</script>
<style lang="less" scoped>
.home-center {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
}
.page-div {
  display: flex;
  justify-content: center;
}
.add-activety-setting {
  margin-top: 36px;
}
</style>
