<template>
    <div class="work-score-container">
        <el-card style="min-height:600px;">
            
            <el-tabs v-model="activeName">
                <el-tab-pane label="查看" name="look">
                    <div style="width:900px">
                        <el-row>
                            <el-form ref="form" :model="form" label-width="100px">
                                <el-form-item label="作品名称：">
                                    <el-col>{{form.activityName}}</el-col>
                                </el-form-item>

                                <el-form-item label="作品简介：">
                                    <!-- <el-col>{{form.introduction}}</el-col> -->
                                    <div class="content" v-html="form.introduction"></div>
                                </el-form-item>

                                <el-form-item label="报名登记表：">
                                    <el-col><a :href="form.regForm"  target="_blank">报名登记表</a></el-col>
                                </el-form-item>

                                <el-form-item label="作品附件：">
                                    <el-col v-for="(item,index) in form.annex" :key="index"><a :href="item.url" target="_blank">附件{{index+1}}</a><span class="remark">备注:{{item.remark}}</span></el-col>
                                </el-form-item>    
                            </el-form>
                        </el-row>
                    </div>
                </el-tab-pane>
            </el-tabs>

            <el-tabs v-model="activeDetail">
                <el-tab-pane label="评分信息" name="detail">
                    <div style="width:900px">
                        <el-row>
                            <el-form ref="form" :model="form2" label-width="100px">
                                <el-form-item label="评分：">
                                    <el-input
                                    onkeyup="value=value.replace(/[^\d]/g,'')"
                                    placeholder="请输入评分"
                                    v-model="form2.scope"
                                    clearable
                                    style="width:300px;"
                                    size="small">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="评语：">
                                    <el-input
                                    type="textarea"
                                    :rows="6"
                                    placeholder="请输入评语"
                                    v-model="form2.introduction">
                                    </el-input>
                                </el-form-item>

                            </el-form>
                        </el-row>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-row>
                <el-col :span="2" :offset="11">
                    <el-button type="primary" @click="goToScope(queryId)">提交评分</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
import api from "../../service/api";
import { axiosGet, getCookie } from "../../tools/tools";
import axios from "axios";
export default {
    data(){
        return{
            activeName:'look',
            activeDetail:'detail',
            form: {
                activityName: '森林精灵',
                introduction:'一般认为，从古埃及、波斯、印度和中国等东方文明古国发展起来的东方绘画，与从古希腊、古罗马发展起来的以欧洲力中心的西方绘画，是世界上的两大绘画体系。这两大绘画体系在历史上互有影响，对人类文明都作出了各自独特的重要贡献。绘画本身的可塑性决定了它具有很大的自由创造度，它既可以表现现实的空间世界，也可以表现超时空的想象世界，画家可以通过绘画来表现对生活和理想的各种独特的情感和理解，团为绘画是可视的静态艺术，可以长期对画中具有美学性的形式和内容进行欣赏、玩味、体验，所以它是人们最容易接受而且最喜爱的一种艺术。',
                regForm:[],
                annex:[]
            },
            form2:{
                scope:'',//评分
                introduction:'',//评语
            },
            apiKey:getCookie("x-api-key"),
            queryId:this.$route.query.id,
        }
    },
    mounted(){

    },
    created(){
        let that=this;
        that.getWorkDetail(that.queryId);
    },
    methods:{
        async getWorkDetail(queryId){
            let that=this;
            let params={};
            params.url=api.enroll;
            params.id=queryId;
            params.inscore=1;
            params.expand="works";
            await this.axiosGet(params).then(res=>{
                that.form.activityName=res.works.title;
                that.form.introduction=res.works.content;
                that.form.annex=res.works.attachment.map(res=>{
                    return{
                        "remark":res.remark,
                        "url":res.url,
                    }
                })
                that.form.regForm=res.registration;
                
            }).catch(err=>{
                if(err.status===404){
                   that.$message({
                        type: 'error',
                        message: '已评完，没有下一份了'
                   });
                   that.queryId=that.queryId-1;
                }
            });

            
        },
        //评分
        goToScope(queryId){
            let that=this;
            let params={};
            // params.url=api.scoring;
            params.ids=new Array();
            params.ids[0]=queryId;
            params.score=Number(that.form2.scope)*10;
            params.comment=that.form2.introduction;
            let params1=new Array();
            params1.push(params);
            // console.log(params1);
            axios.post(api.scoring, 
              params1
            ,{headers: { 'x-api-key': that.apiKey }}).then(res=>{
                // console.log(res);
                if(res.data.code==0){
                    that.open();
                }
            });
        },
        //弹窗提示
        open() {
            let that=this;
            that.$confirm('评分成功', '提示', {
                confirmButtonText: '下一份',
                type: 'warning',
                center: true,
                showCancelButton:false,
            }).then(() => {
                that.queryId=that.queryId+1;
                that.getWorkDetail(that.queryId);

                // this.$message({
                //     type: 'success',
                //      message: '下一份'
                // });
            }).catch((err) => {
                console.log(err)
                // this.$message({
                //     type: 'info',
                //     message: '下一份'
                // });
            });
        }
    }
}
</script>
<style lang="less" scoped>
.work-score-container{
    width:1180px;
    margin:auto;
    margin-top:20px;
}
.remark{
    font-size:14px;
    font-weight:400;
    margin-left:20px;
    color:rgba(153,153,153,1);
}
</style>
