<template>
  <div class="create-activity-container">
    <el-card style="min-height:650px">
  
      <el-page-header @back="back()" content="项目编辑"></el-page-header>
      <el-divider></el-divider>

      <div class="create-activity-body">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="项目名称:">
            <el-col :span="9">
              <el-input placeholder="请输入项目名称" v-model="form.date2" size="small"></el-input>
            </el-col>
          </el-form-item>

        <div class="my-editer" style="margin-left: 23px;">
            <P>项目介绍 ：</P>
            <my-editor @editorChange="editorChange"></my-editor>
        </div>
         <el-form-item label="学生人数上限:" >
            <el-col :span="9">
              <el-input placeholder="" v-model="form.date2" size="small"></el-input>
            </el-col>
          </el-form-item>

        <el-form-item label="指导老师上限:">
            <el-col :span="9">
              <el-input placeholder="" v-model="form.date2" size="small"></el-input>
            </el-col>
          </el-form-item>
         

        

            <el-form-item label="学段设置 :">
            <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
           
            <el-checkbox-group v-model="actLimit" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in list1" :label="city" :key="city">{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

         <el-form-item label="作品上传格式:">
                <el-select v-model="value" filterable placeholder="请选择" size="small">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value" filterable placeholder="请选择" size="small">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span>大小限制：</span>
                <el-select v-model="value" filterable placeholder="请选择" size="small">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            
          </el-form-item >
         
         
          <el-form-item>
           
            <el-button type="primary"  @click="back()" size="small">确定</el-button>
            <el-button @click="back()" size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
 
    </el-card>
    
 
  </div>
</template>
<script>
import MyEditor from "../../components/MyEditor";
export default {
  components: {
    MyEditor
  },
  data() {
    return {
        actLimit:[],
         checkAll: false,
         isIndeterminate: true,
         checkAll2: false,
         isIndeterminate2: true,
        list2:[
            {name:"老师",id:1},
            {name:"学生",id:2},
            {name:"学校",id:3},
        ],
         list1:[
            {name:"幼教组",id:1},
            {name:"小学组",id:2},
            {name:"初中组",id:3},
             {name:"高中组",id:4},
            {name:"特教组",id:5},
            {name:"中职组",id:6},
            {name:"高教组",id:7},
        ],
        object:[],
      activeName: "first",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      content: null,
      editorOption: {},
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      number:2000,
      list:[1,1,1,1,1,1,1,1,1,1,1],
      limitSet:false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
      edit(){
          this.$router.push({
              path:"/activeManager/createActivity/activeEdit",
          })
      },
      limitSetting(){
          console.log(this.limitSetting)
          if(this.limitSet==false){
              this.limitSet=true;
          }else{
               this.limitSet=false;
          }
      },
    back() {
      this.$router.go(-1);
    },
     handleCheckAllChange(val) {
        this.actLimit = val ? this.list1 : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.list1.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.list1.length;
      },
    handleCheckedCitiesChange2(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.list2.length;
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.list2.length;
      },
    
    
    //提交

    onSubmit() {
      console.log("submit!");
    },
    handlePictureCardPreview() {},
    handleRemove() {},
    //富文本内容改变
    editorChange(data) {
      console.log("data===", data);
    }
  }
};
</script>
<style lang="less" >
#mySelect {
  height: 25px;
  line-height: 25px;
  margin-left: 15px;
}
#myInput{
    height: 25px;
     line-height: 25px;
  margin-left: 15px;
}
.el-page-header__content {
  margin-left: 400px;
}
.myBox {
  width: 497px;
  height: 532px;
  background: rgba(255, 255, 255, 1);
  border: 3px solid #eee;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%; -50%);
  padding: 35px;
  p {
    font-size: 14px;
    color: #ccc;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .mtBoxList{
      margin-left: 20px;
  }
  .sure{
      background-color:#2568ED;color:#fff;
      margin-left: 30%;
      margin-top: 5%;
  }
  .myItem{
      margin-top: 20px;
    
          height: 290px;
          overflow: auto;
      table{
          width: 290px;
          border: 1px solid #eee;
          overflow: auto;
          tr{
              text-align: center;
              
              td{
                  padding: 3px 0px;
                  width: 50%;
              }
          }
      }
  }
}
.mybtn {
  line-height: 20px;
  padding: 3px 7px;
  display: inline-block;
  border: 1px solid #409eff;
  border-radius: 3px;
  margin-left: 67%;
}
.myOut {
  width: 710px;
  .content {
    height: 64px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(229, 229, 229, 1);
    padding-left: 50px;
    span {
      line-height: 64px;
    }
    .myBtns {
      line-height: 64px;
      margin-right: 30px;
      display: inline-block;
      float: right;
      a {
        margin-left: 10px;
      }
    }
  }
  .addclass {
    padding-left: 50px;
    color: #198af3;
    span {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .myTitle {
    height: 39px;
    background: rgba(238, 238, 238, 1);
    border: 1px solid rgba(229, 229, 229, 1);
    padding-left: 50px;

    .myBtns {
      margin-right: 30px;
      display: inline-block;
      float: right;
      a {
        margin-left: 10px;
      }
    }
  }
}

.el-upload--picture-card {
  // background-color: #fbfdff;
  // border: 1px dashed #c0ccda;
  border: 1px solid rgba(229, 229, 229, 1);
  border-radius: 6px;
  box-sizing: border-box;
  width: 243px;
  height: 147px;
  line-height: 147px;
  vertical-align: top;
  position: relative;
}
.create-activity-container {
  width: 1180px;
  margin: auto;
  margin-top: 20px;
  .title {
    // display:flex;
    // align:center;
    // text-align:center;
    // justify-content: center;
    // padding-top: 20px;
  }
  .create-activity-body {
    padding: 30px 60px;
  }
}
.upload-file {
  display: flex;
  justify-content: row;
  align-items: center;
  .annex {
    font-size: 14px;
    color: #198af3;
    padding: 5px;
    border: 1px solid #198af3;
    margin-left: 74px;
    border-radius: 3px;
  }
  p {
    margin-left: 30px;
    font-size: 14px;
    color: #999;
  }
  span {
  }
}
.prize-set {
  border: 1px solid #e5e5e5;
  margin-bottom: 20px;
  font-size: 14px;
  color: #333;
  padding: 20px;
  .prize-input {
    display: flex;
    flex-direction: row;
    margin-left: 100px;
    margin-top: 10px;
    .left {
      width: 300px;
    }
    .right {
      width: 200px;
      margin-left: 20px;
    }
    .option {
      width: 100px;
      margin-left: 20px;
    }
  }
}
.my-editer {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  p {
    font-size: 14px;
    color: #666;
  }
}
</style>