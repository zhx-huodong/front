<template>
    <div class="activity-container">
        <el-card>
            <div class="title">
                <p>电脑绘画</p>
            </div>
            <el-divider></el-divider>
            <el-steps :active="2" align-center>
                <el-step title="作品报名" description="2020-01-05 ～ 2020-02-06"></el-step>
                <el-step title="专家评审" description="2020-01-05 ～ 2020-02-06"></el-step>
                <el-step title="市级评奖" description="2020-01-05 ～ 2020-02-06"></el-step>
                <el-step title="查看结果" description="2020-01-05 ～ 2020-02-06"></el-step>
            </el-steps>  
        </el-card>
        <el-card style="margin-top:10px;">
            <div class="title">
                <p>山海经之大禹娶妻</p>
                <div class="act-button">
                    <el-button type="primary" plain size="small" @click="goToEdit">修改</el-button>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="content-main">
                <p>大禹治水的故事想必是中华名族流传已久的经典之一 ，他身为一个治水英雄他心怀天下，
曾三过家门而不入，而他的故事背后时常被我们忽略的一个同样伟大的人，是他的妻子 ，
她为他生下儿子，养育成人，一生守候，不仅没有半分怨言，还让儿子长大后和大禹一起去治水，
她不像大禹那样被世人赞美传颂，很少人知道她的名字，可谓正的伟大，而相传她也并不是一般女子，
而是九尾狐仙，涂山氏女娇，我们一听到狐狸，总会联想起蛊惑人心的妖精，或者助纣为虐的妖后妲己，
但很少人知道，山海经中的九尾曾是瑞兽，有吉祥美满的寓意，大禹治水三十未能成家，在涂山遇到了九尾的暗示
歌道：“绥绥白狐，九尾痝痝。我家嘉夷，来宾为王。”后娶其为妻</p>
                <p>作品描绘的正是大禹在治水的路上路经涂山，遇到九尾歌唱给予暗示的场景，
他随着歌声寻觅此,隔岸对歌回应着，生而为人自然有七情六欲，只是身怀大业，
婚后第四日遍离家治水了，但他们的相遇相识也如一般男女那样美好难忘吧。</p>
                <p>希望今后提到九尾，不再只是封印在鸣人体内的神兽，不再是祸国殃民的的妖后，
而也是我们山海经里的瑞兽，是狐仙，最后 ，万物皆有灵，愿我们善待每一种生物，尊重每一种文化。</p>
                <el-image :src="imgUrl" fit="contain"></el-image>
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="活动组别：">
                        计算机创作
                    </el-form-item>
                    <el-form-item label="活动项目：">
                        电脑绘画
                    </el-form-item>
                    <el-form-item label="作者：">
                        张珊，李思
                    </el-form-item>
                    <el-form-item label="指导老师：">
                        陈老师
                    </el-form-item>
                    <el-form-item label="作者邮箱：">
                       2062531131@qq.com 
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                imgUrl:require('../../public/images/ac1.png'),
                form:{}
            }
        },
        mounted(){

        },
        methods:{
            //修改
            goToEdit(){
                this.$router.push({
                    path:'/home/activityEnroll'
                })
            },
        }
    }
</script>
<style lang="less" scoped>
.activity-container{
    width:1180px;
    margin:auto;
    margin-top:20px;
    .title{
        display:flex;
        justify-content:center;
        position:relative;
        .act-button{
            position:absolute;
            right:0px;
        }
    }
    .content-main{
        width:800px;
        margin:auto;
        p{
            margin-top:30px;
            font-size:14px;
            line-height:30px;
            text-indent:2em;
        }
        .el-image{
            margin-top:30px;
            // width:800px;
            // height:400px;
        }
    }
}
</style>