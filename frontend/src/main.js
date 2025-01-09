import Vue from 'vue'
import App from './App.vue'
import router from "./router";
// Introduce global component plugins
import 'ant-design-vue/dist/antd.css';
import globalComponents from '@/components'
import './permission'
Vue.config.productionTip = false
Vue.use(globalComponents)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
