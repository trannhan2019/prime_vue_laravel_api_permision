import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../layouts/app/AppLayout.vue";
import NotFound from "../views/NotFound.vue";
import Error from "../views/Error.vue";
import AccessDenied from "../views/auth/AccessDenied.vue";
import { useAuth } from "@/stores/auth";

const APP_NAME = import.meta.env.VITE_APP_NAME || "SBA";

const checkGuest = (to, from, next) => {
  useAuth().isAuthenticated ? next({ name: "dashboard" }) : next();
};

const checkAuth = (to, from, next) => {
  useAuth().isAuthenticated ? next() : next({ name: "login" });
};

const checkPermission = (to, from, next, permission) => {
  useAuth().authData.permissions.includes(permission)
    ? next()
    : next({ name: "access.denied" });
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
      meta: {
        title: "Login",
      },
      beforeEnter: (to, from, next) => {
        checkGuest(to, from, next);
      },
    },

    {
      path: "/",
      name: "app.layout",
      component: AppLayout,
      redirect: "/dashboard",
      meta: {
        title: APP_NAME,
      },
      beforeEnter: (to, from, next) => {
        checkAuth(to, from, next);
      },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/Dashboard.vue"),
          meta: {
            title: "Dashboard",
          },
        },
        {
          path: "/manage-company",
          name: "manage.company",
          component: () => import("../views/manage/company/ManageCompany.vue"),
          meta: {
            title: "Manage Company",
          },
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next, "company.read");
          },
        },
        {
          path: "/manage-role",
          name: "manage.role",
          component: () => import("../views/ManageRole.vue"),
          meta: {
            title: "Manage Role",
          },
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next, "role.read");
          },
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
      meta: {
        title: "Access Denied",
        isRequiredAuth: false,
      },
    },
    {
      path: "/error",
      name: "error",
      component: Error,
      meta: {
        title: "Error",
        isRequiredAuth: false,
      },
    },
    {
      path: "/not-found",
      name: "not.found",
      component: NotFound,
      meta: {
        title: "Not Found",
        isRequiredAuth: false,
      },
    },
    { path: "/:pathMatch(.*)*", redirect: "/not-found" },
  ],
});

// Navigation guard
// router.beforeEach((to, from, next) => {
//   const authStore = useAuth();

//   const user = authStore.authData;
//   const auth = authStore.isAuthenticated;

//   if (auth) {
//     if (to.matched.some((route) => route.meta.isRequiredAuth === false)) {
//       next({ name: "dashboard" });
//     }
//   } else if (!auth) {
//     if (to.matched.some((route) => route.meta.isRequiredAuth === true)) {
//       next({ name: "login" });
//     }
//   } else {
//     next();
//   }
//   // if (to.meta.permission) {
//   //   if (
//   //     to.meta.permission.some((permission) =>
//   //       user.permissions.includes(permission)
//   //     )
//   //   ) {
//   //     next();
//   //   } else {
//   //     next({ name: "access.denied" });
//   //   }
//   // } else {
//   //   if (to.matched.some((route) => route.meta.guard === "guest") && auth)
//   //     next({ name: "dashboard" });
//   //   else if (to.matched.some((route) => route.meta.guard === "auth") && !auth)
//   //     next({ name: "login" });
//   //   else next();
//   // }
// });

export default router;
