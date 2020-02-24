<template>
    <div class="expert-assign-container">
        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="专家分配" name="expertAssign">
                    <el-row>
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="活动名称：">
                                <el-input v-model="formInline.activityName" placeholder="请输入活动名称"></el-input>
                            </el-form-item>
                            <el-form-item label="活动组别：">
                                <el-input v-model="formInline.activityGroup" placeholder="请输入活动组别"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input v-model="formInline.name" placeholder="输入姓名"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="goToSearch">查找</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                    <el-row>
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            border
                            :header-cell-style="{background:'#EEEEEE',color:'#323232'}"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column
                            label="序号"
                            type="index"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="activityName"
                            label="活动名称"
                            show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column
                            prop="activityGroup"
                            label="活动组别"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="expert"
                            label="分配专家"
                            >
                            </el-table-column>
                            
                            <el-table-column
                            fixed="right"
                            label="评分情况"
                            width="100">
                            <template slot-scope="scope">
                                <div style="color:#73AFF8;text-align:center;font-size:24px;cursor:pointer;" @click="goToDetail(scope.row)">
                                    <p class="el-icon-s-data"></p>
                                </div>
                            </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row class="page-div">
                        <el-pagination
                        @size-change="pageSizeChange"
                        @current-change="pageCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="40">
                        </el-pagination>
                    </el-row>
                    <el-dialog title="" :visible.sync="scoreTableVisible" width="800px">
                        <div class="my-chart">
                            <high-charts :options="abilityOpt"></high-charts>
                        </div>
                    </el-dialog>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
    import HighCharts from '../../components/highcharts';
    export default{
        components: { HighCharts },
        data(){
            return{
                formInline: {
                    activityName: '',
                    activityGroup: '',
                    name:''
                },
                input:'',
                activeName:'expertAssign',
                tableData: [{
                activityName: '深圳市创客大赛',
                activityGroup: '创客组',
                expert:'陆同学',
                }, {
                activityName: '深圳市创客大赛',
                activityGroup: '创客组',
                expert:'陆同学',
                }, {
                activityName: '深圳市创客大赛',
                activityGroup: '创客组',
                expert:'陆同学',
                }, {
                activityName: '深圳市创客大赛',
                activityGroup: '创客组',
                expert:'陆同学',
                }, {
                activityName: '深圳市创客大赛',
                activityGroup: '创客组',
                expert:'陆同学',
                }, {
                activityName: '深圳市创客大赛',
                activityGroup: '创客组',
                expert:'陆同学',
                }, {
                activityName: '深圳市创客大赛',
                activityGroup: '创客组',
                expert:'陆同学',
                }],
                multipleSelection: [],
                currentPage:1,//当前页
                scoreTableVisible:false,//评分弹窗
                abilityOpt:{}
            }
        },
        mounted(){
            let list=[{Name:'沟通能力',Value:80},{Name:'逻辑思维',Value:70},{Name:'实践创新',Value:80},{Name:'艺术',Value:60},{Name:'人文底蕴',Value:90}]
            this.$nextTick(function(){
                this.renderChart(list)
            })
        },
        methods:{
            //查找
            goToSearch(){

            },
            //删除
            goToDelete(index,rows){
                this.open(index,rows)
            },
            //提示框
            open(index,rows) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            //每页数量改变
            pageSizeChange(val){

            },
            //页码改变
            pageCurrentChange(val){

            },
            //评分情况
            goToDetail(val){
                this.scoreTableVisible=true
            },
            renderChart(list = []) {
                let xAxis = ['张专家','李专家','王专家','张专家','李专家','王专家'], haveScore = [21,18,34,21,18,34] , noScore=[30,45,23,30,45,23];
                // list.forEach(item => {
                // xAxis.push(item.Name);
                // data.push(item.Value);
                // });
                let options = {
                    show: true,
                    chart: {
                        type: 'column'
                    },
                    colors:['#D2D2D2','#73AFF8'],
                    title: {
                        text: '作品数评分情况'
                    },
                    xAxis: {
                        categories: xAxis,
                        crosshair: true
                    },
                    yAxis: {
                        title:{
                            text:'数量'
                        },
                        min: 0
                    },
                    legend: {
                        enabled: true
                    },
                    plotOptions: {
                        column: {
                            borderWidth: 0
                        }
                    },
                    series: [
                        
                        {name: '待评分作品数',
                        data: noScore
                        },{
                        name: '已评分作品数',
                        data: haveScore
                        }
                    ]
                };
                this.abilityOpt = options;
            },
        }
    };
</script>
<style lang="less" scoped>
.expert-assign-container{
    width:1180px;
    margin:auto;
    margin-top:20px;
    .demo-input-suffix{
        align-items:center;
        display:flex;
        flex-direction:row;
    }
    .page-div{
        display:flex;
        justify-content:center;
    }
    .my-chart{
        height:400px;
    }
}
</style>