<script>
export default {
  name: 'Summary',
  props: ['balance', 'expenses', 'incomes']
};
</script>


<template>
  <div>
    <div class="summary_header">
      <div style="display: flex; align-items: center;">
        <img src="@/assets/images/WechatIMG1415.jpg" style="width: 30px;padding-right: 6px;object-fit: contain;">
        <span>Balance： {{ balance }}</span>
      </div>
      <div style="display: flex; align-items: center;">
        <img src="@/assets/images/WechatIMG1414.jpg" style="width: 30px;padding-right: 6px;object-fit: contain;">
        <span>Total Incomes： {{ incomes }}</span>
      </div>
      <div style="display: flex; align-items: center;">
        <img src="@/assets/images/WechatIMG1414.jpg" style="width: 30px;padding-right: 6px;object-fit: contain;">
        <span>Total Expenses： {{ expenses }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.summary_header {
  margin: 30px 0;
  display: flex;
  justify-content: space-around;
  font-size: 30px;
  font-weight: 700;
  color: #333;

  i {
    margin-right: 20px;
  }
}
</style>