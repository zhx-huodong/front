<template>
    <div class="home-center">
		<div class="home-wrap">
			<!-- <div class="home-header"></div> -->
            <div class="home-activity-list" v-if="activityList">
                <card-list :cardList="activityList" @toNext="toNext"></card-list>
            </div>
		</div>  
	</div>
</template>
<script>
import CardList from '../components/CardList';
export default {
    name: 'home-center',
    components: { CardList },
    data() {
        return {
            activityList: [{ id: 1, name: '深圳市中小学电脑制作大赛', imgUrl: require('../public/images/ac1.png') }, { id: 2, name: '深圳市中小学电脑机器人活动', imgUrl: require('../public/images/ac2.png') }, { id: 3, name: '深圳市中小学网络夏令营', imgUrl: require('../public/images/ac3.png') }, { id: 4, name: '深圳市中小学微课大赛', imgUrl: require('../public/images/ac4.png') }, { id: 5, name: '深圳市中小学说课大赛', imgUrl: require('../public/images/ac5.png') }, { id: 6, name: '深圳市AI知识大赛', imgUrl: require('../public/images/ac6.png') }] // 活动列表
        };
    },
     methods: {
      // 下一步
      toNext(id){
        console.log('id==',id)
        this.$router.push({
            path: '/home/activityProject',
            query: {
              id: id
            }
          });
      }
    }
};
</script>
<style lang="less" scoped>
.home-center{
    width: 100%;
    margin-top: 10px;
    .home-wrap{
        width: 1180px;
        margin: auto;
        .home-header{
            width: 100%;
            height: 120px;
            font-size: 28px;
            line-height: 120px;
            text-align: center;
            color: #fff;
            background: url('../public/images/banner.png');
            background-size: cover;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        
    }
}

</style>
