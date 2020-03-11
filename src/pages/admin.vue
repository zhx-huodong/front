<template>
    <div class="admin-centainer">
        <el-card style="min-height:600px;">
            <el-tabs v-model="activeName" @tab-click="tabClick">
                <el-tab-pane label="教师" name="teacher"></el-tab-pane>
                <el-tab-pane label="学生" name="student"></el-tab-pane>
                <el-tab-pane label="家长" name="parent"></el-tab-pane>
            </el-tabs>
            <div>
                <el-row class="teacher-top">
                        <el-col :span="2">所在地区</el-col>
                        <el-col :span="6">
                            <el-select v-model="areaVal" placeholder="请选择" size="small" @change="areaChange">
                                <el-option
                                v-for="item in areaList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2" v-if="index!=2">所在学校</el-col>
                        <el-col :span="6" v-if="index!=2">
                            <el-select v-model="schoolVal" placeholder="请选择" size="small" @change="schoolChange">
                                <el-option
                                v-for="item in schoolList"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2" v-if="index==1">关联家长</el-col>
                        <el-col :span="6" v-if="index==1">
                            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
                        </el-col>
                        <el-col :span="2" v-if="index==2">关联学生</el-col>
                        <el-col :span="6" v-if="index==2">
                            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="teacher-top">
                        <el-col :span="1">电话</el-col>
                        <el-col :span="6">
                            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
                        </el-col>
                        <el-col :span="1" :offset="1">姓名</el-col>
                        <el-col :span="6">
                            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <el-button type="primary" size="small">查询</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="danger" plain size="small">删除</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-table
                            ref="multipleTable"
                            :data="userList"
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
                            <template slot-scope="scope">{{ scope.row.mobile }}</template>
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
    import api from '../service/api';
    export default{
        data(){
            return{
                index:0,
                activeName: 'teacher',
                areaList: [
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
                schoolList:[],
                areaVal: '',
                schoolVal:'',
                input:'',
                userList: [],
                multipleSelection: [],
                currentRow: null,
                currentPage:1,//当前页
            };
        },
        mounted(){
            let params={}
            params.mtype=parseInt(this.index)+1
            this.getUserList(params) 
            params={}
            this.getSchoolList(params)
        },
        methods:{
            //获取用户列表
            async getUserList(params){
                params.url=api.user
                let res = await this.axiosGet(params).catch(err => err);
                console.log("userlist===",res.items)
                this.userList=res.items
            },
            async getSchoolList(params){
                params.url=api.school
                let res=await this.axiosGet(params).catch(err=>err);
                console.log("schoolList===",res.items)
                this.schoolList=res.items
            },
            //区域改变
            async areaChange(id){
                console.log("area===",id)
                this.areaVal=id
                this.schoolVal=''
                let params={'filter[areaid]':this.areaVal}
                this.getSchoolList(params)
            },
            //学校改变
            schoolChange(id){
                console.log("school===",id)
                this.schoolVal=id
                let params={}
                params.school=this.schoolVal
                this.getUserList(params)
            },
            
            //导航栏
            tabClick(tab, event) {
                console.log(tab.index, event);
                this.index=tab.index
                let params={}
                params.mtype=parseInt(this.index)+1
                this.getUserList(params)
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