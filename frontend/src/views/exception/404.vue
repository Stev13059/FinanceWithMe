<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="toTransactions">
        Return to Transactions
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception404Page',
  methods: {
    toTransactions() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
