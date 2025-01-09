<template>
  <div>
    <TabBtn :tabData="tabGroupData" @changeTab="changeGroup"></TabBtn>
    <Summary :balance="balance" :incomes="incomes" :expenses="expenses"></Summary>
    <div class="editBtn">
      <div class="left">
        <TabBtn :tabData="tabTypeData" @changeTab="changeType"></TabBtn>
      </div>
      <a-button v-if="!tabGroupData.find(f => f.selected).id" type="primary" size="large" style="width:90px" @click="modalAdddata">
        Add
      </a-button>
    </div>
    <a-table :loading="loading" :data-source="data" :columns="columns" :rowKey="(item, index) => index" :pagination="pagination"
      @change=changePage>
      <span slot="Operation" slot-scope="text,records,index">
        <a-popconfirm title="Are you sure delete this data?" @confirm="deleteDate(text)">
          <a-button :disabled="tabGroupData.find(f => f.selected).id || text.goalId" type=danger style="margin-right:10px;" :loading="delLoading">Delete</a-button>
        </a-popconfirm>
        <a-button :disabled="tabGroupData.find(f => f.selected).id || text.goalId" style="margin-right:10px;" @click="onEdit(text)">Edit</a-button>
      </span>
    </a-table>

    <Modal ref="Modal" @submitOK="getData"></Modal>
  </div>
</template>

<script>
import Summary from './components/Summary.vue'
import Modal from './components/Modal.vue'
import { transaction_list, transaction_delete, groups_list } from '@/api/api'
const columns1 = [
  {
    title: 'Details',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: 'Amount(£)',
    dataIndex: 'amount',
    align: 'center',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    align: 'center',
  },
  {
    title: 'Operation',
    scopedSlots: { customRender: 'Operation' },
    align: 'center',
  },
];
const columns2 = [
  {
    title: 'Type',
    dataIndex: 'type',
    align: 'center',
  },
  {
    title: 'Details',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: 'Amount(£)',
    dataIndex: 'amount',
    align: 'center',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    align: 'center',
  },
  {
    title: 'Operation',
    scopedSlots: { customRender: 'Operation' },
    align: 'center',
  },
];
export default {
  name: 'TransactionsPage',
  data() {
    return {
      loading: false,
      delLoading: false,
      columns: columns1,
      data: [],
      balance: 0,
      incomes: 0,
      expenses: 0,
      pagination: {
        total: 0,
        current: 1,
        pageSizeOptions: ['10', '20', '30', '50'],
        showTotal: total => `total ${total}`,
        pageSize: 10,
        showSizeChanger: true
      },
      tabGroupData: [],
      tabTypeData: [
        {
          id: 1,
          name: 'Income',
          selected: true
        },
        {
          id: 2,
          name: 'Expense',
          selected: false
        }
      ]
    }
  },
  components: { Summary, Modal },
  methods: {
    getGroupData() {
      groups_list().then((res) => {
        this.tabGroupData = [
          {
            id: '',
            name: 'Personal',
            selected: true
          },
          ...res.data.map(m => ({
            id: m.id,
            name: m.groupName,
            selected: false
          }))
        ]
        this.getData()
      })
    },
    changeGroup(item) {
      this.tabGroupData.forEach(el => {
        el.selected = item.id === el.id
      })
      this.getData()
    },
    changeType(item) {
      this.tabTypeData.forEach(el => {
        el.selected = item.id === el.id
      })
      this.columns = item.id === 1 ? columns1 : columns2
      this.getData()
    },
    changePage(page) {
      Object.assign(this.pagination, page)
    },
    modalAdddata() {
      this.$refs.Modal.visible = true
      this.$refs.Modal.form.resetFields()
      this.$refs.Modal.formData = {
        groupId: this.tabGroupData.find(f => f.selected).id,
        transactionType: this.tabTypeData.find(f => f.selected).id
      }
      console.log(this.$refs.Modal.formData);
      
    },
    getData() {
      this.loading = true
      const params = {}
      const gId = this.tabGroupData.find(f => f.selected).id
      if (gId) {
        params.groupId = gId
      }
      transaction_list(params).then((res) => {
        this.balance = res.balance
        this.incomes = res.incomes
        this.expenses = res.expenses
        const resData = res.data.infos
        this.data = resData.filter(f => f.transactionType == this.tabTypeData.find(f => f.selected).id)
      }).finally(() => {
        this.loading = false
      })
    },
    onEdit(text) {
      this.$refs.Modal.visible = true
      Object.assign(this.$refs.Modal.formData, {...text})
      this.$nextTick(() => {
        this.$refs.Modal.form.setFieldsValue(this.$refs.Modal.formData)
      })
    },
    deleteDate(text) {
      this.delLoading = true
      transaction_delete({ 'id': text.id }).then(() => {
        this.$message.success('Deleted successfully');
        this.getData()
      }).finally(() => {
        this.delLoading = false
      })
    }
  },
  mounted() {
    this.getGroupData()
  }
}
</script>

<style lang="less" scoped>
.editBtn {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  transition: all .5;
}
</style>
