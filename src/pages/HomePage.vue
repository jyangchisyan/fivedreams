<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import CategoryGrid from '../components/CategoryGrid.vue'
import DeepLinkPanels from '../components/DeepLinkPanels.vue'
import HeroPanel from '../components/HeroPanel.vue'
import { categories, deepLinks, siteStats } from '../data/site.js'

const query = ref('')

const filteredCategories = computed(() => {
  const keyword = query.value.trim().toLowerCase()

  if (!keyword) {
    return categories
  }

  return categories.filter((item) => {
    const haystack = [item.title, item.summary, ...item.highlights].join(' ').toLowerCase()
    return haystack.includes(keyword)
  })
})
</script>

<template>
  <HeroPanel :stats="siteStats" />

  <section id="search" class="section search-section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Search</p>
        <h2>從入口開始整理舊內容</h2>
      </div>
      <p class="section-text">
        首頁保留搜尋與分類預覽，完整內容拆到獨立路由頁，讓資訊架構真正可擴張。
      </p>
    </div>

    <label class="search-box">
      <span>搜尋分類或關鍵詞</span>
      <input
        v-model="query"
        type="search"
        placeholder="例如：科學、理財、台灣名人、偵探小說"
      />
    </label>

    <div class="card-actions top-gap">
      <RouterLink class="button button-secondary" to="/categories">查看完整分類頁</RouterLink>
      <RouterLink class="button button-secondary" to="/featured">查看精選入口</RouterLink>
    </div>
  </section>

  <CategoryGrid :items="filteredCategories" />
  <DeepLinkPanels :groups="deepLinks" />
</template>
