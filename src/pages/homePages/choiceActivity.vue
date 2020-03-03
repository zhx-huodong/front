<template>
    <div class="choice-activity-container">
        <el-card style="min-height:600px">
            <div class="title">
                <p>电脑绘画</p>
            </div>
            <el-divider></el-divider>
            <div class="content">
                <p>本年度主题为：小康·中国梦。
                运用各类绘画软件制作完成的作品。可以是主题性单幅画或表达
                同一主题的组画、连环画（建议不超过五幅）。创作的视觉形象可以
                是二维的或三维的，可以选择写实、变形或抽象的表达方式。
                作品格式为 JPG、BMP 等常用格式，大小建议不超过 20MB。</p>
                <p>注意：单纯的数字摄影画面不属于此项目范围。</p>                                
            </div>
            <div class="activity-img">
                <el-image :src="imgUrl" fit="cover"></el-image>
            </div>
            <el-row>
                <el-col :span="3" :offset="5">
                    <el-button type="primary" size="small" @click="goToActivityEnroll">我要报名</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                imgUrl:require('../../public/images/ac1.png')
            };
        },
        mounted(){

        },
        methods:{
            //报名
            goToActivityEnroll(){
                this.$router.push({
                    path:'/home/activityEnroll'
                })
            },
            
        }
    }
</script>
<style lang="less" scoped>
.choice-activity-container{
    width:1180px;
    margin:auto;
    margin-top:20px;
    margin-bottom:20px;
    .title{
        display:flex;
        align-items:center;
        justify-content:center;
        p{
            font-size:16px;
            color:#333;
        }
    }
    .content{
        width:600px;
        p{
            line-height:30px;
            font-size:14px;
        }
    }
    .activity-img{
        width:800px;
        margin-top:10px;
        margin-bottom:50px;
        .el-image{
            width:600px;
            height:360px;
        }
    }
}
</style>