<template>
  <div class="component-style-edit">
    <div v-if="showInputList.indexOf(type) > -1">
      <div class="edit-title">文本内容编辑</div>
      <el-input
        class="text-input"
        type="textarea"
        placeholder="内容编辑"
        v-model="myText"
      ></el-input>
      <div class="edit-title">样式风格选择</div>
      <el-card v-for="t in styleTypeList" class="card-item" :key="t">
        <component-item
          :style-type="t"
          :type="type"
          :name="name"
          :text="myText"
          @click.native="selectStyle(t)"
        ></component-item>
        <i v-if="selectedStyleType == t" class="select el-icon-circle-check"></i>
      </el-card>
    </div>
    <div class="upload-action" v-else>
      <div v-if="type == 'picture'">
        <el-button @click="uploadFile">{{ myUrl ? '更换图片' : '上传图片' }}</el-button>
        <span class="tip">支持jpg、jpeg、png格式，不超过2M</span>
      </div>
      <div v-if="type == 'video'">
        <el-button @click="uploadFile">{{ myUrl ? '更换视频' : '上传视频' }}</el-button>
        <span class="tip">支持mp4格式</span>
      </div>
      <div v-if="type == 'audio'">
        <el-button @click="uploadFile">{{ myUrl ? '更换音频' : '上传音频' }}</el-button>
        <span class="tip">支持mp3格式</span>
      </div>
      <div class="file-list" v-if="myUrl">
        {{ myText }}
      </div>
      <div v-if="type == 'audio'">
        <div class="edit-title" style="margin-top: 20px">样式风格选择</div>
        <el-card v-for="t in styleTypeList" class="card-item" :key="t">
          <component-item
            :style-type="t"
            :type="type"
            :name="name"
            :text="myText"
            :static="true"
            @click.native="selectStyle(t)"
          ></component-item>
          <i v-if="selectedStyleType == t" class="select el-icon-circle-check"></i>
        </el-card>
      </div>
    </div>
    <cos
      ref="cos"
      :valid-list="validList"
      :limit="fileLimit"
      @success="uploadSuccess"
      @start="uploadStart"
    ></cos>
  </div>
</template>
<script>
  import ComponentItem from './ComponentItem';
  import Cos from '../../components/Cos';

  export default {
    components: { Cos, ComponentItem },
    props: {
      type: { type: String, required: true }, // 组件类型
      name: { type: String, required: true }, // 组件名称
      styleType: { type: Number, default: 2 }, // 组件样式类型
      text: { type: String, default: '' }, // 组件文字
      url: { type: String } // 图片、音频、视频地址
    },
    data() {
      return {
        myText: '',
        selectedStyleType: '', // 选择的样式类型
        myUrl: '',
        styleTypeList: [1, 2, 3],
        maxLength: 30, // 标题类型字数限制为10
        showInputList: ['title', 'secTitle', 'content', 'button'],
        validList: ['mp4'],
        fileLimit: 200
      };
    },
    watch: {
      myText(val) {
        this.$emit('changeTypeText', {
          type: this.selectedStyleType,
          url: this.myUrl,
          text: val
        });
      },
      text(val) {
        this.myText = val;
      },
      url(val) {
        this.myUrl = val;
      },
      type(val) {
        if (val == 'content') this.maxLength = 600;
        else this.maxLength = 10;
        if (val == 'title') this.styleTypeList = [1, 2, 3, 4];
        else this.styleTypeList = [1, 2, 3];
        this.setFileType(val);
      }
    },
    mounted() {
      this.myText = this.text;
      this.myUrl = this.url;
      this.selectedStyleType = this.styleType;
      if (this.type == 'title') this.styleTypeList = [1, 2, 3, 4];
      else this.styleTypeList = [1, 2, 3];
      this.setFileType(this.type);
    },
    methods: {
      selectStyle(type, text, url) {
        this.selectedStyleType = type;
        if (typeof text != 'undefined') this.myText = text;
        if (typeof url != 'undefined') this.myUrl = url;
        this.$emit('changeTypeText', {
          type: this.selectedStyleType,
          text: this.myText,
          url: this.myUrl
        });
      },
      uploadSuccess(data) {
        let url = 'https://' + data.Location;
        this.myUrl = url;
        this.myText = data.filename;
        this.$emit('addFile', {
          url: url,
          name: this.name,
          filename: data.filename,
          styleType: this.selectedStyleType,
          type: this.type
        });
      },
      clearUrlAndText() {
        this.myText = '';
        this.myUrl = '';
      },
      setFileType(type) {
        if (type == 'picture') {
          this.validList = ['png', 'jpg', 'jpeg'];
          this.fileLimit = 2;
        } else if (type == 'video') {
          this.validList = ['mp4'];
          this.fileLimit = 200;
        } else if (type == 'audio') {
          this.validList = ['mp3'];
          this.fileLimit = 100;
        }
      },
      uploadStart() {
        this.$emit('uploading', true);
      },
      uploadFile() {
        this.$refs.cos.$refs.fileEle.dispatchEvent(new MouseEvent('click'));
      }
    }
  };
</script>
<style lang="less">
  .component-style-edit {
    padding: 20px;
    .edit-title {
      font-size: 15px;
      margin-bottom: 10px;
    }
    .text-input {
      margin-bottom: 20px;
    }
    .el-textarea {
      height: 150px;
      margin-bottom: 20px;
      textarea {
        height: 100%;
      }
    }
    .card-item {
      margin-bottom: 10px;
      position: relative;
      &:hover {
        cursor: pointer;
      }
      .select {
        position: absolute;
        right: 10px;
        bottom: 10px;
        font-weight: bold;
        color: #13ce66;
        font-size: 20px;
      }
    }
    .file-list {
      margin-top: 12px;
      margin-bottom: 20px;
      background: #F0F2F5;
      color: #5A5E66;
      padding: 10px;
      font-size: 12px;
    }
    .upload-action {
      .tip {
        color: #999;
        font-size: 14px;
        margin-left: 5px;
      }
    }
  }
</style>
