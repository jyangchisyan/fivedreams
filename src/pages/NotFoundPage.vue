<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="section">
    <div class="empty-state">
      <p class="eyebrow">404</p>
      <h1>這個 Vue 路由不存在</h1>
      <p class="section-text">舊站 HTML 仍然保留在原本路徑，但新的前端路由只接受已定義的頁面。</p>
      <RouterLink class="button button-primary" to="/">回到首頁</RouterLink>
    </div>
  </section>
</template>
