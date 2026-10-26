<script setup>
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <div class="shell">
    <SiteHeader />

    <main class="page-main">
      <RouterView />
    </main>

    <footer class="site-footer">
      <p>五夢網現代化入口以 Vue Router 建立，舊站內容仍保留為可直接存取的歷史頁面。</p>
    </footer>
  </div>
</template>
