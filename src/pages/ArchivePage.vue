<script setup>
import PageHero from '../components/PageHero.vue'
import { archiveGroups } from '../data/site.js'
</script>

<template>
  <PageHero
    eyebrow="Archive"
    title="歷史檔案入口"
    description="這一頁專門整理舊站原始入口與系統層檔案，方便比對 Vue 新站與歷史快照。"
    compact
  />

  <section class="section archive-stack">
    <article v-for="group in archiveGroups" :key="group.title" class="archive-block">
      <div class="section-heading compact">
        <div>
          <p class="eyebrow">{{ group.eyebrow }}</p>
          <h2>{{ group.title }}</h2>
        </div>
        <p class="section-text">{{ group.summary }}</p>
      </div>

      <div class="detail-link-list">
        <a v-for="item in group.items" :key="item.label" :href="item.href" class="detail-link">
          <strong>{{ item.label }}</strong>
          <span>{{ item.description }}</span>
        </a>
      </div>
    </article>
  </section>
</template>
