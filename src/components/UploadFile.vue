<template>
  <div class="container">
    <div class="file-list">
      <div class="file-list-items" v-for="(item,index) in fileList" :key="index">
        <div class="name-img">
          <el-image :src="fileIconUrl" fit="cover"></el-image>
          <div class="file-name">{{item.name||item.title}}</div>
        </div>

        <div class="file-operate">
          <p @click="goToPreview(item.url)">下载</p>
          <p @click="goToDelete(index)" style="color:red;">删除</p>
        </div>
      </div>
    </div>
    <div class="file-operate-button">
      
      <div class="file-button" @click="uploadFile" v-if="fileList.length<max">
        <p class="el-icon-upload"></p>
        <span>{{name}}</span>
      </div>
      <cos
        ref="cos"
        :valid-list="validList"
        :limit="fileLimit"
        @success="uploadSuccess"
        @start="uploadStart"
      ></cos>
    </div>
  </div>
</template>
<script>
import Cos from "../components/Cos";
export default {
  components: { Cos },
  props: {
    myFileList: {
      type: Array,
      default() {
        return [];
      }
    },
    uploadType: {
      type: String,
      default() {
        return "work";
      }
    },
    fileLimit: {
      type: Number,
      default() {
        return 20;
      }
    },
    max: {
      type: Number,
      default() {
        return 3;
      }
    },
    name: {
      type: String,
      default() {
        return "上传文件";
      }
    }
  },
  data() {
    return {
      validList: ["doc", "docx", "pdf", "xls", "xls"],
      fileList: [],
      fileIconUrl: ""
    };
  },
  mounted() {
    setTimeout(() => {
      if (this.myFileList.length > 0) {
        this.fileList = this.myFileList;
      }
    }, 3000);
    if (this.uploadType == "picture") {
      this.validList = ["png", "jpg", "jpeg"];
      this.fileIconUrl = require("../public/images/file-icon/image.svg");
    } else if (this.uploadType == "video") {
      this.validList = ["mp4"];
      this.fileIconUrl = require("../public/images/file-icon/default.svg");
    } else if (this.uploadType == "audio") {
      this.validList = ["mp3"];
      this.fileIconUrl = require("../public/images/file-icon/default.svg");
    } else if (this.uploadType == "work") {
      this.validList = ["doc", "docx", "pdf", "xls", "xls"];
      this.fileIconUrl = require("../public/images/file-icon/default.svg");
    } else if (this.uploadType == "zip") {
      this.validList = ["zip"];
      this.fileIconUrl = require("../public/images/file-icon/zip.svg");
    }else if(this.uploadType=="all"){
      this.validList = ["png", "jpg", "jpeg","mp4","zip","mp3","doc", "docx", "pdf", "xls", "xls"];
      this.fileIconUrl = require("../public/images/file-icon/default.svg");
    }
  },
  methods: {
    //触发文件选择
    uploadFile() {
      this.$refs.cos.$refs.fileEle.dispatchEvent(new MouseEvent("click"));
    },
    uploadStart() {
      this.$emit("uploading", true);
    },
    //上传成功
    uploadSuccess(data) {
      let myFile = {};
      myFile.url = "https://" + data.Location;
      myFile.name = data.filename;
      this.fileList.push(myFile);
      this.$emit("uploadSuccess", this.fileList);
    },
    //预览
    goToPreview(url) {
      window.open(url);
    },
    //删除
    goToDelete(index) {
      this.fileList.splice(index, 1);
    }
  }
};
</script>
<style lang="less" >
.file-operate-button {
  width: 100%;
  display: flex;
  // flex-direction: column;
  // justify-content: flex-end;
  .file-button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-direction: row;
    text-align: center;
    align-items: center;
    // width: 120px;
    padding: 0 10px;
    height: 35px;
    border: 1px solid #198af3;
    border-radius: 8px;
    p {
      font-size: 28px;
      color: #198af3;
    }
    span {
      font-size: 14px;
    }
  }
  .file-button:hover {
    box-shadow: 0px 0px 3px #198af3 inset;
  }
}
.file-list {
  display: flex;
  flex-direction: column;
  .file-list-items {
    display: flex;
    margin-bottom: 10px;
    border-radius: 4px;
    background-color: #ecf1f6;
    justify-content: space-between;
    line-height: 40px;
    width: 100%;
    height: 40px;
    .name-img {
      display: flex;
      align-items: center;
      .file-name {
        color: #198af3;
        margin-left: 20px;
      }
      .el-image {
        margin-left: 5px;
        width: 30px;
        height: 30px;
      }
    }
    .file-operate {
      display: flex;
      display: none;
      flex-direction: row;
      border-radius: 8px;
      p {
        font-size: 12px;
        margin: 0 20px;
        color: #666;
        cursor: pointer;
        line-height: 40px;
      }
    }
  }
  .file-list-items:hover {
    .file-operate {
      display: block;
      display: flex;
      text-align: center;
      flex-direction: row;
      border-radius: 8px;
      p {
        font-size: 12px;
        margin: 0 20px;
        color: #666;
        cursor: pointer;
        line-height: 40px;
      }
    }
  }
}
</style>