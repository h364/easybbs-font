import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "Layout",
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: '/',
          name: "ArticleList",
          component: () => import('@/views/forum/ArticleList.vue'),
        },
      ]
    },
  ]
})

export default router
