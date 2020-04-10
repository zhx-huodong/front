<template>
  <div class="container">
    <!-- 图片 -->
    <div class="picture-items" v-if="type==1">
      <el-image :src="fileObj.url" fit="cover"></el-image>
      <div class="operate">
        <p class="el-icon-zoom-in" @click="goToPreview(fileObj.url)"></p>
      </div>
      <p>{{fileObj.title||fileObj.name}}</p>
    </div>
    <!-- 视频 -->
    <div class="picture-items" v-if="type==2">
      <video :src="fileObj.url"></video>
      <div class="operate">
        <p class="el-icon-video-play" @click="goToPlay(fileObj.url)"></p>
      </div>
      <p>{{fileObj.title||fileObj.name}}</p>
    </div>
    <!-- 文件 -->
    <div class="file-item" v-if="type==3">
      <div class="file-preview">
        <div class="icon-name">
          <img :src="fileIconUrl" alt />
          <p>{{fileObj.title||fileObj.name}}</p>
        </div>
        <div class="operate" v-if="showDownLoad">
          <!-- <el-button type="text" @click="goToDownLoad(fileObj.url)">下载</el-button> -->
          <el-link target="_blank" :href="fileObj.url" :underline="false" style="margin-left:15px">
            <el-button type="text">下载</el-button>
          </el-link>

        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
      :show-close="false"
    >
      <div class="dialog-main">
        <el-image :src="showUrl" v-if="type==1"></el-image>
        <my-video-player :videoSrc="showUrl" ref="MyVideoPlayer" v-if="type==2"></my-video-player>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog" size="small">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
const validFileFormatReg = /\.(doc|docx|ppt|pptx|xls|xlsx|pdf|jpg|jpeg|bmp|png|zip|rar)$/;
const priviewReg = /\.(doc|docx|ppt|pptx|xls|xlsx|pdf|jpg|jpeg|png|bmp|zip|rar)$/;
const pcPreviewReg = /\.(doc|docx|ppt|pptx|xls|xlsx|pdf|jpg|jpeg|png)$/;
const officeFile = /\.(doc|docx|ppt|pptx|xls|xlsx)$/;
const imageReg = /\.(jpg|jpeg|png)$/;
import MyVideoPlayer from "../components/MyVideoPlayer";
export default {
  components: { MyVideoPlayer },
  props: {
    fileObj: {
      type: Object,
      default() {
        return {};
      }
    },
    showDownLoad:{
      type:Boolean,
      default(){
        return true
      }
    }
  },
  data() {
    return {
      fileIconUrl: require("../public/images/file-icon/default.svg"),
      dialogVisible: false,
      type:1,
      showUrl:'',
    };
  },
  mounted() {
    console.log("filePreview===",this.fileObj)
    if(this.extname(this.fileObj.url)=='jpg'||this.extname(this.fileObj.url)=='jpeg'||this.extname(this.fileObj.url)=='png'){
      this.type=1
    }else if(this.extname(this.fileObj.url)=='mp4'){
      this.type=2
    }else if(this.extname(this.fileObj.url)=='zip'){
      this.type=3
      this.fileIconUrl=require('../public/images/file-icon/zip.svg')
    }else{
      this.type=3
      this.fileIconUrl=require('../public/images/file-icon/default.svg')
    }
  },
  methods: {
    //图片预览
    goToPreview(url) {
      this.dialogVisible = true;
      this.showUrl=url
    },
    //视频播放
    goToPlay(url){
      this.dialogVisible = true;
      this.showUrl=url
      setTimeout(() => {
        this.$refs.MyVideoPlayer.onPlayerPlay();
      }, 1000);
    },
    //文件下载
    goToDownLoad(url) {
      // window.open(url)
      var elemIF = document.createElement('iframe')
      elemIF.src = url
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF)
      // let a = document.createElement('a')
      // a.href =url
      // a.click();
    },
    //关闭弹窗
    closeDialog() {
      this.dialogVisible = false;
      if(this.type==2){
        this.$refs.MyVideoPlayer.onPlayerPause();
      }
      
    },
    handleClose(done) {},
  }
};
</script>
<style lang="less" scoped>
.picture-items {
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  width: 160px;
  
  video{
    width: 160px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid #198af3;
    // background: #000;
  }
  p {
    font-size: 14px;
    color: #666;
  }
  .el-image {
    width: 160px;
    height: 100px;
    border: 1px solid #198af3;
    border-radius: 4px;
    // background: #000;
  }
  .operate {
    top: 0px;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    display: none;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    p {
      font-size: 28px;
      margin: 0 10px;
      color: #fff;
      cursor: pointer;
      line-height: 100px;
    }
  }
}
.picture-items:hover {
  .operate {
    display: block;
  }
}
.file-preview {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ecf1f6;
  border-radius: 4px;
  padding-right: 10px;
  margin-bottom: 10px;
  .icon-name {
    // width: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      margin-left: 5px;
      height: 30px;
      width: 30px;
    }
    p {
      margin-left: 10px;
      color: #198af3;
      font-size: 14px;
    }
  }
}
.dialog-main{
  .el-image{
    width: 100%;
  }
}
</style>