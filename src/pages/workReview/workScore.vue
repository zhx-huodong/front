<template>
  <div class="work-score-container">
    <el-card style="min-height:600px;">
      <works-preview :id="queryId" inscore="1" :workDetail="false"></works-preview>

      <el-tabs v-model="activeDetail">
        <el-tab-pane label="评分信息" name="detail">
          <div style="width:900px">
            <el-row>
              <el-form ref="form" :model="form2" label-width="100px">
                <el-form-item
                  label="评分："
                  :rules="{
      required: true, message: '评分不能为空', trigger: 'blur'
    }"
                >
                  <el-input
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    placeholder="请输入0-100整数"
                    v-model="form2.score"
                    clearable
                    style="width:200px;"
                    size="small"
                    maxlength="3"
                    @input="checkScore(form2.score)"
                  ></el-input>
                  <span style="padding-left:10px;">分</span>
                  <span
                    style="color:#999999;margin-left:20px;"
                  >( 满分100，90以上优秀，80以上优良，70以上较好， 60以下较差 )</span>
                </el-form-item>

                <el-form-item
                  label="评语："
                  :rules="{required: true, message: '评语不能为空', trigger: 'blur'}"
                >
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入评语"
                    v-model="form2.comment"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-row>
        <el-col :span="2" :offset="11">
          <el-button type="primary" @click="goToScore(queryId)">提交评分</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>当前已评完，继续评分?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$router.go(-1)">返 回</el-button>
        <el-button type="primary" @click="open">下一份</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "../../service/api";
import { axiosGet, getCookie } from "../../tools/tools";
import WorksPreview from "../homePages/WorksPreview";
import axios from "axios";
export default {
  data() {
    return {
      activeName: "look",
      activeDetail: "detail",
      author: [],
      teacher: [],
      attachment: [],
      workDetail: {},
      form2: {
        score: parseInt(this.$route.query.score), //评分
        comment: this.$route.query.comment.toString() //评语
      },
      apiKey: getCookie("x-api-key"),
      queryId: parseInt(this.$route.query.id),
      dialogVisible: false
    };
  },
  components: { WorksPreview },
  mounted() {
    console.log("content===",this.$route.query.comment)
  },
  created() {
    let that = this;
    // that.getWorkDetail(that.queryId);
  },
  methods: {
    // 验证手机
    checkScore(score) {
      var re = /^[0-9]+.?[0-9]*$/;
      if (re.test(score)) {
        if(score>100){
          this.$message({
            message: "请按照规则进行评分",
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "请按照规则进行评分",
          type: "warning"
        });
      }
    },
    async getWorkDetail(queryId) {
      let that = this;
      let params = {};
      params.url = api.enroll;
      params.id = queryId;
      params.inscore = 1;
      params.expand = "works,info";
      await this.axiosGet(params)
        .then(res => {
          that.workDetail = res;
          that.author = res.info.author.map(res => {
            return res.name;
          });
          that.teacher = res.info.mentor.map(res => {
            return res.name;
          });
          if (res.works.attachment.length != 0) {
            that.attachment.push(
              res.attachment.map(res => {
                return {
                  title: res.title,
                  url: res.url
                };
              })
            );
          }
          that.dialogVisible = false;
        })
        .catch(err => {
          if (err.status === 404) {
            that.$message({
              type: "error",
              message: "已评完，没有下一份了"
            });
            that.queryId = that.queryId - 1;
            that.dialogVisible = false;
          }
        });
    },
    //评分
    goToScore(queryId) {
      let that = this;
      var re = /^[0-9]+.?[0-9]*$/;
      let item = {};
      item.ids = [];
      item.ids[0] = queryId;
      if(re.test(that.form2.score)&&parseInt(that.form2.score)<=100){
        item.score = parseInt(that.form2.score) * 10;
      }else{
        this.$message({
          message: "请按照规则进行评分",
          type: "warning"
        });
        return
      }
      
      item.comment = that.form2.comment;
      let params = [];
      params.push(item);
      axios
        .post(api.scoring, params, { headers: { "x-api-key": that.apiKey } })
        .then(res => {
          if (res.data.code == -1) {
            that.$message({
              type: "error",
              message: res.data.message
            });
          } else if (res.data.code == 0) {
            that.dialogVisible = true;
          }
        });
    },
    //评论下一份
    open() {
      let that = this;
      that.queryId = that.queryId - 1;
      that.getWorkDetail(that.queryId);
    },
    goback() {
      this.$router.push({ path: "/workReview" });
    }
  }
};
</script>
<style lang="less" scoped>
.work-score-container {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  .workContainer {
    margin: 20px 30px;
    .workDetail {
      margin: 20px 0;
      text-align: left;
      color: #333333;
      font-size: 14px;
      img {
        width: 30%;
        height: 200px;
      }
      p {
        line-height: 30px;
        a {
          cursor: pointer;
        }
      }
    }
  }
}
.remark {
  font-size: 14px;
  font-weight: 400;
  margin-left: 20px;
  color: rgba(153, 153, 153, 1);
}
</style>
