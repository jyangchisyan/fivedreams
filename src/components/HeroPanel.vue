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
      <p class="eyebrow">Vue Modernization</p>
      <h1>把舊站內容保留下來，把入口體驗升級到現在。</h1>
      <p class="hero-text">
        這一版先不動 4000 多個歷史頁面，改由新的 Vue 首頁負責導覽、篩選與資訊整理，
        讓內容保留、入口現代化、後續重構有落點。
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
      <p class="hero-card-label">重構策略</p>
      <ul class="hero-list">
        <li>新入口用 Vue 管理資訊架構</li>
        <li>舊內容維持深連結可用</li>
        <li>之後可逐步把分類頁搬進元件系統</li>
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
