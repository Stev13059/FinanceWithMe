<template>
  <div style="display:flex;flex-direction: column;">
    <TabBtn :tabData="tabGroupData" @changeTab="changeTab"></TabBtn>
    <a-button icon="plus" size="large" type="primary" style="align-self: flex-end;margin:20px"
      @click="addOpenModal">Create</a-button>
    <a-empty v-if="goalsList.length === 0"/>
    <div class="cardBox">
      <a-card v-for="(item, index) in goalsList" :key="index">
        <div class="card_header">
          <a-icon :type="typeIcon[item.type]" />
          <span>{{ item.goalName }}</span>
          <a-icon type="plus-circle" style="cursor: pointer;" @click="visible = true; currentAmountIndex = index" />
        </div>
        <div class="card_date">
          <div class="money_date">
            <div>{{ item.targetAmount }} £</div>
            <div>{{ item.currentAmount }} £</div>
          </div>
          <div style="padding-right: 10px">
            <a-progress :percent="item.progressPercentage" />
          </div>
        </div>
        <div class="card_btn">
          <a-button size="large" @click="onEditGoals(item, index)">Edit</a-button>
          <a-button type="danger" :loading="delLoading && delId == item.id" size="large" @click="onDelete(item.id)">Delete</a-button>
        </div>
      </a-card>
    </div>

    <a-modal title="Current Amount" v-model="visible" @ok="addCurrentAmount" @close="onClose">
      <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="Deposit">
          <a-input placeholder="" type="number"
            v-decorator="['currentAmount', { rules: [{ required: true, message: 'Please input your currentAmount!' }] }]"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <Modal ref="drawerRef" @addGoals="addGoals" @editGoals="editGoals"></Modal>
  </div>
</template>
<script>
import { groups_list, savingGoals_list, savingGoals_add, savingGoals_delete, savingGoals_edit, transaction_add } from '@/api/api'
import Modal from './components/Modal'
export default {
  name: 'GoalsPage',
  components: { Modal },
  data() {
    return {
      delId: -1,
      delLoading: false,
      goalsList: [],
      currentAmountIndex: 0,
      tabGroupData: [],
      visible: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      typeIcon: {
        Food: 'coffee',
        Transport: 'car',
        Healthcare: 'medicine-box',
        Education: 'read',
        Shopping: 'shopping-cart',
        Entertainment: 'customer-service',
        Bill: 'transaction',
        Other: 'gateway'
      }
    }
  },
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
        this.getDataList()
      })
    },
    changeTab(item) {
      this.tabGroupData.forEach(el => {
        el.selected = item.id === el.id
      })
      this.getDataList()
    },
    getDataList() {
      const params = {}
      const gId = this.tabGroupData.find(f => f.selected).id
      if (gId) {
        params.groupId = gId
      }
      savingGoals_list(params).then((res) => {
        this.goalsList = res.data.map(m => ({
          ...m,
          progressPercentage: parseFloat(parseFloat((m.currentAmount / m.targetAmount) * 100).toFixed(2)),
        }))
      })
    },
    addGoals(data) {
      this.$refs.drawerRef.btnLoading = true
      savingGoals_add({ ...data, currentAmount: 0, groupId: this.tabGroupData.find(f => f.selected).id }).then(() => {
        this.$message.success('Adding savinggoals for success！')
        this.$refs.drawerRef.visible = false
        this.$refs.drawerRef.form.resetFields()
        this.getDataList()
      }).finally(() => {
        this.$refs.drawerRef.btnLoading = false
      })
    },
    editGoals(data) {
      this.$refs.drawerRef.btnLoading = true
      savingGoals_edit({
        ...data,
        currentAmount: this.goalsList[this.currentAmountIndex].currentAmount,
      })
        .then(() => {
          this.$message.success('Editing savinggoals for success！')
          this.$refs.drawerRef.visible = false
          this.$refs.drawerRef.form.resetFields()
          this.getDataList()
        }).finally(() => {
          this.$refs.drawerRef.btnLoading = false
        })
    },
    onEditGoals(row, index) {
      this.currentAmountIndex = index
      this.$refs.drawerRef.visible = true
      Object.assign(this.$refs.drawerRef.formData, JSON.parse(JSON.stringify(row)))
      this.$nextTick(() => {
        this.$refs.drawerRef.form.setFieldsValue(this.$refs.drawerRef.formData)
      })
    },
    addOpenModal() {
      this.$refs.drawerRef.visible = true
    },
    onDelete(id) {
      this.$confirm({
        title: 'Do you want to delete this goals?',
        content: 'Cannot be restored after deletion',
        onOk: () => {
          this.delLoading = true
          this.delId = id
          savingGoals_delete({id}).then(() => {
            this.$message.success('Deleting savinggoals for success！')
            this.getDataList()
          }).finally(() => {
            this.delLoading = false
          })
        },
        onCancel() { },
      })
    },
    addCurrentAmount() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const _data = this.goalsList[this.currentAmountIndex]
          const params = {
            ..._data,
            currentAmount: parseFloat(_data.currentAmount) + parseFloat(values.currentAmount)
          }
          savingGoals_edit(params)
            .then(() => {
              this.$message.success('Add amount success！')
              this.getDataList()
              this.visible = false
              this.form.resetFields()
              let date = new Date();
              let day = date.getDate();
              let month = date.getMonth() + 1;
              let year = date.getFullYear();
              let ukFormat = `${day}/${month}/${year}`;
              transaction_add({
                date: ukFormat,
                type: _data.type,
                name: _data.goalName,
                amount: parseFloat(values.currentAmount),
                groupId: _data.groupId,
                transactionType: 2,
                goalId: _data.id
              })
            }).finally(() => {
            })
        }
      })
    },
    onClose() {
      this.visible = false
      this.form.resetFields()
    }
  },
  mounted() {
    this.getGroupData()
  }

}
</script>

<style lang="less" scoped>
.cardBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 100%;

  .ant-card {
    margin: 20px;
    display: flex;
    flex-flow: column;
    width: 350px;
    height: 350px;
    color: #000;
    font-size: 20px;
    box-shadow: 0 0 10px #ccc;

    :deep(.ant-card-body) {
      padding: 20px 20px;

      .card_header {
        display: flex;

        span {
          flex: 1;
          text-align: center;

        }

        i {
          line-height: 35px;

        }
      }

      .card_date {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .money_date {
          display: flex;
          justify-content: space-evenly;
          width: 100%;

          div {
            margin: 40px 0;
            width: 140px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            box-shadow: 0 0 5px #000;
          }
        }
      }

      .card_btn {
        margin-top: 30px;
        display: flex;
        justify-content: space-around;

        button {
          width: 80px;
        }
      }
    }

  }

}
</style>
