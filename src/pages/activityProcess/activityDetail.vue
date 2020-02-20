<template>
    <div class="activity-container">
        <div class="activity-detail">
            <div class="activity-detail-title">
                <p class="title">活动详情</p>
            </div>
            <el-divider></el-divider>
            <div class="activity-detail-item">
                <p>活动前言</p>
                <span>为提高我市中小学实验教师（实验管理员）的实验操作技能和动手实际能力，激发教师的创新思维和意识，提升实验教学水平，推动实验教学改革和推进素质教育。2019年深圳市物理、化学、生物和小学科学实验教师（实验管理员）实验操作与创新技能竞赛活动。</span>
            </div>
            <div class="activity-detail-item">
                <p>参赛地点</p>
                <span>（一）报名及上传资料：请各参赛教师将创新实验操作视频、PPT及文稿（包括题目、教师姓名、学校名称、使用教材、创新实验器材、创新实验原理、目标、内容、过程等）通过深圳市2019年物理、化学、生物及小学科学实验教师实验操作与创新技能竞赛活动专题http://cxyy.szdj.edu.cn上传；
作品上传时间：2019年10月8号 — 10月18号</span>
                <span>（二）初赛：各区（新区、市局直属学校）根据在线报名参赛情况组织初赛，形式不限，并于10月25日前通过平台报送参加名单及作品；</span>
                <span>（三）市赛：组织全市现场比赛与培训，具体时间、地点另行通知。</span>
            </div>
        
            <div class="activity-detail-item">
                <p>参赛要求 </p>
                <span>（一）常规实验操作技能竞赛。熟练、规范完成一个本学科课程开设的学生分组实验，限时20分钟；</span>
                <span>（二）创新实验器材开发技能竞赛。现场演示并解说适用于本学科课程自己开发的演示实验、探究实验、课外实验等创新实验器材，并附上文字图片说明，限时20分钟。创新实验器材能够改进原有实验器材的缺陷或不足，有创新点或解决本学科实验教学中遇到的问题；
每位参赛教师必须参加以上两项竞赛（评分细则见附件1）。</span>
            </div>
            
            <el-divider></el-divider>
            <div class="activity-detail-file">
                <p>相关附件:</p>
                <div class="detail-file">
                    <span>宝安中学报名申请表.doc</span>
                </div> 
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
.activity-container{
    width: 1180px;
    margin: auto;
    display: inline-block;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius:8px;
    margin-top:30px;
    .activity-detail{ 
        .activity-detail-title{
            padding-left:40px;
            .title{
                font-size:18px;
                color:#333;
            }
        }
        .activity-detail-item{
            padding-left:60px;
            margin-top:20px;
            font-size:14px;
            color:#333;
            display:flex;
            flex-direction:column;
            justify-content: start;
            p{
                width:80px;
            }
            span{
                width:900px;
                margin-left:20px;
                text-indent:2em;
            }
        }
        .activity-detail-file{
            display:flex;
            flex-direction:row;
            padding-left:60px;
            padding-bottom:30px;
            align-items:center;
            .detail-file{
                color:#3EAEFC;
                margin-left:30px;
            }
        }
    }
}

</style>