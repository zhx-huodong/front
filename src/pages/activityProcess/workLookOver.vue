<template>
  <div class="activity-look-over">
    <template v-if="workList.length > 0">
      <el-card class="work-list-item" v-for="(item, index) in workList" :key="index">
        <div class="work-list-top">
          <div class="picleft">
              <img :src="item.url" > 
          </div>
          <div class="jianjie">
            <div class="name"><p>{{item.name}}</p></div>
            <div class="activeclass">
              <p >报名时间：{{item.avitveTiem}}</p>
              <p >活动对象：{{item.activeObject[0]}} </p>
              <p >活动组别：{{item.activeGroup[0]}} </p>
              <p >活动范围：{{item.activeLimit[0]}} </p>
              <p >活动类别：{{item.activeClass[0]}} </p>
              <div class="activeclass-bottom">
                <el-button type="text" @click="goToActivity">查看活动详情 》</el-button>
              </div>
            </div>
          </div>
        </div>
        <!--简介-->
        <div class="activity-detail">
            <p class="title">作品详情</p>
            <el-divider></el-divider>
            <div class="activity-detail-item">
                <p>作品名称：</p>
                <span>机器人的形成</span>
            </div>
            <div class="activity-detail-item">
                <p>作品简介：</p>
                <span>
                                出埃及记，说的是希伯来人的苦难历史，之所以用这个题材设计，是想通过他们故事引出我们现在生活的各种感悟。年纪愈大，对社会的感觉愈深。望大家不要忽略文案，动画设计只是表像，内容才是意义所在。与其说是网易游戏，不如说是献给大家，借用里的一个桥段：
第四段背景：摩西带领众人来到红海边，见到大海挡住了去路，在后有追兵前有大海的困境中，向天神祈求。
                            </span>
            </div>
            <div class="activity-detail-file">
                <p>报名登记表：</p>
                <div class="file">
                    <span>报名登记表.DOC</span>
                </div> 
            </div>
            <div class="activity-detail-file">
                <p>作品附件：</p>
                <div class="file">
                    <span>宝安中学报名申请表.doc</span>
                </div> 
            </div>
            <div class="activity-detail-item">
                <p>作者名称： </p>
                <span>张三</span>
            </div>
            <div class="activity-detail-item">
                <p>指导老师：</p>
                <span>陈老师</span>
            </div>
            <div class="activity-detail-item">
                <p>电子邮箱：</p>
                <span>36512366122@163.com</span>
            </div>
        </div>
       
      </el-card>
    </template>
    <div v-else class="no-data">暂无数据</div>
  </div>
</template>
<script>
  export default {
    name: 'activity-look-over',
    data() {
      return {
        // workList: [],
        activityId: '',
        workList:[
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
      };
    },
    props: {
      stage: { type: String }
    },
    mounted() {
      this.activityId = this.$route.query.ActivityId;
    },
    methods: {

      //查看活动详情
      goToActivity(){
        this.$router.push({
          path: '/activityDetail',
        })
      }
      
    }
  };
</script>
<style lang="less" scoped>
  p{
    margin: 0;
    padding: 0;
  }
  .activity-look-over { 
    .work-list-item {
      width:1180px;
      display: inline-block;
      padding: 30px;
      .work-list-top{
        display: flex;
        flex-direction: row;
      }
      .picleft{
          img{
          width:360px; 
          height:270px;
          border-radius:8px;
        }
      }
      .jianjie{
          margin-left: 60px;
          height: 270px;
          .name{
            width:658px;
            background:rgba(244,247,249,1);
            p{
              font-size:24px;
              color:#0386FF;
              padding: 10px;
            }
          }
          .activeclass{
            display:flex;
            flex-direction: column;
            justify-content: start;
            p{
              padding: 5px 10px;
            }
            .activeclass-bottom{
              padding-left: 10px;
              margin-top: 20px;
            }
          }
 
      }
      .activity-detail{ 
        .title{
          font-size:18px;
          color:#333;
          margin: 30px 0 10px;
        }
        .activity-detail-item{
            margin-top:20px;
            font-size:14px;
            color:#333;
            display:flex;
            flex-direction:row;
            justify-content: start;
            p{
                width:80px;
            }
            span{
                width:900px;
            }
        }
        .activity-detail-file{
            margin-top:20px;
            font-size:14px;
            color:#333;
            display:flex;
            flex-direction:column;
            justify-content: start;
            .file{
                background:#F7F8FA;
                color:#198AF3;
                padding:10px;
                width:980px;
                margin-top:20
            }
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
