<template>
  <div class="works-preview">
    <div class="title">
      <el-button type="defualt" size="mini" @click="goback" style="position:absolute;left:0">返回</el-button>
      <p>{{activityDetail.works.title}}</p>
      
      <span
        style="position:absolute;right:50px;color:#999999;font-size:12px"
      >作品编号:{{activityDetail.serial_id}}</span>
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="content-main">
          <div class="content-item" v-if="rejectReason">
            <div class="sub-title" style="color:red;font-weight:700">退回详情</div>
            <div class="content ql-snow ql-editor" v-html="activityDetail.comment" style="color:red;font-weight:700"></div>
          </div>
          <div class="content-item" v-if="activityDetail.works!=undefined&&activityDetail.works.cover!=undefined&&activityDetail.works.cover!=''">
            <div class="sub-title">作品封面</div>
            <div class="content">
              <el-image :src="activityDetail.works.cover" :fit="cover" @click="cancelStyle()"></el-image>
            </div>
          </div>
          <div class="content-item" v-if="activityDetail.works.content!=null&&activityDetail.works.content.content!=''">
            <div class="sub-title">作品介绍</div>
            <div class="content ql-snow ql-editor" v-html="activityDetail.works.content.content"></div>
          </div>
          <div class="content-item" v-if="activityDetail.works.content!=null&&activityDetail.works.content.production!=''">
            <div class="sub-title">创作过程</div>
            <div class="content">{{activityDetail.works.content.production}}</div>
          </div>
          <div class="content-item" v-if="activityDetail.works.content!=null&&activityDetail.works.content.reference!=''">
            <div class="sub-title">参考资源</div>
            <div class="content">{{activityDetail.works.content.reference}}</div>
          </div>
          <div class="content-item" v-if="activityDetail.works.content!=null&&activityDetail.works.content.environment!=''">
            <div class="sub-title">制作用软件及运行环境</div>
            <div class="content">{{activityDetail.works.content.environment}}</div>
          </div>
          <div class="content-item" v-if="activityDetail.works.content!=null&&activityDetail.works.content.remark!=''">
            <div class="sub-title">其他说明</div>
            <div class="content">{{activityDetail.works.content.remark}}</div>
          </div>

          <template v-for="item in fields">
            <div class="content-item" v-if="item.type==1||item.type==2||item.type==3">
              <div class="sub-title">{{item.title}}</div>
              <div class="content">{{item.data}}</div>
            </div>
            <div class="content-item" v-if="item.type==7||item.type==9">
              <div class="sub-title">{{item.title}}</div>
              <template v-for="subItem in item.options">
                <div class="content" v-if="item.data==subItem.value">{{subItem.text}}</div>
              </template>
            </div>
            <div class="content-item" v-if="item.type==8">
              <div class="sub-title">{{item.title}}</div>
              <template v-for="myItem in item.data">
                <template v-for="subItem in item.options">
                  <div class="content" v-if="myItem==subItem.value">{{subItem.text}}</div>
                </template>
              </template>
            </div>
          </template>

          <div class="content-item" style="width:80%">
            <div class="sub-title">作品:</div>
            <div class="content">
              <template v-for="item in activityDetail.works.attachment">
                <file-preview :fileObj="item" :showDownLoad="showDownLoad"></file-preview>
              </template>
            </div>
          </div>
          <div class="content-item" v-if="!award">
            <div class="sub-title">报名登记表:</div>
            <div class="content filePreview">
              <template v-for="subItem in activityDetail.registration">
                <file-preview :fileObj="subItem"></file-preview>
              </template>
              <!-- <file-preview :fileObj="{name:'报名登记表',url:activityDetail.registration}"></file-preview> -->
            </div>
          </div>
          <el-divider v-if="workDetail"></el-divider>
          <div class="works-detail-main" v-show="workDetail">
            <div
              class="works-detail-item"
              style="color:red;font-weight:700"
            >获奖信息：{{getAward||'暂未获奖'}}</div>
            <div class="works-detail-item">活动名称：{{activityDetail.info.activity}}</div>
            <div class="works-detail-item">活动项目：{{activityDetail.info.project}}</div>
            <div class="works-detail-item">组别：{{periodList[activityDetail.period]}}</div>
            <div class="works-detail-item">学校：{{activityDetail.school.title}}</div>
            <template v-if="!award">
              <div
                class="works-detail-item"
                v-if="activityDetail.works.member.author!=undefined"
              >作者：{{activityDetail.works.member.author.map(item=>{return item.name+'('+item.mobile+')'}).join('、')}}</div>
              <div
                class="works-detail-item"
                v-if="activityDetail.works.member.mentor!=undefined&&activityDetail.works.member.mentor[0]!=undefined&&activityDetail.works.member.mentor[0].name!=''"
              >指导老师：{{activityDetail.works.member.mentor.map(item=>{return item.name+'('+item.mobile+')'}).join('、')}}</div>
            </template>
            <template v-if="award">
              <div
                class="works-detail-item"
                v-if="activityDetail.works.member.author!=undefined"
              >作者：{{activityDetail.works.member.author.map(item=>{return item.name}).join('、')}}</div>
              <div
                class="works-detail-item"
                v-if="activityDetail.works.member.mentor!=undefined&&activityDetail.works.member.mentor[0]!=undefined&&activityDetail.works.member.mentor[0].name!=''"
              >指导老师：{{activityDetail.works.member.mentor.map(item=>{return item.name}).join('、')}}</div>
            </template>
            <div class="works-detail-item" v-show="!award">邮箱：{{activityDetail.works.email}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from "../../service/api.js";
import { getCookie } from "../../tools/tools";
import FilePreview from "../../components/FilePreview";
import SingleTextBox from "../../components/SingleTextBox";
import MultiTextBox from "../../components/MultiTextBox";
import NumberBox from "../../components/NumberBox";
import SelectBox from "../../components/SelectBox";
import SingleCheckBox from "../../components/SingleCheckBox";
import MultiCheckBox from "../../components/MultiCheckBox";
export default {
  components: {
    FilePreview,
    SingleTextBox,
    MultiTextBox,
    NumberBox,
    SelectBox,
    SingleCheckBox,
    MultiCheckBox
  },
  props: {
    id: {
      type: Number,
      default() {
        return 0;
      }
    },
    inscore: {
      type: String,
      default() {
        return "";
      }
    },
    award: {
      type: Boolean,
      default() {
        return false;
      }
    },
    workDetail: {
      type: Boolean,
      default() {
        return true;
      }
    },
    rejectReason: {
      type: Boolean,
      default() {
        return false;
      }
    },
    showDownLoad: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },

  data() {
    return {
      activityDetail: {}, //报名详情信息
      periodList: {
        1: "幼教组",
        2: "小学组",
        4: "初中组",
        8: "高中组",
        16: "特教组",
        32: "中职组",
        64: "高教组"
      },
      getAward: "", //所获奖项,
      fields: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getActivityDetail(this.id);
    });
  },
  methods: {
    cancelStyle() {
      document.body.style = null;
    },
    //获取报名活动详情
    async getActivityDetail(id) {
      console.log("进来");
      let params = {};
      params.url = api.enroll;
      params.id = id;
      if (this.inscore != "") {
        params.inscore = this.inscore;
      }
      params.expand = "info,works,school,professional,award,process";
      await this.axiosGet(params)
        .then(res => {
          this.activityDetail = res;
          if (this.activityDetail.award.length != 0) {
            this.getAward = this.activityDetail.award[0].title;
          }
          this.activityDetail.registration = [];
          for (let i in res.info.registrations) {
            this.activityDetail.registration.push({
              name: "",
              url: res.info.registrations[i]
            });
          }
          this.fields = res.info.fields.map(items => {
            items.required = items.required == 1 ? true : false;
            if (items.type == 7 || items.type == 9) {
              items.myVal = parseInt(items.data);
            } else {
              items.myVal = items.data;
            }
            return items;
          });
        })
        .catch(err => err);
    },
    goback() {
      this.$router.go(-1);
      this.$emit("goback");
    }
  }
};
</script>
<style lang="less" scoped>
.works-preview {
  .title {
    width: 97%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .content-main {
    .content-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .sub-title {
        font-size: 16px;
        color: #333;
      }
      .content {
        margin-top: 10px;
        font-size: 14px;
        color: #666;
        line-height: 30px;
        .el-image {
          height: 180px;
          width: 260px;
          border-radius: 8px;
        }
      }
    }
  }
  .works-detail-main {
    display: flex;
    flex-direction: column;

    .works-detail-item {
      font-size: 14px;
      color: #333;
      margin-bottom: 10px;
    }
  }
}
.filePreview {
  display: flex;
  flex-wrap: wrap;
}
</style>