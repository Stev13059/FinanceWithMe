<script>
export default {
  name: 'Modal',
  data() {
    return {
      visible: false,
      btnLoading: false,
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
      form: this.$form.createForm(this, { name: 'coordinated' }),
      formData: {}
    }
  },
  methods: {
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.formData.id) {
            this.$emit('editGoals', { ...values, id: this.formData.id })
          } else {
            this.$emit('addGoals', { ...values })
          }
        }
      })
    },
    onClose() {
      console.log('close');
      
      this.visible = false
      this.form.resetFields()
      this.formData = {}
    }
  }
};
</script>


<template>
  <div>
    <a-modal title="Create a Saving Goal" :width="520" v-model="visible" @cancel="onClose">
      <div>
        <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-form-item label="GoalName">
            <a-input placeholder="Please enter goalName"
              v-decorator="['goalName', { rules: [{ required: true, message: 'Please input your goalName!' }] }]"></a-input>
          </a-form-item>
          <a-form-item label="TargetAmount">
            <a-input placeholder="Please enter targetAmount" type="number"
              v-decorator="['targetAmount', { rules: [{ required: true, message: 'Please input your targetAmount!' }] }]"></a-input>
          </a-form-item>
          <a-form-item label="Type">
            <a-select style="width: 120px"
              v-decorator="['type', { initialValue: type[0].name, rules: [{ required: true, message: 'Please select your gender!' }] },]">
              <a-select-option :value="item.name" v-for="item in type" :key="item.name">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
        <div class="footerBtn">
          <a-button @click="onClose">Cancel</a-button>
          <a-button type="primary" :loading="btnLoading" @click="onSubmit">Submit</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style scoped lang="less">
.footerBtn {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;
  z-index: 1;

  button {
    margin: 10px;
  }
}
</style>