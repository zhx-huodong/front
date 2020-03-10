<template>
  <div class="create-activity-container">
    <el-card style="min-height:650px">
  
      <el-page-header @back="back()" content="项目编辑"></el-page-header>
      <el-divider></el-divider>

      <div class="create-activity-body">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="项目名称:" prop="title">
            <el-col :span="9">
              <el-input placeholder="请输入项目名称" v-model="form.title" size="small" type="text"></el-input>
            </el-col>
          </el-form-item>

        <div class="my-editer" style="margin-left: 23px;">
            <P>项目介绍 ：</P>
            <my-editor @editorChange="editorChange" :inputtext="inputtext"></my-editor>
        </div>
         <el-form-item label="学生人数上限:" prop="author_limit" >
            <el-col :span="9">
              <el-input placeholder="" v-model="form.author_limit" size="small" type="number"></el-input>
            </el-col>
          </el-form-item>

        <el-form-item label="指导老师上限:" prop="mentor_limit">
            <el-col :span="9">
              <el-input placeholder="" v-model="form.mentor_limit" size="small" type="number"></el-input>
            </el-col>
          </el-form-item>
            <el-form-item label="学段设置 :" prop="actLimit">
            <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
           
            <el-checkbox-group v-model="form.actLimit" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="(city,index) in list1" :label="city" :key="index">{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

         <el-form-item label="作品上传格式:" prop="formats">
                <el-select v-model="form.type" filterable placeholder="请选择" size="small" @change="ChangeFormatsType(form.type)" >
                    <el-option
                    v-for="(item,index) in uploadFormatons"
                    :key="index"
                    :label="item.label"
                    :value="index">
                    </el-option>
                </el-select>
                
                <span>大小限制：</span>
                <el-select v-model="form.size" filterable placeholder="请选择" size="small" @change="ChangeFormatsSize(form.size)">
                    <el-option
                    v-for="(item,index) in sizeRestriction"
                    :key="index"
                    :label="item.label"
                    :value="index">
                    </el-option>
                </el-select>
          </el-form-item >
          <el-form-item prop="remark">
            <el-input v-model="form.remark" placeholder="输入备注" @input="ChangeFormatsRemark(form.remark)"></el-input>
          </el-form-item>
         
          <el-form-item>
           
            <el-button type="primary"  @click="onSubmit()" size="small">确定</el-button>
            <el-button @click="back()" size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
 
    </el-card>
    
 
  </div>
</template>
<script>
import MyEditor from "../../components/MyEditor";
export default {
  components: {
    MyEditor
  },
  data() {
    var validateTitle=(rule,value,callback)=>{
      if(!value){
        return callback(new Error("标题必填，不能为空"))
      }
    }

    
    return {
        rules:{
            title:[
               { required: true, message: '标题必填，不能为空', trigger: 'blur' },
            ],
            author_limit:[
               { required: true, message: '学生上限必填', trigger: 'blur' },
            ],
            mentor_limit:[
               { required: true, message: '指导老师上限必填', trigger: 'blur' },
            ],
            actLimit:[
               { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
            ],
         
        },
        
         checkAll: false,
         isIndeterminate: true,
         checkAll2: false,
         isIndeterminate2: true,
       
         list1:[
            {name:"幼教组",id:1},
            {name:"小学组",id:2},
            {name:"初中组",id:4},
            {name:"高中组",id:8},
            {name:"特教组",id:16},
            {name:"中职组",id:32},
            {name:"高教组",id:64},
        ],
      
     
      form: {
        title: "",//标题
        content:"",//内容
        author_limit:"",//作者上限
        mentor_limit: "",//指导老师限制
        period:"",//学段设置
        formats:[],
        type:"",
        remark:"",
        size:"",
        actLimit:[],
      },
      content: null,
      editorOption: {},
      value: "",
      uploadFormatons: [
        {
          value: 1,
          label: "图片"
        },
        {
          value: 2,
          label: "视频"
        },
        {
          value: 3,
          label: "普通文件"
        },
      ],
      sizeRestriction:[
        {
          value: 1024,
          label: "1MB"

        },
        {
          value: 5*1024,
          label: "5MB"
        },
        {
          value: 10*1024,
          label: "10MB"
        },
         {
          value: 20*1024,
          label: "50MB"
        },
         {
          value: 100*1024,
          label: "100MB"
        },
         {
          value: 500*1024,
          label: "500MB"
        },
      ],
     
      flag:"",
      limitSet:false,
      idnex:"",
      idnex2:"",
      inputtext:"",
      sos:[],
    };
  },
  watch:{
    'flag': function(newval){

    }
  },
  //  title:this.form.title,
  //         type:2,
  //         content:this.content,
  //         author_limit:Number(this.form.author_limit) ,
  //         mentor_limit:Number(this.form.mentor_limit),
  //         period:Number(this.form.period),
  //         formats:this.form.formats
  created(){
    console.log(typeof(this.index2))
    this.index=this.$route.query.id
    this.index2=this.$route.query.id2
      if(typeof(this.index2)!=undefined){
            var ativeEdit=JSON.parse(localStorage.getItem("ativeEdit"))
            console.log(ativeEdit)
            var list=ativeEdit[this.index].child[this.index2]
            console.log(list)
            this.form.title=list.title
            this.content=list.content
            this.inputtext=this.content
            this.form.author_limit=list.author_limit
            this.form.mentor_limit=list.mentor_limit
            var period=(list.period).toString(2)
            console.log(period.length)
            for(var i=0;i<period.length;i++){
                if(period[i]==1){
                  this.form.actLimit.push(this.list1[i])
                }
            }
            this.form.formats=list.formats
            this.form.type=list.formats[0].type;
            this.sizeRestriction.forEach((item,index)=>{

              if(item.value==list.formats[0].size){
                console.log(item.value)
                  this.form.size=index
              }
            })
            this.form.remark=list.formats[0].remark;
            this.sos=list
          }
  
  
  },
  computed: {},
  mounted() {},
  methods: {
    ChangeFormatsType(item){
     
      this.form.formats.push({type:this.uploadFormatons[item].value})
      console.log(this.form)
       if(typeof(this.index2)!=undefined){
         var list=this.sos;
          this.form.type=list.formats[item].type;
          this.sizeRestriction.forEach((ite,index)=>{

            if(ite.value==list.formats[item].size){
              console.log(ite.value)
                this.form.size=index
            }
          })
          this.form.remark=list.formats[item].remark;
       }
    },
     ChangeFormatsSize(item){
     
         this.form.formats[this.form.type].size=this.sizeRestriction[item].value
        console.log(this.form)
      
    },
     ChangeFormatsRemark(item){
       this.form.formats[this.form.type].remark=this.form.remark
        console.log(this.form)
    },

    editorChange(data) {
      console.log("data===", data);
      this.content=data;
    },
      limitSetting(){
          console.log(this.limitSetting)
          if(this.limitSet==false){
              this.limitSet=true;
          }else{
               this.limitSet=false;
          }
      },
    back() {
      this.$router.go(-1);
    },
     handleCheckAllChange(val) {
        this.actLimit = val ? this.list1 : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.list1.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.list1.length;
       
        var count=0;
        this.form.actLimit.forEach(item=>{
          console.log(item.id)
          count=count+item.id
        })
        console.log(count)
        this.form.period=count
        console.log(this.form.period)
      },

    
    //提交

    onSubmit() {
       
        if(this.form.title==""){
          this.$message({
            message:"标题不能为空",
            type:"error"
          })
          return
        }
         if(this.form.author_limit==""){
          this.$message({
            message:"学生上限未填写",
            type:"error"
          })
          return
        }
         if(this.form.mentor_limit==""){
          this.$message({
            message:"指导老师未填写",
            type:"error"
          })
          return
        }
         if(this.form.actLimit.length==0){
          this.$message({
            message:"至少选择一个组",
            type:"error"
          })
          return
        }
         if(this.form.formats.length==0){
          this.$message({
            message:"项目作品附件要求必填",
            type:"error"
          })
          return
        }
        let pramrs={};
        pramrs={
          title:this.form.title,
          type:2,
          content:this.content,
          author_limit:Number(this.form.author_limit) ,
          mentor_limit:Number(this.form.mentor_limit),
          period:Number(this.form.period),
          formats:this.form.formats
        }
        var ativeEdits=JSON.parse(localStorage.getItem('ativeEdit'))
       ativeEdits[this.index].child.push(pramrs)
        localStorage.setItem("ativeEdit",JSON.stringify(ativeEdits) )
       
        
        

    },
    handlePictureCardPreview() {},
    handleRemove() {},
    //富文本内容改变
    // editorChange(data) {
    //   console.log("data===", data);
    // }
  }

};
</script>
<style lang="less" >
#mySelect {
  height: 25px;
  line-height: 25px;
  margin-left: 15px;
}
#myInput{
    height: 25px;
     line-height: 25px;
  margin-left: 15px;
}
.el-page-header__content {
  margin-left: 400px;
}
.myBox {
  width: 497px;
  height: 532px;
  background: rgba(255, 255, 255, 1);
  border: 3px solid #eee;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%; -50%);
  padding: 35px;
  p {
    font-size: 14px;
    color: #ccc;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .mtBoxList{
      margin-left: 20px;
  }
  .sure{
      background-color:#2568ED;color:#fff;
      margin-left: 30%;
      margin-top: 5%;
  }
  .myItem{
      margin-top: 20px;
    
          height: 290px;
          overflow: auto;
      table{
          width: 290px;
          border: 1px solid #eee;
          overflow: auto;
          tr{
              text-align: center;
              
              td{
                  padding: 3px 0px;
                  width: 50%;
              }
          }
      }
  }
}
.mybtn {
  line-height: 20px;
  padding: 3px 7px;
  display: inline-block;
  border: 1px solid #409eff;
  border-radius: 3px;
  margin-left: 67%;
}
.myOut {
  width: 710px;
  .content {
    height: 64px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(229, 229, 229, 1);
    padding-left: 50px;
    span {
      line-height: 64px;
    }
    .myBtns {
      line-height: 64px;
      margin-right: 30px;
      display: inline-block;
      float: right;
      a {
        margin-left: 10px;
      }
    }
  }
  .addclass {
    padding-left: 50px;
    color: #198af3;
    span {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .myTitle {
    height: 39px;
    background: rgba(238, 238, 238, 1);
    border: 1px solid rgba(229, 229, 229, 1);
    padding-left: 50px;

    .myBtns {
      margin-right: 30px;
      display: inline-block;
      float: right;
      a {
        margin-left: 10px;
      }
    }
  }
}

.el-upload--picture-card {
  // background-color: #fbfdff;
  // border: 1px dashed #c0ccda;
  border: 1px solid rgba(229, 229, 229, 1);
  border-radius: 6px;
  box-sizing: border-box;
  width: 243px;
  height: 147px;
  line-height: 147px;
  vertical-align: top;
  position: relative;
}
.create-activity-container {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  .title {
    // display:flex;
    // align:center;
    // text-align:center;
    // justify-content: center;
    // padding-top: 20px;
  }
  .create-activity-body {
    padding: 30px 60px;
  }
}
.upload-file {
  display: flex;
  justify-content: row;
  align-items: center;
  .annex {
    font-size: 14px;
    color: #198af3;
    padding: 5px;
    border: 1px solid #198af3;
    margin-left: 74px;
    border-radius: 3px;
  }
  p {
    margin-left: 30px;
    font-size: 14px;
    color: #999;
  }
  span {
  }
}
.prize-set {
  border: 1px solid #e5e5e5;
  margin-bottom: 20px;
  font-size: 14px;
  color: #333;
  padding: 20px;
  .prize-input {
    display: flex;
    flex-direction: row;
    margin-left: 100px;
    margin-top: 10px;
    .left {
      width: 300px;
    }
    .right {
      width: 200px;
      margin-left: 20px;
    }
    .option {
      width: 100px;
      margin-left: 20px;
    }
  }
}
.my-editer {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  p {
    font-size: 14px;
    color: #666;
  }
}
</style>