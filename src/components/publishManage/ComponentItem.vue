<template>
  <div class="component-item">
    <top-title v-if="type == 'title'" :text="text" :style-type="styleType"></top-title>
    <text-content v-else-if="type == 'content'" :text="text" :style-type="styleType"></text-content>
    <sec-title v-else-if="type == 'secTitle'" :text="text" :style-type="styleType"></sec-title>
    <div v-else-if="type == 'picture'">
      <div class="empty-tip" v-if="!url">请在右侧上传图片</div>
      <img v-else :src="url" style="width: 100%">
    </div>
    <div v-else-if="type == 'video'">
      <div class="empty-tip" v-if="!url">请在右侧上传视频</div>
      <video v-else :src="url" style="width: 100%" controls></video>
    </div>
    <audio-content v-else-if="type == 'audio'" :url="url" :style-type="styleType" :static="static"></audio-content>
    <button-content v-else-if="type == 'button'" :text="text" :style-type="styleType" @click.native="btnClick"></button-content>
    <slot name="action"></slot>
  </div>
</template>
<script>
  import TopTitle from './TopTitle';
  import TextContent from './TextContent';
  import SecTitle from './SecTitle';
  import VideoContent from './VideoContent';
  import AudioContent from './AudioContent';
  import ButtonContent from './ButtonContent';

  export default {
    props: {
      type: { type: String, required: true }, // 组件类型
      name: { type: String, required: true }, // 组件名称
      text: { type: String }, // 组件默认文字
      styleType: { type: Number, default: 1 }, // 模板样式选择。1浅蓝，2蓝方格，3蓝笔
      url: { type: String }, // 图片、音频、视频组件用到
      static: { type: Boolean, default: false } // 静态模式，用于audio
    },
    components: { TopTitle, TextContent, SecTitle, VideoContent, AudioContent, ButtonContent },
    methods: {
      btnClick() {
        this.$emit('btnClick');
      }
    }
  };
</script>
<style lang="less">
  .component-item {
    .empty-tip {
      text-align: center;
      color: #cccccc;
    }
  }
</style>
