<template>
  <div :class="[dataObj.isEdit? 'active': 'single-check-box-container',showOperation? 'showOperation':'']">
    <el-row>
      <el-col :span="17" class="title">
        <i v-if="dataObj.required">*</i>
        {{dataObj.title}}
      </el-col>
      <el-col :span="4" :offset="3" class="operate-item" v-if="showOperation">
        <i class="el-icon-top" @click="toUp"></i>
        <i class="el-icon-bottom" @click="toDown"></i>
        <i class="el-icon-edit" @click="toEdit"></i>
        <i class="el-icon-delete" @click="delectItem"></i>
      </el-col>
      <el-col :span="12" :offset="1" style="color:#7F7F7F;">备注：{{dataObj.description}}</el-col>
      <el-col :offset="1">
        <el-radio-group v-model="radioVal">
          <template v-for="(item,index) in dataObj.options">
            <el-radio :label="item.value">{{item.text}}</el-radio>
          </template>
        </el-radio-group>
      </el-col>
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
    dataObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      radioVal: 0
    };
  },
  mounted() {},
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
    }
  }
};
</script>
<style lang="less" scoped>
.single-check-box-container {
  padding: 20px 20px 0 20px;
  border-radius: 10px;
  border: 1px solid rgba(229, 229, 229, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.09);
  margin-top: 10px;
}
.showOperation{
  border: 1px solid rgba(229, 229, 229, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.09);
  margin-top: 10px;
}
.active {
  border: 1px solid rgba(38, 114, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.09);
  padding: 20px 20px 0 20px;
  border-radius: 10px;
  margin-top: 10px;
}
.title {
  color: #323232;
  font-family: 14px;
  i {
    color: red;
    margin-right: 5px;
  }
}
.operate-item {
  i {
    font-size: 24px;
    color: #c5c5c5;
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>