<template>
    <el-card class="box-card">
        <div class="enroll-container">
            <div class="imagelog">
                <img :src="imagelog">
            </div>
            <div class='title'>
                <span>你的报名已提交成功</span>
            </div>
            <div class="buttom">
                    <el-button type="primary" @click="enrollRecord()">查看报名记录</el-button>
            </div>
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
                path:"/userCenter"
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
    margin-top:20px;
  }
.enroll-container{
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    margin-top:150px;
    .title{
        margin-top:50px;
        span{
            font-size:22px;
            line-height:48px; 
            color:#666;
            
        }
    }
    .imagelog{
        width:128px;
        height:128px;
        img{
            border-radius:100%;
            border: 1px;
            border-radius: 100%;
        }
    }
    .buttom{
        margin-top:50px;
    }
}
  

</style>