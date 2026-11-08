<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  items: {
    type: Array,
    required: true,
  },
  showRouterLink: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section id="categories" class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Main Sections</p>
        <h2>主題分類</h2>
      </div>
      <p class="section-text">
        從不同領域出發，發現值得細讀的文章。
      </p>
    </div>

    <div class="category-grid">
      <article v-for="item in items" :key="item.id" class="category-card" :data-tone="item.tone">
        <p class="category-id">NO. {{ item.id }}</p>
        <h3>{{ item.title }}</h3>
        <p class="category-summary">{{ item.summary }}</p>
        <ul class="tag-list">
          <li v-for="tag in item.highlights" :key="tag">{{ tag }}</li>
        </ul>
        <div class="card-actions">
          <RouterLink v-if="showRouterLink" class="inline-link" :to="`/categories/${item.slug}`">
            瀏覽分類
          </RouterLink>
          <a class="inline-link" :href="item.href">閱讀文章</a>
        </div>
      </article>
    </div>
  </section>
</template>
