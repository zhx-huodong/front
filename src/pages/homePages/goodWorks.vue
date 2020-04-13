<template>
  <div class="good-work-container">
    <el-card style="min-height:600px">
      <works-preview :id="activity_id" :award="true" :showDownLoad='false'></works-preview>
      <div class="like_counts"><p @click="onlike" class="el-icon-thumb">点赞</p></div>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
import api from "../../service/api";
import WorksPreview from './WorksPreview'
import { getCookie, axiosGet, axiosPost } from "../../tools/tools";
export default {
  data() {
    return {
      id: this.$route.query.id,
      activity_id:this.$route.query.activity_id,
      workDetail: {
        // title:'',
      },
      author: [],
      teacher: [],
      attachment: [],
      category: "", //活动分类
      project: "", //活动组别
      like_counts: 0, //点赞数
      apiKey: getCookie("x-api-key")
    };
  },
  components:{WorksPreview},

  created() {
    this.goodWorkDetail();
    // this.goodWorkList();
  },
  methods: {
    async goodWorkList() {
      let that = this;
      let params = {};
      params.url = api.enroll;
      params.id = this.id;
      // params.position=4;//优秀作品展示
      params.expand = "works,info";
      await this.axiosGet(params)
        .then(res => {
          that.like_counts = res.like_counts;
          that.project = res.info.project;
          that.category = res.info.category;
        })
        .catch(err => err);
    },
    async goodWorkDetail() {
      let that = this;
      let params = {};
      params.url = api.works;
      params.id = that.id;
      params.expand = "member,attachment,content";
      await this.axiosGet(params)
        .then(res => {
          that.workDetail = res;
          that.author = res.member.author.map(res => {
            return res.name;
          });
          that.teacher = res.member.mentor.map(res => {
            return res.name;
          });
          if (res.attachment.length != 0) {
            that.attachment.push(
              res.attachment.map(res => {
                return {
                  title: res.title,
                  url: res.url
                };
              })
            );
          }
          console.log("哈哈", that.attachment);
        })
        .catch(err => err);
    },
    //点赞
    async onlike() {
      let that = this;
      let params = {};
      params.id = this.id;
      axios
        .get(api.like, {
          params: params,
          headers: { "x-api-key": that.apiKey }
        })
        .then(res => {
          if (res.data.code == 0) {
            that.like_counts++;
            that.$message({
              type: "success",
              message: "点赞成功!"
            });
          } else {
            that.$message.error("点赞失败");
          }
        });
    }
  },
};
</script>
<style lang="scss" scoped>
.good-work-container{
    width: 1180px;
    margin: auto;
    margin-top: 20px;
    .clearfix{
        text-align: center;
    }
}
.workContainer {
  width: 80%;
  margin: 0 10%;
  img {
    width: 100%;
  }
  .content {
    color: #666666;
    font-size: 14px;
    margin-bottom: 50px;
  }
  .workDetail {
    margin: 20px 0;
    text-align: left;
    color: #333333;
    font-size: 14px;
    p {
      line-height: 30px;
      a {
        cursor: pointer;
      }
    }
  }
  
}
.like_counts {
    cursor: pointer;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: 65px;
    height: 40px;
    margin-top: 30px;
    background: rgba(255, 227, 0, 1);
    border-radius: 24px;
    p {
      line-height: 40px;
      font-size: 12px;
    }
  }
</style>
<style lang="scss">
#goodWorks {
  .el-card__body {
    padding: 50px 0;
  }
}
</style>
