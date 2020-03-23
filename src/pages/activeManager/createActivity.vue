<template>
  <div class="create-activity-container">
    <el-card style="min-height:650px">
      <el-page-header @back="back()" title="返回"></el-page-header>
      <el-divider></el-divider>
      
      <activity-setting></activity-setting>
    </el-card>
  </div>
</template>
<script>
import MyEditor from "../../components/MyEditor";
import ActivitySetting from "./ActivitySetting";
import store from '../../store';
export default {
  components: {
    MyEditor,
    ActivitySetting,
  },
  data() {
    return {
      
    };
  },

  created() {},

  computed: {},
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.create-activity-container {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  .create-activity-body {
    padding: 30px 60px;
  }
}
</style>