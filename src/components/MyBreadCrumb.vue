<template>
    <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="index">
        <router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  props:{
    levelList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
      return {
        
      }
  },
  mounted(){

  },
  methods: {
        
  },
  mounted() {
    
  },
  watch: {
    
  }
}
</script>