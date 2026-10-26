<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import { categories } from '../data/site.js'

const route = useRoute()

const category = computed(() => categories.find((item) => item.slug === route.params.slug))
</script>

<template>
  <template v-if="category">
    <PageHero
      :eyebrow="category.id"
      :title="category.title"
      :description="category.summary"
      compact
    >
      <div class="card-actions top-gap">
        <a class="button button-primary" :href="category.href">開啟原始分類頁</a>
        <RouterLink class="button button-secondary" to="/categories">回到全部分類</RouterLink>
      </div>
    </PageHero>

    <section class="section detail-layout">
      <article class="detail-card">
        <p class="eyebrow">Highlights</p>
        <h2>主題關鍵字</h2>
        <ul class="tag-list">
          <li v-for="tag in category.highlights" :key="tag">{{ tag }}</li>
        </ul>
      </article>

      <article class="detail-card">
        <p class="eyebrow">Child Topics</p>
        <h2>子分類入口</h2>
        <div class="detail-link-list">
          <a v-for="child in category.children" :key="child.label" :href="child.href" class="detail-link">
            <strong>{{ child.label }}</strong>
            <span>{{ child.description }}</span>
          </a>
        </div>
      </article>
    </section>
  </template>

  <section v-else class="section">
    <div class="empty-state">
      <p class="eyebrow">Not Found</p>
      <h1>找不到這個分類</h1>
      <RouterLink class="button button-primary" to="/categories">回到分類總覽</RouterLink>
    </div>
  </section>
</template>
