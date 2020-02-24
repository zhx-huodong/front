<template>
    <div class="admin-centainer">
        <el-card>
            <el-tabs v-model="activeName" @tab-click="tabClick">
                <el-tab-pane label="教师" name="teacher"></el-tab-pane>
                <el-tab-pane label="学生" name="student"></el-tab-pane>
                <el-tab-pane label="家长" name="parent"></el-tab-pane>
            </el-tabs>
            <div>
                <el-row class="teacher-top">
                        <el-col :span="2">所在地区</el-col>
                        <el-col :span="6">
                            <el-select v-model="areaVal" placeholder="请选择">
                                <el-option
                                v-for="item in areaList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2" v-if="index!=2">所在学校</el-col>
                        <el-col :span="6" v-if="index!=2">
                            <el-select v-model="schoolVal" placeholder="请选择">
                                <el-option
                                v-for="item in schoolList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2" v-if="index==1">关联家长</el-col>
                        <el-col :span="6" v-if="index==1">
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </el-col>
                        <el-col :span="2" v-if="index==2">关联学生</el-col>
                        <el-col :span="6" v-if="index==2">
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="teacher-top">
                        <el-col :span="1">电话</el-col>
                        <el-col :span="6">
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </el-col>
                        <el-col :span="1" :offset="1">姓名</el-col>
                        <el-col :span="6">
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <el-button type="primary">查询</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="danger" plain>删除</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            border
                            :header-cell-style="{background:'#EEEEEE',color:'#323232'}"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="tableSelectionChange">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            label="序号"
                            type="index"
                            width="160"
                            >
                            </el-table-column>
                            
                            <el-table-column
                            prop="name"
                            label="姓名"
                            >
                            </el-table-column>

                            <el-table-column
                            prop="area"
                            label="所在区域"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            label="所在学校"
                            >
                            <template slot-scope="scope">{{ scope.row.school }}</template>
                            </el-table-column>
                            <el-table-column
                            label="手机号"
                            >
                            <template slot-scope="scope">{{ scope.row.phoneNum }}</template>
                            </el-table-column>
                            <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                                <el-button @click="goToDetail(scope.row)" type="text" size="small">查看</el-button>
                                <el-button @click="goToDelete(scope.$index, tableData)" type="text" size="small" style="color:red;">删除</el-button>
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
            </div>
        </el-card>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                index:0,
                activeName: 'teacher',
                areaList: [{
                value: '1',
                label: '南山区'
                }, {
                value: '2',
                label: '龙华区'
                }, {
                value: '3',
                label: '宝安区'
                }, {
                value: '4',
                label: '龙岗区'
                }, {
                value: '5',
                label: '福田区'
                }],
                schoolList:[{
                value: '1',
                label: '附属第三小学'
                }, {
                value: '2',
                label: '龙华第三中学'
                }, {
                value: '3',
                label: '附属小学'
                }, {
                value: '4',
                label: '观澜中学'
                }, {
                value: '5',
                label: '清湖小学'
                }],
                areaVal: '',
                schoolVal:'',
                input:'',
                tableData: [{
                phoneNum: '13714264534',
                name: '陆同学',
                area: '深圳市龙华区龙华街道清湖小学',
                school:'清湖小学'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                area: '深圳市龙华区龙华街道清湖小学',
                school:'清湖小学'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                area: '深圳市龙华区龙华街道清湖小学',
                school:'清湖小学'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                area: '深圳市龙华区龙华街道清湖小学',
                school:'清湖小学'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                area: '深圳市龙华区龙华街道清湖小学',
                school:'清湖小学'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                area: '深圳市龙华区龙华街道清湖小学',
                school:'清湖小学'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                area: '深圳市龙华区龙华街道清湖小学',
                school:'清湖小学'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                area: '深圳市龙华区龙华街道清湖小学',
                school:'清湖小学'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                area: '深圳市龙华区龙华街道清湖小学',
                school:'清湖小学'
                }, {
                phoneNum: '13714264534',
                name: '陆同学',
                area: '深圳市龙华区龙华街道清湖小学',
                school:'清湖小学'
                }],
                multipleSelection: [],
                currentRow: null,
                currentPage:1,//当前页
                
            };
        },
        mounted(){

        },
        methods:{
            //导航栏
            tabClick(tab, event) {
                console.log(tab.index, event);
                this.index=tab.index
            },
            //每页数量改变
            pageSizeChange(val){

            },
            //页码改变
            pageCurrentChange(val){

            },
            //列表选择
            tableSelectionChange(val){
                this.multipleSelection = val;
            },
            //查看
            goToDetail(val){

            },
            //删除
            goToDelete(index,rows){
                console.log(index, rows);
                
                this.open(index, rows)
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
            }
        }
    }
</script>
<style>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
<style lang="less" scoped>
.admin-centainer{
    width:1180px;
    margin:auto;
    margin-top:20px;
    .teacher-top{
        display:flex;
        align-items:center;
    }
    .page-div{
        display:flex;
        justify-content:center;
    }
}

</style>