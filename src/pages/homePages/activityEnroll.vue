<template>
   <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>活动报名</span>
            
        </div>
        
          <div class="textitem">
              <span class="fontclass">作品名称：</span>
              <input type="text" class="text1" placeholder="请输入">
          </div>
          <div class="textitem">
            <div style="height:222px;float:left;">
              <span class="fontclass">作品简介：</span>
            </div>
            <div style="height:222px;float:left;">
              <textarea  class="text2" placeholder="请输入作品简介"> </textarea>
            </div>
          </div>
          <div class="textitem">
              <span class="fontclass">报名登记：</span>
            <button @click="updata(1)" class='dianji1' >点击上传</button>
          </div>
          <div class="textitem">
              <span class="fontclass">作品附件：</span>
              <button @click="updata(2)" class='dianji2' >点击上传</button>
          </div>
          <div class="textitem">
          <span class="fontclass">报名信息</span>
         
          </div>
         <div class="textitem">
            <hr style="width:1092px;height:1px;background:rgba(229,229,229,1);"/>
          </div>
           <div class="textitem">
              <span class="fontclass">作品名称：</span>
              <input type="text" class="text1" placeholder="请输入">
          </div>
           <div class="textitem">
              <span class="fontclass">指导老师：</span>
              <input type="text" class="text1" placeholder="请输入">
          </div>
           <div class="textitem">
              <span class="fontclass">电子邮箱：</span>
              <input type="text" class="text1" placeholder="请输入">
          </div>
          <div class="buttom">
          <el-button type="primary" @click="submitEnroll()">提交报名</el-button>
          </div>
    </el-card>
</template>
<script>
export default {
    data(){
        return{
             form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
        }
    },
    methods:{
      submitEnroll(){
        this.$router.push({
          path:"/home/submitEnroll",
        })
      },
      updata(item){
        console.log(item)
      },
         onSubmit() {
        console.log('submit!');
      }
    }
}
</script>
<style lang="less">
  .buttom{
     float:left;
     margin-top: 70px;
    //  margin:0 0 38px 0;
  }
  .textitem{
    clear:both;
    float:left;
    margin:0 0 38px 0;
    .fontclass{
      
      width:63px;
      height:15px;
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:43px;
   }
   .text1{
      width:547px;
      height:45px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(229,229,229,1);
      
   }

   .text2{
      
      width:1008px;
      height:222px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(229,229,229,1);
   }
   .dianji1{
     
      width:106px;
      height:33px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(25,138,243,1);
      border-radius:4px;
      
   }
   .dianji2{
      width:106px;
      height:33px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(25,138,243,1);
      border-radius:4px;
   }
  }
  
  .header{
        width:67px;
        height:18px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:43px;
  }

  .box-card {
    clear:both;
    display: inline-block;
    text-align: center;
    width:1180px;
    height:1030px;
    margin: auto;
    background:rgba(255,255,255,1);
    margin-top: 30px;
  }
 
    .file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
 

</style>