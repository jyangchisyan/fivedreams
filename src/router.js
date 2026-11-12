import { createRouter, createWebHistory } from 'vue-router'
import ArchivePage from './pages/ArchivePage.vue'
import CategoriesPage from './pages/CategoriesPage.vue'
import CategoryPage from './pages/CategoryPage.vue'
import FeaturedPage from './pages/FeaturedPage.vue'
import HomePage from './pages/HomePage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import { categories } from './data/site.js'

const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { title: '五夢網｜探索知識、人物與故事', description: '搜尋五夢網數千篇科學、文化、生活、人物與文學典藏，發現近期收錄與精選文章。' } },
  { path: '/categories', name: 'categories', component: CategoriesPage, meta: { title: '主題分類｜五夢網', description: '依科學、生活、財經、人物與文學等主題瀏覽五夢網文章典藏。' } },
  { path: '/categories/:slug', name: 'category', component: CategoryPage, meta: { title: '分類詳情｜五夢網', description: '瀏覽五夢網主題分類與相關文章。' } },
  { path: '/featured', name: 'featured', component: FeaturedPage, meta: { title: '精選內容｜五夢網', description: '閱讀五夢網編選的特色專題與內容入口。' } },
  { path: '/archive', name: 'archive', component: ArchivePage, meta: { title: '歷史檔案｜五夢網', description: '瀏覽五夢網保存的歷史站台與內容檔案。' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage, meta: { title: '找不到頁面 | 五夢網' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const category = to.name === 'category' ? categories.find((item) => item.slug === to.params.slug) : null
  const title = category ? `${category.title}｜五夢網` : (to.meta.title || '五夢網')
  const description = category?.summary || to.meta.description || '探索五夢網的知識與故事收藏。'
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
  const canonical = new URL(`${basePath}${to.path}`, window.location.origin).href
  const image = new URL(`${basePath}/userfile/38110/logo2.png`, window.location.origin).href

  document.title = title
  document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)

  for (const [property, content] of Object.entries({
    'og:title': title,
    'og:description': description,
    'og:url': canonical,
    'og:image': image,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
  })) {
    document.querySelector(`meta[property="${property}"], meta[name="${property}"]`)?.setAttribute('content', content)
  }
})

export default router
