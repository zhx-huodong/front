<template>
  <div class="flow-steps-wrap">
    <div class="process-title">活动流程</div>
    <div class="activity-step">
      <el-steps :active="stageIndex" direction="vertical" process-status="finish" finish-status="success">
        <el-step
          v-for="(item, index) in myStageList"
          :key="index"
          :status="index == stageIndex ? 'finish' : item.status"
          @click.native="onStep(item, index)">
          <template slot="title">
            <div class="step-title">{{index + 1}}</div>
          </template>
          <template slot="description">
            <div class="step-row">{{item.StageName}}</div>
            <div v-if="item.ShowTime">
              {{ timeFormat(item.StartTime * 1000, 'yyyy-MM-dd') }} -
              {{ timeFormat(item.EndTime * 1000, 'yyyy-MM-dd') }}
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>

    <div class="activity-file">
      <div class="file-title">其他活动材料</div>
      <div class="file-wrap" v-if="fileList.length > 0">
        <div class="file-name" v-for="(item, index) in fileList" :key="index" @click="downLodeFile(item)">
          {{item.Name}}
        </div>
      </div>
      <div class="no-data" v-else>暂无</div>
    </div>

    <div class="feedback">
      <el-button type="text" class="feedback-text" @click="dialogVisible = true">有问题请反馈，点击这里</el-button>
      <el-dialog
        title="问题反馈"
        :visible.sync="dialogVisible"
        width="500px"
        :modal-append-to-body="false"
        :append-to-body="false">
        <el-input
          type="textarea"
          :rows="3"
          resize="none"
          placeholder="请输入需要反馈的具体内容"
          v-model="textarea">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="feedbackSubmit" :disabled="lockAct">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'flow-steps',
    props: {
      stage: { type: String },
      stageList: { type: Array, default: [] } // 阶段列表
    },
    data() {
      return {
        activityId: '',
        myStageList: [],
        dialogVisible: false,
        textarea: '',
        fileList: [],
        myStage: '', // 当前阶段
        lockAct: false
      };
    },
    computed: {
      stageIndex() { // 当前处于的阶段索引
        return this.stageList.findIndex(item => item.StageId == this.myStage);
      }
    },
    mounted() {
      this.myStageList = this.stageList.map(item => {
        let stepStartTime = new Date(item.StartTime * 1000);
        let now = this.getNowLastTime();
        if (now < stepStartTime) {
          item.status = 'wait';
        } else {
          item.status = 'success';
        }
        return item;
      });
      this.activityId = this.$route.query.ActivityId;
      this.myStage = this.stage;
      this.getFileList();
    },
    methods: {
      async getFileList() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetActivityPageConf',
          ActivityId: this.activityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        this.fileList = res.Data.AttachmentList || [];
      },
      downLodeFile(item) {
        window.open(item.URL);
      },
      // 提交反馈
      async feedbackSubmit() {
        if (this.lockAct) return;
        this.lockAct = true;
        let res = await this.axiosPost({
          url: '/v1/activity/AddFeedback',
          Content: this.textarea,
          Title: '',
          ActivityId: this.activityId
        }).catch(err => err);
        if (res.ErrorCode === 'OK') {
          this.dialogVisible = false;
          this.textarea = '';
          this.$message({ type: 'success', duration: 2000, message: '提交成功！' });
        } else {
          this.$message({ type: 'error', duration: 2000, message: res.ErrorCode });
        }
        setTimeout(() => {
          this.lockAct = false;
        }, 1000);
      },
      onStep(item, index) {
        let stepStartTime = new Date(item.StartTime * 1000);
        let now = this.getNowLastTime();
        if (now < stepStartTime) return; // 当前时间未到流程的开始时间，不允许切换
        this.myStage = item.StageId;
        this.$emit('changeStage', this.myStage); // 告知阶段改变
      },
      getNowLastTime() {
        let now = new Date();
        now.setHours(23);
        now.setMinutes(23);
        now.setSeconds(59);
        return now;
      }
    }
  };
</script>
<style lang="less">
  .el-popup-parent--hidden {
    overflow: visible;
  }

  .flow-steps-wrap {
    .el-step:hover {
      cursor: pointer;
    }
    .el-step__main {
      display: flex;
    }
    .el-step.is-vertical .el-step__title {
      display: inline-block;
      margin-right: 20px;
    }
    .el-step__description {
      display: inline-block;
      margin-top: 0;
      padding-right: 0;
    }
    .el-dialog {
      border-radius: 4px;
    }
    .el-dialog__footer {
      text-align: center;
    }
    .el-dialog__body {
      padding: 10px 20px;
    }
    // .el-step__main{
    //   margin-top: -8px;
    // }
    .process-title {
      font-size: 16px;
      color: #888888;
      margin-bottom: 52px;
    }
    .activity-step {
      height: 350px;
      .step-title {
        font-size: 45px;
        font-style: italic;
        font-weight: bold;
      }
      .step-row {
        font-size: 18px;
        margin-bottom: 6px;
      }
    }
    .activity-file {
      margin-top: 76px;
      .file-title {
        font-size: 16px;
        margin-bottom: 10px;
        color: #888888;
      }
      .no-data {
        color: #888888;
        font-size: 14px;
      }
      .file-wrap {
        .file-name {
          font-size: 14px;
          color: #2568ED;
          margin-top: 20px;
          cursor: pointer;
        }
      }
    }
    .feedback {
      font-size: 14px;
      color: #2568ED;
      margin-top: 120px;
      .feedback-text {
        color: #2568ED;
      }
    }
    .is-finish {
      color: #2568ED;
      border-color: #2568ED;

    }
    .is-success {
      color: rgba(37, 104, 237, 0.3);
      border-color: rgba(37, 104, 237, 0.3);
    }
    .is-wait {
      color: #DDDDDD;
      border-color: #ddd;
    }
    .no-data {
      font-size: 16px;
      color: #999999;
    }
  }
</style>
