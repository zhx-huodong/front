<template>
    <div class="activity-container">
        <el-card>
            <div class="title">
                <p>{{activityDetail.info.activity}}</p>
            </div>
            <el-divider></el-divider>
            <el-steps :active="activityDetail.period" align-center>
                <el-step title="作品报名" :description="formatDateChar(activityDetail.info.nodes[0].stime*1000)+'--'+formatDateChar(activityDetail.info.nodes[0].etime*1000)"></el-step>
                <el-step title="专家评审" :description="formatDateChar(activityDetail.info.nodes[1].stime*1000)+'--'+formatDateChar(activityDetail.info.nodes[1].etime*1000)"></el-step>
                <el-step title="市级评奖" :description="formatDateChar(activityDetail.info.nodes[2].stime*1000)+'--'+formatDateChar(activityDetail.info.nodes[2].etime*1000)"></el-step>
                <el-step title="查看结果" :description="formatDateChar(activityDetail.info.nodes[3].stime*1000)+'--'+formatDateChar(activityDetail.info.nodes[2].etime*1000)"></el-step>
            </el-steps>  
        </el-card>
        <el-card style="margin-top:10px;">
            <div class="title">
                <p>{{activityDetail.works.title}}</p>
                <div class="act-button">
                    <!-- v-show="activityDetail.period<=1" -->
                    <el-button type="primary"  plain size="small" @click="goToEdit">修改</el-button>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="content-main">
                <div  v-html="activityDetail.works.content"></div>
                <!-- <el-image :src="activityDetail.works.cover" fit="contain"></el-image> -->
                <el-form ref="form" :model="form" label-width="90px" style="margin-top:50px;">
                    <el-form-item label="活动组别：">
                        {{activityDetail.info.category}}
                    </el-form-item>
                    <el-form-item label="活动项目：">
                        {{activityDetail.info.project}}
                    </el-form-item>
                    <el-form-item label="作者：">
                        <template v-for="item in activityDetail.works.member.author">{{item.name}}、</template>
                    </el-form-item>
                    <el-form-item label="指导老师：">
                        <template v-for="item in activityDetail.works.member.mentor">{{item.name}}、</template>
                    </el-form-item>
                    <el-form-item label="作者邮箱：">
                       {{activityDetail.works.email}}
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
    import api from "../../service/api.js";
    export default{
        data(){
            return {
                imgUrl:require('../../public/images/ac1.png'),
                form:{},
                id:this.$route.query.id,//获取详情id
                activityDetail:{},//活动详情
            }
        },
        mounted(){
            this.getActivityDetail()
        },
        methods:{
            //获取报名活动详情
            async getActivityDetail(){
                let params={}
                params.url=api.enroll
                params.id=this.id
                params.expand="info,works,school,professional,award"
                await this.axiosGet(params).then(res=>{
                    this.activityDetail=res
                }).catch(err=>err)
            },
            //修改
            goToEdit(){
                let that=this;
                this.$router.push({
                    path:'/home/activityEnroll',
                    query:{id:that.id,activityName:that.activityDetail.info.category}
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