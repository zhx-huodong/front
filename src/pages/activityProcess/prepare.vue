<template>
  <div class="activity-prepare">
    <component-item
      v-for="(item, index) in activityDetailList"
      :type="item.type"
      :name="item.name"
      :text="item.text"
      :url="item.url || ''"
      :key="index"
      :styleType="item.styleType"
      @btnClick="apply">
    </component-item>
    <w-x-login></w-x-login>
  </div>
</template>
<script>
  import ComponentItem from '../../components/publishManage/ComponentItem';
  import WXLogin from '../../components/WXLogin';
  export default {
    name: 'activity-prepare',
    components: { ComponentItem, WXLogin },
    data() {
      return {
        activityId: '',
        activityDetailList: [],
        styleType: 2,
        isShadeShow: true
      };
    },
    mounted() {
      this.activityId = this.$route.query.ActivityId;
      this.getPublicPage();
    },
    methods: {
      async getPublicPage() {
        let res = await this.axiosGet({
          url: '/v1/page/GetPublicPage',
          ActivityId: this.activityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        this.activityDetailList = JSON.parse(res.Data.Content || '{}');
      },
      async apply() {
        let res = await this.axiosPost({
          url: '/v1/activity/ApplyActivity',
          ActivityId: this.activityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        this.$message.success('报名成功');
      }
    }
  };
</script>
<style lang="less">
  .activity-prepare {
    width: 550px;
    margin: 0 auto;
    .component-item {
      position: relative;
      margin-bottom: 20px;
      padding: 10px 5px;
      .activity-edit-button-content:hover {
        cursor: pointer;
      }
    }
  }
</style>
