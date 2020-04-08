<template>
    <div class="classify-centainer">
        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="分类管理" name="classify">
                    <el-row>
                        <el-col :span="3">
                            <el-button type="primary" @click="goToAddClassify" size="small">添加分类</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <div class="card">
                                <template v-for="item in cardList">
                                    <card :cardDetail="item" @goToAdd="goToAdd" @goToEdit="goToEdit" @goToDelete="goToDelete"></card>
                                </template>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
    import Card from '../../components/Card'
    export default{
        components: { Card },
        data(){
            return{
                activeName:'classify',
                cardList:[
                    {id:1,imgUrl:require('../../public/images/ac1.png'),title:'深圳市中小学电脑制作大赛'},
                    {id:2,imgUrl:require('../../public/images/ac2.png'),title:'深圳市中小学电脑机器人活动'},
                    {id:3,imgUrl:require('../../public/images/ac3.png'),title:'深圳市中小学网络夏令营'},
                    {id:4,imgUrl:require('../../public/images/ac4.png'),title:'深圳市中小学微课大赛'},
                    {id:5,imgUrl:require('../../public/images/ac5.png'),title:'深圳市中小学说课大赛'},
                    {id:6,imgUrl:require('../../public/images/ac6.png'),title:'深圳市AI知识大赛'}
                    
                ]
            }
        },
        mounted(){

        },
        methods:{
            //添加分类
            goToAddClassify(){
                this.$router.push({
                    path:'/addClassify'
                })
            },
             //添加
            goToAdd(val){
                console.log("添加id==",val)
                this.$router.push({
                    path:'/subClassify',
                    query: {
                        id: val.id,
                        title:val.title
                    }
                })
            },
            //编辑
            goToEdit(val){
                console.log("编辑id==",val)
            },
            //删除
            goToDelete(val){
                console.log("删除id==",val)
            }
        }
    }
</script>
<style lang="less" scoped>
.classify-centainer{
    width:1180px;
    margin:auto;
    margin-top:20px;
    .card{
        display:flex;
        flex-flow:row wrap;
    }
}
</style>