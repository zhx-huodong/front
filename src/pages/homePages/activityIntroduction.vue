<template>
    <div class="activity-introduction-container">
        <div class="banner-container">
            <el-image :src="bannerUrl" fit="cover"></el-image>
        </div>
        <div class="sub-nav">
            <div class="sub-nav-main">
                <el-tabs type="border-card">
                    <el-tab-pane label="活动介绍">
                        <el-card >
                            <el-steps :active="object_.process_" align-center>
                                <el-step title="作品报名" :description="object_.processTime[0]"></el-step>
                                <el-step title="区域推荐" :description="object_.processTime[1]"></el-step>
                                <el-step title="市级审批" :description="object_.processTime[2]"></el-step>
                                <el-step title="作品展示" :description="object_.processTime[3]"></el-step>
                            </el-steps>
                        </el-card>
                        <el-card style="margin-top:10px;padding-bottom:30px;">
                            <div class="title">
                                <p>{{object_.title}}</p>
                            </div>
                            <el-divider></el-divider>
                            <div class="activity-introduction-main">
                                <div class="activity-title">
                                    <p>活动介绍：</p>
                                </div>
                                <div class="activity-int-item">
                                    <!-- <div class="sub-title">
                                        <p>一、活动背景</p>
                                    </div> -->
                                    <div class="activity-int-content">
                                        <p>
                                            {{object_.detail.content}}
                                            <!-- 自 2000 年起，全国中小学电脑制作活动（学生信息素养提升实践活动，以下简称“电脑制作活动”）始终坚持以“实践、探索、创新”为主题、以形式多样的活动项目为载体，为基础教育领域培养信息技术人才起到了重要的推动作用。《教育信息化 2.0 行动计划》明确提出要从提升师生信息技术应用能力向全面提升其信息素养转变、从融合应用向创新发展转变。在这样的历史机遇下，电脑制作活动也在努力寻求新发展。根据教育部对评审评比评估和竞赛的管理要求，不再举办全国性评比和竞赛，全国活动以交流展示的形式开展，旨在通过充分的互动分享，促进各地师生信息技术水平的提升；提供丰富的现场实践，培养学生创造思维和动手能力；给予优质的展示平台，锻炼学生的表达能力和协作意识，全方位助力师生的信息素养提升，更好地培养具有创新精神和实践能力的高端人才。各地基于本项活动组织开展省内活动，组织方式自定。 -->
                                        </p>
                                    </div>
                                </div>
                                <!-- <div class="activity-int-item">
                                    <div class="sub-title">
                                        <p>二、人员范围</p>
                                    </div>
                                    <div class="activity-int-content">
                                        <p>
                                            全国小学、初中、高中（含中职）在校学生。
                                        </p>
                                    </div>
                                </div>
                                <div class="activity-int-item">
                                    <div class="sub-title">
                                        <p>三、活动内容</p>
                                    </div>
                                    <div class="activity-int-content">
                                        <p>
                                            数字创作、程序设计、创客、人工智能、机器人五个项目。
                                        </p>
                                    </div>
                                </div>
                                <div class="activity-int-item">
                                    <div class="sub-title">
                                        <p>四、数字创作项目设置及有关要求</p>
                                    </div>
                                    <div class="activity-int-content">
                                        <p>
                                            数字创作项目是使用计算机，设计、制作完成数字化创意作品。
                                        </p>
                                    </div>
                                </div> -->
                            </div>
                            <div class="activity-annex">
                                <p>相关附件：</p>
                                <div class="annex">
                                    <file-preview :attachment="object_.attachment"></file-preview>
                                </div>
                            </div>
                            <el-divider></el-divider>
                            <div class="list-item">
                                <div class="list-item-title">
                                    <p>活动对象：</p>
                                </div>
                                <div class="list-item-content">
                                    {{object_.targetList}}
                                </div>
                            </div>
                            <div class="list-item">
                                <div class="list-item-title">
                                    <p>活动范围：</p>
                                </div>
                                <div class="list-item-content">
                                    {{object_.regionList}}
                                </div>
                            </div>
                            <div class="tag">
                                <p>请选择以下内容参加活动</p>
                            </div>
                            <div style="margin-bottom:30px;">
                                <type-select :gradeList="object_.periodList" @gradeObject='gradeObject'></type-select>
                            </div>
                            <div class="tag">
                                <p>请选择以下内容参加活动</p>
                            </div>
                            <div class="list-item" style="margin-bottom:0;">
                                <div class="list-item-title">
                                    <p>活动项目：</p>
                                </div>
                                <div class="list-item-content">
                                
                                </div>
                            </div>
                            <div v-for="(item,index) in object_.categoryDetail" :key="index">
                                <div class="list-project">
                                <div class="list-project-title">
                                    <p>{{item.title}}</p>
                                </div>
                                <type-select :otherList="item.child"  @otherObject='otherObjectOne'></type-select>
                                </div>
                            </div>
                            
                            <!-- <div class="list-project">
                                <div class="list-project-title">
                                    <p>程序设计</p>
                                </div>
                                <type-select :otherList="otherListTwo"  @otherObject='otherObjectTwo'></type-select>
                            </div> -->
                        </el-card>

                    </el-tab-pane>
                    <el-tab-pane label="通知公告">
                        <el-card style="padding-bottom:30px;">
                            <div class="title">
                                <p>消息公告</p>
                            </div>
                            <el-divider></el-divider>
                            <el-row>
                                <el-table
                                    ref="multipleTable"
                                    :data="tableData"
                                    border
                                    :header-cell-style="{background:'#EEEEEE',color:'#323232'}"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="tableSelectionChange">
                                    
                                    <el-table-column
                                    label="序号"
                                    type="index"
                                    width="100">
                                    </el-table-column>

                                    <el-table-column
                                    prop="noticeName"
                                    label="公告通知名称"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    
                                    <el-table-column
                                    label="时间"
                                    prop="time">
                                    </el-table-column>

                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="100">
                                    <template slot-scope="scope">
                                        <el-button @click="goToLook(scope.row)" type="text" size="small">查看</el-button>
                                    </template>
                                    </el-table-column>
                                </el-table>
                            </el-row>
                            <el-row class="page-div">
                                <el-pagination
                                @size-change="pageSizeChange"
                                @current-change="pageCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="40">
                                </el-pagination>
                            </el-row>
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane label="优秀作品">
                        <el-card style="padding-bottom:30px; width:1180px;">
                            <el-row>
                                 <el-col>
                                    <type-select :gradeList="gradeListTwo" :activityTypleList="activityTypleList" :activityProjectList="activityProjectList" 
                                     @gradeObject='gradeObject' @activityTypleObject='activityTypleObject' @activityProjectObject="activityProjectObject"></type-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <card-list :cardList="activityList" :isExcellent="true" @onlike="onlike"></card-list>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import api from '../../service/api';
    import FilePreview from '../../components/FilePreview';
    import TypeSelect from '../../components/TypeSelect';
    import CardList from '../../components/CardList';
import { getTimestamp } from '../../tools/tools';
    export default{
        components: { FilePreview ,TypeSelect, CardList},
        data(){
            return{
                bannerUrl:require('../../public/images/banner.png'),
                otherListOne:[
                    {id:0,name:'电脑绘画'},
                    {id:1,name:'微视频'},
                    {id:2,name:'电子板报'},
                    {id:3,name:'3D 创意设计'}
                ],
                otherListTwo:[
                    {id:0,name:'创新应用开发'},
                    {id:1,name:'创意程序设计'},
                    {id:2,name:'创意程序设计'}
                ],
                gradeList:[
                    { id: 1, name: '小学组' },
                    { id: 2, name: '初中组' },
                    { id: 3, name: '高中组' }
                ],
                tableData: [
                    {noticeName:'深圳市中小学电脑制作大赛',time:'2020.02.26'}, 
                    {noticeName:'深圳市中小学电脑制作大赛',time:'2020.02.26'},
                    {noticeName:'深圳市中小学电脑制作大赛',time:'2020.02.26'}, 
                    {noticeName:'深圳市中小学电脑制作大赛',time:'2020.02.26'},
                    {noticeName:'深圳市中小学电脑制作大赛',time:'2020.02.26'}, 
                    {noticeName:'深圳市中小学电脑制作大赛',time:'2020.02.26'},
                    {noticeName:'深圳市中小学电脑制作大赛',time:'2020.02.26'}, 
                    {noticeName:'深圳市中小学电脑制作大赛',time:'2020.02.26'},
                ],
                multipleSelection: [],
                currentPage:1,//当前页
                activityTypleList:[
                    {id:0,name:'全部'},
                    {id:1,name:'数字创作'},
                    {id:2,name:'程序设计'},
                    {id:3,name:'电脑绘画'}
                ],
                activityProjectList:[
                    {id:0,name:'全部'},
                    {id:1,name:'数字创作'},
                    {id:2,name:'程序设计'},
                    {id:3,name:'电脑绘画'},
                    {id:4,name:'手绘插画'}
                ],
                gradeListTwo:[
                    { id: 0, name: '全部' },
                    { id: 1, name: '小学组' },
                    { id: 2, name: '初中组' },
                    { id: 3, name: '高中组' }
                ],
                object_:{},
             ClassList:[
                {name:"幼教组",id:1},
                {name:"小学组",id:2},
                {name:"初中组",id:4},
                {name:"高中组",id:8},
                {name:"特教组",id:16},
                {name:"中职组",id:32},
                {name:"高教组",id:64},
                ],
                activityObject:[
                    {name:"老师",id:1},
                    {name:"学生",id:2},
                    {name:"家长",id:4},
                ],
                activityList: [
                    { id: 1, name: '深圳市中小学电脑制作大赛', imgUrl: require('../../public/images/ac1.png') },
                    { id: 2, name: '深圳市中小学电脑机器人活动', imgUrl: require('../../public/images/ac2.png') }, 
                    { id: 3, name: '深圳市中小学网络夏令营', imgUrl: require('../../public/images/ac3.png') }, 
                    { id: 4, name: '深圳市中小学微课大赛', imgUrl: require('../../public/images/ac4.png') }, 
                    { id: 5, name: '深圳市中小学说课大赛', imgUrl: require('../../public/images/ac5.png') }, 
                    { id: 6, name: '深圳市AI知识大赛', imgUrl: require('../../public/images/ac6.png') }
                ], // 活动列表
            };
        },
        created(){
           
              var that=this;
            setTimeout(function(){
                 that.selectActive();
            },1000)
            
        },
        mounted(){
          
        },
        methods:{
            async selectActive(){
            console.log(1)
            let params={}
            params.url=api.activityDetail,
            params.id=this.$route.query.id
            params.expand="detail,region,node,attachment,banner,category,categoryDetail,process"
            let res = await this.axiosGet(params).catch(err => err);
            this.object_=res
            console.log(res,"11111111")
            

                 var Str5='';//活动对象数据处理
                console.log(this.object_.target,"item.target")
                var ii=this.object_.target.toString(2)
                for(let i=0;i<ii.length;i++){
                  if(ii[i]==1){
                      Str5=Str5+"【"+this.activityObject[i].name+"】"
                  }
                }
                this.object_.targetList=Str5 //活动对象数据处理

                var Str=[];//学段数据处理
                console.log(this.object_.period,"item.target")
                var ii=this.object_.period.toString(2)
                for(let i=0;i<ii.length;i++){
                  if(ii[i]==1){
                      Str.push(this.ClassList[i])
                  }
                }
                this.object_.periodList=Str //学段数据处理
                
                var Str2=""//活动范围数据处理
                for(let i=0;i<this.object_.region.length;i++){
                    Str2=Str2+'【'+this.object_.region[i].area_name+'】'
                }
                this.object_.regionList=Str2

                var Str3=""//发起时间
                let opts={}
                opts.dateZero="dateZero"
                Str3=this.timestampToTime(this.object_.created_at,opts)
                this.object_.Sta_created_at=Str3
                //node
                let Str4=[]
                var newtimeStamp= Math.round(new Date().getTime()/1000)
                this.object_.node.forEach((element,index) => {
                    console.log(element.stime,newtimeStamp,element.etime)
                    if(element.stime<=newtimeStamp&&newtimeStamp<=element.etime){
                        console.log(index)
                        this.object_.process_=index+1
                    }
                    if(index==3){
                        console.log(index)
                        if(newtimeStamp>element.etime){
                            console.log(1111)
                             this.object_.process_=index+1
                        }
                    }
                    let opts={}
                    opts.dateZero="dateZero"
                    var s=this.timestampToTime(element.stime,opts)
                    var e=this.timestampToTime(element.etime,opts)
                    Str4.push(s+"~"+e)
                });
                this.object_.processTime=Str4
                this.object_.categoryDetail.forEach(item=>{
                    item.child.forEach(ite=>{
                        ite.name=ite.title
                    })
                })
               
                console.log(this.object_)
           
            
            },

            //学段
            gradeObject(value) {
                console.log(value)
            },
            //活动类型
            activityTypleObject(value){
                console.log(value)
            },
            //活动项目
            activityProjectObject(value){
                console.log(value)
            },
            //其他
            otherObjectOne(value){
                console.log(value,"111111111111111")
                this.$router.push({
                    path:'/home/choiceActivity'
                })
            },
            otherObjectTwo(value){
                console.log(value)
                this.$router.push({
                    path:'/home/choiceActivity'
                })
            },
            //表格选择
            tableSelectionChange(){

            },
            //点赞
            onlike(id){
                console.log("点赞===",id)
            },
            //查看
            goToLook(){
                this.$router.push({
                    path:'/home/seeInformation'
                })
            },
            //每页数量改变
            pageSizeChange(val){

            },
            //页码改变
            pageCurrentChange(val){

            },
            //提示框
            open(index,rows) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
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
                width:1220px;
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
        .activity-introduction-main{
            .activity-title{
                font-size: 18px;
                color: #333;
            }
            .activity-int-item{
                margin: 0 30px;
                margin-top: 30px;
                .sub-title{
                    p{
                        font-size: 16px;
                        color: #333;
                    }
                    
                }
                .activity-int-content{
                    p{
                        margin-top: 10px;
                        line-height: 30px;
                        text-indent: 2em;
                        font-size: 14px;
                    }
                }
                
            }
        }
        .activity-annex{
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 30px;
            p{
                font-size: 16px;
                color: #333;
            }
            .annex{
                margin-left: 20px;
                width:50%;
            }
        }
        .list-item{
            display:flex;
            flex-direction:row;
            align-items:center;
            line-height:30px;
            font-size:14px;
            color:#333;
            margin-bottom:20px;
            .list-item-content{
                margin-left:20px;
            }
        }
        .tag{
            font-size:14px;
            color:#666;
            margin-bottom:10px;
        }
        .list-project{
            display:flex;
            flex-direction:column;
            margin-bottom:30px;
            .list-project-title{
                margin-left:90px;
                font-size:14px;
                margin-bottom:10px;
            }
        }
        .page-div{
            display:flex;
            justify-content:center;
        }
    }
</style>