<template>

    <div class="outter">
        <el-card style="min-height:650px">
            <div style="position:relative">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="活动中心" name="first">
                      
                            <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
                                
                                        <el-form-item label="报名时间：">
                                           
                                                <el-date-picker format="yyyy-MM-dd" v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">   
                                                </el-date-picker>
                                            
                                        </el-form-item>
                                          
                                        <el-form-item label="活动名称：">
                                            
                                            <el-input v-model="form.acitvename" placeholder="请输入活动名称"> </el-input>
                                            
                                        </el-form-item>
                                   
                                        <el-form-item >
                                            <el-button  type="primary" @click="onSubmit()">查询</el-button>
                                        </el-form-item>
                               
                            </el-form>
                      
                        
                        <div v-for='item in list' >
                            <div class="count" >
                                <div>
                                    <div class='imglogo'>
                                        <img :src="item.url" style="width:173px;height:127px;border-radius:8px;"/>
                                    </div>
                                    <div class="activeclass">
                                        <p class="font1">{{item.name}}</p>
                                        <p >活动对象：{{item.object}} </p>
                                        <p >活动范围：{{item.limit}} </p>
                                        <p >发起时间：{{item.time}} </p>
                                    </div>
                                </div>
                                <div class="shenheclass" >
                                    <p>{{item.status}}</p>
                                   
                                </div>
                                <div class="shenheclass2" >
                                   
                                    <el-button type="text" @click="goToManagerCenter()"  style="display:block;margin-left:9px;">管理</el-button>
                                    <el-button type="text" @click="goToManagerCenter()"  style="display:block">查看详情></el-button>
                                    <el-button type="text" @click="goToManagerCenter()"  style="display:block;margin-top:20px;color:red;">删除</el-button>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="历史记录" name="second">

                    </el-tab-pane>
                </el-tabs>
                <el-button size='mini' type="primary" style='position: absolute;right:0px;top:0px;' @click="fabuActive()">+发起活动</el-button>
            </div>
        </el-card>
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
    goToManagerCenter(){
         this.$router.push({
              path:"/activeManager/managerCenter",
          })
        
    }
    },

 
}
</script>
<style lang="less" scoped>
    .outter{
        width:1180px;
        margin:auto;
        margin-top:20px;
    }

    .count{
        display:flex;
        width:1120px;
        height:170px;
        background:rgba(247,248,250,1);
        border:1px solid rgba(229,229,229,1);
        border-radius:8px;
        margin-bottom:20px;
    }
    .imglogo{
        float:left;
        margin:20px 0 0 20px;
    }
  
    .font2{
         /* margin-top:20px; */
        float:left;
        
    }
    .shenheclass{
        margin-left:100px;
        width:150px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-size:14px;
        font-weight:400;
        color:rgba(255,198,44,1);
    }
    .shenheclass2{
            margin: 20px 60px 0 0;
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
 .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }



    
</style>