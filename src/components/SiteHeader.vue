<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { to: '/', label: '首頁' },
  { to: '/categories', label: '分類' },
  { to: '/featured', label: '精選' },
  { to: '/archive', label: '檔案' },
]

const isActive = (to) => {
  if (to === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(to)
}
</script>

<template>
  <header class="topbar">
    <RouterLink class="brand" to="/">
      <img src="/userfile/38110/logo2.png" alt="五夢網標誌" />
      <div>
        <strong>五夢網</strong>
        <span>Legacy Archive, Modern Front Door</span>
      </div>
    </RouterLink>

    <nav class="topnav" aria-label="主選單">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="topnav-link"
        :class="{ 'is-active': isActive(link.to) }"
      >
        {{ link.label }}
      </RouterLink>
      <a class="topnav-link" href="/meworksv2a/meworks/page.aspx%EF%B9%96no=38110.html">舊站</a>
    </nav>
  </header>
</template>
