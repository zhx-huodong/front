<template>
  <div class="activity-work-show">
    <template v-if="workList.length > 0">
      <el-card class="work-list-item" v-for="(item, index) in workList" :key="index">
        <div class="picleft">
            <img :src="item.url" >
            
        </div>
        <div class="jianjie">
          <div class="name"><span>{{item.name}}</span></div>
          <div class="activeclass">
            <span >报名时间：{{item.avitveTiem}}</span>
            <br/>
            <span >活动对象：{{item.activeObject[0]}} </span>
            <br/>
            <span >活动组别：{{item.activeGroup[0]}} </span>
            <br/>
            <span >活动范围：{{item.activeLimit[0]}} </span>
            <br/>
            <span >活动类别：{{item.activeClass[0]}} </span>
            <button type="button" class="baomingbutton">我要报名</button>
          </div>
        </div>
        <!--简介-->
        <div class="count">
           
            <span class="title">活动详情</span>
            <hr style="margin-top:45px;width:1092px;height:1px;background:rgba(229,229,229,1);" />
           
            <span class="sontitle">活动前言
            </span>
            <span class="soncount">{{item.activePreface}}</span>
          
          
            <span class="sontitle">参赛地点
            </span>
            <span class="soncount">{{item.activeAddr}}</span>
          
           
            <span class="sontitle">参赛要求
            </span>
            <span class="soncount">{{item.activeRequer}}</span>
             <hr style="margin-buttom:75px;width:1092px;height:1px;background:rgba(229,229,229,1);" />
        </div>
       

      </el-card>
    </template>
    <div v-else class="no-data">暂无数据</div>
  </div>
</template>
<script>
  import ActivityList from '../../components/ActivityList';
  export default {
    name: 'activity-work-show',
    components: { ActivityList },
    data() {
      return {
        workList: [],
        activityId: ''
      };
    },
    props: {
      stage: { type: String }
    },
    mounted() {
      this.activityId = this.$route.query.ActivityId;
      if (this.stage == 'STAGE_WORK_SHOW') this.getAllWorkList();
      else if (this.stage == 'STAGE_EXCELLENT_WORK_SHOW') this.getExcellentWorkList();
    },
    methods: {
      async getAllWorkList() {
        // let res = await this.axiosGet({
        //   url: '/v1/activity/GetWorkList',
        //   ActivityId: this.activityId,
        //   Category: 0
        // }).catch(err => err);
        // if (res.ErrorCode != 'OK') return;
        // let list = res.Data.WorkList || [];
        // this.workList = list.map(item => {
        //   let resourceList = item.ResourceList;
        //   let video = resourceList.find(re => re.ResourceType == 4);
        //   return {
        //     name: item.TeamName,
        //     school: item.School,
        //     url: video.ResourceContent
        //   };
        // });
        this.workList=[
          {url:require('../../assets/img2/1.png'),
          name:'电脑绘图',
          avitveTiem:'2020-01-05 ～ 2020-02-06',
          activeObject:['学生'],
          activeGroup:['小学组','初中组'],
          activeLimit:['宝安区','龙岗区','南山区','福田区'],
          activeClass:['数字创作项目'],
          activePreface:'为提高我市中小学实验教师（实验管理员）的实验操作技能和动手实际能力，激发教师的创新思维和意识，提升实验教学水平，推动实验教学改革和推进素质教育。2019年深圳市物理、化学、生物和小学科学实验教师（实验管理员）实验操作与创新技能竞赛活动。',
          activeAddr:'（一）报名及上传资料：请各参赛教师将创新实验操作视频、PPT及文稿（包括题目、教师姓名、学校名称、使用教材、创新实验器材、创新实验原理、目标、内容、过程等）通过深圳市2019年物理、化学、生物及小学科学实验教师实验操作与创新技能竞赛活动专题http://cxyy.szdj.edu.cn上传； 作品上传时间：2019年10月8号 — 10月18号 （二）初赛：各区（新区、市局直属学校）根据在线报名参赛情况组织初赛，形式不限，并于10月25日前通过平台报送参加名单及作品； （三）市赛：组织全市现场比赛与培训，具体时间、地点另行通知。',
          activeRequer:'（一）常规实验操作技能竞赛。熟练、规范完成一个本学科课程开设的学生分组实验，限时20分钟； （二）创新实验器材开发技能竞赛。现场演示并解说适用于本学科课程自己开发的演示实验、探究实验、课外实验等创新实验器材，并附上文字图片说明，限时20分钟。创新实验器材能够改进原有实验器材的缺陷或不足，有创新点或解决本学科实验教学中遇到的问题； 每位参赛教师必须参加以上两项竞赛（评分细则见附件1）。',
          }
          ]
       
      },
      async getExcellentWorkList() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetExcellentWorkList',
          ActivityId: this.activityId,
          GradeId: 5
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;
        let list = res.Data.WorkList || [];
        this.workList = list.map(item => {
          let resourceList = item.ResourceList;
          let video = resourceList.find(re => re.ResourceType == 4);
          return {
            name: item.TeamName,
            school: item.School,
            url: video.ResourceContent
          };
        });
      }
    }
  };
</script>
<style lang="less">
  .activity-work-show {
    .work-list-item {
      width:1200px;
      height:1030px;
      // width: 325px;
      display: inline-block;
      margin: 0 15px 15px 0;
      text-align: center;
      .picleft{
          position: absolute;
          margin-left: 65px;
          padding-top: 38px;
           img{
            width:360px; 
            height:270px;
            border-radius:8px;
          }
      }
      .jianjie{
          position: absolute;
          margin-left: 492px;
          padding-top: 38px;
          .name{
            width:658px;
            height:49px;
            background:rgba(244,247,249,1);
            
            span{
              float:left;
               margin-left: 27px;
              padding-top: 13px;
              font-size:24px;
              color:#0386FF;
            }
          }
          .activeclass{
            line-height:30px;
              span{
                float:left;              
              }
            .baomingbutton{
              float:left;
              color:#FFFEFE;
              font-size:16px;
              width:163px;
              height:45px;
              background-color:rgba(25,138,243,1);
              margin-top: 55px;
              margin-left: -176px;
            }
          }
         
           
        
          
      }
      .count{
          position: absolute;
          margin-left: 65px;
          padding-top: 394px;
          width:1074px;
          height:619px;
          
        .title{
          float:left;
          width:80px;
          height:17px;
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:43px;
        }
        .sontitle{
          margin-left:33px;
          margin-top:34px;
          float:left;
          width:80px;
          height:17px;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:43px;
          
        }
        .soncount{
            float:left;
            margin-bottom: 12px;
            text-indent:2em;
            margin-top: 25px;
            margin-left: 52px;
            width:963px;
            height:45px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:30px;
          }
        
      }

      .school {
        font-size: 14px;
        color: #999999;
      }
      video {
        width: 100%;
      }
    }
    .no-data {
      text-align: center;
      color: #999999;
    }
  }
</style>
