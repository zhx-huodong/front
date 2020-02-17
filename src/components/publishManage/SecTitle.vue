<template>
  <div class="activity-edit-sec-title">
    <div v-if="styleType == 1" :style-type="styleType">
      <div class="content">
        <img src="../../public/images/tree2.svg">
        <span class="text">{{ text }}</span>
        <div class="bottom-bg"></div>
      </div>
    </div>
    <div v-if="styleType == 2" :style-type="styleType">
      <span class="text">{{ text }}</span>
      <div class="line line1"></div>
      <div class="line line2"></div>
    </div>
    <div v-if="styleType == 3" :style-type="styleType">
      <div class="content">
        <span class="text">{{ text }}</span>
        <img src="../../public/images/pen2.svg">
        <div class="bottom-bg"></div>
      </div>
    </div>
  </div>
</template>
<script>
  // 段落标题
  export default {
    props: {
      styleType: { type: Number, default: 1 }, // 模板样式选择。1浅蓝，2蓝方格，3蓝笔
      text: { type: String, required: true }
    }
  };
</script>
<style lang="less">
  .activity-edit-sec-title {
    [style-type='1'] {
      display: inline-block;
      color: #333333;
      font-size: 18px;
      text-align: center;
      font-weight: 600;
      .content {
        position: relative;
        display: flex;
        align-items: flex-end;
        padding: 0 4px;
        .text {
          line-height: initial;
          z-index: 1;
        }
        img {
          bottom: 0;
          width: 30px;
          z-index: 1;
        }
        .bottom-bg {
          background-color: #D9F2FF;
          width: 100%;
          height: 6px;
          position: absolute;
          left: 0;
          bottom: 0;
          border-radius: 3px;
        }
      }
    }
    [style-type='2'] {
      position: relative;
      display: inline-block;
      height: 30px;
      font-size: 16px;
      font-weight: 600;
      .line {
        position: absolute;
        width: 100%;
        border: 1px solid #2568ED;
      }
      .line1 {
        width: 100%;
        bottom: 3px;
      }
      .line2 {
        width: 100%;
        bottom: 7px;
      }
    }
    [style-type='3'] {
      display: inline-block;
      color: #333333;
      font-size: 18px;
      text-align: center;
      font-weight: 600;
      .content {
        position: relative;
        display: flex;
        align-items: flex-end;
        padding: 0 4px;
        .text {
          line-height: initial;
          z-index: 1;
        }
        img {
          width: 12px;
          z-index: 1;
          transform: translateY(20%);
        }
        .bottom-bg {
          background-color: #D9F2FF;
          width: 100%;
          height: 6px;
          position: absolute;
          left: 0;
          bottom: 0;
          border-radius: 3px;
        }
      }
    }
  }
</style>
