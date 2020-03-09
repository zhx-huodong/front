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
        <el-form ref="form" :model="form.title" label-width="80px">
          <el-form-item label="活动名称:">
            <el-col :span="9">
              <el-input placeholder="请输入" v-model="form.title" size="small"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="活动图:">
            <div>
              <template>
                <el-upload
                  :before-upload="beforeupload"
                  :on-success="upsuccess"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :headers="headers"
                  :action="action"
                  :name="filename"
                  list-type="picture-card"
                  :file-list="form.attachment"
                >
                  <i class="el-icon-plus"></i>
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
              :on-success="upsuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
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
            <my-editor @editorChange="editorChange"></my-editor>
          </div>

          <div class="upload-file">
            <div class="annex">上传活动指南</div>
            <p>支持excle、word、pdf 三种格式</p>
          </div>
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
                <span>{{item.classname}}</span>
                <div class="myBtns">
                  <a href="javascript:void(0);" style="color:#198AF3" @click="edit()">编辑</a>
                  <a href="javascript:void(0);" style="color:#FE5426">删除</a>
                </div>
              </div>
              <div >

              <div class="content">
                <span>电脑绘制</span>
                <div class="myBtns">
                  <a href="javascript:void(0);" style="color:#198AF3">编辑</a>
                  <a href="javascript:void(0);" style="color:#FE5426">删除</a>
                </div>
              </div>
              <p class="addclass">
                <span>+</span>添加题目
              </p>
            </div>
              </div>
          </el-form-item>

            <el-form-item label="活动范围 :">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
           
            <el-checkbox-group v-model="actLimit" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in list1" :label="city" :key="city.id">{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item><el-form-item label="活动对象 :">
             <el-checkbox-group v-model="form.target" @change="handleCheckedCitiesChange2" >
               <el-checkbox v-for="city in list2" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

 
          <el-form-item label="作品上传 :">
            <el-date-picker
              v-model="form.date2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="区域推荐 :">
            <el-date-picker
              v-model="form.date2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="市级评审 :">
            <el-date-picker
              v-model="form.date2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="作品展示 :">
            <el-date-picker
              v-model="form.date2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
      title="添加类别"
      :visible.sync="addclassFlag"
      width="30%"
     >
      <div style=":display: inline-block;">
           <span>类别名称：</span>
           <el-input v-model="cname" placeholder="请输出"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addclassFlag = false">取 消</el-button>
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
        desc: ""
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
    };
  },
  computed: {},
  mounted() {},
  methods: {
   
    // 添加图片
      beforeupload(file){
            // this.datas={upFile:file.name} 
            console.log(file.name)
            console.log(file)
        },
        upsuccess(response, file, fileList) {
            console.log(file)
            
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
    //
    addclassL(){
    
        this.classList.push({"classname":this.cname});
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
      edit(){
          this.$router.push({
              path:"/activeManager/createActivity/activeEdit",
          })
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
      },
    handleCheckedCitiesChange2(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.list2.length;
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.list2.length;
      },
    
    
    //提交

    onSubmit() {
      console.log("submit!");
    },
    handlePictureCardPreview() {},
    handleRemove() {},
    //富文本内容改变
    editorChange(data) {
      console.log("data===", data);
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