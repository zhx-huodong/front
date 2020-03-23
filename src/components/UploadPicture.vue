<template>
  <div class="container">
    <div class="operate-button">
      <!-- <el-button @click="uploadFile">上传图片</el-button> -->
      <div class="picture-list">
          
      </div>
      <div class="my-button">
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
  data() {
    return {
      validList: ["png", "jpg", "jpeg"],
      fileLimit: 20
    };
  },
  mounted() {},
  methods: {
    uploadFile() {
      this.$refs.cos.$refs.fileEle.dispatchEvent(new MouseEvent("click"));
    },
    uploadStart() {
      this.$emit("uploading", true);
    },
    uploadSuccess(data) {
      console.log("data===", data);
      // let url = 'https://' + data.Location;
      // this.myUrl = url;
      // this.myText = data.filename;
      // this.$emit('addFile', {
      //   url: url,
      //   name: this.name,
      //   filename: data.filename,
      //   styleType: this.selectedStyleType,
      //   type: this.type
      // });
    }
  }
};
</script>
<style lang="less" scoped>
 .operate-button{
    display: flex;
    flex-direction: row;
    .my-button{
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        align-items: center;
        width: 140px;
        height: 80px;
        border: 1px solid #198AF3;
        border-radius: 8px;
        P{
            font-size: 38px;
            color: #198AF3;
        }
        span{
            font-size: 14px;
        }
    }
    .my-button:hover{
        box-shadow: 0px 0px 3px #198AF3 inset;
    }
}
</style>