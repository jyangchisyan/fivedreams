<script setup>
defineProps({
  eyebrow: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section class="page-hero" :class="{ compact }">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p class="page-hero-text">{{ description }}</p>
    <slot />
  </section>
</template>
