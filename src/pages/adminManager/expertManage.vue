<template>
    <div class="expert-centainer">
        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="专家管理" name="expertManage">
                    <!-- <div class="activity-lable">
                        <type-select v-if="gradeList.length > 0 && regionList.length > 0"
                          :gradeList="gradeList" :regionList="regionList"
                        ></type-select>
                    </div> -->
                    <el-row>
                        <el-col :span="3">
                            <el-button type="primary" @click="goToAddExpert">添加专家</el-button>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary" plain @click="goToImportExpert">导入专家</el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="danger" plain @click="goToDeleteExpert">删除</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入搜索内容" v-model="searchVal"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button icon="el-icon-search" type="primary" @click="goToSearch">搜索</el-button>
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
                            prop="introduce"
                            label="介绍"
                            show-overflow-tooltip>
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
                                <el-button @click="goToEdit(scope.row)" type="text" size="small">编辑</el-button>
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
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
import TypeSelect from '../../components/TypeSelect';
    export default{
        components: {TypeSelect},
        data(){
            return{
                   	gradeList:[
		    { Id : 0, Name : '全部' },
        { Id : 1, Name : '小学组' },
        { Id : 2, Name : '初中组' },
        { Id : 3, Name : '高中组' },
      ],
      regionList:[
      {Id:0, Name:'全部'},
      {Id:1, Name:'罗湖区'},
      {Id:2, Name:'南山区'},
      {Id:3, Name:'宝安区'},
      {Id:4, Name:'罗湖区'},
      {Id:5, Name:'盐田区'},
      {Id:6, Name:'龙岗区'},
    	],
                activeName:'expertManage',
                searchVal:'',//搜索
                tableData: [{
                    name: '陆同学',
                    phoneNum: '13714264534',
                    introduce:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                    }, {
                    phoneNum: '13714264534',
                    name: '陆同学',
                    introduce:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                    }, {
                    phoneNum: '13714264534',
                    name: '陆同学',
                    introduce:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                    }, {
                    phoneNum: '13714264534',
                    name: '陆同学',
                    introduce:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                    }, {
                    phoneNum: '13714264534',
                    name: '陆同学',
                    introduce:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                    }, {
                    phoneNum: '13714264534',
                    name: '陆同学',
                    introduce:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                    }, {
                    phoneNum: '13714264534',
                    name: '陆同学',
                    introduce:' 思想家，自由主义大师，国学大师，中国近代史学者 ，时事批评家，台湾作家，历史学家，诗人'
                    }
                ],
                multipleSelection: [],
                currentPage:1,//当前页
            }
        },
        mounted(){

        },
        methods:{
            //添加专家
            goToAddExpert(){
                this.$router.push({
                    path: '/addExpert',
                })
            },
            //导入专家
            goToImportExpert(){
                this.$router.push({
                    path: '/importExpert',
                })   
            },
            //删除专家
            goToDeleteExpert(){

            },
            //搜索
            goToSearch(){
                console.log("搜索")
            },
            //编辑
            goToEdit(){

            },
            //列表选择
            tableSelectionChange(val){
                this.multipleSelection = val;
            },
            //删除
            goToDelete(index, rows){
                this.open(index, rows)
            },
            //每页数量改变
            pageSizeChange(val){

            },
            //页码改变
            pageCurrentChange(val){

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
<style lang="less" scoped>
.expert-centainer{
    width:1180px;
    margin:auto;
    margin-top:20px;
    .page-div{
        display:flex;
        justify-content:center;
    }
}
</style>