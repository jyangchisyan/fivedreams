<script setup>
import { scienceArticles, scienceFields } from './basicScienceData'
</script>

<template>
  <div class="science-shell">
    <header class="science-topbar">
      <a class="science-brand" href="/#/">
        <img src="/userfile/38110/logo3.png" alt="五夢網標誌" />
        <div><strong>五夢網</strong><span>基礎科學 Modern Edition</span></div>
      </a>
      <nav class="science-nav" aria-label="頁面捷徑">
        <a href="/#/categories/basic-science">Vue 分類頁</a>
        <a href="/meworksv2a/meworks/page1.aspx%EF%B9%96no=220704.legacy.html">歷史備份頁</a>
        <a href="/meworksv2a/meworks/page.aspx%EF%B9%96no=38110.html">舊版首頁</a>
      </nav>
    </header>

    <main class="science-main">
      <section class="science-hero">
        <div class="science-hero-copy">
          <p class="science-eyebrow">Science Library</p>
          <h1>基礎科學</h1>
          <p class="science-lead">從數學、物理、化學、生物到地球環境，這裡把五夢網原有的科學知識重新整理成清楚的學習地圖。每個領域都保留原始分類與文章路徑，方便持續閱讀與後續重構。</p>
        </div>
        <aside class="science-hero-panel">
          <p class="science-panel-label">閱讀方式</p>
          <ul><li>先選擇一個科學領域建立脈絡</li><li>從精選文章直接進入舊站完整內容</li><li>保留歷史頁面，確保資料可追溯</li></ul>
        </aside>
      </section>

      <section class="science-section">
        <div class="science-section-header"><div><p class="science-eyebrow">Learning Map</p><h2>七個學習領域</h2></div><p>以原網站的分類為基礎，重新安排為可快速掃讀的科學入口。</p></div>
        <div class="science-grid">
          <article v-for="field in scienceFields" :key="field.number" class="science-card">
            <p class="science-number">{{ field.number }}</p><h3>{{ field.title }}</h3><p>{{ field.summary }}</p><span class="science-example">例如：{{ field.example }}</span><a :href="field.href">前往原始分類</a>
          </article>
        </div>
      </section>

      <section class="science-section science-feature-section">
        <div class="science-section-header"><div><p class="science-eyebrow">Start Reading</p><h2>精選閱讀入口</h2></div><p>從每個核心領域各挑一篇代表文章，作為快速開始閱讀的入口。</p></div>
        <div class="science-article-list">
          <a v-for="article in scienceArticles" :key="article.href" :href="article.href" class="science-article"><span>{{ article.category }}</span><strong>{{ article.title }}</strong><i>閱讀原始文章</i></a>
        </div>
      </section>
    </main>
  </div>
</template>
