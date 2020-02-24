<template>

           <div class="user">
            <p>报名统计</p>
            <high-charts :options="enrollSta"></high-charts>
          </div>
    
</template>
<script>
 import HighCharts from '../../components/highcharts';
  export default {
    components: { HighCharts },
    data() {

      return {
        enrollSta:{},
            
      };
    },
        mounted() {
     
      let list=[{Name:'福田区',Value:320},{Name:'罗湖区',Value:360},{Name:'南山区',Value:520},{Name:'宝安区',Value:330},{Name:'龙华区',Value:380}]
      this.$nextTick(function(){
        this.renderChart(list)
      })
      
    },
    methods: {
       renderChart(list = []) {
        let xAxis = [], data = [];
        list.forEach(item => {
          xAxis.push(item.Name);
          data.push(item.Value);
        });
        let options = {
          show: true,
          chart: {
            polar: true,
            type: 'line'
          },
          title: {
            text: '我的能力图谱'
          },
          pane: {
            size: '65%'
          },
          xAxis: {
            categories: xAxis,
            tickmarkPlacement: 'on',
            lineWidth: 0
          },
          yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
          },
          legend: {
            enabled: false
          },
          series: [{
            name: '能力值',
            data: data,
            pointPlacement: 'on'
          }]
        };
        this.enrollSta = options;
      },

    }
  };
</script>
<style lang="less" scoped>

</style>
