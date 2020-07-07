import Vue from 'vue'
import {
  Button,
  Icon,
  Input,
  Row,
  Col,
  Message,
  Spin,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
  Checkbox,
} from 'view-design';
import store2 from 'store2'
// APlayer
import 'aplayer/dist/APlayer.min.css'
import VueClipboard from 'vue-clipboard2'
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'
import api from './libs/apis';
import 'view-design/dist/styles/iview.css'
import 'animate.css/animate.css'

Vue.use(VueClipboard);

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
Vue.component('RadioGroup', RadioGroup);
Vue.component('Radio', Radio);
Vue.component('Checkbox', Checkbox);

Vue.prototype.$Message = Message;
Vue.prototype.$Spin = Spin;

Vue.prototype.$api = api;
Vue.config.productionTip = false;

/**
 * @description 全局应用配置
 */
Vue.prototype.$config = config;
/**
 * @description 全局event-source-polyfill
 */
Vue.prototype.$NativeEventSource = NativeEventSource;
Vue.prototype.$EventSourcePolyfill = EventSourcePolyfill;
/**
 * @description 全局localStorage, sessionStorage
 */
Vue.prototype.$store2 = store2;


new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
