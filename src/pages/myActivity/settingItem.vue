<template>
  <div class="activity-setting-item">
    <div class="logo_desc">
      <div class="upload-logo" :class="activityLogo?'logo':''" @click="chooseImg">
        <span v-show="!activityLogo">+添加活动展示预览图</span>
        <img v-show="activityLogo" :src="activityLogo"/>
        <input
          :disabled="!canEdit"
          type="file"
          class="upload-file"
          ref="uploadImgElem"
          @change="uploadImg"
          style="filter:alpha(opacity=0);opacity:0;width: 0;height: 0;"
        />
      </div>
      <div class="detail-desc" :style="detailDescWidth">
        <el-input
          :disabled="!canEdit"
          type="textarea"
          :rows="2"
          placeholder="请输入活动内容介绍"
          v-model="detailDescValue"
          :maxlength="120"
          resize="none"
          show-word-limit
        ></el-input>
      </div>
    </div>
    <p class="tips">根据活动流程需要添加所要展示的页面，设置各环节所需要的配置设置</p>
    <div class="flow flow1" v-show="flow1.show">
      <div class="line1">
        <span class="flow-name">{{flow1.index}}. {{flow1.name}}</span>
        <span class="time-name">对应时间段</span>
        <el-date-picker
          :disabled="!canEdit"
          v-model="flow1.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          :picker-options="pickerOptions"
          @change="handleDateChange('1')"
        ></el-date-picker>
      </div>
      <div class="line"></div>
      <div class="line2">
        <span class="title">活动介绍页</span>
        <el-button type="text" class="first" @click="goToFlow1EditPage()" v-if="canEdit">编辑页面</el-button>
        <el-button type="text" class="second" @click="handleShowFlowQr(1)" v-if="showPagePreview">
          <span>{{flow1.previewName}}</span>
          <vue-qr :text="flow1.qrText" :margin="4" :dotScale="1" v-show="flow1.showQr" class="flow-qr"></vue-qr>
        </el-button>
      </div>
      <div class="line"></div>
      <div class="line3">
        <template v-if="canEdit">
          <el-button @click="chooseAttachment" style="margin-right: 10px">上传其他活动相关附件</el-button>
          <span class="tip">支持excel/word/pdf三种格式</span>
          <input type="file"
                 class="upload-file"
                 ref="uploadAttachmentElem"
                 @change="uploadAttachment"
                 style="filter:alpha(opacity=0);opacity:0;width: 0;height: 0;"/>
          <div
            v-for="(item,index) in flow1.fileList"
            :key="index+'_flow1'"
            class="file"
            @mouseover="handleFileOver(item)"
            @mouseout="handleFileOut(item)">
            <span class="file-name">{{item.name}}</span>
            <span
              class="close"
              v-show="item.showDeleteFileIcon"
              @click="handleDeleteFile(item,index)"
            >x</span>
          </div>
        </template>
        <template v-else>
          <div
            v-for="(item,index) in flow1.fileList"
            :key="index+'_flow1'"
            class="file"
            @mouseover="handleFileOver(item)"
            @mouseout="handleFileOut(item)">
            <span class="file-name">{{item.name}}</span>
          </div>
        </template>
      </div>
    </div>

    <div class="flow flow2" v-show="flow2.show">
      <div class="line1">
        <span class="flow-name">{{flow2.index}}. {{flow2.name}}</span>
        <span class="time-name">对应时间段</span>
        <el-date-picker
          :disabled="!canEdit"
          v-model="flow2.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          @change="handleDateChange('2')"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <!--<div class="line"></div>-->
      <!--<div class="line2">-->
        <!--<span class="title">作品提交页</span>-->
        <!--<el-button type="text" class="first" @click="handleShowFlowQr(2)">-->
          <!--{{flow2.previewName}}-->
          <!--<vue-qr-->
            <!--:text="flow2.qrText"-->
            <!--:margin="4"-->
            <!--:dotScale="1"-->
            <!--v-show="flow2.showQr"-->
            <!--class="flow-qr"-->
          <!--&gt;</vue-qr>-->
        <!--</el-button>-->
      <!--</div>-->
      <!--<div class="line marginbottom"></div>-->
    </div>

    <div class="flow flow3" v-show="flow3.show">
      <div class="line1">
        <span class="flow-name">{{flow3.index}}. {{flow3.name}}</span>
        <span class="time-name">对应时间段</span>
        <el-date-picker
          :disabled="!canEdit"
          v-model="flow3.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          @change="handleDateChange('3')"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
    </div>

    <div class="flow flow4" v-show="flow4.show">
      <div class="line1">
        <span class="flow-name">{{flow4.index}}. {{flow4.name}}</span>
        <span class="time-name">对应时间段</span>
        <el-date-picker
          :disabled="!canEdit"
          v-model="flow4.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          @change="handleDateChange('4')"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
    </div>

    <div class="flow flow5" v-show="flow5.show">
      <div class="line1">
        <span class="flow-name">{{flow5.index}}. {{flow5.name}}</span>
        <span class="time-name">对应时间段</span>
        <el-date-picker
          :disabled="!canEdit"
          v-model="flow5.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          @change="handleDateChange('5')"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <div class="line"></div>
      <p class="flow5-tips">
        <span class="head-name">区名称区学校</span>
        <span class="head-count">可提交人数</span>
      </p>
      <div class="line"></div>
      <div
        class="area-school"
        v-for="(item,index) in flow5.areaAndSchoolList"
        :key="index+'_flow5'"
      >
        <span class="name">{{item.name}}</span>
        <el-input
          :disabled="!canEdit"
          v-model="item.count"
          class="flow5-count"
          @blur="hanleInputBlur('commitCount', item.count)"
        ></el-input>
        <el-button type="text" class="delete" @click="handleDeleteAreaAndSchool(index)" v-if="canEdit">删除</el-button>
        <div class="line"></div>
      </div>
      <el-button type="text" class="add-area-school" @click="handleShowAddAreaAndSchool" v-if="canEdit">+添加区域/学校</el-button>
    </div>

    <div class="flow flow6" v-show="flow6.show">
      <div class="line1">
        <span class="flow-name">{{flow6.index}}. {{flow6.name}}</span>
        <span class="time-name">对应时间段</span>
        <el-date-picker
          :disabled="!canEdit"
          v-model="flow6.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          @change="handleDateChange('6')"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <!--<p class="flow6-tips">添加后专家在评审阶段时将收到短信，可登陆平台进行评审</p>-->
      <div class="line"></div>
      <div class="expert" v-for="(item,index) in flow6.expertList" :key="index+'_flow61'">
        <span class="name">{{item.name}}</span>
        <span class="phone">{{item.phone}}</span>
        <el-button type="text" @click="handleDeleteExpert(index, item.id)" v-if="!readOnly">删除</el-button>
        <div class="line"></div>
      </div>
      <el-button type="text" class="add-expert" @click="handleShowAddExpertDialog" v-if="!readOnly">+添加评委</el-button>
      <p class="flow6-tips">设置评分项目</p>
      <div class="line"></div>
      <div>
        <div class="markproject" v-for="(item,index) in flow6.markProjectList" :key="index+'_flow62'">
          <span class="name">{{item.name}}</span>
          <span class="score">{{item.start}}</span>
          <span class="score sperate">-</span>
          <span class="score">{{item.end}}</span>
          <el-button type="text" class="delete" @click="handleDeleteMarkProject(index)" v-if="canEdit">删除</el-button>
          <div class="line"></div>
        </div>
      </div>
      <div class="add-markproject-container" v-show="showAddMarkproject">
        <el-input v-model="markproject.name" placeholder="请输入评分内容" class="addmp-name"></el-input>
        <el-input v-model="markproject.start" class="addmp-start" @blur="hanleInputBlur('mpstart')"></el-input>
        <span class="score sperate">-</span>
        <el-input v-model="markproject.end" class="addmp-end" @blur="hanleInputBlur('mpend')"></el-input>
        <el-button type="text" class="add" @click="handleAddMarkProject">确定</el-button>
        <el-button type="text" class="delete" @click="handleCancleMarkProject">取消</el-button>
        <div class="line"></div>
      </div>
      <el-button type="text" class="add-markproject" @click="handleShowAddMarkProject" v-if="canEdit">+添加评分项目</el-button>
    </div>

    <div class="flow flow7" v-show="flow7.show">
      <div class="line1">
        <span class="flow-name">{{flow7.index}}. {{flow7.name}}</span>
        <span class="time-name">对应时间段</span>
        <el-date-picker
          :disabled="!canEdit"
          v-model="flow7.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          @change="handleDateChange('7')"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <!--<div class="line"></div>-->
      <!--<div class="line2">-->
        <!--<span class="title">作品展示页面</span>-->
        <!--<el-button type="text" class="first" @click="handleShowFlowQr(7)">-->
          <!--{{flow7.previewName}}-->
          <!--<vue-qr-->
            <!--:text="flow7.qrText"-->
            <!--:margin="4"-->
            <!--:dotScale="1"-->
            <!--v-show="flow7.showQr"-->
            <!--class="flow-qr"-->
          <!--&gt;</vue-qr>-->
        <!--</el-button>-->
      <!--</div>-->
      <!--<div class="line marginbottom"></div>-->
    </div>

    <div class="button-container" v-if="canEdit && !readOnly">
      <el-button v-if="!hidePublish" type="primary" class="save-publish" @click="handleSaveAndPublish">保存并发布</el-button>
      <el-button class="save" @click="handleSave">保存</el-button>
      <el-button class="cancel" @click="handleCancel" v-if="!hidePublish">取消</el-button>
    </div>

    <slot></slot>

    <el-dialog title="添加评委" :visible.sync="dialogVisible" width="409px">
      <el-select v-model="expertValue" multiple placeholder="请选择">
        <el-option
          v-for="item in expertOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddExpert">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加区域/学校" :visible.sync="areaAndSchoolDialogVisible" width="409px">
      <el-tabs v-model="addAreaSchoolType">
        <el-tab-pane label="区域" name="2">
          <el-checkbox
            :indeterminate="areaOpt.isIndeterminate"
            v-model="areaOpt.checkAll"
            @change="handleAreaCheckAll">全选</el-checkbox>
          <el-checkbox-group v-model="checkedAreaSchool" @change="handleAreaCheckedChange">
            <el-checkbox v-for="item in areaOptions" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
        <el-tab-pane label="学校" name="1">
          <el-checkbox
            :indeterminate="schoolOpt.isIndeterminate"
            v-model="schoolOpt.checkAll"
            @change="handleSchoolCheckAll">全选</el-checkbox>
          <el-checkbox-group v-model="checkedAreaSchool" @change="handleSchoolCheckedChange">
            <el-checkbox v-for="item in schoolOptions" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="areaAndSchoolDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddAreaAndSchool">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="裁剪" :visible.sync="cropImgShow" width="500px" top="80px">
      <div class="icon-contain">
        <img @click="bigger" src="../../assets/img/big.png"/>
        <img class="second" @click="smaller" src="../../assets/img/small.png"/>
      </div>
      <vue-cropper
        ref="cropper"
        :img="croperOption.img"
        :outputSize="croperOption.size"
        :fixedBox="true"
        :outputType="croperOption.outputType"
        :info="true"
        :canMoveBox="croperOption.canMoveBox"
        :autoCrop="croperOption.autoCrop"
        :autoCropWidth="croperOption.autoCropWidth"
        :autoCropHeight="croperOption.autoCropHeight"
        style="height:400px;width:90%;margin-left:30px;"
      ></vue-cropper>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cropImgShow = false">取 消</el-button>
        <el-button type="primary" @click="saveCropImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { VueCropper } from 'vue-cropper';
  import SettingItem from './settingItem';
  import { getCosKey, timestampToTime } from '../../tools/tools';
  import Cos from 'cos-js-sdk-v5';
  import VueQr from 'vue-qr';

  export default {
    name: 'activitySettingItem',
    components: { VueCropper, VueQr, SettingItem },
    props: {
      readOnly: { type: Boolean, default: false }, // 是否只读
      hidePublish: { type: Boolean, default: false } // 隐藏保存并发布按钮
    },
    data() {
      return {
        croperOption: {
          img: '',
          size: 1,
          outputType: 'png',
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: 320,
          autoCropHeight: 180,
          fixed: true,
          centerBox: true
        },
        cropImgShow: false,
        cosConfig: {
          bucket: '',
          region: ''
        },
        cos: '',
        isSaveCropImging: false,
        activityId: '',
        activityName: '',
        activityLogo: '',
        activityStatus: '',
        detailDescValue: '',
        detailDescWidth: '',
        flow1: {
          id: 'STAGE_PREPARE',
          index: '',
          show: false,
          name: '',
          time: '',
          config: {},
          fileList: [],
          showQr: false,
          qrText: '',
          previewName: '预览',
          pageUrl: ''
        },
        flow2: {
          id: 'STAGE_WORK_UPLOAD', index: '', show: false, name: '', time: '', config: {},
          showQr: false, qrText: '', previewName: '预览'
        },
        flow3: {
          id: 'STAGE_WORK_AUDIT', index: '', show: false, name: '', time: '', config: {}
        },
        flow4: {
          id: 'STAGE_WORK_SHOW', index: '', show: false, name: '', time: '', config: {}
        },
        flow5: {
          id: 'STAGE_WORK_PRE_JUDGE', index: '', show: false, name: '', time: '', config: {},
          areaAndSchoolList: []
        },
        flow6: {
          id: 'STAGE_WORK_JUDGE', index: '', show: false, name: '', time: '', config: {},
          expertList: [], markProjectList: []
        },
        flow7: {
          id: 'STAGE_EXCELLENT_WORK_SHOW', index: '', show: false, name: '', time: '', config: {},
          showQr: false, qrText: ''
        },
        showAddMarkproject: false,
        markproject: {
          name: '',
          start: 0,
          end: 10
        },
        dialogVisible: false,
        expertValue: '',
        expertOptions: [],
        areaAndSchoolDialogVisible: false,
        checkedAreaSchool: [],
        nameReg: /^[\u4e00-\u9fa5a-zA-Z0-9]*$/,
        numReg: /^\d*$/,
        saveTaskId: '',
        areaAndSchoolOptions: [], // 学校区域列表
        areaOptions: [], // 区域列表
        schoolOptions: [], // 学校列表
        areaOpt: {
          checkAll: false, // 是否全选
          isIndeterminate: false // 是否处于中间状态
        },
        schoolOpt: {
          checkAll: false, // 是否全选
          isIndeterminate: false // 是否处于中间状态
        },
        allAreaId: [],
        allSchoolId: [],
        showPagePreview: false, // 展示活动介绍页预览
        pickerOptions: {
          disabledDate(time) {
            let now = new Date();
            let y = now.getFullYear(),
              m = now.getMonth() + 1,
              d = now.getDate();
            let today = new Date(y + '/' + m + '/' + d + ' 00:00:00');
            return time.getTime() < today.getTime();
          }
        },
        addAreaSchoolType: '2' // 添加区域或学校， 1学校，2区域
      };
    },
    computed: {
      canEdit() {
        return (this.activityStatus == 'ACTIVITY_DRAFT' ||
          this.activityStatus == 'ACTIVITY_WAITING_AUDIT') &&
          !this.readOnly;
      }
    },
    mounted() {
      this.activityId = this.$route.query.id;
      this.getActivityDetail(this.activityId);
      this.getCosBucket();
      this.initCos();
      this.getExpertList();
      this.getQuickDivison();
    },
    destroyed() {
      clearInterval(this.saveTaskId);
    },
    methods: {
      hanleInputBlur(type, value) {
        if (type == 'mpstart') {
          if (!this.numReg.test(this.markproject.start)) {
            this.$message.warning('设置评分项目的起始值，只支持数字类型');
          }
        } else if (type == 'mpend') {
          if (!this.numReg.test(this.markproject.end)) {
            this.$message.warning('设置评分项目的结束值，只支持数字类型');
          }
        } else if (type == 'commitCount') {
          if (!this.numReg.test(value)) {
            this.$message.warning('可提交人数，只支持数字类型');
          }
        }
      },
      goToFlow1EditPage() {
        this.handleSave('interval');
        let path = `/publishManage?id=${this.activityId}`;
        if (typeof this.flow1.pageId != 'undefined') {
          path = `/publishManage?id=${this.activityId}&pageId=${this.flow1.pageId}&previewToken=${this.flow1.previewToken}`;
        }
        this.$router.push(path);
      },
      async handleShowFlowQr(index) {
        if (!this['flow' + index].showQr) {
          // 获取预览code
          let res = await this.axiosGet({
            url: '/v1/page/GetPreviewCode',
            ActivityId: this.activityId
          }).catch(err => err);
          let code = res.Data.Code;
          this.flow1.qrText = this.flow1.qrText.replace('Code=', `Code=${code}`);
          this['flow' + index].previewName = '关闭';
          this['flow' + index].showQr = true;
          console.log(this.flow1.qrText);
        } else {
          this['flow' + index].previewName = '预览';
          this['flow' + index].showQr = false;
        }
      },
      async getCosBucket() {
        let res = await this.axiosGet({
          url: '/v1/resource/costoken'
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;
        this.cosConfig.bucket = res.Data.Name;
        this.cosConfig.region = res.Data.Region;
      },
      async getExpertList() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetExpertList'
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;

        let list = [];
        res.Data.ExpertInfo.forEach(item => {
          list.push({
            value: item.UserId,
            label: item.Username,
            phone: item.Phone
          });
        });
        this.expertOptions = list;
      },
      async getQuickDivison() {
        let res = await this.axiosGet({
          url: '/v1/platform/GetQuickDivison',
          TagName: 'sz_shuoke'
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;
        res.Data.DivisonList.forEach(item => {
          if (item.DivisionType == 1) { // 学校
            this.schoolOptions.push({
              value: item.DivisionId + '',
              label: item.DivisionName
            });
            this.allSchoolId.push(item.DivisionId + '');
          } else if (item.DivisionType == 2) { // 区域
            this.areaOptions.push({
              value: item.DivisionId + '',
              label: item.DivisionName
            });
            this.allAreaId.push(item.DivisionId + '');
          }
          this.areaAndSchoolOptions.push({
            value: item.DivisionId + '',
            label: item.DivisionName
          });
        });
      },
      initCos() {
        let that = this;
        this.cos = new Cos({
          getAuthorization: function(options, callback) {
            that.axiosGet({
              url: '/v1/resource/costoken'
            }).then(res => {
              let data = res.Data;
              callback({
                TmpSecretId: data.TmpSecretId,
                TmpSecretKey: data.TmpSecretKey,
                XCosSecurityToken: data.SessionToken,
                ExpiredTime: data.ExpiredTime
              });
            }).catch(err => {
              that.$message.error(err);
            });
          }
        });
      },
      saveCropImg() {
        if (this.isSaveCropImging) {
          return;
        }
        this.isSaveCropImging = true;
        let that = this;
        let msgObj = that.$message({
          message: '裁剪并上传中...',
          duration: 20000
        });
        // 获取裁剪图片的blob
        this.$refs.cropper.getCropBlob(data => {
          // blob转为file对象
          let file = new window.File([data], that.uploadImgName, { type: that.uploadImgType });
          that.cos.sliceUploadFile({
            Bucket: that.cosConfig.bucket,
            Region: that.cosConfig.region,
            Key: getCosKey(file),
            Body: file
          }, function(err, res) {
            that.isSaveCropImging = false;
            msgObj.close();
            if (!err) {
              that.$message({
                message: '上传成功',
                type: 'success'
              });
              that.activityLogo = location.protocol + '//' + res.Location;
              that.cropImgShow = false;
            }
          });
        });
      },
      bigger() {
        this.$refs.cropper.changeScale(1);
      },
      smaller() {
        this.$refs.cropper.changeScale(-1);
      },
      chooseImg() {
        this.$refs.uploadImgElem.dispatchEvent(new MouseEvent('click'));
      },
      uploadImg() {
        if (this.$refs.uploadImgElem.files.length > 0) {
          let inputFile = this.$refs.uploadImgElem.files[0];
          let type = inputFile.type;
          if (type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png') {
            return this.$message({
              message: '只支持 jpg/jpeg/png 三种格式的图片',
              type: 'error'
            });
          }
          this.uploadImgName = inputFile.name;
          this.uploadImgType = type;
          let reader = new FileReader();
          reader.onload = evt => {
            this.croperOption.img = evt.target.result; // 赋值给裁剪图片参数
            this.cropImgShow = true; // 再显示裁剪框
          };
          reader.readAsDataURL(inputFile);
        }
      },
      chooseAttachment() {
        this.$refs.uploadAttachmentElem.dispatchEvent(new MouseEvent('click'));
      },
      uploadAttachment() {
        if (this.$refs.uploadAttachmentElem.files.length > 0) {
          let inputFile = this.$refs.uploadAttachmentElem.files[0];
          let type = inputFile.type;
          if (type != 'application/vnd.ms-excel' && type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && type != 'application/pdf' && type != 'application/msword' && type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return this.$message({
              message: '只支持 excel/word/pdf 三种格式的文件',
              type: 'error'
            });
          }
          let that = this;
          if (this.isUploadAttachmenting) {
            return;
          }
          this.isUploadAttachmenting = true;
          let msgObj = that.$message({
            message: '上传中...',
            duration: 200000
          });
          that.cos.sliceUploadFile({
            Bucket: that.cosConfig.bucket,
            Region: that.cosConfig.region,
            Key: getCosKey(inputFile),
            Body: inputFile
          }, function(err, res) {
            msgObj.close();
            that.isUploadAttachmenting = false;
            if (!err) {
              that.$message({
                message: '上传成功',
                type: 'success'
              });
              let url = location.protocol + '//' + res.Location;
              let name = inputFile.name;
              that.flow1.fileList.push({
                name: name,
                url: url,
                showDeleteFileIcon: false
              });
            }
          });
        }
      },
      async getActivityDetail(activityId) {
        let res = await this.axiosGet({
          url: '/v1/activity/GetActivityDetail',
          ActivityId: activityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;

        this.showPagePreview = res.Data.HasPage;

        // 每5秒保存一次，只对未发布和审核中的活动
        this.activityStatus = res.Data.Status;
        if (this.activityStatus == 'ACTIVITY_DRAFT' ||
          this.activityStatus == 'ACTIVITY_WAITING_AUDIT' && !this.hidePublish) {
          this.saveTaskId = setInterval(() => {
            this.handleSave('interval');
          }, 5000);
        }

        this.activityName = res.Data.ActivityName;
        this.activityLogo = res.Data.ActivityLogo;
        this.activityType = res.Data.ActivityType;
        this.detailDescValue = res.Data.ActivityDesc;
        this.endTime = res.Data.EndTime;
        this.gradeGroup = res.Data.GradeGroup;
        this.startTime = res.Data.StartTime;
        this.subject = res.Data.Subject;
        // 直接读取数组索引即可，后台已排好序--但foreach更容易理解
        res.Data.StageList.forEach((item, index) => {
          if (item.StageId == this.flow1.id) {
            this.flow1.show = true;
            this.flow1.index = index + 1;
            this.flow1.name = item.StageName;
            this.flow1.startTime = item.StartTime;
            this.flow1.endTime = item.EndTime;
            this.flow1.time = [item.StartTime * 1000, item.EndTime * 1000];
            this.flow1.config = item.Config ? JSON.parse(item.Config) : null;
            if (this.flow1.config) {
              if (this.flow1.config.Attachment) {
                this.flow1.config.Attachment.forEach(curitem => {
                  this.flow1.fileList.push({
                    name: curitem.Name,
                    url: curitem.URL,
                    showDeleteFileIcon: false
                  });
                });
              }
              let url = location.protocol + '//' + location.host + '/h5/';
              if (location.hostname == '127.0.0.1') url = 'https://upclass.educloud.tencent.com/h5/';
              url += `?ActivityId=${this.activityId}&Code=`;
              this.flow1.qrText = url;
            }
          } else if (item.StageId == this.flow2.id) {
            this.flow2.show = true;
            this.flow2.index = index + 1;
            this.flow2.name = item.StageName;
            this.flow2.startTime = item.StartTime;
            this.flow2.endTime = item.EndTime;
            this.flow2.time = [item.StartTime * 1000, item.EndTime * 1000];
            this.flow2.config = item.Config ? JSON.parse(item.Config) : null;
            if (this.flow2.config) {
              this.flow2.qrText = this.flow2.config.PageURL ? this.flow2.config.PageURL : '';
            }
          } else if (item.StageId == this.flow3.id) {
            this.flow3.show = true;
            this.flow3.index = index + 1;
            this.flow3.name = item.StageName;
            this.flow3.startTime = item.StartTime;
            this.flow3.endTime = item.EndTime;
            this.flow3.time = [item.StartTime * 1000, item.EndTime * 1000];
            this.flow3.config = item.Config ? JSON.parse(item.Config) : null;
          } else if (item.StageId == this.flow4.id) {
            this.flow4.show = true;
            this.flow4.index = index + 1;
            this.flow4.name = item.StageName;
            this.flow4.startTime = item.StartTime;
            this.flow4.endTime = item.EndTime;
            this.flow4.time = [item.StartTime * 1000, item.EndTime * 1000];
            this.flow4.config = item.Config ? JSON.parse(item.Config) : null;
          } else if (item.StageId == this.flow5.id) {
            this.flow5.show = true;
            this.flow5.index = index + 1;
            this.flow5.name = item.StageName;
            this.flow5.startTime = item.StartTime;
            this.flow5.endTime = item.EndTime;
            this.flow5.time = [item.StartTime * 1000, item.EndTime * 1000];
            this.flow5.config = item.Config ? JSON.parse(item.Config) : null;
            if (this.flow5.config) {
              if (this.flow5.config.DivisionList) {
                this.flow5.config.DivisionList.forEach(divisionItem => {
                  this.flow5.areaAndSchoolList.push({
                    name: divisionItem.DivisionName,
                    count: divisionItem.WorkNum,
                    id: divisionItem.DivisionID
                  });
                });
              }
            }
          } else if (item.StageId == this.flow6.id) {
            this.flow6.show = true;
            this.flow6.index = index + 1;
            this.flow6.name = item.StageName;
            this.flow6.startTime = item.StartTime;
            this.flow6.endTime = item.EndTime;
            this.flow6.time = [item.StartTime * 1000, item.EndTime * 1000];
            this.flow6.config = item.Config ? JSON.parse(item.Config) : null;
            if (this.flow6.config) {
              if (this.flow6.config.JudgeList) {
                let list = [];
                this.flow6.config.JudgeList.forEach(judgeItem => {
                  list.push({
                    name: judgeItem.UserName,
                    phone: judgeItem.Phone,
                    id: judgeItem.UserID
                  });
                });
                this.flow6.expertList = list;
              }
              if (this.flow6.config.EvaluationList) {
                let list = [];
                this.flow6.config.EvaluationList.forEach(evaluationItem => {
                  list.push({
                    name: evaluationItem.Name,
                    start: evaluationItem.MinScore,
                    end: evaluationItem.MaxScore
                  });
                });
                this.flow6.markProjectList = list;
              }
            }
          } else if (item.StageId == this.flow7.id) {
            this.flow7.show = true;
            this.flow7.index = index + 1;
            this.flow7.name = item.StageName;
            this.flow7.startTime = item.StartTime;
            this.flow7.endTime = item.EndTime;
            this.flow7.time = [item.StartTime * 1000, item.EndTime * 1000];
            this.flow7.config = item.Config ? JSON.parse(item.Config) : null;
            if (this.flow7.config) {
              this.flow7.qrText = this.flow7.config.PageURL ? this.flow7.config.PageURL : '';
            }
          }
        });
      },
      handleFileOver(item) {
        item.showDeleteFileIcon = true;
      },
      handleFileOut(item) {
        item.showDeleteFileIcon = false;
      },
      handleDeleteFile(item, index) {
        this.flow1.fileList.splice(index, 1);
      },
      handleSaveAndPublish() {
        this.handleSave('publish');
      },
      async handleSave(type) {
        let stageList = [];
        let validatePass = true;
        if (this.flow1.show) {
          this.flow1.config.Attachment = [];
          this.flow1.fileList.forEach(item => {
            this.flow1.config.Attachment.push({
              Name: item.name,
              URL: item.url
            });
          });
          stageList.push({
            Config: JSON.stringify(this.flow1.config),
            EndTime: this.flow1.endTime,
            StageId: this.flow1.id,
            StageName: this.flow1.name,
            StartTime: this.flow1.startTime
          });
        }
        if (this.flow2.show) {
          stageList.push({
            Config: JSON.stringify(this.flow2.config),
            EndTime: this.flow2.endTime,
            StageId: this.flow2.id,
            StageName: this.flow2.name,
            StartTime: this.flow2.startTime
          });
        }
        if (this.flow3.show) {
          stageList.push({
            Config: JSON.stringify(this.flow3.config),
            EndTime: this.flow3.endTime,
            StageId: this.flow3.id,
            StageName: this.flow3.name,
            StartTime: this.flow3.startTime
          });
        }
        if (this.flow4.show) {
          stageList.push({
            Config: JSON.stringify(this.flow4.config),
            EndTime: this.flow4.endTime,
            StageId: this.flow4.id,
            StageName: this.flow4.name,
            StartTime: this.flow4.startTime
          });
        }
        if (this.flow5.show) {
          this.flow5.config.DivisionList = [];
          for (let i = 0; i < this.flow5.areaAndSchoolList.length; i++) {
            if (!this.numReg.test(this.flow5.areaAndSchoolList[i].count)) {
              validatePass = false;
              break;
            }
          }
          if (!validatePass) {
            return this.$message.error('可提交人数，只支持数字类型');
          }
          this.flow5.areaAndSchoolList.forEach(areaAndSchoolItem => {
            this.flow5.config.DivisionList.push({
              DivisionID: Number(areaAndSchoolItem.id),
              DivisionName: areaAndSchoolItem.name,
              WorkNum: Number(areaAndSchoolItem.count)
            });
          });
          stageList.push({
            Config: JSON.stringify(this.flow5.config),
            EndTime: this.flow5.endTime,
            StageId: this.flow5.id,
            StageName: this.flow5.name,
            StartTime: this.flow5.startTime
          });
        }
        if (this.flow6.show) {
          this.flow6.config.JudgeList = [];
          this.flow6.expertList.forEach(expertItem => {
            this.flow6.config.JudgeList.push({
              UserName: expertItem.name,
              Phone: expertItem.phone,
              UserId: expertItem.id
            });
          });
          for (let i = 0; i < this.flow6.markProjectList.length; i++) {
            let item = this.flow6.markProjectList[i];
            if (!this.numReg.test(item.start) || !this.numReg.test(item.end)) {
              validatePass = false;
              break;
            }
          }
          if (!validatePass) {
            return this.$message.error('设置评分项目的起始和结束，只支持数字类型');
          }
          this.flow6.config.EvaluationList = [];
          this.flow6.markProjectList.forEach(markProjectItem => {
            this.flow6.config.EvaluationList.push({
              Name: markProjectItem.name,
              MinScore: Number(markProjectItem.start),
              MaxScore: Number(markProjectItem.end)
            });
          });
          stageList.push({
            Config: JSON.stringify(this.flow6.config),
            EndTime: this.flow6.endTime,
            StageId: this.flow6.id,
            StageName: this.flow6.name,
            StartTime: this.flow6.startTime
          });
        }
        if (this.flow7.show) {
          stageList.push({
            Config: JSON.stringify(this.flow7.config),
            EndTime: this.flow7.endTime,
            StageId: this.flow7.id,
            StageName: this.flow7.name,
            StartTime: this.flow7.startTime
          });
        }
        if (type != 'interval' && !this.activityLogo) return this.$message.error('必须上传活动封面');
        let params = {
          url: '/v1/activity/UpdateActivity',
          ActivityId: Number(this.activityId),
          ActivityLogo: this.activityLogo,
          ActivityDesc: this.detailDescValue,
          ActivityName: this.activityName,
          ActivityType: Number(this.activityType),
          EndTime: this.endTime,
          GradeGroup: this.gradeGroup,
          StartTime: this.startTime,
          Subject: this.subject,
          StageList: stageList
        };
        let successMsg = '保存成功';
        if (type == 'publish') {
          params.Status = 'ACTIVITY_WAITING_AUDIT';
          successMsg = '保存并发布成功';
        }
        let res = await this.axiosPost(params).catch(err => err);
        if (res.ErrorCode != 'OK') {
          clearInterval(this.saveTaskId);
          return this.$message.error(res.ErrorMsg);
        }
        if (type != 'interval') this.$message.success(successMsg);
        if (type == 'publish') {
          setTimeout(() => {
            this.$router.back(-1); // 返回上一页
          }, 1500);
        }
      },
      handleCancel() {
        this.$router.push('/myActivity');
      },
      handleShowAddMarkProject() {
        this.markproject.Name = '';
        this.showAddMarkproject = true;
      },
      handleAddMarkProject() {
        if (this.markproject.name == '') return this.$message.warning('请输入评分项目名称');
        if (!this.nameReg.test(this.markproject.name)) this.$message.warning('评分项目名称，只支持中英文数字');

        this.flow6.markProjectList.push({
          name: this.markproject.name,
          start: this.markproject.start,
          end: this.markproject.end
        });
        this.markproject.name = '';
        this.showAddMarkproject = false;
      },
      handleDeleteMarkProject(index) {
        this.flow6.markProjectList.splice(index, 1);
      },
      handleCancleMarkProject() {
        this.showAddMarkproject = false;
      },
      async handleDeleteExpert(index, id) {
        let res = await this.axiosPost({
          url: '/v1/activity/RemoveJudge',
          ActivityId: this.activityId,
          JudgeList: [{ UserId: id }]
        }).catch(err => err);
        if (res.ErrorCode == 'OK') {
          this.$message.success('删除评委成功');
          this.flow6.expertList.splice(index, 1);
        } else {
          this.$message.error(`删除评委失败:[${res.ErrorMsg}][code=${res.ErrorCode}]`);
        }
      },
      handleShowAddExpertDialog() {
        this.dialogVisible = true;
      },
      async handleAddExpert() {
        if (this.expertValue.length > 0) {
          let userIds = [];
          this.expertValue.forEach(value => {
            userIds.push({
              UserId: value
            });
          });
          let res = await this.axiosPost({
            url: '/v1/activity/AddJudge',
            ActivityId: this.activityId,
            JudgeList: userIds
          }).catch(err => err);
          if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

          this.expertValue = [];
          this.$message.success('添加评委成功');
          this.getActivityDetail(this.activityId);
        }
        this.dialogVisible = false;
      },
      handleShowAddAreaAndSchool() {
        this.areaAndSchoolDialogVisible = true;
      },
      handleAreaCheckAll(val) {
        this.checkedAreaSchool = val ? this.allAreaId : [];
        this.areaOpt.isIndeterminate = false;
      },
      handleSchoolCheckAll(val) {
        this.checkedAreaSchool = val ? this.allSchoolId : [];
        this.schoolOpt.isIndeterminate = false;
      },
      handleAreaCheckedChange(val) {
        let checkedCount = val.length;
        this.areaOpt.checkAll = checkedCount === this.allAreaId.length;
        this.areaOpt.isIndeterminate = checkedCount > 0 && checkedCount < this.allAreaId.length;
      },
      handleSchoolCheckedChange(val) {
        let checkedCount = val.length;
        this.schoolOpt.checkAll = checkedCount === this.allSchoolId.length;
        this.schoolOpt.isIndeterminate = checkedCount > 0 && checkedCount < this.allSchoolId.length;
      },
      handleAddAreaAndSchool() {
        let selected = [];
        if (this.checkedAreaSchool.length > 0) {
          // 去重
          for (let i = 0; i < this.flow5.areaAndSchoolList.length; i++) {
            for (let j = 0; j < this.checkedAreaSchool.length; j++) {
              if (this.flow5.areaAndSchoolList[i].id == this.checkedAreaSchool[j]) {
                this.checkedAreaSchool.splice(j, 1);
                break;
              }
            }
          }
          this.checkedAreaSchool.forEach(item => {
            for (let i = 0; i < this.areaAndSchoolOptions.length; i++) {
              if (this.areaAndSchoolOptions[i].value == item) {
                let cur = this.areaAndSchoolOptions[i];
                selected.push({
                  name: cur.label,
                  count: cur.count ? cur.count : 0,
                  id: cur.value
                });
                break;
              }
            }
          });
          this.flow5.areaAndSchoolList = this.flow5.areaAndSchoolList.concat(selected);
        }
        this.areaAndSchoolDialogVisible = false;
      },
      handleDeleteAreaAndSchool(index) {
        this.flow5.areaAndSchoolList.splice(index, 1);
      },
      handleDateChange(index) {
        let item = this[`flow${index}`];
        item.startTime = timestampToTime(Math.floor(item.time[0] / 1000), { dateZero: 1 });
        item.endTime = timestampToTime(Math.floor(item.time[1] / 1000), { dateZero: 1 });
        item.startTime = Math.floor(new Date(`${item.startTime}T00:00:00`).getTime() / 1000);
        item.endTime = Math.floor(new Date(`${item.endTime}T23:59:59`).getTime() / 1000);
      }
    }
  };
</script>
<style lang="less">
  .activity-setting-item {
    .logo_desc {
      position: relative;
      top: 20px;
      height: 130px;
      display: flex;
    }
    .upload-logo {
      margin-right: 15px;
      width: 260px;
      height: 140px;
      background: #ffffff;
      border: 1px solid #707070;
      opacity: 1;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #0000004f;
      text-align: center;
      display: inline-block;
      &.logo {
        border: none;
      }
      span {
        position: relative;
        top: 42px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .detail-desc {
      height: 130px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(185, 185, 185, 1);
      opacity: 1;
      display: inline-block;
      flex: 1;
    }

    .el-textarea__inner {
      width: 98%;
      height: 92px;
      background: #ffffff;
      border: 1px solid #c0ccda;
      opacity: 1;
      border-radius: 4px;
      margin: 0 1%;
      position: relative;
      top: 22px;
    }
    .el-button {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 14px;
      color: rgba(41, 73, 253, 1);
      position: relative;
    }

    .tips {
      font-size: 15px;
      font-family: Arial;
      font-weight: normal;
      line-height: 14px;
      color: rgba(2, 2, 2, 1);
      opacity: 1;
      margin: 40px 0 20px 0;
    }

    .flow {
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(185, 185, 185, 1);
      opacity: 1;
      padding-left: 24px;
    }
    .flow1,
    .flow2,
    .flow3,
    .flow4,
    .flow5,
    .flow6,
    .flow7 {
      margin: 20px 0;
    }
    .flow-name {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 14px;
      color: rgba(0, 0, 0, 1);
      opacity: 1;
    }
    .time-name {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(71, 86, 105, 1);
      margin: 0 20px 0 40px;
    }
    .line {
      width: 70%;
      height: 1px;
      opacity: 0.38;
      background-color: #707070;
      &.marginbottom {
        margin-bottom: 30px;
      }
    }
    .line1 {
      margin: 29px 0;
    }
    .line2 {
      margin: 9px 0;
      position: relative;
      .title {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      .el-button.first {
        margin-left: 50%;
      }
      .el-button.second {
        margin-left: 30px;
      }
    }
    .line3 {
      margin: 9px 0;
      .el-button {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 14px;
        color: rgba(31, 45, 61, 1);
        opacity: 1;
      }
      .file {
        width: 66%;
        padding: 5px 10px;
        margin: 10px 0;
        &:hover {
          background-color: rgba(248, 248, 248, 1);
        }
      }
      .name {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 47px;
        color: rgba(102, 102, 102, 1);
      }
      .close {
        float: right;
        color: rgba(102, 102, 102, 1);
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
    }

    .flow6-tips {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 14px;
      color: rgba(153, 153, 153, 1);
      opacity: 1;
    }
    .expert {
      .name {
        margin-left: 14px;
      }
      .phone {
        margin-left: 64px;
      }
      .name,
      .phone {
        line-height: 35px;
        height: 35px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        opacity: 1;
      }
      .el-button {
        margin-left: 114px;
      }
    }
    .add-expert,
    .add-markproject,
    .add-area-school {
      margin-left: 12px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 14px;
      color: rgba(56, 71, 244, 1);
      opacity: 1;
    }
    .markproject {
      .name {
        margin-left: 14px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 35px;
        height: 35px;
        color: rgba(0, 0, 0, 1);
        opacity: 1;
        width: 215px;
        display: inline-block;
      }
      .score {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 14px;
        color: rgba(0, 0, 0, 1);
        opacity: 1;
      }
      .sperate {
        margin: 0 4px;
      }
      .delete {
        margin-left: 50px;
      }
    }
    .markproject:last-child {
      margin-bottom: 10px;
    }

    .add-markproject {
      margin-bottom: 40px;
    }
    .add-markproject-container {
      margin-top: 4px;
      .addmp-name {
        width: 130px;
      }
      .addmp-start,
      .addmp-end {
        width: 56px;
      }
      .addmp-start {
        margin-left: 42px;
      }
      .line {
        margin-top: 4px;
      }
      .sperate {
        margin: 0 4px;
      }
      .add {
        margin-left: 12px;
      }
    }

    .el-dialog__wrapper {
      .el-select {
        width: 100%;
      }
      .el-button--primary {
        color: #fff;
      }
      .el-button--default {
        color: #606266;
      }
    }

    .button-container {
      margin: 40px 0;
      .save-publish {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 16px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        background: rgba(32, 160, 255, 1);
        width: 135px;
      }
      .save,
      .cancel {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 14px;
        color: rgba(31, 45, 61, 1);
        opacity: 1;
        width: 119px;
      }
    }
    .icon-contain {
      display: flex;
      flex-direction: column;
      width: 50px;
      position: absolute;
      top: 170px;
      left: 0;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
      img.second {
        margin-top: 20px;
      }
    }

    .flow-qr {
      position: absolute;
      top: 15px;
      left: 40px;
      z-index: 2;
    }

    .flow5-tips {
      .head-name,
      .head-count {
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(96, 98, 102, 1);
        line-height: 14px;
      }
      .head-count {
        margin-left: 140px;
      }
    }

    .flow5 {
      .line {
        margin-bottom: 10px;
      }
    }
    .area-school {
      .name {
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(96, 98, 102, 1);
        line-height: 14px;
        width: 230px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
      }
      .flow5-count {
        width: 50px;
        & input {
          text-align: center;
        }
      }
      .line {
        margin-top: 10px;
      }
      .el-button {
        margin-left: 114px;
      }
    }
    .tip {
      color: #999;
    }
  }
</style>
