<template>
  <div class="container">
    <div class="operate-button">
      <div class="picture-list">
        <div class="picture-list-items" v-for="(item,index) in pictureList" :key="index">
          <el-image :src="item.url" fit="contain" @click="cancelStyle()"></el-image>
          <div class="operate">
            <p class="el-icon-zoom-in" @click="goToPreview(item.url)"></p>
            <p class="el-icon-delete" @click="goToDelete(index)"></p>
          </div>
        </div>
      </div>
      <div class="my-button" @click="uploadFile" v-if="pictureList.length<max">
        <p class="el-icon-upload"></p>
        <span style="font-size:14px;">{{name}}</span>
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
    myPictureList: {
      type: Array,
      default() {
        return [];
      }
    },
    uploadType: {
      type: String,
      default() {
        return "picture";
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
        return 100;
      }
    },
    name: {
      type: String,
      default() {
        return "上传图片";
      }
    }
  },
  data() {
    return {
      validList: ["png", "jpg", "jpeg"],
      pictureList: []
    };
  },
  mounted() {
      setTimeout(()=>{
          if (this.myPictureList.length > 0) {
            this.pictureList = this.myPictureList;
            }
      },3000)
    
    if (this.uploadType == "picture") {
      this.validList = ["png", "jpg", "jpeg"];
    } else if (this.uploadType == "video") {
      this.validList = ["mp3"];
    } else if (this.uploadType == "audio") {
      this.validList = ["mp3"];
    } else if (this.uploadType == "work") {
      this.validList = ["doc", "docx", "pdf", "xls", "xls"];
    } else if (this.uploadType == "zip") {
      this.validList = ["zip"];
    }
  },
  methods: {
    cancelStyle() {
      document.body.style = null;
    },
    //触发文件选择
    uploadFile() {
      this.$refs.cos.$refs.fileEle.dispatchEvent(new MouseEvent("click"));
    },
    uploadStart() {
      this.$emit("uploading", true);
    },
    //上传成功
    uploadSuccess(data) {
      let picFile = {};
      picFile.url = "https://" + data.Location;
      picFile.name = data.filename;
      this.pictureList.push(picFile);
      this.$emit("uploadSuccess", this.pictureList);
      console.log(data);
    },
    //预览
    goToPreview(url) {
      window.open(url);
    },
    //删除
    goToDelete(index) {
      this.pictureList.splice(index, 1);
      this.$emit("uploadSuccess", this.pictureList);
    }
  }
};
</script>
<style lang="less" >
.operate-button {
  display: flex;
  // flex-direction: row;
  flex-wrap: wrap;
  .my-button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-direction: row;
    text-align: center;
    align-items: center;
    padding: 0 10px;
    height: 40px;
    border: 1px solid #198af3;
    border-radius: 8px;
    p {
      font-size: 28px;
      color: #198af3;
    }
    span {
      font-size: 16px;
    }
  }
  .my-button:hover {
    box-shadow: 0px 0px 3px #198af3 inset;
  }
  .picture-list {
    display: flex;
    // flex-direction: row;
    flex-wrap: wrap;
    .picture-list-items {
      position: relative;
      margin-right: 10px;
      border: 1px solid #198af3;
      margin-bottom: 10px;
      border-radius: 8px;
      width: 160px;
      height: 100px;
      .el-image {
        width: 160px;
        height: 100px;
        border-radius: 8px;
      }
      .operate {
        top: 0px;
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        display: none;
        text-align: center;
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.5);
        p {
          font-size: 24px;
          margin: 0 10px;
          color: #fff;
          cursor: pointer;
          line-height: 100px;
        }
      }
    }
    .picture-list-items:hover {
      .operate {
        display: block;
      }
    }
  }
}
</style>