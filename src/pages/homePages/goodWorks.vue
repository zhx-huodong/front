<template>
    <div id="goodWorks">
        <div class="banner-container">
            <div class="sub-nav">
                <div class="sub-nav-main">
                    <el-card style="min-height:600px;text-align:center">
                        <div slot="header" class="clearfix">
                           <span>{{workDetail.title}}</span>
                           <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                         </div>
                    </el-card>
                </div>
            </div>
            
         </div>
    </div>
</template>
<script>
import axios from "axios";
import api from "../../service/api";
import { getCookie, axiosGet, axiosPost } from "../../tools/tools";
export default {
    data(){
        return {
            id:this.$route.query.id,
            workDetail:{
                title:'',
            }
        }
    },
    created(){
        this.goodWorkDetail();
    },
    methods:{
        async goodWorkDetail(){
            let that=this;
            let params={}
            params.url=api.works
            params.id=that.id
            params.expand="member,attachment"
            await this.axiosGet(params).then(res=>{
                that.workDetail.title=res.title;
                console.log(res.title);
                console.log(that.workDetail.title);
            }).catch(err=>err)
        }
    },
    components:{
       
    }
}
</script>
<style lang="scss" scoped>
    #goodWorks{

    }
</style>
