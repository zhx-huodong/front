<template>
    <div class="activity-introduction-container">
        <div class="banner-container">
            <el-image :src="bannerUrl" fit="cover"></el-image>
        </div>
        <div class="sub-nav">
            <div class="sub-nav-main">
                <el-tabs type="border-card">
                    <el-tab-pane label="活动介绍">
                        <el-card>
                            <el-steps :active="2" align-center>
                                <el-step title="作品报名" description="2020-01-05 ～ 2020-02-06"></el-step>
                                <el-step title="区域推荐" description="2020-01-05 ～ 2020-02-06"></el-step>
                                <el-step title="市级审批" description="2020-01-05 ～ 2020-02-06"></el-step>
                                <el-step title="作品展示" description="2020-01-05 ～ 2020-02-06"></el-step>
                            </el-steps>
                        </el-card>
                        <el-card style="margin-top:10px;">
                            <div class="title">
                                <p>深圳市电脑制作大赛</p>
                            </div>
                            <el-divider></el-divider>
                            <el-row>
                                <el-col>活动介绍：</el-col>
                                <el-col :offset="1">
                                    一、活动背景
                                </el-col>
                                <el-col :offset="1">
                                    一、活动背景
                                </el-col>
                            </el-row>
                        </el-card>

                        
                    </el-tab-pane>
                    <el-tab-pane label="通知公告">

                    </el-tab-pane>
                    <el-tab-pane label="优秀作品">
                        
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                bannerUrl:require('../../public/images/banner.png')
            }
        },
        mounted(){

        },
        methods:{

        },
    }
</script>
<style lang="less">
    .banner-container{
        height:600px;
        .el-image{
            height:600px;
            width:100%;
        }
    }
    .sub-nav-main{
        .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
            color:#fff !important;
            background-color:#198AF3 !important;
        }
    }
</style>
<style lang="less" scoped>
    .activity-introduction-container{
        width:100%;
        margin:auto;
        margin-top:0px;
        margin-bottom:50px;
        .sub-nav{
            .sub-nav-main{
                width:1180px;
                margin:auto;
                .el-tabs--border-card{
                    border:none;
                    box-shadow:none;
                    -webkit-box-shadow:none;
                }
                .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
                    color:#fff !important;
                    background-color:#198AF3 !important;
                }
                .title{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    text-align:center;
                    p{
                        color:#333333;
                        font-size:18px;
                    }
                }
            }
        }
    }
</style>