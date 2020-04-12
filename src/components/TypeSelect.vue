<template>
  <div>
    <div class="lable" v-if="activityObjectList.length>0">
      <div class="lable-title">活动对象:</div>
      <div class="lable-aside">
        <div class="lable-self" v-for="(item, index) in activityObjectList" :key="index"
        @click="anActivityObjectList(item.id, index)" :class="{'type-active':activityObjectIndex == index}">{{item.name}}</div>
      </div>
    </div>
    <div class="lable" v-if="activityNameList.length>0">
      <div class="lable-title">活动名称:</div>
      <div class="lable-aside">
        <div class="lable-self" v-for="(item, index) in activityNameList" :key="index"
        @click="onActivityNameList(item.id, index)" :class="{'type-active':activityNameIndex == index}">{{item.name}}</div>
      </div>
    </div>
    <div class="lable" v-if="gradeList.length>0&&otherList.length<=0">
      <div class="lable-title">组别:</div>
      <div class="lable-aside">
        <div class="lable-self" v-for="(item, index) in gradeList" :key="index"
        @click="onGradeList(item.id, index)" :class="{'type-active':gradeIndex == index}">{{item.name}}</div>
      </div>
    </div>
    <div class="lable" v-if="activityTypleList.length>0">
      <div class="lable-title">活动分类:</div>
      <div class="lable-aside">
        <div class="lable-self" v-for="(item, index) in activityTypleList" :key="index"
        @click="onActivityTypleList(item.id, index)" :class="{'type-active':activityTypleIndex == index}">{{item.name}}</div>
      </div>
    </div>
    <div class="lable" v-if="activityProjectList.length>0">
      <div class="lable-title">活动项目:</div>
      <div class="lable-aside">
        <div class="lable-self" v-for="(item, index) in activityProjectList" :key="index"
        @click="onActivityProjectList(item.id, index)"  :class="{'type-active':activityProjectIndex == index}">{{item.name||item.title}}</div>
      </div>
    </div>
    <div class="lable" v-if="regionList.length>0">
      <div class="lable-title">区域:</div>
      <div class="lable-aside">
        <div class="lable-self" v-for="(item, index) in regionList" :key="index"
        @click="onRegionList(item.id, index)" :class="{'type-active':regionIndex == index}">{{item.name}}</div>
      </div>
    </div>
    <div class="lable" v-if="otherList.length>0">
      <div class="lable-title" v-if="otherName!=''&&otherName!=undefined">{{otherName}}:</div>
      <div class="lable-aside">
        <div class="lable-self" v-for="(item, index) in otherList" :key="index"
        @click="onOtherList(item.id, index)" :class="{'type-active':otherIndex == index}">{{item.name||item.title}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    activityObjectList:{ type:Array,default:function(){return []}},
    activityNameList: { type: Array,default:function(){return []} },
    activityTypleList: { type: Array,default:function(){return []} },
    activityProjectList:{type:Array,default:function(){return []}},
    regionList:{ type:Array,default:function(){return []}},
    otherList:{ type:Array,default:function(){return []}},
    otherName:{ type:String,default:function(){return ''}},
    gradeList:{ type:Array,default:function(){return []}},
    // activityTypleIndex:{
    //   type:Number,
    //   default(){
    //     return 0
    //   }
    // },
    // activityProjectIndex:{
    //   type:Number,
    //   default(){
    //     return 0
    //   }
    // }
  },
  data() {
    return {
      activityObjectIndex:0,
      activityNameIndex: 0,
      gradeIndex: 0,
      activityTypleIndex: 0,
      activityProjectIndex:0,
      regionIndex:0,
      otherIndex:0,
    
      activityNameObject:{},//活动名称
      activityTypleObject: {}, // 活动类型
      gradeObject: {}, // 组别
      activityProjectObject:{},//活动项目
      activityObject:{},//活动对象
      regionObject:{},//区域
      otherObject:{},//其他
    };
  },
  mounted(){
    
  },
  methods: {
    anActivityObjectList(id, index) {
      this.activityObjectIndex = index;
      this.activityObject = this.activityObjectList[index].id;
      this.$emit('activityObject', this.activityObject);
    },
    onActivityNameList(id, index) {
      this.activityNameIndex = index;
      this.activityNameObject = this.activityNameList[index].id;
      this.$emit('activityNameObject', this.activityNameObject);
    },
    onGradeList(id, index) {
      this.gradeIndex = index;
      this.gradeObject = this.gradeList[index].id;
      this.$emit('gradeObject', this.gradeObject);
    },
    onActivityTypleList(id, index) {
      this.activityTypleIndex = index;
      this.activityTypleObject = this.activityTypleList[index].id;
      this.$emit('activityTypleObject', this.activityTypleObject);
    },
    onActivityProjectList(id, index) {
      this.activityProjectIndex = index;
      this.activityProjectObject = this.activityProjectList[index].id;
      this.$emit('activityProjectObject', this.activityProjectObject);
    },
    onRegionList(id,index){
      this.regionIndex = index;
      this.regionObject = this.regionList[index].id;
      this.$emit('regionObject', this.regionObject);
    },
    onOtherList(id,index){
      this.otherIndex = index;
      this.otherObject = this.otherList[index].id;
      
      this.$emit('otherObject', this.otherObject,this.otherList[index]);
    }
    
  }
};
</script>
<style lang="less" scoped>
.lable{
  margin-bottom: 10px;
  .lable-title{
    width: 70px;
    height: 20px;
    font-size: 14px;
    color: #333333;
    margin-right: 20px;
    text-align: justify;
    margin-top: 10px;
    float: left;
  }
  .lable-title::after{
    content: " ";
    display: inline-block;
    width: 100%;
  }
  .lable-aside{
    margin-left: 90px;
    .lable-self{
      padding:0 10px;
      width:auto !important;
      margin-top: 5px;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      font-size: 14px;
      text-align: center;
      color: #888888;
      border-radius: 4px;
      margin-right: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.type-active{
  padding:0 10px;
  width:auto !important;
	height: 30px;
	line-height: 30px;
	text-align: center;
	color: #fff !important;
	background: #409EFF !important;
}
</style>
