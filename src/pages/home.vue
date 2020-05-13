<template>
    <div class="home-center">
        <el-card style="min-height:650px;">
            <div class="home-wrap">
                <!-- <div>
                    <type-select :gradeList="gradeList" :activityObjectList="activityObjectList" :regionList="regionList" @gradeObject='gradeObject' 
                    @regionObject="regionObject" @activityObject="activityObject" ></type-select>
                </div> -->
                <div class="home-activity-list" v-if="list.length>0">
                    <card-list :cardList="list" @toNext="toNext"></card-list>
                </div>
                <div v-else class="no-data">
                    <img src="../public/images/empty.png" alt="">
                    <div>没有相关活动</div>
                </div>
            </div> 
        </el-card> 
	</div>
</template>
<script>
import CardList from '../components/CardList';
import MyVideoPlayer from '../components/MyVideoPlayer';
import UploadPicture from '../components/UploadPicture';
import UploadFile from '../components/UploadFile';
import FilePreview from '../components/FilePreview';
import TypeSelect from '../components/TypeSelect';
import api from '../service/api';
export default {
    name: 'home-center',
    components: { CardList ,MyVideoPlayer,FilePreview,UploadFile,TypeSelect,UploadPicture},
    data() {
        return {
            
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
            activityList: [], // 活动列表
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
        activityObjectid:0,
        gradeObjectid:0,
        regionObjectid:'77',
        };
        
    },
    created(){
        this.selectActive()
    },
    methods: {
        //查询活动
        async selectActive(){
            let params={}
            params.url=api.activityDetail
            params.process=1;
            if(this.activityObjectid!=0){
                params.target=this.activityObjectid;
            }
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
                    id: id,
                    activeName:'first'
                }
            });
        },
        //
        async activityObject(value){
            this.activityObjectid=value
            this.selectActive();
           
        },
        //组别
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
       .no-data{
           width: 100%;
           display: flex;
           justify-content: center;
           flex-direction: column;
           align-items: center;
           img{
               width: 200px;
               height: 100%;
           }
           font-size: 32px;
        //    font-weight: bold;
           color: #DCDCDC;
           margin-top: 100px;
       }
        
    }
}

</style>
