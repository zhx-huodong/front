<template>
  <div class="audit-warrp">
    <div>
      <div class="audit-center">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待审核的活动" name="first">
            <div class="audit-buttom">
              <el-button @click="choseprofrom('', 1)" type="primary" :disabled="checkedList1.length == 0">审核通过</el-button>
              <el-button @click="choseprofrom('', 0)" type="primary" :disabled="checkedList1.length == 0">审核不通过</el-button>
            </div>
            <div class="audit-checkbox" v-for="(item, index) in dataList" :key="index">
              <el-checkbox @change="onChange1($event, item)" v-model="item.checked"></el-checkbox>
              <div class="audit-box">
                <img class="audit-image" :src="item.ActivityLogo"/>
                <div class="audit-content">
                  <div class="audit-content-title">{{item.ActivityName}}</div>
                  <div class="audit-content-word" style="width: 756px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.ActivityDesc}}</div>
                  <div class="audit-content-word" v-if="item.StartTime || item.EndTime">
                    {{ item.StartTime }} - {{ item.EndTime }}
                  </div>
                </div>
                <div class="audit-info">
                  <el-button type="text" @click="goToActDetail(item)">详情</el-button>
                  <el-button type="text" @click="choseprofrom(item, 1)">通过</el-button>
                  <el-button type="text" @click="choseprofrom(item, 0)">不通过</el-button>
                </div>
              </div>
            </div>
            <el-pagination
              background
              layout="prev, pager, next" :total="total1" :page-size="PageSize1"
              :current-page="currentPage1" @current-change="handleCurrentChange">
            </el-pagination>
          </el-tab-pane>

          <el-tab-pane label="已审核的活动" name="second">
            <div class="audit-buttom">
              <el-button @click="offline()" type="primary" :disabled="checkedList2.length == 0">活动下线</el-button>
            </div>
            <div class="audit-checkbox" v-for="(item, index) in dataList" :key="index">
              <el-checkbox @change="onChange2($event, item)" v-model="item.checked"></el-checkbox>
              <div class="audit-box">
                <img class="audit-image" :src="item.ActivityLogo"/>
                <div class="audit-content">
                  <div class="audit-content-title">{{item.ActivityName}}</div>
                  <div class="audit-content-word" style="width: 756px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.ActivityDesc}}</div>
                  <div class="audit-content-word" v-if="item.StartTime || item.EndTime">
                    {{item.StartTime}}-{{item.EndTime}}
                  </div>
                </div>
                <div class="audit-info">
                  <el-button type="text" @click="goToActDetail(item)">详情</el-button>
                  <el-button type="text" @click="offline(item.ActivityId)">下线</el-button>
                </div>
              </div>
            </div>
            <el-pagination
              background
              layout="prev, pager, next" :total="total2" :page-size="PageSize2"
              :current-page="currentPage2" @current-change="handleCurrentChange">
            </el-pagination>
          </el-tab-pane>

          <el-tab-pane label="审核未通过的活动" name="third">
            <div class="audit-buttom">
              <el-button @click="passClick()" type="primary" :disabled="checkedList3.length == 0">审核通过</el-button>
            </div>
            <div class="audit-checkbox" v-for="(item, index) in dataList" :key="index">
              <el-checkbox @change="onChange3($event, item)" v-model="item.checked"></el-checkbox>
              <div class="audit-box">
                <img class="audit-image" :src="item.ActivityLogo"/>
                <div class="audit-content">
                  <div class="audit-content-title">{{item.ActivityName}}</div>
                  <div class="audit-content-word" style="width: 756px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.ActivityDesc}}</div>
                  <div class="audit-content-word" v-if="item.StartTime || item.EndTime">
                    {{item.StartTime}}-{{item.EndTime}}
                  </div>
                </div>
                <div class="audit-info">
                  <el-button type="text" @click="goToActDetail(item)">详情</el-button>
                  <el-button type="text" @click="passClick(item.ActivityId)">通过</el-button>
                </div>
              </div>
            </div>
            <el-pagination
              background
              layout="prev, pager, next" :total="total3" :page-size="PageSize3"
              :current-page="currentPage3" @current-change="handleCurrentChange">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog title="审核不通过" :visible.sync="noPassDialog" width="30%">
      <div class="dialog-title">请输入审核不通过的原因</div>
      <el-input type="textarea" style="width:348px;height:71px;" v-model="from.Message"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noPassDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isShow: true,
        onShow: true,
        showMask: false,
        Status: 'ACTIVITY_WAITING_AUDIT',
        ActivityId: [],
        activeName: 'first',
        dataList: [],
        from: {
          Status: 'ACTIVITY_AUDIT_REJECT',
          Message: ''
        },
        noPassDialog: false,
        checkedList1: [], // 待审核活动
        checkedList2: [], // 已审核活动
        checkedList3: [], // 审核未通过活动
        actionIdList: [],
        total1: 0,
        total2: 0,
        total3: 0,
        PageSize1: 10,
        PageSize2: 10,
        PageSize3: 10,
        currentPage1: 1,
        currentPage2: 1,
        currentPage3: 1
      };
    },
    created() {
      this.init();
    },
    methods: {
      async init() {
        this.checkedList1 = [];
        this.checkedList2 = [];
        this.checkedList3 = [];
        let PageSize, currPage;
        if (this.Status == 'ACTIVITY_WAITING_AUDIT') {
          PageSize = this.PageSize1; currPage = this.currentPage1;
        } else if (this.Status == 'ACTIVITY_AUDIT_ACCEPT') {
          PageSize = this.PageSize2; currPage = this.currentPage2;
        } else if (this.Status == 'ACTIVITY_AUDIT_REJECT') {
          PageSize = this.PageSize3; currPage = this.currentPage3;
        }
        let res = await this.axiosGet({
          url: '/v1/activity/GetMyAuditActivityList',
          PageNum: currPage,
          PageSize: PageSize,
          Status: this.Status
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

        let list = res.Data.ActivityList;
        list.forEach(item => {
          item.StartTime = this.timeFormat(item.StartTime * 1000, 'yyyy-MM-dd');
          item.EndTime = this.timeFormat(item.EndTime * 1000, 'yyyy-MM-dd');
          item.checked = false;
        });
        this.dataList = res.Data.ActivityList;
        this.total1 = this.total2 = this.total3 = res.Data.Total;
      },
      handleCurrentChange(page) {
        this.currentPage1 = this.currentPage2 = this.currentPage3 = page;
        this.init();
      },
      async offline(ActivityId) {
        let res = await this.axiosPost({
          url: '/v1/activity/AuditActivity',
          ActivityId: ActivityId ? [ActivityId] : this.checkedList2,
          Status: 'ACTIVITY_FORBIDDEN',
          Message: '活动下线'
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

        this.$message.success('下线成功');
        this.init();
      },
      async passClick(ActivityId) {
        let res = await this.axiosPost({
          url: '/v1/activity/AuditActivity',
          ActivityId: ActivityId ? [ActivityId] : this.checkedList3,
          Status: 'ACTIVITY_AUDIT_ACCEPT',
          Message: '通过'
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

        this.$message.success('审核通过');
        this.init();
      },
      handleClick(tab, event) {
        this.currentPage1 = this.currentPage2 = this.currentPage3 = 1;
        if (tab.index == 0) {
          this.Status = 'ACTIVITY_WAITING_AUDIT';
          this.init();
        } else if (tab.index == 1) {
          this.Status = 'ACTIVITY_AUDIT_ACCEPT';
          this.init();
        } else if (tab.index == 2) {
          this.Status = 'ACTIVITY_AUDIT_REJECT';
          this.init();
        }
      },
      onChange1(event, item) {
        if (event) {
          this.checkedList1.push(item.ActivityId);
        } else {
          let delIndex = this.checkedList1.indexOf(item.ActivityId);
          this.checkedList1.splice(delIndex, 1);
        }
      },
      onChange2(event, item) {
        if (event) {
          this.checkedList2.push(item.ActivityId);
        } else {
          let delIndex = this.checkedList1.indexOf(item.ActivityId);
          this.checkedList2.splice(delIndex, 1);
        }
      },
      onChange3(event, item) {
        if (event) {
          this.checkedList3.push(item.ActivityId);
        } else {
          let delIndex = this.checkedList3.indexOf(item.ActivityId);
          this.checkedList3.splice(delIndex, 1);
        }
      },
      async confirmBtn() {
        let res = await this.axiosPost({
          url: '/v1/activity/AuditActivity',
          ActivityId: this.actionIdList,
          Status: 'ACTIVITY_AUDIT_REJECT',
          Message: this.from.Message
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return this.$messsage.error(res.ErrorMsg);

        this.noPassDialog = false;
        this.$message.success('提交成功');
        this.init();
      },
      async choseprofrom(item, type) {
        if (type == 0) { // 审核不通过，需要弹框填写原因
          this.noPassDialog = true;
          this.actionIdList = item ? [item.ActivityId] : this.checkedList1;
        } else {
          let res = await this.axiosPost({
            url: '/v1/activity/AuditActivity',
            ActivityId: item ? [item.ActivityId] : this.checkedList1,
            Status: 'ACTIVITY_AUDIT_ACCEPT',
            Message: '通过'
          }).catch(err => err);
          if (res.ErrorCode != 'OK') return this.$message.error(res.ErrorMsg);

          this.$message.success('审核通过');
          this.init();
        }
      },
      goToActDetail(item) {
        this.$router.push({
          path: '/auditActivity/auditDetail',
          query: {
            id: item.ActivityId,
            name: item.ActivityName
          }
        });
      }
    }
  };
</script>
<style lang="less">
  .audit-warrp {
    display: flex;
    justify-content: center;
    align-items: center;
    .audit-center {
      width: 1180px;
      .audit-buttom {
        display: flex;
        .audit-box-item {
          width: 90px;
          height: 40px;
          border-radius: 4px;
          font-size: 14px;
          line-height: 40px;
          color: #888888;
          margin-right: 20px;
          text-align: center;
        }
        .secectBackground {
          width: 90px;
          height: 40px;
          border-radius: 4px;
          font-size: 14px;
          background-color: #2568ED;
          margin-right: 20px;
          text-align: center;
          line-height: 40px;
          color: #FFFFFF
        }
      }
      .audit-via {
        width: 110px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 4px;
        background-color: #2568ed;
        color: #ffffff;
      }
      .audit-checkbox {
        display: flex;
        padding: 10px;
        margin-top: 40px;
        border: 1px solid #d8dce6;
        .el-checkbox {
          margin-right: 10px;
          display: flex;
          align-items: center;
        }
        .audit-box {
          flex: 1;
          display: flex;
          .audit-image {
            width: 90px;
            height: 90px;
            margin-right: 20px
          }
          .audit-content {
            line-height: 30px;
            .audit-content-title {
              font-size: 16px;
              color: #000000;
              font-weight: 600;
            }
          }
          .audit-info {
            display: flex;
            padding-left: 50px;
            .audit-info-one {
              color: #2568ED;
              margin-right: 20px;
            }
            .audit-info-two {
              margin-right: 20px;
              color: #E5E5E5;
              height: 18px;
            }
          }
        }
      }
    }
    .dialog-title {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .el-pagination {
      margin-top: 10px;
    }
  }
</style>
<style lang="less">
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #808080
  }
</style>
