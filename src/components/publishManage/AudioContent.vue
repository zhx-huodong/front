<template>
  <div class="activity-edit-video-content">
    <div v-if="!static && !url" class="empty-tip">请在右侧上传音频</div>
    <div v-else class="audio-box" :style-type="styleType">
      <template v-if="static">
        <div class="num cur-step">00:20</div>
        <div class="duration-box">
          <div class="step-box" ref="step" style="width: 30%"></div>
        </div>
        <div class="num duration">02:20</div>
      </template>
      <template v-else>
        <div class="play-icon" @click.stop="triggerAudio">
          <i class="el-icon-video-play" v-if="status == 1"></i>
          <i class="el-icon-video-pause" v-if="status == 2"></i>
        </div>
        <div class="num cur-step">{{curStep}}</div>
        <div class="duration-box">
          <div class="step-box" ref="step"></div>
        </div>
        <div class="num duration">{{durationStr}}</div>
        <audio ref='myAudio' :src="url" controls style="display: none"></audio>
      </template>
    </div>
  </div>
</template>
<script>
  import { formatTime } from '../../tools/tools';
  export default {
    props: {
      styleType: { type: Number, default: 1 }, // 模板样式选择。1浅蓝，2蓝方格，3蓝笔
      url: { type: String, default: '' },
      static: { type: Boolean, default: false }
    },
    data() {
      return {
        curStep: '00:00', // 当前进度
        duration: 0, // 总时长
        durationStr: '',
        status: 1 // 1暂停 2播放中
      };
    },
    watch: {
      url() {
        setTimeout(() => {
          this.bindAudioEvent();
        });
      }
    },
    mounted() {
      this.bindAudioEvent();
    },
    methods: {
      bindAudioEvent() {
        if (!this.$refs.myAudio) return;
        this.reset();
        this.$refs.myAudio.oncanplay = e => { // 音频加载完成，拿到进度
          this.duration = parseInt(this.$refs.myAudio.duration, 10);
          this.durationStr = formatTime(this.duration);
        };
        this.$refs.myAudio.ontimeupdate = e => {
          let currentTime = parseInt(e.target.currentTime, 10);
          this.curStep = formatTime(currentTime);
          this.$refs.step.style.width = (currentTime / this.duration * 100) + '%';
        };
      },
      triggerAudio() {
        if (this.status == 1) { // 暂停状态，开始播放
          this.$refs.myAudio.play();
          this.status = 2;
        } else { // 播放状态，暂停播放
          this.$refs.myAudio.pause();
          this.status = 1;
        }
      },
      reset() {
        this.curStep = '00:00';
        this.$refs.step.style.width = 0;
        this.status = 1;
      }
    }
  };
</script>
<style lang="less">
  .activity-edit-video-content {
    .audio-box {
      display: flex;
      align-items: center;
      .num {
        color: #BCBCBC
      }
      .play-icon {
        color: #BCBCBC;
        margin-right: 10px;
        font-size: 20px;
      }
      .cur-step {
        margin-right: 10px;
      }
      .duration {
        margin-left: 10px;
      }
    }
    [style-type='1'] {
      .duration-box {
        flex: auto;
        height: 6px;
        background: #D9F2FF;
        border-radius: 4px;
        .step-box {
          width: 0;
          background: #093896;
          border-radius: 4px;
          height: 100%;
        }
      }
    }
    [style-type='2'] {
      .duration-box {
        flex: auto;
        height: 6px;
        background: #C9DBFF;
        border-radius: 4px;
        .step-box {
          width: 0;
          background: #2568ED;
          border-radius: 4px;
          height: 100%;
        }
      }
    }
    [style-type='3'] {
      .duration-box {
        flex: auto;
        height: 6px;
        background: #C9DBFF;
        border-radius: 4px;
        .step-box {
          width: 0;
          background: #2568ED;
          border-radius: 4px;
          height: 100%;
        }
      }
    }
  }
</style>
