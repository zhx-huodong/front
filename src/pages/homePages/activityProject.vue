<template>
    <div class="activityProject-center">
		<div class="activityProject-wrap">
            <div class="activityProject-activity-list" v-if="activityList">
                <card-list :cardList="activityList" @toNext="toNext"></card-list>
            </div>
		</div>  
	</div>
</template>
<script>
import CardList from '../../components/CardList';
export default {
    name: 'activityProject-center',
    components: { CardList },
    data() {
        return {
            activityList: [{ id: 1, name: '数字创作项目', imgUrl: require('../../assets/img2/1.png') }, { id: 2, name: '程序设计项目', imgUrl: require('../../assets/img2/2.png') }, { id: 3, name: '创客项目', imgUrl: require('../../assets/img2/3.png') },{ id: 4, name: '深圳市中小学网络夏令营', imgUrl: require('../../assets/img2/4.png') }] // 活动列表
        };
    },
     methods: {
      // 下一步
      toNext(id){
        console.log('id==',id)
        this.$router.push({
            path: '/activityCenter',
            query: {
              id: id
            }
          });
      }
    }
};
</script>
<style lang="less" scoped>
.activityProject-center{
    width: 100%;
    margin-top: 10px;
    .activityProject-wrap{
        width: 1180px;
        margin: auto;
        
    }
}

</style>
