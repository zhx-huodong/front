<template>
  <div class="activity-edit-text-content">
    <div class="container" v-if="styleType == 1" :style-type="styleType">
      <span class="text">{{ text }}</span>
    </div>
    <div class="container" v-if="styleType == 2" :style-type="styleType">
      <div class="text">{{ text }}</div>
      <img src="../../public/images/flower2.svg">
    </div>
    <div class="container" v-if="styleType == 3" :style-type="styleType">
      <div class="text">{{ text }}</div>
      <img src="../../public/images/sanjiao.png" class="sanjiao">
      <img src="../../public/images/pen2.svg">
    </div>
  </div>
</template>
<script>
  // 内容
  export default {
    props: {
      styleType: { type: Number, default: 1 }, // 模板样式选择。1浅蓝，2蓝方格，3蓝笔
      text: { type: String, required: true }
    }
  };
</script>
<style lang="less">
  .activity-edit-text-content {
    height: 100%;
    .container {
      word-break: break-all;
      white-space: pre-line;
    }
    [style-type='1'] {
      background-color: #F2FBFF;
      border-radius: 12px;
      width: 100%;
      color: #888888;
      font-size: 20px;
      padding: 20px 10px;
      box-sizing: border-box;
      text-align: left;
      border: 2px dashed #D9F2FF;
    }
    [style-type='2'] {
      background-color: #F2FBFF;
      border-radius: 12px;
      width: 100%;
      color: #888888;
      font-size: 20px;
      padding: 20px 10px;
      box-sizing: border-box;
      text-align: left;
      border: 2px solid #2568ED;
      text-decoration: dashed;
      position: relative;
      .text {
        line-height: 30px;
        background-image: url("../../public/images/text-line.png");
      }
      img {
        position: absolute;
        width: 40px;
        bottom: 0;
        right: 0;
      }
    }
    [style-type='3'] {
      background-color: #F2FBFF;
      border-radius: 4px;
      width: 100%;
      color: #888888;
      font-size: 20px;
      padding: 20px 10px;
      box-sizing: border-box;
      text-align: left;
      border: 2px solid #2568ED;
      text-decoration: dashed;
      position: relative;
      .text {
        line-height: 30px;
        background-image: url("../../public/images/text-line.png");
      }
      .sanjiao {
        position: absolute;
        width: 25px;
        left: -2px;
        top: -2px;
      }
      img {
        position: absolute;
        width: 30px;
        bottom: 5px;
        right: 10px;
      }
    }
  }
</style>
