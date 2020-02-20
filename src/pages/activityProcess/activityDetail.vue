<template>
    <div class="activity-detail">
        <div class="activity-detail-title">
            <p class="title">作品详情</p>
        </div>
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
}
</style>