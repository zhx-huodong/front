import Vue from 'vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import './public/style/common.less';
import 'element-ui/lib/theme-chalk/index.css';
import routes from './routes/index'; // 全局路由
import App from './App.vue';
import store from './store';

Vue.config.productiontip = true;

Vue.use(VueRouter);
Vue.use(ElementUI);

// 全局注册tools方法
import * as funcs from './tools/tools';

for (let name in funcs) Vue.prototype[name] = funcs[name];

const router = new VueRouter({
  routes,
  mode: 'history'
});

window.app = new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
});
