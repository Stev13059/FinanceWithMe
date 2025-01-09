<script>
export default {
  name: 'AnalyticsTable',
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [{
        title: '$USD',
        dataIndex: 'USD',
        align: 'center'
      }, {
        title: '£GBP',
        dataIndex: 'GBP',
        align: 'center'
      }, {
        title: '€EUR',
        dataIndex: 'EUR',
        align: 'center'
      }, {
        title: '$AUD',
        dataIndex: 'AUD',
        align: 'center'
      }],
    }
  },
};
</script>


<template>
  <div style="padding:30px">
    <a-table bordered :columns="columns" :data-source="dataSource" :pagination="false"></a-table>
  </div>
</template>

<style scoped></style>