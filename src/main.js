import Vue from 'vue'
import {
  Button,
  Icon,
  Input,
  Row,
  Col,
  Message,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'view-design';
import store2 from 'store2'
// APlayer
import 'aplayer/dist/APlayer.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'
import api from './libs/apis';
import 'view-design/dist/styles/iview.css'
import 'animate.css/animate.css'

/**
 * @description 引入依赖组件
 */
Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.component('Input', Input);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.prototype.$Message = Message


Vue.prototype.$api = api;
Vue.config.productionTip = false

/**
 * @description 全局应用配置
 */
Vue.prototype.$config = config
/**
 * @description 全局localStorage, sessionStorage
 */
Vue.prototype.$store2 = store2


new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
