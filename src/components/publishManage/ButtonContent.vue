<template>
  <div class="activity-edit-button-content">
    <div v-if="styleType == 1" :style-type="styleType">
      <span>{{ text }}</span>
    </div>
    <div v-if="styleType == 2" :style-type="styleType">
      <span>{{ text }}</span>
    </div>
    <div v-if="styleType == 3" :style-type="styleType">
      <span>{{ text }}</span>
    </div>
  </div>
</template>
<script>
  // 音频内容（先使用自带的）
  export default {
    props: {
      styleType: { type: Number, default: 1 }, // 模板样式选择。1浅蓝，2蓝方格，3蓝笔
      text: { type: String, required: true }
    }
  };
</script>
<style lang="less">
  .activity-edit-button-content {
    font-weight: 600;
    text-align: center;
    [style-type='1'] {
      padding: 10px 0;
      width: 100%;
      line-height: 30px;
      background-color: #D9F2FF;
      border-radius: 30px;
      color: #2568ED;
      text-align: center;
    }
    [style-type='2'] {
      padding: 10px 0;
      width: 100%;
      line-height: 30px;
      background-color: #2568ED;
      border-radius: 48px;
      color: #FFFFFF;
    }
    [style-type='3'] {
      padding: 10px 0;
      width: 100%;
      line-height: 30px;
      border: 2px solid #2568ED;
      background-color: #F2FBFF;
      border-radius: 8px;
      color: #2568ED;
    }
  }
</style>
