<template>
  <div class="activity-introduction-container">
    <div class="banner-container">
      <el-image :src="bannerUrl" fit="cover"></el-image>
    </div>
    <div class="sub-nav">
      <div class="sub-nav-main">
        <el-tabs type="border-card">
          <el-tab-pane label="活动介绍">
            <el-card>
              <el-steps :active="process" align-center>
                <el-step title="作品报名" :description="formatDateChar(activityObject.node[0].stime*1000)+'--'+formatDateChar(activityObject.node[0].etime*1000)"></el-step>
                <el-step title="区域推荐" :description="formatDateChar(activityObject.node[1].stime*1000)+'--'+formatDateChar(activityObject.node[1].etime*1000)"></el-step>
                <el-step title="市级审批" :description="formatDateChar(activityObject.node[2].stime*1000)+'--'+formatDateChar(activityObject.node[2].etime*1000)"></el-step>
                <el-step title="作品展示" :description="formatDateChar(activityObject.node[3].stime*1000)+'--'+formatDateChar(activityObject.node[3].etime*1000)"></el-step>
              </el-steps>
            </el-card>
            <el-card style="margin-top:10px;padding-bottom:30px;">
              <div class="title">
                <p>{{activityObject.title}}</p>
              </div>
              <el-divider></el-divider>
              <div class="activity-introduction-main">
                <div class="activity-title">
                  <p>活动介绍：</p>
                </div>
                <div class="activity-int-item">
                  <div class="activity-int-content" v-html="activityObject.detail.content"></div>
                  <!-- <el-image :src="activityObject.cover" fit="cover" style="width:650px;margin-top:20px;"></el-image> -->
                </div>
              </div>
              <div class="activity-annex">
                <p>相关附件：</p>
                <div class="annex">
                  <file-preview :fileList="activityObject.attachment"></file-preview>
                </div>
              </div>
              <el-divider></el-divider>
              <div class="list-item">
                <div class="list-item-title">
                  <p>活动对象：</p>
                </div>
                <div class="list-item-content" v-for="(item,index) in targetList" :key="index" v-if="item.id==activityObject.target">【{{item.name}}】</div>
              </div>
              <div class="list-item">
                <div class="list-item-title">
                  <p>活动范围：</p>
                </div>
                <div class="list-item-content" v-for="(item,index) in activityObject.region" :key="index">【{{item.area_name}}】</div>
              </div>
              <div class="tag">
                <p>请选择以下内容参加活动</p>
              </div>
              <div style="margin-bottom:30px;">
                <type-select :gradeList="activityObject.periodList" @gradeObject="PeriodgradeObject"></type-select>
              </div>
              <div class="tag">
                <p>请选择参加活动项目</p>
              </div>
              <div class="list-item" style="margin-bottom:0;">
                <div class="list-item-title">
                  <p>活动项目：</p>
                </div>
                <div class="list-item-content"></div>
              </div>
              <div v-for="(item,index) in activityObject.category" :key="index">
                <div class="list-project">
                  <div class="list-project-title">
                    <p>{{item.title}}</p>
                  </div>
                  <div class="lable" v-if="activityProjectList.length>0">
                     <div class="lable-aside">
                       <div class="lable-self" v-for="(item1, index1) in item.child" :key="index1"
                       @click="otherObjectOne(item1.id, index1)" :class="{'type-active':activityNameIndex == index1,'not-click':item1.period&PeriodGradeObjectid!=0}">{{item1.name||item1.title}}</div>
                     </div>
                   </div>
                  <!-- <type-select :otherList="item.child"   @otherObject="otherObjectOne"></type-select> -->
                </div>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="通知公告">
            <el-card style="padding-bottom:30px;">
              <div class="title">
                <p>消息公告</p>
              </div>
              <el-divider></el-divider>
              <el-row>
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  border
                  :header-cell-style="{background:'#EEEEEE',color:'#323232'}"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="tableSelectionChange"
                >
                  <el-table-column label="序号" type="index" width="100"></el-table-column>

                  <el-table-column prop="title" label="公告通知名称" show-overflow-tooltip></el-table-column>

                  <el-table-column label="时间">
                    <template slot-scope="scope">{{formatDateChar(scope.row.created_at*1000)}}</template>
                  </el-table-column>

                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button @click="goToLook(scope.row.id)" type="text" size="small">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <el-row class="page-div">
                <el-pagination
                  @size-change="pageSizeChange"
                  @current-change="pageCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[20, 30, 40,50,100]"
                  :page-size="perPage"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalCount"
                ></el-pagination>
              </el-row>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="优秀作品">
            <el-card style="padding-bottom:30px; width:1180px;">
              <el-row>
                <el-col>
                  <type-select
                    :gradeList="gradeListTwo"
                    :activityTypleList="activityTypleList"
                    :activityProjectList="activityProjectList"
                    @gradeObject="gradeObject"
                    @activityTypleObject="activityTypleObject"
                    @activityProjectObject="activityProjectObject"
                  ></type-select>
                </el-col>
              </el-row>
              <div class="workTotle">作品数量:{{workTotle}}个</div>
              <!-- <hr style="color:#E5E5E5"/> -->
              <el-row>
                <el-col>
                  <div class="emptyWork" v-if="activityList.length==0">
                    <img src="../../assets/img2/empty.png">
                    <p>无相关作品</p>
                  </div>
                  <card-list :cardList="activityList" :isExcellent="true" @onlike="onlike" @toNext="gotoGoodWorkDetail"></card-list>
                </el-col>
              </el-row>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import api from "../../service/api";
import FilePreview from "../../components/FilePreview";
import TypeSelect from "../../components/TypeSelect";
import CardList from "../../components/CardList";
import { getTimestamp } from "../../tools/tools";
import { getCookie, axiosGet, axiosPost } from "../../tools/tools";

export default {
  components: { FilePreview, TypeSelect, CardList },
  data() {
    return {
      bannerUrl: '',
      gradeList: [],
      tableData: [],//公告列表
      multipleSelection: [],
      perPage: 20, //每页数据条数
      currentPage: 1, //当前页
      totalCount: 0 ,//总条数
      activityTypleList: [],
      activityProjectList: [],
      activityNameIndex:0,//选择参加活动项目的id
      activityTypleSelectID:'',
      activityProjectSelectID:'',
      gradeListTwo: [ { id: 0, name: '全部' },
                { id: 1, name: '小学组' },
                { id: 2, name: '初中组' },
                { id: 3, name: '高中组' }],
      activityObject: {},
      ClassList: [
        { name: "幼教组", id: 1 },
        { name: "小学组", id: 2 },
        { name: "初中组", id: 4 },
        { name: "高中组", id: 8 },
        { name: "特教组", id: 16 },
        { name: "中职组", id: 32 },
        { name: "高教组", id: 64 }
      ],
      targetList: [
        { name: "老师", id: 1 },
        { name: "学生", id: 2 },
        { name: "家长", id: 4 },
      ],
      activityList: [
        {
          id: 1,
          name: "深圳市中小学电脑制作大赛",
          imgUrl: require("../../public/images/ac1.png")
        },
        {
          id: 2,
          name: "深圳市中小学电脑机器人活动",
          imgUrl: require("../../public/images/ac2.png")
        },
        {
          id: 3,
          name: "深圳市中小学网络夏令营",
          imgUrl: require("../../public/images/ac3.png")
        },
        {
          id: 4,
          name: "深圳市中小学微课大赛",
          imgUrl: require("../../public/images/ac4.png")
        },
        {
          id: 5,
          name: "深圳市中小学说课大赛",
          imgUrl: require("../../public/images/ac5.png")
        },
        {
          id: 6,
          name: "深圳市AI知识大赛",
          imgUrl: require("../../public/images/ac6.png")
        }
      ], // 活动列表
      gradeObjectid: "",
      PeriodGradeObjectid:"",
      id:this.$route.query.id,//获取详情id
      apiKey:getCookie("x-api-key"),
      process:1,//进度
      workTotle:'',//优秀作品数量
    };
  },
  created() {
      let params = {
        "per-page": this.perPage,
        "filter[activity_id]": this.$route.query.id
      };
      params.page = this.currentPage;
      this.getActivityNoticeList(params);
      this.goodWorkList();
      this.getActivityList();

  },
  mounted() {
    this.getActivityInfo();
  },
  methods: {
    //获取所有的活动列表 主要是用做筛选
        async getActivityList(){
            let that=this;
            let params={};
            params.url=api.activity;
            params.expand='category';
            // params.inscore=1;
            await this.axiosGet(params).then(res=>{
                
                that.activityTypleList=res.items.map(item=>{
                    return {
                        "id":item.category[0].id,
                        "name":item.category[0].title,
                    }
                })
                that.activityProjectList=res.items.map(item=>{
                    return {
                        "id":item.category[0].child[0].id,
                        "name":item.category[0].child[0].title,
                    }
                })
            })
            that.activityTypleList.unshift({id:0,name:"全部"});
            that.activityProjectList.unshift({id:0,name:"全部"});
        },
    async goodWorkList(){
        let that=this;
        let params={}
        params.url=api.enroll
        params.activity_id=this.id
        params.position=4;//优秀作品展示
        if(that.gradeObjectid!=''&&that.gradeObjectid!=0){
               params.period=that.gradeObjectid;//按学段筛选 [筛选活动时有效] 按学段筛选：多个学段则相加 
        }
        if(that.activityTypleSelectID!=''&&that.activityTypleSelectID!=0){
           params.category_id=that.activityTypleSelectID;//按分类筛选
        }
        if(that.activityProjectSelectID!=''&&that.activityProjectSelectID!=0){
           params.item_id=that.activityProjectSelectID;//按项目筛选
        }
        params.expand="info,works,school,professional,award"
        await this.axiosGet(params).then(res=>{
          console.log(res);
          if(res.items.length>0){
            that.workTotle=res.items.length;
            that.activityList=res.items.map(item=>{
              let author=[];
              author=item.info.author.map(res=>{
                 return res.name
              })
              return{
                "id": item.works.id,
                "name": item.works.title,
                "cover": item.works.cover,
                "view_counts":item.view_counts,
                "like_counts":item.like_counts,
                "author":author.join(""),
              }
              console.log("item",item.works.id)
            });
          }else{
            that.workTotle=0;
            that.activityList=[];
          }
          
        }).catch(err=>err)
    },
    getSubSet(target,arr){
        var len = arr.length;
        var result = [];
        for(var i=0; i<len; i++){
            var temp =[];
            temp.push(arr[i])
            var num=0
            for(let k in temp){
                num+=temp[k]
            }
            if(num==target){
                result=temp
            }
            for(var j=i+1; j<len; j++){
                temp = temp.concat(arr[j]);
                var numTwo=0
                for(let h in temp){
                    numTwo+=temp[h]
                }
                if(numTwo==target){
                    result=temp
                }
            }
            
        }
        return result;
    },
    //获取活动详情
    async getActivityInfo() {
        console.log(1);
        let params = {};
        params.url = api.activityDetail;
        params.id = this.$route.query.id;
        params.expand ="detail,region,node,attachment,banner,category,categoryDetail,process";
        await this.axiosGet(params).then(res => {
            this.bannerUrl = res.banner[0].url;
            this.activityObject=res
            this.activityObject.period
            this.activityObject.periodList=[]
            
            let arr=[1,2,4,8,16,32,64]
            let result=this.getSubSet(this.activityObject.period,arr)
            for(let i in result){
                for(let j in this.ClassList){
                    if(result[i]==this.ClassList[j].id){
                        this.activityObject.periodList.push(this.ClassList[j])
                    }
                }
            }
            this.PeriodGradeObjectid=this.activityObject.periodList[0].id;
              let nowTime=Date.parse(new Date())
              if((res.node[0].stime*1000)<=nowTime<=(res.node[0].etime*1000)){
                  this.process=1
              }else if((res.node[1].stime*1000)<=nowTime<=(res.node[1].etime*1000)){
                  this.process=2
              }else if((res.node[2].stime*1000)<=nowTime<=(res.node[2].etime*1000)){
                  this.process=3
              }else if((res.node[3].stime*1000)<=nowTime<=(res.node[3].etime*1000)){
                  this.process=4
              }
          //  console.log("学段",this.activityObject.periodList);
        }).catch(err => err);
    },

    //学段筛选
    gradeObject(value) {
      let that=this;
      that.gradeObjectid = value;
      that.goodWorkList();
    },
    //学段筛选出活动项目
    PeriodgradeObject(value){
      let that=this;
      that.PeriodGradeObjectid = value;
    },
    //活动类型
    activityTypleObject(value) {
      let that=this;
      that.activityTypleSelectID=value;
      that.goodWorkList();
    },
    //活动项目
    activityProjectObject(value) {
      let that=this;
      that.activityProjectSelectID=value;
      that.goodWorkList();
    },
    //其他
    otherObjectOne(id, index1) {
      this.activityNameIndex=index1;
      this.$router.push({
        path: "/home/choiceActivity",
        query: {
          gradeListid: this.PeriodGradeObjectid,
          id:id,
          coverUrl:this.activityObject.cover,
          activityName:this.activityObject.title
        }
      });
    },
    //表格选择
    tableSelectionChange() {},
    //点赞
    async onlike(id) {
        let that=this;
        let params={};
        //  console.log(that.apiKey);
        params.id=id;
        axios.get(api.like, 
         {params:params,
         headers: { 'x-api-key': that.apiKey }}
        ).then(res=>{
            if(res.data.code==0){
              
              for(let i=0;i<that.activityList.length;i++){
                if(that.activityList[i].id==id){
                  that.activityList[i].like_counts++;
                }
              }
              console.log(that.activityList);
            }else{
              that.$message.error('点赞失败');
            }
         });
    },
    gotoGoodWorkDetail(id){
        let that=this;
        that.$router.push({path:"/goodWorks",query:{id:id}});
    },
    //查看
    goToLook(id) {
      this.$router.push({
        path: "/home/seeInformation",
        query:{
          id:id
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
    //每页数量改变
    pageSizeChange(val) {
      this.perPage = val;
      let params = {
        "per-page": this.perPage,
        "filter[activity_id]": this.$route.query.id
      };
      params.page = this.currentPage;
      this.getActivityNoticeList(params);
    },
    //页码改变
    pageCurrentChange(val) {
      this.perPage = val;
      let params = {
        "per-page": this.perPage,
        "filter[activity_id]": this.$route.query.id
      };
      params.page = this.currentPage;
      this.getActivityNoticeList(params);
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
    }
  }
};
</script>
<style lang="less">
.banner-container {
  height: 600px;
  .el-image {
    height: 600px;
    width: 100%;
  }
}
.sub-nav-main {
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: #fff !important;
    background-color: #198af3 !important;
  }
}
</style>
<style lang="less" scoped>
.activity-introduction-container {
  width: 100%;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 50px;
  .sub-nav {
    .sub-nav-main {
      width: 1220px;
      margin: auto;
      .el-tabs--border-card {
        border: none;
        box-shadow: none;
        -webkit-box-shadow: none;
      }
      .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        color: #fff !important;
        background-color: #198af3 !important;
      }
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        p {
          color: #333333;
          font-size: 18px;
        }
      }
      .workTotle{
         text-align: right;
         font-size:14px;
         color:rgba(153,153,153,1);
         border-bottom:1px solid rgba(229,229,229,1);
         padding-bottom:10px;
      }
      .emptyWork{
        text-align: center;
        margin-top:40px;
        p{
          color:#BFBFBF;
          
          font-size:14px;
        }
      }
    }
  }
  .activity-introduction-main {
    .activity-title {
      font-size: 18px;
      color: #333;
    }
    .activity-int-item {
      margin: 0 30px;
      margin-top: 30px;
      .sub-title {
        p {
          font-size: 16px;
          color: #333;
        }
      }
      .activity-int-content {
        p {
          margin-top: 10px;
          line-height: 30px;
          text-indent: 2em;
          font-size: 14px;
        }
      }
    }
  }
  .activity-annex {
    display: flex;
    flex-direction: row;
    // align-items: center;
    margin-top: 30px;
    p {
      font-size: 16px;
      color: #333;
    }
    .annex {
      margin-left: 20px;
      width: 50%;
    }
  }
  .list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    margin-bottom: 20px;
    .list-item-content {
      margin-left: 20px;
    }
  }
  .tag {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
  .list-project {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    .lable-aside{
    margin-left: 90px;
    
      .type-active{
        background-color: #2D97F0;
      }
      .not-click{
        pointer-events: none;
        background-color: #BFBFBF;
      }
    .lable-self{
      padding:0 10px;
      width:auto !important;
      margin-top: 5px;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      font-size: 14px;
      text-align: center;
      color: #888888;
      border-radius: 4px;
      margin-right: 10px;
      &:hover {
        cursor: pointer;
      }
      
    }
  }
    .list-project-title {
      margin-left: 90px;
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
  .page-div {
    display: flex;
    justify-content: center;
  }
}
</style>