<template>
    <div class="home-center">
        <el-card style="min-height:650px;">
            <div class="home-wrap">
                <div>
                    <type-select :gradeList="gradeList" :activityObjectList="activityObjectList" :regionList="regionList" @gradeObject='gradeObject' 
                    @regionObject="regionObject" @activityObject="activityObject" ></type-select>
                </div>
                <!-- <div class="home-header"></div> -->
                <div class="home-activity-list" v-if="activityList">
                    <card-list :cardList="list" @toNext="toNext"></card-list>
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
import MyVideoPlayer from '../components/MyVideoPlayer';
import UploadFile from '../components/UploadFile';
import FilePreview from '../components/FilePreview';
import TypeSelect from '../components/TypeSelect';
import api from '../service/api';
export default {
    name: 'home-center',
    components: { CardList ,MyVideoPlayer,UploadFile,FilePreview,TypeSelect},
    data() {
        return {
            // videoSrc:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
            activityObjectList:[
                {id:0,name:'全部'},
                {id:1,name:'老师'},
                {id:2,name:'学生'},
                {id:4,name:'家长'}
            ],
            regionList:[
               
                    {"id":"77","pid":"6","type":"2","name":"深圳"},
                    {"id":"726","pid":"77","type":"3","name":"福田区"},
                    {"id":"727","pid":"77","type":"3","name":"罗湖区"},
                    {"id":"728","pid":"77","type":"3","name":"南山区"},
                    {"id":"729","pid":"77","type":"3","name":"宝安区"},
                    {"id":"730","pid":"77","type":"3","name":"龙岗区"},
                    {"id":"731","pid":"77","type":"3","name":"盐田区"},
                    {"id":"732","pid":"77","type":"3","name":"市辖区"},
                    {"id":"733","pid":"77","type":"3","name":"龙华区"},
                    {"id":"734","pid":"77","type":"3","name":"坪山区"},
                    {"id":"735","pid":"77","type":"3","name":"光明区"},
                    {"id":"736","pid":"77","type":"3","name":"大鹏区"}
                
            ],
            activityList: [
                { id: 1, name: '深圳市中小学电脑制作大赛', imgUrl: require('../public/images/ac1.png') }, 
                { id: 2, name: '深圳市中小学电脑机器人活动', imgUrl: require('../public/images/ac2.png') }, 
                { id: 3, name: '深圳市中小学网络夏令营', imgUrl: require('../public/images/ac3.png') }, 
                { id: 4, name: '深圳市中小学微课大赛', imgUrl: require('../public/images/ac4.png') }, 
                { id: 5, name: '深圳市中小学说课大赛', imgUrl: require('../public/images/ac5.png') }, 
                { id: 6, name: '深圳市AI知识大赛', imgUrl: require('../public/images/ac6.png') }
            ], // 活动列表
            // gradeList:[
            //     { id: 0, name: '全部' },
            //     { id: 1, name: '小学组' },
            //     { id: 2, name: '初中组' },
            //     { id: 3, name: '高中组' }
            // ],
            list:[],
            gradeList:[
            { id: 0, name: '全部' },
            {name:"幼教组",id:1},
            {name:"小学组",id:2},
            {name:"初中组",id:4},
            {name:"高中组",id:8},
            {name:"特教组",id:16},
            {name:"中职组",id:32},
            {name:"高教组",id:64},
        ],
        userid:'',
        activityObjectid:0,
        gradeObjectid:0,
        regionObjectid:'77',
        };
        
    },
    created(){
        this.userid=JSON.parse(localStorage.getItem("user")).id
        this.selectActive()
    },
    methods: {
        //查询活动
        // {{uri}}/activity?expand=detail,region,node,attachment,banner
        
        async selectActive(){
            console.log(1)
            console.log(this.activityObjectid,this.gradeObjectid,this.regionObjectid)
                let params={}
                params.url=api.activityDetail
                
                // params.created_by=this.userid;
                if(this.activityObjectid!=0){
                     params.target=this.activityObjectid;
                }
                console.log()
                if(this.gradeObjectid!=0){
                     params.period=this.gradeObjectid;
                }
                if(this.regionObjectid!="77"){
                     params.region=this.regionObjectid;
                }

             let res = await this.axiosGet(params).catch(err => err);
             this.list=res.items
        },

        // 下一步
        toNext(id){
            this.$router.push({
                path: '/home/activityIntroduction',
                query: {
                id: id
                }
            });
        },
        //
        async activityObject(value){
            this.activityObjectid=value
            this.selectActive();
           
        },
        //学段
        async gradeObject(value) {
            this.gradeObjectid=value
             this.selectActive();
        },
        //区域
        async regionObject(value){
             this.regionObjectid=value
            this.selectActive();
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
        .home-activity-list{
            margin-top:30px;
        }
        
    }
}

</style>
