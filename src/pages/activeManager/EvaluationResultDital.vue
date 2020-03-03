<template>
  <div class="create-activity-container">
    <el-card style="min-height:650px">

      <el-page-header @back="back()" ></el-page-header>
      <hr />

     
      <div class="create-activity-body">
                <template>
          <el-table
            :data="tableData"
            border
            style="width:100%">
            <el-table-column
              prop="date"
              label="专家"
              width="230">
            </el-table-column>
            <el-table-column
              prop="name"
              label="评分"
              width="230">
            </el-table-column>
            <el-table-column
              prop="address"
              width="557"
              label="评语">
            </el-table-column>
          </el-table>
           <el-table
            :show-header="false"
            :data="tableData2"
            border
            style="width:100%">
            <el-table-column
              prop="date"
              label=""
              width="230">
            </el-table-column>
            <el-table-column
              prop="address"
              width="787"
              label="">
            </el-table-column>
          </el-table>
        </template>
      </div>
       <hr />
       <span style="font-size:16px;
font-family:Microsoft YaHei;
font-weight:400;
color:rgba(102,102,102,1);
line-height:43px;">作品信息</span>

      <h2 style="text-align:center">山海经之大禹娶妻</h2>
      <div style="width:711px;margin-left:218px;">
         <p style="font-size:13px;
font-family:Adobe Heiti Std;
font-weight:normal;
color:rgba(102,102,102,1);
line-height:29px;">大禹治水的故事想必是中华名族流传已久的经典之一 ，他身为一个治水英雄他心怀天下， 曾三过家门而不入，而他的故事背后时常被我们忽略的一个同样伟大的人，是他的妻子 ， 她为他生下儿子，养育成人，一生守候，不仅没有半分怨言，还让儿子长大后和大禹一起去治水， 她不像大禹那样被世人赞美传颂，很少人知道她的名字，可谓正的伟大，而相传她也并不是一般女子， 而是九尾狐仙，涂山氏女娇，我们一听到狐狸，总会联想起蛊惑人心的妖精，或者助纣为虐的妖后妲己， 但很少人知道，山海经中的九尾曾是瑞兽，有吉祥美满的寓意，大禹治水三十未能成家，在涂山遇到了九尾的暗示 歌道：“绥绥白狐，九尾痝痝。我家嘉夷，来宾为王。”后娶其为妻。 作品描绘的正是大禹在治水的路上路经涂山，遇到九尾歌唱给予暗示的场景， 他随着歌声寻觅此,隔岸对歌回应着，生而为人自然有七情六欲，只是身怀大业， 婚后第四日遍离家治水了，但他们的相遇相识也如一般男女那样美好难忘吧。 希望今后提到九尾，不再只是封印在鸣人体内的神兽，不再是祸国殃民的的妖后， 而也是我们山海经里的瑞兽，是狐仙，最后 ，万物皆有灵，愿我们善待每一种生物，尊重每一种文化。</p>
      </div>
      <div style="margin: 52px 0 0px 107px;">
        <img src="../../public/images/dayu1.png" height="1683" width="932"/>
        <img src="../../public/images/dayu2.png" height="1683" width="932"/>
       
        <p> 活动组别：计算机创作</p>
        <p> 活动项目： 电脑绘画作</p>
        <p> 作者：张三 李四</p>
        <p> 指导老师：陈老师</p>
        <p> 作者邮箱：21131313@163.com</p>
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
      tableData:[
        {date:"陈老师",name:"95",address:"作品做的非常好，生动表现出人物性格"},
        {date:"陈老师",name:"95",address:"作品做的非常好，生动表现出人物性格"},
        {date:"陈老师",name:"95",address:"作品做的非常好，生动表现出人物性格"},
      ],
      tableData2:[
        {date:"综合评分",address:"95",},
        
      ],
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
            {name:"南山",id:1},
            {name:"宝安",id:2},
            {name:"西乡",id:3},
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