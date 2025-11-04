<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios'
const filmes = ref([])
const numAleatorio = ref(null)
const filmeEscolhido = ref("")
const palavraEmbaralhada = ref("")


function embaralharPalavra(palavra) {
  let embaralhada = palavra
  while (embaralhada === palavra) {
    embaralhada = palavra.toLowerCase().split('').sort(() => Math.random() - 0.5).join('')
  }
  return embaralhada
}
onMounted(async () => {
    const paginaAleatoria = Math.floor(Math.random() * 50) 
    const response = await api.get(`https://api.themoviedb.org/3/discover/movie?language=pt-BR&sort_by=popularity.desc&page=${paginaAleatoria}
`) 
    filmes.value = response.data.results
    
    numAleatorio.value = Math.floor(Math.random() * 20)
    filmeEscolhido.value = filmes.value[numAleatorio.value].title
    palavraEmbaralhada.value = embaralharPalavra(filmeEscolhido.value)
})
</script>
<template>
    <div v-if="filmes.length && numAleatorio !== null">
    <h1>{{ palavraEmbaralhada }}</h1>
    <h2>{{ filmeEscolhido }}</h2>
    <h2>{{ numAleatorio }}</h2>
  </div>
</template>
<style>
</style>