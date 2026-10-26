<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Featured</p>
        <h2>精選入口</h2>
      </div>
      <p class="section-text">把最常用的舊站入口集中成一組較清楚的起始頁。</p>
    </div>

    <div class="feature-grid">
      <article v-for="item in items" :key="item.title" class="feature-card">
        <p class="feature-kind">{{ item.kind }}</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.summary }}</p>
        <div class="card-actions">
          <a class="inline-link" :href="item.href">開啟原始頁</a>
        </div>
      </article>
    </div>
  </section>
</template>
