<template>
  <div>
    <el-upload
    :before-upload="beforeupload"
    :on-success="upsuccess"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :headers="headers"
    :action="action"
    :name="filename"
    
    :limit="1"
    list-type="picture">
   
    <el-button size="small" type="primary">上传头像</el-button>
</el-upload>
  </div>
</template>
<script>
import { getCookie } from '../tools/tools';
export default {
  data() {
    return {
       filename:"upFile",
        headers:{
                'x-api-key':getCookie("x-api-key"),
            },
        action:api.uploadPic,
    };
  },
  methods: {
    handleSuccess(file, fileList) {
      console.log(file, fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log('file.response...', file.response);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
};
</script>