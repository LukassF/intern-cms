import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
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
  {
    path: "/modify",
    name: "modify",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ModifyView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
