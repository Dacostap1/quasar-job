const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    redirect: { name: "login" },
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("pages/auth/LoginPage.vue"),
      },
      {
        path: "registro",
        name: "register",
        component: () => import("pages/auth/RegisterPage.vue"),
      },
    ],
  },
  {
    path: "/home",
    name: "home",
    meta: { requiresAuth: true },
    redirect: { name: "inicio" },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "inicio",
        component: () => import("src/pages/HomePage.vue"),
      },
      {
        path: "/mis-postulaciones",
        name: "applys",

        component: () => import("src/pages/ApplyPage.vue"),
      },
      {
        path: "/trabajos",
        name: "jobs",

        component: () => import("src/pages/JobsPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
