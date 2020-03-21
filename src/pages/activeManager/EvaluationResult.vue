<template>
  <div class="container">
    <el-row>
      <type-select
        :gradeList="gradeList"
        :activityProjectList="activityProjectList"
        :activityTypleList="activityTypleList"
        :regionList="regionList"
        @gradeObject="gradeObject"
        @activityProjectObject="activityProjectObject"
        @activityTypleObject="activityTypleObject"
        @regionObject="regionObject"
      ></type-select>
    </el-row>
    <el-form ref="form" :model="form" :inline="true">
      <el-row>
        <el-col :span="6">
          <el-form-item label="所在学校：">
            <el-input v-model="form.school" placeholder="请输入" size="small" style="width:160px"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="作者：">
            <el-input v-model="form.author" placeholder="请输入作者" size="small" style="width:120px"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="指导老师：">
            <el-input v-model="form.mentor" placeholder="请输入指导老师" size="small" style="width:160px"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="作品名称：">
            <el-input
              v-model="form.work_title"
              placeholder="请输入作品名称"
              size="small"
              style="width:160px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" @click="goToSearch()" size="small" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--展示内容-->
    <div class="buttonenum">
      <el-button size="small" type="primary">设置奖项</el-button>
      <el-button size="small">推荐省级</el-button>
      <el-button size="small">下载作品</el-button>
      <el-button size="small">下载excel</el-button>
      <el-button size="small">作品展示</el-button>
    </div>
    <div style="margin-top:16px;">
      <template>
        <!-- 序号 报名时间 报名人 联系电话 所在地区 所在学校 -->
        <el-table
          :data="tableData"
          ref="multipleTable"
          border
          :header-cell-style="{background:'#EEEEEE',color:'#323232'}"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="tableSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
          <el-table-column prop="works.title" label="作品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="author_" label="指导老师" ></el-table-column>
          <el-table-column prop="title_" label="所在学校" show-overflow-tooltip></el-table-column>
          <el-table-column prop="areaName" label="所在地区"></el-table-column>

          <el-table-column prop="score" label="得分"></el-table-column>
          <el-table-column prop="" label="获奖"></el-table-column>
          <el-table-column prop="" label="推荐"></el-table-column>
        </el-table>
      </template>
    </div>
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
</template>
<script>
import TypeSelect from "../../components/TypeSelect";
import api from "../../service/api";
export default {
  components: {TypeSelect },
  props: {
    id: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      currentPage: 1, //当前页
      perPage: 20, //每页条数
      totalCount: 0, //总数
      multipleSelection:[],//列表选择
      gradeList: [
        { id: 0, name: "全部" },
        { name: "幼教组", id: 1 },
        { name: "小学组", id: 2 },
        { name: "初中组", id: 4 },
        { name: "高中组", id: 8 },
        { name: "特教组", id: 16 },
        { name: "中职组", id: 32 },
        { name: "高教组", id: 64 }
      ], //学段
      activityProjectList: [{ id: 0, name: "全部" }], //活动项目列表
      activityTypleList: [{ id: 0, name: "全部" }], //活动分类列表
      regionList: [{ id: 0, name: "全部" }], //区域列表
      form: {
        school: "",
        work_title: "",
        mentor: "",
        author: ""
      },
      tableData: [],//作品列表
    };
  },
  created(){
    let params={}
    this.getEnrollList(params);
  },
  mounted(){
    this.getActivityDetail();
  },
  methods: {
    //获取详情
    async getActivityDetail() {
      let params = {};
      params.url = api.activity;
      params.id = this.id;
      params.expand =
        "detail,region,node,attachment,banner,category,categoryDetail";
      await this.axiosGet(params)
        .then(res => {
          if (res.categoryDetail.length > 0) {
            res.categoryDetail.forEach(element => {
              this.activityTypleList.push({
                id: element.id,
                name: element.title
              });
              element.child.forEach(ite => {
                this.activityProjectList.push({ id: ite.id, name: ite.title });
              });
            });
            res.region.forEach(item => {
              this.regionList.push({ id: item.id, name: item.area_name });
            });
            console.log(this.activityTypleList);
          }
        })
        .catch(err => err);
    },
    //学段改变
    async gradeObject(val) {
      this.period=val
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    //活动项目
    async activityProjectObject(val) {
      this.item_id=val
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    //活动类别
    async activityTypleObject(val) {
      this.category_id=val
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    //区域
    async regionObject(val) {
      this.region=val
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    //获取作品
    async getEnrollList(params) {
      if (this.form.school != "") {
        params.school = this.form.school;
      }
      if (this.form.work_title != "") {
        params.work_title = this.form.work_title;
      }
      if (this.form.mentor != "") {
        params.mentor = this.form.mentor;
      }
      if (this.form.author != "") {
        params.author = this.form.author;
      }
      if (this.period != 0&&this.period!='') {
        params.period = this.period;
      }
      if (this.category_id != 0&&this.category_id!='') {
        params.category_id = this.category_id;
      }
      if (this.item_id != 0&&this.item_id!='') {
        params.item_id = this.item_id;
      }
      if (this.region != 0 && this.region != "77") {
        params.region = this.region
      }
      params.url = api.enroll;
      params.expand = "info,works,school,professional";
      params.activity_id =this.id
      await this.axiosGet(params)
        .then(res => {
          this.tableData = res.items;
          this.tableData.forEach(ite => {
            var title = "";
            var areaName = "";
            var author_ = "";
            var mentor_ = "";
            ite.school.forEach(item => {
              title == ""
                ? (title = item.title)
                : (title = title + "," + item.title);
              areaName = item.areaInfo.areaName;
            });
            ite.works.member.author.forEach(item => {
              author_ == ""
                ? (author_ = item.name)
                : (author_ = author_ + "," + item.name);
            });
            ite.works.member.mentor.forEach(item => {
              mentor_ == ""
                ? (mentor_ = item.name)
                : (mentor = mentor_ + "," + item.name);
            });
            ite.mentor_ = mentor_;
            ite.author_ = author_;
            ite.areaName = areaName;
            ite.title_ = title;
          });
          this.totalCount = res._meta.totalCount;
        })
        .catch(err => err);
    },

    CityReslut() {
      console.log(111111);
      this.$router.push({
        path: "/activeManager/createActivity/EvaluationResultDital"
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //列表选择
    tableSelectionChange(val) {
      this.multipleSelection = val;
    },
    //每页数量改变
    pageSizeChange(val) {
      this.perPage = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      // this.getEnrollList(params);
    },
    //页码改变
    pageCurrentChange(val) {
      this.currentPage = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      // this.getEnrollList(params);
    }
  }
};
</script>
<style lang="less" scoped>
.page-div {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.secendROw {
  margin-left: -126px;
}

.buttonenum {
  float: left;
  margin: 20px 0 10px 0;
}
</style>
