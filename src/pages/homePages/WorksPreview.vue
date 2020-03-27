<template>
  <div class="works-preview">
    <div class="title">
      <el-button type="defualt" size="mini" @click="goback" style="position:absolute;left:0">返回</el-button>
      <p>{{activityDetail.works.title}}</p>
      <span style="position:absolute;right:100px;color:#999999;font-size:12px">作品编号:{{activityDetail.serial_id}}</span>
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="content-main">
          <div class="content-item">
              <div class="sub-title">创作思想</div>
              <div class="content" v-html="activityDetail.works.content.content">
           
              </div>
          </div>
          <div class="content-item">
              <div class="sub-title">创作过程</div>
              <div class="content">
                  {{activityDetail.works.content.production}}
              </div>
          </div>
          <div class="content-item">
              <div class="sub-title">参考资源</div>
              <div class="content">
                  {{activityDetail.works.content.reference}}           
              </div>
          </div>
          <div class="content-item">
              <div class="sub-title">制作用软件及运行环境</div>
              <div class="content">{{activityDetail.works.content.environment}}             
              </div>
          </div>
          <div class="content-item">
              <div class="sub-title">其他说明</div>
              <div class="content">{{activityDetail.works.content.remark}}      
              </div>
          </div>
          
          <div class="content-item"  style="width:50%">
              <div class="sub-title">作品:</div>
              <div class="content" v-for="(item,index) in activityDetail.works.attachment" :key="index">
                  <file-preview :fileObj="item"></file-preview>      
              </div>
          </div>
          <div class="content-item">
              <div class="sub-title">报名登记表:</div>
              <div class="content" >
                  <file-preview :fileObj="{name:'报名登记表',url:activityDetail.registration}"></file-preview>      
              </div>
          </div>
          <el-divider></el-divider>
          <div class="works-detail-main">
              <div class="works-detail-item">
                  活动组别：{{activityDetail.info.activity}}
              </div>
              <div class="works-detail-item">
                  活动项目：{{activityDetail.info.project}}
              </div>
              <div class="works-detail-item">
                  学段：{{periodList[activityDetail.period]}}
              </div>
              <div class="works-detail-item">
                  学校：{{activityDetail.school.title}}
              </div>
              <div class="works-detail-item">
                  作者：{{activityDetail.works.member.author.map(item=>{return item.name+'('+item.mobile+')'}).join('、')}}
              </div>
              <div class="works-detail-item">
                  指导老师：{{activityDetail.works.member.mentor.map(item=>{return item.name+'('+item.mobile+')'}).join('、')}}
              </div>
              <div class="works-detail-item">
                  邮箱：{{activityDetail.works.email}}
              </div>
          </div>

        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from "../../service/api.js";
import { getCookie } from "../../tools/tools";
import FilePreview from "../../components/FilePreview";
export default {
  components: { FilePreview },
  props: {
    id: {
      type: Number,
      default() {
        return 0;
      }
    },
    inscore: {
      type: String,
      default() {
        return "";
      }
    }
  },

  data() {
    return {
        activityDetail:{},//报名详情信息
        periodList: { 1: "幼教组" ,2: "小学组", 4: "初中组", 8: "高中组",  16: "特教组", 32: "中职组", 64: "高教组" }

    };
  },
  mounted() {
      this.$nextTick(()=>{
          this.getActivityDetail()
      })
  },
  methods: {
      //获取报名活动详情
    async getActivityDetail() {
      console.log("进来")
      let params = {};
      params.url = api.enroll;
      params.id = this.id;
      if(this.inscore!=""){
          params.inscore = this.inscore;
      }
      params.expand = "info,works,school,professional,award,process";
      await this.axiosGet(params)
        .then(res => {
          this.activityDetail = res;
          console.log("看看",res)
        })
        .catch(err => err);
    },
    goback(){
       this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.works-preview {
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .content-main{
      .content-item{
          display: flex;
          flex-direction: column;
          margin-bottom: 30px;
          .sub-title{
              font-size: 16px;
              color: #333;
          }
          .content{
              margin-top: 10px;
              font-size: 14px;
              color: #666;
              line-height: 30px;
          }
      }
  }
  .works-detail-main{
      display: flex;
      flex-direction: column;
      
      .works-detail-item{
          font-size: 14px;
          color: #333;
            margin-bottom: 10px;
      }
  }
}
</style>