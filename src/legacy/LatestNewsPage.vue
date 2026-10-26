<script setup>
import { latestNewsFeed, latestNewsHighlights, latestNewsSections } from './latestNewsData'
</script>

<template>
  <div class="news-shell">
    <header class="news-topbar">
      <a class="news-brand" href="/#/">
        <img src="/userfile/38110/logo2.png" alt="五夢網標誌" />
        <div>
          <strong>五夢網</strong>
          <span>最新消息 Modern Edition</span>
        </div>
      </a>

      <nav class="news-nav" aria-label="頁面捷徑">
        <a href="/#/categories/latest-news">Vue 分類頁</a>
        <a href="/meworksv2a/meworks/page1.aspx%EF%B9%96no=220102.legacy.html">歷史備份頁</a>
        <a href="/meworksv2a/meworks/page.aspx%EF%B9%96no=38110.html">舊版首頁</a>
      </nav>
    </header>

    <main class="news-main">
      <section class="news-hero">
        <div class="news-hero-copy">
          <p class="news-eyebrow">Latest Updates</p>
          <h1>最新消息</h1>
          <p class="news-lead">
            這一頁把舊站的「最新消息」整理成現代化焦點頁，不再只是長串連結，
            而是用精選焦點、更新清單與延伸入口，把最近新增的內容重新編排。
          </p>
        </div>

        <aside class="news-hero-panel">
          <p class="news-panel-label">頁面定位</p>
          <ul>
            <li>保留原始文章深連結，不改內容路徑</li>
            <li>用卡片整理近期收錄與跨分類更新</li>
            <li>保留歷史備份頁，方便對照舊版列表</li>
          </ul>
        </aside>
      </section>

      <section class="news-highlights">
        <article v-for="item in latestNewsHighlights" :key="item.href" class="news-card featured">
          <p class="news-kicker">{{ item.section }}</p>
          <h2>{{ item.title }}</h2>
          <p>{{ item.summary }}</p>
          <a class="news-button" :href="item.href">開啟原始文章</a>
        </article>
      </section>

      <section class="news-stream-wrap">
        <div class="news-section-header">
          <div>
            <p class="news-eyebrow">Update Stream</p>
            <h2>近期更新</h2>
          </div>
          <p class="news-section-text">
            這裡列出從舊頁面擷取出的近期文章入口，先解決閱讀與導覽，再逐步做內容級重構。
          </p>
        </div>

        <div class="news-stream">
          <a v-for="item in latestNewsFeed" :key="item.href" class="news-stream-item" :href="item.href">
            <strong>{{ item.title }}</strong>
            <span>{{ item.section }}</span>
          </a>
        </div>
      </section>

      <section class="news-panels">
        <article v-for="group in latestNewsSections" :key="group.title" class="news-panel-card">
          <p class="news-eyebrow">Quick Links</p>
          <h2>{{ group.title }}</h2>
          <div class="news-link-list">
            <a v-for="link in group.links" :key="link.label" :href="link.href">{{ link.label }}</a>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>
