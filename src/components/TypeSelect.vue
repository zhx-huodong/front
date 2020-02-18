<template>
  <div>
   
    <div class="lable" v-if="!toPage">
      <div class="lable-title">活动对象:</div>
      <div class="lable-aside">
        <div class="lable-self" v-for="(item, index) in activityObjectList" :key="index"
        @click="onactivityObjectList(item.Id, index)" :class="{'type-active':activityObjectIndex == index}">{{item.Name}}</div>
      </div>
    </div>
    <div class="lable">
      <div class="lable-title">学段:</div>
      <div class="lable-aside">
        <div class="lable-self" v-for="(item, index) in gradeList" :key="index"
        @click="ongradeList(item.Id, index)" :class="{'type-active':gradeIndex == index}">{{item.Name}}</div>
      </div>
    </div>
    <div class="lable" v-if="subjectList">
      <div class="lable-title">科目:</div>
      <div class="lable-aside">
        <div class="lable-self" v-for="(item, index) in subjectList" :key="index"
        @click="onsubjectList(item.Id, index)" :class="{'type-active':subjectIndex == index}">{{item.Name}}</div>
      </div>
    </div>
    <div class="lable" v-if="!hideRegion">
      <div class="lable-title">区域:</div>
      <div class="lable-aside">
        <div class="lable-self" v-for="(item, index) in regionList" :key="index"
        @click="onregionList(item.DivisionId, index)" :class="{'type-active':regionIndex == index}">{{item.Name}}</div>
      </div>
    </div>
    <div class="lable" v-if="!hideAward && toPage && toPage=='elcellent'">
      <div class="lable-title">奖项:</div>
      <div class="lable-aside">
        <div class="lable-self" v-for="(item, index) in awardList" :key="index"
             @click="onawardList(item.Id, index)" :class="{'type-active':awardIndex == index}">{{item.Name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    gradeList: { type: Array },
    subjectList: { type: Array },
    regionList: { type: Array },
    toPage: String,
    hideRegion: { type: Boolean, default: false },
    hideAward: { type: Boolean, default: false }
  },
  data() {
    return {
      activityObjectIndex: 0,
      awardIndex: 0,
      gradeIndex: 0,
      subjectIndex: 0,
      regionIndex: 0,
      activityObject: 0,
      award: '', // 奖项
      gradeGroup: '', // 学段
      subject: '', // 科目
      region: '', // 区域
      activityObjectList: [
        { Id: 0, Name: '全部' },
        { Id: 12, Name: '老师' },
        { Id: 11, Name: '学生' }
      ],
      awardList: [
        { Id: 0, Name: '全部' },
        { Id: 1, Name: '一等奖' },
        { Id: 2, Name: '二等奖' },
        { Id: 3, Name: '三等奖' },
        { Id: 4, Name: '优秀奖' }
      ]
    };
  },
  mounted(){
    // this.gradeList=[
    //    { Id: 0, Name: '全部' },
    //     { Id: 1, Name: '小学组' },
    //     { Id: 2, Name: '初中组' },
    //     { Id: 3, Name: '高中组' },
    // ];
    // this.regionList=[
    //   {Id:0,Name:"全部"},
    //   {Id:1,Name:"罗湖区"},
    //   {Id:2,Name:"南山区"},
    //   {Id:3,Name:"宝安区"},
    //   {Id:4,Name:"罗湖区"},
    //   {Id:5,Name:"盐田区"},
    //   {Id:6,Name:"龙岗区"},
    // ]
      
  },
  methods: {
    onactivityObjectList(Id, index) {
      this.activityObjectIndex = index;
      this.activityObject = this.activityObjectList[index].Id;
      this.$emit('activityObject', this.activityObject);
    },
    onawardList(Id, index) {
      this.awardIndex = index;
      this.award = this.awardList[index].Id;
      this.$emit('award', this.award);
    },
    ongradeList(Id, index) {
      this.gradeIndex = index;
      this.gradeGroup = this.gradeList[index].Id;
      this.$emit('gradeGroup', this.gradeGroup);
    },
    onsubjectList(Id, index) {
      this.subjectIndex = index;
      this.subject = this.subjectList[index].Id;
      this.$emit('subject', this.subject);
    },
    onregionList(Id, index) {
      this.regionIndex = index;
      this.region = this.regionList[index].DivisionId;
      this.$emit('region', this.region);
    }
    
  }
};
</script>
<style lang="less">
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
      width: 110px;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      font-size: 14px;
      text-align: center;
      color: #888888;
      border-radius: 4px;
      margin-right: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.type-active{
	width: 110px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	color: #fff !important;
	background: #2568ED;
}
</style>
