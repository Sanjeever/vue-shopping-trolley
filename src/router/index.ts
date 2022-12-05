import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/404",
      component: () => import("@/views/404.vue"),
    },
  ],
});

router.beforeEach((to: RouteLocationNormalized) => {
  const paths = router.getRoutes().map((item) => item.path);
  if (!paths.includes(to.fullPath)) {
    router.push("/404");
  }
});

export default router;
