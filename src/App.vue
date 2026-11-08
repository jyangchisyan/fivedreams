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
      <p>五夢網 · 探索知識，分享故事</p>
    </footer>
  </div>
</template>
