<template>
    
    <div class="outter">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="活动中心" name="first">
                <div style=" clear: both;text-align: left;">
                    <el-form ref="form" :model="form">
                        <el-row :gutter="3">
                            <el-col style="margin-top:5px" :xs="12" :sm="12" :md="5" :span="8">
                                <span style="float:left;width:40%;   text-align: right;">活动对象：</span>
                                <el-select v-model="form.object" placeholder="请选择" size="mini"  class="filterinput" style="width:50%">
                                    <el-option v-for="item in AOList" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col style="margin-top:5px" :xs="12" :sm="12" :md="5" :span="8">
                                <span style="float:left;width:40%;   text-align: right;">活动范围：</span>
                                <el-select v-model="form.limit" placeholder="请选择" size="mini" class="filterinput" style="width:50%">
                                    <el-option v-for="item in AlList" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                             <el-col style="margin-top:5px" :xs="12" :sm="12" :md="10" :span="8">
                                <span style="float:left;width:40%;text-align: right;">活动时间：</span>
                                    <el-date-picker
                                        format="yyyy-MM-dd"
                                        v-model="form.time"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        size="mini"
                                        style="width:50%">
                                        
                                    </el-date-picker>
                            </el-col>
                        </el-row>
                        <el-row style="margin-left:100px;margin-top:20px" :gutter="3">
                             <el-col style="margin-top:5px" :xs="12" :sm="12" :md="5" :span="8">
                                <el-input v-model="form.acitvename" size="mini" class="filterinput" style="width:55%" placeholder="请输入活动名称"> </el-input>
                            </el-col>
                            <el-col style="margin-top:5px" :xs="24" :sm="24" :md="3">
                                <el-button style="float:left; width:100%" type="primary" @click="onSubmit()" size="mini">查询</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
    
               
                <div style="margin-top:36px" v-for='item in list' >
                   <div class="count" >
                        <div class='imglogo'>
                            <img :src="item.url" style="width:173px;height:127px;border-radius:8px;"/>
                        </div>
                        <div class="activeclass">
                            <p class="font1">{{item.name}}</p>
                            <p >活动对象：{{item.object}} </p>
                            <p >活动范围：{{item.limit}} </p>
                            <p >发起时间：{{item.time}} </p>
                        </div>
                        <div class="shenheclass" >
                            <p>{{item.status}}</p>
                            <el-button type="text" @click="toActivetyDetail()" >查看活动详情 》</el-button>

                        </div>

                      
                   </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="历史记录" name="second">

            </el-tab-pane>
        </el-tabs>
        <el-button size='mini' type="primary" style='position: absolute;right:400px;top:84px;' @click="fabuActive()">+发起活动</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeName: 'first',
            form:{
                object:'',
                limit:'',
                time:'',
                acitvename:'',
            },
            AOList:[
                {id:1,name:"学生1"},
                {id:2,name:"学生2"},
                {id:3,name:"学生3"},
            ],
             AlList:[
                {id:1,name:"学生4"},
                {id:2,name:"学生5"},
                {id:3,name:"学生6"},
            ],
            
            list:[
                {
                    id:1,
                    name:"电脑绘画",
                    object:"【学生】",
                    limit:"【宝安区】【龙岗区】【南山区】【福田区】",
                    time:"2020-01-20",
                    url:require('../../assets/img2/1.png'),
                    status:"待审核"
                    },
                {
                    id:2,
                    name:"机器人比赛",
                    object:"【学生】",
                    limit:"【宝安区】【龙岗区】【南山区】【福田区】",
                    time:"2020-01-20",
                    url:require('../../assets/img2/1.png'),
                    status:"报名中",
                    },
               
            ]
        }
    },
     methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit(){

      },
      fabuActive(){
          this.$router.push({
              path:"/activeManager/publicActive",
          })
          
      },
    toActivetyDetail(){
         this.$router.push({
              path:"/activityDetail",
          })
        
    }
    },

 
}
</script>
<style lang="less" scoped>
    .activeclass-bottom{
      
    }
    .shenheclass{
        
        margin:-71px 0 0 800px;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,198,44,1);
        line-height:24px;
        position:relative;
        .mybtn{
            position:absolute;
            right:50px;
            top:200px;
        }
    }
    .activeclass{
        
        display:flex;
        flex-direction: column;
        justify-content: start;
        p{
            padding: 5px 10px 4px 61px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:24px;
        }
        .font1{
        margin:7px 0 0 0;
        float:left;
        font-size:24px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:43px;
    }
    }
    .outter{
        margin:20px 360px 0 360px;
    }
    .count{
     
    width:1200px;
    height:170px;
    background:rgba(247,248,250,1);
    border:1px solid rgba(229,229,229,1);
    border-radius:6px;
    
    }
    .imglogo{
            float:left;
            margin:20px 0 0 41px;
    }
    .textclass{
       
        margin:28px 0 0 275px;
        
    }

    .font2{
         /* margin-top:20px; */
        float:left;
        
    }
    .butClass{
      margin:75px 38px 0 0;  
    }
    
</style>