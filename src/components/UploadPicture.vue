<template>
  <div class="container">
    <div class="operate-button">
      <!-- <el-button @click="uploadFile">上传图片</el-button> -->
      <div class="picture-list">
        <div class="picture-list-items" v-for="(item,index) in pictureList" :key="index">
          <el-image :src="item.url" fit="cover"></el-image>
        </div>
      </div>
      <div class="my-button" @click="uploadFile">
        <p class="el-icon-upload"></p>
        <span>上传图片</span>
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
    uploadType: {
      type: String,
      default() {
        return "picture";
      }
    },
    fileLimit:{
        type:Number,
        default(){
            return 20
        }
    },
    max:{

    }
  },
  data() {
    return {
      validList: ["png", "jpg", "jpeg"],
      pictureList: []
    };
  },
  mounted() {
    if (this.uploadType == "picture") {
      this.validList = ["png", "jpg", "jpeg"];
    } else if (this.uploadType == "video") {
      this.validList = ["mp4"];
    } else if (this.uploadType == "audio") {
      this.validList = ["mp3"];
    }else if(this.uploadType=='work'){
        this.validList=["doc","docx","pdf","xls","xls"]
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
      let picFile = {};
      picFile.url = "https://" + data.Location;
      picFile.name = data.filename;
      this.pictureList.push(picFile);
    }
  }
};
</script>
<style lang="less" >
.operate-button {
  display: flex;
  flex-direction: row;
  .my-button {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: 140px;
    height: 80px;
    border: 1px solid #198af3;
    border-radius: 8px;
    p {
      font-size: 38px;
      color: #198af3;
    }
    span {
      font-size: 14px;
    }
  }
  .my-button:hover {
    box-shadow: 0px 0px 3px #198af3 inset;
  }
  .picture-list {
    display: flex;
    flex-direction: row;
    .picture-list-items {
      margin-right: 10px;
      border: 1px solid #198af3;
      border-radius: 8px;
      width: 140px;
      height: 80px;
      .el-image {
        width: 140px;
        height: 80px;
        border-radius: 8px;
      }
    }
  }
}
</style>