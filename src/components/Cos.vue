<template>
  <div class="cos">
    <input ref="fileEle" type="file" style="display: none" />
    <div class="progress-show">
      <el-dialog
      :visible.sync="dialogVisible"
      width="600px"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
        <el-progress :text-inside="true" :stroke-width="20" :percentage="percentVal"></el-progress>
      </el-dialog>
    </div>
    
  </div>
</template>
<script>
import COS from "cos-js-sdk-v5";
import axios from "axios";
import config from "../tools/config";
import { getCookie } from "../tools/tools";
import api from "../service/api";
export default {
  props: {
    validList: { type: Array },
    limit: { type: Number, default: 500 }, // 默认200M
    page: { type: String }
  },
  data() {
    return {
      cos: "",
      dialog: "", // 上传中...提示Dialog
      myFile: "",
      cosConfig: config.cosConfig,
      fileList: [],
      dialogVisible:false,
      percentVal:0,
    };
  },
  watch: {
    file(val) {
      this.myFile = val;
      this.upload();
    }
  },
  async mounted() {
    // 初始化实例
    this.cos = new COS({
      getAuthorization(options, callback) {
        // 异步获取临时密钥
        let url = api.getCosKeys;
        axios
          .get(url, {
            headers: {
              "x-api-key": getCookie("x-api-key")
            }
          })
          .then(res => {
            let data = res.data.keys;
            callback({
              TmpSecretId: data.credentials.tmpSecretId,
              TmpSecretKey: data.credentials.tmpSecretKey,
              XCosSecurityToken: data.credentials.sessionToken,
              ExpiredTime: data.expiredTime
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });

    let self = this;
    this.$refs.fileEle.onchange = function() {
      self.myFile = this.files[0];
      self.upload();
    };
  },
  methods: {
    //上传
    async upload() {
      let self = this;
      let file = this.myFile;
      if (!file) return;
      self.$emit("start");
      this.$refs.fileEle.value = "";
      let filename = file.name;
      let names = filename.split(".");
      let type = names[names.length - 1]; // 获取复杂版本的文件类型
      var md = new Date();
      var y = md.getFullYear();
      var m = md.getMonth() + 1;
      var d = md.getDate();
      var key = "file/" + y + m + d + "/" + file.name;
      // 文件类型校验
      if (this.validList.indexOf(type.toLowerCase()) == -1) {
        let validStr = this.validList.join("，");
        this.$message({
          type: "error",
          duration: 2000,
          message: `必须上传文件必须是${validStr}类型`
        });
        return this.$emit("fail");
      }

      //文件大小校验
      let size = parseInt(file.size / (1014 * 1024), 10); // 单位M
      console.log("文件大小===",size,"限制大小===",this.limit)
      if (size > this.limit) {
        this.$message({
          type: "error",
          duration: 2000,
          message: "文件大小超出限制"
        });
        return this.$emit("fail");
      }
      // this.dialog = this.$message({
      //   type: "warning",
      //   showClose: true,
      //   message: "上传中。。。",
      //   duration: 0
      // });
      self.dialogVisible=true
      // Cos分块上传API，适用于大文件上传。
      this.cos.sliceUploadFile(
        {
          Bucket: self.cosConfig.bucket,
          Region: self.cosConfig.region,
          Key: key, // 对象键（Object 的名称），对象在存储桶中的唯一标识
          Body: file,
          onProgress: function(e) {
            console.log('上传进度 ' + Math.round(e.loaded / e.total * 10000)/100 );
            self.percentVal=Math.round(e.loaded / e.total * 10000)/100
          }
        },
        (err, data) => {
          data.filename = filename;
          if (!err) {
            self.$emit("success", data);
          } else {
            self.$emit("fail");
          }
          // if (self.dialog) {
          //   self.dialog.close(); // 关闭上传中的提示...
          // }
          if (self.dialogVisible) {
            self.dialogVisible=false; // 关闭上传中的提示...
            setTimeout(()=>{
              self.percentVal=0
            },1000)
            
          }
          
        }
      );
    }
  }
};
</script>
<style lang="less">
.cos {
  width: 138px;
  height: 40px;
  position: relative;
}
.work-input {
  z-index: 9999;
  position: absolute;
}
.progress-show{
  .el-dialog__header{
    padding: 0;
  }
}
</style>
