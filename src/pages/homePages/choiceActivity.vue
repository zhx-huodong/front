<template>
    <div class="choice-activity-container">
        <el-card style="min-height:600px">
            <div class="title">
                <p>{{OneObject.title}}</p>
            </div>
            <el-divider></el-divider>
            <div class="content" v-html="OneObject.content">
                                            
            </div>
            <div class="activity-img">
                <el-image :src="cover" fit="cover"></el-image>
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
import axios from 'axios';
import api from '../../service/api';
    export default {
        data(){
            return {
                cover:sessionStorage.getItem("cover"),
                OneObject:{},
                otherObjectid:"",
                gradeListid:"",
                imgUrl:require('../../public/images/ac1.png')
            };
        },
        created(){
            this.OneObject=JSON.parse(sessionStorage.getItem("OneObject"))
            // console.log( this.$route.query.otherObjectid, this.$route.query.gradeListid)
            // this.$route.query.otherObjectid=this.otherObjectid
            // this.$route.query.gradeListid=this.gradeListid
            // var that=this;
            // setTimeout(function(){
               
            //     that.activityCategory(that.$route.query.otherObjectid);
            // },1000)
            
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
            //读取活动项目详情
            // async activityCategory(id){
            //     let params={}
            //     params.url=api.activityCategory
            //     params.id=id
            //     params.expand="content,formats"
            //     let res = await this.axiosGet(params).catch(err => err);   
            //     console.log(res)
            // }
            
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