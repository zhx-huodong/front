<template>
 
  <div class="card-list">
      <div class="addcard" @click="addclick()" >
          <div class="addclass">
            <img :src="Addurl"></img>
            <p style="font-size:14px;">创建活动</p>
          </div>
      </div>
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
      return {
        Addurl:require('../public/images/addLog.png'),
      };
    },
    methods: {
      // 下一步
      toNext(id){
        this.$emit('toNext',id)
      },
      addclick(){
           this.$router.push({
              path:"/activeManager/createActivity",
          })
      }
    }
  };
</script>
<style lang="less" scoped>
  .addcard{
    text-align:center;
    align-items:center;
    padding:20px 10px;
      .addclass{
        display:flex;
        flex-direction:column;
        align-items:center;
        text-align:center;
        border-radius:8px;
        width:260px;
        height:180px;
        border:1px solid rgba(201,201,201,1);

        img{
          margin-top:60px;
          width:34px;
          height:34px;
          background:rgba(25,133,243,1);
        }
       
      }
      &:hover {
        cursor: pointer;
      }
  }
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
        border-radius:8px;
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
