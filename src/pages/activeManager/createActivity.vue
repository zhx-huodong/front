<template>
  <div class="create-activity-container">
    <el-card style="min-height:650px">
      <!-- <div>
                <el-button style="margin-bottom:10px;" size="mini" @click="back()"> <返回</el-button>
             
                <p style="text-align: center;" >发布活动</p>
                <hr>
      </div>-->
      <el-page-header @back="back()" title="发布活动"></el-page-header>
      <hr />

      <!-- <el-tabs v-model="activeName" >
      <el-tab-pane label="创建活动" name="first">-->
      <div class="create-activity-body">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动名称:">
            <el-col :span="9">
              <el-input placeholder="请输入" v-model="form.title" size="small" @input="changeTitle()"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="活动图:">
            <div>
              <template>
                <el-upload
                  :show-file-list="true"
                  :before-upload="beforeupload"
                  :on-success="upsuccess"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :headers="headers"
                  :action="action"
                  :name="filename"
                  list-type="picture-card"
                  :file-list="form.cover"
                  :limit="1"
                >
                  <i class="el-icon-plus"></i>
                  <!-- <el-dialog :visible.sync="dialogVisible_cover">
                    <img width="100%" :src="dialogImageUrl_cover" alt="">
                  </el-dialog> -->
                  <span
                    style="font-size: 14px;position: absolute;top: 26%;left: 25%;color:#ccc"
                  >添加活动展示图片</span>
                </el-upload>
              </template>
            </div>
          </el-form-item>
          <el-form-item label="banner图:">
            <template>
              <el-upload
              :before-upload="beforeupload"
              :on-success="upsuccess2"
              :on-preview="handlePreview"
              :on-remove="handleRemove2"
              :headers="headers"
              :action="action"
              :name="filename" 
              :file-list="form.banner" 
              list-type="picture-card"
              >
                <i class="el-icon-plus"></i>
                <span
                  style="font-size: 14px;position: absolute;top: 26%;left:15%;color:#ccc"
                >添加内页banner图(1920*460)</span>
                <!-- <div slot="tip"  >添加内页banner图(1920*460)</div> -->
              </el-upload>
            </template>
          </el-form-item>

          <div class="my-editer">
            <P>活动介绍 ：</P>
            <my-editor @editorChange="editorChange" :inputtext="inputtext"></my-editor>
          </div>
          
          <el-upload
           
            :action="action2"
            :on-preview="handlePreview"
            :on-success="upsuccess3"
            :on-remove="handleRemove3"
             multiple
            :headers="headers"
            :name="filename" 
            :file-list="form.attachment">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">支持excle、word、pdf 三种格式</div>
          </el-upload>
          <!-- <div class="upload-file">
            <div class="annex">上传活动指南</div>
            <p>支持excle、word、pdf 三种格式</p>
          </div> -->
          <!-- 暂时不做 -->
          <!-- <div style="clear:both;margin-top:20px;margin-bottom:20px;">
            <div style="font-size: 14px">作品限额设置:</div>
            <el-button
              type="primary"
              @click="limitSetting()"
              style="margin-left: 95px;float: left;margin-top: -25px;"
              size="small"
            >点击进入设置</el-button>
          </div> -->
          <el-form-item label="活动类型 :">
            <span class="mybtn" @click="addclassFlag=true" >+添加类别</span>
            <div class="myOut" v-for="(item,index) in classList" >
              <div class="myTitle" >
                <span>{{item.title}}</span>
                <div class="myBtns">
                  <a href="javascript:void(0);" style="color:#198AF3" @click="edit_(item,index)">编辑</a>
                  <a href="javascript:void(0);" style="color:#FE5426" @click="deleteTitle(index)">删除</a>
                </div>
              </div>
              <div >

              <div class="content" v-for="(ite,inde) in item.child">
                <span>{{ite.title}}</span>
                <div class="myBtns">
                  <a href="javascript:void(0);" style="color:#198AF3" @click="childEdit(index,inde)">编辑</a>
                  <a href="javascript:void(0);" style="color:#FE5426" @click="childDele(index,inde)">删除</a>
                </div>
              </div>
              <p class="addclass"  @click="toActiveEdit(index)">
                <span >+</span>添加题目
              </p>
            </div>
              </div>
          </el-form-item>

            <el-form-item label="活动范围 :">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
           
            <el-checkbox-group v-model="actLimit" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in options" :label="city" :key="city.id">{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item><el-form-item label="活动对象 :">
             <el-checkbox-group v-model="form.target" @change="handleCheckedCitiesChange2" >
               <el-checkbox v-for="city in list2" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

 
          <el-form-item label="作品上传 :" >
            <el-date-picker
              v-model="form.upload"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="区域推荐 :">
            <el-date-picker
              v-model="form.recommend"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
               value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="市级评审 :">
            <el-date-picker
              v-model="form.review"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
               value-format="timestamp"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="作品展示 :">
            <el-date-picker
              v-model="form.exhibit"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
               value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
         
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存并发布</el-button>
            <el-button>保存草稿</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- </el-tab-pane>
      </el-tabs>-->
    </el-card>
    <el-dialog
      :center="true"
      :title="edit_1==false?'添加类别':'修改类别'"
      :visible.sync="addclassFlag"
      width="30%"
     >
      <div style=":display: inline-block;">
           <span>类别名称：</span>
           <el-input v-model="cname" placeholder="请输出"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addclassFlag = false,edit_1=false">取 消</el-button>
        <el-button type="primary" @click="addclassFlag = false,addclassL() ">确 定</el-button>
      </span>
    </el-dialog>
    
    <!-- <div class="myBox" v-show="limitSet">
      <p>根据所选活动范围列出下级区域</p>
      <div class="myList" style="margin:20px;0px">
        <span>地区名称:</span>
        <el-select v-model="RegionIndex" placeholder="请选择" style="width:150px;" id="mySelect"  @change="selectRegion(RegionIndex)" >
          <el-option
            v-for="(item,index) in options"
            :key="item.id"
            :label="item.name"
            :value="index"
          ></el-option>
        </el-select>
      </div>
      <div class="myList" style="margin:20px;0px">
        <span>作品限额:</span>
        <el-input v-model="number" style="width:150px" id="myInput" @input="LimitSet(number)"></el-input>
      </div>
      <div class="mtBoxList">
          <el-button size="mini">设置</el-button>
          <el-button size="mini">统一设定</el-button>
          <el-button size="mini">取消</el-button>
          <div class="myItem">
              <table>
                  <tr style="background-color:#eee;height:45px">
                      <td>市/区</td>
                      <td>作品限额</td>
                  </tr>
                  <tr style="height:40px" v-for="(item,index) in options" :key="index">
                      <td>{{item.name}}</td>
                      <td>{{item.val}}</td>
                  </tr>
              </table>
          </div>
          <el-button class="sure" @click="limitSetting()">确定</el-button>
      </div>
    </div> -->
  </div>
</template>
<script>
import api from '../../service/api';
import MyEditor from "../../components/MyEditor";
export default {
  components: {
    MyEditor
  },
  data() {
    return {
      
      inputtext:"",
      edit_1:false,
      cname:"",
      addclassFlag:false,
        RegionIndex:"",
        actLimit:[],
         checkAll: false,
         isIndeterminate: true,
         checkAll2: false,
         isIndeterminate2: true,
        list2:[
            {name:"老师",id:1},
            {name:"学生",id:2},
            {name:"家长",id:4},
        ],
         list1:[
            {name:"南山",id:1},
            {name:"宝安",id:2},
            {name:"西乡",id:3},
        ],
        object:[],
      activeName: "first",
      form: {
        content:"",
        cover:[],
        title: "",
        banner:[],
        target:[],
        attachment:[],
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        upload:[],
        recommend:[],
        review:[],
        exhibit:[],
      },
      content: null,
      editorOption: {},
      value: "",
      options: [
        {"id":"77","pid":"6","type":"2","name":"深圳","val":200},
        {"id":"726","pid":"77","type":"3","name":"福田区","val":200},
        {"id":"727","pid":"77","type":"3","name":"罗湖区","val":200},
        {"id":"728","pid":"77","type":"3","name":"南山区","val":200},
        {"id":"729","pid":"77","type":"3","name":"宝安区","val":200},
        {"id":"730","pid":"77","type":"3","name":"龙岗区","val":200},
        {"id":"731","pid":"77","type":"3","name":"盐田区","val":200},
        {"id":"732","pid":"77","type":"3","name":"市辖区","val":200},
        {"id":"733","pid":"77","type":"3","name":"龙华区","val":200},
        {"id":"734","pid":"77","type":"3","name":"坪山区","val":200},
        {"id":"735","pid":"77","type":"3","name":"光明区","val":200},
        {"id":"736","pid":"77","type":"3","name":"大鹏区","val":200}
      ],
      
      
      limitSet:false,
      classList:[],
      filename:"upFile",
      url:"",
      datas:{},
      headers:{
          'x-api-key':JSON.parse(localStorage.getItem("user")).token,
      },
      action:api.uploadPic,
      action2:api.uploadFile,
      editIndex:"",
      activedata:{},
      apipath:"http://api.huodong.eduinspector.com"
    };
  },

  created(){
    var ativeEdit=[];
    if(localStorage.getItem("ativeEdit")!= null){
        this.classList=JSON.parse(localStorage.getItem('ativeEdit'))
        console.log(this.classList,"classlist")
    }

    if(sessionStorage.getItem("activedata")!= null){
       var activedata=JSON.parse(sessionStorage.getItem('activedata'))
        this.form.title=activedata.title
        this.form.cover.push({"name":"封面","url":activedata.cover})
        if(activedata.banner.length!=0){
          activedata.banner.forEach((item,index)=>{
            this.form.banner.push({"name":"banner"+index,"url":item})
          })
        }
        this.inputtext=activedata.content
         if(activedata.attachment.length!=0){
          activedata.attachment.forEach((item,index)=>{ 
            this.form.attachment.push({"name":"attachment-"+index,"url":item})
          })
        }
    }
  },
  computed: {
  
  },
  mounted() {},
  methods: {
    changeTitle(){
        console.log(sessionStorage.getItem("activedata")) 
        if(sessionStorage.getItem("activedata")!=null){
           
            var activedata=JSON.parse(sessionStorage.getItem("activedata"))
            console.log(this.form.title)
            activedata.title=this.form.title
            sessionStorage.setItem("activedata",JSON.stringify(activedata))
        }else{
           this.activedata.title=this.form.title
            sessionStorage.setItem("activedata",JSON.stringify(this.activedata))
        }
        
    },
    childDele(index,inde){
        var ativeEdit=JSON.parse(localStorage.getItem("ativeEdit"))
        console.log(ativeEdit)
        ativeEdit.forEach((items,index_) => {
          console.log(items)
          if(index_==index){
            items.child.forEach((item,inde_)=>{
              if(inde==inde_){
                items.child.splice(inde_,1)
              }
            })
          }
        });
        localStorage.setItem("ativeEdit",JSON.stringify(ativeEdit))
         var ativeEdit=[];
        if(localStorage.getItem("ativeEdit")!= null){
            this.classList=JSON.parse(localStorage.getItem('ativeEdit'))
            console.log(this.classList,"classlist")
        }
    },
    childEdit(index,inde){
      this.$router.push({
            path:"/activeManager/createActivity/activeEdit",
            query: {
            id:index,
            id2:inde,
          }
          })
    },
    edit_(item,index){
      this.classList=JSON.parse(localStorage.getItem('ativeEdit'));
      this.cname=this.classList[index].title
      this.addclassFlag=true;
      this.edit_1=true;
      this.editIndex=index;
    },
    deleteTitle(index){
        this.classList.splice(index,1)
        localStorage.setItem("ativeEdit",JSON.stringify(this.classList))
    },
        toActiveEdit(index){
          this.$router.push({
            path:"/activeManager/createActivity/activeEdit",
            query: {
            id:index,
          }
          })
        },
    // 添加图片
      beforeupload(file){
            // this.datas={upFile:file.name} 
            // console.log(file.name)
            // console.log(file)
        },
        upsuccess(response, file, fileList) {
           
             this.form.cover=[]
            fileList.forEach(item=>{
              item.response.files.forEach(ite=>{
                
                this.form.cover.push(this.apipath+ite.path)
              })
            })
           console.log(this.form.cover)
           var activedata=JSON.parse(sessionStorage.getItem("activedata"))
           activedata.cover=this.form.cover[0]
           sessionStorage.setItem("activedata",JSON.stringify(activedata))
            
        },
        handleRemove(file, fileList) {
           
            this.form.cover=[]
            fileList.forEach(item=>{
              item.response.files.forEach(ite=>{
                
                this.form.cover.push(this.apipath+ite.path)
              })
            })
           console.log(this.form.cover)
           var activedata=JSON.parse(sessionStorage.getItem("activedata"))
           activedata.cover=this.form.cover[0]
          sessionStorage.setItem("activedata",JSON.stringify(activedata))
        },
        upsuccess2(response, file, fileList) {
           
             this.form.banner=[]
            fileList.forEach(item=>{
              item.response.files.forEach(ite=>{
                
                this.form.banner.push(this.apipath+ite.path)
              })
            })
           console.log(this.form.banner)
           var activedata=JSON.parse(sessionStorage.getItem("activedata"))
           activedata.banner=this.form.banner
           sessionStorage.setItem("activedata",JSON.stringify(activedata))
            
        },
        handleRemove2(file, fileList) {
           
            this.form.banner=[]
            fileList.forEach(item=>{
              item.response.files.forEach(ite=>{
                this.form.banner.push(this.apipath+ite.path)
              })
            })
           console.log(this.form.banner)
           var activedata=JSON.parse(sessionStorage.getItem("activedata"))
           activedata.banner=this.form.banner
          sessionStorage.setItem("activedata",JSON.stringify(activedata))
        },
          upsuccess3(response, file, fileList) {
           
             this.form.attachment=[]
            fileList.forEach(item=>{
              item.response.files.forEach(ite=>{
                
                this.form.attachment.push(this.apipath+ite.path)
              })
            })
           console.log(this.form.attachment)
           var activedata=JSON.parse(sessionStorage.getItem("activedata"))
           activedata.attachment=this.form.attachment
           sessionStorage.setItem("activedata",JSON.stringify(activedata))
            
        },
        handleRemove3(file, fileList) {
           
            this.form.attachment=[]
            fileList.forEach(item=>{
              item.response.files.forEach(ite=>{
                this.form.attachment.push(this.apipath+ite.path)
              })
            })
           console.log(this.form.attachment)
           var activedata=JSON.parse(sessionStorage.getItem("activedata"))
           activedata.attachment=this.form.attachment
          sessionStorage.setItem("activedata",JSON.stringify(activedata))
        },
        handlePreview(file) {
            console.log(file,"....");
        },
    //
    addclassL(){
        if(this.edit_1==false){
            var nullList=[]
            this.classList.push({"title":this.cname,type:1,child:nullList});
            localStorage.setItem("ativeEdit",JSON.stringify(this.classList))
        }else{
          this.classList[this.editIndex].title=this.cname;
            localStorage.setItem("ativeEdit",JSON.stringify(this.classList))
            this.edit_1=false;
        }
      
      console.log(this.classList,1111111)
    },
    LimitSet(num){
        this.options[this.RegionIndex].val=num
    },
    selectRegion(index){
      console.log(index)
       this.number=this.options[index].val
    },
    limitSeting(){
        this.limitSet=true;
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
        this.actLimit = val ? this.options : [];
        this.isIndeterminate = false;

        var activedata=JSON.parse(sessionStorage.getItem("activedata"))
        console.log(activedata)
        var region=[]
        this.actLimit.forEach(item=>{
          region.push(item.id)
        })
        activedata.region=region;
        sessionStorage.setItem("activedata",JSON.stringify(activedata))
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.options.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.list1.length;
        var activedata=JSON.parse(sessionStorage.getItem("activedata"))
        console.log(activedata)
        var region=[]
        this.actLimit.forEach(item=>{
          region.push(item.id)
        })
        activedata.region=region;
        sessionStorage.setItem("activedata",JSON.stringify(activedata))
      },
    handleCheckedCitiesChange2(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.list2.length;
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.list2.length;

        var count=0;
        console.log(this.form.target)
        this.form.target.forEach(item=>{
          count=count+item
        })
        var activedata=JSON.parse(sessionStorage.getItem("activedata"))
        // console.log(activedata)
        activedata.target=count
        sessionStorage.setItem("activedata",JSON.stringify(activedata))
      },
    
    
    //提交

    onSubmit() {
        // upload:{},
        // recommend:{},
        // review:{},
        // exhibit:{},
        var activedata=JSON.parse(sessionStorage.getItem("activedata"))
        activedata.upload={
          stime:this.form.upload[0],
          etime:this.form.upload[1],
        }
        activedata.recommend={
      stime:this.form.recommend[0],
      etime:this.form.recommend[1],
    }
        activedata.review={
      stime:this.form.review[0],
      etime:this.form.review[1],
    }
        activedata.exhibit={
      stime:this.form.exhibit[0],
      etime:this.form.exhibit[1],
    }
    sessionStorage.setItem("activedata",JSON.stringify(activedata))
    },
    handlePictureCardPreview() {},
   
    //富文本内容改变
    editorChange(data) {
      console.log("data===", data);
      this.form.content=data;
      var activedata=JSON.parse(sessionStorage.getItem("activedata"))
      activedata.content= this.form.content
      sessionStorage.setItem("activedata",JSON.stringify(activedata))
    }
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