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
      <h1>在知識與故事之間，發現更多可能。</h1>
      <p class="hero-text">
        從科學、文化到生活與人物，探索五夢網收藏的文章與觀點。
      </p>
      <div class="hero-actions">
        <RouterLink class="button button-primary" to="/categories">瀏覽主題</RouterLink>
        <RouterLink class="button button-secondary" to="/archive">查看歷史檔案</RouterLink>
        <a class="button button-secondary" href="/meworksv2a/meworks/page.aspx%EF%B9%96no=38110.html">
          開啟舊版首頁
        </a>
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
