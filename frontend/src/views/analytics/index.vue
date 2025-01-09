<script>
import EchartsPie from './components/EchartsPie.vue'
import AnalyticsTable from './components/AnalyticsTable.vue'
import { analytics_total, analytics_exchangeRate, analytics_proportion } from '@/api/api'
export default {
  components: { EchartsPie, AnalyticsTable },
  mounted() {
    analytics_total().then((res) => {
      this.totalIncome = res.data.totalIncome
      this.totalExpenses = res.data.totalExpenses
    })
    analytics_exchangeRate().then((res) => {
      this.exchangeRate = res.data
    })
    analytics_proportion().then((res) => {
      this.proportion = res.data.map(m => ({
        name: m.name,
        value: m.num
      }))
    })
  },
  data() {
    return {
      totalIncome: 0,
      totalExpenses: 0,
      exchangeRate: {},
      proportion: []
    }
  },
  computed: {
    maxTotal() {
      return Math.max(this.totalIncome, this.totalExpenses)
    }
  }
};
</script>


<template>
  <div class="analytics_content">
    <div class="analytics_left">
      <div class="dataProgress">
        <div class="totalData">
          <a-card>
            <span style="font-size: 25px;color:green;">Total Incomes</span><span
              style="font-size: 18px;font-weight: 700;">{{ totalIncome }}</span>
          </a-card>
          <a-card>
            <span style="font-size: 25px;color:red;">Total Expenses</span><span
              style="font-size: 18px;font-weight: 700;">{{ totalExpenses }}</span>
          </a-card>
        </div>
        <div class="progress">
          <div><span style="color: red">out</span><a-progress class="p-out" :percent="totalExpenses / maxTotal * 100" strokeColor="red" :strokeWidth=20
              :format="percent => `£${totalExpenses}`" /></div>
          <div><span style="color: green">in</span><a-progress class="p-in" :percent="totalIncome / maxTotal * 100" strokeColor="green" :strokeWidth="20"
              :format="percent => `£${totalIncome}`" /></div>
        </div>
      </div>
      <div class="echarts">
        <EchartsPie v-if="proportion.length > 0" :chartData="proportion"></EchartsPie>
      </div>
    </div>
    <div class="analytics_right">
      <analytics-table :dataSource="[exchangeRate]"></analytics-table>
    </div>
  </div>
</template>

<style scoped lang="less">
.analytics_content {
  display: flex;
  height: 100%;

  .analytics_left {
    flex: 1;
    height: 100%;
    border-right: 1px solid #ccc;

    .dataProgress {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      padding: 10px;

      .totalData {
        flex: 2;
        display: flex;
        justify-content: space-around;

        .ant-card {
          width: 200px;
          height: 150px;
          box-shadow: 0 0 10px #ccc;

          :deep(.ant-card-body) {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 0;
            height: 100%;
          }
        }
      }

      .progress {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        margin-top: 20px;

        >div {
          width: 100%;
          margin-bottom: 20px;
        }

        span {
          display: inline-block;
          text-align: center;
          width: 35px;
          font-size: 20px;

        }

        .ant-progress {
          width: 90%;
        }
      }
    }

    .echarts {
      border-top: 1px solid #ccc
    }

  }

  .analytics_right {
    flex: 1
  }
}

/deep/ .p-out .ant-progress-text {
  color: red !important;
}
/deep/ .p-in .ant-progress-text {
  color: green !important;
}
</style>