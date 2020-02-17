<template>
  <div class="my-activity">
    <el-button type="primary" class="btn" @click="handleCreateAtivity">创建活动</el-button>
    <div
      class="list"
      :class="index!=0?'bordertop':''"
      v-for="(item,index) in activityList"
      :key="index"
      @click="handleRedirect(item)">
      <img class="cover" v-if="item.cover" :src="item.cover" />
      <div class="title">
        <span class="title-name">{{item.title}}</span>
        <span class="status unpublished" v-if="item.status=='ACTIVITY_DRAFT'">未发布</span>
        <span class="status inreview" v-if="item.status=='ACTIVITY_WAITING_AUDIT'">审核中</span>
        <span class="status fail" v-if="item.status=='ACTIVITY_AUDIT_REJECT'">审核未通过</span>
        <span class="status abouttobegin" v-if="item.status=='ACTIVITY_NOT_START'">即将开始</span>
        <span class="status progress" v-if="item.status=='ACTIVITY_RUNNING'">进行中</span>
        <span class="status over" v-if="item.status=='ACTIVITY_FINISHED'">已结束</span>
      </div>
      <div class="desc">{{item.desc}}</div>
      <div class="time">{{item.time}}</div>
      <div class="vertical-line"></div>
      <div class="visit_num" :class="item.status==3?'unpublished':''">{{item.visitNum}}</div>
    </div>
    <el-pagination
      background
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      class="paging"
      @current-change="handleCurrentPage"
    ></el-pagination>

    <el-dialog title="创建活动" :visible.sync="dialogVisible" width="545px">
      <el-form label-position="top" label-width="80px" :model="form">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" placeholder="请输入活动名称" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="活动类型" class="inline marginright">
          <el-select v-model="typeValue" placeholder="请选择">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动组别" class="inline marginright">
          <el-select v-model="groupValue" placeholder="请选择">
            <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目" class="inline marginright">
          <el-select v-model="subjectValue" placeholder="请选择">
            <el-option v-for="item in subjectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动模板">
          <el-select v-model="tmplValue" placeholder="请选择">
            <el-option v-for="item in tmplOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动发布范围（参加活动的人员所属范围）" class="selectinline">
          <el-select v-model="provinceValue" placeholder="请选择" class="marginright" @change="handleSelectProvince">
            <el-option v-for="item in provinceOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="cityValue" placeholder="请选择" class="marginright" @change="handleSelectCity">
            <el-option v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="districtValue" placeholder="请选择" class="marginright">
            <el-option v-for="item in districtOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动面向对象" class="selectinline">
          <el-select v-model="roleValue" placeholder="请选择">
            <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleOk">继续创建活动流程</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { timestampToTime } from '../tools/tools';

export default {
  name: 'myActivity',
  data() {
    return {
      activityList: [],
      currentPage: 1,
      pageSize: 6,
      total: 0,
      dialogVisible: false,
      form: {
        name: '',
        type: '',
        group: '',
        subject: '',
        tmpl: '',
        area: '',
        role: '',
        status: ''
      },
      typeValue: '',
      typeOptions: [],
      groupValue: '',
      groupOptions: [],
      subjectValue: '',
      subjectOptions: [],
      tmplValue: '',
      tmplOptions: [],
      provinceValue: '',
      provinceOptions: [],
      cityValue: '',
      cityOptions: [],
      districtValue: '',
      districtOptions: [],
      roleValue: '',
      roleOptions: [
        { value: '11', label: '学生' },
        { value: '12', label: '老师' }
      ],
      nameReg: /^[\u4e00-\u9fa5a-zA-Z0-9]*$/
    };
  },
  mounted() {
    this.getMyCreateActivityList(this.currentPage, this.pageSize);
    this.getActivityType();
    this.getGradeGroup();
    this.getSubjectList();
    this.getTemplateList();
    this.getProvince();
  },
  computed: {
    user() {
      return this.$store.state.account.user;
    }
  },
  methods: {
    handleRedirect(item) {
      let path = '';
      if (item.status == 'ACTIVITY_DRAFT') {
        path = `/myActivityDetail?id=${item.id}&title=${item.title}`;
      } else {
        path = `/myActivity/index?id=${item.id}&title=${item.title}`;
      }
      this.$router.push(path);
    },
    handleCurrentPage(page) {
      this.currentPage = page;
      this.getMyCreateActivityList(this.currentPage, this.pageSize);
    },
    async getMyCreateActivityList(pageNum, pageSize) {
      let res = await this.axiosGet({
        url: '/v1/activity/GetManageActivityList',
        PageNum: pageNum,
        PageSize: pageSize
      }).catch(err => err);
      if (res.ErrorCode != 'OK') return;
      this.activityList = [];
      this.total = res.Data.Total;
      res.Data.ActivityList.forEach(item => {
        this.activityList.push({
          id: item.ActivityId,
          visitNum: item.ViewCount,
          cover: item.ActivityLogo,
          status: item.Status,
          title: item.ActivityName,
          desc: item.ActivityDesc,
          time: `${timestampToTime(item.StartTime, { needUnit: 1 })} - ${timestampToTime(item.EndTime, { needUnit: 1 })}`,
          ActivityType: item.ActivityType,
          GradeGroup: item.GradeGroup,
          Sponsor: item.Sponsor,
          Subject: item.Subject
        });
      });
    },
    async getActivityType() {
      let res = await this.axiosGet({
        url: '/v1/activity/GetActivityType'
      }).catch(err => err);
      if (res.ErrorCode != 'OK') return;
      res.Data.ActivityTypeList.forEach(item => {
        this.typeOptions.push({
          value: item.Id,
          label: item.Name
        });
      });
    },
    async getGradeGroup() {
      let res = await this.axiosGet({
        url: '/v1/activity/GetGradeGroup'
      }).catch(err => err);
      if (res.ErrorCode != 'OK') return;
      this.groupOptions = [];
      res.Data.GradeGroup.forEach(item => {
        this.groupOptions.push({
          value: item.Id,
          label: item.Name
        });
      });
    },
    async getSubjectList() {
      let res = await this.axiosGet({
        url: '/v1/activity/GetSubjectList'
      }).catch(err => err);
      if (res.ErrorCode != 'OK') return;
      this.subjectOptions = [];
      res.Data.SubjectList.forEach(item => {
        this.subjectOptions.push({
          value: item.Id,
          label: item.Name
        });
      });
    },
    async getTemplateList() {
      let res = await this.axiosGet({
        url: '/v1/activity/GetTemplateList'
      }).catch(err => err);
      if (res.ErrorCode != 'OK') return;
      this.tmplOptions = [];
      res.Data.TemplateList.forEach(item => {
        this.tmplOptions.push({
          value: item.TemplateId,
          label: item.TemplateName
        });
      });
    },
    async getProvince() {
      let res = await this.axiosGet({
        url: '/v1/activity/GetProvince'
      }).catch(err => err);
      if (res.ErrorCode != 'OK') return;
      this.provinceOptions = [];
      res.Data.ProvinceList.forEach(item => {
        this.provinceOptions.push({
          value: item.Id,
          label: item.Name
        });
      });
    },
    async getCity() {
      let res = await this.axiosGet({
        url: '/v1/activity/GetCity',
        ProvinceId: this.provinceValue
      }).catch(err => err);
      if (res.ErrorCode != 'OK') return;
      this.cityOptions = [];
      res.Data.CityList.forEach(item => {
        this.cityOptions.push({
          value: item.Id,
          label: item.Name
        });
      });
    },
    async getDistrict() {
      let res = await this.axiosGet({
        url: '/v1/activity/GetDistrict',
        ProvinceId: this.provinceValue,
        CityId: this.cityValue
      }).catch(err => err);
      this.districtOptions = [];
      res.Data.DistrictList.forEach(item => {
        this.districtOptions.push({
          value: item.Id,
          label: item.Name
        });
      });
    },
    async createActivity() {
      if (this.form.name == '') {
        return this.$message.error('请输入活动名称');
      } else if (!this.nameReg.test(this.form.name)) {
        return this.$message.error('活动名称，只支持中英文数字');
      }
      if (this.typeValue == '') {
        return this.$message.error('请选择活动类型');
      }
      if (this.groupValue === '') {
        return this.$message.error('请选择活动组别');
      }
      if (this.subjectValue === '') {
        return this.$message.error('请选择科目');
      }
      if (this.cityValue == '') {
        return this.$message.error('请选择城市');
      }
      if (this.districtValue === '') {
        return this.$message.error('请选择地区');
      }
      if (this.provinceValue == '') {
        return this.$message.error('请选择省份');
      }
      if (this.tmplValue == '') {
        return this.$message.error('请选择活动模板');
      }
      if (this.roleValue == '') {
        return this.$message.error('请选择活动对象');
      }
      let params = {
        url: '/v1/activity/CreateActivity',
        ActivityName: this.form.name,
        ActivityType: this.typeValue,
        GradeGroup: this.groupValue,
        Subject: this.subjectValue,
        ActivityRange: {
          City: this.cityValue,
          District: this.districtValue,
          Province: this.provinceValue
        },
        TemplateId: this.tmplValue.toString(),
        RoleList: [this.roleValue]
      };
      let res = await this.axiosPost(params).catch(err => err);
      if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);
      this.$router.push(`/myActivityDetail?id=${res.Data.ActivityId}`);
    },
    handleSelectProvince() {
      this.getCity();
    },
    handleSelectCity() {
      this.getDistrict();
    },
    handleCreateAtivity() {
      if (this.user) {
        this.dialogVisible = true;
      } else {
        this.$store.dispatch('INIT_SHOW', true);
      }
    },
    handleOk() {
      this.createActivity();
    }
  }
};
</script>

<style lang="less" scoped>
.my-activity {
  width: 80%;
  margin: 20px auto;
  position: relative;

  .btn {
    margin-bottom: 17px;
    width: 88px;
    height: 36px;
    padding: 0;
  }

  .list {
    height: 120px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(221, 221, 221, 1);
    opacity: 1;
    position: relative;
    cursor: pointer;
    &:hover {
      background-color: rgba(208, 208, 208, 0.2);
    }
    &.bordertop {
      border-top: 0;
    }
    .visit_num {
      width: 136px;
      height: 100px;
      text-align: center;
      position: absolute;
      top: 10px;
      line-height: 100px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #fc7400;
      right: 10px;
      &.unpublished {
        color: rgba(203, 203, 203, 1);
      }
    }
    .cover {
      width: 86px;
      height: 86px;
      background: rgba(208, 208, 208, 1);
      opacity: 1;
      position: absolute;
      top: 17px;
      left: 17px;
    }
    .title {
      position: absolute;
      top: 18px;
      left: 116px;
      .status {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 24px;
        color: #ffffff;
        width: 80px;
        height: 24px;
        opacity: 1;
        border-radius: 2px;
        text-align: center;
        display: inline-block;
        position: relative;
        top: -3px;
        left: 10px;
      }
      .progress {
        background: rgba(53, 163, 3, 1);
      }
      .inreview {
        background: rgba(53, 163, 3, 1);
      }
      .over {
        background: rgba(187, 187, 187, 1);
      }
      .unpublished {
        background: #ffb538;
      }
      .abouttobegin {
        background: gray;
      }
      .fail {
        background: rgba(255, 56, 56, 1);
      }
      .title-name {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #101010;
        opacity: 1;
      }
    }
    .vertical-line {
      height: 18px;
      width: 1px;
      background-color: #6f6f6f40;
      position: absolute;
      right: 150px;
      top: 49px;
    }
    .desc {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 14px;
      color: #999999;
      opacity: 1;
      position: absolute;
      left: 116px;
      top: 56px;
      width: 826px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .time {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 14px;
      color: #666666;
      opacity: 1;
      position: absolute;
      left: 116px;
      top: 86px;
    }
  }

  .el-tab-pane {
    height: 1265px;
    position: relative;
    overflow: hidden;
  }
  .paging {
    position: relative;
    margin-bottom: 80px;
    margin-left: -10px;
    top: 20px;
  }

  .el-form-item {
    &.inline {
      display: inline-block;
    }
    &.marginright {
      margin-right: 11px;
    }
    .el-input,
    .el-select {
      width: 442px;
    }
  }
  .inline .el-select,
  .selectinline .el-select {
    width: 140px;
    &.marginright {
      margin-right: 11px;
    }
  }
  .el-dialog__body {
    padding: 30px 44px;
  }
}
</style>
<style lang="less">
.my-activity {
  .el-dialog__header {
    padding-left: 34px;
  }
  .el-dialog__body {
    padding: 10px 44px 0px 44px;
  }
  .el-form-item {
    margin-bottom: 4px;
    & .el-form-item__label {
      padding: 0;
    }
  }
  .el-dialog__title {
    color: rgba(51, 51, 51, 1);
  }
  .el-form-item__label {
    color: rgba(71, 86, 105, 1);
  }
  .el-tabs__content {
    overflow: inherit;
  }
}
</style>
