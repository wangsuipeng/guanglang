// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './permission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Cookies from 'js-cookie'
import i18n from './lang' // internationalization
import store from './store'
import vuescroll from 'vuescroll'
import '@/assets/commonjs/users'
import '@/assets/commonjs/utils'
import echarts from 'echarts'
import axios from '@/axios'
import Mock from './Mock'

axios.defaults.baseURL = 'http://mockjs.com/api' // 设置默认请求的url

window['$http'] = axios;
window['$echarts'] = echarts;
window['$Mock'] = Mock;

Vue.use(vuescroll, {
  ops: {
    scrollPanel: {
      initialScrollY: false,
      initialScrollX: false,
      scrollingX: false,
      scrollingY: true,
      speed: 300,
      easing: undefined,
      verticalNativeBarPos: 'right'
    },
    bar: {
      background: 'transparent'
    }
  },
  name: 'vue-scroll'
});

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});
