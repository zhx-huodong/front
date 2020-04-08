<template>
  <div class="excellent-work-detail">
    <div class="work-title">
      <span class="go-back" @click="$router.back(-1)">待评审的作品</span> / {{ workName }}</div>
    <div class="work-detail-wrap">
      <work-detail class="work-vido" :WorkId="parseInt(workId)" @Evaluation="evaluationListMgr"></work-detail>
      <div v-if="status == 0">
        <div class="aduit-list">评分表</div>
        <div class="aduit-bottom" v-if="status == 0">
          <div class="box" v-for="(item, index) in evaluationList" :key="index">
            <p class="box-btn">{{item.Name}}</p>
            <el-select v-model="item.value" style="width: 100px">
              <el-option v-for="el in optionsList[index]" :key="el" :label="el" :value="el"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="aduit-bottom" v-if="status == 1">
        <div class="aduit-list">评分表</div>
        <div class="box" v-for="(item, index) in evaluationList" :key="index">
          <p class="box-btn">{{item.Name}}</p>
          <span class="store">{{item.Score}}</span>
        </div>
      </div>
      <el-button type="primary" v-if="status == 0" @click="subComment" style="margin-top: 10px">提交评论</el-button>
    </div>
  </div>
</template>
<script>
  import WorkDetail from '../../components/WorkDetail';
  export default {
    components: { WorkDetail },
    data() {
      return {
        workId: '',
        workName: '',
        fullStore: 10,
        innovateStore: 10,
        evaluationList: [],
        optionsList: [],
        workStatus: '',
        DivisionId: ''
      };
    },
    async created() {
      this.workId = this.$route.query.WorkId;
      this.workName = this.$route.query.WorkName;
      this.status = this.$route.query.status;
      this.DivisionId = this.$route.query.DivisionId;
    },
    methods: {
      evaluationListMgr(value) {
        if (!value.ScoreList) return;
        this.evaluationList = value.ScoreList;
        for (let item of this.evaluationList) {
          let min = item.MinScore, max = item.MaxScore;
          let options = [];
          for (let j = min; j <= max; j++) options.push(j);
          this.optionsList.push(options);
        }
      },
      async subComment() {
        let scoreList = [];
        for (let item of this.evaluationList) {
          if (!item.value) return this.$message.error('请将评分表填写完整');
          scoreList.push({
            Name: item.Name,
            Score: item.value
          });
        }
        let res = await this.axiosPost({
          url: '/v1/activity/SetWorkScore',
          WorkId: this.workId,
          ScoreList: scoreList,
          DivisionId: this.DivisionId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        this.$message.success('提交成功');
        this.$router.back(-1);
      }
    }
  };
</script>
<style lang="less" scoped>
  .excellent-work-detail{
    width: 1180px;
    margin: 0 auto;
    .work-title{
      font-size: 12px;
      color: #888888;
      margin-bottom: 20px;
      .go-back {
        &:hover {
          cursor: pointer;
        }
        color: #2568ED;
      }
    }
    .work-detail-wrap{
      padding: 20px;
      border: 1px solid #E5E5E5;
      .work-vido{
        width: 100%;
      }
      .aduit-list {
        color: #333333;
        font-size: 14px;
        margin-top: 15px;
        font-weight: bold;
        padding-bottom: 10px;
      }
      .aduit-bottom {
        width: 70%;
        border-bottom: 1px solid #ebeef5;
        .box {
          border-top: 1px solid #ebeef5;
          display: flex;
          align-items: center;
          .el-select{
            width: 75px;
          }
          .box-btn {
            width: 200px;
            margin-right: 240px;
            color: #606266;
            font-size: 14px;
            display: flex;
            align-items: center;
          }
          .store{
            font-size: 14px;
            color: #909399;
          }
          .el-dropdown{
            width: 75px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #D8DCE6;
            display: flex;
            justify-content: center;
            .el-dropdown-link {
              cursor: pointer;
              color: #909399;
            }
            .el-icon-StoreListow-down {
              font-size: 14px;
              padding-left: 20px;
            }
          }
        }
      }
      .buttom {
        width: 110px;
        height: 40px;
        background-color: #2568ed;
        text-align: center;
        line-height: 40px;
        border-radius: 4px;
        color: #ffffff;
        font-size: 14px;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 10px;
      }
    }
  }
</style>
