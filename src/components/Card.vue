<template>
    <div class="card-item">
        <div class="img-oper">
            <img :src="cardDetail.imgUrl"></img>
            <div class="oper">
                <div class="oper-icon">
                    <p class="el-icon-plus" @click="goToAdd(cardDetail.id,cardDetail.title)"></p>
                    <p class="el-icon-edit" @click="goToEdit(cardDetail.id,cardDetail.title)"></p>
                    <p class="el-icon-delete" @click="goToDelete(cardDetail.id,cardDetail.title)"></p>
                </div>
            </div>
        </div>
        <p>{{cardDetail.title}}</p>
    </div>            
</template>
<script>
    export default{
        props: {
            cardDetail: {
                type: Object,
                default() {
                // return 0;
                }
            }
        },
        data(){
            return{
                
            }
        },
        mounted(){

        },
        methods:{
            //添加
            goToAdd(id,title){
                let params={}
                params.id=id
                params.title=title
                this.$emit('goToAdd',params)
            },
            //编辑
            goToEdit(id,title){
                let params={}
                params.id=id
                params.title=title
                this.$emit('goToEdit',params)
            },
            //删除
            goToDelete(id,title){
                let params={}
                params.id=id
                params.title=title
                this.$emit('goToDelete',params)
            }
        }
    }
</script>
<style lang="less" scoped>

.card-item{
    width:270px;
    display:flex;
    flex-direction:column;
    text-align:center;
    margin-bottom:30px;
    margin-right:10px;
    .img-oper{
        width:180px;
        position:relative;
        img{
            height:180px;
            width:270px;
            border-radius:8px;
        }
        .oper{
            position:absolute;
            bottom:5px;
            background:rgba(0,0,0,0.5);
            border-bottom-left-radius:8px;
            border-bottom-right-radius:8px;
            display:none;
            .oper-icon{
                display:flex;
                justify-content:flex-end;
                align-items:center;
                height:40px;
                width:270px;
                P{
                    font-size:24px;
                    color:#fff;
                    margin-right:15px;
                    cursor:pointer;
                }
            }
            
        }
        
    }
    .img-oper:hover .oper{
        display:block;
    }
    P{
        font-size:16px;
        color:#333;
    }
}

</style>