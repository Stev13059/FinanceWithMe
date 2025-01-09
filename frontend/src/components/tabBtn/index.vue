<script>
export default {
  name: 'TabBtn',
  props: {
    tabData: {
      type: Array,
      default: () => []
    }
  },
};
</script>


<template>
  <div>
    <a-button size="large" style="margin-right:15px" v-for="(item, index) in tabData" :key="index"
      :class="{ 'ligntHigh': item?.selected }" @click="$emit('changeTab', item, index)">
      {{ item?.name }}
    </a-button>
  </div>
</template>

<style scoped>
.ligntHigh {
  color: #fff;
  background-color: #bcd3e1;
  box-shadow: 0 0 10px #CCC;
  transform: translateY(-3px);
}
</style>