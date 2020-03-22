<template>
  <div class="create-activity-container">
    <el-card style="min-height:650px">
      <el-page-header @back="back()" title="返回"></el-page-header>
      <el-divider></el-divider>
      <cos
        ref="cos"
        :valid-list="validList"
        :limit="fileLimit"
        @success="uploadSuccess"
        @start="uploadStart"
      ></cos>
      <el-button @click="uploadFile">上传图片</el-button>
      <activity-setting></activity-setting>
    </el-card>
  </div>
</template>
<script>
import MyEditor from "../../components/MyEditor";
import ActivitySetting from "./ActivitySetting";
import Cos from "../../components/Cos";
export default {
  components: {
    MyEditor,
    ActivitySetting,
    Cos
  },
  data() {
    return {
      validList: ['png', 'jpg', 'jpeg'],
      fileLimit: 20
    };
  },

  created() {},

  computed: {},
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
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.create-activity-container {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  .create-activity-body {
    padding: 30px 60px;
  }
}
</style>