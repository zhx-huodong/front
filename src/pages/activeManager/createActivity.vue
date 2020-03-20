<template>
  <div class="create-activity-container">
    <el-card style="min-height:650px">
      <el-page-header @back="back()" title="发布活动"></el-page-header>
      <el-divider></el-divider>
      <div class="create-activity-body">
        <el-form ref="form" :model="addActivityForm" label-width="80px">
          <el-form-item label="活动名称:">
            <el-col :span="9">
              <el-input
                placeholder="请输入"
                v-model="addActivityForm.title"
                size="small"
                @input="changeTitle()"
              ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="活动图:">
            <div>
              <template>
                <el-upload
                  :show-file-list="true"
                  :before-upload="beforeupload"
                  :on-success="coverSuccess"
                  :on-preview="handlePreview"
                  :on-remove="coverRemove"
                  :headers="headers"
                  :action="action"
                  :name="filename"
                  list-type="picture-card"
                  :file-list="cover"
                  :limit="1"
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
                :on-success="bannerSuccess"
                :on-preview="handlePreview"
                :on-remove="bannerRemove"
                :headers="headers"
                :action="action"
                :name="filename"
                :file-list="banner"
                :limit="1"
                list-type="picture-card"
              >
                <i class="el-icon-plus"></i>
                <span
                  style="font-size: 14px;position: absolute;top: 26%;left:15%;color:#ccc"
                >添加内页banner图(1920*460)</span>
              </el-upload>
            </template>
          </el-form-item>

          <div class="my-editer">
            <P>活动介绍 ：</P>
            <my-editor @editorChange="editorChange" :inputtext="inputtext"></my-editor>
          </div>

          <el-upload
            style="width:790px;margin-bottom:20px;"
            :action="action2"
            :on-preview="handlePreview"
            :on-success="attachmentSuccess"
            :on-remove="attachmentRemove"
            multiple
            :headers="headers"
            :name="filename"
            :file-list="attachment"
          >
            <el-button size="small" type="primary" plain>上传活动指南</el-button>
            <span slot="tip" class="el-upload__tip" style="margin-left:20px;">支持PNG、JPG格式</span>
          </el-upload>
          <el-form-item label="活动类型 :">
            <span class="mybtn" @click="addclassFlag=true,edit_1=false">+添加类别</span>
            <div class="myOut" v-for="(item,index) in addActivityForm.category" :key="index">
              <div class="myTitle">
                <span>{{item.title}}</span>
                <div class="myBtns">
                  <a href="javascript:void(0);" style="color:#198AF3" @click="edit_(index)">编辑</a>
                  <a href="javascript:void(0);" style="color:#FE5426" @click="deleteTitle(index)">删除</a>
                </div>
              </div>
              <div>
                <div class="content" v-for="(subItem,subIndex) in item.child" :key="subIndex">
                  <span>{{subItem.title}}</span>
                  <div class="myBtns">
                    <a
                      href="javascript:void(0);"
                      style="color:#198AF3"
                      @click="childEdit(index,subIndex)"
                    >编辑</a>
                    <a
                      href="javascript:void(0);"
                      style="color:#FE5426"
                      @click="childDelete(index,subIndex)"
                    >删除</a>
                  </div>
                </div>
                <p class="addclass" @click="toActiveEdit(index)">
                  <span>+</span>添加题目
                </p>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="活动范围 :">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="regionCheckAllChange"
            >全选</el-checkbox>
            <el-checkbox-group v-model="region" @change="regionCheckedChange">
              <el-checkbox v-for="item in regionList" :label="item" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="活动对象 :">
            <el-checkbox-group v-model="target" @change="targetCheckedChange">
              <el-checkbox v-for="item in targetList" :label="item" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="作品上传 :">
            <el-date-picker
              v-model="upload"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="uploadChange"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="区域推荐 :">
            <el-date-picker
              v-model="recommend"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="recommendChange"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="市级评审 :">
            <el-date-picker
              v-model="review"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="reviewChange"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="作品展示 :">
            <el-date-picker
              v-model="exhibit"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="exhibitChange"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit()">保存并发布</el-button>
            <!-- <el-button>保存草稿</el-button> -->
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-dialog
      :center="true"
      :title="edit_1==false?'添加类别':'修改类别'"
      :visible.sync="addclassFlag"
      width="30%"
    >
      <div style=":display: inline-block;">
        <span>类别名称：</span>
        <el-input v-model="title" placeholder="请输出"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addclassFlag = false,edit_1=false">取 消</el-button>
        <el-button type="primary" @click="addclassFlag = false,addCategory() ">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "../../service/api";
import MyEditor from "../../components/MyEditor";
import { getCookie } from "../../tools/tools";
export default {
  components: {
    MyEditor
  },
  data() {
    return {
      inputtext: "",
      edit_1: false,
      title: "",
      addclassFlag: false,
      RegionIndex: "",
      checkAll: false,
      isIndeterminate: true,
      checkAll2: false,
      isIndeterminate2: true,
      targetList: [
        { name: "老师", id: 1, checked: false },
        { name: "学生", id: 2, checked: false },
        { name: "家长", id: 4, checked: false },
        { name: "老师和学生", id: 3, checked: false }
      ],
      addActivityForm: {
        title: "",
        content: "",
        cover: "",
        banner: [],
        attachment: [],
        target: "",
        region: [],
        upload: {},
        recommend: {},
        review: {},
        exhibit: {},
        category: []
      },
      content: null,
      editorOption: {},
      value: "",
      regionList: [
        { id: "77", pid: "6", type: "2", name: "深圳", val: 200 },
        { id: "726", pid: "77", type: "3", name: "福田区", val: 200 },
        { id: "727", pid: "77", type: "3", name: "罗湖区", val: 200 },
        { id: "728", pid: "77", type: "3", name: "南山区", val: 200 },
        { id: "729", pid: "77", type: "3", name: "宝安区", val: 200 },
        { id: "730", pid: "77", type: "3", name: "龙岗区", val: 200 },
        { id: "731", pid: "77", type: "3", name: "盐田区", val: 200 },
        { id: "732", pid: "77", type: "3", name: "市辖区", val: 200 },
        { id: "733", pid: "77", type: "3", name: "龙华区", val: 200 },
        { id: "734", pid: "77", type: "3", name: "坪山区", val: 200 },
        { id: "735", pid: "77", type: "3", name: "光明区", val: 200 },
        { id: "736", pid: "77", type: "3", name: "大鹏区", val: 200 }
      ],
      limitSet: false,
      filename: "upFile",
      url: "",
      datas: {},
      headers: {
        "x-api-key": getCookie("x-api-key")
      },
      action: api.uploadPic,
      action2: api.uploadFile,
      editIndex: "",
      apipath: "http://api.huodong.eduinspector.com",
      cover: [], //活动图
      banner: [], //banner图
      attachment: [], //活动指南
      region: [], //区域
      target: [], //活动对象
      upload: [], //作品上传时间
      recommend: [], //区推荐时间
      review: [], //市审核时间
      exhibit: [] //作品展示时间
    };
  },

  created() {
    if (JSON.parse(sessionStorage.getItem("addActivityForm")) != null) {
      this.addActivityForm = JSON.parse(
        sessionStorage.getItem("addActivityForm")
      );
      if (this.addActivityForm.cover != "") {
        this.cover.push({
          name: this.addActivityForm.cover,
          url: this.addActivityForm.cover
        });
      }
      for (let i in this.addActivityForm.banner) {
        this.banner.push({
          name: this.addActivityForm.banner[i],
          url: this.addActivityForm.banner[i]
        });
      }
      for (let j in this.addActivityForm.attachment) {
        this.attachment.push({
          name: this.addActivityForm.attachment[j],
          url: this.addActivityForm.attachment[j]
        });
      }
      for (let k in this.addActivityForm.region) {
        for (let l in this.regionList) {
          if (this.addActivityForm.region[k] == this.regionList[l].id) {
            this.region.push(this.regionList[l]);
          }
        }
      }
      this.checkAll = this.region.length == this.regionList.length;
      this.isIndeterminate = !(this.region.length == this.regionList.length);
      if (this.addActivityForm.target != "") {
        for (let h in this.targetList) {
          if (this.targetList[h].id == this.addActivityForm.target) {
            this.target.push(this.targetList[h]);
          }
        }
      }
      this.inputtext = this.addActivityForm.content;
      if (this.addActivityForm.upload.stime != undefined) {
        this.upload.push(this.addActivityForm.upload.stime * 1000);
        this.upload.push(this.addActivityForm.upload.etime * 1000);
        console.log("this.upload===", this.upload);
      }
      if (this.addActivityForm.recommend.stime != undefined) {
        this.recommend.push(this.addActivityForm.recommend.stime * 1000);
        this.recommend.push(this.addActivityForm.recommend.etime * 1000);
      }
      if (this.addActivityForm.review.stime != undefined) {
        this.review.push(this.addActivityForm.review.stime * 1000);
        this.review.push(this.addActivityForm.review.etime * 1000);
      }
      if (this.addActivityForm.exhibit.stime != undefined) {
        this.exhibit.push(this.addActivityForm.exhibit.stime * 1000);
        this.exhibit.push(this.addActivityForm.exhibit.etime * 1000);
      }
    }
  },

  computed: {},
  mounted() {},
  methods: {
    //活动名称
    changeTitle() {
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
      console.log(
        "addActivityForm====",
        sessionStorage.getItem("addActivityForm")
      );
    },
    //删除活动项目
    childDelete(index, subIndex) {
      this.addActivityForm.category.forEach((items, index_) => {
        if (index_ == index) {
          items.child.forEach((item, subIndex_) => {
            if (subIndex == subIndex_) {
              items.child.splice(subIndex_, 1);
            }
          });
        }
      });
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    //编辑活动项目
    childEdit(index, subIndex) {
      this.$router.push({
        path: "/activeManager/createActivity/activeEdit",
        query: {
          id: index,
          subId: subIndex,
          operate:1,
        }
      });
    },
    //添加类别
    addCategory() {
      if (this.edit_1 == false) {
        var child = [];
        this.addActivityForm.category.push({
          title: this.title,
          type: 1,
          child: child
        });
        sessionStorage.setItem(
          "addActivityForm",
          JSON.stringify(this.addActivityForm)
        );
      } else {
        this.addActivityForm.category[this.editIndex].title = this.title;
        sessionStorage.setItem(
          "addActivityForm",
          JSON.stringify(this.addActivityForm)
        );
        this.edit_1 = false;
      }
    },
    edit_(index) {
      this.edit_1 = true;
      this.addclassFlag = true;
      this.editIndex = index;
    },
    //删除活动
    deleteTitle(index) {
      this.addActivityForm.category.splice(index, 1);
      sessionStorage.setItem("addActivityForm", JSON.stringify(this.addActivityForm));
    },
    toActiveEdit(index) {
      this.$router.push({
        path: "/activeManager/createActivity/activeEdit",
        query: {
          id: index,
          operate:0,
        }
      });
    },
    // 添加图片
    beforeupload(file) {
      // this.datas={upFile:file.name}
      // console.log(file.name)
      // console.log(file)
    },
    //活动图success
    coverSuccess(response, file, fileList) {
      this.addActivityForm.cover = "";
      fileList.forEach(item => {
        item.response.files.forEach(subItem => {
          this.addActivityForm.cover = this.apipath + subItem.path;
        });
      });
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    //活动图remove
    coverRemove(file, fileList) {
      this.addActivityForm.cover = "";
      fileList.forEach(item => {
        item.files.forEach(subItem => {
          this.cover.push({
            name: this.apipath + subItem.path,
            url: this.apipath + subItem.path
          });
        });
      });
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    //banner
    bannerSuccess(response, file, fileList) {
      this.addActivityForm.banner = [];
      fileList.forEach(item => {
        item.response.files.forEach(subItem => {
          this.addActivityForm.banner.push(this.apipath + subItem.path);
        });
      });
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    //banner图
    bannerRemove(file, fileList) {
      this.addActivityForm.banner = [];
      fileList.forEach(item => {
        item.files.forEach(subItem => {
          this.addActivityForm.banner.push(this.apipath + subItem.path);
        });
      });
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    //活动指南
    attachmentSuccess(response, file, fileList) {
      this.addActivityForm.attachment = [];
      fileList.forEach(item => {
        item.response.files.forEach(ite => {
          this.addActivityForm.attachment.push(this.apipath + ite.path);
        });
      });
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    //上传活动指南
    attachmentRemove(file, fileList) {
      this.addActivityForm.attachment = [];
      fileList.forEach(item => {
        item.files.forEach(ite => {
          this.addActivityForm.attachment.push(this.apipath + ite.path);
        });
      });
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    handlePreview(file) {
      console.log(file);
      window.open(file.url);
    },

    LimitSet(num) {
      this.regionList[this.RegionIndex].val = num;
    },
    selectRegion(index) {
      console.log(index);
      this.number = this.regionList[index].val;
    },
    limitSeting() {
      this.limitSet = true;
    },

    limitSetting() {
      console.log(this.limitSetting);
      if (this.limitSet == false) {
        this.limitSet = true;
      } else {
        this.limitSet = false;
      }
    },
    back() {
      this.$router.go(-1);
    },
    //活动范围全选
    regionCheckAllChange(val) {
      this.region = val ? this.regionList : [];
      this.addActivityForm.region = [];
      for (let i in this.region) {
        this.addActivityForm.region.push(this.region[i].id);
      }
      this.isIndeterminate = false;
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    //活动范围
    regionCheckedChange(value) {
      console.log("value===", value);
      this.addActivityForm.region = [];
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.regionList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.regionList.length;
      this.region = value;
      for (let i in this.region) {
        this.addActivityForm.region.push(this.region[i].id);
      }
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    //活动对象
    targetCheckedChange(val) {
      this.target = [];
      this.target.push(val[val.length - 1]);
      for (let i in this.target) {
        this.addActivityForm.target = this.target[i].id;
      }
      console.log("this===", this.addActivityForm, this.target);
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },

    //提交
    async onSubmit() {
      
      let params=JSON.parse(sessionStorage.getItem('addActivityForm'))
      console.log("params====",params)
      params.url=api.activity
      if(params.title==''){
        this.$message({
            type: 'warning',
            message:"请添加活动标题"
        });
        return
      }
      if(params.content==''){
        this.$message({
            type: 'warning',
            message:"请添加活动介绍"
        });
        return
      }
      if(params.cover==''){
        this.$message({
            type: 'warning',
            message:"请添加活动图"
        });
        return
      }
      if(params.target==''){
        this.$message({
            type: 'warning',
            message:"请选择活动对象"
        });
        return
      }
      if(params.region.length<=0){
        this.$message({
            type: 'warning',
            message:"请选择活动区域"
        });
        return
      }
      if(params.upload.stime==undefined){
        this.$message({
            type: 'warning',
            message:"请选择上传作品时间"
        });
        return
      }
      if(params.recommend.stime==undefined){
        this.$message({
            type: 'warning',
            message:"请选择去推荐时间"
        });
        return
      }
      if(params.review.stime==undefined){
        this.$message({
            type: 'warning',
            message:"请选择市级审核时间"
        });
        return
      }
      if(params.exhibit.stime==undefined){
        this.$message({
            type: 'warning',
            message:"请选择作品展示时间"
        });
        return
      }
      if(params.category.length<=0){
        this.$message({
            type: 'warning',
            message:"请添加活动类别"
        });
        return
      }
      
      await this.axiosPost(params).then(res=>{
        if (res.title!= "") {
          this.$message({
              type: 'success',
              message:"添加活动成功"
          });
          this.addActivityForm= null;
          sessionStorage.setItem(
            "addActivityForm",
            JSON.stringify(this.addActivityForm)
          );
          this.$router.go(-1);
        }else if(res.code==-1){
          this.$message({
              type: 'warning',
              message:res.message
          });
        }
        
      }).catch(err => err);
      
    },
    handlePictureCardPreview() {},

    //富文本内容改变
    editorChange(data) {
      this.addActivityForm.content = data;
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    //上传时间
    uploadChange(val) {
      this.addActivityForm.upload.stime = val[0] / 1000;
      this.addActivityForm.upload.etime = val[1] / 1000;
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    //区推荐时间
    recommendChange(val) {
      this.addActivityForm.recommend.stime = val[0] / 1000;
      this.addActivityForm.recommend.etime = val[1] / 1000;
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    //市审核时间
    reviewChange(val) {
      this.addActivityForm.review.stime = val[0] / 1000;
      this.addActivityForm.review.etime = val[1] / 1000;
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    },
    //作品展示时间
    exhibitChange(val) {
      this.addActivityForm.exhibit.stime = val[0] / 1000;
      this.addActivityForm.exhibit.etime = val[1] / 1000;
      sessionStorage.setItem(
        "addActivityForm",
        JSON.stringify(this.addActivityForm)
      );
    }
  }
};
</script>
<style lang="less" scoped>
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
  cursor: pointer;
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
    cursor: pointer;
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