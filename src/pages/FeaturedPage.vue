<script setup>
import DeepLinkPanels from '../components/DeepLinkPanels.vue'
import FeaturedCollectionGrid from '../components/FeaturedCollectionGrid.vue'
import PageHero from '../components/PageHero.vue'
import { deepLinks, featuredCollections } from '../data/site.js'
</script>

<template>
  <PageHero
    eyebrow="Featured"
    title="精選與快速入口"
    description="把最值得保留的內容入口與子題快捷方式集中，讓新站能更像編排過的內容門面。"
    compact
  />

  <FeaturedCollectionGrid :items="featuredCollections" />
  <DeepLinkPanels :groups="deepLinks" />
</template>
