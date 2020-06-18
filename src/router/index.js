import Vue from 'vue';
import {
  LoadingBar,
  Message
} from 'view-design'
import VueRouter from 'vue-router';
import config from '@/config'
import { getToMuLoginChanneFlag } from '@/libs/util'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'ToMu',
    },
    component: () => import('@/view/index.vue'),
  },
  {
    path: '/addChannel',
    name: 'addChannel',
    meta: {
      title: 'ToMu',
    },
    component: () => import('@/view/page/addChannel.vue'),
  },
  /* 404 配置 */
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  LoadingBar.start()
  const token = getToMuLoginChanneFlag()
  if (!token && to.name !== config.addChannelPath) {
    // 未登录且要跳转的页面不是登录页
    Message.info('请先添加频道');
    next({
      name: config.addChannelPath // 跳转到登录页
    })
    LoadingBar.finish()
  } else if (to.matched.length === 0) {
    next('/');
    LoadingBar.finish()
  } else {
    next();
  }
})

router.afterEach(to => {
  document.title = to.meta.title || '睿知'
  setTimeout(() => {
    LoadingBar.finish()
  }, 1000)
  document.getElementById('app').scrollTo(0, 0)
});

export default router;
