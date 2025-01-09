<script>
import * as echarts from "echarts";

export default {
  name: 'EchartsPie',
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    initPieEcharts() {
      const option = {
        title: {
          text: 'Expenses',
          left: 'left center',
          textStyle: {
            color: 'red'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            label: {
              show: true
            },
            data: this.chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.myChart = echarts.init(document.getElementById("mychart"));
      this.myChart.setOption(option);
      // Adjust the chart with screen size
      window.addEventListener("resize", () => {
        this.myChart.resize();
      })
    }
  },
  mounted() {
    this.initPieEcharts()
  },
  data() {
    return {
      myChart: {},

    }
  }
};
</script>

<template>
  <div style="padding:20px;">
    <div class="echart" id="mychart" style="width: 80%;
    height: 380px;"></div>
  </div>
</template>

<style scoped></style>