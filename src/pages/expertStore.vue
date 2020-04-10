<template>
  <div class="warrp">
    <div class="expert-content">
      <el-button @click="addClick" type="primary" style="margin-bottom: 10px">添加专家</el-button>
      <div class="exper-table">
        <el-table ref="multipleTable" tooltip-effect="dark" :data="tableData" style="width: 100%">
          <el-table-column prop="Username" label="专家姓名" width="193"></el-table-column>
          <el-table-column prop="Phone" label="联系电话" width="193"></el-table-column>
          <el-table-column prop="WorkUnit" label="所属单位" width="193"></el-table-column>
          <el-table-column prop="CreatedAt" label="创建时间">
            <template slot-scope="scope">
              {{ timeFormat(scope.row.CreatedAt * 1000, 'yyyy-MM-dd hh:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="pagesize"
          :current-page="currentPage"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="添加专家" :visible.sync="showAdd" width="500px">
      <el-form label-width="80px">
        <el-form-item label="专家姓名">
          <el-input v-model="form.Username" style="width: 300px" placeholder="支持中英文数字" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.Phone" style="width: 300px" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="所属单位">
          <el-input v-model="form.WorkUnit" style="width: 300px" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showAdd = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import { phoneReg, nameReg } from '../tools/validate';
  export default {
    data() {
      return {
        currentPage: 1, // 初始页
        pagesize: 10,
        total: 0,
        tableData: [],
        multipleSelection: [],
        showAdd: false,
        UserId: '',
        day: '',
        form: {
          Username: '',
          Phone: '',
          WorkUnit: ''
        }
      };
    },
    async created() {
      this.init();
    },
    methods: {
      async init() {
        let res = await this.axiosGet({
          url: '/v1/activity/GetExpertList',
          PageSize: this.pagesize,
          PageNum: this.currentPage
        }).catch(err => err);

        this.tableData = res.Data.ExpertInfo;
        this.total = res.Data.Total;
      },
      addClick() {
        for (let key in this.form) this.form[key] = '';
        this.showAdd = true;
      },
      async confirmBtn() {
        if (!nameReg.test(this.form.Username)) return this.$message.error('请输入正确的姓名');
        if (!phoneReg.test(this.form.Phone)) return this.$message.error('请输入正确的手机号');
        let res = await this.axiosPost({
          url: '/v1/activity/AddExpert',
          Username: this.form.Username,
          Phone: this.form.Phone,
          WorkUnit: this.form.WorkUnit
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

        this.$message.success('添加成功');
        this.showAdd = false;
        this.init();
      },
      handleDelete(row) {
        this.$confirm(`确定删除专家【${row.Username}】？`, '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await this.axiosGet({
            url: '/v1/activity/DeleteExpert',
            UserId: row.UserId
          }).catch(err => err);
          if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

          this.$message({ type: 'success', showClose: true, message: '删除成功', duration: 2000 });
          this.init();
        });
      },
      handleCurrentChange(page) {
        this.currentPage = page;
        this.init();
      }
    }
  };
</script>
<style lang="less" scoped>
  .warrp {
    display: flex;
    justify-content: center;
    align-items: center;
    .expert-content {
      width: 1180px;
      margin-top: 20px;
      .dialog {
        position: fixed;
        display: block;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        .dialog-container {
          width: 400px;
          height: 375px;
          background: #ffffff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 4px;
          position: relative;
          .dialog-title {
            width: 100%;
            height: 16px;
            font-size: 16px;
            color: #303133;
            font-weight: 400;
            padding: 16px 30px 0 25px;
            margin-bottom: 20px
          }
          .dialog-name {
            padding: 10px 30px 10px 25px;
            font-size: 16px;
            color: #000000;
            font-weight: 400;
          }
          .el-input {
            width: 348px;
            height: 40px;
            margin-left: 25px;
          }
          .el-icon-close:before {
            font-size: 9px;
            position: relative;
            bottom: 260px;
            left: 9px;
          }
          .inp {
            margin: 10px 0 0 20px;
            width: 200px;
            height: 40px;
            padding-left: 4px;
            border-radius: 4px;
            border: none;
            background: #efefef;
            outline: none;
            &:focus {
              border: 1px solid #509EE3;
            }
          }
          .btns {
            width: 100%;
            height: 60px;
            // line-height: 60px;
            position: absolute;
            bottom: 0;
            left: 0;
            text-align: center;
            padding: 0 16px;
            box-sizing: border-box;
            & > div {
              display: inline-block;
              height: 40px;
              line-height: 40px;
              padding: 0 14px;
              color: #ffffff;
              background: #f1f1f1;
              border-radius: 4px;
              margin-right: 12px;
              cursor: pointer;
            }
            .default-btn {
              width: 110px;
              height: 40px;
              color: #606266;
              text-align: center;
            }
            .confirm-btn {
              width: 110px;
              height: 40px;
              color: #ffffff;
              text-align: center;
              background: #2568ED;
              &:hover {
                background: #2568ED;
              }
            }
          }
          .close-btn {
            position: absolute;
            top: 260px;
            right: 10px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #000;
            font-size: 9px;
            cursor: pointer;
            &:hover {
              font-weight: 600;
            }
          }
        }
      }
      .exper-add {
        width: 95px;
        height: 40px;
        background-color: #2568ED;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 40px;
        text-align: center;
        border-radius: 4px;
        margin-bottom: 20px;
      }
    }
    .el-pagination {
      margin: 30px auto;
      text-align: center;
    }
  }
</style>
<style lang="less">
  .exper-table {
    .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
      padding-left: 0;
    }
  }
</style>
