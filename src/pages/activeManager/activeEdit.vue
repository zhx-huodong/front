<template>
  <div class="create-activity-container">
    <el-card style="min-height:650px">
      <el-page-header @back="back()" content="项目编辑"></el-page-header>
      <el-divider></el-divider>

      <div class="create-activity-body">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-form-item label="项目名称:" prop="title">
            <el-col :span="9">
              <el-input placeholder="请输入项目名称" v-model="form.title" size="small" type="text"></el-input>
            </el-col>
          </el-form-item>

          <div class="my-editerContain" style="margin-left: 23px;">
            <P style="width:70px;margin-left:25px">项目介绍:</P>
            <my-editor @editorChange="editorChange" :inputtext="this.form.content"></my-editor>
          </div>
          <el-form-item label="学生人数上限:" prop="author_limit">
            <el-col :span="9">
              <el-input-number
                v-model="form.author_limit"
                :min="0"
                controls-position="right"
                size="medium"
              ></el-input-number>
            </el-col>
          </el-form-item>

          <el-form-item label="指导老师上限:" prop="mentor_limit">
            <el-col :span="9">
              <el-input-number
                v-model="form.mentor_limit"
                :min="0"
                controls-position="right"
                size="medium"
              ></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="组别设置 :">
            <el-checkbox-group v-model="period" @change="periodChange">
              <el-checkbox
                v-for="(item,index) in periodList"
                :label="item"
                :key="index"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <template v-for="(item,index) in form.formats" >
            <el-form-item label="作品上传格式:" prop="formats">
              <el-select
                v-model="item.type"
                filterable
                placeholder="请选择"
                size="small"
                @change="(value)=>{ChangeFormatsType(value,index)}"
              >
                <el-option
                  v-for="(subItem) in uploadFormatons"
                  :key="subItem.value"
                  :label="subItem.label"
                  :value="subItem.value"
                ></el-option>
              </el-select>
              
              <span>大小限制：</span>
              <el-select
                v-model="item.size"
                filterable
                placeholder="请选择"
                size="small"
                @change="(value)=>{ChangeFormatsSize(value,index)}"
              >
                <el-option
                  v-for="(subItem) in sizeRestriction"
                  :key="subItem.value"
                  :label="subItem.label"
                  :value="subItem.value"
                ></el-option>
              </el-select>
              <i class="el-icon-circle-close" style="font-size:25px;color:red;cursor:pointer;margin-left:10px" @click="deleteUploadType(index)"></i>
              <!-- <el-button size="small" @click="deleteUploadType(index)"  style="background-color:#FA3636;color:#fff;margin-left:170px">删除</el-button> -->
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="item.remark"
                placeholder="输入备注"
                @input="ChangeFormatsRemark(index)"
                style="width:700px"
                type="textarea"
                :rows="2"
              ></el-input>
            </el-form-item>
          </template>
          <el-form-item>
            <el-button
              type="primary"
              @click="addUploadType()"
              size="small"
              plain
              icon="el-icon-plus"
            >添加上传入口</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit()" size="small">确定</el-button>
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
  components: { MyEditor },
  data() {
    return {
      rules: {
        title: [
          { required: true, message: "标题必填，不能为空", trigger: "blur" }
        ],
        author_limit: [
          { required: true, message: "学生上限必填", trigger: "blur" }
        ],
        mentor_limit: [
          { required: true, message: "指导老师上限必填", trigger: "blur" }
        ],
        formats:[
          {
            type: "array",
            required: true,
            message: "请选择作品格式",
            
          }
        ]
      },
      periodList: [
        { name: "幼教组", id: 1 },
        { name: "小学组", id: 2 },
        { name: "初中组", id: 4 },
        { name: "高中组", id: 8 },
        { name: "特教组", id: 16 },
        { name: "中职组", id: 32 },
        { name: "高教组", id: 64 }
      ],
      form: {
        title: "", //标题
        type: 2,
        content: "", //内容
        author_limit: "1", //作者上限
        mentor_limit: "1", //指导老师限制
        formats: [{type:1,size:1,remark:'支持JPG、PNG等图片格式,大小不超过1MB',remark1:'支持JPG、PNG等图片格式',remark2:'大小不超过1MB'}],
        period: "" //组别设置
      },
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
        {
          value: 4,
          label: "压缩文件"
        }
      ],
      sizeRestriction: [
        {
          value: 1,
          label: "1MB"
        },
        {
          value: 5,
          label: "5MB"
        },
        {
          value: 10,
          label: "10MB"
        },
        {
          value: 20,
          label: "50MB"
        },
        {
          value: 100,
          label: "100MB"
        },
        {
          value: 500,
          label: "500MB"
        }
      ],
      flag: "",
      limitSet: false,
      inputtext: "",
      period: [], //组别
      size: "", //文件大小
      remark: "", //备注
      type: "", //文件类型
    };
  },
  watch: {
    flag: function(newval) {}
  },
  created() {
    if (this.$route.query.operate == 0) {
    } else {
      this.index = this.$route.query.id;
      this.subIndex = this.$route.query.subId;
      if (typeof this.subIndex != undefined) {
        var addActivityForm = JSON.parse(
          sessionStorage.getItem("addActivityForm")
        );
        var list = addActivityForm.category[this.index].child[this.subIndex];
        this.form.title = list.title;
        this.form.content = list.content;
        this.inputtext = this.content;
        this.form.author_limit = list.author_limit;
        this.form.mentor_limit = list.mentor_limit;
        this.form.period = list.period;
        let arr=[1,2,4,8,16,32,64]
        let period=this.getSubSet(list.period,arr)
         for (let i in this.periodList) {
          for (let j in period) {
            if (this.periodList[i].id == period[j]) {
              this.period.push(this.periodList[i]);
            }
          }
        }
        console.log("this.period===",this.period)
        this.form.formats = list.formats;
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
    //增加文件上传入口
    addUploadType(){
      let item={type:1,size:1,remark:'支持JPG、PNG等图片格式,大小不超过1MB',remark1:'支持JPG、PNG等图片格式',remark2:'大小不超过1MB'}
      this.form.formats.push(item)
    },
    //删除问卷上传入口
    deleteUploadType(index){
      console.log("index==",index)
      this.form.formats.splice(index,1)
    },
    //文件上传格式
    ChangeFormatsType(value,index) {
      let remark=["支持JPG、PNG等图片格式","支持mp4,avi,mpg,mpeg,flv,mov等常用视频格式","支持word、pdf,excel等常用格式","支持zip,rar等常用格式"]
      this.form.formats[index].remark1 = remark[value-1];
      this.form.formats[index].remark=this.form.formats[index].remark1+","+this.form.formats[index].remark2;
      console.log("index==",index,"value===",value)
      this.form.formats[index].type=value
    },
    //大小限制
    ChangeFormatsSize(value,index) {
      console.log(value,index);
      let remark={'0':"大小不超过1MB",'5':"大小不超过5MB",'10':"大小不超过10MB",'20':"大小不超过50MB",'100':"大小不超过100MB",'500':"大小不超过500MB"};
      this.form.formats[index].remark2 = remark[value];
      this.form.formats[index].remark=this.form.formats[index].remark1+","+this.form.formats[index].remark2;
      console.log("index==",index,"value===",value)
      this.form.formats[index].size = value;
    },
    //备注
    ChangeFormatsRemark(index) {
      
      // console.log("备注",index);
    },

    editorChange(data) {
      this.form.content = data;
    },
    back() {
      this.$router.go(-1);
    },

    //组别选择
    periodChange(value) {
      console.log("组别===",value)
      this.form.period = "";
      this.period = value;
      let period = 0;
      for (let i in this.period) {
        period += parseInt(this.period[i].id);
      }
      this.form.period = period;
    },
    //提交
    onSubmit() {
      if (this.form.title == "") {
        this.$message({
          message: "标题不能为空",
          type: "error"
        });
        return;
      }
      if (this.form.author_limit == "") {
        this.$message({
          message: "学生上限未填写",
          type: "error"
        });
        return;
      }
      if (this.form.mentor_limit == "") {
        this.$message({
          message: "指导老师未填写",
          type: "error"
        });
        return;
      }
      if (this.period.length == 0) {
        this.$message({
          message: "至少选择一个组",
          type: "error"
        });
        return;
      }
      if (this.form.formats.length == 0) {
        this.$message({
          message: "项目作品附件要求必填",
          type: "error"
        });
        return;
      }
      let addActivityForm = JSON.parse(
        sessionStorage.getItem("addActivityForm")
      );
      let index = this.$route.query.id;
      if (this.$route.query.operate == 0) {
        addActivityForm.category[index].child.push(this.form);
      } else if (this.$route.query.operate == 1) {
        let subIndex = this.$route.query.subId;
        addActivityForm.category[index].child[subIndex] = this.form;
      }
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(addActivityForm)
      );
      this.$message({
        type: "success ",
        message: "操作成功"
      });
      setTimeout(() => {
        this.back();
      }, 1000);
    },
    
  }
};
</script>
<style lang="less" >
#mySelect {
  height: 25px;
  line-height: 25px;
  margin-left: 15px;
}
#myInput {
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
  .mtBoxList {
    margin-left: 20px;
  }
  .sure {
    background-color: #2568ed;
    color: #fff;
    margin-left: 30%;
    margin-top: 5%;
  }
  .myItem {
    margin-top: 20px;

    height: 290px;
    overflow: auto;
    table {
      width: 290px;
      border: 1px solid #eee;
      overflow: auto;
      tr {
        text-align: center;

        td {
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
.my-editerContain {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  
  p {
    font-size: 14px;
    color: #666;
  }
}
.my-editer{
  max-width: 900px;
  padding-left:4px;
}
</style>