<script>
import { transaction_add, transaction_edit} from '@/api/api'

export default {
  name: 'Modal',
  data() {
    return {
      visible: false,
      btnLoading: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      formData: {},
      type: [
        {
          name: 'Food'
        },
        {
          name: 'Transport'
        },
        {
          name: 'Healthcare'
        },
        {
          name: 'Education'
        },
        {
          name: 'Shopping'
        },
        {
          name: 'Entertainment'
        },
        {
          name: 'Bill'
        },
        {
          name: 'Other'
        },
      ],
    }
  },
  methods: {
    handleSubmit() {
      let res
      this.form.validateFields((err, values) => {
        if (!err) {
          res = values
        }
      });
      return res
    },
    onSubmit() {
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let ukFormat = `${day}/${month}/${year}`;
      const res = this.handleSubmit()
      if (res) {
        this.btnLoading = true
        if (this.formData.id) {
          transaction_edit({ ...this.formData, ...res, date: ukFormat }).then(() => {
            this.visible = false
            this.$message.success('Edited successfully');
            this.$emit('submitOK')
          }).finally(() => {
            this.btnLoading = false
          })
        } else {
          transaction_add({ ...this.formData, ...res, date: ukFormat }).then(() => {
            this.visible = false
            this.$message.success('Added successfully');
            this.$emit('submitOK')
          }).finally(() => {
            this.btnLoading = false
          })
        }
      }
    },
  },
  mounted() {
  }
};
</script>


<template>
  <div>
    <a-modal :title="formData.transactionType == 1 ? 'Income' : 'Expense'" v-model="visible" @ok="onSubmit" :confirmLoading="btnLoading">
      <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" @submit="handleSubmit">
        <a-form-item v-if="formData.transactionType == 2" label="Type">
          <a-select style="width: 120px"
            v-decorator="['type', { initialValue: type[0].name, rules: [{ required: true, message: 'Please select your gender!' }] },]">
            <a-select-option :value="item.name" v-for="item in type" :key="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Details">
          <a-input placeholder="Please enter Details"
            v-decorator="['name', { rules: [{ required: true, message: 'Please input your details!' }] }]"></a-input>
        </a-form-item>
        <a-form-item label="Amount">
          <a-input placeholder="Please enter Amount" type="number"
            v-decorator="['amount', { rules: [{ required: true, message: 'Please input your amount!' }] }]"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped></style>