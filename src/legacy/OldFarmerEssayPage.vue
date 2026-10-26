<script setup>
import { computed } from 'vue'
import { oldFarmerEssayPages, oldFarmerSiblingPages } from './oldFarmerEssayData'

const pathname = decodeURIComponent(window.location.pathname)
const currentId = pathname.match(/no=(\d+)\.html$/)?.[1] ?? '221276'

const page = computed(() => oldFarmerEssayPages[currentId] ?? oldFarmerEssayPages['221276'])

const legacyHref = computed(() => `/meworksv2a/meworks/page1.aspx%EF%B9%96no=${page.value.id}.legacy.html`)
</script>

<template>
  <div class="legacy-modern-shell">
    <header class="legacy-modern-topbar">
      <a class="legacy-brand" href="/meworksv2a/meworks/page1.aspx%EF%B9%96no=220709.html">
        <img src="/userfile/38110/logo2.png" alt="五夢網標誌" />
        <div>
          <strong>老農開講</strong>
          <span>{{ page.title }} Modern Edition</span>
        </div>
      </a>

      <nav class="legacy-modern-nav" aria-label="頁面捷徑">
        <a href="/#/categories/old-farmer-talks">Vue 分類頁</a>
        <a href="/meworksv2a/meworks/page1.aspx%EF%B9%96no=220709.html">回老農開講總頁</a>
        <a :href="legacyHref">看歷史備份頁</a>
        <a href="/meworksv2a/meworks/page.aspx%EF%B9%96no=38110.html">回舊版首頁</a>
      </nav>
    </header>

    <main class="legacy-modern-main">
      <section class="legacy-hero">
        <div class="legacy-hero-copy">
          <p class="legacy-eyebrow">{{ page.eyebrow }}</p>
          <h1>{{ page.title }}</h1>
          <p class="legacy-lead">{{ page.lead }}</p>
        </div>

        <aside class="legacy-hero-panel">
          <p class="legacy-panel-label">頁面定位</p>
          <ul>
            <li>把單篇或雙版本文章入口整理成清楚的閱讀頁</li>
            <li>保留原始文章連結，不改內容路徑</li>
            <li>與老農開講其他主題維持一致的現代化版型</li>
          </ul>
        </aside>
      </section>

      <section class="legacy-notes single">
        <article class="legacy-note-card">
          <p class="legacy-eyebrow">Summary</p>
          <h2>主題說明</h2>
          <p>{{ page.summary }}</p>
        </article>
      </section>

      <section class="legacy-grid articles">
        <article v-for="article in page.articles" :key="article.href" class="legacy-card" data-tone="history">
          <p class="legacy-card-kicker">{{ article.label }}</p>
          <h2>{{ article.title }}</h2>
          <p>{{ article.note }}</p>
          <div class="legacy-actions">
            <a class="legacy-link-button" :href="article.href">開啟原始文章</a>
          </div>
        </article>
      </section>

      <section class="legacy-notes">
        <article class="legacy-note-card">
          <p class="legacy-eyebrow">Sibling Topics</p>
          <h2>同系列主題</h2>
          <div class="legacy-mini-links">
            <a
              v-for="item in oldFarmerSiblingPages"
              :key="item.id"
              :href="item.href"
              :class="{ active: item.id === page.id }"
            >
              {{ item.title }}
            </a>
          </div>
        </article>

        <article class="legacy-note-card">
          <p class="legacy-eyebrow">Legacy Access</p>
          <h2>歷史版本</h2>
          <p>
            如果你要比對舊站畫面，可以直接回到歷史備份頁；如果你只想閱讀內容，直接從上面的文章卡片進入原始文章頁即可。
          </p>
        </article>
      </section>
    </main>
  </div>
</template>
