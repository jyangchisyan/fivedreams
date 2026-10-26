<script setup>
import { computed, ref } from 'vue'
import CategoryGrid from '../components/CategoryGrid.vue'
import PageHero from '../components/PageHero.vue'
import { categories } from '../data/site.js'

const query = ref('')

const visibleCategories = computed(() => {
  const keyword = query.value.trim().toLowerCase()

  if (!keyword) {
    return categories
  }

  return categories.filter((item) => {
    const haystack = [item.title, item.summary, ...item.highlights, ...(item.children || []).map((child) => child.label)]
      .join(' ')
      .toLowerCase()

    return haystack.includes(keyword)
  })
})
</script>

<template>
  <PageHero
    eyebrow="Categories"
    title="主題分類總覽"
    description="把原本散落在首頁與下拉選單裡的主題整理成可瀏覽、可搜尋、可延伸的獨立頁面。"
    compact
  />

  <section class="section search-section">
    <label class="search-box">
      <span>搜尋分類與子題</span>
      <input v-model="query" type="search" placeholder="例如：花的故事、科學家、世界文選" />
    </label>
  </section>

  <CategoryGrid :items="visibleCategories" show-router-link />
</template>
