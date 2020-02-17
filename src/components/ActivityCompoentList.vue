<template>
  <div class="activity-component">
    <el-card class="activity-component-card">
      <div class="activity-component-content">
        <div v-if="type == 'picture'" class="component-video">
          <img class="video-img" src="../public/images/video-demo.png">
        </div>
        <div v-else-if="type == 'video'" class="component-video">
          <img class="video-img" src="../public/images/video-demo.png">
          <img class="play-img" src="../public/images/video-play.svg">
        </div>
        <div v-else-if="type == 'audio'" class="component-audio">
          <div class="time-left">00:20</div>
          <div class="timeline">
            <div class="time-use"></div>
          </div>
          <div class="time-total">02:20</div>
        </div>
        <component-item
          v-else
          :type="type"
          :name="name"
          :text="text"
          :styleType="styleType"
        ></component-item>
      </div>
      <div class="divider"></div>
      <div class="type-name">{{name}}</div>
    </el-card>
  </div>
</template>
<script>
  // 此组件列表制作展示，不涉及增删改
  import ComponentItem from '../components/publishManage/ComponentItem';
  export default {
    props: {
      type: { type: String, required: true }, // 组件类型
      name: { type: String, required: true }, // 组件名称
      text: { type: String } // 组件默认文字
    },
    components: { ComponentItem },
    data() {
      return {
        videoUrl: 'https://courseware-1259194201.cos.ap-guangzhou.myqcloud.com/1113/4/1566364986-7547264871797397412',
        audioUrl: 'https://saas-develop-1255701415.cos.ap-guangzhou.myqcloud.com/gouzhong.mp3',
        styleType: 2
      };
    }
  };
</script>
<style lang="less">
  .activity-component {
    margin-bottom: 20px;
    .divider {
      height: 1px;
      width: 100%;
      background-color: #E4E7ED;
      margin: 15px 0;
    }
    .type-name {
      color: #666666;
      font-size: 16px;
      text-align: center;
    }
    &-card {
      &:hover {
        cursor: pointer;
      }
    }
    &-content {
      text-align: center;
      .component-video {
        position: relative;
        .video-img {
          width: 100%;
        }
        .play-img {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 40px;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      .component-audio {
        display: flex;
        align-items: center;
        .timeline {
          width: 100%;
          margin: 0 10px;
          height: 6px;
          background: #C9DBFF;
          border-radius: 3px;
          .time-use {
            border-radius: 3px;
            height: 6px;
            background: #2568ED;
            width: 15%;
          }
        }
        .time-left, .time-total {
          color: #BCBCBC;
        }
      }
      .component-button {
        height: 48px;
        background-color: #2568ED;
        border-radius: 48px;
        color: #FFFFFF;
        line-height: 48px;
      }
    }
  }
</style>
