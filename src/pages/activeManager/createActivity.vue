<template>
  <div class="create-activity-container">
    <el-card style="min-height:650px">
      <el-page-header @back="back()" content="发布活动"></el-page-header>
      <el-divider></el-divider>

      <div class="create-activity-body">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动对象:">
            <el-col :span="9">
              <el-input placeholder="请输入" v-model="form.date2" size="small"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="活动图片:">
            <div>
              <template>
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
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
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
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
          <el-form-item label="">
            <el-row>
              <el-col :span="3">
                <el-button type="primary" size="small">上传活动指南</el-button>
              </el-col>
              <el-col :span="8">
              <p>支持excle、word、pdf 三种格式</p>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="作品设置:">
            <el-button type="primary" @click="limitSetting()" size="small">点击进入设置</el-button>
          </el-form-item>
          <el-form-item label="活动类型 :">
            <span class="mybtn">+添加类别</span>
            <div class="myOut">
              <div class="myTitle">
                <span>计算机制作</span>
                <div class="myBtns">
                  <a href="javascript:void(0);" style="color:#198AF3" @click="edit()">编辑</a>
                  <a href="javascript:void(0);" style="color:#FE5426">删除</a>
                </div>
              </div>

              <div class="content">
                <span>电脑绘制</span>
                <div class="myBtns">
                  <a href="javascript:void(0);" style="color:#198AF3" @click="goToEdit()">编辑</a>
                  <a href="javascript:void(0);" style="color:#FE5426">删除</a>
                </div>
              </div>
              <p class="addclass">
                <span>+</span>添加题目
              </p>
            </div>
          </el-form-item>

            <el-form-item label="活动范围 :">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
           
            <el-checkbox-group v-model="actLimit" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="(item,index) in list1" :label="item.name" :key="index">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item><el-form-item label="活动对象 :">
             <el-checkbox-group v-model="object" @change="handleCheckedCitiesChange2" >
               <el-checkbox v-for="(item,index) in list2" :label="item.id" :key="index">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

 
          <el-form-item label="作品上传 :">
            <el-date-picker
              v-model="form.date2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="区域推荐 :">
            <el-date-picker
              v-model="form.date2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="市级评审 :">
            <el-date-picker
              v-model="form.date2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="作品展示 :">
            <el-date-picker
              v-model="form.date2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
            ></el-date-picker>
          </el-form-item>
         
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="small">保存并发布</el-button>
            <el-button size="small">保存草稿</el-button>
            <el-button size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    
    <div class="myBox" v-show="limitSet">
      <p>根据所选活动范围列出下级区域</p>
      <div class="myList" style="margin:20px;0px">
        <span>地区名称：</span>
        <el-select v-model="value" placeholder="请选择"  size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="myList" style="margin:20px;0px">
        <span>作品限额：</span>
        <el-input v-model="number" style="width:215px" size="small"></el-input>
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
                  <tr style="height:40px" v-for="(item,index) in list" :key="index">
                      <td>深圳</td>
                      <td>200</td>
                  </tr>
              </table>
          </div>
          <el-button class="sure" @click="limitSetting()" size="small">确定</el-button>
      </div>
    </div>

    <el-dialog
      title="项目编辑"
      :visible.sync="editDialogVisible"
      width="900px"
      center>
      <div class="create-activity-body">
        <el-form ref="form" :model="editForm" label-width="100px">
          <el-form-item label="项目名称:">
            <el-col :span="9">
              <el-input placeholder="请输入项目名称" v-model="editForm.activityName" size="small"></el-input>
            </el-col>
          </el-form-item>
          
          <el-form-item label="项目图片:">
            <div>
              <template>
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus"></i>
                  <span
                    style="font-size: 14px;position: absolute;top: 26%;left: 25%;color:#ccc"
                  >添加活动项目展示图片</span>
                </el-upload>
              </template>
            </div>
          </el-form-item>

          <el-form-item label="项目介绍:">
            <el-col :span="22">
              <el-input placeholder="请输入项目介绍" type="textarea" :rows="6"></el-input>
            </el-col>
          </el-form-item>
          <!-- <div class="my-editer">
            <P>项目介绍 ：</P>
            <my-editor @editorChange="editorChangeTwo" v-if="editDialogVisible"></my-editor>
          </div> -->

          <el-form-item label="学生人数上限:" >
            <el-input-number v-model="editForm.stuLimit" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>
          </el-form-item>

          <el-form-item label="指导老师上限:">
            <el-input-number v-model="editForm.teacherLimit" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>
          </el-form-item>

          <el-form-item label="学段设置:">
            <el-checkbox-group v-model="gradeList" @change="editCheckedChange">
                <el-checkbox v-for="(item,index) in gradeList" :label="item.label" :key="index">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="作品上传格式:">
            <el-select v-model="editForm.format" filterable placeholder="请选择" size="small">
                <el-option
                v-for="item in formatList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="大小限制:">
            <el-select v-model="editForm.sizeLimit" filterable placeholder="请选择" size="small">
                <el-option
                v-for="item in sizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="备注:">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="editForm.remarks">
            </el-input>
          </el-form-item >

          <el-form-item label="文件上传入口:">
            <el-checkbox-group v-model="entryList">
                <el-checkbox v-for="(item,index) in entryList" :label="item.label" :key="index">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MyEditor from "../../components/MyEditor";

export default {
  components: {MyEditor},
  data() {
    return {
      actLimit:[],
      checkAll: false,
      isIndeterminate: true,
      checkAll2: false,
      isIndeterminate2: true,
      list2:[
          {name:"老师",id:1},
          {name:"学生",id:2},
          {name:"学校",id:3},
      ],
        list1:[
          {name:"南山",id:1},
          {name:"宝安",id:2},
          {name:"西乡",id:3},
      ],
      object:[],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
      },
      content: null,
      editorOption: {},
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      number:2000,
      list:[1,1,1,1,1,1,1,1,1,1,1],
      limitSet:false,
      editDialogVisible:false,//项目编辑弹窗
      editForm:{
        activityName:'',
        stuLimit:'',
        teacherLimit:'',
        grade:'',
        format:'',
        sizeLimit:'',
        remarks:''
      },//项目编辑
      gradeList:[
        {value: 1,label: "幼教组"},
        {value: 2,label: "小学组"},
        {value: 3,label: "初中组"},
        {value: 4,label: "高中组"},
        {value: 5,label: "特教组"},
        {value: 6,label: "中职组"},
        {value: 7,label: "高职组"},
      ],
      formatList:[
        {value: 1,label: "视频"},
        {value: 2,label: "图片"},
        {value: 3,label: "文档"},
      ],
      sizeList:[
        {value: 1,label: "5MB"},
        {value: 2,label: "10MB"},
        {value: 3,label: "50MB"},
        {value: 4,label: "100MB"},
        {value: 5,label: "200MB"},
      ],
      entryList:[
        {value: 1,label: "视频"},
        {value: 2,label: "图片"},
        {value: 3,label: "文档"},
        {value: 4,label: "附件"}
      ]
    };
  },
  computed: {},
  mounted() {
    
  },
  methods: {
    //项目编辑
    goToEdit(){
      this.editDialogVisible=true
    },
    editCheckedChange(){

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
    handlePictureCardPreview() {

    },
    handleRemove() {

    },
    //富文本内容改变
    editorChange(data) {
      console.log("data===", data);
    },
    //编辑富文本内容改变
    editorChangeTwo(data) {
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