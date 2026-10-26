<script setup>
defineProps({
  featuredCollections: {
    type: Array,
    required: true,
  },
  deepLinks: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="section archive-layout">
    <div class="archive-column">
      <div class="section-heading compact">
        <div>
          <p class="eyebrow">Featured</p>
          <h2>精選入口</h2>
        </div>
      </div>

      <div class="feature-stack">
        <article v-for="item in featuredCollections" :key="item.title" class="feature-card">
          <p class="feature-kind">{{ item.kind }}</p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
          <a class="inline-link" :href="item.href">開啟頁面</a>
        </article>
      </div>
    </div>

    <div class="archive-column">
      <div class="section-heading compact">
        <div>
          <p class="eyebrow">Deep Links</p>
          <h2>快速入口</h2>
        </div>
      </div>

      <div class="link-panel-list">
        <article v-for="group in deepLinks" :key="group.section" class="link-panel">
          <h3>{{ group.section }}</h3>
          <ul>
            <li v-for="item in group.items" :key="item.label">
              <a :href="item.href">{{ item.label }}</a>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
