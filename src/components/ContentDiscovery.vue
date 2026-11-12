<script setup>
import { computed, onMounted, ref } from 'vue'

const articles = ref([])
const recentArticles = ref([])
const isLoading = ref(false)
const loadError = ref(false)
const query = ref(new URLSearchParams(window.location.search).get('q') || '')
let searchIndexPromise

const normalize = (value) => value.toLocaleLowerCase('zh-Hant').replace(/\s+/g, '')

const searchResults = computed(() => {
  const keyword = normalize(query.value.trim())
  if (!keyword) return []

  return articles.value
    .map((article) => {
      const title = normalize(article.title)
      const section = normalize(article.section)
      const description = normalize(article.description)
      const content = normalize(article.content)
      let score = 0

      if (title === keyword) score += 100
      if (title.includes(keyword)) score += 50
      if (section.includes(keyword)) score += 20
      if (description.includes(keyword)) score += 12
      if (content.includes(keyword)) score += 5

      return { ...article, score }
    })
    .filter((article) => article.score > 0)
    .sort((left, right) => right.score - left.score || right.date.localeCompare(left.date))
    .slice(0, 12)
})

const resultSummary = computed(() => {
  if (!query.value.trim()) return ''
  if (isLoading.value) return '正在載入文章索引…'
  return searchResults.value.length ? `顯示最相關的 ${searchResults.value.length} 篇文章` : '找不到相符文章，請嘗試其他關鍵字。'
})

const formatDate = (date) => date ? date.replaceAll('-', '.') : '歷史收藏'
const articleHref = (href) => new URL(href.replace(/^\//, ''), document.baseURI).href

const loadSearchIndex = async () => {
  if (articles.value.length || searchIndexPromise) return searchIndexPromise
  isLoading.value = true
  searchIndexPromise = fetch(`${import.meta.env.BASE_URL}content-index.json`)
    .then((response) => {
      if (!response.ok) throw new Error('Unable to load content index')
      return response.json()
    })
    .then((data) => { articles.value = data.articles })
    .catch(() => { loadError.value = true })
    .finally(() => { isLoading.value = false })
  return searchIndexPromise
}

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}recent-content.json`)
    if (!response.ok) throw new Error('Unable to load recent content')
    const data = await response.json()
    recentArticles.value = data.articles
    if (query.value) await loadSearchIndex()
  } catch {
    loadError.value = true
  }
})
</script>

<template>
  <section id="search" class="section search-section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Search the archive</p>
        <h2>搜尋全站文章</h2>
      </div>
      <p class="section-text">輸入人物、事件或主題，搜尋五夢網保存的完整文章內容。</p>
    </div>

    <label class="search-box">
      <span>文章關鍵字</span>
      <input v-model="query" type="search" placeholder="例如：愛因斯坦、蒸汽機、偵探小說" autocomplete="off" @focus="loadSearchIndex" @input="loadSearchIndex" />
    </label>

    <p v-if="loadError" class="search-status error" role="alert">文章索引暫時無法載入，請稍後再試。</p>
    <p v-else class="search-status" aria-live="polite">{{ resultSummary }}</p>

    <div v-if="query.trim() && searchResults.length" class="article-grid search-results">
      <a v-for="article in searchResults" :key="article.href" :href="articleHref(article.href)" class="article-card">
        <div class="article-meta"><span>{{ article.section || '五夢網' }}</span><time>{{ formatDate(article.date) }}</time></div>
        <h3>{{ article.title }}</h3>
        <p>{{ article.description }}</p>
        <strong class="inline-link">閱讀文章 →</strong>
      </a>
    </div>
  </section>

  <section v-if="!query.trim()" class="section">
    <div class="section-heading">
      <div><p class="eyebrow">Recently added</p><h2>近期收錄</h2></div>
      <p class="section-text">從典藏中發現最近更新的文章，直接開始閱讀。</p>
    </div>
    <div class="article-grid">
      <a v-for="article in recentArticles" :key="article.href" :href="articleHref(article.href)" class="article-card">
        <div class="article-meta"><span>{{ article.section || '五夢網' }}</span><time>{{ formatDate(article.date) }}</time></div>
        <h3>{{ article.title }}</h3>
        <p>{{ article.description }}</p>
      </a>
    </div>
  </section>
</template>
