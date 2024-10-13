import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/create",
    name: "create",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CreateView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
