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
              v-model="form.work_title"
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
    <el-row>
      <el-button
        size="small"
        type="primary"
        @click="goToRecommmend()"
        v-if="$store.state.account.nowRole.type==3"
      >推荐市级</el-button>
      <el-button
        size="small"
        type="primary"
        @click="distributionWorks()"
        v-if="$store.state.account.nowRole.type!=3"
      >分配作品</el-button>
      <el-button size="small" @click="downloadWorks()">下载作品</el-button>
      <el-button size="small" @click="exportWorks()">导出excel</el-button>
      <el-button
        size="small"
        type="danger"
        @click="returnWorksDialog()"
        plain
        v-if="$store.state.account.nowRole.type==3"
      >退回作品</el-button>
      
    </el-row>
    
       
   
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
          >
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- <el-table-column label="序号" type="index" width="80" align="center"></el-table-column> -->
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
          
          <el-table-column prop="author_" label="作者"></el-table-column>
          <el-table-column prop="mentor_" label="指导老师"></el-table-column>
          <el-table-column prop="school.areaName" label="所在地区" show-overflow-tooltip></el-table-column>
          <el-table-column prop="school.title" label="所在学校" show-overflow-tooltip></el-table-column>
          <el-table-column prop="info.category" label="活动分类" show-overflow-tooltip></el-table-column>
          <el-table-column prop="info.project" label="活动项目" show-overflow-tooltip></el-table-column>
          <el-table-column
            label="分配专家"
            show-overflow-tooltip
            v-if="$store.state.account.nowRole.type!=3"
          >
            <template slot-scope="scope">
              <template
                v-if="scope.row.professional.length>0"
               
              >{{scope.row.professionalArr.join("、")}}</template>
              <template v-else>未分配</template>
            </template>
          </el-table-column>
          <el-table-column
            width="160"
            label="推荐市级"
            show-overflow-tooltip
            v-if="$store.state.account.nowRole.type==3"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.position==0">
                <el-button type="text" @click="goToRecommmendItem(scope.row.id)">推荐市级</el-button>
              </template>
              <template v-else>
                已推荐市级
                <el-button type="text" style="color:red;" @click="goToDisRecommmendItem(scope.row.id,scope.row.award,scope.row.professional)">取消推荐</el-button>
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

    <div v-if="dialogVisible" class="mask">
      <div class="box">
        <my-transfer @edit="edit" @Noedit="Noedit" :workList="multipleSelection"></my-transfer>
      </div>
    </div>
    <el-dialog
      title="退回原因"
      :visible.sync="RejectVisible"
      width="30%">
      <el-input placeholder="请输入退回原因" v-model="rejectReason"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RejectVisible = false">取 消</el-button>
        <el-button type="primary" @click="returnWorks">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>
<script>
import MyTransfer from "../../components/MyTransfer";
import TypeSelect from "../../components/TypeSelect";
import api from "../../service/api";
import { axiosGet, getCookie } from "../../tools/tools";
import axios from "axios";
export default {
  components: { MyTransfer, TypeSelect },
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
      multipleSelection: [], //选择列表
      form: {
        school: "",
        work_title: "",
        mentor: "",
        author: "",
        work_id:"",//作品编号
      },
      tableData: [],
      dialogVisible: false,
      totalCount: 0, //总条数
      perPage: 20,
      currentPage: 1,
      region: "", //区域
      item_id: "", //项目
      period: "", //学段
      category_id: "", //分类
      ids: [],//id列表
      excelSteam:'',//文件流
      rejectReason:'',//退回原因
      RejectVisible:false,//退回原因窗口
    };
  },
  watch: {
    id: function(val) {
      console.log(val, "id");
    }
  },
  created() {
    let params = {};
    this.getEnrollList(params);
  },
  mounted() {
    console.log("id===", this.id);
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
      await axiosGet(params)
        .then(res => {
          console.log(res.categoryDetail);
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
      console.log(val);
      this.period = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    //活动项目
    async activityProjectObject(val) {
      console.log(val);
      this.item_id = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    //活动类别
    async activityTypleObject(val) {
      console.log(val);
      this.category_id = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    //区域
    async regionObject(val) {
      console.log(val);
      this.region = val;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },

    //列表选择
    tableSelectionChange(val) {
      this.multipleSelection = val;
    },
    //查询
    goToSearch() {
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    //下载
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
    //导出
    async exportWorks() {
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
           // let elink=document.createElement('a');
           // elink.download="作品.xls";
           // elink.href=res.data;
           // elink.click();
             this.downloadFile("作品.xlsx",res.data);
          }else{
            return  this.$message({
               type:'error',
               message:'出错了'
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
    //退回作品
    returnWorksDialog(){
        let that=this;
        this.multipleSelection.forEach(item => {
          this.ids.push(item.id);
        });
        for(let i=0;i<this.tableData.length;i++){
           for(let j=0;j<this.ids.length;j++){
             if(this.ids[j]==this.tableData[i].id&&(this.tableData[i].award!=0||this.tableData[i].professional!=0)){
                return that.$message({
                  type:'error',
                  message:"您选择的作品中包含已评分不能退回的作品"
                })
             }
           }
        }
        if(that.ids.length==0){
          return that.$message({
            type:'error',
            message:"请先勾选需要退回的作品"
          })
        }
        that.RejectVisible=true;
    },
    //退回作品
    async returnWorks() {
      let that=this;
      if(that.rejectReason=="")
      {
        return that.$message({
          type:'error',
          message:"请先填写退回理由"
        })
      }
      let params = {};
      params.url = api.reject;
      params.ids = that.ids;
      params.rejectReason=that.rejectReason;
      await this.axiosPost(params)
        .then(res => {
          if (res.code == 0) {
            that.RejectVisible=false;
            this.$message({
              type: "success",
              message: "退回成功"
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
    //推荐市级
    async goToRecommmend(){
      this.ids=[]
      this.multipleSelection.forEach(item => {
        this.ids.push(item.id);
      });
      let params = {};
      params.url = api.recommend;
      params.ids = this.ids;
      params.position=1
      params.value=1
      await this.axiosPost(params).then(res=>{
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
      }).catch(err=>err)
    },
    //推荐市级单条
    async goToRecommmendItem(id){
      this.ids=[]
      this.ids.push(id)
      let params = {};
      params.url = api.recommend;
      params.ids = this.ids;
      params.position=1
      params.value=1
      await this.axiosPost(params).then(res=>{
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
      }).catch(err=>err)
    },
    //取消推荐
    async goToDisRecommmendItem(id,award,professional){
      if(award.length!=0||professional.length!=0){
        return   this.$message({
               type: "warning",
               message: "作品已分配专家评分不能取消推荐市级"
             });
        
      }
      this.ids=[]
      this.ids.push(id)
      let params = {};
      params.url = api.recommend;
      params.ids = this.ids;
      params.position=1
      params.value=0
      await this.axiosPost(params).then(res=>{
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
      }).catch(err=>err)
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
      if(this.$store.state.account.nowRole.type!=3){
        params.position=1
      }
      params.url = api.enroll;
      params.expand = "info,works,school,professional,award";
      params.activity_id = this.id;
      await this.axiosGet(params)
        .then(res => {
          this.tableData=[]
          this.tableData = res.items;
          this.tableData.map(res=>{
            // console.log(res);
             res.professionalArr=res.professional.map(res1=>{
                 if(res1.name!=undefined){
                    return res1.name;
                 }else{
                   return [];
                 }
              })
          })
          for(let i=0;i<this.tableData.length;i++){
            let author_=this.tableData[i].info.author.map(item=>{
              return item.name;
            })
            let mentor_=this.tableData[i].info.mentor.map(item=>{
              return item.name;
            })
            this.tableData[i].author_=author_.join("、");
            this.tableData[i].mentor_=mentor_.join("、");
          }


          // this.tableData.forEach(ite => {
          //   var title = "";
          //   var areaName = "";
          //   var author_ = "";
          //   var mentor_ = "";
          //   ite.school.forEach(item => {
          //     title == ""
          //       ? (title = item.title)
          //       : (title = title + "," + item.title);
          //     areaName = item.areaInfo.areaName;
          //   });
          //   ite.works.member.author.forEach(item => {
          //     author_ == ""
          //       ? (author_ = item.name)
          //       : (author_ = author_ + "," + item.name);
          //   });
          //   ite.works.member.mentor.forEach(item => {
          //     mentor_ == ""
          //       ? (mentor_ = item.name)
          //       : (mentor = mentor_ + "," + item.name);
          //   });
          //   ite.mentor_ = mentor_;
          //   ite.author_ = author_;
          //   ite.areaName = areaName;
          //   ite.title_ = title;
          // });
          this.totalCount = res._meta.totalCount;
        })
        .catch(err => err);
    },
    edit(item) {
      this.dialogVisible = item;
      let params = {
        "per-page": this.perPage
      };
      params.page = this.currentPage;
      this.getEnrollList(params);
    },
    Noedit(item) {
      this.dialogVisible = item;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //分配作品
    distributionWorks() {
      this.dialogVisible = !this.dialogVisible;
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
       console.log(row)
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
.buttonenum {
  float: left;
  margin: 20px 0 10px 0;
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 3;
}
.box {
  background: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -250px;
  margin-left: -400px;
  width: 782px;
  min-height: 500px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
}
</style>
