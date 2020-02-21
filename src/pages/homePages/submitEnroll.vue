<template>

    <el-card class="box-card">
      
            <div class="imagelog">
                <img :src="imagelog">
            </div>
            <div class='title'>
                <span>你的报名已提交成功</span>
            </div>
            <div class="buttom">
                 <el-button type="primary" @click="enrollRecord()">查看报名记录</el-button>
            </div>
            
        
    </el-card>
    
</template>
<script>
export default {
    data(){
        return{
            imagelog:require("../../public/images/success.png")
        }
    },
    methods:{
        enrollRecord(){
            this.$router.push({
                path:"/"
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .box-card {
    clear:both;
    margin:auto;
    text-align: center;
    width:1180px;
    height:1030px;
    background:rgba(255,255,255,1);
    margin-top:30px;
  }
  .title{
        margin:76px 496px 0 497px;
        width:207px;
        height:21px;
        span{
           font-size:22px;
            font-family:Adobe Heiti Std;
            font-weight:normal;
            color:rgba(102,102,102,1);
            line-height:48px; 
        }
  }
  .imagelog{
        margin:214px 536px 0px 536px;
        width:128px;
        height:128px;
        img{
            border-radius:100%;
            border: 1px;
            border-radius: 100%;
        }
  }
  .buttom{
      margin: 64px 526px 0 528px;
  }
//   .buttom{
//         width:163px;
//         height:45px;
//         background:rgba(25,138,243,1);
//   }
</style>