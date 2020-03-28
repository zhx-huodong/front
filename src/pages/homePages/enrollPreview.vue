<template>
  <div class="enroll-preview-container">
    <el-card style="min-height:600px">
      <div class="works-preview">
        <div class="title">
          <p>{{detailObj.title}}</p>
   
        </div>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="20" :offset="2">
            <div class="content-main">
              <div class="content-item">
                <div class="sub-title">创作思想</div>
                <div class="content" v-html="detailObj.content"></div>
              </div>
              <div class="content-item">
                <div class="sub-title">创作过程</div>
                <div class="content">{{detailObj.production}}</div>
              </div>
              <div class="content-item">
                <div class="sub-title">参考资源</div>
                <div class="content">{{detailObj.reference}}</div>
              </div>
              <div class="content-item">
                <div class="sub-title">制作用软件及运行环境</div>
                <div class="content">{{detailObj.environment}}</div>
              </div>
              <div class="content-item">
                <div class="sub-title">其他说明</div>
                <div class="content">{{detailObj.remark}}</div>
              </div>

              <div class="content-item" style="width:50%">
                <div class="sub-title">作品:</div>
                <div
                  class="content"
                  v-for="(item,index) in detailObj.attachment"
                  :key="index"
                >
                <template v-for="subItm in detailObj.attachment[index]">
                  <file-preview :fileObj="subItm"></file-preview>
                </template>
                </div>
              </div>
              <div class="content-item">
                <div class="sub-title">报名登记表:</div>
                <div class="content">
                  <file-preview :fileObj="{name:'报名登记表',url:detailObj.registration}"></file-preview>
                </div>
              </div>
              <el-divider></el-divider>
              <div class="works-detail-main">
                <div class="works-detail-item">活动组别：{{activityName}}</div>
                <div class="works-detail-item">活动项目：{{activityProject}}</div>
                <div class="works-detail-item">学段：{{periodList[detailObj.period]}}</div>
                <div class="works-detail-item">学校：{{school}}</div>
                <div
                  class="works-detail-item"
                  v-if="detailObj.author!=undefined"
                >作者：{{detailObj.author.map(item=>{return item.name+'('+item.mobile+')'}).join('、')}}</div>
                <div
                  class="works-detail-item"
                  v-if="detailObj.mentor!=undefined"
                >指导老师：{{detailObj.mentor.map(item=>{return item.name+'('+item.mobile+')'}).join('、')}}</div>
                <div class="works-detail-item" >邮箱：{{detailObj.email}}</div>
              </div>
            </div>
             <el-row>
                <el-col :span="4" :offset="10" style="margin-top:30px;"> 
                <el-button type="primary" @click="submitEnroll()" size="small">确认报名</el-button>
                <el-button @click="goBack()" size="small">返回</el-button>  
                </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

    </el-card>
  </div>
</template>
<script>
import WorksPreview from "./WorksPreview";
import FilePreview from "../../components/FilePreview";
export default {
  components: { WorksPreview ,FilePreview},
  data() {
    return {
      detailObj: JSON.parse(this.$route.query.detailObj),
      activityName:this.$route.query.activityName,
      activityProject:this.$route.query.activityProject,
      school:this.$route.query.school,
      periodList: {
        1: "幼教组",
        2: "小学组",
        4: "初中组",
        8: "高中组",
        16: "特教组",
        32: "中职组",
        64: "高教组"
      },
    };
  },
  mounted() {
      console.log("this.detailObj===",this.detailObj)
      for(var index in this.detailObj.attachment){
          console.log("this.obj",this.detailObj.attachment[index])
      }
  },
  methods: {
    //返回
    goBack() {
      this.$router.go(-1);
    },
    //确认报名
    async submitEnroll(){
        let params=this.detailObj
        await axiosPost(params)
          .then(res => {
            if (res.code == -1) {
              this.$message({
                message: res.message,
                type: "warning"
              });
            } else if (res.title != undefined && res.title != "") {
              this.$message({
                message: "报名成功！！",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/home/submitEnroll"
                });
                
              }, 1000);
            } else {
              that.$router.go(-1);
            }
          })
          .catch(err => err);
    }
  }
};
</script>
<style lang="less" scoped>
.enroll-preview-container {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
}
.works-preview {
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .content-main {
    .content-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .sub-title {
        font-size: 16px;
        color: #333;
      }
      .content {
        margin-top: 10px;
        font-size: 14px;
        color: #666;
        line-height: 30px;
      }
    }
  }
  .works-detail-main {
    display: flex;
    flex-direction: column;

    .works-detail-item {
      font-size: 14px;
      color: #333;
      margin-bottom: 10px;
    }
  }
}
</style>