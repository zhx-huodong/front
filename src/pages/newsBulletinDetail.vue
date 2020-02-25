<template>
  <div class="news-bulletin-detail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="float:left;margin-left:30px;">发布公告</span>
      </div>
      <div>
        <span class="title">绘画比赛获奖公告</span>
        <br>
        <span class="date">2019.10.30</span>
        <br>
        <p class="data">课堂是学校教育的主阵地，亦是常规管理的生命线。
            因此，在每月督导过程中，都会深入课堂一线，通过观摩听课和交流反馈，
            全面了解学校的课堂常规和师生的成长样态
          </p>
          <br>
          <p class="data">
            从督导情况来看，两所学校都注重夯实教学常规，着力提升课堂实效。尤其在教学常规管理方面，
            广培小学重视课堂常规落实，在学科组、年级组内采取集体备课、集体说课等活动，
            进一步提升课堂教学质量。锦明学校则注重课堂常规建设，近期正在开展小组合作式教学实践，
            不断优化课堂教学模式，激发学生主动学习、探究合作。
          </p>  
      </div>
    </el-card>
  </div>
</template>
<style  lang="less" scoped>
  .news-bulletin-detail{
    width: 1180px;
    margin: auto;
    margin-top: 20px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    min-height: 650px;
  }
  .title{
        font-size:21px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:48px;
  }
  .date{
        text-indent:2em;
        font-size:14px;
        font-family:PingFang;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:48px;
  }
  .data{
        text-indent:2em;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:30px;
  }
</style>