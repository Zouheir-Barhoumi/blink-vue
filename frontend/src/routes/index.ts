import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../components/HomeView.vue";
import LoginView from "../components/auth/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
