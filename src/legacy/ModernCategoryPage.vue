<script setup>
import { computed } from 'vue'
import { modernCategories } from './modernCategoryData'

const pathname = decodeURIComponent(window.location.pathname)
const currentId = pathname.match(/no=(\d+)\.html$/)?.[1] ?? '220705'
const category = computed(() => modernCategories[currentId] ?? modernCategories['220705'])
const legacyHref = computed(() => `/meworksv2a/meworks/page1.aspx%EF%B9%96no=${currentId}.legacy.html`)
</script>

<template>
  <div class="category-shell" :data-color="category.color">
    <header class="category-topbar">
      <a class="category-brand" href="/#/">
        <img src="/userfile/38110/logo2.png" alt="五夢網標誌" />
        <div><strong>五夢網</strong><span>{{ category.title }} Modern Edition</span></div>
      </a>
      <nav class="category-nav" aria-label="頁面捷徑">
        <a href="/#/categories">Vue 分類頁</a>
        <a :href="legacyHref">歷史備份頁</a>
        <a href="/meworksv2a/meworks/page.aspx%EF%B9%96no=38110.html">舊版首頁</a>
      </nav>
    </header>

    <main class="category-main">
      <section class="category-hero">
        <div class="category-hero-copy"><p class="category-eyebrow">{{ category.eyebrow }}</p><h1>{{ category.title }}</h1><p>{{ category.lead }}</p></div>
        <aside class="category-hero-panel"><p>Modern Archive</p><strong>{{ category.children.length }} 個主題入口</strong><span>{{ category.description }}</span></aside>
      </section>

      <section class="category-section">
        <div class="category-section-header"><div><p class="category-eyebrow">Explore</p><h2>主題地圖</h2></div><p>每張卡片都直接保留原始分類頁，讓現代入口與既有內容可以並行。</p></div>
        <div class="category-grid">
          <a v-for="item in category.children" :key="item.id" class="category-card" :href="item.href"><span>{{ item.id }}</span><h3>{{ item.title }}</h3><p>{{ item.summary }}</p><b>前往原始分類</b></a>
        </div>
      </section>
    </main>
  </div>
</template>
