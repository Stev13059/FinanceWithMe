<template>
  <a-layout-header class="layout-header">
    <div class="header-box">
      <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="updata"
        style="margin:0 20px;font-size: 20px;" />
      <div class="title">{{ $route.meta.title }}</div>
      <div class="btn">
        <a-button shape="circle" :icon="isFull ? 'fullscreen-exit' : 'fullscreen'" @click="onFillScreen"></a-button>
        <a-button shape="circle" icon="reload" @click="onReload" :class="{ 'isActive': isReload }"></a-button>
      </div>
    </div>
  </a-layout-header>
</template>

<script>

export default {
  name: "HeaderComp",
  data() {
    return {
      collapsed: false,
      isReload: false,
      isFull: false
    }
  },
  methods: {
    getUserInfo() {
    },
    updata() {
      this.collapsed = !this.collapsed
      this.$emit('updataCollapsed', this.collapsed)
    },
    onReload() {
      this.isReload = !this.isReload
      setTimeout(() => {
        window.location.reload()
      }, 500)
    },
    onFillScreen() {
      const full = document.fullscreenElement
      !full ? document.documentElement.requestFullscreen() : document.exitFullscreen()
      this.isFull = !this.isFull
    }
  },
};
</script>

<style lang="less" scoped>
@height: 69px;

.isActive {
  transform: rotateZ(360deg);
  transition: all 1s;
}

button {
  margin: 0 15px;
}

.layout-header {
  height: @height;
  padding: 0;
  line-height: @height;
  background-color: #fff;

  .header-box {
    display: flex;
    align-items: center;



    .title {
      flex: 1;
      font-size: 22px;
      margin-left: 20px;
      color: #000;
    }

    .btn {
      margin-right: 30px;
    }

    .logout {
      margin-left: 10px;
      margin-right: 40px;
      padding: 0;
      cursor: pointer;

      &:hover {
        color: #000;
      }
    }
  }
}
</style>
