import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Chat from "../views/Chat.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Chat },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
