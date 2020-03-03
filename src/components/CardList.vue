<template>
  <div class="card-list">
      <div class="card-item" v-for="(item,index) in cardList" :key="index" @click="toNext(item.id)">
          <img :src="item.imgUrl"></img>
          <div class="card-name" v-if="!isExcellent">
            <p>{{item.name}}</p>
          </div>
          <div class="excellent-tag" v-if="isExcellent">
              <div class="title">
                <p>TRACK+耳机海报</p>
              </div>
              <div class="flow-like">
                <p class="el-icon-view">1000</p>
                <p class="el-icon-thumb" @click="onlike(item.id)">1000</p>
              </div>
              <div class="author">
                <el-image :src="imgUrl"></el-image>
                <p>周天乐</P>
              </div>
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
    methods: {
      // 下一步
      toNext(id){
        this.$emit('toNext',id)
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
        p{
          margin:0;
          padding:0;
          font-size:16px;
          color:#333;
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
          width:100px;
          p{
            font-size:12px;
            color:#666;
          }
          p:last-chil{
            margin-left:10px;
          }
        }
        .author{
          display:flex;
          flex-direction:row;
          margin-bottom:10px;
          .el-image{
            height:20px;
            width:20px;
            border-radius:10px;
          }
          p{
            margin-left:10px;
            font-size:12px;
            color:#333;
          }
        }
      }
    }
  }
</style>
