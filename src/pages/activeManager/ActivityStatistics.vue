<template>
        <div>
          <div class="usercolumn">
            <p style="margin-bottom:40px;">报名统计</p>
            <high-charts :options="enrollSta"></high-charts>
          </div>
          <div style="margin-top:40px;height:490px;margin-buttom:30px;" >
            <p style="margin-bottom:40px;">获奖统计</p>
            <div>
               <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background:'#AFE9D9'}">
                <el-table-column
                  prop="Name"
                  label="序号"
                 >
                </el-table-column>
                <el-table-column
                  prop="one"
                  label="一等奖"
                 >
                </el-table-column>
                <el-table-column
                  prop="two"
                  label="二等奖">
                </el-table-column>
                <el-table-column
                  prop="three"
                  label="三等奖">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class='buttom'>
            <div class="left">
              <img :src='url1'></img>
              <span>报名学校</span>
               <div style='margin-left:30px'>
               <el-table :data="tableData2" stripe style="width: 100%" :header-cell-style="{background:'rgba(185,223,255,1)'}">
                <el-table-column
                  
                  type="index"
                  label="序号"
                 >
                </el-table-column>
                <el-table-column
                  prop="Name"
                  label="学校"
                 >
                </el-table-column>
                <el-table-column
                  prop="addr"
                  label="所在区">
                </el-table-column>
                <el-table-column
                  prop="peopNum"
                  label="报名人数">
                </el-table-column>
              </el-table>
              </div>
            </div> 
            <div class="left">
                <img :src="url2"></img>
                <span>获奖学校</span>
                <div style='margin-left:30px'>
               <el-table :data="tableData2" stripe style="width: 100%" :header-cell-style="{background:'rgba(214,195,244,1)'}">
                <el-table-column
                  
                  type="index"
                  label="序号"
                 >
                </el-table-column>
                <el-table-column
                  prop="Name"
                  label="学校"
                 >
                </el-table-column>
                <el-table-column
                  prop="addr"
                  label="所在区">
                </el-table-column>
                <el-table-column
                  prop="peopNum"
                  label="获奖数">
                </el-table-column>
              </el-table>
              </div>
            </div>
          </div>
           <div class='buttom2' >
            <div class="left">
              
             
               <span style="color:#AA76FE;line-height:48px;font-size:16px">TOP5</span>
              <span style="color:#666666;line-height:48px;font-size:16px;margin-left:10px">获奖学校</span>
               <div style='margin-left:30px'>
               <el-table :data="tableData2" stripe style="width: 100%" :header-cell-style="{background:'rgba(185,223,255,1)'}">
                <el-table-column
                  
                  type="index"
                  label="序号"
                 >
                </el-table-column>
                <el-table-column
                  prop="Name"
                  label="学校"
                 >
                </el-table-column>
                <el-table-column
                  prop="addr"
                  label="所在区">
                </el-table-column>
                <el-table-column
                  prop="peopNum"
                  label="报名人数">
                </el-table-column>
              </el-table>
              </div>
            </div> 
                        <div class="left">
              
              <span style="color:#66B9FF;line-height:48px;font-size:16px">TOP5</span>
              
              <span style="color:#666666;line-height:48px;font-size:16px;margin-left:10px">获奖学校</span>
               <div style='margin-left:30px'>
               <el-table :data="tableData2" stripe style="width: 100%" :header-cell-style="{background:'rgba(185,223,255,1)'}">
                <el-table-column
                  
                  type="index"
                  label="序号"
                 >
                </el-table-column>
                <el-table-column
                  prop="Name"
                  label="学校"
                 >
                </el-table-column>
                <el-table-column
                  prop="addr"
                  label="所在区">
                </el-table-column>
                <el-table-column
                  prop="peopNum"
                  label="报名人数">
                </el-table-column>
              </el-table>
              </div>
            </div> 
          </div>
        
        </div>
</template>
<script>
 

  import HighCharts from '../../components/highcharts';
  export default {
    components: { HighCharts, },
    data() {

      return {
        
        url1:require('../../public/images/top1.png'),
        url2:require('../../public/images/top2.png'),
        enrollSta:{},
        tableData:[{Name:'福田区',one:1},{Name:'罗湖区',two:2},{Name:'南山区',three:3},{Name:'宝安区',Value:''},{Name:'龙华区',Value:''},{Name:'福田区',Value:''},{Name:'罗湖区',Value:''},{Name:'南山区',Value:""},{Name:'宝安区',Value:""},{Name:'龙华区',Value:""}],  
       
       tableData2:[
        
            {Name:'南山小学',addr:"南山区",peopNum:"160"},
            {Name:'福田中学',addr:"福田区",peopNum:"98"},
            {Name:'南山中学',addr:"南山区",peopNum:"9"},
            {Name:'南山小学',addr:"南山区",peopNum:"160"},
            {Name:'福田中学',addr:"福田区",peopNum:"98"},
            {Name:'南山中学',addr:"南山区",peopNum:"9"},
            {Name:'南山小学',addr:"南山区",peopNum:"160"},
            {Name:'福田中学',addr:"福田区",peopNum:"98"},
            {Name:'南山中学',addr:"南山区",peopNum:"9"},
            {Name:'南山小学',addr:"南山区",peopNum:"160"},
         ],          
      };
    },
        mounted() {
     
      let list=[{Name:'福田区',Value:320},{Name:'罗湖区',Value:360},{Name:'南山区',Value:520},{Name:'宝安区',Value:330},{Name:'龙华区',Value:380},{Name:'福田区',Value:320},{Name:'罗湖区',Value:360},{Name:'南山区',Value:520},{Name:'宝安区',Value:330},{Name:'龙华区',Value:380}]
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
            // polar: true,
            type: 'column'
          },
          title: {
            text: ''
          },
          pane: {
            size: '25%'
          },
          xAxis: {
            categories: xAxis,
           
          },
          yAxis: {
            title: {
              text: ''
            },
           
            min: 0
          },
          legend: {
            enabled: false
          },
       
          series: [{
            name: '报名人数',
            data: data,
            dataLabels: {
              enabled: true,
              // rotation: 90,
              color: '#333333',
              align: 'center',
              // y: 10
            },
          }]
        };
        this.enrollSta = options;
      },

    }
  };
</script>
<style lang="less" scoped>
  .usercolumn{
   height:450px;
  }
  .buttom{
    margin-top:100px;
    margin-bottom:20px;
    display:flex;
    justify-content:space-between;
    .left{
      width:460px;
     float:left;
      img{
        margin-top: 13px;
        float:left;
        width:73px;
        height:26px;
      }
      span{
        width:118px;
        height:15px;
        font-size:16px;
        font-family:Adobe Heiti Std;
        font-weight:normal;
        // color:rgba(102,185,255,1);
        line-height:48px;
      }
    }
    

  }
   .buttom2{
   
    margin-bottom:20px;
    display:flex;
    justify-content:space-between;
   
    
    .left{
      width:460px;
      float:left;
     
      span{
        width:118px;
        height:15px;
        font-size:16px;
        font-family:Adobe Heiti Std;
        font-weight:normal;
        // color:rgba(102,185,255,1);
        line-height:48px;
      }
    }
    

  }



</style>
