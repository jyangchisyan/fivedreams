<script setup>
defineProps({
  groups: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Deep Links</p>
        <h2>子題快速入口</h2>
      </div>
      <p class="section-text">先把高價值的子分類做成獨立入口，方便下一步逐頁重構。</p>
    </div>

    <div class="link-panel-list three-up">
      <article v-for="group in groups" :key="group.section" class="link-panel">
        <h3>{{ group.section }}</h3>
        <ul>
          <li v-for="item in group.items" :key="item.label">
            <a :href="item.href">{{ item.label }}</a>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
