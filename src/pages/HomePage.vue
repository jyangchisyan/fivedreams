<script setup>
import CategoryGrid from '../components/CategoryGrid.vue'
import ContentDiscovery from '../components/ContentDiscovery.vue'
import DeepLinkPanels from '../components/DeepLinkPanels.vue'
import HeroPanel from '../components/HeroPanel.vue'
import { categories, deepLinks, siteStats } from '../data/site.js'
</script>

<template>
  <HeroPanel :stats="siteStats" />

  <ContentDiscovery />
  <CategoryGrid :items="categories" show-router-link />
  <DeepLinkPanels :groups="deepLinks" />
</template>
