<script setup>
const essays = [
  {
    title: '歷史不會倒退',
    tone: 'history',
    summary: '從歷史視角切入觀點論述，保留繁體與簡體入口。',
    links: [
      { label: '繁體版', href: '/meworksv2a/meworks/page1.aspx%EF%B9%96no=221276.html' },
      { label: '簡體版', href: '/meworksv2a/meworks/page1.aspx%EF%B9%96no=221279.html' },
    ],
  },
  {
    title: '談諾貝爾精神',
    tone: 'nobel',
    summary: '聚焦價值觀、學術精神與公共討論的核心命題。',
    links: [
      { label: '繁體版', href: '/meworksv2a/meworks/page1.aspx%EF%B9%96no=221277.html' },
      { label: '簡體版', href: '/meworksv2a/meworks/page1.aspx%EF%B9%96no=221280.html' },
    ],
  },
  {
    title: '論六道輪迴',
    tone: 'belief',
    summary: '以哲思與宗教視角展開延伸閱讀，保留雙版本入口。',
    links: [
      { label: '繁體版', href: '/meworksv2a/meworks/page1.aspx%EF%B9%96no=221278.html' },
      { label: '簡體版', href: '/meworksv2a/meworks/page1.aspx%EF%B9%96no=221281.html' },
    ],
  },
]

const quickLinks = [
  { label: '回五夢網現代首頁', href: '/#/' },
  { label: '回 Vue 分類頁', href: '/#/categories/old-farmer-talks' },
  { label: '看歷史備份頁', href: '/meworksv2a/meworks/page1.aspx%EF%B9%96no=220709.legacy.html' },
  { label: '回舊版首頁', href: '/meworksv2a/meworks/page.aspx%EF%B9%96no=38110.html' },
]
</script>

<template>
  <div class="legacy-modern-shell">
    <header class="legacy-modern-topbar">
      <a class="legacy-brand" href="/#/">
        <img src="/userfile/38110/logo2.png" alt="五夢網標誌" />
        <div>
          <strong>五夢網</strong>
          <span>老農開講 Modern Edition</span>
        </div>
      </a>

      <nav class="legacy-modern-nav" aria-label="頁面捷徑">
        <a v-for="item in quickLinks" :key="item.label" :href="item.href">{{ item.label }}</a>
      </nav>
    </header>

    <main class="legacy-modern-main">
      <section class="legacy-hero">
        <div class="legacy-hero-copy">
          <p class="legacy-eyebrow">Opinion Archive</p>
          <h1>老農開講</h1>
          <p class="legacy-lead">
            這一頁把原本只有文字串列的分類入口，整理成更清楚的現代閱讀頁。
            三個核心主題各自保留繁體與簡體版本，讓內容與入口都更好找。
          </p>
        </div>

        <aside class="legacy-hero-panel">
          <p class="legacy-panel-label">重構方向</p>
          <ul>
            <li>保留原始子題連結，不改內容路徑</li>
            <li>把六個入口整理成三組主題</li>
            <li>保留歷史備份頁，方便比對舊站</li>
          </ul>
        </aside>
      </section>

      <section class="legacy-grid">
        <article v-for="essay in essays" :key="essay.title" class="legacy-card" :data-tone="essay.tone">
          <p class="legacy-card-kicker">主題議題</p>
          <h2>{{ essay.title }}</h2>
          <p>{{ essay.summary }}</p>
          <div class="legacy-actions">
            <a v-for="link in essay.links" :key="link.label" class="legacy-link-button" :href="link.href">
              {{ link.label }}
            </a>
          </div>
        </article>
      </section>

      <section class="legacy-notes">
        <article class="legacy-note-card">
          <p class="legacy-eyebrow">Reading Map</p>
          <h2>閱讀結構</h2>
          <p>
            原頁面本質上是分類入口，不是文章列表。這版保留分類性質，改成更像策展頁，
            讓你先理解主題，再進入具體文章頁閱讀。
          </p>
        </article>

        <article class="legacy-note-card">
          <p class="legacy-eyebrow">Legacy Access</p>
          <h2>歷史版本</h2>
          <p>
            如果你要比對原貌，仍然可以從「看歷史備份頁」回到舊版 HTML。
            這樣現代化與保存兩件事不互相衝突。
          </p>
        </article>
      </section>
    </main>
  </div>
</template>
