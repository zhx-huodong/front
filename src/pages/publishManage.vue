<template>
  <div class="publish-manage">
    <div class="action-bar">
      <div class="icon" @click="$router.back(-1)">
        <img class="el-icon-back" src="../public/images/return.svg">
      </div>
      <div class="btn">
        <el-button @click="save" type="primary" :disabled="lockAction">保存</el-button>
        <el-button @click="preview" :disabled="lockAction">预览</el-button>
      </div>
    </div>
    <div class="manage-content">
      <div class="content-component">
        <div class="title">
          <span>组件</span>
        </div>
        <div class="component-list">
          <activity-component-list
            v-for="(c, index) in componentList"
            :type="c.type"
            :name="c.name"
            :text="c.text"
            :key="index"
            @click.native="addComponent(c)"
          ></activity-component-list>
        </div>
      </div>
      <div class="content-show">
        <div class="activity-edit">
          <div v-if="selectedComponents.length == 0" style="text-align: center">请点击左侧组件进行添加</div>
          <component-item
            v-else
            v-for="(item, index) in selectedComponents"
            :type="item.type"
            :name="item.name"
            :text="item.text"
            :url="item.url || ''"
            :key="index"
            :styleType="item.styleType"
            :class="index == selectedIndex ? 'item-active' : ''"
            @click.native="editStyle(index, item)">
            <div class="action-icon" slot="action" v-if="index == selectedIndex">
              <img class="action-up" @click.stop="moveUp" src="../public/images/up.svg">
              <img class="action-down" @click.stop="moveDown" src="../public/images/down.svg">
              <img class="action-delete" @click.stop="deleteItem" src="../public/images/delete.svg">
            </div>
          </component-item>
        </div>
      </div>
      <div class="content-style">
        <div class="title">
          <span v-if="fileType.indexOf(curEditComponent.type) == -1">样式选择</span>
          <span v-else-if="curEditComponent.type == 'picture'">图片源</span>
          <span v-else-if="curEditComponent.type == 'video'">视频源</span>
          <span v-else-if="curEditComponent.type == 'audio'">音频源</span>
        </div>
        <style-edit
          ref="styleEdit"
          v-if="curEditComponent.show"
          :type="curEditComponent.type"
          :name="curEditComponent.name"
          :styleType="curEditComponent.styleType"
          :text="curEditComponent.text"
          :url="curEditComponent.url"
          @changeTypeText="changeTypeText"
          @addFile="addFileComponent"
          @uploading="changeStatus"
        ></style-edit>
      </div>
    </div>
    <el-dialog title="预览" :visible.sync="dialog.preview.show" width="350px">
      <div class="preview-box">
        <vue-qr
          :size="200"
          :dotScale="1"
          :text="previewUrl">
        </vue-qr>
        <div>预览二维码仅限于查看编辑效果，短期内会失效。</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ActivityComponentList from '../components/ActivityCompoentList';
  import StyleEdit from '../components/publishManage/StyleEdit';
  import ComponentItem from '../components/publishManage/ComponentItem';
  import { swapItems } from '../tools/tools';
  import VueQr from 'vue-qr';

  export default {
    name: 'activity-center',
    components: { ActivityComponentList, ComponentItem, StyleEdit, VueQr },
    data() {
      return {
        msg: '活动发布与管理',
        componentList: [
          { type: 'title', name: '主标题', text: '这是一个标题' },
          { type: 'content', name: '内容', text: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是' },
          { type: 'secTitle', name: '段落标题', text: '赛事流程安排' },
          { type: 'video', name: '视频', text: '' },
          { type: 'audio', name: '音频', text: '' },
          { type: 'picture', name: '图片', text: '' },
          { type: 'button', name: '按钮', text: '报名入口' }
        ],
        videoUrl: 'https://courseware-1259194201.cos.ap-guangzhou.myqcloud.com/1113/4/1566364986-7547264871797397412',
        audioUrl: 'https://saas-develop-1255701415.cos.ap-guangzhou.myqcloud.com/gouzhong.mp3',
        styleType: 2,
        selectedComponents: [], // 中间预览组件列表
        curEditComponent: { // 当前编辑组件的类型
          index: 0,
          show: false,
          name: '',
          styleType: '',
          text: '',
          type: '',
          url: ''
        },
        selectedIndex: 0,
        fileType: ['picture', 'video', 'audio'], // 文件类型组件
        dialog: {
          preview: { show: false }, // 预览二维码
          publish: { show: false } // 发布
        },
        previewUrl: '',
        ActivityId: '',
        previewPageId: '',
        uploading: false
      };
    },
    computed: {
      lockAction() {
        return this.selectedComponents.length == 0;
      }
    },
    mounted() {
      this.ActivityId = this.$route.query.id || '';
      this.getPage();
    },
    methods: {
      changeStatus(uploading) {
        this.uploading = uploading;
      },
      addComponent(item) {
        item.styleType = 2; // 默认样式2
        item.url = '';
        this.selectedComponents.push(item);
        this.editStyle(this.selectedComponents.length - 1, item); // 同时进行编辑
        setTimeout(() => {
          if (this.fileType.indexOf(item.type) > -1) this.$refs.styleEdit.clearUrlAndText();
        });
      },
      addFileComponent(item) {
        this.uploading = false;
        let curItem = this.selectedComponents[this.selectedIndex];
        curItem.text = item.filename;
        curItem.url = item.url;
        this.$set(this.selectedComponents, this.selectedIndex, curItem);
      },
      editStyle(index, item) {
        if (this.uploading) return this.$message.error('请先等待上传完成');
        if (!item) return;
        for (let key in item) this.curEditComponent[key] = item[key];
        this.curEditComponent.show = true;
        this.selectedIndex = index;
        setTimeout(() => {
          this.$refs.styleEdit.selectStyle(item.styleType, item.text, item.url);
        });
      },
      changeTypeText(data) {
        let newItem = {
          name: this.curEditComponent.name,
          styleType: data.type,
          text: data.text,
          type: this.curEditComponent.type,
          url: data.url
        };
        this.$set(this.selectedComponents, this.selectedIndex, newItem);
      },
      moveUp() { // 上移
        if (this.uploading) return;
        if (this.selectedIndex == 0) return;
        swapItems(this.selectedComponents, this.selectedIndex, this.selectedIndex - 1);
        this.selectedIndex -= 1;
      },
      moveDown() { // 下移
        if (this.uploading) return;
        if (this.selectedIndex == this.selectedComponents.length - 1) return;
        swapItems(this.selectedComponents, this.selectedIndex, this.selectedIndex + 1);
        this.selectedIndex += 1;
      },
      deleteItem() {
        if (this.uploading) return;
        this.selectedComponents.splice(this.selectedIndex, 1);
        if (this.selectedIndex != 0) this.selectedIndex -= 1;
        let newItem = this.selectedComponents[this.selectedIndex];
        this.editStyle(this.selectedIndex, newItem);
      },
      async preview() {
        await this.axiosPost({
          url: '/v1/page/SavePreviewPage',
          ActivityId: this.ActivityId,
          Content: JSON.stringify(this.selectedComponents)
        }).catch(err => err);
        let host = location.hostname == '127.0.0.1' ? 'https://upclass.educloud.tencent.com'
          : (location.protocol + '//' + location.host);
        this.previewUrl = `${host}/h5/?ActivityId=${this.ActivityId}&preview=1`;
        this.dialog.preview.show = true;
      },
      async save() {
        if (!this.checkComponents()) return this.$message.error('请讲内容补充完整');
        let res = await this.axiosPost({
          url: '/v1/page/SavePage',
          ActivityId: this.ActivityId,
          PageId: this.PageId,
          Content: JSON.stringify(this.selectedComponents)
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;
        this.$message.success('保存成功');
      },
      async getPage() { // 获取编辑内容
        let res = await this.axiosGet({
          url: '/v1/page/GetPage',
          ActivityId: this.ActivityId
        }).catch(err => err);
        if (res.ErrorCode != 'OK') return;

        let Content = res.Data.Content;
        if (!Content) return;
        this.selectedComponents = JSON.parse(Content);
        setTimeout(() => {
          let firstItem = this.selectedComponents[0];
          if (firstItem) this.editStyle(0, firstItem);
        });
      },
      checkComponents() {
        for (let item of this.selectedComponents) {
          if (this.fileType.indexOf(item.type) > -1) { // 文件类型
            if (!item.url) return false;
          } else {
            if (!item.text) return false;
          }
        }
        return true;
      }
    }
  };
</script>
<style lang="less">
  .publish-manage {
    *::-webkit-scrollbar { /*滚动条整体样式*/
      width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 8px;
    }

    *::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
      border-radius: 4px;
      background-color: #2568ED
    }

    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #EEEEEE;
    .action-bar {
      background-color: #FFFFFF;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        img {
          font-size: 20px;
          margin-left: 20px;
          color: #2467EC;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .btn {
        margin-right: 20px;
      }
    }
    .manage-content {
      display: flex;
      height: 100%;
      .content-component .title, .content-style .title {
        width: 100%;
        background-color: #689DFF;
        height: 40px;
        color: #FFFFFF;
        line-height: 40px;
        span {
          margin-left: 20px;
        }
      }
      .content-component {
        background-color: #F6F6F6;
        width: 400px;
        display: flex;
        height: 100%;
        flex-direction: column;
        .component-list {
          overflow-y: auto;
          padding: 20px;
          height: 100%;
          .component-item {
            background-color: #ffffff;
          }
        }
      }
      .content-show {
        flex: 1;
        padding: 20px 0;
        .activity-edit {
          padding: 10px;
          box-sizing: border-box;
          width: 400px;
          margin: 0 auto;
          height: 100%;
          overflow-y: auto;
          background-color: #FFFFFF;
          &-top-title {
            margin: 0 auto;
          }
          .component-item {
            position: relative;
            margin-bottom: 20px;
            padding: 10px 5px;
            &:hover {
              cursor: pointer;
            }
            .action-icon {
              img {
                position: absolute;
                width: 14px;
                height: 14px;
                &:hover {
                  cursor: pointer;
                }
              }
              .action-up {
                top: -8px;
                left: 50%;
                transform: translateX(-50%);
              }
              .action-delete {
                top: -8px;
                right: -8px;
              }
              .action-down {
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
              }
            }
          }
          .item-active {
            border: 2px solid #FA5555;
          }
        }
      }
      .content-style {
        width: 400px;
        background-color: #FFFFFF;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        .style-action {
          text-align: center;
          color: #3a8ee6;
          margin: 10px 0;
          .icon {
            font-size: 20px;
            margin: 0 10px;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .style-list {
          padding: 20px;
          .style-title {
            margin-bottom: 10px;
            color: #000000;
            font-weight: 400;
            font-size: 16px;
            .textarea {
              height: 100%;
            }
          }
        }
      }
    }
    .preview-box {
      margin-top: -20px;
      text-align: center;
    }
  }
</style>
