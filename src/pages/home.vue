<template>
    <div class="home-center">
        <el-card style="min-height:650px;">
            <div class="home-wrap">
                <!-- <div class="home-header"></div> -->
                <div class="home-activity-list" v-if="activityList">
                    <card-list :cardList="activityList" @toNext="toNext"></card-list>
                </div>
                <!-- <my-video-player :videoSrc="videoSrc"></my-video-player> -->
                <!-- <upload-file></upload-file> -->
            </div> 
            <!-- <file-preview></file-preview> -->
        </el-card> 
	</div>
</template>
<script>
import CardList from '../components/CardList';
import MyVideoPlayer from '../components/MyVideoPlayer'
import UploadFile from '../components/UploadFile'
import FilePreview from '../components/FilePreview'
export default {
    name: 'home-center',
    components: { CardList ,MyVideoPlayer,UploadFile,FilePreview},
    data() {
        return {
            // videoSrc:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
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
    width: 1180px;
    margin: auto;
    margin-top: 20px;
    .home-wrap{
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
