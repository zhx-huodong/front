<template>
    <div class="work-score-container">
        <el-card style="min-height:600px;">
                  <!-- <div slot="header" class="clearfix">
                      <el-button type="defualt" size="mini" @click="goback">返回</el-button>
                      <span style="margin-left:42%;">测试</span>
                      <span style="float:right;color:#999999">作品编号:{{workDetail.serial_id}}</span>
                    </div> -->
                     <works-preview :id="queryId" inscore="1"></works-preview>

                     <!-- <div class="workContainer">
                       <div v-html="workDetail.works.content" class="content"></div>
                       <div class="workDetail">
                         <p>活动组别:{{workDetail.info.category}}</p>
                         <p>活动项目:{{workDetail.info.project}}</p>
                         <p>作者:{{author.join("、")}}</p>
                         <p>作者邮箱:{{workDetail.works.email}}</p>
                         <p>指导老师:{{teacher.join("、")}}</p>
                         <p>作品封面:</p>
                         <div><img :src="workDetail.works.cover" /></div>
                         <p>报名登记表:</p>
                         <div><img :src="workDetail.registration" /></div>
                         <p v-show="attachment.length!=0">
                           作品附件:
                           <a
                             target="_blank"
                             v-for="(item,index) in attachment[0]"
                             :key="index"
                             :href="item.url"
                           >{{item.title}}</a>
                         </p>
                       </div>
                    
                     </div> -->
            <el-tabs v-model="activeDetail">
                <el-tab-pane label="评分信息" name="detail">
                    <div style="width:900px">
                        <el-row>
                            <el-form ref="form" :model="form2" label-width="100px">
                                <el-form-item label="评分：">
                                    <el-input
                                    onkeyup="value=value.replace(/[^\d]/g,'')"
                                    placeholder="请输入评分"
                                    v-model="form2.score"
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
                    <el-button type="primary" @click="goToScore(queryId)">提交评分</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <span>当前已评完，继续评分?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="$router.go(-1)">取 消</el-button>
              <el-button type="primary" @click="open">下一份</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import api from "../../service/api";
import { axiosGet, getCookie } from "../../tools/tools";
import WorksPreview from '../homePages/WorksPreview'
import axios from "axios";
export default {
    data(){
        return{
            activeName:'look',
            activeDetail:'detail',
            author: [],
            teacher: [],
            attachment: [],
            workDetail: {},
            form2:{
                score:Number(this.$route.query.score),//评分
                introduction:this.$route.query.comment,//评语
            },
            apiKey:getCookie("x-api-key"),
            queryId:Number(this.$route.query.id),
            dialogVisible:false,
        }
    },
    components:{WorksPreview},
    mounted(){

    },
    created(){
        let that=this;
        // that.getWorkDetail(that.queryId);
    },
    methods:{
        async getWorkDetail(queryId){
            let that=this;
            let params={};
            params.url=api.enroll;
            params.id=queryId;
            params.inscore=1;
            params.expand="works,info";
            await this.axiosGet(params).then(res=>{
                that.workDetail = res;
                that.author = res.info.author.map(res => {
                  return res.name;
                });
                that.teacher = res.info.mentor.map(res => {
                  return res.name;
                });
                if (res.works.attachment.length != 0) {
                  that.attachment.push(
                    res.attachment.map(res => {
                      return {
                        title: res.title,
                        url: res.url
                      };
                    })
                  );
                }

                // that.form.activityName=res.works.title;
                // that.form.introduction=res.works.content;
                // that.form.annex=res.works.attachment.map(res=>{
                //     return{
                //         "remark":res.remark,
                //         "url":res.url,
                //         "title":res.title,
                //     }
                // })
                // that.form.regForm=res.registration;
                that.dialogVisible=false;
            }).catch(err=>{
                if(err.status===404){
                   that.$message({
                        type: 'error',
                        message: '已评完，没有下一份了'
                   });
                   that.queryId=that.queryId-1;
                   that.dialogVisible=false;
                }
            });

            
        },
        //评分
        goToScore(queryId){
            let that=this;
            let params={};
            // params.url=api.scoring;
            params.ids=new Array();
            params.ids[0]=queryId;
            params.score=Number(that.form2.score)*10;
            params.comment=that.form2.introduction;
            let params1=new Array();
            params1.push(params);
            // console.log(params1);
            axios.post(api.scoring, 
              params1
            ,{headers: { 'x-api-key': that.apiKey }}).then(res=>{
                console.log(res.data,res.data.code);
                if(res.data.code==-1){
                    that.$message({
                        type: 'error',
                        message: res.data.message,
                   });
                }
                else if(res.data.code==0){
                    that.dialogVisible=true;
                }
            });
        },
        //评论下一份
        open() {
            let that=this;
            // that.$confirm('评分成功', '提示', {
            //     confirmButtonText: '下一份',
            //     type: 'warning',
            //     center: true,
            //     showCancelButton:false,
            // }).then(() => {
            that.queryId=that.queryId-1;
            that.getWorkDetail(that.queryId);

                // this.$message({
                //     type: 'success',
                //      message: '下一份'
                // });
            // }).catch((err) => {
            //     console.log(err)
                // this.$message({
                //     type: 'info',
                //     message: '下一份'
                // });
            //});
        },
        goback(){
            this.$router.push({path:'/workReview'})
        }
    }
}
</script>
<style lang="less" scoped>
.work-score-container{
    width:1180px;
    margin:auto;
    margin-top:20px;
    .workContainer{
         margin: 20px 30px;
    .workDetail {
        margin: 20px 0;
        text-align: left;
        color: #333333;
        font-size: 14px;
        img{
            width:30%;
            height:200px;
        }
        p {
          line-height: 30px;
        a {
          cursor: pointer;
        }
    }
  }
}
}
.remark{
    font-size:14px;
    font-weight:400;
    margin-left:20px;
    color:rgba(153,153,153,1);
}
</style>
