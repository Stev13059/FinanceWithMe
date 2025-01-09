<template>
  <a-layout-sider :trigger="null" :width="240" v-model="collapsed" collapsible>
    <div class="global-menu">
      <slot></slot>
      <a-menu class="menu-style" theme="light" mode="inline" :selected-keys="selectKey" :openKeys="openKeys"
        @select="menuSelect" @openChange="openChange">
        <template v-for="item in menuData">
          <a-menu-item v-if="!item.children" :key="item.id">
            <router-link :to="item.path">
              <div class="item-box">
                <a-icon class="item-icon" v-if="item.icon" :type="item.icon" style="font-size: 20px" />
                <span v-else style="margin-left: 13px"></span>
                <span class="box-title" style="font-size: 16px">{{ item.title }}</span>
              </div>
            </router-link>
          </a-menu-item>
          <a-sub-menu v-else :key="item.id + 1">
            <span slot="title">
              <a-icon class="item-icon" v-if="item.icon" :type="item.icon" style="font-size: 20px" />
              <span v-else style="margin-left: 13px"></span>
              <span class="box-title" style="font-size: 16px">{{ item.title }}</span>
            </span>
            <a-menu-item v-for="childItem in item.children" :key="childItem.id">
              <router-link :to="childItem.path">
                <div class="item-box">
                  <span>{{ childItem.title }}</span>
                </div>
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
      <span style="text-align: center; font-size: 16px; color: #000; padding-bottom: 10px;">{{ username }}</span>
      <div @click="handleLogout" class="logOut">
        <a-icon type="import" style="font-size: 25px;margin-right:20px;" />
        <span>logout</span>
      </div>
    </div>
  </a-layout-sider>
</template>

<script>
import { Modal } from 'ant-design-vue';
export default {
  name: "GlobalMenu",
  props: {
    menuData: {
      type: Array,
      default() {
        return []
      }
    },
    collapsed: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      // selected route
      selectKey: [1],
      openKeys: [0],
    }
  },
  computed: {
    username() {
      return localStorage.getItem('username')
    }
  },
  mounted() {
    this.getSelectKey()
  },
  methods: {
    // selected menu
    getSelectKey() {
      this.menuData.forEach(item => {
        if (this.$route.path == item.path) {
          this.selectKey = [item.id]

        } else if (item.children) {
          item.children.forEach((childItem) => {
            if (childItem.path === this.$route.path) {
              this.openKeys = [item.id]
              this.selectKey = [childItem.id]
            }
          })
        }
      })
    },
    openChange(item) {
      if (item[1]) {
        this.openKeys = [item[1]]
      } else {
        this.openKeys = [0]
      }
    },
    menuSelect(item) {
      this.selectKey = item.keyPath
    },
    handleLogout() {
      Modal.confirm({
        title: 'Tips',
        content: 'Do you really want to logout?',
        onOk: () => {
          localStorage.removeItem('userId')
          window.location.reload()
        },
        onCancel() {
        },
      });
    }
  },
  watch: {
    '$route.path': function () {
      this.getSelectKey()
    },
    menuData: function () {
      this.getSelectKey()
    }
  }
}
</script>

<style lang="less" scoped>
@border-color: #ccc;

.global-menu {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-right: 1px solid @border-color;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  .logOut {
    width: 100%;
    height: 60px;
    font-size: 25px;
    font-weight: 500;
    color: #000;
    text-align: center;
    line-height: 55px;
    border-top: 1px solid #f2f2f2;
    cursor: pointer;
  }

  .menu-style {
    flex: 1;
    border-right: none;

    .menu-item {
      &:after {
        content: '';
        border: none;
        border-right: 1px solid @border-color;
      }
    }
  }
}

::v-deep(.ant-menu-item) {
  height: 50px !important;
  line-height: 50px !important;
}
</style>
