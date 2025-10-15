<script setup>
import GamesComponent from '@/components/GamesComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
</script>
<template>
  <HeaderComponent />
  <h2>
    Teste seu conhecimento
  </h2>

  <GamesComponent />
</template>

<style scoped>
h2 {
  margin: 2vw;
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-align: center;
}
</style>