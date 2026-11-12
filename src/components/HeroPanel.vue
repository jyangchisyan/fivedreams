<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  stats: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">FIVE DREAMS</p>
      <h1>從一篇文章，走進更大的知識世界。</h1>
      <p class="hero-text">
        搜尋數千篇跨越科學、文化、生活與人物的典藏，或從近期收錄開始閱讀。
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href="#search">搜尋文章</a>
        <RouterLink class="button button-secondary" to="/categories">依主題探索</RouterLink>
      </div>
    </div>

    <div class="hero-card">
      <p class="hero-card-label">探索五夢網</p>
      <ul class="hero-list">
        <li>從主題分類尋找感興趣的內容</li>
        <li>閱讀跨越不同領域的文章</li>
        <li>重訪珍貴的歷史收藏</li>
      </ul>

      <div class="stats-grid">
        <article v-for="stat in stats" :key="stat.label" class="stat-tile">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </article>
      </div>
    </div>
  </section>
</template>
