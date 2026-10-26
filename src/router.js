import { createRouter, createWebHashHistory } from 'vue-router'
import ArchivePage from './pages/ArchivePage.vue'
import CategoriesPage from './pages/CategoriesPage.vue'
import CategoryPage from './pages/CategoryPage.vue'
import FeaturedPage from './pages/FeaturedPage.vue'
import HomePage from './pages/HomePage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { title: '五夢網 | 現代化入口' } },
  { path: '/categories', name: 'categories', component: CategoriesPage, meta: { title: '主題分類 | 五夢網' } },
  { path: '/categories/:slug', name: 'category', component: CategoryPage, meta: { title: '分類詳情 | 五夢網' } },
  { path: '/featured', name: 'featured', component: FeaturedPage, meta: { title: '精選入口 | 五夢網' } },
  { path: '/archive', name: 'archive', component: ArchivePage, meta: { title: '歷史檔案 | 五夢網' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage, meta: { title: '找不到頁面 | 五夢網' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title || '五夢網'
})

export default router
