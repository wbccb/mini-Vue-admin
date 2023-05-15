import {createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions} from "vue-router";
import LayoutIndex from "@/layout/index.vue";

// 默认情况下，所有路由是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由
// strict=true，严格要求（导致匹配带有或不带有尾部斜线的路由失效）
// sensitive=true，严格区分大小写
// redirect：重定向的目标，可以使用{name:xxx}或者一个function()
// end：默认为true，其 RegExp 是否应该在末尾加一个 $ 以匹配到末尾

export const dynamicRoutes: RouteRecordRaw[] = [

] as RouteRecordRaw[];

export const notNeedLogin: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
    meta: {
      hidden: true,
    },
  },
] as RouteRecordRaw[];

export const basicRouters: RouteRecordRaw[] = [
  {
    path: "/:path(.*)*", // "/:path(.*)*"代表: "/a/b"->params: [ "a", "b" ]
    component: () => import("@/views/error/404.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "",
    component: LayoutIndex,
    redirect: "/index",
    children: [
      {
        path: "/index",
        redirect: "/system/role",
        component: () => import("@/views/index.vue"),
      },
    ],
    meta: {
      title: "首页",
    },
  },
  ...notNeedLogin,
] as RouteRecordRaw[];

const routerOptions: RouterOptions = {
  history: createWebHashHistory(),
  routes: basicRouters,
} as RouterOptions;

const router = createRouter(routerOptions);
export default router;
