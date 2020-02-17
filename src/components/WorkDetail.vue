<template>
  <div class="audit-word" v-if="workDetailList">
    <span class="audit-name">{{this.workDetailList.Title}}</span>
    <!--<span class="audit-space">{{this.workDetailList.Category}}</span>-->
    <div class="audit-info">{{this.workDetailList.Desc}}</div>
    <div class="video-wrap" v-for="(item,index) in videoList" :key="index">
      <video
        class="work-video" id="work-video"
        :src="item.ResourceContent" controls
        loop="loop" x-webkit-airplay="true" webkit-playsinline="true"></video>
    </div>
    <div class="docfile">
      <div class="title">学习资料包</div>
      <div class="doc-item" v-for="(item,index) in docList" :key="index">
        <a :download="item.name" :href="item.ResourceContent" target="_blank">{{item.ResourceName}}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    WorkId: Number
  },
  data() {
    return {
      workDetailList: {},
      videoList: [], // 视频
      docList: [], // 学习资料
      isShadeShow: true,
      DivisionId: '' // 分区id
    };
  },
  mounted() {
    this.DivisionId = this.$route.query.DivisionId || '';
    this.onWorkDetail();
  },
  methods: {
    async onWorkDetail() {
      let params = {
        url: '/v1/activity/GetWorkDetail',
        WorkId: this.WorkId
      };
      if (this.DivisionId) params.DivisionId = this.DivisionId;
      let res = await this.axiosGet(params).catch(err => err);
      if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

      this.workDetailList = res.Data.WorkDetail;
      let ResourceList = this.workDetailList.ResourceList;
      for (let item of ResourceList) {
        if (item.ResourceType == 4) this.videoList.push(item);
        else if (item.ResourceType == 5) this.docList.push(item);
      }
      this.$emit('Evaluation', res.Data);
    }
  }
};
</script>
<style lang="less" scoped>
.audit-word {
  .audit-name {
    color: #333333;
    font-weight: bold;
    font-size: 18px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .audit-space {
    color: #333333;
    font-size: 12px;
  }
  .audit-info {
    color: #333333;
    font-size: 14px;
    line-height: 20px;
    margin-top: 6px;
    margin-bottom: 10px;
    word-break: break-all;
  }
  .video-wrap{
    position: relative;
    width: 60%;
    .work-video{
      width: 100%;
    }
    .shade{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      img{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -40px;
        margin-left: -40px;
      }
    }
  }
  .docfile {
    .title {
      font-weight: bold;
      color: #333333;
      margin-bottom: 20px;
      margin-top: 20px;
    }
  }
}
</style>
