<template>
  <div :class="[dataObj.isEdit? 'active':'multi-text-box-container',showOperation? '':'no-show']">
    <div class="mark" v-if="!canWrite"></div>
    <el-row>
      <el-col :span="3" class="title">
        <i v-if="dataObj.required">*</i>{{dataObj.title}}：&nbsp;
      </el-col>
      <el-col :span="12">
        <el-input type="textarea" :rows="4" placeholder="请输入内容" style="width:600px;" v-model="val" @input="myValChange"></el-input>
      </el-col>
      <el-col :span="4" :offset="5" class="operate-item" v-if="showOperation">
        <i class="el-icon-top" @click="toUp"></i>
        <i class="el-icon-bottom" @click="toDown"></i>
        <i class="el-icon-edit" @click="toEdit"></i>
        <i class="el-icon-delete" @click="delectItem"></i>
      </el-col>
      <el-col :span="21" :offset="3" style="color:#7F7F7F;line-height:25px;" v-if="dataObj.description!=''">备注：{{dataObj.description}}</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    showOperation:{
      type:Boolean,
      default(){
        return false
      }
    },
    dataObj:{
        type:Object,
        default(){
            return {}
        }
    },
    canWrite:{
      type:Boolean,
      default(){
        return true
      }
    },
    myVal:{
      
    }
  },
  data() {
    return {
      val:''
    };
  },
  mounted() {
    this.val=this.myVal
  },
  methods: {
    //上移
    toUp() {
      this.$emit("toUp");
    },
    //下移
    toDown() {
      this.$emit("toDown");
    },
    //编辑
    toEdit() {
      this.$emit("toEdit");
    },
    //删除
    delectItem() {
      this.$emit("delectItem");
    },
    //自定义内容类型
    myValChange(){
      console.log()
      this.$emit("myValChange",this.val)
    }
  }
};
</script>
<style lang="less" scoped>
.multi-text-box-container {
  padding: 20px 20px 0 20px;
  border-radius: 10px;
  border: 1px solid rgba(229, 229, 229, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.09);
  margin-top: 10px;
  .operate-item{
    display: none;
  }
  position: relative;
  .mark{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    // background-color: blue;
    z-index: 800;
  }
}
.multi-text-box-container:hover,.active:hover{
  .operate-item{
    display: block;
  }
}
.active {
  border: 1px solid rgba(38, 114, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.09);
  padding: 20px 20px 0 20px;
  border-radius: 10px;
  margin-top: 10px;
}
.no-show{
  border: 0;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  margin-top: 0px;
  padding: 0px;
  // padding: 20px 20px 0 20px;
  // border-radius: 10px;
  // border: 1px solid rgba(229, 229, 229, 1);
  // box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  // margin-top: 10px;
}
.title {
  color: #323232;
  font-family: 14px;
  line-height: 25px;
  i {
    color: red;
    margin-right: 5px;
  }
}
.operate-item {
  display: none;
  i {
    font-size: 24px;
    color: #c5c5c5;
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>