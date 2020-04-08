<template>
  <div class="card-list">
      <div class="card-item" v-for="(item,index) in cardList" :key="index" >
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
        width:260px;
        height:180px;
        border-radius:4px;
      }
      p{
        font-size:14px;
        font-family:Adobe Heiti Std;
        font-weight:normal;
        color:rgba(153,153,153,1);
        line-height:20px;
        opacity:0.99;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
