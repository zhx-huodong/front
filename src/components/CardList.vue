<template>
  <div class="card-list">
      <div class="card-item" v-for="(item,index) in cardList" :key="index" @click="toNext(item.id,item.activity_id)">
          <img :src="item.cover" />
          <div class="card-name" v-if="!isExcellent">
            <p v-if="item.title.length<=15">{{item.title}}</p>
            <el-tooltip :content="item.title" placement="top" effect="dark" v-else>
              <p >{{item.title}}</p>
            </el-tooltip>
          </div>
          <div class="excellent-tag" v-if="isExcellent">
              <div class="title">
                <p>{{item.name}}</p>
              </div>
              <div class="flow-like">
                <p class="el-icon-view">{{item.view_counts}}</p>
                <p class="el-icon-thumb" @click="onlike(item.id)">{{item.like_counts}}</p>
              <p class="award">{{item.award}}</p>

              </div>
              <!-- <div class="author"> -->
                <!-- <el-image :src="imgUrl"></el-image> -->
                <div class="school">{{item.school}}</div>
                <div class="author">作者：{{item.author}}</div>
                <div class="teacher" v-if="item.mentor.length>0">指导老师：{{item.mentor}}</div>

              <!-- </div> -->
          </div>
      </div>
  </div>
</template>
<script>
  export default {
    props: {
      cardList: {
        type: Array,
        default() {
          return [];
        }
      },
      isExcellent:{
        type:Boolean,
        default(){
          return false;
        }
      }
    },
    data() {
      return {
        imgUrl:require('../public/images/logo.png')
      };
    },
    mounted(){
      console.log("this.cardList==",this.cardList)
    },
    methods: {
      // 下一步
      toNext(id,activity_id){
        this.$emit('toNext',id,activity_id)
      },
      //点赞
      onlike(id){
        this.$emit('onlike',id)
      }
    }
  };
</script>
<style lang="less" scoped>
  .card-list {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    box-sizing: border-box;
    .card-item{
      text-align:center;
      align-items:center;
      padding:20px 10px;
      img{
        height:180px;
        width:260px;
        border-radius:8px;
      }
      .card-name{
        width:260px;
        p{
          margin:0;
          padding:0;
          font-size:16px;
          color:#333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      
      &:hover {
        cursor: pointer;
      }
      .excellent-tag{
        display:flex;
        justify-content:start;
        flex-direction:column;
        .title{
          display:flex;
          flex-direction:row;
          margin-bottom:10px;
          p{
            font-size:14px;
            color:#333;
          }
        }
        .flow-like{
          display:flex;
          flex-direction:row;
          margin-bottom:10px;
          justify-content:space-between;
          width:200px;
          p{
            font-size:14px;
            color:#BBBBBB;
          }
          p:last-chil{
            margin-left:10px;
          }
          .award{
            margin-top:-4px;
          }
        }
        .school,.author,.teacher{
           text-align: left;
           color:#999999;
           font-size:14px;
           line-height: 20px;
        }
        // .author{
        //   display:flex;
        //   flex-direction:row;
        //   margin-bottom:10px;
        //   .el-image{
        //     height:20px;
        //     width:20px;
        //     border-radius:10px;
        //   }
        //   p{
        //     margin-left:10px;
        //     font-size:12px;
        //     color:#333;
        //   }
        // }
      }
    }
  }
</style>
