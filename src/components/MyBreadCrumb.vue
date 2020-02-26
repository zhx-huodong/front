<template>
    <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path" v-if="item.meta.title">
        <router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  data() {
      return {
        //   levelList: null
        levelList:[{path: '/home', meta: { title: '首页' }}]
      }
  },
  methods: {
        /**
        * 生成面包屑的方法
        */
        getBreadcrumb(to) {
            let matched = this.$route.matched.filter(item => item.name)
            if(to!=undefined){
              matched[0].path=to.fullPath
            }
            const first = matched[0]
            if (first && first.name !== '首页') {
              var index=this.levelList.findIndex((item)=>{
                return item.name==first.name
              })
              if(index!=-1){
                matched =this.levelList.slice(0,(index+1))
              }else{
                matched =this.levelList.concat(matched)
              }
            }else{
              matched=[{path: '/home', meta: { title: '首页' }}]
            }
            this.levelList = matched;
            console.log("levelList==",this.levelList)
        }
  },
  mounted() {
    this.getBreadcrumb();
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb(to);
    }
  }
}
</script>