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
        <el-col :span="8">
          <el-form-item label="所在学校：">
            <el-input v-model="form.school" placeholder="请输入" size="small" style="width:260px;"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="作者：">
            <el-input v-model="form.author" placeholder="请输入作者" size="small" style="width:260px;"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="指导老师：">
            <el-input v-model="form.mentor" placeholder="请输入指导老师" size="small" style="width:260px;"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="作品名称：">
            <el-input
              v-model="form.works_title"
              placeholder="请输入作品名称"
              size="small"
              style="width:260px;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="作品编号：">
            <el-input
              v-model="form.work_id"
              placeholder="请输入作品编号"
              size="small"
              style="width:260px;"
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
      <el-button size="small" type="primary" @click="goToSetAwardMore()">设置奖项</el-button>
      <el-button size="small" type="primary" plain @click="goToRecommmend()">推荐省级</el-button>
      <el-button size="small" @click="downloadWorks()">下载作品</el-button>
      <el-button size="small" @click="goToDownload()">导出excel</el-button>
      <el-button size="small" @click="goToShowWorkMore()">开启作品展示</el-button>
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
           <!-- <el-table-column label="序号" type="index" width="100" align="center"></el-table-column> -->
           <el-table-column prop="" width="130" label="作品编号">
            <template slot-scope="scope">
              {{scope.row.serial_id}}
            </template>
          </el-table-column>
          <el-table-column prop="works.title" label="作品名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goToActDetail(scope.row)"> {{scope.row.works.title}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="author_" label="作者" show-overflow-tooltip></el-table-column>
          <el-table-column prop="mentor_" label="指导老师" show-overflow-tooltip></el-table-column>
          <el-table-column prop="school.areaName" label="所在地区" show-overflow-tooltip></el-table-column>
          <el-table-column prop="school.title" label="所在学校" show-overflow-tooltip></el-table-column>

          <el-table-column label="得分" width="80">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="goToScoreDetail(scope.row.id)"
                size="small"
              >{{scope.row.score}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="作品展示" width="100">
            <template slot-scope="scope">
              <template v-if="scope.row.position<4">
                <el-button type="text" @click="goToShowWork(scope.row.id,1)" size="small">开启作品展示</el-button>
              </template>
              <template v-else>
                <el-button
                  type="text"
                  style="color:red;"
                  @click="goToShowWork(scope.row.id,0)"
                  size="small"
                >关闭作品展示</el-button>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="获奖" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <template v-if="scope.row.award.length>0">
                <el-button type="text" @click="goToSetAward(scope.row.id)" size="small">修改</el-button>
                <template v-for="item in scope.row.award">
                  {{item.title}}
                </template >
              </template>
              <template v-else>
                <el-button type="text" @click="goToSetAward(scope.row.id)" size="small">设置奖项</el-button>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="推荐省级" width="160">
            <template slot-scope="scope">
              <template v-if="scope.row.position==1||scope.row.position==5">
                <el-button type="text" @click="goToRecommmendItem(scope.row.id)" size="small">推荐省级</el-button>
              </template>
              <template slot-scope="scope" v-else>
                已推荐省级
                <el-button
                  type="text"
                  style="color:red"
                  @click="goToDisRecommmendItem(scope.row.id)"
                  size="small"
                >取消推荐</el-button>
              </template>
            </template>
          </el-table-column>
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
    <el-dialog title="设置奖项" :visible.sync="awardDialogVisible" width="200" center>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :offset="5">
            <el-checkbox-group v-model="award_ids" @change="awardCheckedChange">
              <el-checkbox v-for="item in awardList" :label="item.id" :key="item.id">{{item.title}}</el-checkbox>
            </el-checkbox-group>

        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSetAward">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import TypeSelect from "../../components/TypeSelect";
import api from "../../service/api";
import { getCookie, axiosGet, axiosPost } from "../../tools/tools";

export default {
  components: { TypeSelect },
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
      multipleSelection: [], //列表选择
      activityProjectList: [{ id: 0, name: "全部" }], //活动项目列表
      activityTypleList: [{ id: 0, name: "全部" }], //活动分类列表
      regionList: [{ id: 0, name: "全部" }], //区域列表
      form: {
        school: "",
        works_title: "",
        mentor: "",
        author: "",
        work_id:"",
      },
      tableData: [], //作品列表
      awardList: [], //奖品列表
      ids: [], //ids
      awardDialogVisible: false, //设置奖项弹窗
      enroll_ids:[],//ids
      award_ids:[],//奖项id
      gradeObj: {
        1: "幼教组",
        2: "小学组",
        4: "初中组",
        8: "高中组",
        16: "特教组",
        32: "中职组",
        64: "高教组"
      }, //组别
      gradeList: [{ id: 0, name: "全部" }], //组别
      ClassList: [
        { name: "幼教组", id: 1 },
        { name: "小学组", id: 2 },
        { name: "初中组", id: 4 },
        { name: "高中组", id: 8 },
        { name: "特教组", id: 16 },
        { name: "中职组", id: 32 },
        { name: "高教组", id: 64 }
      ]
    };
  },
  created() {
    let params = {};
    this.getEnrollList(params);
  },
  mounted() {
    this.getActivityDetail();
    this.getAwardList();
  },
  methods: {
    //获取详情
    async getActivityDetail() {
      this.activityProjectList = [{ id: 0, name: "全部" }]; //活动项目列表
      this.activityTypleList = [{ id: 0, name: "全部" }]; //活动分类列表
      let params = {};
      params.url = api.activity;
      params.id = this.id;
      params.expand =
        "detail,region,node,attachment,banner,category,categoryDetail";
      await axiosGet(params)
        .then(res => {
          let arr = [1, 2, 4, 8, 16, 32, 64];
          let result = this.getSubSet(res.period, arr);
          for (let h in result) {
            for (let g in this.ClassList) {
              if (result[h] == this.ClassList[g].id) {
                this.gradeList.push(this.ClassList[g]);
              }
            }
          }
          if (res.categoryDetail.length > 0) {
            for (let i in res.categoryDetail) {
              let typeItem = {};
              typeItem.id = res.categoryDetail[i].id;
              typeItem.name = res.categoryDetail[i].title;
              typeItem.activityProjectList = [];
              for (let j in res.categoryDetail[i].child) {
                let projectItem = {};
                projectItem.id = res.categoryDetail[i].child[j].id;
                projectItem.name = res.categoryDetail[i].child[j].title;
                typeItem.activityProjectList.push(projectItem);
              }
              this.activityTypleList.push(typeItem);
            }
            for (let i in this.activityTypleList) {
              if (
                this.activityTypleList[i].activityProjectList != undefined &&
                this.activityTypleList[i].activityProjectList.length > 0
              ) {
                this.activityProjectList = this.activityProjectList.concat(
                  this.activityTypleList[i].activityProjectList
                );
              }
            }
            res.region.forEach(item => {
              this.regionList.push({ id: item.id, name: item.area_name });
            });
          }
        })
        .catch(err => err);
    },
    //组别改变
    async gradeObject(val) {
      this.period = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    //活动项目
    async activityProjectObject(val) {
      this.item_id = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    //活动类别
    async activityTypleObject(val) {
      if (val != 0) {
        for (let i in this.activityTypleList) {
          if (val == this.activityTypleList[i].id) {
            this.activityProjectList = this.activityTypleList[
              i
            ].activityProjectList;
          }
        }
        this.item_id=this.activityProjectList[0].id
      } else if (val == 0) {
        this.activityProjectList = [{ id: 0, name: "全部" }];
        for (let i in this.activityTypleList) {
          if (
            this.activityTypleList[i].activityProjectList != undefined &&
            this.activityTypleList[i].activityProjectList.length > 0
          ) {
            this.activityProjectList = this.activityProjectList.concat(
              this.activityTypleList[i].activityProjectList
            );
          }
        }
        this.item_id=0
      }
      this.category_id = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    //区域
    async regionObject(val) {
      this.region = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    //搜索
    goToSearch() {
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
      if (this.form.works_title != "") {
        params.works_title = this.form.works_title;
      }
      if (this.form.mentor != "") {
        params.mentor = this.form.mentor;
      }
      if (this.form.author != "") {
        params.author = this.form.author;
      }
      if (this.form.work_id != "") {
        params.serial_id = this.form.work_id;
      }
      if (this.period != 0 && this.period != "") {
        params.period = this.period;
      }
      if (this.category_id != 0 && this.category_id != "") {
        params.category_id = this.category_id;
      }
      if (this.item_id != 0 && this.item_id != "") {
        params.item_id = this.item_id;
      }
      if (this.region != 0 && this.region != "77") {
        params.region = this.region;
      }
      params.url = api.enroll;
      params.expand = "info,works,school,professional,award";
      params.activity_id = this.id;
      params.scored = 1;
      params.position = 1;
      await this.axiosGet(params)
        .then(res => {
          this.tableData = [];
          this.tableData = res.items;
          console.log("ces",this.tableData);
          this.tableData.forEach(ite => {
            // var title = "";
            // var areaName = "";
            // var author_ = "";
            // var mentor_ = "";
            ite.score=ite.score/10;//把分数除10
            let author_=ite.info.author.map(item=>{
              return item.name;
            })
            let mentor_=ite.info.mentor.map(item=>{
              return item.name;
            })
            ite.author_=author_.join("、");
            ite.mentor_=mentor_.join("、");
            // ite.school.forEach(item => {
            //   title == ""
            //     ? (title = item.title)
            //     : (title = title + "," + item.title);
            //   areaName = item.areaInfo.areaName;
            // });
            // ite.works.member.author.forEach(item => {
            //   author_ == ""
            //     ? (author_ = item.name)
            //     : (author_ = author_ + "," + item.name);
            // });
            // ite.works.member.mentor.forEach(item => {
            //   mentor_ == ""
            //     ? (mentor_ = item.name)
            //     : (mentor = mentor_ + "," + item.name);
            // });
            // ite.mentor_ = mentor_;
            // ite.author_ = author_;
            // ite.areaName = areaName;
            // ite.title_ = title;
          });
          this.totalCount = res._meta.totalCount;
        })
        .catch(err => err);
    },
    //获取奖项列表
    async getAwardList() {
      let params = {};
      params.url = api.award;
      params.ball = 1;
      await this.axiosGet(params)
        .then(res => {
          this.awardList=res.items
        })
        .catch(err => err);
    },
    //导出excel
    goToDownload(){
       let params = {};
      var ids = [];
      this.multipleSelection.forEach(item => {
        ids.push(item.id);
      });
      if(ids.length==0){
        return this.$message({
          type:'error',
          message:"请先勾选需要导出的作品"
        })
      }
      axios.get(api.enroll, {
        params: {
          id: ids.join(","),
          bexport: "1",
          expand:'info,works,school,professional,award'
        },
        responseType: "blob",
        headers: {"x-api-key" : getCookie("x-api-key") }
      }).then(res=>{
        console.log("res===",res)
          if(res.status==200){
           let name=res.headers['content-disposition'].split('=')[1]
            this.downloadFile(name, res.data);
          }else if(res.code==-1){
            return  this.$message({
               type:'error',
               message:res.message
            })
          }
          else{
              return  this.$message({
               type:'error',
               message:"导出出错"
            })
          }
      });
        },
        downloadFile (fileName,data) {
    	if (!data) { return }
    	let url = window.URL.createObjectURL(new Blob([data]))
    	let link = document.createElement('a')
    	link.style.display = 'none'
    	link.href = url;
    	link.setAttribute('download', fileName)
    	document.body.appendChild(link)
    	link.click()
    },
    //下载作品
    async downloadWorks() {
      let params = {};
      var ids = [];
      this.multipleSelection.forEach(item => {
        ids.push(item.id);
      });
      axios.get(api.enroll, {
        params: {
          id: ids.join(","),
          bdownload: "1",
          expand:'works'
        },
        headers: {"x-api-key" : getCookie("x-api-key") }
      }).then(res=>{
        if(res.data.code==0){
          window.open(res.data.url)
        }
      });
    },

    //查看评分情况
    goToScoreDetail(id) {
      this.$router.push({
        path: "/activeManager/managerCenter/EvaluationResultDetail",
        query: {
          id: id
        }
      });
    },
    //展示优秀作品
    async goToShowWorkMore() {
      this.ids = [];
      this.multipleSelection.forEach(item => {
        this.ids.push(item.id);
      });
      let params = {};
      params.url = api.recommend;
      params.ids = this.ids;
      params.position = 4;
      params.value = 1;
      await this.axiosPost(params)
        .then(res => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "开启成功！！"
            });
            let params = {
              "per-page": this.perPage
            };
            params.page = this.currentPage;
            this.getEnrollList(params);
          } else if (res.code == -1) {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(err => err);
    },
    //展示优秀作品单条
    async goToShowWork(id, value) {
      let message = "";
      this.ids = [];
      this.ids.push(id);
      let params = {};
      params.url = api.recommend;
      params.ids = this.ids;
      params.position = 4;
      if (value == 1) {
        params.value = value;
        message = "开启成功！！";
      } else if (value == 0) {
        params.value = value;
        message = "关闭成功！！";
      }
      await this.axiosPost(params)
        .then(res => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: message
            });
            let params = {
              "per-page": this.perPage
            };
            params.page = this.currentPage;
            this.getEnrollList(params);
          } else if (res.code == -1) {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(err => err);
    },
    //设置奖项多个
    goToSetAwardMore(){
      this.awardDialogVisible = true;
      this.enroll_ids=[]
      this.multipleSelection.forEach(item=>{
        this.enroll_ids.push(item.id)
      })
    },
    //设置奖项单个
    goToSetAward(id) {
      this.awardDialogVisible = true;
      this.enroll_ids=[]
      this.enroll_ids.push(id)
    },
    //选择奖项
    awardCheckedChange(data){
    },
    //设置奖项
    async submitSetAward(){
      let params={}
      params.url=api.awards
     
      if(this.enroll_ids.length>0){
        params.enroll_ids=this.enroll_ids
      }else{
        this.$message({
          type:'warning',
          message:'请选择对象',
        })
        return
      }
      if(this.award_ids.length>0){
        params.award_ids=this.award_ids
      }else{
        this.$message({
          type:'warning',
          message:'请选择奖项'
        })
      }
      await this.axiosPost(params).then(res=>{
         if (res.code == 0) {
            this.$message({
              type: "success",
              message: "颁奖成功！！"
            });
            this.awardDialogVisible = false;
            let params = {
              "per-page": this.perPage
            };
            params.page = this.currentPage;
            this.getEnrollList(params);
          } else if (res.code == -1) {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
      }).catch(err=>err)
    },
    //推荐省级
    async goToRecommmend() {
      this.ids = [];
      this.multipleSelection.forEach(item => {
        this.ids.push(item.id);
      });
      let params = {};
      params.url = api.recommend;
      params.ids = this.ids;
      params.position = 2;
      params.value = 1;
      await this.axiosPost(params)
        .then(res => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "推荐成功！！"
            });
            let params = {
              "per-page": this.perPage
            };
            params.page = this.currentPage;
            this.getEnrollList(params);
          } else if (res.code == -1) {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(err => err);
    },
    //推荐省级单条
    async goToRecommmendItem(id) {
      this.ids = [];
      this.ids.push(id);
      let params = {};
      params.url = api.recommend;
      params.ids = this.ids;
      params.position = 2;
      params.value = 1;
      await this.axiosPost(params)
        .then(res => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "推荐成功！！"
            });
            let params = {
              "per-page": this.perPage
            };
            params.page = this.currentPage;
            this.getEnrollList(params);
          } else if (res.code == -1) {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(err => err);
    },
    //取消推荐
    async goToDisRecommmendItem(id) {
      this.ids = [];
      this.ids.push(id);
      let params = {};
      params.url = api.recommend;
      params.ids = this.ids;
      params.position = 2;
      params.value = 0;
      await this.axiosPost(params)
        .then(res => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "取消推荐成功！！"
            });
            let params = {
              "per-page": this.perPage
            };
            params.page = this.currentPage;
            this.getEnrollList(params);
          } else if (res.code == -1) {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(err => err);
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
      this.getEnrollList(params);
    },
    //页码改变
    pageCurrentChange(val) {
      this.currentPage = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
     goToActDetail(row) {
      // 跳转活动详情页
      this.$router.push({
        path: "/home/activityDetail",
        query: {
          id: row.id,
          look:0
        }
      });
    },
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
  margin-bottom: 20px;
}
</style>
