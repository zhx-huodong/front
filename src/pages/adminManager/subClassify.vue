<template>
    <div class="sub-classify-centainer">
        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="title" name="classify">
                    <el-row>
                        <el-col :span="3">
                            <el-button type="primary" @click="goToAddClassify">添加分类</el-button>
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
                    {id:1,imgUrl:require('../../public/images/ac1.png'),title:'数字创作项目'},
                    {id:2,imgUrl:require('../../public/images/ac2.png'),title:'程序设计项目'},
                    {id:3,imgUrl:require('../../public/images/ac3.png'),title:'创客项目'}  
                ],
                title:this.$route.query.title,
                id:this.$route.query.id
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
.sub-classify-centainer{
    width:1180px;
    margin:auto;
    margin-top:20px;
    .card{
        display:flex;
        flex-flow:row wrap;
    }
}
</style>