<template>
  <div class="card-list">
      <div class="card-item" v-for="(item,index) in cardList" :key="index" @click="toNext(item.id)">
          <img :src="item.imgUrl"></img>
          <p>{{item.name}}</p>
      </div>
  </div>
</template>
<script>
  export default {
    props: {
      cardList: {
        type: Array,
        default() {
          // return 0;
        }
      }
    },
    data() {
      return {};
    },
    methods: {
      // 下一步
      toNext(id){
        this.$emit('toNext',id)
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
      p{
        margin:0;
        padding:0;
        font-size:18px;
        color:#333;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
