import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LandingView",
    component: () => import("../views/LandingView.vue"),
  },
  {
    path: "/",
    name: "BlankLayout",
    component: () => import("../layouts/BlankLayout.vue"),
    children: [
      {
        path: "login",
        name: "LoginView",
        component: () => import("../views/LoginView.vue"),
      },
      {
        path: "logout",
        name: "LogoutView",
        component: () => import("../views/LogoutView.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "AppLayout",
    component: () => import("../layouts/AppLayout.vue"),
    children: [
      {
        path: "home",
        name: "HomeView",
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "tasks",
        name: "TasksView",
        component: () => import("../views/TasksView.vue"),
      },
      {
        path: "users",
        name: "UsersView",
        component: () => import("../views/UsersView.vue"),
      },
      {
        path: "twitterusers",
        name: "TwitterUsersView",
        component: () => import("../views/TwitterUsersView.vue"),
      },
      {
        path: "logs",
        name: "LogsView",
        component: () => import("../views/LogsView.vue"),
      },
    ],
  },
];
export default routes;
