<script setup>
import { ref, onMounted, inject } from 'vue';
import api from '@/plugins/axios'
const filmes = ref([])
const numAleatorio = ref(null)

const filmeEscolhido = inject('filmeEscolhido')
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
    const response = await api.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${paginaAleatoria}&sort_by=popularity.desc&vote_count.gte=1500
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
  </div>
</template>
<style>
div {
  margin: 2vw 0 0 0;
}
h1 {
  text-align: center;
  font-size: 6rem;
  font-weight: bold;
  color: white;
}
</style>