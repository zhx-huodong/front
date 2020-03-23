<template>
  <div class="file-list">
    <div class="file-preview" v-for="(item,index) in fileList" :key="index">
      <div class="icon-name">
        <img :src="fileIconUrl" alt />
        <p>{{item.name||item.title}}</p>
      </div>
      <div class="operate">
        <el-button type="text" @click="onItemClick(item.url)">预览</el-button>
        <el-button type="text">下载</el-button>
      </div>
    </div>
  </div>
</template>
<script>
const validFileFormatReg = /\.(doc|docx|ppt|pptx|xls|xlsx|pdf|jpg|jpeg|bmp|png|zip|rar)$/;
const priviewReg = /\.(doc|docx|ppt|pptx|xls|xlsx|pdf|jpg|jpeg|png|bmp|zip|rar)$/;
const pcPreviewReg = /\.(doc|docx|ppt|pptx|xls|xlsx|pdf|jpg|jpeg|png)$/;
const officeFile = /\.(doc|docx|ppt|pptx|xls|xlsx)$/;
const imageReg = /\.(jpg|jpeg|png)$/;
const j = 1024;
const kb = j;
const mb = kb * j;
const gb = mb * j;
const tb = gb * j;
import wx from "weixin-js-sdk";
export default {
  props: {
    fileList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      fileIconUrl: require("../public/images/file-icon/image.svg")
    };
  },
  mounted() {
    console.log("fileList===", this.fileList);
  },
  methods: {
      onItemClick(url){
          window.open(url)
      }
  }
};
</script>
<style lang="less" scoped>
.file-preview {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ecf1f6;
  border-radius: 4px;
  padding: 5px 10px;
  margin-bottom: 10px;
  .icon-name {
    width: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      height: 30px;
      width: 30px;
    }
    p {
      margin-left: 20px;
    }
  }
  .operate {
  }
}
</style>