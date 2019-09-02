import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import store from './store'

NProgress.configure({showSpinner: false}); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  let getToken = store.getters.token;

  // if (getToken) {
  //   if (to.path === '/login') {
  //     store.dispatch('defaultActive', 'modelView');
  //     next('/part/modelView');
  //   }
  //   next();
  // } else {
  //   let routePath = screenRoutes(router.options.routes);
  //   if (routePath.indexOf(to.path) !== -1) {
  //     next('/404');
  //   }
  // }
  next();
});

function screenRoutes(routes) {
  let routePath = [];
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path !== '/login' && routes[i].path !== '/' && routes[i].path !== '/404' && routes[i].path !== '*') {
      routePath.push(routes[i].path);
      if (routes[i].children) {
        for (let j = 0; j < routes[i].children.length; j++) {
          routePath.push(`${routes[i].path}/${routes[i].children[j].path}`)
        }
      }
    }
  }
  return routePath;
}

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
});
