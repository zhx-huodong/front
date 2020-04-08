<template>
  <div class="activity-edit-video-content">
    <video :src="src" controls></video>
  </div>
</template>
<script>
  // 视频内容
  export default {
    props: {
      styleType: { type: Number, default: 1 }, // 模板样式选择。1浅蓝，2蓝方格，3蓝笔
      src: { type: String, required: true }
    }
  };
</script>
<style lang="less">
  .activity-edit-video-content {
    video {
      width: 100%;
    }
  }
</style>
