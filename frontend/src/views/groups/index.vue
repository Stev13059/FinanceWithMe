<template>
  <div class="groups">
    <div class="groups_top">
      <div class="topLeft">
        <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
          <a-form-item label="Group Name : ">
            <a-input v-model="searchParams" allowClear @input="onInput"></a-input>
          </a-form-item>
        </a-form>
        <a-button style="margin-Top:5px" @click="searchGroup">Search</a-button>
      </div>
      <a-button type="primary" style="margin-top:5px;width:85px" @click="visibleAdd = true">Create</a-button>
      <a-button type="default" style="margin-top:5px;width:85px;margin-left: 10px"
        @click="visibleJoin = true">Join</a-button>
    </div>
    <a-table :loading="loading" bordered :columns="columns" :data-source="data" :pagination=pagination :rowKey="(item, index) => index">
      <div slot="Operation" slot-scope="text" style="display: flex;justify-content: space-around;">
        <a-button type="danger" @click="disbandGroup(text.id)">Disband</a-button>
        <a-button type="danger"  @click="exitGroup(text.id)">Exit</a-button>
        <a-button @click="inviteUser(text)">Invite</a-button>
        <a-button :loading="userLoading && selectGroup.id == text.id" @click="showUsers(text)">Users</a-button>
      </div>
    </a-table>

    <a-modal title="Create a group" v-model="visibleAdd" @ok="onConfirmAdd" @cancel="onClose" :confirmLoading="addLoading">
      <a-form :form='formAdd' :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="Group Name">
          <a-input placeholder="Please enter group name!"
            v-decorator="['groupName', { rules: [{ required: true, message: 'Please input groupName!' }] }]" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal title="Join Group" v-model="visibleJoin" @ok="onConfirmSelect" @cancel="formJoin.resetFields()" :confirmLoading="joinLoading">
      <a-form :form='formJoin' :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="Group Id">
          <a-input placeholder="Please enter group id!"
            v-decorator="['id', { rules: [{ required: true, message: 'Please input groupId!' }] }]" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal title="View Group Id" v-model="visibleView" :footer="false">
      <span>The group ID is <b style="cursor: pointer; color: #1890ff;" @click="copyText(selectGroup.id)">{{ selectGroup.id }}</b></span>
    </a-modal>

    <a-modal title="Group Users" v-model="visibleUsers" :footer="false">
      <span>users: {{ groupUsers.join(',') }} </span>
    </a-modal>
  </div>
</template>

<script>
import { groups_list, groups_userList, groups_disband, groups_addUser, groups_add, groups_exit } from '@/api/api'
const columns = [
  {
    title: 'Num',
    dataIndex: '_num',
    align: 'center',
    width: 180
  },
  {
    title: 'Group Name',
    dataIndex: 'groupName',
    align: 'center',
  },
  {
    title: 'Date',
    dataIndex: 'createTime',
    align: 'center'

  },
  {
    title: 'Operation',
    align: 'center',
    width: 400,
    scopedSlots: { customRender: 'Operation' },
  },
];
export default {
  name: 'GroupsPage',
  data() {
    return {
      loading: false,
      addLoading: false,
      joinLoading: false,
      userLoading: false,
      resData: [],
      data: [],
      columns,
      visibleAdd: false,
      formAdd: this.$form.createForm(this, { name: 'coordinated' }),
      formJoin: this.$form.createForm(this, { name: 'coordinated' }),
      visibleView: false,
      visibleJoin: false,
      visibleUsers: false,
      searchParams: '',
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '50'],
        showTotal: total => `total ${total}`,
        showSizeChanger: true,
        onChange: this.change
      },
      selectGroup: {},
      groupUsers: []
    };
  },
  mounted() {
    this.getBaseList()
  },
  methods: {
    onInput() {
      if (!this.searchParams) {
        this.getBaseList()
      }
    },
    change(page) {
      this.pagination.current = page
      console.log(111);

    },
    getBaseList() {
      this.loading = true
      groups_list().then((res) => {
        this.data = res.data.map((m, mi) => {
          const date = new Date(m.createTime);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return {
            ...m,
            _num: mi + 1,
            createTime: `${day}/${month}/${year}`
          }
        })
        this.resData = [...this.data]
        this.pagination.total = res.data.length
      }).finally(() => {
        this.loading = false
      })
    },
    changePage(page) {
      Object.assign(this.pagination, page)
    },
    disbandGroup(id) {
      this.$confirm({
        title: 'Do you want to delete this group?',
        content: 'Cannot be restored after deletion',
        onOk: () => {
          groups_disband({id}).then(() => {
            this.$message.success('Deleting group for success！')
            this.getBaseList()
          }).finally(() => {
          })
        },
        onCancel() { },
      })
    },
    exitGroup(id) {
      this.$confirm({
        title: 'Do you want to exit this group?',
        content: 'Cannot be restored after exiting',
        onOk: () => {
          groups_exit({id}).then(() => {
            this.$message.success('Exit success！')
            this.getBaseList()
          }).finally(() => {
          })
        },
        onCancel() { },
      })
    },
    onConfirmAdd() {
      this.formAdd.validateFields((err, values) => {
        if (!err) {
          this.addLoading = true
          groups_add(values).then(() => {
            this.$message.success('Added group successfully')
            this.visibleAdd = false
            this.getBaseList()
          }).finally(() => {
            this.addLoading = false
          })
        }
      });
    },
    onClose() {
      this.formAdd.resetFields()
      this.visibleAdd = false
    },
    inviteUser(text) {
      this.selectGroup = text
      this.visibleView = true
    },
    showUsers(text) {
      this.userLoading = true
      this.selectGroup = text
      groups_userList({ groupId: text.id }).then(res => {
        this.groupUsers = res.data
        this.visibleUsers = true
      }).finally(() => {
        this.userLoading = false
      })
    },
    onConfirmSelect() {
      this.formJoin.validateFields((err, values) => {
        if (!err) {
        this.joinLoading = true
          groups_addUser({ id: values.id }).then(() => {
            this.$message.success('Join Success')
            this.visibleJoin = false
            this.formJoin.resetFields()
            this.getBaseList()
          }).finally(() => {
            this.joinLoading = false
          })
        }
      })
    },
    searchGroup() {
      this.data = this.resData.filter(item => item.groupName.indexOf(this.searchParams) > -1)
      this.pagination.total = this.data.length
    },
    copyText(text) {
      if (!text) {
        alert('Group Id does not exist');
        return;
      }
      // Create a temporary textarea element
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.$message.success('Group Id copied')
    }
  }
};
</script>

<style scoped lang="less">
.groups {
  padding: 50px;

  button {
    width: 84px;
  }

  .groups_top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .topLeft {
      flex: 1;
      display: flex;

      .ant-form {
        width: 400px;
      }

    }
  }

  :deep(.ant-table-thead) {
    tr {
      th {
        background-color: #e8e8e8;
        border-right: 1px solid #f7f6f6
      }
    }
  }
}
</style>
