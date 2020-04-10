<template>
  <div class="activity-edit-top-title">
    <div v-if="styleType == 1" :style-type="styleType">
      <span>{{ text }}</span>
      <img src="../../public/images/tree.svg" class="img-left">
      <img src="../../public/images/tree2.svg" class="img-right">
    </div>
    <div v-else-if="styleType == 2" :style-type="styleType">
      <img src="../../public/images/flower.svg" class="img-left">
      <img src="../../public/images/flower2.svg" class="img-right">
      <div class="block-text" v-for="t in text">
        <div class="xian shuxian"></div>
        <div class="xian hengxian"></div>
        <span>{{t}}</span>
      </div>
    </div>
    <div v-else-if="styleType == 3" :style-type="styleType">
      <div class="text">{{ text }}</div>
      <img src="../../public/images/pen.svg" alt="">
    </div>
    <div v-else-if="styleType == 4" :style-type="styleType">
      <div class="text">{{ text }}</div>
    </div>
  </div>
</template>
<script>
  // 主标题
  export default {
    props: {
      styleType: { type: Number, default: 1 }, // 模板样式选择。1浅蓝，2蓝方格，3蓝笔
      text: { type: String, required: true }
    },
    data() {
      return {
        textList: []
      };
    }
  };
</script>
<style lang="less">
  .activity-edit-top-title {
    text-align: center;
    white-space: pre-line;
    word-break: break-word;
    [style-type='1'] {
      margin: 0 auto;
      background-color: #D9F2FF;
      border-radius: 20px;
      height: 40px;
      color: #333333;
      font-size: 18px;
      line-height: 40px;
      text-align: center;
      font-weight: 600;
      position: relative;
      img {
        position: absolute;
        bottom: 0;
      }
      .img-left {
        left: 25px;
        width: 20px;
      }
      .img-right {
        right: 25px;
        width: 30px;
      }
    }
    [style-type='2'] {
      margin: 0 auto;
      position: relative;
      height: 40px;
      font-weight: 600;
      display: inline-block;
      .block-text {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid #2568ED;
        text-align: center;
        line-height: 20px;
        margin-right: 5px;
        position: relative;
        span {
          z-index: 2;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
        .xian {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          border: 1px dashed #C9DBFF;
        }
        .shuxian {
          height: 100%;
        }
        .hengxian {
          width: 100%;
        }
      }
      img {
        position: absolute;
        bottom: 5px;
      }
      .img-left {
        left: -24px;
        width: 30px;
      }
      .img-right {
        right: -18px;
        width: 30px;
      }
    }
    [style-type='3'] {
      margin: 0 auto;
      position: relative;
      height: 40px;
      font-weight: 600;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
      }
      .text {
        position: absolute;
        z-index: 2;
        color: #FFFFFF;
        left: 50%;
        top: 50%;
        font-size: 22px;
        width: fit-content;
        transform: translateY(-50%) translateX(-58%);
      }
    }
    [style-type='4'] {
      margin: 0 auto;
      background-color: #D9F2FF;
      border-radius: 20px;
      color: #333333;
      font-size: 18px;
      line-height: 40px;
      text-align: center;
      font-weight: 600;
      position: relative;
    }
  }
</style>
