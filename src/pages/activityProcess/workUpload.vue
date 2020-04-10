<template>
  <div class="activity-work-upload">
    <div class="work-title">提交作品</div>
    <div class="line"></div>
    <div
      class="work-hint audio-ing"
      v-if="auditStatus == 'WORK_WAITING_AUDIT'">
      <span>您提交的作品正在审核中…</span>
    </div>
    <div
      class="work-hint audio-no"
      v-if="auditStatus == 'WORK_AUDIT_REJECT' || auditStatus == 'WORK_AUDIT_AI_REJECT'">
      <span>您提交的作品审核不通过！</span>
      <span class="appeal" @click="onAppealVisible">提交申述</span>
    </div>
    <div class="hint-title">
      <span>请输入作品名称</span>
      <el-select class="subject" v-model="TermId" placeholder="选择组别" :disabled="disabled" style="width: 150px">
        <el-option v-for="el in gradeOptions" :key="el.Id" :label="el.Name" :value="el.Id"></el-option>
      </el-select>
      <el-select class="subject" v-model="SubjectId" placeholder="选择学科" :disabled="disabled" style="width: 150px">
        <el-option v-for="el in subjectOptions" :key="el.Id" :label="el.Name" :value="el.Id"></el-option>
      </el-select>
    </div>
    <el-input v-model="workName" placeholder="请输入作品名称" :disabled="disabled" :maxlength="50"></el-input>
    <div class="hint-title">请输入作品简介</div>
    <div class="work-textarea">
      <el-input
        type="textarea"
        :rows="9"
        placeholder="请输入作品简介"
        v-model="textarea"
        :disabled="disabled"
        :maxlength="300"
        resize="none">
      </el-input>
    </div>
    <div class="upload-content">
      <div class="upload-wrap video-wrap">
        <div class="upload-file">
          <el-button type="primary" @click="uploadFile('video')" :disabled="disabled || uploading">
            <span v-if="videoFile.length == 0">上传作品</span>
            <span v-else>替换作品</span>
          </el-button>
          <div class="upload-text">支持mp4格式</div>
        </div>
        <div v-for="(item,index) in videoFile" :key="index" class="file">
          <span class="file-name">{{item.ResourceName}}</span>
          <span class="close" @click="deleteFile('video', index)" v-if="!disabled">
            <img src="../../public/images/icon_close.svg">
          </span>
        </div>
      </div>
      <div class="upload-wrap">
        <div class="upload-file">
          <el-button type="primary" @click="uploadFile('doc')" :disabled="disabled || uploading">学习材料包</el-button>
          <div class="upload-text">支持{{docFileList.join('、')}}格式</div>
        </div>
        <div v-for="(item,index) in docFile" :key="index" class="file">
          <span class="file-name">{{item.ResourceName}}</span>
          <span class="close" @click="deleteFile('doc', index)" v-if="!disabled">
            <img src="../../public/images/icon_close.svg">
          </span>
        </div>
      </div>
    </div>
    <div class="submit">
      <el-button type="primary" @click="submitWork" :disabled="!submitEnable" v-if="!disabled">确认提交</el-button>
    </div>
    <div class="qr-code">
      <vue-qr v-if="h5Url" :size="200" :dotScale="1" :text="h5Url"></vue-qr>
      <div class="code-title">手机扫描查看作品预览页</div>
    </div>
    <cos
      ref="cos"
      :valid-list="validList"
      @start="uploading = true"
      @fail="fileFail"
      @success="fileSuccess"
    ></cos>
    <el-dialog
      title="提交申述"
      :visible.sync="appealVisible"
      width="400px"
      :modal-append-to-body="false"
      :append-to-body="false">
      <el-input type="textarea" :rows="3" resize="none" placeholder="请输入申述的内容" v-model="appealText"></el-input>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitAppeal">提交</el-button>
          <el-button @click="appealVisible = false">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import Cos from '../../components/Cos';
  import VueQr from 'vue-qr';
  export default {
    name: 'activity-work-upload',
    components: { Cos, VueQr },
    props: {
      stage: { type: String } // 状态
    },
    data() {
      return {
        workName: '',
        textarea: '',
        videoFile: [], // 视频列表，目前1个
        docFile: [], // 学习材料列表，支持多个
        nullFile: true,
        QRCode: '', // 二维码
        queryFileList: [],
        activityId: null,
        validList: [],
        videoFileList: ['mp4'],
        docFileList: ['txt', 'pdf', 'doc', 'ppt', 'xls', 'docx', 'xlsx', 'pptx'],
        fileLimit: 200,
        videoName: '',
        videoUrl: '',
        appealVisible: false, // 意见申诉弹框
        auditStatus: '', // 作品审核状态（STAGE_WORK_AUDIT WORK_AUDIT_REJECT WORK_AUDIT_ACCEPT）
        Current: '',
        workId: '',
        gradeOptions: [], // 组别列表
        subjectOptions: [], // 学科列表
        TermId: '',
        SubjectId: '',
        uploadType: '', // 上传类型
        isSubmit: false, // 是否上传了作品
        appealText: '',
        h5Url: '',
        uploading: false // 正在上传
    };
    },
    computed: {
      submitEnable() {
        return this.TermId && this.SubjectId && this.workName && this.textarea &&
          this.videoFile.length > 0 && this.docFile.length > 0;
      },
      disabled() {
        return this.stage == 'STAGE_WORK_AUDIT'; // 作品审核阶段禁用操作
      }
    },
    mounted() {
      this.activityId = this.$route.query.ActivityId;
      this.Current = this.$route.query.Current;
      this.getGradeList();
      this.getSubjectList();
      this.getActivityWorkDetail();
    },
    methods: {
      // 通过ActivityId获取作品详情
      async getActivityWorkDetail() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetWorkDetailByActivityId',
          ActivityId: this.activityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;

        let WorkDetail = res.Data.WorkDetail || {};
        this.workName = WorkDetail.Title;
        this.textarea = WorkDetail.Desc;
        this.workId = WorkDetail.WorkId;
        this.TermId = WorkDetail.TermId;
        this.SubjectId = WorkDetail.SubjectId;
        this.auditStatus = WorkDetail.Status; // 作品审核状态

        this.videoFile = [];
        this.docFile = [];
        let resourse = res.Data.Resource || [];
        for (let file of resourse) {
          if (file.ResourceType == 4) this.videoFile.push(file);
          else if (file.ResourceType == 5) this.docFile.push(file);
        }

        if (WorkDetail.WorkId) {
          let token = this.getCookie('Authorization');
          this.h5Url = `https://${location.hostname}/h5/myWorks?` +
            `ActivityId=${this.activityId}&WorkId=${WorkDetail.WorkId}&token=${token}`;
        }
      },
      async submitWork() {
        if (this.auditStatus == 'STAGE_WORK_AUDIT' ||
          this.auditStatus == 'WORK_AUDIT_REJECT' ||
          this.auditStatus == 'WORK_AUDIT_ACCEPT') { // 更新作品
          let res = await this.axiosPost({
            url: '/v1/activity/UpdateWork',
            ActivityId: +this.activityId,
            WorkId: `${this.workId}`,
            Desc: this.textarea,
            Title: this.workName,
            Category: 1,
            ResourceType: 0,
            ResourceList: this.videoFile.concat(this.docFile),
            Term: this.TermId,
            Subject: this.SubjectId
          }).catch(err => err);
          if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
          else this.$message.success('更新成功');
        } else { // 提交作品
          let res = await this.axiosPost({
            url: '/v1/activity/UploadWork',
            ActivityId: +this.activityId,
            Desc: this.textarea,
            Title: this.workName,
            Category: 1,
            ResourceType: 0,
            ResourceList: this.videoFile.concat(this.docFile),
            Term: this.TermId,
            Subject: this.SubjectId
          }).catch(err => err);
          if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
          this.$message.success('提交成功');
          this.getActivityWorkDetail();
        }
      },
      deleteFile(type, index) {
        if (type == 'video') this.videoFile = [];
        else this.docFile.splice(index, 1);
      },
      fileFail() {
        this.uploading = false;
      },
      fileSuccess(data) {
        this.uploading = false;
        let item = {
          ResourceType: this.uploadType == 'video' ? 4 : 5,
          ResourceName: data.filename,
          ResourceContent: 'https://' + data.Location
        };
        if (this.uploadType == 'video') this.videoFile = [item];
        else this.docFile.push(item);
      },
      uploadFile(type) {
        this.uploadType = type;
        if (type == 'doc') this.validList = this.docFileList;
        else this.validList = this.videoFileList;
        this.$refs.cos.$refs.fileEle.dispatchEvent(new MouseEvent('click'));
      },
      // 意见申诉
      onAppealVisible() {
        this.appealText = '';
        this.appealVisible = true;
      },
      async submitAppeal() {
        let res = await this.axiosPost({
          url: '/v1/activity/WorkAppeal',
          WorkId: this.workId,
          Message: this.appealText
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
        this.$message.success('申诉成功');
        this.appealVisible = false;
      },
      async getGradeList() { // 获取年级信息
        let res = await this.axiosGet({
          url: '/v1/activity/GetGradeGroup'
        }).catch(err => err);
        this.gradeOptions = res.Data.GradeGroup || [];
      },
      async getSubjectList() { // 获取学科信息
        let res = await this.axiosGet({
          url: '/v1/activity/GetSubjectList'
        }).catch(err => err);
        this.subjectOptions = res.Data.SubjectList || [];
      }
    }
  };
</script>
<style lang="less">
  .activity-work-upload {
    width: 690px;
    height: 100%;
    margin-right: 100px;
    .work-title {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .line {
      width: 100%;
      height: 1px;
      background: #E5E5E5;
      margin-top: 20px;
    }
    .work-hint {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      margin-top: 10px;
      padding-left: 15px;
      .appeal {
        color: #2568ED;
        cursor: pointer;
        margin-left: 48px;
      }
    }
    .audio-ing {
      background: rgba(103, 194, 58, 1);
      opacity: 0.49;
      color: #fff;
    }
    .audio-no {
      background: rgba(250, 85, 85, 1);
      opacity: 0.49;
      color: #fff;
    }
    .hint-title {
      font-size: 14px;
      color: #909399;
      margin: 20px 0 10px 0;
      .subject {
        margin-left: 20px;
      }
    }
    .work-textarea {
      margin-bottom: 20px;
    }
    .upload-title {
      font-size: 14px;
      color: #909399;
    }
    .upload-content {
      margin-bottom: 50px;
      .upload-wrap {
        .upload-file {
          display: flex;
          height: 40px;
          .input-button {
            &:hover {
              cursor: pointer;
            }
            width: 138px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            position: relative;
            background: #2568ED;
            text-decoration: none;
            color: #fff;
            font-size: 14px;
            border-radius: 4px;
            box-sizing: border-box;
            z-index: 99;
          }
        }
        .file {
          width: fit-content;
          width: -moz-fit-content;
          height: 24px;
          border-radius: 4px;
          background: #F0F2F5;
          margin-top: 10px;
          .file-name {
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            color: #5A5E66;
            margin-left: 10px;
          }
        }
        .close {
          float: right;
          width: 24px;
          height: 24px;
          text-align: center;
          margin-left: 10px;
          &:hover {
            cursor: pointer;
          }
        }
        .upload-text {
          font-size: 14px;
          color: #DDDDDD;
          margin-left: 10px;
          padding-top: 8px;
        }
      }
      .video-wrap {
        margin-bottom: 20px;
      }
    }
    .qr-code {
      width: 180px;
      height: 180px;
      margin: 50px auto 0 auto;
      .code-title {
        font-size: 14px;
        color: #333;
        margin-bottom: 10px;
        text-align: center;
      }
      img {
        width: 180px;
        height: 180px;
      }
    }
    .submit .el-button--primary{
      width: 100%;
      border: none;
      font-size: 14px;
    }
    .work-submit{
      .el-dialog__footer{
        text-align: center;
      }
      .el-dialog__body{
        padding: 0 20px 10px 20px;
      }
      .el-dialog{
        border-radius: 4px;
      }
      .el-textarea__inner{
        font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
      }
      .el-select{
        width: 120px;
      }
    }
  }
</style>
