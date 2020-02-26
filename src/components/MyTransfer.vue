<template>
    <div>
        
        <span class="countnum" style="margin-left:33px;">共20个作品</span>
        <span class="title" style="margin-left:244px;">分配作品</span>
        
        <hr>
        <div class="div1">
            <input  class="inputclass"v-model="input" placeholder="请输入内容" style="" ></input>
            
            <div style="margin-top:21px;" >
                <div v-for="(item,index) in dataList" style="margin-bottom:10px;">
                <img :src="url" style="width:20px;height:20px;margin-left:30px;">
                <span style="margin-left: 56px;margin-top: -25px;display: block;">{{item.name}}</span>
                <span style="margin-left: 301px;display: block;margin-top:-19px;" @change="JudgeAdd(index)" >
                <el-checkbox v-model="dataList[index].checked"  ></el-checkbox>
                </span>
                </div>
            </div>
        </div>
        
        <div class="div2">
            <span style="font-size:14px;font-family:PingFang;font-weight:500;color:rgba(153,153,153,1);line-height:70px;margin-left:30px;">请选择您要添加的人员</span>
            <div style="margin-top:12px;">
            <div   v-for="(item,index) in addList" >
                <div style="width:75px;height:30px;background:rgba(255,255,255,1);border:1px solid rgba(229,229,229,1);border-radius:4px;margin-left:50px;">
                    <p style="font-size:14px;font-family:Microsoft YaHei;font-weight:400;color:rgba(51,51,51,1);line-height:30px;text-align:center" >{{item.name}}</p>
                    <img src="../public/images/delete.svg" style="margin: -24px 0 0 257px;display: block;"  @click="delet(index)"/>
                </div>
            </div>
            </div>
            <div class='mybtn'>
                <el-button type="primary" size="medium" @click="edit()">确认</el-button>
                <el-button size="medium" style="margin-right:118px;" @click="Noedit()">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
          input:"",
          dataList2:[],
          dataList:[
                {name:'陈老师',checked:false},
                {name:'张老师',checked:false},
                {name:'李老师',checked:false},
                {name:'吴老师',checked:false}, 
                {name:'张老师',checked:false}, 
                {name:'曹老师',checked:false},
                {name:'周老师',checked:false},
                {name:'吴老师',checked:false},
                {name:"张老师",checked:false}
              ],
        addList:[],
          url:require('../public/images/peopLogo.png'),
      };
    },
    created(){
        this.dataList2=this.dataList;
        console.log(this.dataList2)
    },
    methods: {
        edit(){
             this.$emit('edit',false)
        },
        Noedit(){
             this.$emit('Noedit',false)
        },
        JudgeAdd(item){
            let list=[];
             console.log(this.dataList[item].checked,item)
             this.dataList.forEach(res=>{
                if(res.checked==true){
                    list.push(res)
                }
             })
             this.addList=list
            console.log(list)
        },
        delet(item){
            console.log(item)
            let list=[];
            this.addList[item].checked=false;
            this.addList.forEach(res=>{
                if(res.checked==true){
                    list.push(res)
                }
            })
            this.addList=list;
        },
        search(keyWord){
            console.log("search:"+keyWord)
            let list=[]
            if(keyWord!=''){
               for(var i=0;i<this.dataList.length;i++){
                   if(this.dataList[i].name.indexOf(keyWord)>=0){
                       list.push(this.dataList[i])
                   }
               }
                this.dataList=list;
            }else{
                this.dataList=this.dataList2
            }
            
           
        }
    },
    watch: {
          'input': function(newVal){
              this.input = newVal 
              this.search(this.input)
              console.log(this.input)
          },
          
    }

  }
</script>
<style lang="less" scoped>
.title{
    
    font-size:18px;
    font-family:Adobe Heiti Std;
    font-weight:normal;
    color:rgba(51,51,51,1);line-height:48px;
}
.div1{
    clear:both;
    float:left;
    width:380px;
    height:432px;
    border-right:1px solid rgba(210,210,210,1);;
    
}
.div2{
    position:relative;
    float:left;
    width:400px;
    height:432px;
    .mybtn{
        position:absolute;
        bottom:0;
        margin-left:118px;
        margin-bottom:18px;
        
    }
    
    
}
.countnum{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:48px;
}
.inputclass{
    margin:33px 0 0 30px;
    width:286px;
    height:32px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(234,234,234,1);
    border-radius:4px;
}
</style>