<template>
  <div class="activity-list">
    <div class="activity-self" v-for="(item, index) in activityList" :key="index" @click="onActivityDetail(item)">
      <div class="activity-img" v-if="item.ActivityLogo"><img :src="item.ActivityLogo" alt=""></div>
      <div class="activity-img" v-if="item.ResourceList">
        <video :id="index" :src="item.ResourceList[0].ResourceContent"
               loop="loop" x-webkit-airplay="true" webkit-playsinline="true" @click.stop="playVideo(item)"></video>
        <div class="shade" @click.stop="onShade(item, index)" v-show="item.tag"><img
          src="../public/images/play-video.svg" alt=""></div>
      </div>
      <div class="activity-tex">
        <div class="avtive-title">
          <span style="margin-right: 10px">{{item.ActivityName}}</span>
          <template v-if="item.Status">
            <el-tag v-if="item.Status == 'ACTIVITY_FINISHED'" type="danger" size="small">已结束</el-tag>
            <el-tag v-else type="success" size="small">进行中</el-tag>
          </template>
        </div>
        <div class="avtive-title" v-if="item.TeamName">{{item.TeamName}}</div>
        <div class="activity-time" v-if="item.School">{{item.School}}</div>
        <div class="activity-time" v-if="item.StartTime || item.EndTime">{{item.StartTime}}至{{item.EndTime}}</div>
        <div class="activity-time" v-if="item.Sponsor">主办方：{{item.Sponsor}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      activityList: {
        type: Array,
        default() {
          // return 0;
        }
      },
      goToDetail: String
    },
    data() {
      return {
        isShadeShow: true,
        Current: '', // 当前步骤
        activityStageList: [],
        newList: [],
        day: ''
      };
    },
    methods: {
      async onActivityDetail(item) {
        if (this.goToDetail == 'excellentWork') {
          this.$router.push({
            path: '/excellentWork/index',
            query: {
              id: item.ActivityId,
              name: item.ActivityName
            }
          });
        } else if (this.goToDetail == 'activityDetail') {
          this.$router.push({
            path: '/activity/process',
            query: { ActivityId: item.ActivityId }
          });
        } else if (this.goToDetail == 'excellentWorkDetail') {
          this.$router.push({
            path: '/excellentWork/excellentWorkDetail',
            query: {
              WorkId: item.WorkId,
              WorkName: item.Title
            }
          });
        }
      },
      playVideo(item) {
        if (event.target.paused) {
          event.target.play();
        } else {
          event.target.pause();
          item.tag = true;
        }
      },
      onShade(item, index) {
        let video = document.getElementById(index);
        item.tag = false;
        if (video.paused) {
          item.tag = false;
          video.play();
        } else {
          video.pause();
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .activity-list {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    margin-right: -19px;
    margin-bottom: -20px;
    box-sizing: border-box;
    &:hover {
      cursor: pointer;
    }
    .activity-self {
      width: 280px;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.11);
      box-sizing: border-box;
      .activity-img {
        width: 100%;
        height: 139px;
        position: relative;
        img, video {
          width: 100%;
          height: 100%;
        }
        .shade {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          img {
            width: 70px;
            height: 70px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -35px;
            margin-left: -35px;
          }
        }
      }
      .activity-tex {
        text-align: center;
        .avtive-title {
          font-size: 14px;
          color: #333;
          margin: 10px 0;
        }
        .activity-time {
          font-size: 12px;
          color: #888888;
          margin-bottom: 10px;
        }
      }
    }
  }

  .activity-list > * {
    margin-right: 19px;
    margin-bottom: 20px;
  }
</style>
