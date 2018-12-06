import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/cash/add",
      name: "CashAdd",
      // route level code-splitting
      // this generates a separate chunk (.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "CashAdd" */ "./views/CashAdd.vue")
    },
    {
      path: "/cash/withdraw",
      name: "CashWithdraw",
      // route level code-splitting
      // this generates a separate chunk (.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "CashWithdraw" */ "./views/CashWithdraw.vue")
    }
  ]
});
