<template>
  <a-layout class="layout">
    <Menu :menu-data="menuDataLeft" :collapsed="collapsed">
      <div class="global-header-logo" @click="$router.push('/')">
        <img src="@/assets/images/logo.png" alt="">
        <span v-if="!collapsed">Finance With Me</span>
      </div>
    </Menu>
    <a-layout>
      <Header class="global-header" ref="headerRef" @updataCollapsed="(e) => collapsed = e"></Header>
      <a-layout-content class="global-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Menu from "./Menu";
import Header from "./Header";
import { routers } from '../router/routers'

export default {
  name: "Layout",
  components: {
    Menu,
    Header,
  },
  data() {
    return {
      menuDataLeft: [],
      collapsed: false
    }
  },
  mounted() {
    this.menuDataLeft = routers.find(f => f.name == 'Layout').children.map((m, mi) => ({
      id: mi + 1,
      icon: m.meta.icon,
      title: m.meta.title,
      path: m.path
    }))
  },
}
</script>

<style lang="less">
@height: 158px;

.layout {
  min-height: 100vh !important;
  overflow-x: hidden;

  .global-header {
    border-bottom: 1px solid #ccc;
  }

  .global-content {
    padding: 25px 25px 80px;
    height: 0;
    background-color: #ffffff;
    overflow: auto;
  }

  .global-header-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: @height;
    padding: 10px;
    cursor: pointer;

    img {
      width: 80px;
      height: 80px;
      object-fit: contain;
    }

    span {
      font-size: 20px;
      padding-top: 10px;
      color: #333;
    }
  }
}
</style>
