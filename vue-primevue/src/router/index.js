import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../layouts/app/AppLayout.vue";
import HomeView from "../views/HomeView.vue";
import NotFound from "../views/NotFound.vue";
import Error from "../views/Error.vue";
import AccessDenied from "../views/auth/AccessDenied.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
    },

    {
      path: "/",
      name: "app.layout",
      component: AppLayout,
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/Dashboard.vue"),
        },
        {
          path: "/manage-company",
          name: "manage.company",
          component: () => import("../views/ManageCompany.vue"),
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/access-denied",
      name: "access.denied",
      component: AccessDenied,
    },
    {
      path: "/error",
      name: "error",
      component: Error,
    },
    {
      path: "/not-found",
      name: "not.found",
      component: NotFound,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
