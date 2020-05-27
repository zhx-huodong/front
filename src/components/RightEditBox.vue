<template>
  <div class="right-edit-box">
    <div class="edit-box-top">
      <p>{{typeObj[fields[editIndex].type]}}</p>
    </div>
    <div class="edit-box-body">
      <div class="body-title">
        <p>编辑</p>
      </div>
      <el-divider></el-divider>
      <el-row style="margin-top:20px;">
        <!-- <el-col>标题</el-col> -->
        <el-col>标题</el-col>
        <el-col>
          <el-input placeholder="请输入标题" size="small" style="width:300px;" v-model="fields[editIndex].title"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col>备注信息</el-col>
        <el-col>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入标注信息"
            size="small"
            style="width:300px;"
            v-model="fields[editIndex].description"
          ></el-input>
        </el-col>
      </el-row>

      <el-row v-if="fields[editIndex].type==3">
        <el-col :span="5">最大值:</el-col>
        <el-col :span="10">
          <el-input-number v-model="fields[editIndex].maxNumber" controls-position="right" size="small"></el-input-number>
        </el-col>
      </el-row>

      <el-row v-if="fields[editIndex].type==3">
        <el-col :span="5">最小值:</el-col>
        <el-col :span="10">
          <el-input-number v-model="fields[editIndex].minNumber" controls-position="right" size="small"></el-input-number>
        </el-col>
      </el-row>

      <el-row v-if="fields[editIndex].type==7||fields[editIndex].type==8||fields[editIndex].type==9">
        <el-col>选项</el-col>
      </el-row>
      <el-row v-for="(item,index) in fields[editIndex].options" :key="index" v-if="fields[editIndex].type==7||fields[editIndex].type==8||fields[editIndex].type==9">
        <el-col :span="20">
          <el-input placeholder="选项" size="small" style="width:250px;" v-model="item.text"></el-input>
        </el-col>
        <el-col :span="4">
          <i
            class="el-icon-circle-close"
            style="font-size:25px;color:red;cursor:pointer;margin-left:10px"
            @click="delectSubItem(index)"
          ></i>
        </el-col>
      </el-row>

      <el-row v-if="fields[editIndex].type==9||fields[editIndex].type==7||fields[editIndex].type==8">
        <el-col style="margin-top:5px;">
          <el-button type="primary" plain @click="addOption" size="small">添加选项</el-button>
        </el-col>
      </el-row>
      <el-divider v-if="fields[editIndex].type==9||fields[editIndex].type==7||fields[editIndex].type==8"></el-divider>
      <el-row>
        <el-radio-group v-model="fields[editIndex].type" v-if="fields[editIndex].type==7||fields[editIndex].type==8">
          <el-radio :label="7">单选</el-radio>
          <el-radio :label="8">多选</el-radio>
        </el-radio-group>
      </el-row>
      <el-row>
        <el-col>设置</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="8">是否必填</el-col>
        <el-col :span="3" :offset="12">
          <el-switch v-model="fields[editIndex].required"></el-switch>
        </el-col>
      </el-row>
      <el-row style="margin-top:50px;">
        <el-col :span="5"><el-button type="primary" size="small" @click="editConform">确定</el-button></el-col>
      </el-row>
    </div>
    <div class="edit-box-bottom">
      
    </div>
  </div>
</template>
<script>
export default {
  props:{
    fields:{
      type:Array,
      default(){
        return []
      }
    },
    editIndex:{
      type:Number,
      default(){
        return 0
      }
    }
  },
  data() {
    return {
      switchVal: true,
      radioVal: 1,
      typeObj:{'1':'单行输入框','2':'多行输入框','3':'数字输入框','9':'单选下拉框','7':'单选框','8':'多选框'}
    };
  },
  mounted() {},
  methods: {
    //删除
    delectSubItem(val) {
      console.log("删除===");
      this.fields[this.editIndex].options.splice(val,1)
    },
    addOption() {
      this.fields[this.editIndex].options.push({ text: "选项"+(this.fields[this.editIndex].options.length+1), value: this.fields[this.editIndex].options.length+1 })
    },
    editConform(){
      this.$emit("editConform")
    }
  }
};
</script>
<style lang="less" scoped>
.right-edit-box {
  position: fixed;
  top: 0px;
  right: 0;
  width: 350px;
  background: #ffffff;
  height: 100%;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.edit-box-top {
  display: flex;
  p {
    background-color: #1985f3;
    color: #ffffff;
    padding: 5px 10px;
  }
}
.edit-box-body {
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 16px;
  margin-top: 30px;
  .el-divider--horizontal {
    margin: 10px 0;
  }
}
.edit-box-body::-webkit-scrollbar {display:none}
</style>