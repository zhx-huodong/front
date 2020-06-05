<template>
  <div class="work-review-container">
    <el-card style="min-height:600px;">
      <el-tabs v-model="workReview">
        <el-tab-pane label="作品评审" name="workReview">
          <el-row>
            <el-col>
              <type-select
                :gradeList="gradeList"
                :activityNameList="activityNameList"
                :activityTypleList="activityTypleList"
                :activityProjectList="activityProjectList"
                @activityNameObject="activityNameObject"
                @gradeObject="gradeObject"
                @activityTypleObject="activityTypleObject"
                @activityProjectObject="activityProjectObject"
              ></type-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <el-button type="primary" plain size="small" @click="downloadWork">下载作品</el-button>
            </el-col>
            <!-- <el-col :span="3">
                            <el-button type="primary" plain @click="goToImport" size="small">导入评分表</el-button>
            </el-col>-->
            <el-col :span="2">
              <el-button type="primary" plain @click="goToDownload" size="small">下载评分表</el-button>
            </el-col>
            <el-col :span="10" :offset="4">
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                style="width:900px"
              >
                <el-form-item label="作品编号：">
                  <el-input
                    v-model="formInline.work_id"
                    placeholder="输入作品编号"
                    style="width:250px"
                    size="small"
                  ></el-input>
                </el-form-item>
                <el-form-item label="作品名称：">
                  <el-input
                    v-model="formInline.activityName"
                    placeholder="输入作品名称"
                    style="width:250px"
                    size="small"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="goToSearch" size="small">查找</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              ref="multipleTable"
              :data="tableData"
              border
              :header-cell-style="{background:'#EEEEEE',color:'#323232'}"
              tooltip-effect="dark"
              style="width: 100%"
              v-loading="loading"
              @selection-change="tableSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="serial_id" label="作品编号" show-overflow-tooltip></el-table-column>
              <el-table-column prop="info.activity" label="活动名称" show-overflow-tooltip></el-table-column>

              <el-table-column prop="info.category" label="活动分类" show-overflow-tooltip></el-table-column>

              <el-table-column prop="info.project" label="活动项目" show-overflow-tooltip></el-table-column>

              <el-table-column label="组别" show-overflow-tooltip>
                <template slot-scope="scope">{{gradeObj[scope.row.period]}}</template>
              </el-table-column>

              <el-table-column prop="works.title" label="作品名称" show-overflow-tooltip></el-table-column>

              <el-table-column label="评分" prop="score"></el-table-column>

              <el-table-column prop="comment" label="评语" show-overflow-tooltip></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="goToLook(scope.row)"
                    v-if="scope.row.score==0&&scope.row.comment==''"
                    type="text"
                    size="small"
                  >查看</el-button>
                  <el-button
                    @click="goToLook(scope.row)"
                    v-else
                    type="text"
                    size="small"
                    style="color:red"
                  >修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row class="page-div">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pages.now_page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="searchParams.per_page"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pages.total"
            ></el-pagination>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import TypeSelect from "../components/TypeSelect";
import api from "../service/api";
import { axiosGet, getCookie } from "../tools/tools";
import axios from "axios";
export default {
  components: { TypeSelect },
  data() {
    return {
      workReview: "workReview",
      userid: "", //用户id
      activityNameList: [],
      activityNameSelectID: "", //活动名称所选择的id
      activityTypleList: [],
      activityTypleSelectID: "", //活动分类所选择的id
      activityProjectList: [],
      activityProjectSelectID: "",
      gradeList: [],
      ClassList: [
        { name: "幼教组", id: 1 },
        { name: "小学组", id: 2 },
        { name: "初中组", id: 4 },
        { name: "高中组", id: 8 },
        { name: "特教组", id: 16 },
        { name: "中职组", id: 32 },
        { name: "高教组", id: 64 }
      ],
      gradeSelectID: "", //组别选择的id
      formInline: {
        activityName: "",
        activityType: "",
        work_id: ""
      },
      tableData: [],
      multipleSelection: [],
      selectedCell: [], //选择的表格行数
      pages: { now_page: 1, per_page: 10, total: 0 },
      searchParams: { now_page: 0, per_page: 10 },
      apiKey: getCookie("x-api-key"),
      loading: true,
      gradeObj: {
        1: "幼教组",
        2: "小学组",
        4: "初中组",
        8: "高中组",
        16: "特教组",
        32: "中职组",
        64: "高教组"
      } //组别
    };
  },
  created() {
    this.userid = JSON.parse(localStorage.getItem("user")).id;
    this.getActivityList();
  },
  mounted() {},
  methods: {
    //获取所有的活动列表
    async getActivityList() {
      let that = this;
      let params = {};
      params.url = api.activity;
      params.expand = "category";
      params.inscore = 1;
      await this.axiosGet(params).then(res => {
        for (let i in res.items) {
          let allChoiceItem = {};
          let activityTypleList = [];
          let gradeList = [];
          allChoiceItem.id = res.items[i].id;
          allChoiceItem.name = res.items[i].title;

          let arr = [1, 2, 4, 8, 16, 32, 64];
          let result = this.getSubSet(res.items[i].period, arr);
          for (let h in result) {
            for (let g in this.ClassList) {
              if (result[h] == this.ClassList[g].id) {
                gradeList.push(this.ClassList[g]);
              }
            }
          }
          allChoiceItem.gradeList = gradeList;
          for (let j in res.items[i].category) {
            let categoryItem = {};
            let activityProjectList = [];
            categoryItem.id = res.items[i].category[j].id;
            categoryItem.name = res.items[i].category[j].title;
            for (let k in res.items[i].category[j].child) {
              let activityItem = {};
              activityItem.id = res.items[i].category[j].child[k].id;
              activityItem.name = res.items[i].category[j].child[k].title;
              activityProjectList.push(activityItem);
            }
            categoryItem.activityProjectList = activityProjectList;
            activityTypleList.push(categoryItem);
          }
          allChoiceItem.activityTypleList = activityTypleList;
          that.activityNameList.push(allChoiceItem);
        }
        if (that.activityNameList.length > 0) {
          if(that.activityNameList[0].id!=undefined){
            that.activityNameSelectID = that.activityNameList[0].id;
          }
          if(that.activityNameList[0].gradeList!=undefined){
            that.gradeList = that.activityNameList[0].gradeList;
          }
          if(that.activityNameList[0].gradeList!=undefined&&that.activityNameList[0].gradeList.length>0&&that.activityNameList[0].gradeList[0].id!=undefined){
            that.gradeSelectID = that.activityNameList[0].gradeList[0].id;
          }
          if(that.activityNameList[0].activityTypleList!=undefined){
            that.activityTypleList = that.activityNameList[0].activityTypleList;
          }
          if(that.activityNameList[0].activityTypleList!=undefined&&that.activityNameList[0].activityTypleList.length>0&&that.activityNameList[0].activityTypleList[0].id!=undefined){
            that.activityTypleSelectID =that.activityNameList[0].activityTypleList[0].id;
          }
          if(that.activityNameList[0].activityTypleList!=undefined&&that.activityNameList[0].activityTypleList.length>0&&that.activityNameList[0].activityTypleList[0].activityProjectList!=undefined){
            that.activityProjectList =that.activityNameList[0].activityTypleList[0].activityProjectList;
          }
          if(that.activityNameList[0].activityTypleList!=undefined&&that.activityNameList[0].activityTypleList.length>0&&that.activityNameList[0].activityTypleList[0].activityProjectList.length>0&&that.activityNameList[0].activityTypleList[0].activityProjectList[0].id!=undefined){
            that.activityProjectSelectID =that.activityNameList[0].activityTypleList[0].activityProjectList[0].id;
          }
          
          that.getWorksList();
        }else{
          that.loading = false;
        }
      });
    },
    //获取所有的专家作品列表
    async getWorksList() {
      let that = this;
      let params = {};
      params.url = api.enroll;
      params.inscore = 1;
      params.expand = "info,works,professional";
      params.currentPage = that.pages.now_page;
      if (that.pages.per_page != 0) {
        params.pagesize = that.pages.per_page;
      }
      if (that.activityNameSelectID != "") {
        params.activity_id = that.activityNameSelectID; //按活动筛选报名记录
      }
      if (that.gradeSelectID != "" && that.gradeSelectID != 0) {
        params.period = that.gradeSelectID; //按组别筛选 [筛选活动时有效] 按组别筛选：多个组别则相加
      }
      if (that.activityTypleSelectID != "" && that.activityTypleSelectID != 0) {
        params.category_id = that.activityTypleSelectID; //按分类筛选
      }
      if (
        that.activityProjectSelectID != "" &&
        that.activityProjectSelectID != 0
      ) {
        params.item_id = that.activityProjectSelectID; //按项目筛选
      }
      if (that.formInline.activityName != "") {
        //按作品名称搜索
        params.works_title = that.formInline.activityName;
      }
      if (that.formInline.work_id != "") {
        //按作品id搜索
        params.serial_id = that.formInline.work_id;
      }
      await this.axiosGet(params)
        .then(res => {
          that.tableData = [];
          let item = res.items;
          that.tableData = item;

          for (let i = 0; i < that.tableData.length; i++) {
            that.tableData[i].score = that.tableData[i].professional.map(
              res => {
                if(res.score<0){
                  return res.score=0
                }else{
                  return res.score / 10;
                } 
              }
            );
            that.tableData[i].comment = that.tableData[i].professional.map(
              res => {
                return res.comment;
              }
            );
          }
          that.pages.per_page = res._meta.pageCount;
          that.pages.now_page = res._meta.currentPage;
          that.pages.total = res._meta.totalCount;
          that.loading = false;
        })
        .catch(err => {
          that.loading = false;
        });
    },
    //查询
    goToSearch() {
      let that = this;
      that.getWorksList();
    },
    //导入评分表
    goToImport() {
      this.$router.push({
        path: "/importWorkList"
      });
    },
    //下载评分表
    goToDownload() {
      let params = {};
      var ids = [];
      this.multipleSelection.forEach(item => {
        ids.push(item.id);
      });
      if (ids.length == 0) {
        return this.$message({
          type: "error",
          message: "请先勾选需要导出的作品"
        });
      }
      axios
        .get(api.enroll, {
          params: {
            id: ids.join(","),
            bexport: "1",
            expand: "info,works,school,professional,award"
          },
          responseType: "blob",
          headers: { "x-api-key": getCookie("x-api-key") }
        })
        .then(res => {
          console.log("res===", res);
          if (res.status == 200) {
            let name=res.headers['content-disposition'].split('=')[1]
            this.downloadFile(name, res.data);
          } else if (res.code == -1) {
            return this.$message({
              type: "error",
              message: res.message
            });
          } else {
            return this.$message({
              type: "error",
              message: "导出出错"
            });
          }
        });
    },
    downloadFile(fileName, data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    },
    //下载作品
    downloadWork() {
      let that = this;
      axios
        .get(api.enroll, {
          params: {
            id: that.selectedCell.join(","),
            bdownload: "1",
            inscore: "1",
            expand:'works'
          },
          headers: { "x-api-key": that.apiKey }
        })
        .then(res => {
          let datas = res.data;
          if (datas.code == 0) {
            console.log("哈哈", datas.url);
            window.location.href = datas.url;
            return;
          }
          that.selectedCell = []; //再把所选的下载文件置空
        });
    },
    //查看
    goToLook(row) {
      console.log("row====", row);
      sessionStorage.setItem(
        "tableData",
        JSON.stringify(this.tableData)
      );
      let query;
      this.$router.push({
        path: "/workScore",
        query: { id: row.id, score: row.score, comment: row.comment }
      });
    },
    //处理每页数量的改变
    handleSizeChange(val) {
      let that = this;
      that.searchParams.per_page = val;
      that.getWorksList();
    },
    //处理每页的改变
    handleCurrentChange(val) {
      let that = this;
      that.searchParams.now_page = val;
      that.getWorksList();
    },
    //提示框
    open(index, rows) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //活动名称
    async activityNameObject(value) {
      console.log("value====",value)
      let that = this;
      // that.gradeSelectID=0
      that.activityNameSelectID = value;
      for (let i in that.activityNameList) {
        if (that.activityNameList[i].id == value) {
          console.log("that.activityNameList[i]==",that.activityNameList[i])
          that.gradeList = that.activityNameList[i].gradeList;
          if(that.activityNameList[i].gradeList!=undefined&&that.activityNameList[i].gradeList.length>0){
            that.gradeSelectID = that.activityNameList[i].gradeList[0].id;
          }else{
            that.gradeSelectID=''
          }
          that.activityTypleList = that.activityNameList[i].activityTypleList;
          if(that.activityNameList[i].activityTypleList!=undefined&&that.activityNameList[i].activityTypleList.length>0){
            that.activityTypleSelectID =that.activityNameList[i].activityTypleList[0].id;
          }else{
            that.activityTypleSelectID=''
          }
          if(that.activityNameList[i].activityTypleList.length>0&&that.activityNameList[i].activityTypleList[0].activityProjectList!=undefined){
            that.activityProjectList =that.activityNameList[i].activityTypleList[0].activityProjectList;
          }
          
          if(that.activityNameList[i].activityTypleList!=undefined&&that.activityNameList[i].activityTypleList.length>0){
            that.activityProjectSelectID =that.activityNameList[i].activityTypleList[0].activityProjectList[0].id;
          }else{
            that.activityProjectSelectID=''
          }
          
        }
      }
      that.getWorksList();
    },
    //活动分类
    async activityTypleObject(value) {
      console.log("value===",value)
      let that = this;
      that.activityTypleSelectID = value;
      for (let i in that.activityNameList) {
        if (that.activityNameSelectID == that.activityNameList[i].id) {
          for (let j in that.activityNameList[i].activityTypleList) {
            if (that.activityNameList[i].activityTypleList[j].id == value) {
              that.activityProjectList =
                that.activityNameList[i].activityTypleList[
                  j
                ].activityProjectList;
              that.activityProjectSelectID =
                that.activityNameList[i].activityTypleList[
                  j
                ].activityProjectList[0].id;
            }
          }
        }
      }
      that.getWorksList();
    },
    //组别
    async gradeObject(value) {
      let that = this;
      that.gradeSelectID = value;
      that.getWorksList();
    },
    //活动项目
    async activityProjectObject(value) {
      let that = this;
      that.activityProjectSelectID = value;
      that.getWorksList();
    },
    //表格选择
    async tableSelectionChange(val) {
      let that = this;
      let select = val;
      that.selectedCell = select.map(item => {
        return item.id;
      });
      this.multipleSelection = val;
    }
  }
};
</script>
<style lang="less" scoped>
.work-review-container {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  .page-div {
    display: flex;
    justify-content: center;
  }
}
</style>
